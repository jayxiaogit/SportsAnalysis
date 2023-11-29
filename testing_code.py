# Optimization code
from pulp import LpProblem, LpVariable, lpSum, LpMaximize, LpBinary

# Sample data
points = [470, 280, 2000, 280, 470, 900, 200, 300, 2000, 870, 100, 200]
earnings = [120150, 120150, 34228, 32888, 2395039, 24332, 49323, 23904, 29030, 90393, 30900, 90909]
distance = [1000, 200, 300, 403, 293, 230, 93, 30, 201, 1000, 293, 192]
tournament = ['Adelaide International', 'ASB Classic', 'Hobart International', 'Thailand Open', 'Australian Open', 'Dubai Tennis Championships', 'BNP Paribas Open', 'Qatar Open', 'ATX Open', 'Merida Open Akron', 'Porsche Tennis Grand Prix', 'Mutua Madrid Open']
week = [1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5]
data_by_week = {}

for w, p, e, d, t in zip(week, points, earnings, distance, tournament):
    if w not in data_by_week:
        data_by_week[w] = {'points': [], 'earnings': [], 'distance': [], 'tournament': []}
    
    data_by_week[w]['points'].append(p)
    data_by_week[w]['earnings'].append(e)
    data_by_week[w]['distance'].append(d)
    data_by_week[w]['tournament'].append(t)

# Constants
NUM_WEEKS = 5
MAX_TOURNAMENTS_PER_WEEK = 5

tournament_data = [
    {"week": week[i], "name": tournament[i], "points": points[i], "earnings": earnings[i], "location": distance[i]}
    for i in range(NUM_WEEKS)
]

# Create a LP maximization problem
model = LpProblem(name="Player_Schedule_Optimization", sense=LpMaximize)

# Decision variables
# x[t, w] is a binary variable indicating whether the player attends tournament t in week w
x = LpVariable.dicts("Attend", [(t, w) for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)], cat=LpBinary)

# Constraints
# Constraint: Player attends at most one tournament per week
for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1):
    model += lpSum(x[t, w] for t in range(1, NUM_WEEKS + 1)) <= 1, f"AtMostOneTournamentPerWeek_{w}"

# Additional constraint: Player attends only one tournament per week
for t in range(1, NUM_WEEKS + 1):
    model += lpSum(x[t, w] for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)) == 1, f"OneTournamentPerWeek_{t}"

# Constraint: Player rests more (e.g., at most one tournament per week)
model += lpSum(x[t, w] for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)) <= NUM_WEEKS // 2, "RestMore"

# Objective function: Maximize total points and earnings
model += lpSum(x[t, w] * (tournament_data[t-1]["points"] + tournament_data[t-1]["earnings"]) for t in range(1, NUM_WEEKS + 1) for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1)), "Total_Points_and_Earnings"

# Solve the problem
model.solve()

# Display results
print(f"Status: {model.status}")
print(f"Optimal Points and Earnings: {model.objective.value()}")

# Print the decision variables
for t in range(1, NUM_WEEKS + 1):
    for w in range(1, MAX_TOURNAMENTS_PER_WEEK + 1):
        if x[t, w].value() == 1:
            print(f"Week {w}: {tournament_data[t-1]['name']}")

for t in range(1, NUM_WEEKS + 1):
    print(f"Tournament {t}: Points = {tournament_data[t-1]['points']}, Earnings = {tournament_data[t-1]['earnings']}")
