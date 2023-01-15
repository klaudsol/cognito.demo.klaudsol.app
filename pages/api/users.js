import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

export default handler;

async function handler(req, res) {
  
  try {
    switch(req.method) {
      case "GET":
        return get(req, res); 
      case "POST":
        return create(req, res);
      default:
        throw new Error(`Unsupported method: ${req.method}`);
    }
  } catch (error) {
    await defaultErrorHandler(error, req, res);
  }
}

// GET /users
async function get(req, res) {

  const config = {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET 
    },
    region: process.env.AWS_REGION,
  }
  const client = new CognitoIdentityProviderClient(config);
  const input = {
    UserPoolId: process.env.AWS_USER_POOL_ID
  };
  const command = new ListUsersCommand(input);
  const response = await client.send(command);
  res.status(200).json(response.Users);

}