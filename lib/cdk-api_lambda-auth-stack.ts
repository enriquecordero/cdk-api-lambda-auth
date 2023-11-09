import * as cdk from "aws-cdk-lib";
import {
  LambdaIntegration,
  RestApi,
  TokenAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkApiLambdaAuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "funLambda", {
      entry: join(__dirname, "..", "lambdas", "handler.ts"),
      handler: "handler",
    });

    const authFn = new NodejsFunction(this, "authFn", {
      entry: join(__dirname, "..", "lambdas", "authHandler.ts"),
      handler: "handler",
    });

    const auth = new TokenAuthorizer(this, "NewRequestAuth", {
      handler: authFn,
      identitySource: "method.request.header.AuthorizeToken",
     // resultsCacheTtl: cdk.Duration.hours(8),  PRD
    });

    // API
    const api = new RestApi(this, "callLambda");
    api.root
      .resourceForPath("call")
      .addMethod("GET", new LambdaIntegration(fn), {
        authorizer: auth,
      });
  }
}
