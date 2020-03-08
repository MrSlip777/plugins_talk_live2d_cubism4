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

### Show / Hide
■ Show<br>
　TalkLive2d "Model name" show<br>
　ex) TalkLive2d Koharu show<br>

■ Hide<br>
　TalkLive2d "Model name" hide<br>
  ex) TalkLive2d Koharu hide<br>

### Motion
■ Preparation <br>
 Motion can be started with the character string set in motiongroupnames. <br>
   <Motion group name: Group name> <br>
   ex) <Basic: Idle_1, Idle_7> <br>
  * Multiple group names can be set (up to 4) <br>
  * Group name: Name of Motions in model3.json file <br>

■ Motion <br>
 TalkLive2d Model name Motion group name Do not loop <br>
  * Do not loop ... setting to loop if there is no entry <br>
  This is reflected in the last motion loop in the set. <br>
  When not looping, it becomes invisible when the loop point of the last motion is reached. <br>
  ex) TalkLive2d Koharu Basic Motion <br>
  When this command is executed, the corresponding model is automatically made visible. <br>
  To perform this command and position adjustment at the same time <br>
  Please specify the position first. <br>

■ Motion(Internal data format)<br>
　TalkLive2d "Model name" motion "Group name" "Number"<br>
　※Group name・・・Motions name in model3.json file<br>
  ex) TalkLive2d Koharu Idle 1<br>

■ Motion loop settings<br>
　※You can choose to loop or not as a motion option.<br>
　①When to loop<br>
　　TalkLive2d "Model name" motion "Group name" "Number" loop<br>
　②When not to loop<br>
　　TalkLive2d "Model name" motion "Group name" "Number" noloop<br>

### Expression
■ Expression<br>
　TalkLive2d "Model name" expression "Number"<br>
　ex) TalkLive2d Koharu expression 1<br>

【Supplementary expression names】<br>
Set the expression name in the model3.json file as follows.<br>
○at rpgmakerMV<br>
![rpgmakerMV](https://user-images.githubusercontent.com/17643697/76080779-08559080-5feb-11ea-8230-ff2a17661c53.png)<br>
○at model3.json<br>
![model3.json](https://user-images.githubusercontent.com/17643697/76080786-0b508100-5feb-11ea-9e96-95df2c43432f.png)<br>

### Position
■ Position change<br>
　TalkLive2d "Model name" right（or middle, or left）<br>
　ex) TalkLive2d Koharu left<br>

■ Change magnification<br>
　TalkLive2d "Model name" scale "Number"<br>
　ex) TalkLive2d Koharu scale 4.0<br>

## Deployment<br>
・During verification
