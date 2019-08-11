"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../model/User");
var UserService = /** @class */ (function () {
    function UserService() {
        this.addUser = function (user) {
            return new Promise(function (success, reject) {
                user = new User_1.User(user);
                user.save(function (err, doc) {
                    if (err) {
                        return reject({
                            type: err.name,
                            message: err.message
                        });
                    }
                    return success(doc);
                });
            });
        };
        this.getUsers = function () {
            return new Promise(function (success, reject) {
                User_1.User.find(function (err, docs) {
                    if (err) {
                        return reject({
                            type: err.name,
                            message: err.message
                        });
                    }
                    return success(docs);
                });
            });
        };
        this.getUser = function (id) {
            return new Promise(function (success, reject) {
                User_1.User.findById(id).populate('Hobbies')
                    .exec(function (err, doc) {
                    if (err) {
                        return reject({
                            type: err.name,
                            message: err.message
                        });
                    }
                    return success(doc);
                });
            });
        };
        this.updateUser = function (user) {
            return new Promise(function (success, reject) {
                User_1.User.updateOne({ _id: user.id }, user, function (err, doc) {
                    if (err)
                        return reject(err);
                    if (doc)
                        return success(doc);
                });
            });
        };
        this.deleteUser = function (id) {
            return new Promise(function (success, reject) {
                User_1.User.deleteOne({ _id: id }, function (err) {
                    if (err)
                        return reject(err);
                    return success();
                });
            });
        };
    }
    UserService.getInstance = function () {
        if (!UserService._instance) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map