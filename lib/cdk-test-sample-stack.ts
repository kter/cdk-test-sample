import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StateMachine, Pass } from 'aws-cdk-lib/aws-stepfunctions';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class CdkTestSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const stateMachine = new StateMachine(this, 'CdkTestSampleStateMachine', {
      definition: new Pass(this, 'StartState'),
    });

    const func = new Function(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: Code.fromAsset('lambda'),
      environment: {
        STATE_MACHINE_ARN: stateMachine.stateMachineArn,
      },
    });
    stateMachine.grantStartExecution(func);

  }
}
