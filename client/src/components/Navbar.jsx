import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const { userInfo } = useSelector(state => state.user)
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">daisyUI</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center gap-5">
                    {
                        userInfo ? <li><Link to={'/profile'}>Welcome {userInfo.name}</Link></li> : (
                            <>
                                <li><Link to={'/sign-up'}>Sign Up</Link></li>
                            </>
                        )
                    }

                </ul>
            </div>
        </div>
    )
}

export default Navbar