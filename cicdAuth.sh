#!/bin/bash

# Set variables
LAMBDA_FUNCTION_NAME="testingdi-authorizer-function"
DIST_FOLDER="authorizer/dist"
ZIP_FILE="authorizer/authorizer.zip"

# Clean up previous builds
rm -rf $DIST_FOLDER
rm -f $ZIP_FILE

# Create dist directory
mkdir -p $DIST_FOLDER

# Transpile the code
npm run build:auth

# Zip the dist folder
cd authorizer/dist
7z a ../authorizer.zip *
cd ../..

# Deploy to AWS Lambda
aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://$ZIP_FILE

echo "Deployment to $LAMBDA_FUNCTION_NAME completed successfully."
