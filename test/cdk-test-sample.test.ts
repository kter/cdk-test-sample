import { App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { CdkTestSampleStack } from '../lib/cdk-test-sample-stack';

describe('CdkTestSampleStack', () => {
  test('Synthesizes', () => {
    const app = new App();
    const stack = new CdkTestSampleStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);

    // Faine-grained assertions Test
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs20.x',
    });

    // Faine-grained assertions Test
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: Match.serializedJson(
        {
        StartAt: "StartState",
        States: {
          StartState: {
            Type: "Pass",
            End: true
          }
        }
        }
      )}),

    // Snapshot Test
    // 更新時はテストが失敗するので`npm test -- -u`コマンドを実行しスナップショットをアップデートする
    expect(template.toJSON()).toMatchSnapshot();
  });
});


