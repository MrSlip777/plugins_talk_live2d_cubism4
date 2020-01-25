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
１．Start RPGMaker MV<br>

２．Set plug-ins in the following order from the top<br>
　・live2dcubismcore_min.js<br>
　・polyfill_min.js<br>
　・live2dcubismframework_custom.js<br>
　・Live2DInterfaceMV.js<br>

３．Set the path of each file and folder of live2D model in Live2DInterfaceMV<br>

※Up to 16 models can be registered.<br>

## Settings in the event
The Live2d model can be operated by setting the following plug-in commands.<br>

■ Display<br>
　TalkLive2d "Model name" show<br>
　例）TalkLive2d Koharu show<br>

■ Erase<br>
　TalkLive2d "Model name" hide<br>
　例）TalkLive2d Koharu hide<br>

■ Motion<br>
　TalkLive2d "Model name" motion "Group name" "Number"<br>
　※Group name・・・Motions name in json file<br>
　例）TalkLive2d Koharu Idle 1<br>

■ Motion loop settings<br>
　※You can choose to loop or not as a motion option.<br>
　①When to loop<br>
　　TalkLive2d "Model name" motion "Group name" "Number" loop<br>
　②When not to loop<br>
　　TalkLive2d "Model name" motion "Group name" "Number" noloop<br>

■ Expression<br>
　TalkLive2d "Model name" expression "Number"<br>
　例）TalkLive2d Koharu expression 1<br>

■ 位置変更<br>
　TalkLive2d モデル名 右（または、中央、左）<br>
　例）TalkLive2d コハル 左<br>

■ 倍率変更<br>
　TalkLive2d モデル名 倍率変更 数値<br>
　例）TalkLive2d コハル 倍率変更 4.0<br>

## デプロイメント<br>
・検証中
