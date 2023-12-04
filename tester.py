from pulp import LpProblem, LpVariable, lpSum, LpMaximize

# Additional Input data for Rest weeks
rest_tournament = 'Rest'

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

# Add "Rest" week and tournament for missing weeks
all_weeks = set(week)
for w in all_weeks:
    if w not in data_by_week:
        data_by_week[w] = {'points': [0], 'earnings': [0], 'distance': [0], 'tournament': [rest_tournament]}

# PuLP model
model = LpProblem(name="Tournament_Optimization", sense=LpMaximize)

weeks = data_by_week.keys()
tournaments = [f"{data_by_week[week]['tournament'][i]}_{week}_{i}" for week in weeks for i in range(len(data_by_week[week]['points']))]

x = LpVariable.dicts("Tournament", tournaments, cat="Binary")
y = LpVariable.dicts("RestWeek", weeks, cat="Binary")

# Objective function
model += lpSum(data_by_week[wk]['earnings'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] +
               data_by_week[wk]['points'][i] * x[f"{data_by_week[wk]['tournament'][i]}_{wk}_{i}"] for wk in weeks for i in range(len(data_by_week[wk]['points'])))

# Constraints
restInput = 4
weeks = list(weeks)
for week_index, week in enumerate(weeks):
    model += lpSum(x[f"{data_by_week[week]['tournament'][i]}_{week}_{i}"] for i in range(len(data_by_week[week]['points']))) <= 1

# Ensure the player doesn't play for restInput consecutive weeks
for i in range(len(weeks) - restInput + 1):
    consecutive_weeks = weeks[i:i + restInput]
    model += lpSum(x[f"{data_by_week[wk]['tournament'][j]}_{wk}_{j}"] for wk in consecutive_weeks for j in range(len(data_by_week[wk]['points']))) <= restInput - 1
    model += lpSum(y[wk] for wk in consecutive_weeks) >= 1  # Ensure at least one "Rest" week in consecutive weeks



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
        week_index = components[-2]
        tournament_name = "_".join(components[:-2])
        
        selected_tournaments.append((int(week_index), f"Week {week_index}: {tournament_name}"))

# Sort the selected tournaments by week
selected_tournaments.sort(key=lambda x: x[0])

# Print the sorted results
for tournament_info in selected_tournaments:
    print(tournament_info[1])


