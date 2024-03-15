# context-api
This repo includes concepts and projects related to context API in React.
## Topics
- [Create a Vite React App](#create-a-vite-react-app)
- [Context Api Example 1](#context-api-example-1)

## Create a Vite React APP
- It helps the child component to access the data directly instead of getting it from different levels of component (props drilling). Hence, this helps in discarding the use of props drilling.
- This is associated with the React and doesn’t exist outside the react.

#### So, what is the alternatives of context API which also works outside the React for state management? 🤔
- 👉🏻 Redux: It helps in passing data in an organized way.
- 👉🏻 React-redux: To use redux inside react.
- 👉🏻 Redux-toolkit or RTK: A lighter version of Redux.
- 👉🏻 Zustand: It is also a library for state management.

#### LAB: 🖥️
Create a React App using Vite.
```javascript
npm create vite@latest
```
![image](https://github.com/Razi-Azam/context-api/assets/106505820/b68285be-89ba-4762-a704-ff9ecb952779)
###
Then, run the following commands to view the Vite React App.
```javascript
npm i
```
And
```javascript
npm run dev
```
Click on the link to view the site at your local machine.
![image](https://github.com/Razi-Azam/context-api/assets/106505820/bd4374ce-3728-4f9d-95d6-5c1e88364d71)
![image](https://github.com/Razi-Azam/context-api/assets/106505820/612a50a6-6c6b-4def-b0cd-f3c478d2c7b0)

---
## Context Api Example 1
[Go to Top](#topics)
###
Create a context using a "createContext" method of React in a UserContext.js file.
#### UserContext.js
```javascript
import React from "react";

//create a context named "UserContext"
const UserContext = React.createContext();

export default UserContext
```
###
Create a provider named "UserContextProvider" which is a wrapper component to provide the data to all the child components which will be wrapped inside it.
- Passed a children prop (we can take any name instead of children) that will replace any component that we wrapped inside the provider.
- The value contains data which will be consumed by children or child components.
#### UserContextProvider.jsx
```javascript
import React, {useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    //here we can call API or use any data as follows
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
```
Now, Give access of the data to the components by wrapping the components inside UserContextProvider component.
#### App.jsx
```javascript
import './App.css'
import Login from './components/Login';
import Profile from './components/Profile';
import UserContextProvider from './context/UserContextProvider';

function App() {

  return (
    <>
      <UserContextProvider>
        <h1>Context API</h1>
        <Login />
        <Profile />
      </UserContextProvider>
    </>
  )
}

export default App
```
### Set the user's data from the login form in the context using "setUser"
#### Login.jsx
```javascript
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
    <div>
        <h2>Login Form</h2>
        <input 
            type='text'
            placeholder='User Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input 
            type='text'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login
```
### Consume the user's data from the "user" context 
#### Profile.jsx
```javascript
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
```
