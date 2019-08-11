"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserService_1 = require("../service/UserService");
var UserController = /** @class */ (function () {
    function UserController() {
        this.router = express_1.Router();
        this.routes();
    }
    UserController.prototype.CreateUser = function (req, res) {
        try {
            if (!req.body.name) {
                return res.status(400).send('Invalid body parameter');
            }
            var user = {
                Name: String(req.body.name)
            };
            UserService_1.UserService.getInstance().addUser(user)
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
    UserController.prototype.GetUsers = function (req, res) {
        try {
            UserService_1.UserService.getInstance().getUsers()
                .then(function (docs) {
                return res.status(200).send(docs);
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
        catch (error) {
            res.status(500).send(error);
        }
    };
    UserController.prototype.GetUser = function (req, res) {
        try {
            if (req.params.id) {
                UserService_1.UserService.getInstance().getUser(req.params.id)
                    .then(function (doc) {
                    return res.status(200).send(doc);
                }).catch(function (err) {
                    res.status(500).send(err);
                });
            }
            else {
                res.status(400).send('Invalid request id');
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    };
    UserController.prototype.routes = function () {
        this.router.post('/', this.CreateUser);
        this.router.get('/', this.GetUsers);
        this.router.get('/:id', this.GetUser);
    };
    return UserController;
}());
//export
var userController = new UserController();
userController.routes();
exports.default = userController.router;
//# sourceMappingURL=User.js.map