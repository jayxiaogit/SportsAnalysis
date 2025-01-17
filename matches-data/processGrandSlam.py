def GrandSlamEarnings(inputRanking):
    import pandas as pd
    import matplotlib.pyplot as plt
    import random
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import mean_squared_error, r2_score

    # Read the CSV file into a DataFrame
    df = pd.read_csv("GrandSlamData.csv")

    # Filter missing or invalid data and drop duplicates
    df = df.dropna()
    df = df.drop_duplicates()

    # Initialize empty lists to store the results
    result_array = []

    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Get the value of the first column (assuming rank data is in the first column)
        rank = row[0]
        if rank >= 800:
            continue
    
        # Get the value of column 1 (assuming column index starts from 0)
        col_1_value = row[1]
    
        # Determine the new rank based on the value of column 1
        if col_1_value == "W":
            new_rank = random.randint(2496039, 3000000)
        elif col_1_value == "F":
            new_rank = random.randint(1248019, 1500000)
        elif col_1_value == "SF":
            new_rank = random.randint(683698, 775000)
        elif col_1_value == "QF":
            new_rank = random.randint(434094, 455000)
        elif col_1_value == "R16":
            new_rank = random.randint(260456, 284000)
        elif col_1_value == "R32":
            new_rank = random.randint(154103, 191000)
        elif col_1_value == "R64":
            new_rank = random.randint(105268, 123000)
        elif col_1_value == "R128":
            new_rank = random.randint(74881, 81500)
        elif col_1_value == "QF":
            new_rank = random.randint(25000, 44000) #this is not accurate
    
        # Add the rank and new rank to the result array
        result_array.append([rank, new_rank])

    # Convert the result array to a DataFrame
    result_df = pd.DataFrame(result_array, columns=['Rank', 'Earnings'])

    # Split the data into features (X) and target variable (y)
    X = result_df[['Rank']]
    y = result_df['Earnings']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a Random Forest Regression model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)  # You can adjust n_estimators

    # Train the model
    rf_model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = rf_model.predict(X_test)

    # Evaluate the model's performance
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print("Mean Squared Error:", mse)
    print("R-squared:", r2)

    # Plot the data as a scatter plot
    plt.figure(figsize=(10, 6))
    plt.scatter(result_df['Rank'], result_df['Earnings'], marker='o', color='blue', label='Original Data')
    plt.scatter(X_test, y_pred, marker='x', color='red', label='Predicted Data')
    plt.title('Rank vs Earnings (Random Forest Regression)')
    plt.xlabel('Rank')
    plt.ylabel('Earnings')
    plt.legend()
    plt.grid(True)
    plt.ticklabel_format(style='plain', axis='y')

    # Reshape the new rank to match the model's input shape
    new_rank_reshaped = [[inputRanking]]

    # Make prediction on the new data point
    predicted_earnings = rf_model.predict(new_rank_reshaped)

    print("Predicted Earnings:", predicted_earnings)

    return predicted_earnings


    # plt.show() can uncomment to plot
