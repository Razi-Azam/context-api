import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)

    if(!user) return <div className='text-3xl text-white'>Please login</div>

    return (
        <div className='flex justify-center w-full py-4'>
            <div className='flex justify-center items-center w-96 h-20 border bg-zinc-900'>
                <h2 className='text-3xl text-white'>Welcome <span className='text-violet-200'>{user.username}</span></h2>
            </div>
        </div>
    )
}

export default Profile