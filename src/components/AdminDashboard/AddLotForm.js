import React, {useState, useRef, useEffect} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Input,
    Select,
    MenuItem, DialogTitle, IconButton, DialogContent, Dialog
} from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import Toaster from "../Toaster";
import {addLot, updateLot} from '../../apis/lots'
import {postFile, postMultipleFiles} from '../../apis/common'
import CloseIcon from "@mui/icons-material/Close";

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

const AddLotForm = ({isOpen, closeModal, mode, details}) => {

    const classes = useStyles();

    const f1 = useRef(null)

    const [state, setState] = useState({
        address: "",
        price: 0,
        propertyImage: null,
        detailsPdf: null,
        financeDetailPdf: null,
        propertyType: [],
        description: '',
        disclaimer: "",
        otherDetails: "",
        toasterMessage: "",
        toasterColor: 'success',
        bedRooms: 0,
        bathRooms: 0,
        parkingSlots: 0,
        drawingRooms: 0,
        livingRooms: 0,
        kitchens: 0,
        legalPackPdf: null,
        editId: null,
        mapLink: ""
    });

    const removeToaster = () => {
        setState({...state, toasterColor: 'success', toasterMessage: ""})
    }

    useEffect(() => {
        const newState = {}

        if (!!details && Object.keys(details).length > 0) {
            Object.keys(details).map(el => {

                if (el === 'current' && details[el]) {
                    if (Array.isArray(newState['propertyType']) && newState['propertyType'].length > 0) {
                        newState['propertyType'].push("Current Lot")
                    } else {
                        newState['propertyType'] = ["Current Lot"]
                    }

                } else if (el === 'featured' && details[el]) {

                    if (Array.isArray(newState['propertyType']) && newState['propertyType'].length > 0) {
                        newState['propertyType'].push("Featured Lot")
                    } else {
                        newState['propertyType'] = ["Featured Lot"]
                    }

                } else if (el === 'available' && details[el]) {
                    if (Array.isArray(newState['propertyType']) && newState['propertyType'].length > 0) {
                        newState['propertyType'].push("Available Lot")
                    } else {
                        newState['propertyType'] = ["Available Lot"]
                    }
                } else if (el === '_id') {
                    newState['editId'] = details[el]
                } else {
                    newState[el] = details[el]
                }

            })
        }

        setState({...state, ...newState})

    }, [details])

    const checkBtnDisabled = () => {
        const {
            address,
            propertyType,
            description,
            price,
            propertyImage
        } = state


        if (address && Array.isArray(propertyType) && propertyType.length > 0 && description && price && propertyImage) {
            return false
        } else {
            return true
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

    const submitForm = async () => {
        try {
            const data = {
                address: state.address,
                current: state.propertyType && state.propertyType.includes('Current Lot'),
                available: state.propertyType && state.propertyType.includes('Available Lot'),
                featured: state.propertyType && state.propertyType.includes('Featured Lot'),
                description: state.description,
                bedRooms: state.bedRooms,
                bathRooms: state.bathRooms,
                parkingSlots: state.parkingSlots,
                drawingRooms: state.drawingRooms,
                livingRooms: state.livingRooms,
                kitchens: state.kitchens,
                otherDetails: state.otherDetails,
                price: state.price,
                disclaimer: state.disclaimer,
                propertyImage: state.propertyImage,
                financeDetailPdf: state.financeDetailPdf,
                legalPackPdf: state.legalPackPdf,
                detailsPdf: state.detailsPdf,
                mapLink: state.mapLink
            }

            let res = null

            if (mode === 'add') {
                res = await addLot(data)
            } else {
                res = await updateLot(state.editId, data)
            }


            if (res && res.success) {
                setState({
                    ...state,
                    toasterColor: "success",
                    toasterMessage: `Lot ${mode === 'add' ? "Added" : "Updated"} Successfully`,
                    address: "",
                    price: 0,
                    propertyImage: null,
                    detailsPdf: null,
                    financeDetailPdf: null,
                    propertyType: [],
                    description: '',
                    disclaimer: "",
                    otherDetails: "",
                    bedRooms: 0,
                    bathRooms: 0,
                    parkingSlots: 0,
                    drawingRooms: 0,
                    livingRooms: 0,
                    kitchens: 0,
                    legalPackPdf: null,
                    mapLink: ""
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

    const handleMultipleImageUpload = async (event, allowedFileTypes, field) => {

        try {
            const files = Array.from(event.target.files);

            console.log(files, ";;;;;;;;")

            let shouldUpload = true

            if (files && files.length > 0) {

                files.map(file => {

                    const fileName = file && file.name ? file.name : ""

                    const fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)

                    if (!file || !allowedFileTypes.includes(fileType)) {
                        shouldUpload = false
                    }

                })
            } else {
                shouldUpload = false
            }

            if (shouldUpload) {
                const response = await postMultipleFiles(files)
                setState({...state, [field]: response && response.fileUrls ? response.fileUrls : null});
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
                            address: "",
                            price: 0,
                            propertyImage: null,
                            detailsPdf: null,
                            financeDetailPdf: null,
                            propertyType: [],
                            description: '',
                            disclaimer: "",
                            otherDetails: "",
                            bedRooms: 0,
                            bathRooms: 0,
                            parkingSlots: 0,
                            drawingRooms: 0,
                            livingRooms: 0,
                            kitchens: 0,
                            legalPackPdf: null,
                            toasterColor: "success",
                            toasterMessage: ``,
                            editId: null,
                            mapLink: ""
                        })
                        closeModal()

                    }}>
                <DialogTitle>
                    <Typography variant="h6">Add Lots</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setState({
                                ...state,
                                address: "",
                                price: 0,
                                propertyImage: null,
                                detailsPdf: null,
                                financeDetailPdf: null,
                                propertyType: [],
                                description: '',
                                disclaimer: "",
                                otherDetails: "",
                                bedRooms: 0,
                                bathRooms: 0,
                                parkingSlots: 0,
                                drawingRooms: 0,
                                livingRooms: 0,
                                kitchens: 0,
                                legalPackPdf: null,
                                toasterColor: "success",
                                toasterMessage: ``,
                                editId: null,
                                mapLink: ""
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
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Property
                                                        Address</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField placeholder="Property Address"
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.address}
                                                               onChange={e => {
                                                                   if (e.target.value.length <= 200) {
                                                                       setState({
                                                                           ...state,
                                                                           address: e.target.value,
                                                                           toasterMessage: ""
                                                                       })
                                                                   } else {
                                                                       setState({
                                                                           ...state,
                                                                           toasterMessage: 'Address Should be less than equal to 200 characters',
                                                                           toasterColor: 'error'
                                                                       })

                                                                   }

                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Guide
                                                        Price</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField type={'number'} placeholder="Guided Price"
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.price}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       price: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Bed
                                                        Rooms</Typography>
                                                    <TextField type={'number'} placeholder="Bed Rooms"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.bedRooms}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       bedRooms: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Living
                                                        Rooms</Typography>
                                                    <TextField type={'number'} placeholder="Living Rooms"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.livingRooms}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       livingRooms: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Parking
                                                        Slots</Typography>
                                                    <TextField type={'number'} placeholder="Parking Slots"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.parkingSlots}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       parkingSlots: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1"
                                                                fontWeight="bold">Kitchens</Typography>
                                                    <TextField type={'number'} placeholder="Kitchens"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.kitchens}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       kitchens: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Drawing
                                                        Rooms</Typography>
                                                    <TextField type={'number'} placeholder="Drawing Rooms"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.drawingRooms}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       drawingRooms: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Bath
                                                        Rooms</Typography>
                                                    <TextField type={'number'} placeholder="Bath Rooms"
                                                               className={classes.field}
                                                               inputProps={{
                                                                   min: 0,
                                                               }}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.bathRooms}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       bathRooms: e.target.value > 0 ? e.target.value : 0
                                                                   })
                                                               }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" component="span" fontWeight="bold">Select
                                                        Property
                                                        Image</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <Input
                                                        type="file"
                                                        inputProps={{multiple: true}}
                                                        ref={f1}
                                                        accept="image/*"
                                                        // onChange={e => handleImageUpload(e, ['jpg', 'jpeg', 'png'], 'propertyImage')}
                                                        onChange={e => handleMultipleImageUpload(e, ['jpg', 'jpeg', 'png'], 'propertyImage')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: (state.propertyImage) ? "green" : "red"}}>
                                                        {state.propertyImage ? "File Selected (" + state.propertyImage + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Add Details as PDF
                                                        Pdf</Typography>
                                                    <Input
                                                        type="file"
                                                        // accept="image/*"
                                                        onChange={e => handleImageUpload(e, ['pdf'], 'detailsPdf')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                    />
                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.detailsPdf ? "green" : "red"}}>
                                                        {state.detailsPdf ? "File Selected (" + state.detailsPdf + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Add Legal Pack
                                                        Pdf</Typography>
                                                    <Input
                                                        type="file"
                                                        // accept="image/*"
                                                        onChange={e => handleImageUpload(e, ['pdf'], 'legalPackPdf')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.legalPackPdf ? "green" : "red"}}>
                                                        {state.legalPackPdf ? "File Selected (" + state.legalPackPdf + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        Add Finance Available Pdf</Typography>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => handleImageUpload(e, ['pdf'], 'financeDetailPdf')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                        name={'files'}
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.financeDetailPdf ? "green" : "red"}}>
                                                        {state.financeDetailPdf ? "File Selected (" + state.financeDetailPdf + ")" : "No file selected"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1" fontWeight="bold"
                                                                component={'span'}>Property
                                                        Type</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <Select
                                                        sx={{width: "100%", height: "40px"}}
                                                        labelId="multiselect-label"
                                                        multiple
                                                        value={state.propertyType}
                                                        onChange={e => {
                                                            setState({...state, propertyType: e.target.value})
                                                        }}
                                                        renderValue={(selected) => selected.join(', ')}
                                                    >
                                                        {[{label: "Available Lot", value: "Available Lot"}, {
                                                            label: "Current Lot",
                                                            value: "Current Lot"
                                                        }, {
                                                            label: "Featured Lot",
                                                            value: "Featured Lot"
                                                        }].map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Map
                                                        Link</Typography>
                                                    <TextField placeholder="Map Link"
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.mapLink}
                                                               onChange={e => {
                                                                   setState({
                                                                       ...state,
                                                                       mapLink: e.target.value,
                                                                       toasterMessage: ""
                                                                   })

                                                               }}
                                                    />
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

                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Additional Fees &
                                                        Disclaimer</Typography>
                                                    <TextField placeholder="Additional Fees & Disclaimer" fullWidth
                                                               margin="normal"
                                                               multiline
                                                               rows={4}
                                                               value={state.disclaimer}
                                                               onChange={e => {
                                                                   setState({...state, disclaimer: e.target.value})
                                                               }}
                                                               InputProps={{
                                                                   style: {
                                                                       backgroundColor: '#F3F3F3',
                                                                       border: 0
                                                                   }
                                                               }}/>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1" fontWeight="bold">Other
                                                        Details</Typography>
                                                    <TextField placeholder="Other details" fullWidth margin="normal"
                                                               multiline
                                                               rows={4}
                                                               value={state.otherDetails}
                                                               onChange={e => {
                                                                   setState({...state, otherDetails: e.target.value})
                                                               }}
                                                               InputProps={{
                                                                   style: {
                                                                       backgroundColor: '#F3F3F3',
                                                                       border: 0
                                                                   }
                                                               }}/>
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

export default AddLotForm;
