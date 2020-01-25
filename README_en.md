# plugins_talk_live2d_cubism4

## Overview
It is a plug-in that displays characters with Live2d (cubism 4.0) during conversation display.

## Preparation
１．Download Cubism SDK for Web<br>
https://www.live2d.com/download/cubism-sdk/<br>

２．Unzip folder<br>
３．Put "live2dcubismcore.min.js" in Core folder to plugins folder of Maker MV<br>
※Rename from live2dcubismcore.min.js to live2dcubismcore_min.js<br>

４．Download "polyfill.min.js" from the following URL and place it in the plugins folder of Maker MV<br>
https://www.jsdelivr.com/package/npm/promise-polyfill?version=8.0.0&path=dist<br>
※Rename from polyfill.min.js to polyfill_min.js<br>

５．Download plugin from<br>
https://github.com/MrSlip777/plugins_talk_live2d_cubism4<br>
※Download for "clone or Download"

６．Put live2d model (cubism4.0) in project folder<br>

## Settings in Maker MV
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
