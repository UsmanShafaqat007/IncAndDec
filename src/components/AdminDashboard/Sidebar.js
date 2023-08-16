import React, { useState } from 'react';
import { Box, Tabs, Tab, Divider  } from '@mui/material';

const Sidebar = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '20%', marginTop: '16px' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} sx={{ marginBottom: 1 }} />
                    ))}
                </Tabs>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ flex: 1, padding: '16px', paddingTop: '16px', width: '80%'  }}>
                {tabs[activeTab].component}
            </Box>
        </Box>
    );
};

export default Sidebar;