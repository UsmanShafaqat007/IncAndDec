import React, {useState, useRef, useEffect} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Input, DialogTitle, IconButton, DialogContent, Dialog
} from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import Toaster from "../Toaster";
import {postFile} from '../../apis/common'
import CloseIcon from "@mui/icons-material/Close";
import {addPreviousAuction, updatePreviousAuction} from "../../apis/previousAuctions";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    formContainer: {
        background: '#fff',
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 700,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    field: {
        backgroundColor: '#F3F3F3',
    },
    root: {},
}));

const AddPreviousAuctions = ({isOpen, closeModal, mode, details}) => {

    const classes = useStyles();

    const f1 = useRef(null)

    const [state, setState] = useState({
        date: null,
        saleRate: 0,
        imageUrl: null,
        toasterMessage: "",
        toasterColor: 'success',
        totalRaised: 0,
        editId: null
    });

    const removeToaster = () => {
        setState({...state, toasterColor: 'success', toasterMessage: ""})
    }

    useEffect(() => {
        const newState = {}

        if (!!details && Object.keys(details).length > 0) {
            Object.keys(details).map(el => {

                if (el === '_id') {
                    newState['editId'] = details[el]
                }
                else if (el === 'date') {

                    const dateString = details[el]

                    const date = moment(dateString, 'DD MMMM YYYY');

                    const formattedDate = date.format('YYYY-MM-DD');

                    console.log(date, "........")

                    newState[el] = date



                } else {
                    newState[el] = details[el]
                }

            })
        }

        setState({...state, ...newState})

    }, [details])

    const checkBtnDisabled = () => {
        const {
            totalRaised,
            date,
            saleRate,
            imageUrl
        } = state


        if (totalRaised && date && saleRate && imageUrl) {
            return false
        } else {
            return true
        }

    }

    const handleDateChange = (dateStr, name) => {
        console.log(dateStr, "lllllllll")
        setState({...state, [name]: dateStr});
    };

    const handleImageUpload = async (event, allowedFileTypes, field) => {

        try {
            const file = event.target.files[0];

            const fileName = file && file.name ? file.name : ""

            const fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)

            if (file && allowedFileTypes.includes(fileType)) {
                console.log('i am here')
                const response = await postFile(file)
                setState({...state, [field]: response && response.fileUrl ? response.fileUrl : null});
            } else {
                setState({
                    ...state,
                    [field]: null,
                    toasterColor: "error",
                    toasterMessage: `Allowed File Types are ${allowedFileTypes.join(',')}`
                });
            }

        } catch (e) {
            setState({
                ...state,
                [field]: null,
                toasterColor: "error",
                toasterMessage: `Error while uploading file`
            });
            console.log('error while uploading', e.message)
        }
    };

    const submitForm = async () => {
        try {
            const data = {
                totalRaised: state.totalRaised,
                date: state.date,
                saleRate: state.saleRate,
                imageUrl: state.imageUrl,
            }

            const dateString = state.date;

            // const date = new Date(dateString);

            // console.log(date)

            const momentDate = moment(dateString);

            const day = momentDate.date();
            const month = momentDate.format('MMMM');
            const year = momentDate.year();


            // const day = date.getUTCDate();
            // const month = date.toLocaleString('default', {month: 'long'});
            // const year = date.getUTCFullYear();

            data['date'] = `${day} ${month} ${year}`

            let res = null

            if (mode === 'add') {
                res = await addPreviousAuction(data)
            } else {
                res = await updatePreviousAuction(state.editId, data)
            }


            if (res && res.success) {
                setState({
                    ...state,
                    toasterColor: "success",
                    toasterMessage: `Previous Auction ${mode === 'add' ? "Added" : "Updated"} Successfully`,
                    totalRaised: 0,
                    saleRate: 0,
                    imageUrl: null,
                    date: null,
                });
                closeModal(true)
            }

        } catch (e) {
            setState({
                ...state,
                toasterColor: "error",
                toasterMessage: `Error while saving data`
            });
            console.log('error while saving data', e.message)
        }

    }

    return (
        <>
            <Dialog open={isOpen} maxWidth={'lg'}
                    onClose={() => {
                        setState({
                            ...state,
                            totalRaised: 0,
                            saleRate: 0,
                            imageUrl: null,
                            date: null,
                            toasterColor: "success",
                            toasterMessage: ``,
                            editId: null
                        })
                        closeModal()

                    }}>
                <DialogTitle>
                    <Typography variant="h6">Add Previous Auctions</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setState({
                                ...state,
                                totalRaised: 0,
                                saleRate: 0,
                                imageUrl: null,
                                date: null,
                                toasterColor: "success",
                                toasterMessage: ``,
                                editId: null
                            })
                            closeModal()
                        }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'gray',
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Card className={classes.formContainer}>
                                    <CardContent>
                                        <form>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography component="span" variant="subtitle1"
                                                                fontWeight="bold">Date</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <DatePicker
                                                                className={classes.field}
                                                                slotProps={{textField: {size: 'small'}}}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            readOnly: true
                                                                        }}
                                                                    />
                                                                )}
                                                                onAccept={(date) => handleDateChange(date, 'date')}
                                                                closeOnSelect={true}
                                                                value={state.date}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Total
                                                        Raised</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField type={'number'} placeholder="Total Raised"
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.totalRaised}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       totalRaised: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Sale
                                                        Rate</Typography>
                                                    <TextField type={'number'} placeholder="Sale Rate"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                                   max: 100,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.saleRate}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       saleRate: e.target.value > 0 && e.target.value <= 100 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" component="span" fontWeight="bold">Select
                                                        Auction
                                                        Image</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => handleImageUpload(e, ['jpg', 'jpeg', 'png'], 'imageUrl')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.imageUrl ? "green" : "red"}}>
                                                        {state.imageUrl ? "File Selected (" + state.imageUrl + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} className={classes.buttonContainer}>
                                                    <Button onClick={submitForm} variant="contained" color="primary"
                                                            disabled={checkBtnDisabled()}
                                                            sx={{
                                                                '&:disabled': {
                                                                    opacity: 0.6,
                                                                    pointerEvents: 'none',
                                                                },
                                                            }}
                                                            style={{color: "white", backgroundColor: "#B21F18"}}>
                                                        {mode === 'add' ? "Submit" : "Update"}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>


            {state.toasterMessage &&
                <Toaster message={state.toasterMessage} removeToaster={removeToaster} severity={state.toasterColor}/>}

        </>
    );
};

export default AddPreviousAuctions;
