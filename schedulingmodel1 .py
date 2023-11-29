#Jay Xiao and Kamila Wong
#chatGPT notes: In this example, I've introduced a binary decision variable x[t, w]
# indicating whether the player attends tournament t in week w. 
#You can customize the objective function, constraints, and decision variables based on the 
#specific preferences and constraints for your problem.
#Modify the points and earnings dictionaries to include the actual data for each tournament. 
#Adjust other constraints according to the player's preferences, 
#such as resting more or maximizing points and earnings.

#gathering information from player
playerLocationLat = float(input("input your training location latitude: "))
playerLocationLong = float(input("input your training location longitude: "))
playerRanking = int(input("enter your current ranking: "))
#opportunity to add more dials later

#converting the data of the csv files
import pandas as pd

file_path = 'pointsdata.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
dfpoints = pd.read_csv(file_path, names=columns)

file_path = 'prizemoneydata.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
dfprize = pd.read_csv(file_path, names=columns)






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

distanceArray = []
lat_array = dfprize['Coord (lat)'].values
long_array = dfprize['Coord (long)'].values
for i in range (1, len(df)):
    distanceArray[i] = distanceCalculator(playerLocationLat, playerLocationLong, lat_array[i], long_array[i])

#need to calculate expected return: TODO PLZ KAMILA
points_array = []
earnings_array = []

#make the final dataframe we will use for optimization
week_array = dfprize['Week'].values
name_array = dfprize['Tournament'].values
location_array = dfprize['Location'].values
for w, p, e, d, t in zip(week_array, points_array, earnings_array, distanceArray, name_array):
    if w not in data_by_week:
        data_by_week[w] = {'points': [], 'earnings': [], 'distance': [], 'tournament': []}
    
    data_by_week[w]['points'].append(p)
    data_by_week[w]['earnings'].append(e)
    data_by_week[w]['distance'].append(d)
    data_by_week[w]['tournament'].append(t)


#optimization code
# PuLP model
model = LpProblem(name="Tournament_Optimization", sense=LpMaximize)

weeks = data_by_week.keys()
tournaments = [f"{data_by_week[week]['tournament'][i]}_{week}_{i}" for week in weeks for i in range(len(data_by_week[week]['points']))]

x = LpVariable.dicts("Tournament", tournaments, cat="Binary")

# Objective function
model += lpSum(data_by_week[week]['earnings'][i] * x[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] +
               data_by_week[week]['points'][i] * x[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for week in weeks for i in range(len(data_by_week[week]['points'])))

# Constraints
for week in weeks:
    model += lpSum(x[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for i in range(len(data_by_week[week]['points']))) <= 1

# Solve the optimization problem
model.solve()

# Print the results
print("Selected Tournaments:")
selected_tournaments = []

for var in model.variables():
    if var.varValue == 1:
        # Split the variable name and extract components
        components = var.name.split('_')
        
        # Extract week, tournament name, and index from the variable name
        week_index = components[-2]
        tournament_name = "_".join(components[:-2])
        
        selected_tournaments.append((int(week_index), f"Week {week_index}: {tournament_name}"))

# Sort the selected tournaments by week
selected_tournaments.sort(key=lambda x: x[0])

# Print the sorted results
for tournament_info in selected_tournaments:
    print(tournament_info[1])

