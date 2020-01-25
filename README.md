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

６．live2dモデル(cubism3.0)をプロジェクトのフォルダ内に置く<br>

## ツクールMVでの設定
１．ツクールMVを起動する<br>

２．プラグインを上から以下の順番に設定する<br>
　・live2dcubismcore_min.js<br>
　・polyfill_min.js<br>
　・live2dcubismframework_custom.js<br>
　・Live2DInterfaceMV.js<br>

３．live2DInterfaceMVにて、live2Dモデルの各ファイル、フォルダのパスを設定する<br>

※モデルは最大16モデル登録できます。<br>

## イベント内の設定
以下のプラグインコマンドを設定することで、Live2dモデルを操作できます。<br>

■ 表示<br>
　TalkLive2d モデル名 表示<br>
　例）TalkLive2d コハル 表示<br>

■ 消去<br>
　TalkLive2d モデル名 消去<br>
　例）TalkLive2d コハル 消去<br>

■ モーション<br>
　TalkLive2d モデル名 モーション グループ名 番号<br>
　※グループ名・・・jsonファイル内のMotionsの名称<br>
　例）TalkLive2d コハル Idle 1<br>

■ モーションのループ設定<br>
　※モーションのオプションとしてループする、しないを選択できます。<br>
　①ループする場合<br>
　　TalkLive2d モデル名 モーション グループ名 番号 ループする<br>
　②ループしない場合<br>
　　TalkLive2d モデル名 モーション グループ名 番号 ループしない<br>

■ 表情<br>
　TalkLive2d モデル名 表情 番号<br>
　例）TalkLive2d コハル 表情 1<br>

■ 位置変更<br>
　TalkLive2d モデル名 右（または、中央、左）<br>
　例）TalkLive2d コハル 左<br>

■ 倍率変更<br>
　TalkLive2d モデル名 倍率変更 数値<br>
　例）TalkLive2d コハル 倍率変更 4.0<br>

## デプロイメント<br>
・検証中
