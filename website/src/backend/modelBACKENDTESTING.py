#Jay Xiao and Kamila Wong
#this is roughdraft number 2 of our code. This code has dials in use

import re
import requests
import os
from dotenv import load_dotenv
import pandas as pd
from pulp import LpProblem, LpVariable, lpSum, LpMaximize
import math

#import expected returns models

# Specify the path to your CSV file
file_path = "regression_lookup_table.csv"

# Load the CSV file into a DataFrame
dfExpectedReturns = pd.read_csv(file_path)




#gathering information from player
playerName = (input("input player name: "))
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

#converting the data of the csv files
import pandas as pd
from pulp import LpProblem, LpVariable, lpSum, LpMaximize

#file_path = '/home/jxiao23/sports-analysis/website/src/backend/pointsdata.csv'

file_path = 'pointsdata.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
dfpoints = pd.read_csv(file_path, names=columns, skiprows=1)

#file_path2 = '/home/jxiao23/sports-analysis/website/src/backend/prizemoneydata.csv'
file_path2 = 'prizemoneydata.csv'

# Read the CSV file into a pandas DataFrame
dfprize = pd.read_csv(file_path2, names=columns, skiprows=1)

# cleaning up the dataframes
dfpoints.fillna(0, inplace=True)  # Replace NaN values with 0
dfprize.fillna(0, inplace=True)  # Replace NaN values with 0
dfpoints['Week'] = dfpoints['Week'].astype(int)
dfpoints['Coord (lat)'] = dfpoints['Coord (lat)'].astype(float)
dfpoints['Coord (long)'] = dfpoints['Coord (long)'].astype(float)

#removing tournaments that players won't make based on rank
for i in reversed(range(len(dfpoints))):
    # Your conditions to remove rows
    if playerRanking > 1200:
        # Remove International
        if dfpoints.loc[i, 'Type'] == 250:
            dfpoints.drop([i], inplace=True)
            dfprize.drop([i], inplace=True)
    elif playerRanking > 1000:
        # Remove Premier
        if dfpoints.loc[i, 'Type'] == 500:
            dfpoints.drop([i], inplace=True)
            dfprize.drop([i], inplace=True)
    elif playerRanking > 800:
        # Remove Grand Slam
        if dfpoints.loc[i, 'Type'] == 'GS':
            dfpoints.drop([i], inplace=True)
            dfprize.drop([i], inplace=True)
    elif playerRanking > 650:
        # Remove PM
        if dfpoints.loc[i, 'Type'] == 1000:
            dfpoints.drop([i], inplace=True)
            dfprize.drop([i], inplace=True)


            
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
def calculate_expected_earnings(level, ranking):
    expected_earnings = 0
    if level == "GS":
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'GrandSlam') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "PM" or level == 1000:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'PremierMandatory') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "P" or level == 500:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'Premier') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "I" or level == 250:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'International') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "C" or level == 125:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I125') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "100" or level == 100:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I100') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "10" or level == 10:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I10') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "15" or level == 15:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I15') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "25" or level == 25:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I25') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "40" or level == 40:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I40') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "50" or level == 50:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I50') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "60" or level == 60:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I60') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "75" or level == 75:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I75') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "80" or level == 80:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I80') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    elif level == "1" or level == 1:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'UTR') & (dfExpectedReturns['Rank'] == playerRanking)]
        if not player_data.empty:
            expected_earnings = player_data['Earnings'].iloc[0]
        else:
            expected_earnings = 0 # this is the case where we haven't expanded the lookup table far enough
    return expected_earnings

def calculate_expected_points(level, ranking):
    expected_points = 0
    if level == "GS":
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'GrandSlam') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0  # case where the lookup table doesn't go far enough
    elif level == "PM" or level == 1000:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'PremierMandatory') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "P" or level == 500:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'Premier') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "I" or level == 250:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'International') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "C" or level == 125:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I125') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "100" or level == 100:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I100') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "10" or level == 10:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I10') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "15" or level == 15:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I15') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "25" or level == 25:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I25') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "40" or level == 40:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I40') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "50" or level == 50:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I50') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "60" or level == 60:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I60') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "75" or level == 75:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I75') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "80" or level == 80:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'I80') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    elif level == "1" or level == 1:
        player_data = dfExpectedReturns[(dfExpectedReturns['Level'] == 'UTR') & (dfExpectedReturns['Rank'] == ranking)]
        if not player_data.empty:
            expected_points = player_data['Points'].iloc[0]
        else:
            expected_points = 0
    return expected_points


# Add expected points and earnings to arrays
points = []
earnings = []
for i in range(len(dfprize)):
    points.append(calculate_expected_points(dfprize['Type'].iloc[i], playerRanking))
    earnings.append(calculate_expected_earnings(dfprize['Type'].iloc[i], playerRanking))


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

"""
The below code is testing for include
"""
excluded = "Adelaide International 1,Adelaide International 2,Roland-Garros"

excluded_array = excluded.split(',')
print("EXCLUDED\n")
print(excluded_array)
print("\n\n")

"""
Work on include!
"""
included = "W35 Malibu;W15 Fort-De-France;W35 Petit-Bourg"

included_array = included.split(';')
print("INCLUDED\n")
print(included_array)
print("\n\n")

#now I'll add all tournaments that aren't the included ones into excluded array for same week:
weekdata = []
for i in range(len(tournament)):
    if tournament[i] in included_array:
        weekdata.append(week[i])

for j in range(len(tournament)):
    if (tournament[j] not in included_array) and (week[j] in weekdata):
        excluded_array.append(tournament[j])
print("round 2", excluded_array)

weeks = data_by_week.keys()
tournaments = [f"{data_by_week[week]['tournament'][i]}_{week}_{j}" for week in weeks for i in range(len(data_by_week[week]['points'])) for j in range(20)]


# PLEASE ADD CODE TO FILTER THE TOURNAMENTS GIVEN THE EXCLUDED ARRAY
filtered_tournaments = []
    
for tournament in tournaments:
    add = True
    for ex in excluded_array:
        if ex.strip() == tournament.split('_')[0]:  # Check for exact match
            add = False
            break  # No need to continue checking once a match is found
    if add:
        filtered_tournaments.append(tournament)

#exclude in data_by_week
for week, data in data_by_week.items():
    tournaments = data['tournament']
    for i in excluded_array:
        if i in tournaments:
            index = data_by_week[week]['tournament'].index(i)
            data_by_week[week]['tournament'].remove(i)
            del data_by_week[week]['points'][index]
            del data_by_week[week]['earnings'][index]
            del data_by_week[week]['distance'][index]

x = LpVariable.dicts("Tournament", filtered_tournaments, cat="Binary")
y = LpVariable.dicts("RestWeek", weeks, cat="Binary")
tournament_selected = LpVariable.dicts("TournamentSelected", filtered_tournaments, cat="Binary")
# New variable to represent the end of a two-week tournament
two_week_tournament_end = LpVariable.dicts("TwoWeekTournamentEnd", weeks, cat="Binary")

print("tournament_selected")
print(tournament_selected)
# Constraints
weeks = list(weeks)
for week_index, week in enumerate(weeks):
    print("Week:", week)
    print("Data by week:", data_by_week.get(week))
    model += lpSum(tournament_selected[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for i in range(len(data_by_week[week]['points']))) <= 1

# Ensure the player doesn't play for restInput consecutive weeks
for i in range(len(weeks) - restInput + 1):
    consecutive_weeks = weeks[i:i + restInput]
    model += lpSum(x[f"{data_by_week[wk]['tournament'][j]}_{wk}_{j}"] for wk in consecutive_weeks for j in range(len(data_by_week[wk]['points']))) <= restInput - 1
    model += lpSum(y[wk] for wk in consecutive_weeks) >= 1  # Ensure at least one "Rest" week in consecutive weeks

# Create a dictionary to store the selected tournaments by name
selected_tournaments_by_name = {}

# Add constraints to link tournaments with the same name
for week_index, week in enumerate(weeks):
    for i in range(len(data_by_week[week]['tournament'])):
        tournament_name = f"{data_by_week[week]['tournament'][i]}_{i}"

        # If the tournament name is already in the dictionary, link it with the previous week
        if tournament_name in selected_tournaments_by_name:
            model += lpSum(tournament_selected[tournament_name] >= selected_tournaments_by_name[tournament_name])
        
        # Update the dictionary with the current week's tournament
        selected_tournaments_by_name[week] = tournament_name


# Update the objective function to use the new binary variables
model += lpSum(
    dialpoints * data_by_week[wk]['points'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    dialearnings * data_by_week[wk]['earnings'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    dialdistance * data_by_week[wk]['distance'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"]
    #dialpoints * data_by_week[wk]['points'][i] * tournament_selected[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    #dialearnings * data_by_week[wk]['earnings'][i] * tournament_selected[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
    #dialdistance * data_by_week[wk]['distance'][i] * tournament_selected[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"]
    for wk in weeks for i in range(len(data_by_week[wk]['points'])))

"""Force include the tournaments selected"""
for week, data in data_by_week.items():
    tournaments = data['tournament']
    weekdata = []
    for i in included_array:
        if i in tournaments:
            index = data_by_week[week]['tournament'].index(i)
            tournament_name = data_by_week[week]["tournament"][index]
            wk = week
            weekdata.append(wk)
            var_name = f"{tournament_name}_{wk}_{index}" 
            # Ensure the binary variable for this tournament is set to 1 (tournament is force selected)
            model += x[var_name] == 1, f"Force_Selection_{tournament_name}_{wk}_{index}"

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

    # Calculate total expected points and earnings
total_expected_points = 0
total_expected_earnings = 0
total_expected_distance = 0

for var in model.variables():
    if var.varValue == 1 and "Rest" not in var.name:
        components = var.name.split('_')
        week_index = int(components[-2]) if components[-2].isdigit() else None
        tournament_name = "_".join(components[:-2])
        
        if week_index is not None:
            expected_points = data_by_week[week_index]['points'][int(components[-1])]
            expected_earnings = data_by_week[week_index]['earnings'][int(components[-1])]
            expected_distance = data_by_week[week_index]['distance'][int(components[-1])]
            
            total_expected_points += expected_points
            total_expected_earnings += expected_earnings
            total_expected_distance += expected_distance

# Print total expected points and earnings
print("Total Expected Points:", total_expected_points)
print("Total Expected Earnings:", total_expected_earnings)
print("Total Expected Distance in Km:", total_expected_distance)




