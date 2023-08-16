import React, {useState} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    TextareaAutosize,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton
} from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {signIn} from "../apis/common";
import Toaster from "./Toaster";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    // field: {
    //     backgroundColor: '#F3F3F3',
    // },
    marginBottom4: {
        marginBottom: theme.spacing(4)
    },
    textAreaField: {
        backgroundColor: '#F3F3F3',
        [theme.breakpoints.down('sm')]: {
            width: "250px"
        },
        [theme.breakpoints.up('sm')]: {
            width: "450px"
        },

    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    }
}));

const SignInup = ({isSignup = false}) => {

    const [state, setState] = useState({
        showPassword: false,
        email: "",
        password: "",
        toasterColor: "success",
        toasterMessage: ``,
    })

    const navigate = useNavigate();

    const disableBtn = () => {

        const {password, email} = state

        if (password && email) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Test the email against the regex pattern
            return !emailRegex.test(email);

        }
        return true

    }

    const removeToaster = () => {
        setState({...state, toasterColor: 'success', toasterMessage: ""})
    }

    function storeItemWithExpiration(key, value, expirationInDays) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationInDays);

        const item = {
            value: value,
            expirationDate: expirationDate.getTime() // Convert expiration date to milliseconds
        };

        localStorage.setItem(key, JSON.stringify(item));
    }

    const handleSignin = async () => {

        try {
            const signin = await signIn({email: state.email, password: state.password})

            if (signin && signin.success) {

                storeItemWithExpiration('cred', {email: state.email, password: state.password}, 1);

                setState({
                    ...state,
                    email: "",
                    password: "",
                    toasterColor: "success",
                    toasterMessage: "Logged in successful!"
                })

                window.location.href = 'https://testing.swiftpropertyauctions.co.uk/admin/dashboard';

            } else {
                setState({
                    ...state,
                    toasterColor: "error",
                    toasterMessage: "Invalid Credentials"
                })
            }

        } catch (e) {

            console.log('error while logged in', e.message)

            setState({
                ...state,
                toasterColor: "error",
                toasterMessage: "Error while sign in"
            })

        }

    }

    const classes = useStyles();

    const fieldLabel = {
        fontSize: "17px",
        color: "#1D242A",
        lineHeight: "28px",
        fontWeight: 600,
        fontFamily: "Inter",
    }

    return (
        <>
            <div>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={4}>
                        <Card className={classes.formContainer} style={{boxShadow: "none"}}>
                            <CardContent>
                                <div className={classes.imageContainer}>
                                    <img src="logoGrey.svg" alt="Logo" style={{width: '60%'}}/>
                                </div>

                                <Typography
                                    style={{
                                        fontSize: "16px",
                                        color: "#000",
                                        fontWeight: 600,
                                        fontFamily: "Inter",
                                        marginBottom: "20px"
                                    }}
                                    variant="body1" textAlign={'center'}>
                                    Connecting Buyers And Sellers Through The Power Of Auction
                                </Typography>

                                <form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography style={fieldLabel} component="span" variant="subtitle1"
                                                        fontWeight="bold">Email</Typography>
                                            <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                {' *'}
                                            </Typography>
                                            <TextField value={state.email}
                                                       onChange={(e) => setState({...state, email: e.target.value})}
                                                       placeholder={'Email'}
                                                       variant="outlined"
                                                       fullWidth
                                                       size="small"/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography style={fieldLabel} component="span"
                                                        variant="subtitle1"
                                                        fontWeight="bold">Password</Typography>
                                            <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                {' *'}
                                            </Typography>
                                            <TextField
                                                value={state.password}
                                                placeholder={'Password'}
                                                onChange={e => setState({...state, password: e.target.value})}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton disableRipple onClick={(e) => setState({
                                                                ...state,
                                                                showPassword: !state.showPassword
                                                            })} edge="end">
                                                                {state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                type={state.showPassword ? 'text' : 'password'}
                                                variant="outlined"
                                                fullWidth
                                                size="small"/>
                                        </Grid>
                                        {isSignup && <Grid item xs={12}>
                                            <Typography style={fieldLabel} variant="subtitle1" fontWeight="bold">Phone
                                                Name</Typography>
                                            <TextField placeholder={"Phone No"} variant="outlined"
                                                       fullWidth
                                                       size="small"/>
                                        </Grid>}
                                        {isSignup && <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="primary"/>}
                                                label="By clicking Sign up, you are agree to our Terms & Conditions"
                                            />
                                        </Grid>}
                                        {!isSignup && <Grid item xs={12}>
                                            {/*<Typography style={fieldLabel} variant="subtitle1">Forgot Password? Click Here</Typography>*/}
                                        </Grid>}
                                        <Grid item xs={12} className={classes.buttonContainer}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth style={{
                                                background: "#B21F18",
                                                fontSize: "16px",
                                                color: "white",
                                                fontWeight: 500,
                                                fontFamily: "Inter",
                                            }}
                                                sx={{
                                                    '&:disabled': {
                                                        opacity: 0.6,
                                                        pointerEvents: 'none',
                                                    },
                                                }}
                                                disabled={disableBtn()}
                                                onClick={e => {
                                                    if (!isSignup) {
                                                        handleSignin()
                                                    }
                                                }}
                                            >
                                                {isSignup ? "Sign Up" : "Sign In"}
                                            </Button>
                                        </Grid>
                                        {!isSignup && <Grid item xs={12}>
                                            {/*<Typography style={fieldLabel} variant="subtitle1">Don't Have Account? Signup now</Typography>*/}
                                        </Grid>}
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {state.toasterMessage &&
                    <Toaster message={state.toasterMessage} removeToaster={removeToaster}
                             severity={state.toasterColor}/>}
            </div>
        </>
    );
};

export default SignInup;
