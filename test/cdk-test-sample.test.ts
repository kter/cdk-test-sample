import { App, Aspects } from "aws-cdk-lib";
import { Template, Match, Capture } from "aws-cdk-lib/assertions";
import { CdkTestSampleStack } from "../lib/cdk-test-sample-stack";
import { AwsSolutionsChecks } from "cdk-nag";
import { CfnGuardValidator } from "@cdklabs/cdk-validator-cfnguard";

describe("CdkTestSampleStack", () => {
  test("Synthesizes", () => {
    const app = new App({
      // CloudFormation Guard
      policyValidationBeta1: [new CfnGuardValidator()],
    });
    const stack = new CdkTestSampleStack(app, "MyTestStack");
    const template = Template.fromStack(stack);
    // cdk nag
    Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));

    // Faine-grained assertions Test
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs20.x",
    });

    // Faine-grained assertions Test
    template.hasResourceProperties("AWS::StepFunctions::StateMachine", {
      DefinitionString: Match.serializedJson({
        StartAt: "StartState",
        States: {
          StartState: {
            Type: "Pass",
            End: true,
          },
        },
      }),
    }),
      // Snapshot Test
      // 更新時はテストが失敗するので`npm test -- -u`コマンドを実行しスナップショットをアップデートする
      expect(template.toJSON()).toMatchSnapshot();

    // Fine-grained assertions Test: Capture
    const startAtCapture = new Capture();
    const statesCapture = new Capture();
    template.hasResourceProperties("AWS::StepFunctions::StateMachine", {
      DefinitionString: Match.serializedJson({
        StartAt: startAtCapture,
        States: statesCapture,
      }),
    });
    // 開始状態がStartで始まることを確認
    expect(startAtCapture.asString()).toEqual(expect.stringMatching(/^Start/));
    // statesオブジェクトに開始ステートが存在することを確認
    expect(statesCapture.asObject()).toHaveProperty(startAtCapture.asString());
  });
});
