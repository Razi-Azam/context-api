# context-api
This repo includes concepts and projects related to context API in React. I've added my notes and styling to learn and share with others. 
Credits: Hitesh Choudhary [Click here 👆🏻](https://www.youtube.com/watch?v=JQVBGtZMqgU) to learn from the video tutorial.

## Topics
- [Create a Vite React App](#create-a-vite-react-app)
- [Context Api Example 1](#context-api-example-1)
- [ThemeSwitcher Toggle like Tailwind CSS website](#theme-switcher-app)
- [Context Api with Local Storage](#context-api-with-local-storage)



## Create a Vite React APP
- It helps the child component to access the data directly instead of getting it from different levels of component (props drilling). Hence, this helps in discarding the use of props drilling.
- This is associated with the React and doesn’t exist outside the React.

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

###
Enter the following details.
```
project name: contextApp
package name: contextapp
select a framework: React
select a variant: javaScript
```

###
Then, run the following commands to view the Vite React App.
```javascript
npm i
```

And

```javascript
npm run dev
```

Click on the link in the terminal to view the site on your local machine.

```
➡️ Local: http://127.0.0.1:5173/
```

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
Create a provider named "UserContextProvider" which is a wrapper component to provide the data to all the child components that will be wrapped inside it.
- Passed a children prop (we can take any name instead of children) that will replace any component that we wrapped inside the provider.
- The value contains data that will be consumed by children or child components.
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
#### Added style to example 1 using Tailwind CSS:
#### Screen 1: Before login
<img width="491" alt="image" src="https://github.com/Razi-Azam/context-api/assets/106505820/c588929a-8b60-4653-83bc-c9802fc96019">

#### Screen 2: After Login
<img width="491" alt="image" src="https://github.com/Razi-Azam/context-api/assets/106505820/011acb60-7fa7-498f-9696-684e9f8ab5ad">

[Go to Top](#topics)

---
## Theme Switcher App
- Create theme.js which will contain both context, provider, and a hook named "useTheme".
- Created a context named "ThemeContext" with a default value as an object that contains a variable "themeMode" (for the default theme) and two different functions such as darkMode and lightMode for switching between the theme.
- Create a provider named "ThemeProvider" that will provide the context.
- Now, create a custom hook named "useTheme" that will enable us to use the "ThemeContext" so that we don't need to use the "useContext" hook every time.
#### theme.js
```javascript
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkMode: () => {},
    lightMode: () => {}
})

export const ThemeProvider = ThemeContext.Provider

export default function useTheme() {
    return useContext(ThemeContext)
}
```
#### App.jsx
- import "ThemeProvider" to provide data such as themeMode, darkMode, and lightMode to the card.
- Use a useState to use and set the theme mode.
- The darkmode and lightMode functions do not contain any functionality. So, we have to define their functionalities here.
- Inside the useEffect hook, get the current theme of the page using the class of the html element, remove it, and add a new class.
- Since the useEffect depends on the "themeMode" so we have added it as its dependency.
```javascript
const [themeMode, setThemeMode] = useState("light")

  const darkMode = () => {
    setThemeMode("dark")
  }

  const lightMode = () => {
    setThemeMode("light")
  }

  //actual change in theme
  useEffect(() => {
    const theme = document.querySelector('html')
    //get the current theme and remove it
    theme.classList.remove("light", "dark")
    //add the theme mode class to the html tag
    theme.classList.add(themeMode)
  }, [themeMode])
  

  return (
    <ThemeProvider value={{themeMode, darkMode, lightMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeButton />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
```
#### To get the functionality where we can toggle theme mode by toggling the class of "html" element.
- We have to configure in the tailwind.config.js
- Enable the darkMode either by class (if we want set the functionality on class) or media.
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 ➡️ darkMode:"class",
  theme: {
    extend: {},
  },
  plugins: [],
}
```
---
### 💡 Added my styling and theme to the existing code.
#### 🖥️ Screen 1: Light Mode
![image](https://github.com/Razi-Azam/context-api/assets/106505820/1863ffea-e679-4ff8-8351-42947e0047c4)

#### 🖥️ Screen 2: Dark Mode
![image](https://github.com/Razi-Azam/context-api/assets/106505820/dbf861f1-0b10-471b-8dca-7aa135a5a26c)

---
### Added Glassmorphism Effects to the Card
Note 📝 Uses the [Tailwind pattern library](https://github.com/magmaflowco/tailwindcss-patterns) for the background.

#### 🖥️ Screen 3: Light Mode
![image](https://github.com/Razi-Azam/context-api/assets/106505820/7fdfca82-994b-4e86-8e1c-3a228fbc28dc)

#### 🖥️ Screen 4: Dark Mode
![image](https://github.com/Razi-Azam/context-api/assets/106505820/a335a7ad-8579-4243-ab97-668f7c1cb96b)


---
## Context Api with Local Storage 
[Go to Top](#topics)

#### What I added in this todo? 💡
- Used "UUID" fro generating the unqiue ids for keys due to issues with Date.now().
- Changed the cursor style to "cursor-not-allowed" on edit button when todo is completed.
- Uses SVG icons from edit and update button.
- Changed the style of checkbox.
- Changed the look and feel by adding different colors.

#### Upcoming features 💡
- Trash box that will save the deleted data.
- Setting to siwtch ligh and dark theme.
- Add a calender to save the todos by date.

<img width="1201" height="524" alt="image" src="https://github.com/user-attachments/assets/1094cb70-804c-4075-9d3f-0ff837faaf75" />


