def PremierPoints(scope):
    import pandas as pd
    import matplotlib.pyplot as plt
    import random
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import mean_squared_error, r2_score

    # Read the CSV file into a DataFrame
    df = pd.read_csv("Premier.csv")

    # Filter missing or invalid data and drop duplicates
    df = df.dropna()
    df = df.drop_duplicates()

    # Initialize empty lists to store the results
    result_array = []

    # Iterate over each row in the DataFrame
    for index, row in df.iterrows():
        # Get the value of the first column (assuming rank data is in the first column)
        rank = row[0]
    
        # Get the value of column 1 (assuming column index starts from 0)
        col_1_value = row[1]
    
        # Determine the new rank based on the value of column 1
        if col_1_value == "W":
            new_rank = 500
        elif col_1_value == "F":
            new_rank = 300
        elif col_1_value == "SF":
            new_rank = 180
        elif col_1_value == "QF":
            new_rank = 90
        elif col_1_value == "R16":
            new_rank = 45
        elif col_1_value == "R32":
            new_rank = 20

    
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
    predicted_earnings = []
    for i in range(1, scope):
        new_rank_reshaped = [[i]]

        # Make prediction on the new data point
        predicted_earnings.append(rf_model.predict(new_rank_reshaped))

    return predicted_earnings


    # plt.show() can uncomment to plot
