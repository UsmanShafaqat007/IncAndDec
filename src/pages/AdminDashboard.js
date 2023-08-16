import React from 'react';
import TopBar from '../components/AdminDashboard/TopBar';
import {styled} from "@mui/material/styles";
import Sidebar from "../components/AdminDashboard/Sidebar";
import DynamicTable from "../components/DynamicTable";

function AdminDashboard() {

    const useStyles = styled(theme => ({
        root: {
            width: "100%"
        },
        contactBtnDiv: {
            backgroundColor: "#B21F18",
            width: '133px',
            display: "flex",
            justifyContent: "center"
        },
        flexCenter: {
            display: "flex",
            justifyContent: "center"
        },
    }))

    const classes = useStyles()


    return (
        <>

            <div className={classes.root}>
                <TopBar/>
                <Sidebar tabs={[
                    {label: 'Lots', component: <DynamicTable activeTab={'lots'}/>},
                    {label: 'Blogs', component: <DynamicTable activeTab={'blogs'}/>},
                    {label: 'Upcoming Auctions', component: <DynamicTable activeTab={'upcomingAuctions'}/>},
                    {label: 'Previous Auctions', component: <DynamicTable activeTab={'previousAuctions'}/>},
                    {label: 'Auctions Requests', component: <DynamicTable activeTab={'auctionsRequests'}/>}
                ]}/>
            </div>

        </>
    )
}

export default AdminDashboard


