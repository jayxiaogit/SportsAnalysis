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

#converting the data of the csv files
import pandas as pd

# Replace 'your_file_path.csv' with the actual path to your CSV file
file_path = 'your_file_path.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(file_path, names=columns)

# Display the DataFrame
print(df)

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

for i in range (1, len(df)):
    distance = distanceCalculator(playerLocationLat, playerLocationLong, df.at['iterator?', 'Coord (lat)'], df.at['iterator?', 'Coord (long)'])

#need to calculate expected return: TODO PLZ KAMILA

#optimization code
from pulp import LpProblem, LpVariable, lpSum, LpMaximize, LpBinary

# Sample data

tournament_data = [
    {"name": f"Tournament{i}", "points": points[i], "earnings": earnings[i], "location": f"City{i}"}
    for i in range(1, NUM_WEEKS + 1)
]

# Constants
NUM_WEEKS = 42
MAX_TOURNAMENTS_PER_WEEK = 5

# Create a LP maximization problem
model = LpProblem(name="Player_Schedule_Optimization", sense=LpMaximize)

# Decision variables
# x[t, w] is a binary variable indicating whether the player attends tournament t in week w
x = LpVariable.dicts("Attend", [(t, w) for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)], cat=LpBinary)

# Objective function: Maximize total points and earnings
model += lpSum(x[t, w] * (tournament_data[t-1]["points"] + tournament_data[t-1]["earnings"]) for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)), "Total_Points_and_Earnings"

# Constraints
# Constraint: Player attends at most one tournament per week
for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1):
    model += lpSum(x[t, w] for t in range(1, NUM_WEEKS + 1)) <= 1, f"AtMostOneTournamentPerWeek_{w}"

# Additional constraints based on player preferences (you can customize these)
# Constraint: Player rests more (e.g., at most one tournament per week)
model += lpSum(x[t, w] for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)) <= NUM_WEEKS // 2, "RestMore"

# Solve the problem
model.solve()

# Display results
print(f"Status: {model.status}, {LpProblem.status[model.status]}")
print(f"Optimal Points and Earnings: {model.objective.value()}")

# Print the decision variables
for t in range(1, NUM_WEEKS + 1):
    for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1):
        if x[t, w].value() == 1:
            print(f"Week {w}: {tournament_data[t-1]['name']}")

