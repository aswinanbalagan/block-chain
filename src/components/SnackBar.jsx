import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {

    const { open , message, type  } = props.notification ||{}; 

    const handleClose = (event, reason) => {

        props.handleNotificationClose();
    };

    return (
        <Stack spacing={2}>
            {open && <Alert onClose={handleClose} severity={type}>{message}</Alert>}
            {/* <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}
