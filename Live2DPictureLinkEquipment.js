/*
* Live2D着替え連動立ち絵スクリプト
*
*/

/*:
* @plugindesc Live2D changing clothes stand-up plugin.
* Live2D着替え連動立ち絵プラグイン
* @author Slip
*
* @param FirstPictureNumber
* @type number
* @default 10
* @desc PictureNumber at 1st party.
* 先頭キャラクターのピクチャ番号
*
* @param DefaultBodyPicture
* @desc 装備なし時のピクチャ
* @default
* @type struct<DefaultBodyPictureData>[]
*
* @help
* [概要]
* このプラグインはキャラクターの装備品とピクチャ表示変更を連動させるプラグインです。
* Live2DInterfaceMV.jsが有効になっていることを前提として動作します。
*
* [ピクチャ番号について]
* パーティメンバー1人に対して6枚のピクチャを使用します。
* ※4人パーティの場合は4×6で24枚のピクチャを使用します。
* そのため4人パーティでFirstPictureNumberを10にした場合は
* 10～33をこのプラグインで使用することになります。
*
* [ピクチャの格納先と名前について]
* 使用するピクチャはimg\picturesに格納してください。 
* 装備名とピクチャの名前は一緒にしてください。
*
* [プラグイン管理での設定項目の説明]
* □FirstPictureNumber
* 使用する先頭のピクチャ番号を指定します。
* 
* □DefaultBodyPicture
* 装備なし時のピクチャを指定します。（Live2Dモデルと連動します）
* 
* modelName : 連動させるLive2Dのモデル名
* bodyPicture : 装備なし時のピクチャ名
*
* [プラグインコマンド]
* □指定した立ち絵の表示
* TalkLive2d_Picture 名前 show X位置 Y位置 
* 例）TalkLive2d_Picture ヒヨリ show 400 225
*
* □指定した立ち絵の消去
* TalkLive2d_Picture 名前 hide
* 例）TalkLive2d_Picture ヒヨリ hide
*/

/*~struct~DefaultBodyPictureData:
* @param modelName
* @desc 名前
* @default
*
* @param bodyPicture
* @desc 装備なし時のピクチャ
* @default
*/

const L2DPLE = PluginManager.parameters('Live2DPictureLinkEquipment');

const L2DPLE_FirstPictureNumber = Number(L2DPLE['FirstPictureNumber']) || 10;

const L2DPLE_DefaultBodyPicture = JSON.parse(JSON.stringify(L2DPLE['DefaultBodyPicture'], L2DINstringifyReplacer));

//装備とモデルの連動
Live2DManager.prototype.live2dClothLinkEquipment = function(){

    //衣装変更用
    for(var i = 0; i<$gameParty._actors.length; i++){
        for(var number in $gameLive2d._name){
            if($gameParty.members()[i]._name == $gameLive2d._name[number]){
                for(var j = 0; j<5; j++){//装備スロット
                    if($gameLive2d.linkEquip_None[number][j] != ""){
                        var index = $gameParty.members()[i]._equips[j]._itemId;
                        var cloth_name = null;

                        if($dataArmors[index]){
                            cloth_name = $dataArmors[index].name;
                        }
                        else{
                            cloth_name = $gameLive2d.linkEquip_None[number][j];
                        }

                        //ピクチャへの反映
                        $gameLive2d_linkEquipment.setPicture(i,j,cloth_name,$gameLive2d.linkEquip_None[number][j]);

                        var innerMotionName = null;

                        innerMotionName = $gameLive2d.InnerMotionName($gameLive2d._name[number],cloth_name);
                        var modelNo = Live2DManager.prototype.getNumberFromName($gameLive2d._name[number]);

                        $gameLive2d._lappLive2dManager._models.at(modelNo-1).setClothMotion(innerMotionName);
                    }
                }
            }
        }
    };
};

function PictureData(name,number){
    this.name = name;
    this.number = number;
};

$gameLive2d_linkEquipment = null;

function Live2DPictureLinkEquipment() {
    this.initialize.apply(this, arguments);
};

Live2DPictureLinkEquipment.prototype.constructor = Live2DPictureLinkEquipment;

Live2DPictureLinkEquipment.prototype.getPictureName = function(name){

    for(var i = 0; i<L2DPLE_DefaultBodyPicture.length; i++){
        if(L2DPLE_DefaultBodyPicture[i].modelName == name){
            return L2DPLE_DefaultBodyPicture[i].bodyPicture;
        }
    }
    return "";
};

Live2DPictureLinkEquipment.prototype.initialize = function() {

    this._body = {};
    this._weapon = {};
    this._shield = {};
    this._head = {};
    this._armer = {};
    this._ornament = {};
};

//パーティメンバーの装備を設定値に反映する
Live2DPictureLinkEquipment.prototype.ApplyClothdataFromParty = function() {

    for(var i = 0; i<$gameParty._actors.length; i++){

        var pictureName = null;

        for(var j = 0; j<L2DPLE_DefaultBodyPicture.length; j++){
            if($gameParty.members()[i]._name == L2DPLE_DefaultBodyPicture[j].modelName){
                pictureName = this.getPictureName(L2DPLE_DefaultBodyPicture[j].modelName);
                break;
            }
            else{
                pictureName = "";
            }
        }

        this._body[i] = new PictureData(pictureName,L2DPLE_FirstPictureNumber + i*6);
        this._weapon[i] = new PictureData("",L2DPLE_FirstPictureNumber + 1 + i*6);
        this._shield[i] = new PictureData("",L2DPLE_FirstPictureNumber + 2 + i*6);
        this._head[i] = new PictureData("",L2DPLE_FirstPictureNumber + 3 + i*6);
        this._armer[i] = new PictureData("",L2DPLE_FirstPictureNumber + 4 + i*6);
        this._ornament[i] = new PictureData("",L2DPLE_FirstPictureNumber + 5 + i*6);
    }
};

Live2DPictureLinkEquipment.prototype.setPicture = function(member_No,equip_slotNo,cloth_Name,noClothName){

    if(equip_slotNo == 0){
        if(noClothName != cloth_Name){
            this._weapon[member_No].name = cloth_Name;
        }
    }
    else if(equip_slotNo == 1){
        if(noClothName != cloth_Name){
            this._shield[member_No].name = cloth_Name;
        }
    }
    else if(equip_slotNo == 2){
        if(noClothName != cloth_Name){
            this._head[member_No].name = cloth_Name;
        }
    }
    else if(equip_slotNo == 3){
        if(noClothName != cloth_Name){
            this._armer[member_No].name = cloth_Name;
        }
    }
    else if(equip_slotNo == 4){
        if(noClothName != cloth_Name){
            this._ornament[member_No].name = cloth_Name;
        }
    }
};

Live2DPictureLinkEquipment.prototype.showPicture = function(x,y,name){
    for(var i = 0; i<$gameParty._actors.length; i++){
        if($gameParty.members()[i]._name == name){
            $gameScreen.showPicture(this._body[i].number,this._body[i].name,1,x,y,100,100,255,0);
            $gameScreen.showPicture(this._weapon[i].number,this._weapon[i].name,1,x,y,100,100,255,0);
            $gameScreen.showPicture(this._shield[i].number,this._shield[i].name,1,x,y,100,100,255,0);
            $gameScreen.showPicture(this._head[i].number,this._head[i].name,1,x,y,100,100,255,0);
            $gameScreen.showPicture(this._armer[i].number,this._armer[i].name,1,x,y,100,100,255,0);
            $gameScreen.showPicture(this._ornament[i].number,this._ornament[i].name,1,x,y,100,100,255,0); 
        }
    }
};

Live2DPictureLinkEquipment.prototype.hidePicture = function(name){
    for(var i = 0; i<$gameParty._actors.length; i++){
        if($gameParty.members()[i]._name == name){
            $gameScreen.erasePicture(this._body[i].number);
            $gameScreen.erasePicture(this._weapon[i].number);
            $gameScreen.erasePicture(this._shield[i].number);
            $gameScreen.erasePicture(this._head[i].number);
            $gameScreen.erasePicture(this._armer[i].number);
            $gameScreen.erasePicture(this._ornament[i].number); 
        }
    }
};

(function(){
    'use strict'
    const  DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects =function(){
        DataManager_createGameObjects.call(this);
        if($gameLive2d_linkEquipment == null){
            $gameLive2d_linkEquipment = new Live2DPictureLinkEquipment();
        }
    };

    const Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function(){
        //パーティメンバーの装備を設定値に反映する
        $gameLive2d_linkEquipment.ApplyClothdataFromParty();
        Scene_Map_start.call(this);
    };

    // プラグインコマンド
    const Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'TalkLive2d_Picture') {
            switch (args[1]) {
                case 'show':
                case '表示':
                    $gameLive2d_linkEquipment.showPicture(args[2],args[3],args[0]);
                    break;
                case 'hide':
                case '消去':
                    $gameLive2d_linkEquipment.hidePicture(args[0]);
                    break;
                default:
                    break;
            }
        }
    }

})();