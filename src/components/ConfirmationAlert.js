import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmationAlert = ({ message, onDelete, onCancel, isOpen }) => {

    const handleDelete = () => {
        onDelete();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationAlert;