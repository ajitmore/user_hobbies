"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var HobbySchema = new mongoose_1.Schema({
    createdAt: Date,
    updatedAt: Date,
    PassionLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Very-High'],
        required: [true, 'Passion level is required']
    },
    Name: {
        type: String,
        required: [true, 'Name is required']
    },
    Year: {
        type: String,
        required: [true, 'Year is required']
    }
});
exports.Hobbies = mongoose_1.model('Hobbies', HobbySchema);
//# sourceMappingURL=Hobbies.js.map