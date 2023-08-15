import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../store/slices/apiSlice'
import { setCredentials } from '../store/slices/userSlice'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isCandidate, setIsCandidate] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerUser, {isLoading, isError, error}] = useRegisterUserMutation()

    const register = async(e)=>{
        e.preventDefault()
        try {
            const res = await registerUser({name, email, password, isCandidate: isCandidate}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
                
    }

    return (
        <div>
            <form onSubmit={register} className="card-body w-4/6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <input onChange={(e)=>setIsCandidate(e.target.checked)} className='checkbox' type='checkbox'></input>
                        <a href="#" className="label-text-alt link link-hover">Register as Candidate?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Register