def predict_round(tier, ranking):
    # Define the tier thresholds and corresponding rounds
    tier_thresholds = {
        'Grand Slam': 32,
        'Masters 1000': 64,
        'ATP 500': 128,
        'ATP 250': 256
        # Add more tiers as needed
    }

    # Determine the round based on the tier and ranking
    if tier in tier_thresholds:
        threshold = tier_thresholds[tier]
        if ranking <= threshold:
            return 'Main Draw'
        else:
            return 'Qualifying'
    else:
        return 'Unknown Tier'

# Example usage:
tier = 'ATP 250'
ranking = 150

predicted_round = predict_round(tier, ranking)
print(f"For a player with ranking {ranking} in a {tier} tournament, the predicted round is: {predicted_round}")

#print df?
import pandas as pd
from pulp import LpProblem, LpVariable, lpSum, LpMaximize

file_path = 'pointsdata.csv'

# Specify the column names
columns = [
    'Week', 'Type', 'Tournament', 'Location', 'Surface',
    'Winner', 'Finalist', 'SF', 'QF', 'R16', 'R32', 'R64', 'R128',
    'Coord (lat)', 'Coord (long)'
]

# Read the CSV file into a pandas DataFrame
dfpoints = pd.read_csv(file_path, names=columns,skiprows=1)
print(dfpoints)