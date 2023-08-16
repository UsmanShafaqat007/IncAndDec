import React, {useEffect} from 'react';
import HeaderContent from "../components/HeaderContent";
import EmailSubscription from '../components/EmailSubscription'
import Footer from '../components/Footer'
import {Grid} from '@mui/material';
import PreviousAuctionsComponent from "../components/PreviousAuctionsComponent";
import CopyrightSection from "../components/CopyrightSection";
import NavbarWrapper from '../components/Bars/NavbarWrapper';

function PreviousAuctions() {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <NavbarWrapper />
            <div style={{background: "url(/prev_main.png)", backgroundSize: "cover"}}>
                
                <HeaderContent
                    title={'Previous Auctions'}
                    description={''}/>
            </div>
            <Grid container spacing={2}>
                <Grid item md={2}/>
                <Grid item xs={12} md={8}>
                    <PreviousAuctionsComponent offset={6}/>
                </Grid>
                <Grid item md={2}/>
            </Grid>
            <EmailSubscription/>
            <Footer />
            <CopyrightSection/>
        </>
    )
}

export default PreviousAuctions


