export const handler = async function (event: any) {

//Log the event
  console.log("EVENT!!!", JSON.stringify(event, undefined, 2));
  const token = event.authorizationToken;

  let effect = 'Deny';

  // See if the person's token is valid
  if (token == "abc") {
    effect = 'Allow';
  } else {
    effect = 'Deny';
  }
// Construct and return return  
  let policy = {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: event.methodArn,
        },
      ],
    },
  };
  return policy;
};
