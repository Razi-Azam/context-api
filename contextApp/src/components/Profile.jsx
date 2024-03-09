import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)

    if(!user) return <div>please login</div>

    return (
        <div>
            <h2>Welcome <span style={{color: "blue"}}>{user.username}</span></h2>
        </div>
    )
}

export default Profile