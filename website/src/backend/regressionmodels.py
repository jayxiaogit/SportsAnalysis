<<<<<<< HEAD
from concurrent.futures import ThreadPoolExecutor
import csv

# Import necessary modules
from processGrandSlam import *
from processGrandSlamPoints import *
from processPremier import *
from processPremierPoints import *
from processPremierMandatory import *
from processPremierMandatoryPoints import *
from processInternational import *
from processInternationalPoints import *
from Earnings125 import *
from Points125 import *
from Earnings100 import *
from Points100 import *
from Earnings10 import *
from Points10 import *
from Earnings15 import *
from Points15 import *
from Earnings25 import *
from Points25 import *
from Earnings40 import *
from Points40 import *
from Earnings50 import *
from Points50 import *
from Earnings60 import *
from Points60 import *
from Earnings75 import *
from Points75 import *
from Earnings80 import *
from Points80 import *
from EarningsUTR import *

# File name for the output CSV
output_file = "regression_lookup_table.csv"

# Define levels and their corresponding functions
levels = {
    "GrandSlam": (GrandSlamEarnings, GrandSlamPoints),
    "Premier": (PremierEarnings, PremierPoints),
    "PremierMandatory": (PMEarnings, PMPoints),
    "International": (InternationalEarnings, InternationalPoints),
    "I125": (Earnings125, Points125),
    "I10": (Earnings10, Points10),
    "I15": (Earnings15, Points15),
    "I25": (Earnings25, Points25),
    "I40": (Earnings40, Points40),
    "I50": (Earnings50, Points50),
    "I60": (Earnings60, Points60),
    "I75": (Earnings75, Points75),
    "I80": (Earnings80, Points80),
    "UTR": (EarningsUTR, lambda _: [1] * scope),  # UTR provides no pro points
}

# Scope of rankings
scope = 1500

# Function to process a single ranking
def process_ranking(ranking):
    data = []
    for level, (earn_func, points_func) in levels.items():
        earnings = earn_func(ranking)
        points = points_func(ranking)

        # Ensure we split arrays correctly
        for rank_idx, (earn, point) in enumerate(zip(earnings, points), start=1):
            data.append({
                "Level": level,
                "Rank": rank_idx,
                "Earnings": earn.item() if hasattr(earn, 'item') else earn,  # Convert if necessary
                "Points": point.item() if hasattr(point, 'item') else point  # Convert if necessary
            })
    return data

# Use ThreadPoolExecutor for parallel processing
results = []
with ThreadPoolExecutor() as executor:
    # Process rankings in parallel
    futures = [executor.submit(process_ranking, scope)]
    for future in futures:
        results.extend(future.result())

# Flatten the results and write to CSV
with open(output_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=["Level", "Rank", "Earnings", "Points"])
    writer.writeheader()
    writer.writerows(results)

print(f"Lookup table successfully written to {output_file}")
=======
#this file is implementing scikit/xgboost for regression as well as a simpler model for comparison

#simple model using sci-kit learn
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

transformer = PolynomialFeatures(degree=2, include_bias=False)

#advanced model using xgboost
>>>>>>> parent of 2bae1c8 (building the lookup table)
