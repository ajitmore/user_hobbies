"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hobbies_1 = require("../model/Hobbies");
var User_1 = require("../model/User");
var HobbyService = /** @class */ (function () {
    function HobbyService() {
        this.addHobby = function (hobby, userId) {
            return new Promise(function (success, reject) {
                hobby = new Hobbies_1.Hobbies(hobby);
                hobby.save(function (err, doc) {
                    if (err) {
                        return reject({
                            type: err.name,
                            message: err.message
                        });
                    }
                    if (doc) {
                        User_1.User.updateOne({ _id: userId }, { $push: { Hobbies: doc.id }
                        }, function (err, userDoc) {
                            if (err)
                                return reject(err);
                            if (userDoc)
                                return success(userDoc);
                        });
                    }
                });
            });
        };
        this.getHobbies = function () {
            return new Promise(function (success, reject) {
                Hobbies_1.Hobbies.find(function (err, docs) {
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
        this.getHobby = function (id) {
            return new Promise(function (success, reject) {
                Hobbies_1.Hobbies.findById(id).populate('Hobbies')
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
        this.deleteHobbies = function (id, userId) {
            return new Promise(function (success, reject) {
                Hobbies_1.Hobbies.deleteOne({ _id: id }, function (err) {
                    if (err)
                        return reject(err);
                    User_1.User.updateOne({ _id: userId }, { $pull: { Hobbies: id }
                    }, function (err, docs) {
                        if (err)
                            return reject(err);
                        if (docs)
                            return success(docs);
                    });
                });
            });
        };
    }
    HobbyService.getInstance = function () {
        if (!HobbyService._instance) {
            HobbyService._instance = new HobbyService();
        }
        return HobbyService._instance;
    };
    return HobbyService;
}());
exports.HobbyService = HobbyService;
//# sourceMappingURL=HobbyService.js.map