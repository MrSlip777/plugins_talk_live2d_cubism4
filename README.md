# plugins_talk_live2d_cubism4

## 概要
会話表示中にLive2d(cubism4.0)でキャラクターを表示させるプラグインです。

## 準備
１．Cubism SDK for Webをダウンロードする<br>
https://www.live2d.com/download/cubism-sdk/<br>

２．フォルダを解凍する<br>
３．Coreフォルダの"live2dcubismcore.min.js"をツクールMVのpluginsフォルダへ置く<br>
※live2dcubismcore.min.js→live2dcubismcore_min.jsにリネームしておく<br>

４．以下のURLから"polyfill.min.js"をダウンロードし、ツクールMVのpluginsフォルダへ置く<br>
https://www.jsdelivr.com/package/npm/promise-polyfill?version=8.0.0&path=dist<br>
※polyfill.min.js→polyfill_min.jsにリネームしておく<br>

５．以下からプラグインをダウンロードする<br>
https://github.com/MrSlip777/plugins_talk_live2d_cubism4<br>
※clone or Downloadからダウンロードできます。

６．live2dモデル(cubism4.0)をプロジェクトのフォルダ内に置く<br>

## ツクールMVでの設定
１．ツクールMVを起動する<br>

２．プラグインを上から以下の順番に設定する<br>
　・polyfill_min.js<br>
　・live2dcubismcore_min.js<br>
　・live2dcubismframework_custom.js<br>
　・Live2DInterfaceMV.js<br>

３．live2DInterfaceMVにて、live2Dモデルのフォルダのパスを設定する<br>

※末尾のフォルダ名とmodel3.jsonのファイル名は同じにしてください。<br>
例）フォルダ名：/assets/koharu/<br>
    model3.jsonファイル名：koharu.model3.json<br>

## イベント内の設定
以下のプラグインコマンドを設定することで、Live2dモデルを操作できます。<br>

### 表示・非表示
■ 表示<br>
　TalkLive2d モデル名 表示<br>
　例）TalkLive2d コハル 表示<br>

■ 消去<br>
　TalkLive2d モデル名 消去<br>
　例）TalkLive2d コハル 消去<br>

### モーション
 ■事前準備<br>
 　motiongroupnamesで設定した文字列(モーション組名)でモーションを開始できます。<br>
   <モーション組名:グループ名><br>
   例）<きほん:Idle_1,Idle_7><br>
  ※グループ名は複数設定できます（最大4）<br>
  ※グループ名・・・model3.jsonファイル内のMotionsの名称<br>
 ■ モーション<br>
 　TalkLive2d モデル名 モーション組名 ループしない<br>
  ※ループしない・・・記入がない場合ループする設定<br>
  組の内最後のモーションのループに反映されます。<br>
  ループしない場合最後のモーションのループ地点到達時に不可視状態になります。<br>
 　例）TalkLive2d コハル 基本モーション<br>
  このコマンド実行時には該当のモデルは自動的に可視状態にします。<br>
  このコマンドと位置調整を同時に行いたいときは<br>
  位置の指定を先に行ってください。<br>

■ モーション(内部データ形式)<br>
　TalkLive2d モデル名 モーション グループ名 番号<br>
　※グループ名・・・model3.jsonファイル内のMotionsの名称<br>
　例）TalkLive2d コハル Idle 1<br>

■ モーションのループ設定<br>
　※モーションのオプションとしてループする、しないを選択できます。<br>
　①ループする場合<br>
　　TalkLive2d モデル名 モーション グループ名 番号 ループする<br>
　②ループしない場合<br>
　　TalkLive2d モデル名 モーション グループ名 番号 ループしない<br>
### 表情
■ 表情<br>
　TalkLive2d モデル名 表情 表情名<br>
　例）TalkLive2d コハル 表情 表情名<br>

【表情名の補足】<br>
表情名はmodel3.jsonファイル内で以下のように設定します。<br>
<image>https://user-images.githubusercontent.com/17643697/76080779-08559080-5feb-11ea-8230-ff2a17661c53.png</image>
https://user-images.githubusercontent.com/17643697/76080779-08559080-5feb-11ea-8230-ff2a17661c53.png
https://user-images.githubusercontent.com/17643697/76080786-0b508100-5feb-11ea-9e96-95df2c43432f.png

### 位置変更
■ 位置変更<br>
　TalkLive2d モデル名 右（または、中央、左）<br>
　例）TalkLive2d コハル 左<br>
 
■ 位置変更(X)<br>
　TalkLive2d モデル名 X位置 数値(1～キャンバス幅)<br>
　例）TalkLive2d コハル X位置 100<br>

■ 位置変更(Y)<br>
　TalkLive2d モデル名 Y位置 数値(1～キャンバス高さ)<br>
　例）TalkLive2d コハル Y位置 100<br>

■ 位置変更（詳細）<br>
 　TalkLive2d モデル名 右（または、中央、左）<br>
 　例）TalkLive2d コハル 左<br>

   TalkLive2d モデル名 位置 x y duration wait<br>
   (waitの記入がある時duration分ウェイト)<br>
   例）TalkLive2d コハル 位置 50 50 10 wait<br>
   0を超えるdurationを指定した場合かつ<br>
   ウェイト設定をしていない場合には特に<br>
   その後のモデル設定などに注意してください。<br>
   (メニュー開閉などを挟んでも<br>
    基本的にモデルの移動状態は維持しています。)<br>

■ 倍率変更<br>
　TalkLive2d モデル名 倍率変更 数値<br>
　例）TalkLive2d コハル 倍率変更 4.0<br>

■ パラメータ初期化スキップ
 　TalkLive2d モデル名 パラメータ初期化スキップ true<br>
 　例）TalkLive2d コハル パラメータ初期化スキップ true<br>
   戻す時はTalkLive2d コハル パラメータ初期化スキップ false<br>
   falseの場合は実行した瞬間にパラメータを初期化します。<br>
   これ以降のこのプラグインによる実装のモデルの<br>
   パラメータ初期化タイミングは全てスキップします。<br>
   （このコマンド実行時点からモデルで見た次のタイミングから）<br>

## デプロイメント<br>
・検証中
