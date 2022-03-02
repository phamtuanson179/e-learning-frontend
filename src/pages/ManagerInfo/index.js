import { Box, Tabs, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MENUBAR } from './constant';
import MenuNavbar from './MenuNavbar.js';
import './ManagerInfo.scss'
import PersonalInfo from './PersonalInfo';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ManagerInfo = ({ role }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

        <Box

            className='manager-info__container'
        >
            <Box className='left__container'>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                >
                    <Tab
                        label="Thông tin cá nhân" className={value === 0 ? 'tab--active' : ''}
                    />
                    <Tab
                        label="Các thông tin khác"
                        className={value === 1 ? 'tab--active' : ''}
                    />
                </Tabs>

            </Box >
            <div className='right__container'>
                <TabPanel value={value} index={0}>
                    <PersonalInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </div>
        </Box>
    );
}

export default ManagerInfo;