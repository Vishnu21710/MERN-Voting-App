import { Schema, model } from "mongoose";


const voteSchema = new Schema({
    voterId: {
        type: String,
        unique:true,
        ref: 'User'
    },
    candidateId: {
        type: String,
        ref: 'User'
    }
})

export default model('Vote', voteSchema)