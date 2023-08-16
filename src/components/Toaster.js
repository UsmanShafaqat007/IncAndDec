import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toaster = ({ message, severity='success', removeToaster }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);
    //
    const handleClose = () => {
        removeToaster()
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            // open={true}
            autoHideDuration={2000}
            onClose={handleClose}
            // message={message}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>

        </Snackbar>
    );
};

export default Toaster;