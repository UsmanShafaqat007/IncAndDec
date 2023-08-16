import React, {useState, useRef, useEffect} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Input,
    DialogTitle,
    IconButton,
    DialogContent,
    Dialog
} from '@mui/material';
import {styled} from "@mui/material/styles";
import Toaster from "../Toaster";
import {postFile} from '../../apis/common'
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import {DateTimePicker} from '@mui/x-date-pickers';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {addUpcomingAuction, updateUpcomingAuction} from "../../apis/upcomingAuctions";

const useStyles = styled((theme) => ({
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

const AddUpcomingAuctions = ({isOpen, closeModal, mode, details}) => {

    const classes = useStyles();

    const [state, setState] = useState({
        startDateTime: null,
        endDateTime: null,
        meetingUrl: '',
        toasterMessage: "",
        toasterColor: 'success',
        editId: null,
        description: '',
        catalogPdf: null,
        event: null
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
                } else if (el === 'startDateTime' || el === 'endDateTime') {

                    newState[el] = moment(details[el])

                } else {
                    newState[el] = details[el]
                }

            })
        }

        setState({...state, ...newState})

    }, [details])

    const handleDateChange = (date, name) => {

        const currentDate = moment();
        if (date.isBefore(currentDate)) {
            // If the selected date is in the past, do not update the state
            return;
        }
        setState({...state, [name]: date});

    };

    const checkBtnDisabled = () => {

        // return false

        const {
            startDateTime,
            endDateTime,
            meetingUrl,
            description
        } = state

        const currentDate = moment();

        const endDate = moment(endDateTime)

        if (!description || !startDateTime || startDateTime.isBefore(currentDate) || !meetingUrl || !endDateTime || endDate.isBefore(startDateTime) || !meetingUrl.startsWith("https://")) {
            // If the selected date is in the past, do not update the state
            return true;
        } else {
            return false
        }


    }

    const submitForm = async () => {
        try {

            const data = {
                startDateTime: state.startDateTime,
                endDateTime: state.endDateTime,
                meetingUrl: state.meetingUrl,
                admin: true,
                eventId: null,
                catalogPdf: state.catalogPdf,
                description: state.description
            }

            let res = null

            if (mode === 'add') {
                res = await addUpcomingAuction(data)
            } else {
                const data = {
                    startDateTime: state.startDateTime,
                    endDateTime: state.endDateTime,
                    meetingUrl: state.meetingUrl,
                    eventId: state.event.id,
                    _id: state.editId,
                    mode: "edit",
                    catalogPdf: state.catalogPdf,
                    description: state.description
                }
                res = await updateUpcomingAuction(data)
            }


            if (res) {
                setState({
                    ...state,
                    toasterColor: "success",
                    toasterMessage: ``,
                    startDateTime: null,
                    endDateTime: null,
                    meetingUrl: '',
                    editId: null,
                    description: "",
                    catalogPdf: null,
                    event:null
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

    const handleImageUpload = async (event, allowedFileTypes, field) => {

        try {
            const file = event.target.files[0];

            const fileName = file && file.name ? file.name : ""

            const fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)

            if (file && allowedFileTypes.includes(fileType)) {
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

    return (
        <>

            <Dialog open={isOpen} maxWidth={'lg'}
                    onClose={() => {
                        setState({
                            ...state,
                            title: "",
                            blogImage: null,
                            description: '',
                            toasterColor: "success",
                            toasterMessage: ``,
                            editId: null,
                            event:null
                        })
                        closeModal()

                    }}>
                <DialogTitle>
                    <Typography variant="h6">{mode === 'edit' ? "Update" : "Add"} Upcoming Auctions</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setState({
                                ...state,
                                title: "",
                                blogImage: null,
                                description: '',
                                toasterColor: "success",
                                toasterMessage: ``,
                                editId: null,
                                event:null
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
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Event
                                                        Start
                                                        Date</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>

                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                        <DemoContainer components={['DateTimePicker']}>
                                                            <DateTimePicker
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            readOnly: true
                                                                        }}
                                                                    />
                                                                )}
                                                                onAccept={(date) => handleDateChange(date, 'startDateTime')}
                                                                closeOnSelect={true}
                                                                placeholder="Controlled picker"
                                                                value={state.startDateTime}
                                                                minDateTime={moment().add(1, 'second')}
                                                                // onChange={handleDateChange}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>

                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Event
                                                        End
                                                        Date</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>

                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                        <DemoContainer components={['DateTimePicker']}>
                                                            <DateTimePicker
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        inputProps={{
                                                                            ...params.inputProps,
                                                                            readOnly: true
                                                                        }}
                                                                    />
                                                                )}
                                                                onAccept={(date) => handleDateChange(date, 'endDateTime')}
                                                                closeOnSelect={true}
                                                                placeholder="Controlled picker"
                                                                value={state.endDateTime}
                                                                minDateTime={moment().add(1, 'second')}
                                                                // onChange={handleDateChange}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>

                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" component="span" fontWeight="bold">Add
                                                        Meet Link</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField placeholder="Add Meet Link"
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.meetingUrl}
                                                               onChange={e => {
                                                                   if (e.target.value.length <= 36) {
                                                                       setState({
                                                                           ...state,
                                                                           meetingUrl: e.target.value,
                                                                           toasterMessage: ""
                                                                       })
                                                                   } else {
                                                                       setState({
                                                                           ...state,
                                                                           toasterMessage: 'Address Should be less than equal to 36 characters',
                                                                           toasterColor: 'error'
                                                                       })
                                                                   }

                                                               }}
                                                    />


                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Add Catalogue
                                                        Pdf</Typography>
                                                    <Input
                                                        type="file"
                                                        onChange={e => handleImageUpload(e, ['pdf'], 'catalogPdf')}
                                                        id="image-upload"
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.catalogPdf ? "green" : "red"}}>
                                                        {state.catalogPdf ? "File Selected (" + state.catalogPdf + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography component="span" variant="subtitle1"
                                                                fontWeight="bold">Description</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField placeholder="Enter some description" fullWidth
                                                               margin="normal"
                                                               multiline
                                                               rows={4}
                                                               InputProps={{
                                                                   style: {
                                                                       backgroundColor: '#F3F3F3',
                                                                       border: 0
                                                                   }
                                                               }}
                                                               value={state.description}
                                                               onChange={e => {
                                                                   setState({...state, description: e.target.value})
                                                               }}
                                                    />
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

export default AddUpcomingAuctions;
