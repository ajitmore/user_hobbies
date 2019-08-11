import { Schema, model } from "mongoose";

let HobbySchema: Schema = new Schema({
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
export const Hobbies = model('Hobbies', HobbySchema);