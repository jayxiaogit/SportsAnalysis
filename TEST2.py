#Jay Xiao and Kamila Wong
#this is roughdraft number 2 of our code. This code has dials in use

import pandas as pd
from pulp import LpProblem, LpVariable, lpSum, LpMaximize

#gathering information from player
playerLocationLat = float(input("input your training location latitude: "))
playerLocationLong = float(input("input your training location longitude: "))
playerRanking = int(input("enter your current ranking: "))

#opportunity to add more dials later
#add dials!! then adjustment formula
dialpoints = int(input("Give a rating of how important points are to you (1-10): "))
dialearnings = int(input("Give a rating of how important earnings are to you (1-10): "))
dialdistance = int(input("Give a rating of how important distance is to you (1-10): "))
restInput = int(input("How many weeks in a row can you play tournaments?: "))

rest_tournament = "Rest"

file_path = 'pointsdata.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
dfpoints = pd.read_csv(file_path, names=columns, skiprows=1)

file_path2 = 'prizemoneydata.csv'

# Read the CSV file into a pandas DataFrame
dfprize = pd.read_csv(file_path2, names=columns, skiprows=1)

# cleaning up the dataframes
dfpoints.fillna(0, inplace=True)  # Replace NaN values with 0
dfprize.fillna(0, inplace=True)  # Replace NaN values with 0
dfpoints['Week'] = dfpoints['Week'].astype(int)
dfpoints['Coord (lat)'] = dfpoints['Coord (lat)'].astype(float)
dfpoints['Coord (long)'] = dfpoints['Coord (long)'].astype(float)


#calculations before optimization code
#make a dictionary to store everything?
#need to calculate distance between points
import math

def distanceCalculator(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in kilometers

    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Compute differences in latitude and longitude
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Haversine formula
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c

    return distance

distance = []
lat_array = dfprize['Coord (lat)'].values
long_array = dfprize['Coord (long)'].values
for i in range(len(dfprize)):
    distance.append(distanceCalculator(playerLocationLat, playerLocationLong, lat_array[i], long_array[i]))

#need to calculate expected return:
#make some function to calculate the expected round a player will get to per tournament
# RANKING WILL BE INPUTTED
# REPLACE WITH ACTUAL MODEL, RIGHT NOW IT IS ONLY LINEAR
def calculate_expected_earnings(ranking):
    expected_earnings = 100000 - 10 * ranking
    return expected_earnings

def calculate_expected_points(ranking):
    expected_points = 500 - ranking
    return expected_points

# Add expected points and earnings to arrays
points = []
earnings = []
for i in range(len(distance)):
    points.append(calculate_expected_points(playerRanking))
    earnings.append(calculate_expected_earnings(playerRanking))


#make the final dataframe we will use for optimization
data_by_week = {}
week = dfprize['Week'].values
tournament = dfprize['Tournament'].values
location = dfprize['Location'].values

#testing to ensure proper data processing
"""print(week)
print(points)
print(earnings)
print(distance)
print(tournament)
"""
for w, p, e, d, t in zip(week, points, earnings, distance, tournament):
    if w not in data_by_week:
        data_by_week[w] = {'points': [], 'earnings': [], 'distance': [], 'tournament': []}
    
    data_by_week[w]['points'].append(p)
    data_by_week[w]['earnings'].append(e)
    data_by_week[w]['distance'].append(d)
    data_by_week[w]['tournament'].append(t)

# Add "Rest" week and tournament for missing weeks
all_weeks = set(week)
for w in all_weeks:
    if w not in data_by_week:
        data_by_week[w] = {'points': [0], 'earnings': [0], 'distance': [0], 'tournament': [rest_tournament]}

# PuLP model
model = LpProblem(name="Tournament_Optimization", sense=LpMaximize)

weeks = data_by_week.keys()
tournaments = [
    f"{data_by_week[week]['tournament'][i]}_{week}_{i}"
    for week in weeks
    for i in range(len(data_by_week[week]['points']))
]

x = LpVariable.dicts("Tournament", tournaments, cat="Binary")
y = LpVariable.dicts("RestWeek", weeks, cat="Binary")
tournament_selected = LpVariable.dicts("TournamentSelected", tournaments, cat="Binary")
# New variable to represent the end of a two-week tournament
two_week_tournament_end = LpVariable.dicts("TwoWeekTournamentEnd", weeks, cat="Binary")


# Constraints
weeks = list(weeks)
for week_index, week in enumerate(weeks):
    #model += lpSum(x[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for i in range(len(data_by_week[week]['points']))) <= 1
    model += lpSum(tournament_selected[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for i in range(len(data_by_week[week]['points']))) <= 1

# Keep track of selected tournaments and their corresponding weeks
selected_tournaments = []

# Add constraints to link tournaments with the same name
for week_index, week in enumerate(weeks):
    for i in range(len(data_by_week[week]['tournament'])):
        tournament_name = f"{data_by_week[week]['tournament'][i]}_{week}_{i}"

        # If the tournament name is already in the list, link it with the previous week
        if tournament_name in selected_tournaments:
            model += lpSum(tournament_selected[tournament_name] >= selected_tournaments_by_name[tournament_name])

        # Update the list with the current week's tournament
        selected_tournaments.append(tournament_name)

# Add constraint to ensure that if a two-week long tournament is selected for a specific week,
# both weeks of the tournament must be selected, and if a rest week is planned, push it to the following week
for tournament_name in selected_tournaments:
    components = tournament_name.split('_')
    week, tournament_index = int(components[-2]), int(components[-1])
    
    # If a two-week tournament is selected, ensure both weeks are selected
    if "Rest" not in tournament_name and data_by_week[week]['tournament'][tournament_index] in dfpoints['Tournament'].values:
        tournament_name = f"{data_by_week[week]['tournament'][tournament_index]}_{week}_{tournament_index}"
        model += lpSum(tournament_selected[tournament_name] for i in range(len(data_by_week[week]['points']))) == 2

    # If rest was planned for week 'wk' and the tournament is selected for 'wk',
    # push the rest to the following week
    if "Rest" in tournament_name and week + 1 < max(weeks) and f"{data_by_week[week]['tournament'][tournament_index]}_{week + 1}_{tournament_index}" in selected_tournaments:
        rest_week_name = f"{data_by_week[week]['tournament'][tournament_index]}_{week + 1}_{tournament_index}"
        model += tournament_selected[tournament_name] == tournament_selected[rest_week_name]

# Add constraint to limit consecutive rest weeks
for i in range(1, max(weeks) + 1):
    for j in range(restInput):
        rest_week_name = f"Rest_{i}_{j}"
        if rest_week_name in tournament_selected:
            model += tournament_selected[rest_week_name] <= restInput

# Update the objective function to use the new binary variables
# Objective function
model += lpSum(
    dialpoints * data_by_week[wk]['points'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    dialearnings * data_by_week[wk]['earnings'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    dialdistance * data_by_week[wk]['distance'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"]
    for wk in weeks for i in range(len(data_by_week[wk]['points'])))


# Solve the optimization problem
model.solve()


# Print the results
print("Selected Tournaments:")
selected_tournaments = []

for var in model.variables():
    if var.varValue == 1 and "Rest" not in var.name:
        # Split the variable name and extract components
        components = var.name.split('_')
        
         # Extract week, tournament name, and index from the variable name
        week_index = int(components[-2]) if components[-2].isdigit() else None
        tournament_name = "_".join(components[:-2])
        
        if week_index is not None:
            selected_tournaments.append((week_index, f"Week {week_index}: {tournament_name}"))

# Sort the selected tournaments by week
selected_tournaments.sort(key=lambda x: x[0])

# Find missing weeks and fill in with "Rest"
max_week = selected_tournaments[-1][0] if selected_tournaments else 0

for i in range(1, max_week + 1):
    week_exists = any(week[0] == i for week in selected_tournaments)
    if not week_exists:
        selected_tournaments.append((i, f"Week {i}: Rest"))

# Sort the selected tournaments by week again (after adding "Rest" entries)
selected_tournaments.sort(key=lambda x: x[0])

# Print the sorted results
for tournament_info in selected_tournaments:
    week, tournament_info_str = tournament_info
    components = tournament_info_str.split(":")
    tournamentname = components[1].strip()

    if "Rest" in tournamentname:
        print(components[0], ":", "Rest")
    else:
        listname = []
        listname = tournamentname.split("_")
        printname = " ".join(listname[1::])
        print(components[0], ":", printname)
