import { Schema, model, Model, Document } from "mongoose";

const UserSchema: Schema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Hobbies'
    }]
});

export const User = model('User', UserSchema);