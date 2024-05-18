import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkTestSampleStack } from '../lib/cdk-test-sample-stack';

describe('CdkTestSampleStack', () => {
  test('Synthesizes', () => {
    const app = new App();
    const stack = new CdkTestSampleStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs20.x',
    });

    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: JSON.stringify({
        StartAt: "StartState",
        States: {
          StartState: {
            Type: "Pass",
            End: true
          }
        }
      })
    });

    // Snapshot Test
    expect(template.toJSON()).toMatchSnapshot();
  });
});

