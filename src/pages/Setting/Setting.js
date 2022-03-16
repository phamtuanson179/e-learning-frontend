import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MENUBAR_ADMIN, MENUBAR_MEMBER } from './constant';
import './Setting.scss';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant='body1'>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

const Setting = () => {
    const [value, setValue] = useState(0);
    const [menubar, setMenubar] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const role = localStorage.getItem('role');
        switch (role) {
            case 0:
                setMenubar(MENUBAR_ADMIN);
                break;
            case 1:
                setMenubar(MENUBAR_MEMBER);
                break;
            default:
                setMenubar(MENUBAR_ADMIN);
        }
    }, [])

    const renderTabs = () => {
        if (menubar)
            return (
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                >
                    {
                        menubar.map((item, idx) =>
                            <Tab
                                key={idx}
                                label={item.name}
                                className={value === idx ? 'tab--active' : ''}
                            />)
                    }
                </Tabs>
            )
    }

    const renderTabPanels = () => {
        if (menubar)
            return (
                <>
                    {
                        menubar.map((item, idx) =>
                            <TabPanel key={idx} value={value} index={idx} className='tab--personal-info'>
                                {item.component}
                            </TabPanel>
                        )
                    }
                </>
            )
    }
    return (
        <Box className='manager-info__container' >
            <Box className='left__container'>
                {renderTabs()}
            </Box >
            <Box className='right__container'>
                {renderTabPanels()}
            </Box>
        </Box>
    );
}

export default Setting;