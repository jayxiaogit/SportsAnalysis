from pulp import LpProblem, LpVariable, lpSum, LpMaximize

# Input data
data_by_week = {}

points = [470, 280, 2000, 280, 470, 900, 200, 300, 2000, 870, 100, 200]
earnings = [120150, 120150, 34228, 32888, 2395039, 24332, 49323, 23904, 29030, 90393, 30900, 90909]
distance = [1000, 200, 300, 403, 293, 230, 93, 30, 201, 1000, 293, 192]
tournament = ['Adelaide International', 'ASB Classic', 'Hobart International', 'Thailand Open', 'Australian Open', 'Dubai Tennis Championships', 'BNP Paribas Open', 'Qatar Open', 'ATX Open', 'Merida Open Akron', 'Porsche Tennis Grand Prix', 'Mutua Madrid Open']
week = [1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5]

for w, p, e, d, t in zip(week, points, earnings, distance, tournament):
    if w not in data_by_week:
        data_by_week[w] = {'points': [], 'earnings': [], 'distance': [], 'tournament': []}
    
    data_by_week[w]['points'].append(p)
    data_by_week[w]['earnings'].append(e)
    data_by_week[w]['distance'].append(d)
    data_by_week[w]['tournament'].append(t)

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


