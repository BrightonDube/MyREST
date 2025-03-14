import mongoose from "mongoose";
const date = new Date().toISOString();

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: date 
    },
});

export default mongoose.model("Post", PostSchema);