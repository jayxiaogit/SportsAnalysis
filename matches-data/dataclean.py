import pandas as pd

print("hi lol")
# Read the CSV files into a DataFrame
df2013 = pd.read_csv('2013.csv')
df2013 = df2013[['tourney_level','winner_rank','loser_rank']]
df2014 = pd.read_csv('2014.csv')
df2014 = df2014[['tourney_level','winner_rank','loser_rank']]
df2015 = pd.read_csv('2015.csv')
df2015 = df2015[['tourney_level','winner_rank','loser_rank']]
df2016 = pd.read_csv('2016.csv')
df2016 = df2016[['tourney_level','winner_rank','loser_rank']]
df2017 = pd.read_csv('2017.csv')
df2017 = df2017[['tourney_level','winner_rank','loser_rank']]
df2018= pd.read_csv('2018.csv')
df2018 = df2018[['tourney_level','winner_rank','loser_rank']]
df2019 = pd.read_csv('2019.csv')
df2019 = df2019[['tourney_level','winner_rank','loser_rank']]
df2020 = pd.read_csv('2020.csv')
df2020 = df2020[['tourney_level','winner_rank','loser_rank']]
df2021 = pd.read_csv('2021.csv')
df2021 = df2021[['tourney_level','winner_rank','loser_rank']]
df2022 = pd.read_csv('2022.csv')
df2022 = df2022[['tourney_level','winner_rank','loser_rank']]
df2023 = pd.read_csv('2023.csv')
df2023 = df2023[['tourney_level','winner_rank','loser_rank']]

result_df = pd.concat([df2013, df2014, df2015, df2016, df2017, df2018, df2019, df2020, df2021, df2022, df2023], ignore_index=True)

