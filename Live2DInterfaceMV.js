﻿/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/* 更新履歴
 * Slip 2020/01/20 ツクールMV用プラグイン向けに修正
 *
 * 本プラグインの再配布、改変はLive2D Open Software licenseに準拠します。
 *
 * Live2D Open Software 使用許諾契約書
 * https://www.live2d.com/eula/live2d-open-software-license-agreement_jp.html
*/

/*:
* @plugindesc Plug-in that displays live2d on Maker MV
* ツクールMV上でlive2dを立ち絵表示するプラグイン
* @author Slip
*
* @param ModelPosition
* @type note
* @default Model placement
* @desc Model placement
* モデル配置
*
* @param ModelScaling
* @type note
* @default Scale model
* @desc Scale model
* モデルの拡大・縮小
*
* @param PlayBack
* @type note
* @default Motion playback
* @desc Motion playback
* モーション再生
*
* @param Screen
* @type note
* @default screen
* @desc screen
* 画面
*
* @param Scene
* @type note
* @default Scenes such as maps and battle screens
* @desc Scenes such as maps and battle screens
* マップ、戦闘画面等のシーン
*
* @param SaveData
* @type note
* @default Save data
* @desc Save data
* セーブデータ
*
* @param LinkEquipment
* @type note
* @default Linked setting with equipment
* @desc Linked setting with equipment.
* 装備品との連動設定
*
* @param upsidedown
* @type boolean
* @desc Upside down display
* 上下反転表示
* @default false
* @parent Screen
*
* @param displayOrder
* @type boolean
* @desc model stacking order.
* モデルの重なり順番。
* @default false
* @parent Screen
*
* @param playbackSpeed
* @type number
* @desc Playback speed
* 再生速度
* @default 8
* @parent PlayBack
*
* @param AdjustWeight
* @type number
* @desc Deformation weight adjustment parameter
* 変形の重み調整パラメータ
* @default 8
* @parent PlayBack
*
* @param ScaleGain
* @type number
* @desc Scaling growth rate
* 拡大縮小の増加率
* @default 2
* @parent ModelScaling
*
* @param vertical
* @type number
* @desc Vertical display position
* 縦の表示位置
* @default 320
* @min 0
* @max 640
* @parent ModelPosition
*
* @param left
* @type number
* @desc Horizontal display position (left)
* 横の表示位置（左）
* @default 100
* @min 0
* @max 816
* @parent ModelPosition
*
* @param middle
* @type number
* @desc Horizontal display position (center)
* 横の表示位置（中央）
* @default 408
* @min 0
* @max 816
* @parent ModelPosition
*
* @param right
* @type number
* @desc Horizontal display position (right)
* 横の表示位置（右）
* @default 716
* @min 0
* @max 816
* @parent ModelPosition
*
* @param includesave
* @desc Include the display status of live2d in save data
* live2dの表示状況をセーブデータに含める
* @default true
* @type boolean
* @parent SaveData
*
* @param useinbattle
* @desc Live2d model use flag in battle scene
* 戦闘画面でのlive2dモデル使用フラグ
* @default false
* @type boolean
* @parent Scene
*
* @param pictpriority
* @type number
* @desc The live2d model is displayed before the picture below this ID.
* このID以下のピクチャよりも手前にlive2dのモデルを表示します。
* @min 0
* @max 100
* @default 10
* @parent Screen
*
* @param useLinkEquipment
* @desc use flag LinkEquipment.
* 装備品との連動フラグ
* @default false
* @type boolean
* @parent LinkEquipment
*
* @param Modelcondition
* @desc live2d model individual setting
* live2dモデル個別設定
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
* Usage:
* ↓ It is described here.
* https://github.com/MrSlip777/plugins_talk_live2d_cubism4/blob/master/README_en.md
*
* [日本語]
* live2d立ち絵表示プラグイン　ver1.0.0
* 
* live2d(cubism4.0)のモデルを会話中に立ち絵表示するプラグインです。
*
* 使い方：
* ↓こちらに記載しています。
* https://github.com/MrSlip777/plugins_talk_live2d_cubism4/blob/master/README.md
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

function parseStrToBoolean(str) {
    // 文字列を判定
    return (str == 'true') ? true : false;

}

const L2DINstringifyReplacer = function(key, value) {
    if(value === 'null') return value;
    try{
        return JSON.parse(value);
    }catch(e){
        return value;
    }
};

//設定値がある場合にはそれは配列になる。
const L2DINextractmeta = function(data) {
    const req = /<([^<>:]+)(:?)([^>]*)>/g;
    data.meta = {};
    for (var i = 0; i < 1000; i++) {
        var match = req.exec(data.motiongroupnames);
        if (!!match) {
            if (match[2] === ':') {
                data.meta[match[1]] = match[3].split(', ');
            } else {

                data.meta[match[1]] = true;
            }
        } else {
            break;
        }
    }
};

const L2DINfindnameindex = function(name) {
    return L2DINmodels.findIndex(function(data){
        return data.Modelname === name;
    });
};

const L2DINgetmetaarray = function(data, tag) {
    const meta = data.meta[tag];
    if(!meta || meta === true){
        return [];
    }
    return meta;
};

const L2DINPP = PluginManager.parameters('Live2DInterfaceMV');

const L2DINleft = Number(L2DINPP['left']) || 0;
const L2DINmiddle = Number(L2DINPP['middle']) || 0;
const L2DINright = Number(L2DINPP['right']) || 0;
const L2DINvertical = Number(L2DINPP['vertical']) || 0;
const L2DINscaleX = Number(L2DINPP['scale_V']) / 100;
const L2DINscaleY = Number(L2DINPP['scale_H']) / 100;

const L2DINincludesave = (L2DINPP['includesave'] === 'true');
const L2DINuseinbattle = (L2DINPP['useinbattle'] === 'true');
const L2DINuseLinkEquipment = (L2DINPP['useLinkEquipment'] === 'true');
const L2DINpictpriority = Number(L2DINPP['pictpriority']) || 0;

const L2DINdisplayOrder = (L2DINPP['displayOrder'] === 'true');

//Array型、各要素はobject
const L2DINmodels = JSON.parse(JSON.stringify(L2DINPP['Modelcondition'], L2DINstringifyReplacer));
L2DINmodels.forEach(function(Ldata) {
    L2DINextractmeta(Ldata);
});

//他仕様定義
const model3expend = '.model3.json';
const motion3expend = '.motion3.json';
const L2DINgrawidth = 816;
const L2DINgraheight = 640;

//再生速度
const L2DINPlaybackSpeed = Number(L2DINPP['playbackSpeed']) / 10;

//重み調整
const AdjustWeight = Number(L2DINPP['AdjustWeight']) / 10;

const ScaleGain = Number(L2DINPP['ScaleGain']);

//Game_Live2dの追加
function Game_Live2d() {
    this.initialize.apply(this, arguments);
}

Game_Live2d.prototype.initialize = function() {
    this.clear();
};

//マジックナンバーだと分かりにくいのでパラメータ設定のモデル名をkeyにする。
Game_Live2d.prototype.clear = function() {

    var parameters = PluginManager.parameters('Live2DInterfaceMV');

    //エディタ(プラグインの設定)から取得する設定値
    this._folderpath= {};
    this._name = {};
    this._model = {};
    this._pos_left = Number(parameters['left']);
    this._pos_middle = Number(parameters['middle']);
    this._pos_right = Number(parameters['right']);
    this._pos_vertical = Number(parameters['vertical']);
    this._IsUpsidedown = parseStrToBoolean(parameters['upsidedown']);
    
    //コマンド経由の設定値（ここでは初期値を設定する）
    this.visible = {};  //モデルの表示、非表示
    this.pos_x ={};     //モデルのX位置
    this.pos_y ={};     //モデルのY位置
    this._targetX ={};     //モデルのX目標位置
    this._targetY ={};     //モデルのY目標位置
    this._duration ={};     //移動する時間
    this._live2dmodelsaveonly = {}; //セーブ用データ
    
    //モーション関係のデータ　（セーブデータの保存、読み込み用として必要）
    this.motionGroup = {};
    this.motionNumber = {};
    this.motionLoop = {};
    this.paraminitskip = {};
    this.meta = {};

    this.scale = {};    //スケール
    this.A = {};
    this.R = {};
    this.G = {};
    this.B = {};

    this._waitCount = 0;

    //個々の上下反転フラグ（全体のフラグ、または個々のフラグがtrueになっていると上下反転の表示）
    this.individual_upsidedown = {};

    //装備品、衣装変更時に使用。装備なし時のモーション
    this.linkEquip_None = {};

    this.InitializeModelSetting();

    //内部変数
    //Cubism4対応 Slip 2020/01/13
    this._textureManager = new LAppTextureManager();
    this.gl = null;
    this.canvas = null;
    this._lappLive2dManager = null;
};

//各モデル設定値の初期化
Game_Live2d.prototype.InitializeModelSetting = function(){

    var i = 1;

    var data_no = L2DINmodels.length;

    L2DINmodels.forEach(function(data) {

        if(L2DINdisplayOrder){
            data_no = L2DINmodels.length - i + 1;
        }
        else{
            data_no = i;
        }

        this._folderpath[data_no] = data.folderpath;
        this._name[data_no] = data.Modelname;
        var strCopy = data.folderpath.split('/');
        this._model[data_no] = strCopy[strCopy.length - 2];
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
        this.meta[data_no] = data.meta;

        //個々の上下反転フラグ（全体のフラグ、または個々のフラグがtrueになっていると上下反転の表示）
        this.individual_upsidedown[data_no] = data.individual_upsidedown;

        //装備品、衣装変更時に使用。装備なし時のモーション
        this.linkEquip_None[data_no] = {};
        this.linkEquip_None[data_no][0] = data.noWeapon;
        this.linkEquip_None[data_no][1] = data.noShield;
        this.linkEquip_None[data_no][2] = data.noHead;
        this.linkEquip_None[data_no][3] = data.noBody;
        this.linkEquip_None[data_no][4] = data.noOrnament;

        //セーブ用のlve2dデータ保存場所
        this._live2dmodelsaveonly[data_no] = {};

        i++;
    }, this);

    this.MAXNUMBER = L2DINmodels.length;
};

//セーブデータの設定値をモデルに反映
Game_Live2d.prototype.ReflectSavedataToReadsetting = function(){

    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
        var saveobj = this._live2dmodelsaveonly[i];

        if(saveobj.name){

            $gameLive2d._model[i] = saveobj.model;
            $gameLive2d._name[i] = saveobj.name;
            $gameLive2d._folderpath[i] = saveobj.folderpath;
 
            $gameLive2d.individual_upsidedown[i] = saveobj.individual_upsidedown;
            $gameLive2d.linkEquip_None[i][0] = saveobj.noWeapon;
            $gameLive2d.linkEquip_None[i][1] = saveobj.noShield;
            $gameLive2d.linkEquip_None[i][2] = saveobj.noHead;
            $gameLive2d.linkEquip_None[i][3] = saveobj.noBody;
            $gameLive2d.linkEquip_None[i][4] = saveobj.noOrnament;
        }
    }
};

//セーブデータの設定値をモデルに反映
Game_Live2d.prototype.ReflectSavedataToModels = function(){

    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
        var saveobj = this._live2dmodelsaveonly[i];
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
            $gameLive2d.meta[i] = saveobj.meta;
        }
    }
};

//ニューゲームの時に前回セーブしたときの影響が残らないように
Game_Live2d.prototype.newgamefix = function() {
    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
    
        var saveobj = this._live2dmodelsaveonly[i];
        if(saveobj.Modelname){
            saveobj.isneedrestore = false;
        }
    }

    this.InitializeModelSetting();
};

//モデルの全ての情報をセーブするわけではないことに注意。
Game_Live2d.prototype.Createsavemodel = function() {

    //dataではなくgamelive2dの設定値が現状の値のため、名前ではなく番号で管理する
    for(var i = 1; i<=Object.keys($gameLive2d._name).length; i++){
        var saveobj = this._live2dmodelsaveonly[i];

        //以下はゲーム開始時に設定する変数
        saveobj.name = $gameLive2d._name[i];
        saveobj.model = $gameLive2d._model[i];
        saveobj.folderpath = $gameLive2d._folderpath[i];
        saveobj.individual_upsidedown = $gameLive2d.individual_upsidedown[i];
        saveobj.noWeapon = $gameLive2d.linkEquip_None[i][0];
        saveobj.noShield = $gameLive2d.linkEquip_None[i][1];
        saveobj.noHead = $gameLive2d.linkEquip_None[i][2];
        saveobj.noBody = $gameLive2d.linkEquip_None[i][3];
        saveobj.noOrnament = $gameLive2d.linkEquip_None[i][4];

        saveobj.isneedrestore = true;

        //以下は動的変数
        saveobj.pos_x = $gameLive2d.pos_x[i];
        saveobj.pos_y = $gameLive2d.pos_y[i];
        saveobj.scale = $gameLive2d.scale[i];
        saveobj.visible = $gameLive2d.visible[i];
        saveobj.motionGroup = $gameLive2d.motionGroup[i];
        saveobj.motionNumber = $gameLive2d.motionNumber[i];
        saveobj.motionLoop = $gameLive2d.motionLoop[i];
        saveobj.paraminitskip = $gameLive2d.paraminitskip[i];
        saveobj.meta = $gameLive2d.meta[i];

    }
    return this._live2dmodelsaveonly;
};

//loaderより先に実行されることに注意。
Game_Live2d.prototype.Restoresavemodel = function(saveobj) {
    this._live2dmodelsaveonly = saveobj;
};

//各シーンのupdateで呼ぶ
Game_Live2d.prototype.live2dupdate = function () {
    L2DINmodels.forEach(function(targetobj) {
        var model = this._live2dmodel[targetobj.Modelname];
        if(model !== null){
            this.live2dupdateMove(model);
        }
    }, this);
};

//Cubism4対応 Slip 2020/01/13
Game_Live2d.prototype.getTextureManager = function () {
    return this._textureManager;
};

//各シーンのupdateで呼ぶ
Game_Live2d.prototype.live2dupdate = function () {
    L2DINmodels.forEach(function(targetobj) {
        var model_no = 1;
        for(var number in $gameLive2d._name){
            if($gameLive2d._name[number] == targetobj.Modelname){
                break;
            }
            model_no++;
        }

        var model = $gameLive2d._lappLive2dManager._models.at(model_no-1);
        if(model !== null){
            this.live2dupdateMove(model_no);
        }
    }, this);
};

Game_Live2d.prototype.wait = function(dur) {
    this._waitCount = dur;
};

//移動する
Game_Live2d.prototype.live2dupdateMove = function(model_no) {
    var d = $gameLive2d._duration[model_no];
    if (d > 0) {   
        $gameLive2d.pos_x[model_no]
         = ($gameLive2d.pos_x[model_no] * (d - 1) + $gameLive2d._targetX[model_no]) / d;
        $gameLive2d.pos_y[model_no]
         = ($gameLive2d.pos_y[model_no] * (d - 1) + $gameLive2d._targetY[model_no]) / d;
        $gameLive2d._duration[model_no]--;
    }
};

//内部のモーション名
Game_Live2d.prototype.InnerMotionName = function (name, group){
    const index = L2DINfindnameindex(name);
    
    if(index >= 0){
        const innerMotionName = L2DINgetmetaarray(L2DINmodels[index], group);

        return innerMotionName;
    }else{
        return null;
    }
};

var $gameLive2d = null;

//---モデル描画するキャンバス設定---
function Live2DSprite(){
    this.initialize.apply(this, arguments);
}

Live2DSprite.prototype = Object.create(Sprite.prototype);
Live2DSprite.prototype.constructor = Live2DSprite;

Live2DSprite.prototype.initialize = function() {

    Sprite.prototype.initialize.call(this);
    this._cubismOption = new Live2DCubismFramework.Option();

    this.modelReady = false;
    this.frameBuffer = null;

    this._programId = null;
    this.onModelReady = [];

    this.texture = null;

};

/**
 * 解放する。
 */
Live2DSprite.prototype.release = function () {

    // リソースを解放する　→　開放しないへ変更（ゲーム終了時まで）
    //LAppLive2DManager.releaseInstance();
    //$gameLive2d._lappLive2dManager = null;
    // Cubism SDKの解放
    Csm_CubismFramework.dispose();
};

/**
 * シェーダーを登録する。
 */
Live2DSprite.prototype.createShader = function () {
    // バーテックスシェーダーのコンパイル
    var vertexShaderId = $gameLive2d.gl.createShader($gameLive2d.gl.VERTEX_SHADER);
    if (vertexShaderId == null) {
        LAppPal.printLog("failed to create vertexShader");
        return null;
    }
    var vertexShader = "precision mediump float;" +
        "attribute vec3 position;" +
        "attribute vec2 uv;" +
        "varying vec2 vuv;" +
        "void main(void)" +
        "{" +
        "   gl_Position = vec4(position, 1.0);" +
        "   vuv = uv;" +
        "}";
    $gameLive2d.gl.shaderSource(vertexShaderId, vertexShader);
    $gameLive2d.gl.compileShader(vertexShaderId);
    // フラグメントシェーダのコンパイル
    var fragmentShaderId = $gameLive2d.gl.createShader($gameLive2d.gl.FRAGMENT_SHADER);
    if (fragmentShaderId == null) {
       LAppPal.printLog("failed to create fragmentShader");
        return null;
    }
    var fragmentShader = "precision mediump float;" +
        "varying vec2 vuv;" +
        "uniform sampler2D texture;" +
        "void main(void)" +
        "{" +
        "   gl_FragColor = texture2D(texture, vuv);" +
        "}";
        $gameLive2d.gl.shaderSource(fragmentShaderId, fragmentShader);
        $gameLive2d.gl.compileShader(fragmentShaderId);
    // プログラムオブジェクトの作成
    var programId = $gameLive2d.gl.createProgram();
    $gameLive2d.gl.attachShader(programId, vertexShaderId);
    $gameLive2d.gl.attachShader(programId, fragmentShaderId);
    $gameLive2d.gl.deleteShader(vertexShaderId);
    $gameLive2d.gl.deleteShader(fragmentShaderId);
    // リンク
    $gameLive2d.gl.linkProgram(programId);
    $gameLive2d.gl.useProgram(programId);
    return programId;
};

Live2DSprite.prototype._renderWebGL = function(renderer) {

    $gameLive2d.gl = renderer.gl;
    $gameLive2d.canvas = renderer.view;

    if (!this.frameBuffer) {
        this.frameBuffer = $gameLive2d.gl.getParameter($gameLive2d.gl.FRAMEBUFFER_BINDING);
    }
    // 透過設定
    //$gameLive2d.gl.enable($gameLive2d.gl.BLEND);
    //$gameLive2d.gl.blendFunc($gameLive2d.gl.SRC_ALPHA, $gameLive2d.gl.ONE_MINUS_SRC_ALPHA);
    
    if (!this.modelReady) {
        const gl = renderer.gl;
        // it is unreasonable how the next line works... 
        gl.activeTexture(gl.TEXTURE0);
        this.texture
         = PIXI.RenderTexture.create($gameLive2d.canvas.width, $gameLive2d.canvas.height);
        this.createShader();
        this.modelReady = true;
        return;
    }

    while (this.onModelReady.length) {
    const func = this.onModelReady.shift();
    func();
    }

    if (!this.visible) {
        return;
    }

    const useVAO = !!(renderer.createVao && renderer.bindVao);

    var _activeVao;
    //let _activeVao; Slip 2017/03/24
    if (useVAO) {
        _activeVao = renderer._activeVao;
    } else {
        renderer.flush();
    }

    var temp_gl = renderer.gl;

    const arrayBuffer = temp_gl.getParameter(temp_gl.ARRAY_BUFFER_BINDING);
    const elementArrayBuffer = temp_gl.getParameter(temp_gl.ELEMENT_ARRAY_BUFFER_BINDING);
    const currentProgram = temp_gl.getParameter(temp_gl.CURRENT_PROGRAM);

    var activeTexture;
    //let activeTexture; Slip 2017/03/24
    if (!useVAO) {
    activeTexture = temp_gl.getParameter(temp_gl.ACTIVE_TEXTURE);
    }

    temp_gl.activeTexture(temp_gl.TEXTURE0);
    const texture0 = temp_gl.getParameter(temp_gl.TEXTURE_BINDING_2D);
    temp_gl.activeTexture(temp_gl.TEXTURE1);
    const texture1 = temp_gl.getParameter(temp_gl.TEXTURE_BINDING_2D);

    const frontFace = temp_gl.getParameter(temp_gl.FRONT_FACE);
    const colorWhiteMask = temp_gl.getParameter(temp_gl.COLOR_WRITEMASK);

    //Slip 2017/03/24
    var vertexAttr0Enabled, vertexAttr1Enabled, vertexAttr2Enabled, vertexAttr3Enabled;
    
    if (!useVAO) {
        vertexAttr0Enabled = temp_gl.getVertexAttrib(0, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        vertexAttr1Enabled = temp_gl.getVertexAttrib(1, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        vertexAttr2Enabled = temp_gl.getVertexAttrib(2, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
        vertexAttr3Enabled = temp_gl.getVertexAttrib(3, temp_gl.VERTEX_ATTRIB_ARRAY_ENABLED);
    }
    const scissorTestEnabled = temp_gl.isEnabled(temp_gl.SCISSOR_TEST);
    const stencilTestEnabled = temp_gl.isEnabled(temp_gl.STENCIL_TEST);
    const depthTestEnabled = temp_gl.isEnabled(temp_gl.DEPTH_TEST);
    const cullFaceEnabled = temp_gl.isEnabled(temp_gl.CULL_FACE);
    const blendEnabled = temp_gl.isEnabled(temp_gl.BLEND);

    const _activeTextureLocation = renderer._activeTexture ? renderer._activeTextureLocation : 0;
    const _activeRenderTarget = renderer._activeRenderTarget;

    var vao;
    if (useVAO) {
        vao = renderer.createVao();
        renderer.bindVao(vao);
    }

    renderer.bindRenderTexture(this.texture);

    temp_gl.clearColor(0.0, 0.0, 0.0, 0.0);
    temp_gl.clear(temp_gl.COLOR_BUFFER_BIT);
    temp_gl.frontFace(temp_gl.CW);

    if($gameLive2d._lappLive2dManager){
        
        LAppPal.updateTime();
        $gameLive2d.gl.flush();
        $gameLive2d._lappLive2dManager.onUpdate();


    }
    
    if (!useVAO) {
    renderer._activeTextureLocation = _activeTextureLocation;
    temp_gl.activeTexture(temp_gl.TEXTURE0 + _activeTextureLocation);
    }
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, null);
    temp_gl.useProgram(currentProgram);
    renderer.bindRenderTarget(_activeRenderTarget);

    temp_gl.bindBuffer(temp_gl.ARRAY_BUFFER, arrayBuffer);
    temp_gl.bindBuffer(temp_gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);

    temp_gl.activeTexture(temp_gl.TEXTURE0);
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, texture0);
    temp_gl.activeTexture(temp_gl.TEXTURE1);
    temp_gl.bindTexture(temp_gl.TEXTURE_2D, texture1);

    if (!useVAO) {
        temp_gl.activeTexture(activeTexture);
    }
    temp_gl.frontFace(frontFace);

    temp_gl.colorMask(colorWhiteMask[0],colorWhiteMask[1],
        colorWhiteMask[2],colorWhiteMask[3]); //Slip 2017/03/24
    
    //
    if (!useVAO) {
    vertexAttr0Enabled ? temp_gl.enableVertexAttribArray(0) : temp_gl.disableVertexAttribArray(0);
    vertexAttr1Enabled ? temp_gl.enableVertexAttribArray(1) : temp_gl.disableVertexAttribArray(1);
    vertexAttr2Enabled ? temp_gl.enableVertexAttribArray(2) : temp_gl.disableVertexAttribArray(2);
    vertexAttr3Enabled ? temp_gl.enableVertexAttribArray(3) : temp_gl.disableVertexAttribArray(3);
    }
    scissorTestEnabled ? temp_gl.enable(temp_gl.SCISSOR_TEST) : temp_gl.disable(temp_gl.SCISSOR_TEST);
    stencilTestEnabled ? temp_gl.enable(temp_gl.STENCIL_TEST) : temp_gl.disable(temp_gl.STENCIL_TEST);
    depthTestEnabled   ? temp_gl.enable(temp_gl.DEPTH_TEST) : temp_gl.disable(temp_gl.DEPTH_TEST);
    cullFaceEnabled    ? temp_gl.enable(temp_gl.CULL_FACE) : temp_gl.disable(temp_gl.CULL_FACE);
    blendEnabled       ? temp_gl.enable(temp_gl.BLEND) : temp_gl.disable(temp_gl.BLEND);

    if (useVAO) {
    vao.unbind();
    vao.destroy();
    renderer.bindVao(_activeVao);
    }
    
    //copy of pixi-v4 internal code
    this.calculateVertices();

    if (this._isPicture) {
        // use heavy renderer, which reduces artifacts and applies corrent blendMode,
        // but does not use multitexture optimization
        this._speedUpCustomBlendModes(renderer);
        renderer.setObjectRenderer(renderer.plugins.picture);
        renderer.plugins.picture.render(this);
    } else {
        // use pixi super-speed renderer
        renderer.setObjectRenderer(renderer.plugins.sprite);
        renderer.plugins.sprite.render(this);
    }
}

var Csm_CubismFramework = Live2DCubismFramework.CubismFramework;

Live2DSprite.prototype.initializeCubism = function () {
    // setup cubism
    this._cubismOption.logFunction = LAppPal.printMessage;
    this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
    Csm_CubismFramework.startUp(this._cubismOption);
    // initialize cubism
    Csm_CubismFramework.initialize();
    // load model
    $gameLive2d._lappLive2dManager = LAppLive2DManager.getInstance();
    // default proj
    var projection = new Csm_CubismMatrix44();
    LAppPal.updateTime();
};

//argsは配列なので考慮すること slip 2017/03/24
Live2DSprite.prototype.destroy = function(args) {
    this.model.release();
};

if (PIXI) {
    PIXI.Live2DSprite = Live2DSprite;
  } else {
    console.error('Error: Cannot find global variable `PIXI`, Live2D plguin will not be installed.');
}

(function(){
    'use strict'
    const  DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects =function(){
        DataManager_createGameObjects.call(this);
        if($gameLive2d == null){
            $gameLive2d = new Game_Live2d();
        }
    };
    const Scene_Map_updateWaitCount =Scene_Map.prototype.updateWaitCount;
    Scene_Map.prototype.updateWaitCount =function(){

        Scene_Map_updateWaitCount.call(this);

    };

    const Scene_Map_terminate=Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate =function(){
        this.terminatelive2d();
        Scene_Map_terminate.call(this);
    };

    const Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function(){
        Scene_Map_start.call(this);
        this.createlive2d();
    };

    const Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        Scene_Map_update.call(this);
        $gameLive2d.live2dupdate();
    };

    const  Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount;
    Game_Interpreter.prototype.updateWaitCount = function() {
        if ($gameLive2d._waitCount > 0) {
            $gameLive2d._waitCount--;
            return true;
        }
        return Game_Interpreter_updateWaitCount.call(this);
    };

    // プラグインコマンド
    const Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args);

        var StrForComparison = 'TalkLive2d';
        StrForComparison = StrForComparison.toLowerCase();
        command = command.toLowerCase();

        if (command === StrForComparison) {

            var model_no = Live2DManager.prototype.getNumberFromName(args[0]);

            switch (args[1]) {
            case 'show':
            case '表示':
                Live2DManager.prototype.live2dVisible(model_no,true);
                break;
            case 'hide':
            case '消去':
                Live2DManager.prototype.live2dVisible(model_no,false);
                break;
            case 'motion':
            case 'モーション':
                var loop = true;
                if(args.lenght <= 3){
                    loop = true;
                }
                else{
                    if(args[4] == "ループ" || args[4] == "ループする" ||args[4] == "loop"){
                        loop = true;
                    }
                    else if(args[4] == "ループなし" || args[4] == "ループしない" ||args[4] == "noloop"){
                        loop = false;
                    }
                }
                Live2DManager.prototype.live2dMotion(model_no,args[2],args[3],loop);
                break;
            case 'expression':
            case '表情':
                Live2DManager.prototype.live2dExpression(model_no,args[2]);
                break;
            case 'left':
            case '左':
                Live2DManager.prototype.live2dSetPosition_X(model_no,$gameLive2d._pos_left);
 
                break;
            case 'middle':
            case '中央':
                Live2DManager.prototype.live2dSetPosition_X(model_no,$gameLive2d._pos_middle);

                break;
            case 'right':
            case '右':
                Live2DManager.prototype.live2dSetPosition_X(model_no,$gameLive2d._pos_right);
                
                break;
            case 'Xposition':
            case 'X位置':
                Live2DManager.prototype.live2dSetPosition_X(model_no,args[2]);
                break;
            case 'Yposition':
            case 'Y位置':
                Live2DManager.prototype.live2dSetPosition_Y(model_no,args[2]);
                break;
            case 'pos':
            case '位置':
                //変数である場合は変換して使用する
                const str_v = "\\v";
                const str_V = "\\V";
                
                if(args[2]){
                    if(args[2].indexOf(str_v) != -1 || args[2].indexOf(str_V) != -1){
                        var tmp = args[2].replace('[', ',');
                        tmp = tmp.replace(']', ',');
                        tmp = tmp.split(',');
                        args[2] = $gameVariables.value(Number(tmp[1]));
                    }
                }

                if(args[3]){
                    if(args[3].indexOf(str_v) != -1 || args[3].indexOf(str_V) != -1){
                        var tmp = args[3].replace('[', ',');
                        tmp = tmp.replace(']', ',');
                        tmp = tmp.split(',');
                        args[3] = $gameVariables.value(Number(tmp[1]));
                    }
                }

                if(args[4]){
                    if(args[4].indexOf(str_v) != -1 || args[4].indexOf(str_V) != -1){
                        var tmp = args[4].replace('[', ',');
                        tmp = tmp.replace(']', ',');
                        tmp = tmp.split(',');
                        args[4] = $gameVariables.value(Number(tmp[1]));
                    }
                }

                const x = Number(args[2]) || 0;
                const y = Number(args[3]) || 0;
                const dur = Number(args[4]) || 0;
                var wait = false;
                if(args[5] === 'wait' || args[5] === 'ウェイト'){
                    wait = true;
                }
                Live2DManager.prototype.live2dSetPosition(model_no, x, y, dur, wait);
            break;

            case 'grayscale':
            case 'グレースケール':
                Live2DManager.prototype.live2dSetGrayscale(model_no,args[2]);
                break;
            case 'scale':
            case '倍率変更':
                Live2DManager.prototype.live2dSetScale(model_no,args[2]);
                break;
            case 'paraminitskip':
            case 'パラメータ初期化スキップ':
                const result = (args[2] === 'true');
                Live2DManager.prototype.live2dsetparaminitskip(model_no, result);
                break;

            case 'upsidedown':
            case '上下反転':
                Live2DManager.prototype.live2dSetScale(model_no,args[2]);
                break;
            case '衣装変更':
            case 'changecloth':
                Live2DManager.prototype.live2dChangeCloth(model_no,args[2]);

            default:
                var loop = true;
                if(args.lenght <= 3){
                    loop = true;
                }
                else{
                    if(args[2] == "ループ" || args[2] == "ループする" ||args[2] == "loop"){
                        loop = true;
                    }
                    else if(args[2] == "ループなし" || args[2] == "ループしない" ||args[2] == "noloop"){
                        loop = false;
                    }
                }
                var innerMotionName = $gameLive2d.InnerMotionName(args[0],args[1]);

                Live2DManager.prototype.live2dSequenceMotion(model_no,innerMotionName,loop);
                break;
            }
        }
    };
})();

//-----------------------------------------------------------------------------
//Live2DManager
//会話上にLive2Dモデルを表示するクラス 
// Slip 2016/12/25
//-----------------------------------------------------------------------------
function Live2DManager() {
    this.initialize.apply(this, arguments);
}

var live2dmodel = {};

Live2DManager.prototype.initialize = function() {
    for(var i=1; i<=$gameLive2d.MAXNUMBER; i++){
        live2dmodel[i] = null;
    }

}

Live2DManager.prototype.getNumberFromName = function(modelName) {

    var gameLive2d_no = 1;
    for(var number in $gameLive2d._name){
        if($gameLive2d._name[number] == modelName){
            break;
        }
        gameLive2d_no++;
    }

    return gameLive2d_no;
};

//表示フラグ
Live2DManager.prototype.live2dVisible = function (model_no,flag) {
    $gameLive2d.visible[model_no] = flag;
};

//モーション設定
Live2DManager.prototype.live2dMotion = function (model_no,motionGroup,motion_no,loop){
    //使用するmotion_noは-1して使用する
    $gameLive2d._lappLive2dManager._models.at(model_no-1).changeMotion(motionGroup,motion_no-1, loop);

    //セーブデータ保存用
    $gameLive2d.motionGroup[model_no] = motionGroup;
    $gameLive2d.motionNumber[model_no] = motion_no;
    $gameLive2d.motionLoop[model_no] = loop;

    this.Modelparaminit(model_no);
}

//すべてのモデルの設定されたモーションを再生する（表示されたモーションのみ。セーブデータのロード用）
Live2DManager.prototype.PlayBackAllModel = function(){
    
    for(var i = 1; i<=$gameLive2d.MAXNUMBER; i++){
        if($gameLive2d.visible[i] == true){
            this.live2dMotion(i,$gameLive2d.motionGroup[i],$gameLive2d.motionNumber[i],$gameLive2d.motionLoop[i]);
        }
    }
}

//モーション モーションA再生後にモーションBを再生する
Live2DManager.prototype.live2dSequenceMotion = function (model_no,motions,loop){
    if($gameLive2d._lappLive2dManager._models.at(model_no-1)){
        //使用するmotion_noは-1して使用する（SequenceMotion内で-1する）
        $gameLive2d._lappLive2dManager._models.at(model_no-1).SequenceMotion(motions, loop);
        var motionNames = (String(motions)).split(',');
        motionNames.forEach(function(motionName){
            var data = (String(motionName)).split('_');
            //セーブデータ保存用
            $gameLive2d.motionGroup[model_no] = data[0];
            $gameLive2d.motionNumber[model_no] = Number(data[1]);
        });
        //セーブデータ保存用
        $gameLive2d.motionLoop[model_no] = loop;

        this.Modelparaminit(model_no);
    }
}

//表情設定
Live2DManager.prototype.live2dExpression = function (model_no,expressionId){
    $gameLive2d._lappLive2dManager._models.at(model_no-1).changeExpression(expressionId + ".exp3.json");
}

//位置変更（移動可能）
Live2DManager.prototype.live2dSetPosition = function (model_no, x, y, dur, wait) {
    const model = $gameLive2d._lappLive2dManager._models.at(model_no-1);
    if(model !== null){
        if(dur > 0){
            $gameLive2d._targetX[model_no] = x;
            $gameLive2d._targetY[model_no] = y;
        }else{
            $gameLive2d.pos_x[model_no] = x;
            $gameLive2d.pos_y[model_no] = y;
        }
        $gameLive2d._duration[model_no] = dur;
        if(wait){
            $gameLive2d._waitCount = dur;
        }
    }
};

//表示位置変更
Live2DManager.prototype.live2dSetPosition_X = function (model_no,pos_x) {
    var canvas = $gameLive2d.canvas;
    if(pos_x < 1){
        pos_x = 1;
    }
    else if(pos_x > canvas.width){
        pos_x = canvas.width;
    }
    else{
        pos_x = pos_x;
    }

    $gameLive2d.pos_x[model_no] = pos_x;
};

//表示位置変更
Live2DManager.prototype.live2dSetPosition_Y = function (model_no,pos_y) {
    var canvas = $gameLive2d.canvas;
    if(pos_y < 1){
        pos_y = 1;
    }
    else if(pos_y > canvas.height){
        pos_y = canvas.height;
    }
    else{
        pos_y = pos_y;
    }

    $gameLive2d.pos_y[model_no] = pos_y;
};

//倍率変更
Live2DManager.prototype.live2dSetScale = function (model_no,scale) {
    $gameLive2d.scale[model_no] = scale;
};

//初期化スキップ
Live2DManager.prototype.live2dsetparaminitskip = function (model_no, flag) {
    const model = $gameLive2d._lappLive2dManager._models.at(model_no-1);
    if(model !== null){
        if(flag){
            model._paraminitskip = true;
        }else{
            model._paraminitskip = false;
            this.Modelparaminit(model_no);
        }
        //セーブデータ保存用
        $gameLive2d.paraminitskip[model_no] = model._paraminitskip;
    }
};

//モーション間で使用してないパラメータが異なる場合があるため更新に関わらずパラメータ初期化
Live2DManager.prototype.Modelparaminit = function (model_no){
    const model = $gameLive2d._lappLive2dManager._models.at(model_no-1);
    if(model !== null && !model._paraminitskip){
        if(model._model){
            model._model._parameterValues.fill(0);
        }
    }
};

//グレースケール変更
Live2DManager.prototype.live2dSetGrayscale = function (model_no,grayscale){

    $gameLive2d.R[model_no] = grayscale;
    $gameLive2d.G[model_no] = grayscale;
    $gameLive2d.B[model_no] = grayscale;
};

//上下反転
Live2DManager.prototype.live2dDisplayDirection = function (flag) {
    $gameLive2d._IsUpsidedown = flag;
};

//衣装変更
Live2DManager.prototype.live2dChangeCloth = function (model_no,Id) {
    $gameLive2d._lappLive2dManager._models.at(model_no-1).setClothMotion(Id);
    
};

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

//モデルロード完了数
var $LoadCount_Live2DModel = 0;

//初回モデル読み込みフラグ
var IsFirstLoad = true;

//初回モデル読み込みトリガーフラグ
var IsFirstLoad_Trigger = true;

//---シーン上にlive2dモデル用スプライトを作成する---
Scene_Base.prototype.createlive2d = function(){

    this.live2dSprite = new PIXI.Live2DSprite();
    
    SceneManager._scene._spriteset.addChildlive2d(this.live2dSprite);
    this.live2dSprite.initializeCubism();

    if(IsFirstLoad == true && IsFirstLoad_Trigger == true){
        //セーブデータからモデルの読み込み設定反映
        $gameLive2d.ReflectSavedataToReadsetting();

        $gameLive2d._lappLive2dManager.loadModels();
        
        //セーブデータの設定値をモデルに反映
        $gameLive2d.ReflectSavedataToModels();
        IsFirstLoad_Trigger = false;
        //IsFirstLoad_Trigger をfalseにする
        //【注意】IsFirstLoad　は　LAppModel.prototype.setupTextures　で　false にしている

    }

    if(L2DINuseLinkEquipment == true){
        Live2DManager.prototype.live2dClothLinkEquipment();
    }
};

Spriteset_Base.prototype.addChildlive2d = function(Sprite) {
    if(L2DINpictpriority >= 100){
        this.addChild(Sprite);
    }else{
        this._pictureContainer.addChildAt(Sprite, L2DINpictpriority);
    }
};

Scene_Base.prototype.terminatelive2d = function(){
    this.live2dSprite.release();
};

//---Live2dモデルの設定をセーブデータに含める機能---
if(L2DINincludesave){

    const L2DINmakeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = L2DINmakeSaveContents.call(this);
        contents.Live2d = $gameLive2d.Createsavemodel();
        return contents;
    };
    
    const L2DINextractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        L2DINextractSaveContents.call(this, contents);
        if(!!contents && !!contents.Live2d){
            $gameLive2d.Restoresavemodel(contents.Live2d);
        }

        //スロット選択時にフラグ解除（live2dのモデルデータを再読み込みする）
        //初回モデル読み込みフラグ
        IsFirstLoad = true;

        //初回モデル読み込みトリガーフラグ
        IsFirstLoad_Trigger = true;

    };

    const L2DINsetupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        L2DINsetupNewGame.call(this);
        $gameLive2d.newgamefix();

        //ニューゲーム開始時にフラグ解除（live2dのモデルデータを再読み込みする）
        //初回モデル読み込みフラグ
        IsFirstLoad = true;

        //初回モデル読み込みトリガーフラグ
        IsFirstLoad_Trigger = true;

    };

}else{
    console.log("Live2d表示はセーブ・ロードしません。");
}

//---Live2dモデルの戦闘画面表示機能---
if(L2DINuseinbattle){

    Scene_Battle.prototype.istickerupd =function(){
        return true;
    };

    const Battle_L2DINupdate = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        Battle_L2DINupdate.call(this);
        $gameLive2d.live2dupdate();
    };

    const Battle_L2DINterminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        Battle_L2DINterminate.call(this);
        this.terminatelive2d();
    };
    
    const Battle_L2DINcreateWindowLayer = Scene_Battle.prototype.createWindowLayer;
    Scene_Battle.prototype.createWindowLayer = function(){
        this.createlive2d();
        Battle_L2DINcreateWindowLayer.call(this);
    };

}else{
    console.log("Live2d表示はマップシーンのみです。");
}