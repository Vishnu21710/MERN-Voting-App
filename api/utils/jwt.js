import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const generateToken = (res, userId)=>{
     const token = jwt.sign({userId}, process.env.JWT_KEY, {
        expiresIn: '30d'
    })

    res.cookie('token', token, {
        httpOnly: true
    })
}

//middleware
export const protect = async(req ,res, next)=>{
        try {    
            const token = req.cookies.token
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_KEY)
                req.user = await User.findById(decoded.userId).select('-password')
                console.log('token', req.user);
                next()
            }else{
                res.status(401).send('Invalid Token')
            }
        } catch (error) {
            res.status(401).send('No token')
        }
}