#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# User prompt for custom authorizer deployment
read -p "Deploy custom authorizer (y/N)? " DEPLOY_AUTHORIZER

if [[ "$DEPLOY_AUTHORIZER" =~ ^[Yy]$ ]]; then
  # Authorizer directory path
  AUTHORIZER_DIR="${SOURCE_DIR}/authorizer"

  # Check if authorizer directory exists
  if [ ! -d "$AUTHORIZER_DIR" ]; then
    echo "Authorizer directory not found. Skipping..."
    exit 0
  fi

  # Transpile authorizer code using esbuild (replace with your transpiler if needed)
  echo "Transpiling authorizer code..."
  npx esbuild ${$AUTHORIZER_DIR}/**/*.ts --splitting --chunk-names:'./chunks[name]-[hash]' --outdir=${$AUTHORIZER_DIR}/dist --bundle --platform=node --packages=external --out-extension:.js=.mjs --external:'aws-lambda' --external:'yup' --external:'@aws-sdk/client-kms' --external:'prisma' --external:'@prisma/client' --format=esm --target:'ES2022'

  # Bundle the transpiled code with 7zip
  echo "Bundling authorizer code with 7zip..."
  7z a -tzip "${AUTHORIZER_DIR}"/authorizer.zip "${AUTHORIZER_DIR}"/dist/*

  # Lambda function name for deployment (replace with yours)
  LAMBDA_FUNCTION_NAME="testingdi-authorizer-function"

  # Upload the authorizer zip to Lambda
  echo "Uploading authorizer.zip to Lambda function: ${LAMBDA_FUNCTION_NAME}..."
  aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_NAME} --zip-file fileb://"${AUTHORIZER_DIR}"/authorizer.zip

  # Clean up
  rm "${AUTHORIZER_DIR}"/authorizer.zip

# # Function to prompt for user input
# prompt_for_bucket_name() {
#   read -p "Please enter the S3 bucket name: " S3_BUCKET_NAME
#   if [ -z "$S3_BUCKET_NAME" ]; then
#     echo "S3 bucket name cannot be empty. Please try again."
#     prompt_for_bucket_name
#   fi
# }
# # Function to prompt for user input
# prompt_for_lambda_name() {
#   read -p "Please enter the Lambda function name: " LAMBDA_FUNCTION_NAME
#   if [ -z "$LAMBDA_FUNCTION_NAME" ]; then
#     echo "Lambda function name cannot be empty. Please try again."
#     prompt_for_input
#   fi
# }

# # hardcoded variables
S3_BUCKET_NAME="testingdi-lambda-code"
LAMBDA_FUNCTION_NAME="testingDI"

rm -rf "${DIST_DIR}/*"

# Directory paths
SOURCE_DIR="$(pwd)"
AUTHORIZER_DIR="${SOURCE_DIR}/authorizer/dist"
# PRISMA_SRC_DIR="${SOURCE_DIR}/src/prisma"
# PRISMA_DIST_DIR="${AUTHORIZER_DIR}/src/prisma"

# Step 1: Transpile the TypeScript code
echo "Running npm build..."
npm run build:auth

# Step 2: Copy the prisma folder to dist/src
# echo "Copying prisma folder to dist/src..."
# mkdir -p "${PRISMA_DIST_DIR}"
# cp -r "${PRISMA_SRC_DIR}/." "${PRISMA_DIST_DIR}"

# Step 3: Copy the .env file to dist directory
# echo "Copying .env to dist directory..."
# cp "${SOURCE_DIR}/.env" "${DIST_DIR}"

# Step 4: Move package.json to dist directory
# echo "Copying package.json to dist directory..."
# cp "${SOURCE_DIR}/package.json" "${DIST_DIR}"

# Step 5: Install production dependencies and generate Prisma client
cd "${AUTHORIZER_DIR}"

echo "Installing production dependencies..."
npm install --production

# echo "Generating Prisma client..."
# npx prisma generate

# Step 6: Delete the .env file before zipping
echo "Deleting .env file from dist directory..."
rm "${AUTHORIZER_DIR}/.env"
find "${AUTHORIZER_DIR}/node_modules/.bin" -mindepth 1 -delete
find "${AUTHORIZER_DIR}/node_modules/.cache" -mindepth 1 -delete
rm -rf "${AUTHORIZER_DIR}/node_modules/prisma"
rm -rf "${AUTHORIZER_DIR}/node_modules/@prisma/engines"

# Step 7: Zip the contents of the dist directory using 7zip
echo "Zipping the contents of the dist directory..."
cd "${AUTHORIZER_DIR}"
7z a -tzip "${AUTHORIZER_DIR}/dist.zip" *

# # Prompt for S3 bucket name
# prompt_for_bucket_name

# Step 8: Upload to S3
echo "Uploading dist.zip to s3://${S3_BUCKET_NAME}/..."
aws s3 cp "${AUTHORIZER_DIR}/dist.zip" "s3://${S3_BUCKET_NAME}/"

# Step 9: Return the S3 object link
S3_OBJECT_URL="https://s3.amazonaws.com/${S3_BUCKET_NAME}/dist.zip"
echo "Deployment completed. S3 Object URL: ${S3_OBJECT_URL}"

# Return the S3 object link
echo "S3 Object URL: ${S3_OBJECT_URL}"

# # Prompt for lambda functionn name
# prompt_for_lambda_name

# Step 10: Upload the S3_OBJECT_URL to the specified Lambda function
echo "Uploading S3 object URL to Lambda function: ${LAMBDA_FUNCTION_NAME}..."
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_NAME} --s3-bucket ${S3_BUCKET_NAME} --s3-key dist.zip
# Clean up
rm "${AUTHORIZER_DIR}/dist.zip"
rm "${AUTHORIZER_DIR}/dist"

