### README.md

# CDK テストサンプル

このリポジトリは、AWS CDK を使用してテストを実装するためのサンプルプロジェクトです。AWS CDK アプリケーションのユニットテストおよび統合テストの設定と実行方法を示します。

## プロジェクト構成

- **bin/**: CDK アプリケーションのエントリーポイントが含まれています。
- **lib/**: CDK スタックの定義が含まれています。
- **lambda/**: Lambda 関数のソースコードが含まれています。
- **test/**: CDK アプリケーションのテストファイルが含まれています。
- **.husky/**: コミット前にリントおよびフォーマットを実行するフックが含まれています。
- **cdk.json**: CDK の設定ファイルです。
- **jest.config.cjs**: Jest の設定ファイルです。
- **package.json**: Node.js プロジェクトの設定ファイルです。
- **tsconfig.json**: TypeScript の設定ファイルです。
- **eslint.config.js**: ESLint の設定ファイルです。
- **.prettierrc**: Prettier の設定ファイルです。

## 前提条件

- [Node.js](https://nodejs.org/) (>= 14.x)
- [AWS CDK](https://aws.amazon.com/cdk/) (>= 2.x)
- [AWS CLI](https://aws.amazon.com/cli/)

## セットアップ

1. リポジトリをクローンします:

    ```sh
    git clone https://github.com/your-username/cdk-test-sample.git
    cd cdk-test-sample
    ```

2. 依存関係をインストールします:

    ```sh
    npm install
    ```

3. AWS 環境をブートストラップします (未実施の場合):

    ```sh
    cdk bootstrap
    ```

## テストの実行

このプロジェクトでは Jest を使用してテストを行います。テストスクリプトは `package.json` に定義されています。

- **全てのテストを実行**:

    ```sh
    npm test
    ```

- **特定のテストを実行**:

    ```sh
    npm test -- test/<test-file>.test.ts
    ```

## リンティングとフォーマット

このプロジェクトでは、ESLint と Prettier を使用してリントおよびフォーマットを行います。

- **コードをリント**:

    ```sh
    npm run lint
    ```

- **コードをフォーマット**:

    ```sh
    npm run format
    ```

コミット前にリントとフォーマッタを自動で実行するために、`husky` を使用して Git フックが設定されています。これにより、コミット前にコードが自動的にチェックされ、フォーマットされます。

## デプロイ

CDK スタックをデプロイするには、次のコマンドを実行します:

```sh
cdk deploy
```

## クリーンアップ

デプロイされたスタックを削除するには、次のコマンドを実行します:

```sh
cdk destroy
```

## コントリビューション

バグの報告や改善の提案があれば、issue を作成するかプルリクエストを送ってください。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

この `README.md` には、コミット前に `husky` によって自動的にリントとフォーマットが実行されることが明記されています。