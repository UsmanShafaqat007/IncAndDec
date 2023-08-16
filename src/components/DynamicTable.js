import React, {useState, useEffect} from "react"
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    Dialog, DialogTitle, DialogContent,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLotForm from "./AdminDashboard/AddLotForm";
import CloseIcon from "@mui/icons-material/Close";
import {deleteLot, getLot, getLots} from "../apis/lots";
import {deleteBlog, getBlog, getBlogs} from "../apis/blogs";
import ConfirmationAlert from '../components/ConfirmationAlert'
import Toaster from "./Toaster";
import AddBlogsForm from './AdminDashboard/AddBlogsForm'
import {deleteUpcomingAuction, getUpcomingAuction, getUpcomingAuctions} from "../apis/upcomingAuctions";
import AddUpcomingAuctions from '../components/AdminDashboard/AddUpcomingAuctions'
import {getPreviousAuction, getPreviousAuctions, deletePreviousAuction} from "../apis/previousAuctions";
import AddPreviousAuctions from '../components/AdminDashboard/AddPreviousAuctions'
import moment from "moment";
import {getAuctionRequests} from "../apis/common";

const DynamicTable = ({activeTab}) => {
    const rowsPerPage = 20

    const [state, setState] = useState({
        modalOpen: false,
        page: 0,
        List: [],
        count: 0,
        toBeSkipped: ["_id", "event"],
        toBeEdit: null,
        mode: "add",
        deleteId: '',
        isDeleteOpen: false,
        toasterMessage: "",
        toasterColor: 'success',
        deleteEvent: null
    })

    useEffect(() => {
        handleChangePage(null, 0)
    }, [activeTab])

    const deleteRecord = async () => {
        try {
            if (activeTab === "lots") {
                const deletedRecord = await deleteLot(state.deleteId)

                if (deletedRecord.success) {
                    const lotsList = await getLots(state.page)

                    setState({
                        ...state,
                        deleteId: null,
                        isDeleteOpen: false,
                        toasterMessage: "Record Deleted Successfully",
                        toasterColor: 'success',
                        List: lotsList && lotsList.data && lotsList.data.lots ? lotsList.data.lots : [],
                        count: lotsList && lotsList.data && lotsList.data.count ? lotsList.data.count : 0,
                        deleteEvent: null
                    })
                }

            } else if (activeTab === 'blogs') {

                const deletedRecord = await deleteBlog(state.deleteId)

                if (deletedRecord.success) {
                    const blogsList = await getBlogs(state.page)

                    setState({
                        ...state,
                        deleteId: null,
                        isDeleteOpen: false,
                        toasterMessage: "Record Deleted Successfully",
                        toasterColor: "success",
                        List: blogsList?.data?.blogs ?? [],
                        count: blogsList?.data?.count ?? 0,
                        deleteEvent: null
                    })
                }
            } else if (activeTab === "previousAuctions") {
                const deletedRecord = await deletePreviousAuction(state.deleteId)

                if (deletedRecord.success) {
                    const prevAuctionsList = await getPreviousAuctions(state.page)

                    setState({
                        ...state,
                        deleteId: null,
                        isDeleteOpen: false,
                        toasterMessage: "Record Deleted Successfully",
                        toasterColor: 'success',
                        List: prevAuctionsList && prevAuctionsList.data && prevAuctionsList.data.auctions ? prevAuctionsList.data.auctions : [],
                        count: prevAuctionsList && prevAuctionsList.data && prevAuctionsList.data.count ? prevAuctionsList.data.count : 0,
                        deleteEvent: null
                    })
                }
            } else if (activeTab === 'upcomingAuctions') {


                const data = {
                    _id: state.deleteId,
                    eventId: state.deleteEvent?.id ? state.deleteEvent?.id : null,
                    mode: "delete"
                }

                const deletedRecord = await deleteUpcomingAuction(data)

                const upcomingAuctionList = await getUpcomingAuctions(state.page)

                setState({
                    ...state,
                    deleteId: null,
                    isDeleteOpen: false,
                    toasterMessage: "Record Deleted Successfully",
                    toasterColor: 'success',
                    List: upcomingAuctionList && upcomingAuctionList.data && upcomingAuctionList.data.upcomingAuctions ? upcomingAuctionList.data.upcomingAuctions.map(elem => {
                        return {
                            ...elem,
                            'Starts At': formatDate(elem['Starts At']),
                            'Ends At': formatDate(elem['Ends At'])
                        }
                    }) : [],
                    count: upcomingAuctionList && upcomingAuctionList.data && upcomingAuctionList.data.count ? upcomingAuctionList.data.count : 0,
                    deleteEvent: null
                })

            }

        } catch (e) {
            setState({
                ...state,
                deleteId: null,
                isDeleteOpen: false,
                toasterMessage: "Error while Deleting record",
                toasterColor: 'error',
                deleteEvent: null
            })
            console.log('error while deleting record', e.message)
        }


    }
    const cancelDelete = () => {
        setState({...state, deleteId: null, isDeleteOpen: false, deleteEvent: null})
    }

    const formatDate = (dateStr) => {
        return moment(dateStr).format("YYYY-MM-DD HH:mm")
    }

    const handleChangePage = async (event, newPage) => {
        try {
            if (activeTab === "lots") {
                const lotsList = await getLots(newPage)

                setState({
                    ...state,
                    page: newPage,
                    List: lotsList?.data?.lots ?? [],
                    count: lotsList?.data?.count ?? 0
                })
            } else if (activeTab === "blogs") {
                const blogsList = await getBlogs(newPage)

                setState({
                    ...state,
                    page: newPage,
                    List: blogsList?.data?.blogs ?? [],
                    count: blogsList?.data?.count ?? 0
                })
            } else if (activeTab === "upcomingAuctions") {
                const upcomingAuctionList = await getUpcomingAuctions(newPage)

                setState({
                    ...state,
                    page: newPage,
                    List: upcomingAuctionList?.data?.upcomingAuctions?.map((elem) => {
                            return {
                                ...elem,
                                "Starts At": formatDate(elem["Starts At"]),
                                "Ends At": formatDate(elem["Ends At"])
                            }
                        })
                        ?? [],
                    count: upcomingAuctionList?.data?.count ?? 0
                })
            } else if (activeTab === "previousAuctions") {
                const previousAuctions = await getPreviousAuctions(newPage)

                setState({
                    ...state,
                    page: newPage,
                    List: previousAuctions?.data?.auctions ?? [],
                    count: previousAuctions?.data?.count ?? 0
                })
            } else if (activeTab === "auctionsRequests") {
                const requests = await getAuctionRequests(newPage)

                setState({
                    ...state,
                    page: newPage,
                    List: requests?.data?.requests ? requests?.data?.requests.map(el => {
                        return {...el, 'Property Type': el['Property Type'].join(',')}
                    }) : [],
                    count: requests?.data?.count ?? 0
                })
            }
        } catch (e) {
            console.log("error while fetching", e.message)
        }
    }

    const handleEdit = async (id, event = null) => {
        // Handle edit logic for the given row ID
        console.log('Edit:', id);
        try {

            if (activeTab === 'lots') {
                const lotDetails = await getLot(id)
                setState({
                    ...state,
                    mode: "edit",
                    modalOpen: true,
                    toBeEdit: lotDetails && lotDetails.data ? lotDetails.data : null
                })
            } else if (activeTab === 'blogs') {
                const blogDetails = await getBlog(id)
                setState({
                    ...state,
                    mode: "edit",
                    modalOpen: true,
                    toBeEdit: blogDetails && blogDetails.data ? blogDetails.data : null
                })
            } else if (activeTab === "upcomingAuctions") {
                const upcomingAuctionDetails = await getUpcomingAuction(id)
                setState({
                    ...state,
                    mode: "edit",
                    modalOpen: true,
                    toBeEdit: upcomingAuctionDetails && upcomingAuctionDetails.data ? upcomingAuctionDetails.data : null
                })
            } else if (activeTab === "previousAuctions") {
                const previousAuctions = await getPreviousAuction(id)
                setState({
                    ...state,
                    mode: "edit",
                    modalOpen: true,
                    toBeEdit: previousAuctions && previousAuctions.data ? previousAuctions.data : null
                })
            }

        } catch (e) {
            console.log('Error while fetching details')
        }
    };

    const removeToaster = () => {
        setState({...state, toasterColor: "success", toasterMessage: ""})
    }

    const handleView = async (id) => {
        // Handle view logic for the given row ID
        console.log("View:", id)
    }

    const handleDelete = (id, event = null) => {
        // Handle delete logic for the given row ID
        console.log('Delete:', id);
        setState({...state, deleteId: id, isDeleteOpen: true, deleteEvent: !!event ? event : null})
    };

    const closeModal = async (shouldCallApi = false) => {
        if (shouldCallApi) {
            if (activeTab === "lots") {
                const lotsList = await getLots(state.page)

                setState({
                    ...state,
                    List: lotsList?.data?.lots ?? [],
                    count: lotsList?.data?.count ?? 0,
                    modalOpen: false,
                    mode: "add",
                    toBeEdit: null
                })
            } else if (activeTab === "blogs") {
                const blogsList = await getBlogs(state.page)

                setState({
                    ...state,
                    List: blogsList?.data?.blogs ?? [],
                    count: blogsList?.data?.count ?? 0,
                    modalOpen: false,
                    mode: "add",
                    toBeEdit: null
                })
            } else if (activeTab === "upcomingAuctions") {
                const upcomingAuctionList = await getUpcomingAuctions(state.page)

                setState({
                    ...state,
                    List: upcomingAuctionList && upcomingAuctionList.data && upcomingAuctionList.data.upcomingAuctions ? upcomingAuctionList.data.upcomingAuctions.map(elem => {
                        return {
                            ...elem,
                            'Starts At': formatDate(elem['Starts At']),
                            'Ends At': formatDate(elem['Ends At'])
                        }
                    }) : [],
                    count: upcomingAuctionList && upcomingAuctionList.data && upcomingAuctionList.data.count ? upcomingAuctionList.data.count : 0,
                    modalOpen: false,
                    mode: "add",
                    toBeEdit: null
                })
            } else if (activeTab === 'previousAuctions') {

                const previousAuctions = await getPreviousAuctions(state.page)

                setState({
                    ...state,
                    modalOpen: false,
                    mode: "add",
                    toBeEdit: null,
                    List: previousAuctions?.data?.auctions
                        ? previousAuctions.data.auctions
                        : [],
                    count: previousAuctions?.data?.count ?? 0
                })
            }
        } else {
            setState({...state, modalOpen: false, mode: "add", toBeEdit: null})
        }
    }

    return (
        <>
            {activeTab === "lots" && (
                <AddLotForm
                    isOpen={state.modalOpen}
                    closeModal={closeModal}
                    mode={state.mode}
                    details={state.toBeEdit}
                />
            )}

            {activeTab === "blogs" && (
                <AddBlogsForm
                    isOpen={state.modalOpen}
                    closeModal={closeModal}
                    mode={state.mode}
                    details={state.toBeEdit}
                />
            )}

            {activeTab === "upcomingAuctions" && (
                <AddUpcomingAuctions
                    isOpen={state.modalOpen}
                    closeModal={closeModal}
                    mode={state.mode}
                    details={state.toBeEdit}
                />
            )}

            {activeTab === "previousAuctions" && (
                <AddPreviousAuctions
                    isOpen={state.modalOpen}
                    closeModal={closeModal}
                    mode={state.mode}
                    details={state.toBeEdit}
                />
            )}

            {activeTab !== "auctionsRequests" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "end",
                        marginBottom: "20px"
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={(e) =>
                            setState({...state, mode: "add", modalOpen: !state.modalOpen})
                        }
                    >
                        Create Record
                    </Button>
                </div>
            )}

            <TableContainer component={Paper} style={{width: "100%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {state.List && state.List.length > 0 ? Object.keys(state.List[0]).map((header, index) => {
                                return !state.toBeSkipped.includes(header) ?
                                    <TableCell key={index}>{header}</TableCell> : ''
                            }) : ""}
                            {state.List && state.List.length > 0 && (activeTab !== 'auctionsRequests') ?
                                <TableCell>Actions</TableCell> : ""}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.List && state.List.length > 0 ?
                            state.List.map((row, index) => (
                                <TableRow key={index}>
                                    {Object.keys(row).map((cell, index) => {
                                            const cellValue = row[cell];
                                            const cellContent = typeof cellValue === 'boolean' ? (cellValue ? 'True' : 'False') : typeof cellValue === 'string' && cellValue && cellValue.length > 50 ? cellValue.substring(0, 50) + "..." : cellValue;
                                            return !state.toBeSkipped.includes(cell) ?
                                                <TableCell key={index}>{!!cellContent ? cellContent : '--'}</TableCell> : ""
                                        }
                                    )}
                                    {(activeTab !== 'auctionsRequests') && (
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(row._id, row.event)}>
                                                <EditIcon/>
                                            </IconButton>
                                            {/*<IconButton color="primary" onClick={() => handleView(row._id)}>*/}
                                            {/*    <VisibilityIcon/>*/}
                                            {/*</IconButton>*/}
                                            <IconButton color="secondary"
                                                        onClick={() => handleDelete(row._id, row.event)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>)}
                                </TableRow>
                            )) : ""}

                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={state.count}
                    rowsPerPageOptions={[20]}
                    rowsPerPage={rowsPerPage}
                    page={state.page}
                    onPageChange={handleChangePage}
                />
            </TableContainer>

            <ConfirmationAlert
                isOpen={state.isDeleteOpen}
                onDelete={deleteRecord}
                onCancel={cancelDelete}
                message={"Are you sure you want to Delete this record?"}
            />

            {state.toasterMessage && (
                <Toaster
                    message={state.toasterMessage}
                    removeToaster={removeToaster}
                    severity={state.toasterColor}
                />
            )}
        </>
    )
}

export default DynamicTable
