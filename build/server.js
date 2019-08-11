"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var logger = require("morgan");
var cors = require("cors");
var User_1 = require("./controller/User");
var Hobby_1 = require("./controller/Hobby");
// server class
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        //Set up mongoose
        var MONGO_URI = 'mongodb://localhost/user_hobbies';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI, {}, function (err) {
            if (!err) {
                console.log('Mongo DB is connected');
            }
        });
        // config
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(cors());
    };
    Server.prototype.middleware = function (req, res, next) {
        if (req.headers.authorization === 'dXNlcjpob2JiaWVz') {
            next();
        }
        else {
            res.sendStatus(401);
        }
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', this.middleware);
        this.app.use('/api/user', User_1.default);
        this.app.use('/api/hobby', Hobby_1.default);
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map