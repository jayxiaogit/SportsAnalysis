import pandas as pd
import numpy as np
import csv

# Define the range of years you want to process
years = range(2013, 2024)  # Change the end year if needed

# Initialize empty lists to store data for each tourney level
GrandSlamData = []
Masters = []
OtherTour = []
Challengers = []
Satellite = []
International = []
Premier = []
PremierMandatory = []
Other = []
Cups = []
TourFinals = []

# Iterate over each year
for year in years:
    # Load the CSV file into a DataFrame and select relevant columns
    df = pd.read_csv(f'{year}.csv')
    df = df[['tourney_name','round','tourney_level','winner_rank','loser_rank']]
    
    # Initialize empty list to store data for current year
    data = []
    
    # Iterate through each row in the DataFrame
    for index, row in df.iterrows():
        if row['round'] == 'F':  # Check if it's the finals
            # Store loser's information
            data.append([row['loser_rank'], row['round'], row['tourney_level']])
            # Store winner's information with modified round
            data.append([row['winner_rank'], 'W', row['tourney_level']])
        else:
            # Store loser's information
            data.append([row['loser_rank'], row['round'], row['tourney_level']])
    
    # Convert the list of lists into a NumPy array
    data_array = np.array(data)
    
    # Iterate through the data array and sort into categories
    for entry in data_array:
        rank, round_type, tourney_level = entry
        if tourney_level == 'G':
            GrandSlamData.append(entry)
        elif tourney_level == 'A':
            OtherTour.append(entry)
        elif tourney_level == 'C':
            Challengers.append(entry)
        elif tourney_level == 'S':
            Satellite.append(entry)
        elif tourney_level == 'I':
            International.append(entry)
        elif tourney_level == 'P':
            Premier.append(entry)
        elif tourney_level == 'PM':
            PremierMandatory.append(entry)
        elif tourney_level == 'F':
            TourFinals.append(entry)
        elif tourney_level == 'D':
            Cups.append(entry)
        else:
            Other.append(entry)

# Convert lists to NumPy arrays if needed
GrandSlamData = np.array(GrandSlamData)
OtherTour = np.array(OtherTour)
Challengers = np.array(Challengers)
Satellite = np.array(Satellite)
International = np.array(International)
Premier = np.array(Premier)
PremierMandatory = np.array(PremierMandatory)
Other = np.array(Other)
Cups = np.array(Cups)
TourFinals = np.array(TourFinals)

print(Other)

# Print the lengths of each category to verify the sorting
print("Grand Slam Matches:", len(GrandSlamData))
print("Other Tour-level Matches:", len(OtherTour))
print("Challenger Matches:", len(Challengers))
print("Satellite/ITF Matches:", len(Satellite))
print("International Matches:", len(International))
print("Premier Matches:", len(Premier))
print("Premier Mandatory Matches:", len(PremierMandatory))
print("Cups:", len(Cups))
print("Tour Finals:", len(TourFinals))
print("Missed categories:", len(Other))


#save to different files
file_path = 'GrandSlamData.csv'
# Writing array to CSV
# Open the file in write mode ('w', newline='') to avoid extra newline characters
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(GrandSlamData)
    
file_path = 'OtherTour.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(OtherTour)

file_path = 'Challengers.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(Challengers)

file_path = 'Satellite.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(Satellite)

file_path = 'International.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(International)

file_path = 'Premier.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(Premier)

file_path = 'PremierMandatory.csv'
with open(file_path, 'w', newline='') as file:
    # Create a CSV writer object
    writer = csv.writer(file)
    
    # Write data to the CSV file
    writer.writerows(PremierMandatory)

