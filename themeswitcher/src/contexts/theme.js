import {createContext, useContext} from 'react';

export const ThemeContext = createContext({
    themeMode: "light",
    darkMode: () => {},
    lightMode: () => {}
})

export const ThemeProvider = ThemeContext.Provider

//custom hook named useTheme that provide the ThemeContext
//no need to import useContext everytime to use the context
export default function useTheme() {
    return useContext(ThemeContext)
}