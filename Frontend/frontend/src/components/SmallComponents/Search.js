import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Input } from 'antd';


export const SearchBox = (props) => {
    return (
            <Input style={{maxWidth:'25%'}} id="search" placeholder='Search'/>
    );
}
