#this file is implementing scikit/xgboost for regression as well as a simpler model for comparison

#simple model using sci-kit learn
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

transformer = PolynomialFeatures(degree=2, include_bias=False)

#advanced model using xgboost
