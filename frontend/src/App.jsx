import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import { useMemo } from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux'

function App() {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const theme = useMemo(()=> createTheme(themeSettings(isDarkMode)), [isDarkMode]);
  return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/profile/:userId' element={<ProfileScreen/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
  )
}

export default App
