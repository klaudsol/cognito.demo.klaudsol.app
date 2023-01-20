import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

export default handler;

async function handler(req, res) {
  
  try {
    switch(req.method) {
      case "POST":
        return create(req, res);
      default:
        throw new Error(`Unsupported method: ${req.method}`);
    }
  } catch (error) {
    await defaultErrorHandler(error, req, res);
  }
}

// POST /sessions
async function create(req, res) {
  try {
    const { username, password } = req.body;

    const config = {
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_ACCESS_SECRET 
      },
      region: process.env.MY_AWS_REGION,
    }
    const client = new CognitoIdentityProviderClient(config);
    const input = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      ClientId: process.env.MY_AWS_APP_CLIENT_ID 
    };
    const command = new InitiateAuthCommand(input);
    const response = await client.send(command);
    res.status(200).json({message: response.AuthenticationResult.IdToken});
  } catch (error) {
    if (error.name === 'NotAuthorizedException') {
      res.status(422).json({message: "Invalid username or password."});
      return;
    } else {
      console.error(error);
      res.status(500).json({message: 'Internal server error.'});
      return;
    }
  }

}
