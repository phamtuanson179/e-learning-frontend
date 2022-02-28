import { Box, Tabs, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MENUBAR } from './constant';
import QuestionNavbar from './QuestionNavbar.js';
import './exam.scss'
import QuestionDetail from './QuestionDetail.js';

const Exam = () => {
    return (
        <Box
            className='exam__container'
        >
            <Box className='exam__container--left'>
                <QuestionNavbar />

            </Box>

            <Box className='exam__container--right'>
                <QuestionDetail />

            </Box>

        </Box>
    )
}

export default Exam;