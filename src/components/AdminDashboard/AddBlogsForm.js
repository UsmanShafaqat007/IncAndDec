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
import {makeStyles} from "@material-ui/core/styles";
import Toaster from "../Toaster";
import {postFile} from '../../apis/common'
import CloseIcon from "@mui/icons-material/Close";
import {addBlog, updateBlog} from "../../apis/blogs";

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

const AddBlogsForm = ({isOpen, closeModal, mode, details}) => {

    const classes = useStyles();

    const f1 = useRef(null)

    const [state, setState] = useState({
        title: "",
        blogImage: null,
        description: '',
        toasterMessage: "",
        toasterColor: 'success',
        editId: null,
        shortDescription: ""
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
                } else {
                    newState[el] = details[el]
                }

            })
        }

        setState({...state, ...newState})

    }, [details])

    const checkBtnDisabled = () => {
        const {
            title,
            blogImage,
            description,
        } = state


        if (title && description && blogImage) {
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
                title: state.title,
                description: state.description,
                blogImage: state.blogImage,
                shortDescription: state.shortDescription
            }

            let res = null

            if (mode === 'add') {
                res = await addBlog(data)
            } else {
                res = await updateBlog(state.editId, data)
            }


            if (res && res.success) {
                setState({
                    ...state,
                    toasterColor: "success",
                    toasterMessage: `Blog ${mode === 'add' ? "Added" : "Updated"} Successfully`,
                    title: "",
                    blogImage: null,
                    description: '',
                    editId: null,
                    shortDescription: ""
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
                            title: "",
                            blogImage: null,
                            description: '',
                            toasterColor: "success",
                            toasterMessage: ``,
                            editId: null,
                            shortDescription: ""
                        })
                        closeModal()

                    }}>
                <DialogTitle>
                    <Typography variant="h6">Add Blogs</Typography>
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
                                shortDescription: ""
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
                                                    <Typography component="span" variant="subtitle1" fontWeight="bold">Blog
                                                        Title</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField placeholder="Blog Title"
                                                               className={classes.field}
                                                               variant="outlined"
                                                               fullWidth
                                                               size="small"
                                                               value={state.title}
                                                               onChange={e => {
                                                                   if (e.target.value.length <= 200) {
                                                                       setState({
                                                                           ...state,
                                                                           title: e.target.value,
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
                                                    <Typography variant="subtitle1" component="span" fontWeight="bold">Select
                                                        Blog
                                                        Image</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <Input
                                                        type="file"
                                                        ref={f1}
                                                        accept="image/*"
                                                        onChange={e => handleImageUpload(e, ['jpg', 'jpeg', 'png'], 'blogImage')}
                                                        // style={{display: 'none'}}
                                                        id="image-upload"
                                                    />

                                                    <Typography variant="subtitle1" component="span"
                                                                style={{color: state.blogImage ? "green" : "red"}}>
                                                        {state.blogImage ? "File Selected (" + state.blogImage + ")" : "No file selected"}
                                                    </Typography>

                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography component="span" variant="subtitle1"
                                                                fontWeight="bold">Short Description</Typography>
                                                    <TextField placeholder="Enter some short description" fullWidth margin="normal"
                                                               multiline
                                                               rows={4}
                                                               InputProps={{
                                                                   style: {
                                                                       backgroundColor: '#F3F3F3',
                                                                       border: 0
                                                                   }
                                                               }}
                                                               value={state.shortDescription}
                                                               onChange={e => {
                                                                   setState({...state, shortDescription: e.target.value})
                                                               }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Typography component="span" variant="subtitle1"
                                                                fontWeight="bold">Description</Typography>
                                                    <Typography variant="body1" component="span" style={{color: 'red'}}>
                                                        {' *'}
                                                    </Typography>
                                                    <TextField placeholder="Enter some description" fullWidth margin="normal"
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

export default AddBlogsForm;
