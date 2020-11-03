/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/* 更新履歴
 * Slip 2020/10/28 新規作成
 *
 * 本プラグインの再配布、改変はLive2D Open Software licenseに準拠します。
 *
 * Live2D Open Software 使用許諾契約書
 * https://www.live2d.com/eula/live2d-open-software-license-agreement_jp.html
*/

/*:
* @plugindesc ModelData for Resetting.
* モデル再設定プラグイン
* @author Slip
*
* @param ReSettingModelData
* @desc model data for resetting
* 再設定用のモデルデータ
* @default
* @type struct<ModelconditionData>[]
*
*
* @help
* [English]
* live2d standing picture display plugin　ver1.0.0
* 
* It is a plug-in that displays a live2d (cubism 4.0) model while standing and talking.
*
*
* [日本語]
* live2d立ち絵表示プラグイン　ver1.0.0
* 
* live2d(cubism4.0)のモデルを会話中に立ち絵表示するプラグインです。
*
* 使い方：
* ↓こちらに記載しています。
* https://github.com/MrSlip777/plugins_talk_live2d_cubism4/blob/master/HowToUse_Live2DChangeModels.md
*/

/*~struct~ModelconditionData:
 * @param Modelname
 * @desc The name of the model used in the plugin command
 * プラグインコマンドで使用するモデルの名前
 * @default
 * 
 * @param folderpath
 * @desc folder path of model3.json file
 * model3.jsonファイルのフォルダパス
 * @default
 * 
 * @param motiongroupnames
 * @desc You can set the name of the motion. 
 * モーションの名称を設定できます。
 * @type note
 * @default "<basic:Idle_1,Idle_3>\n<angry:Idle_4>"
 
 * @param individual_upsidedown
 * @type boolean
 * @desc Individual upside down flag
 * 個々の上下反転フラグ
 * @default false
 *
 * @param SettingLinkEquipment
 * @type note
 * @default 装備とのモーション連動設定
 * @desc Linked setting with equipment.
 * 装備とのモーション連動設定
 * 
 * @param noWeapon
 * @desc Motion without weapon.
 * 武器なし時のモーション
 * @default
 * @parent SettingLinkEquipment
 *
 * @param noShield
 * @desc Motion without shield.
 * 盾なし時のモーション
 * @default
 * @parent SettingLinkEquipment
 * 
 * @param noHead
 * @desc Motion without head armor.
 * 頭防具なし時のモーション
 * @default
 * @parent SettingLinkEquipment
 *
 * @param noBody
 * @desc Motion without body armor.
 * 体防具なし時のモーション
 * @default
 * @parent SettingLinkEquipment
 * 
 * @param noOrnament
 * @desc Motion without ornaments.
 * 装飾品なし時のモーション
 * @default
 * @parent SettingLinkEquipment
 *  
 */

const L2DCM = PluginManager.parameters('Live2DChangeModels');
const L2DCM_modeldata = JSON.parse(JSON.stringify(L2DCM['ReSettingModelData'], L2DINstringifyReplacer));
L2DCM_modeldata.forEach(function(Ldata) {
    L2DINextractmeta(Ldata);
});

//Live2DInterfaceMV.js内の関数を上書き
Game_Live2d.prototype.initialize = function() {
    this.clear();
    this.resettng_folderpath = {};
    this.resettng_Modelname = {};
    this.resettng_meta = {};
    this.resettng_individual_upsidedown = {};
    this.resettng_noWeapon = {};
    this.resettng_noShield = {};
    this.resettng_noHead = {};
    this.resettng_noBody = {};
    this.resettng_noOrnament = {};

    var i = 1;

    L2DINmodels.forEach(function(data) {

        this.resettng_folderpath[i] = data.folderpath;
        this.resettng_Modelname[i] = data.Modelname;
        this.resettng_meta[i] = data.meta;
        this.resettng_individual_upsidedown[i] = data.individual_upsidedown;
        this.resettng_noWeapon[i] = data.noWeapon;
        this.resettng_noShield[i] = data.noShield;
        this.resettng_noHead[i] = data.noHead;
        this.resettng_noBody[i] = data.noBody;
        this.resettng_noOrnament[i] = data.noOrnament;

        i++;
    }, this);
};

Game_Live2d.prototype.Resetting_ReplaceModelData = function(destinationName,sourceName){

    var sourceData = null;

    for(var i = 0; i<=L2DCM_modeldata.length; i++){
        if(sourceName == L2DCM_modeldata[i].Modelname){
            sourceData = L2DCM_modeldata[i];
            break;
        }
    }

    if(sourceData != null){
        for(var i = 1; i<=Object.keys(this.resettng_Modelname).length; i++){
            if(destinationName == this.resettng_Modelname[i]){
                this.resettng_folderpath[i] = sourceData.folderpath;
                this.resettng_Modelname[i] = sourceData.Modelname;
                this.resettng_meta[i] = sourceData.meta;
                this.resettng_individual_upsidedown[i] = sourceData.individual_upsidedown;
                this.resettng_noWeapon[i] = sourceData.noWeapon;
                this.resettng_noShield[i] = sourceData.noShield;
                this.resettng_noHead[i] = sourceData.noHead;
                this.resettng_noBody[i] = sourceData.noBody;
                this.resettng_noOrnament[i] = sourceData.noOrnament;                
                break;
            }
        }
    }
};

Game_Live2d.prototype.Resetting_ApplyData = function(){

    IsFirstLoad = true;//モデルのロードフラグ（ロード中）
    //【注意】IsFirstLoad　は　LAppModel.prototype.setupTextures　で　false にしている

    this.Resetting_UpdateModelData();
    this._lappLive2dManager.loadModels();
        
    //セーブデータの設定値をモデルに反映
    this.ReflectSavedataToModels();
};

Game_Live2d.prototype.Resetting_UpdateModelData = function(){
    var i = 1;

    var data_no = L2DINmodels.length;

    L2DINmodels.forEach(function(data) {

        if(L2DINdisplayOrder){
            data_no = L2DINmodels.length - i + 1;
        }
        else{
            data_no = i;
        }

        this._folderpath[data_no] = this.resettng_folderpath[data_no];
        this._name[data_no] = this.resettng_Modelname[data_no];
        var strCopy = this.resettng_folderpath[data_no].split('/');
        this._model[data_no] = strCopy[strCopy.length - 2];        
        this.meta[data_no] = this.resettng_meta[data_no];

        //個々の上下反転フラグ（全体のフラグ、または個々のフラグがtrueになっていると上下反転の表示）
        this.individual_upsidedown[data_no] = this.resettng_individual_upsidedown[data_no];

        //装備品、衣装変更時に使用。装備なし時のモーション
        this.linkEquip_None[data_no][0] = this.resettng_noWeapon[data_no];
        this.linkEquip_None[data_no][1] = this.resettng_noShield[data_no];
        this.linkEquip_None[data_no][2] = this.resettng_noHead[data_no];
        this.linkEquip_None[data_no][3] = this.resettng_noBody[data_no];
        this.linkEquip_None[data_no][4] = this.resettng_noOrnament[data_no];

        //ニューゲーム、コンテニューに関わらず以下の設定にする
        this.visible[data_no] = false;
        this.scale[data_no] = 1.0;
        this.A[data_no] = 1.0;
        this.R[data_no] = 1.0;
        this.G[data_no] = 1.0;
        this.B[data_no] = 1.0;
        this._duration[data_no] = 0;
        this.pos_x[data_no] =this._pos_middle;
        this.pos_y[data_no] = 0;
        this.motionGroup[data_no] = "Idle";
        this.motionNumber[data_no] = 1;
        this.motionLoop[data_no] = false;
        this.paraminitskip[data_no] = false;

        i++;
    }, this);
};


(function(){
    'use strict'

    // プラグインコマンド
    const Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TalkLive2d_Resetting') {
            switch (args[0]) {
                case 'Replace':
                case 'モデル置換':
                    $gameLive2d.Resetting_ReplaceModelData(args[1],args[2]);
                    break;
                case 'Apply':
                case '反映':
                    $gameLive2d.Resetting_ApplyData();
                    break;
                default:
                    break;
            }
        }
    }

})();

//セーブデータの設定値をモデルに反映(Live2DInterfaceMVの書き換え)
Game_Live2d.prototype.ReflectSavedataToModels = function(){

    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
        var saveobj = this._live2dmodelsaveonly[i];
        //追加した部分
        if(saveobj.name){
            this.visible[i] = saveobj.visible;
            this.scale[i] = saveobj.scale;
            this.pos_x[i] = saveobj.pos_x;
            this.pos_y[i] = saveobj.pos_y;

            $gameLive2d._lappLive2dManager._models.at(i-1).motionGroup_Default
             = saveobj.motionGroup;
             $gameLive2d._lappLive2dManager._models.at(i-1).motionNumber_Default
             = saveobj.motionNumber;
             $gameLive2d._lappLive2dManager._models.at(i-1).motionLoop_Default
             = saveobj.motionLoop;
             $gameLive2d._lappLive2dManager._models.at(i-1).paraminitskip_Default
             = saveobj.paraminitskip;
            this.meta[i] = saveobj.meta;

            this.resettng_folderpath[i] = saveobj.folderpath;
            this.resettng_Modelname[i] = saveobj.name;
            this.resettng_individual_upsidedown[i] = saveobj.individual_upsidedown;
            this.resettng_meta[i] = saveobj.meta;

            this.resettng_noWeapon[i] = saveobj.noWeapon;
            this.resettng_noShield[i] = saveobj.noShield;
            this.resettng_noHead[i] = saveobj.noHead;
            this.resettng_noBody[i] = saveobj.noBody;
            this.resettng_noOrnament[i] = saveobj.noOrnament;
        }
    }
};

//内部のモーション名 (Live2DInterfaceMVの書き換え)
Game_Live2d.prototype.InnerMotionName = function (name, group){
    var index = 0;//0はモデルの指定なし番号
    
    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
        if($gameLive2d._name[i] == name){
            index = i;
            break;
        }
    }

    if(index > 0){
        const innerMotionName = $gameLive2d.meta[index][group];

        return innerMotionName;
    }else{
        return null;
    }
};
