import {Router} from 'express'
import { getUser, registerUser, logoutUser, loginUser, getCandidates } from '../controller/userController.js'

const userRouter = Router()

userRouter.route('/').get(getUser).post(registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/candidates', getCandidates)


export default userRouter