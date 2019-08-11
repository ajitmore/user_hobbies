"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    UpdatedAt: {
        type: Date,
        default: Date.now()
    },
    Name: {
        type: String,
        default: '',
        required: [true, 'Name is required']
    },
    Hobbies: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Hobbies'
        }]
});
exports.User = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map