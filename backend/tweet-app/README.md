## Set up AWS credentials for DynamoDB

You need to create two files to configure AWS to be able to reach DynamoDB.
This is required in local only as these settings will be done automatically by ECS for the tasks defined. The default region will be the region ECS is configured in.

The files should be created under `~/.aws`, where the tilde character (~) represents your home directory.

**Note:** In Windows the .aws folder will be at `C:/Users/<YOUR_USERNAME>/.aws`

Create two files under the `.aws` folder called `config` and `credentials`

#### File 1: config

This file will hold the region setting. Assuming you want to set the region as AP-SOUTH-1 (Mumbai) the below will be the file content.

```
[default]
region = ap-south-1
```

#### File 2: credentials

This file will hold the user credentials/access tokens. Below is the file structure.

```
[default]
aws_access_key_id = {AWS access key ID goes here}
aws_secret_access_key = {Secret key goes here}
```
