import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// This might look wierd but we use this syntax when we want to reuse css
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",    
})

export default FlexBetween