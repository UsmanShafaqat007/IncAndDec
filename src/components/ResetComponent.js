import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import {styled} from "@mui/material/styles";

const useStyles = styled((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    formContainer: {
        background: '#fff',
        padding: theme.spacing(2),
        margin: 'auto',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    field: {
        backgroundColor: '#F3F3F3',
    },
}));

const ResetComponent = ({isResetEmail = false}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={4}>
                        <Card className={classes.formContainer} style={{boxShadow: "none"}}>
                            <CardContent>
                                <Typography style={{marginBottom: "20px"}} variant="h4" textAlign={'center'}>
                                    {isResetEmail ? "Password Reset" : "Reset your password"}
                                </Typography>
                                <Typography style={{marginBottom: "20px"}} variant="body1" textAlign={'center'}>
                                    {isResetEmail ? "You will receive instructions for resetting your password" : "Enter a new password to reset the password on your account. We will ask for this password whenever you log in."}
                                </Typography>
                                <form>
                                    <Grid container spacing={2}>
                                        {isResetEmail && <Grid item xs={12}>
                                            <Typography variant="subtitle1" fontWeight="bold">Email *</Typography>
                                            <TextField placeholder="Email" className={classes.field} variant="outlined"
                                                       fullWidth
                                                       size="small"/>
                                        </Grid>}
                                        {!isResetEmail && <Grid item xs={12}>
                                            <Typography variant="subtitle1" fontWeight="bold">Password</Typography>
                                            <TextField type={'password'} placeholder="City" className={classes.field}
                                                       variant="outlined"
                                                       fullWidth
                                                       size="small"/>
                                        </Grid>}
                                        {!isResetEmail && <Grid item xs={12}>
                                            <Typography variant="subtitle1" fontWeight="bold">Password</Typography>
                                            <TextField placeholder="City" className={classes.field} variant="outlined"
                                                       fullWidth
                                                       size="small"/>
                                        </Grid>}
                                        <Grid item xs={12} className={classes.buttonContainer}>
                                            <Button variant="contained" color="primary" fullWidth>
                                                {isResetEmail ? "Send" : "Reset Password"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default ResetComponent;
