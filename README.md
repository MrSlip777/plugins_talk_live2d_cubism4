# plugins_talk_live2d_cubism4
display live2d model for rpgmakerMV


［概要］
会話表示中にLive2d(cubism3.0)でキャラクターを表示させるプラグインです。
 


デモ
こんな感じでゲームに反映できます。
https://game.nicovideo.jp/atsumaru/games/gm7367

↓Live2d(cubism2.1)でのプラグインは以下になります。
https://tm.lucky-duet.com/viewtopic.php?f=5&t=1610

［準備］
１．以下のサイトからサンプルをダウンロードする
https://github.com/Live2D/CubismJsComponents

２．フォルダを解凍する
３．example/wwwroot/js/フォルダから以下のファイルをツクールMVのpluginsフォルダへ置く
　・live2dcubismframework.js
　・live2dcubismpixi.js

４．以下のサイトからlive2dcubismcore.min.jsをダウンロードし、ツクールMVのpluginsフォルダへ置く
https://live2d.github.io/#js
※live2dcubismcore.min.js→live2dcubismcore_min.jsにリネームしておく

５．以下からプラグインをDLする
https://github.com/MrSlip777/plugins_talk_live2d_cubism3

６．live2dモデル(cubism3.0)をプロジェクトのフォルダ内に置く

［ツクールMVでの設定］
１．ツクールMVを起動する

２．プラグインを上から以下の順番に設定する
　・live2dcubismcore_min.js
　・live2dcubismpixi.js
　・live2dcubismframework.js
　・Live2DPlatformManager.js
　・Live2DInterfaceMV.js

３．live2DInterfaceMVにて、live2Dモデルの各ファイル、フォルダのパスを設定する

 


※モデルは最大16モデル登録できます。

［イベント内の設定］
以下のプラグインコマンドを設定することで、Live2dモデルを操作できます。

■ 表示
　TalkLive2d モデル名 表示
　例）TalkLive2d コハル 表示

■ 消去
　TalkLive2d モデル名 消去
　例）TalkLive2d コハル 消去

■ モーション
　TalkLive2d モデル名 モーション モーション名
　※モーション名・・・〇〇.motion3.jsonの〇〇部分
　例）TalkLive2d コハル Koharu

■ モーションのループ設定
　※モーションのオプションとしてループする、しないを選択できます。
　①ループする場合
　　TalkLive2d モデル名 モーション モーション名 ループする
　②ループしない場合
　　TalkLive2d モデル名 モーション モーション名 ループしない

■ 位置変更
　TalkLive2d モデル名 右（または、中央、左）
　例）TalkLive2d コハル 左

■ 倍率変更
　TalkLive2d モデル名 倍率変更 数値
　例）TalkLive2d コハル 倍率変更 4.0

［デバッグ］
テストプレイでは実行できません。
フォルダ内のindex.htmlをEdge、IEブラウザで実行してください。

［デプロイメント］
・Win版で実行する場合
　・最新のNWでデプロイメントしたものを上書きしてください。
　↓参考
　http://b.dlsite.net/RG26890/archives/upgrading_nwjs_within_rpgmakermv
・ブラウザ版
　・ローカルサーバーは問題ありません。
　・RPGアツマールはmoc3ファイルの拡張子を.jpgに変えてください。

​

[サンプルプロジェクト]

・プラグインを入れたプロジェクトはこちらからDLできます。

http://firestorage.jp/download/9f5fd90367c7a8e9f21ebbdfbf90d0985ebbe586

​

【注意】このプロジェクトは以下のファイルを入れないと動作しません。

①"\js\plugins"に以下の3ファイルを入れてください。
live2dcubismcore_min.js
live2dcubismframework.js
live2dcubismpixi.js

​

②"CubismJsComponents-master\example\assets"から"Koharu"、"Mark_model3"を"assets"フォルダに入れてください。

​
