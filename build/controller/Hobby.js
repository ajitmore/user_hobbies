"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HobbyService_1 = require("../service/HobbyService");
var HobbyController = /** @class */ (function () {
    function HobbyController() {
        this.router = express_1.Router();
        this.routes();
    }
    HobbyController.prototype.CreateHobby = function (req, res) {
        try {
            if (!req.body.name || !req.body.passionlevel || !req.body.year || !req.params.userId) {
                return res.status(400).send('Invalid body parameter');
            }
            var hobby = {
                Name: String(req.body.name),
                PassionLevel: String(req.body.passionlevel),
                Year: String(req.body.year),
            };
            HobbyService_1.HobbyService.getInstance().addHobby(hobby, req.params.userId)
                .then(function (doc) {
                return res.status(200).send(doc);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
        catch (error) {
            res.status(500).send(error);
        }
    };
    HobbyController.prototype.deleteHobby = function (req, res) {
        try {
            if (!req.params.id || !req.params.userId) {
                return res.status(400).send('Invalid request');
            }
            HobbyService_1.HobbyService.getInstance().deleteHobbies(req.params.id, req.params.userId)
                .then(function (doc) {
                return res.status(200).send(doc);
            }).catch(function (err) {
                return res.status(400).send(err);
            });
        }
        catch (error) {
            res.status(500).send(error);
        }
    };
    HobbyController.prototype.routes = function () {
        this.router.post('/:userId', this.CreateHobby);
        this.router.delete('/:id/:userId', this.deleteHobby);
    };
    return HobbyController;
}());
//export
var hobbyController = new HobbyController();
hobbyController.routes();
exports.default = hobbyController.router;
//# sourceMappingURL=Hobby.js.map