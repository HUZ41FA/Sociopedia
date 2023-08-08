import React from 'react';
import { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
}
from '@mui/material'

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
}
from '@mui/icon-material';
import { useDispatch, useSelector } from 'react-redux';
import {setMode, setLogout} from '../state/globalSlice';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar