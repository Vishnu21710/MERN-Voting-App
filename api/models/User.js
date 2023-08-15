import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    isCandidate: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    vote: {
        type:Number,
        default: 0
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(password){
            return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)