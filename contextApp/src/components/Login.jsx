import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')    
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }

  return (
    <div className='flex justify-center w-full py-4'>
        <div className='flex flex-col justify-center items-center w-96 h-96 border border-violet-100 bg-transparent opacity-90 p-2 rounded'>
            <h2 className="text-3xl text-white font-bold">Login Form</h2>
            <input 
                className='w-2/3 my-3 mt-6 px-2 py-1.5 text-xl  rounded text-center'
                type='text'
                placeholder='User Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                className='w-2/3 my-2 px-2 py-1.5 text-xl rounded text-center'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                className='w-1/2 py-1.5 mt-3 text-xl text-white hover:bg-violet-300 hover:text-black border rounded text-center'
                onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Login