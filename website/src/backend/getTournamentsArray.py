import csv

tournaments = []

# Open the CSV file
with open('pointsdata.csv', newline='') as csvfile:
    # Create a CSV reader
    reader = csv.reader(csvfile)
    next(reader)
    # Read each row and split it
    for i, row in enumerate(reader):
        tournaments.append({
            id: i,
            name: row[2],
            week: row[0],
            level: row[1],
        })

print(tournaments)

