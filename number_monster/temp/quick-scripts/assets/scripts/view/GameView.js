(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/GameView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f2a87sm5g1B7rolViwRQOmT', 'GameView', __filename);
// scripts/view/GameView.ts

// Copyright (C) 2019, Flickering Inc. All rights reserved.
// Author: hongchangfu (hongchangfu@flickering.ai)
Object.defineProperty(exports, "__esModule", { value: true });
var FinishCtrl_1 = require("../controller/FinishCtrl");
var Revival_1 = require("../controller/Revival");
var TopStrip_1 = require("../controller/TopStrip");
var Charts_1 = require("../controller/Charts");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gamePanl = undefined;
        _this.ballPreArr = [];
        _this.comBoPre = undefined;
        _this.guidePre = undefined;
        _this.cloudPrefab = undefined;
        _this.ballboom = undefined;
        _this.maskPanl = undefined;
        _this.scoreLable = undefined;
        _this.gameNode = undefined;
        _this.gameFinish = undefined;
        _this.revival = undefined;
        _this.pauseNode = undefined;
        _this.topHomeIm = undefined;
        _this.topSprte = undefined;
        _this.bottomCollider = undefined;
        _this.topStrip = undefined;
        _this.charts = undefined;
        _this.gameBgImArr = [];
        _this.topPauseImArr = [];
        _this.bottomImArr = [];
        _this.topImArr = [];
        _this.bgFitSprite = undefined;
        _this.bgFitImArr = [];
        _this.crazyProgressNode = undefined;
        _this.barImArr = [];
        _this.crazyCutToPrefab = undefined;
        _this.crazyCutOutPrefab = undefined;
        _this.crazyTriggerPrefab = undefined;
        _this.crazyToNomalPrefab = undefined;
        _this.crazyLivePrefab = undefined;
        _this.revivalePrefab = undefined;
        _this.balldoubleClick = undefined;
        _this.creatBall = undefined;
        return _this;
    }
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "????????????" })
    ], GameView.prototype, "gamePanl", void 0);
    __decorate([
        property({ type: [cc.Prefab], visible: true, displayName: "?????????" })
    ], GameView.prototype, "ballPreArr", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "????????????" })
    ], GameView.prototype, "comBoPre", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "???????????????" })
    ], GameView.prototype, "guidePre", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "cloudPrefab", void 0);
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "?????????????????????16????????????" })
    ], GameView.prototype, "ballboom", void 0);
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "???????????????" })
    ], GameView.prototype, "maskPanl", void 0);
    __decorate([
        property({ type: cc.Label, visible: true, displayName: "????????????" })
    ], GameView.prototype, "scoreLable", void 0);
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "????????????" })
    ], GameView.prototype, "gameNode", void 0);
    __decorate([
        property({ type: FinishCtrl_1.default, visible: true, displayName: "????????????" })
    ], GameView.prototype, "gameFinish", void 0);
    __decorate([
        property({ type: Revival_1.default, visible: true, displayName: "????????????" })
    ], GameView.prototype, "revival", void 0);
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "????????????" })
    ], GameView.prototype, "pauseNode", void 0);
    __decorate([
        property({ type: cc.SpriteFrame, visible: true, displayName: "????????????" })
    ], GameView.prototype, "topHomeIm", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "topSprte", void 0);
    __decorate([
        property({ type: cc.PhysicsPolygonCollider, visible: true, displayName: "???????????????" })
    ], GameView.prototype, "bottomCollider", void 0);
    __decorate([
        property({ type: TopStrip_1.default, visible: true, displayName: "????????????,????????????" })
    ], GameView.prototype, "topStrip", void 0);
    __decorate([
        property({ type: Charts_1.default, visible: true, displayName: "?????????" })
    ], GameView.prototype, "charts", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "gameBgImArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "????????????" })
    ], GameView.prototype, "topPauseImArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "????????????" })
    ], GameView.prototype, "bottomImArr", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "????????????" })
    ], GameView.prototype, "topImArr", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "bgFitSprite", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "bgFitImArr", void 0);
    __decorate([
        property({ type: cc.Node, visible: true, displayName: "???????????????????????????" })
    ], GameView.prototype, "crazyProgressNode", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true, displayName: "????????????" })
    ], GameView.prototype, "barImArr", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "crazyCutToPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "??????????????????" })
    ], GameView.prototype, "crazyCutOutPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "?????????????????????????????????" })
    ], GameView.prototype, "crazyTriggerPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "??????????????????????????????" })
    ], GameView.prototype, "crazyToNomalPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "?????????????????????" })
    ], GameView.prototype, "crazyLivePrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "????????????" })
    ], GameView.prototype, "revivalePrefab", void 0);
    __decorate([
        property({ type: cc.Prefab, visible: true, displayName: "??????11??????????????????" })
    ], GameView.prototype, "balldoubleClick", void 0);
    GameView = __decorate([
        ccclass
    ], GameView);
    return GameView;
}(cc.Component));
exports.default = GameView;

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
        //# sourceMappingURL=GameView.js.map
        