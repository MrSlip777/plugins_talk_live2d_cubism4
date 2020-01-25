# plugins_talk_live2d_cubism4

## 概要
会話表示中にLive2d(cubism3.0)でキャラクターを表示させるプラグインです。

デモ（作成中）

## 準備
１．Cubism SDK for Webをダウンロードする<br>
https://www.live2d.com/download/cubism-sdk/

２．フォルダを解凍する<br>
３．Coreフォルダの"live2dcubismcore.min.js"をツクールMVのpluginsフォルダへ置く<br>
※live2dcubismcore.min.js→live2dcubismcore_min.jsにリネームしておく<br>

４．以下のURLから"polyfill.min.js"をダウンロードし、ツクールMVのpluginsフォルダへ置く<br>
https://www.jsdelivr.com/package/npm/promise-polyfill?version=8.0.0&path=dist
※polyfill.min.js→polyfill_min.jsにリネームしておく<br>

５．以下からプラグインをDLする<br>
https://github.com/MrSlip777/plugins_talk_live2d_cubism3

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

## デプロイメント
・Win版で実行する場合
　・最新のNWでデプロイメントしたものを上書きしてください。
　↓参考
　http://b.dlsite.net/RG26890/archives/upgrading_nwjs_within_rpgmakermv
・ブラウザ版
　・ローカルサーバーは問題ありません。
　・RPGアツマールはmoc3ファイルの拡張子を.jpgに変えてください。
