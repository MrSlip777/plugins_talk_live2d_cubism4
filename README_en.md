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
   editor <Motion group name: Group name> <br>
   ex) <Basic: Idle_1><br>
   
   If two sets are set, the motion will play continuously.<br>
   ex) <Angry: Idle_1, Idle_7> <br>
  * Group name: Name of Motions in model3.json file <br>

■ Motion <br>
 TalkLive2d Model name Motion group name Do not loop <br>
  * Do not loop ... setting to loop if there is no entry <br>
  This is reflected in the last motion loop in the set. <br>
  When not looping, it becomes invisible when the loop point of the last motion is reached. <br>
  ex) TalkLive2d Koharu Basic<br>
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

■ Change position (X) <br>
　TalkLive2d "Model name" X position Numerical value (1 to canvas width) <br>
　Example: TalkLive2d Koharu X position 100 <br>

■ Change position (Y) <br>
　TalkLive2d "Model name" Y position Numerical value (1 to canvas height) <br>
　Example) TalkLive2d Koharu Y position 100 <br>

■ Change position (details) <br>
　TalkLive2d model name right (or center, left) <br>
　Example) TalkLive2d Koharu left <br>

  TalkLive2d Model name Position x y duration wait <br>
  (Wait for duration when there is a wait) <br>
  ex) TalkLive2d Koharu position 50 50 10 wait <br>
  When a duration greater than 0 is specified and <br>
  Especially if you have not set the weight <br>
  Please pay attention to the model settings after that. <br>
  (Even if you open and close the menu <br>
    Basically, the moving state of the model is maintained. ) <br>

### Others
■ Change magnification<br>
　TalkLive2d "Model name" scale "Number"<br>
　ex) TalkLive2d Koharu scale 4.0<br>

■ Skip parameter initialization
　TalkLive2d "Model name" paraminitskip true <br>
　ex) TalkLive2d Koharu paraminitskip true <br>
  When returning, TalkLive2d Koharu paraminitskip false <br>
  If false, initialize the parameters at the moment of execution. <br>
  The model of this plug-in implementation from here on <br>
  All parameter initialization timings are skipped. <br>
  (From the next timing seen in the model from the time of execution of this command) <br>
