#Jay Xiao and Kamila Wong
#chatGPT notes: In this example, I've introduced a binary decision variable x[t, w]
# indicating whether the player attends tournament t in week w. 
#You can customize the objective function, constraints, and decision variables based on the 
#specific preferences and constraints for your problem.
#Modify the points and earnings dictionaries to include the actual data for each tournament. 
#Adjust other constraints according to the player's preferences, 
#such as resting more or maximizing points and earnings.

#converting the data
import pandas as pd

# Replace 'your_file.xlsx' with the actual path to your Excel file
df = pd.read_excel('your_file.xlsx')


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

