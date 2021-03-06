(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/MySound.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cd153zgW/VGSZ+W755ShVv4', 'MySound', __filename);
// scripts/MySound.ts

// Copyright (C) 2019, Flickering Inc. All rights reserved.
// Author: hongchangfu (hongchangfu@flickering.ai)
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AudioType;
(function (AudioType) {
    AudioType[AudioType["GameBgm"] = 0] = "GameBgm";
    AudioType[AudioType["ComboGood"] = 1] = "ComboGood";
    AudioType[AudioType["ComboTen"] = 2] = "ComboTen";
    AudioType[AudioType["Finish"] = 3] = "Finish";
    AudioType[AudioType["FinishRecordBreak"] = 4] = "FinishRecordBreak";
    AudioType[AudioType["GameEnter"] = 5] = "GameEnter";
    AudioType[AudioType["GameOver"] = 6] = "GameOver";
    AudioType[AudioType["GreaterThanTen"] = 7] = "GreaterThanTen";
    AudioType[AudioType["GreaterThanFifteen"] = 8] = "GreaterThanFifteen";
    AudioType[AudioType["LessThanTen"] = 9] = "LessThanTen";
    AudioType[AudioType["Split"] = 10] = "Split";
    AudioType[AudioType["Ten"] = 11] = "Ten";
    AudioType[AudioType["Button"] = 12] = "Button";
    AudioType[AudioType["DropNum1"] = 13] = "DropNum1";
    AudioType[AudioType["DropNum2"] = 14] = "DropNum2";
    AudioType[AudioType["DropNum3"] = 15] = "DropNum3";
    AudioType[AudioType["DropNum4"] = 16] = "DropNum4";
    AudioType[AudioType["DropNum5"] = 17] = "DropNum5";
    AudioType[AudioType["DropNum6"] = 18] = "DropNum6";
    AudioType[AudioType["DropNum7"] = 19] = "DropNum7";
    AudioType[AudioType["DropNum8"] = 20] = "DropNum8";
    AudioType[AudioType["DropNum9"] = 21] = "DropNum9";
    AudioType[AudioType["CrazyFive"] = 22] = "CrazyFive";
    AudioType[AudioType["CrazyFiveBgm"] = 23] = "CrazyFiveBgm";
    AudioType[AudioType["ComboTen1"] = 24] = "ComboTen1";
    AudioType[AudioType["ComboTen2"] = 25] = "ComboTen2";
    AudioType[AudioType["PlayAgain"] = 26] = "PlayAgain";
})(AudioType = exports.AudioType || (exports.AudioType = {}));
var MySound = /** @class */ (function (_super) {
    __extends(MySound, _super);
    function MySound() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clipArr = [];
        /** ???????????? */
        _this.mute = false;
        /** ??????id */
        _this.bgmId = -100;
        /** ????????????id */
        _this.crazyBgmId = -100;
        /** ???10 ?????????????????? */
        _this.tenArr = [2, 24, 25];
        /** ?????????????????????????????? */
        _this.audioArr = [];
        /** ????????????????????????????????? */
        _this.isCrazy = false;
        return _this;
    }
    MySound_1 = MySound;
    MySound.prototype.onLoad = function () {
        MySound_1.instance = this;
        cc.game.addPersistRootNode(this.node);
        this.setIosMuteSwitch();
        this.initWxAudio();
        this.initMute();
        this.setBgm();
    };
    /**
     * ???????????????????????????
     */
    MySound.prototype.initWxAudio = function () {
        if (typeof wx == "undefined") {
            return;
        }
        for (var i = 0; i < 27; i++) {
            var audio = wx.createInnerAudioContext();
            audio.src = wxDownloader.REMOTE_SERVER_ROOT + "/" + this.getNativeurl(i);
            if (i == AudioType.GameBgm || i == AudioType.CrazyFiveBgm)
                audio.loop = true;
            audio.volume = GameConfig_1.effectVolume[i];
            this.audioArr.push(audio);
        }
    };
    /**
     * ?????????????????????md5 ????????????
     * @param num ???????????????
     */
    MySound.prototype.getNativeurl = function (num) {
        var url = this.clipArr[num].nativeUrl;
        if (cc.loader.md5Pipe == null)
            return url;
        var length = url.length;
        var index = url.lastIndexOf('/') + 1;
        var id = url.substring(index, length - 4);
        var md51 = cc.loader.md5Pipe.md5AssetsMap[id];
        var md52 = cc.loader.md5Pipe.md5NativeAssetsMap[id];
        var md5 = md51 == undefined ? md52 : md51;
        if (md5 != undefined)
            url = url.substring(0, length - 4) + "." + md5 + ".mp3";
        return url;
    };
    /**
     * ??????ios???????????????????????????
     */
    MySound.prototype.setIosMuteSwitch = function () {
        if (typeof wx == "undefined") {
            return;
        }
        //???????????????
        if (wx.setInnerAudioOption) {
            wx.setInnerAudioOption({
                obeyMuteSwitch: false,
                success: function () {
                }
            });
        }
    };
    /**
     * ????????????????????????
     */
    MySound.prototype.initMute = function () {
        // ??????????????????????????????
        if (window.localStorage) {
            var isMutStorage = window.localStorage.getItem('number_sprite_isMut');
            this.mute = isMutStorage != undefined ? (isMutStorage == 'yes' ? true : false) : false;
        }
    };
    Object.defineProperty(MySound.prototype, "isMut", {
        /**
         * ??????????????????
         */
        get: function () {
            return this.mute;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ??????????????????
     */
    MySound.prototype.setMut = function () {
        this.mute = !this.mute;
        // ????????????????????????
        if (window.localStorage) {
            var value = (this.mute ? 'yes' : 'no');
            window.localStorage.setItem('number_sprite_isMut', value);
        }
        // setMut(isMut);
        this.setBgm();
    };
    Object.defineProperty(MySound.prototype, "crazy", {
        set: function (flag) {
            if (this.isCrazy != flag) {
                this.isCrazy = flag;
                this.setBgm();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ??????????????????
     */
    MySound.prototype.setBgm = function () {
        //???????????????
        if (typeof wx != "undefined") {
            this.setBgmWx();
            return;
        }
        if (!this.mute) {
            if (this.isCrazy) {
                cc.audioEngine.stopEffect(this.bgmId);
                this.crazyBgmId = cc.audioEngine.playEffect(this.clipArr[23], true);
                cc.audioEngine.setVolume(this.crazyBgmId, GameConfig_1.effectVolume[23]);
            }
            else {
                cc.audioEngine.stopEffect(this.crazyBgmId);
                this.bgmId = cc.audioEngine.playEffect(this.clipArr[0], true);
                cc.audioEngine.setVolume(this.bgmId, GameConfig_1.effectVolume[0]);
            }
        }
        else {
            cc.audioEngine.stopEffect(this.crazyBgmId);
            cc.audioEngine.stopEffect(this.bgmId);
        }
    };
    MySound.prototype.setBgmWx = function () {
        if (!this.mute) {
            if (this.isCrazy) {
                this.audioArr[AudioType.CrazyFiveBgm].play();
                this.audioArr[AudioType.GameBgm].pause();
            }
            else {
                this.audioArr[AudioType.CrazyFiveBgm].pause();
                this.audioArr[AudioType.GameBgm].play();
            }
        }
        else {
            this.audioArr[AudioType.GameBgm].pause();
            this.audioArr[AudioType.CrazyFiveBgm].pause();
        }
    };
    /**
     * ????????????????????????
     * @param active ?????????????????????
     */
    MySound.prototype.setCrazyBgm = function (active) {
        this.isCrazy = active;
        this.setBgm();
    };
    /**
     * ????????????
     * @param clip ??????
     * @param delay ??????
     */
    MySound.prototype.playAudio = function (clip, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (this.mute)
            return;
        var callback = function () {
            //?????????10
            if (clip == 2)
                clip = _this.tenArr.random();
            //???????????????
            if (typeof wx != "undefined") {
                _this.audioArr[clip].play();
                return;
            }
            var volume = GameConfig_1.effectVolume[clip];
            var id = cc.audioEngine.playEffect(_this.clipArr[clip], false);
            cc.audioEngine.setVolume(id, volume);
        };
        this.scheduleOnce(callback, delay);
    };
    var MySound_1;
    MySound.instance = undefined;
    __decorate([
        property({ type: [cc.AudioClip], visible: true, displayName: "??????" })
    ], MySound.prototype, "clipArr", void 0);
    MySound = MySound_1 = __decorate([
        ccclass
    ], MySound);
    return MySound;
}(cc.Component));
exports.default = MySound;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MySound.js.map
        