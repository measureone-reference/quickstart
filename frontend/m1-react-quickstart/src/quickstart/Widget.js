import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import { Helmet } from "react-helmet"
import React, { useEffect, useRef } from "react"
import useState from "react-usestateref";

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ReactJson from "react-json-view";
import { MuiColorInput } from 'mui-color-input'
import WebhooksComponent from "./Webhooks";


export default function LaunchLink({ setEnableNext, datarequest_id }) {


    let [eventsLog, setEventsLog, eventsLogRef] = useState([]);

    let [dsConnected, setDsConnected, dsConnectedRef] = useState({});
    let [itemsCreated, setItemsCreated, itemsCreatedRef] = useState({});
    let [primaryDarkColor, setPrimaryDarkColor, primaryDarkColorRef] = useState("#186793");
    let [primaryLightColor, setPrimaryLightColor, primaryLightColorRef] = useState("#2e9ccb");
    let [secondaryColor, setSecondaryColor, secondaryColorRef] = useState("#ffac00");
    let [isDark, setIsDark, isDarkRef] = useState(false);

    const config = {
        access_key: "a2cf19d1-1182-4600-9ed1-ea312473bc36",
        host_name: "api-stg.measureone.com",
        datarequest_id: datarequest_id,
        branding: {
            styles : {

            }
        }
    }

    const widgetRef = useRef(null);
    useEffect(() => {
        if (!widgetRef.current) return;

        const onDataSourceConnected = (event) => {
            setDsConnected(event.detail)
            setEventsLog([...eventsLogRef.current, event.detail]);
        }

        const onConsentStatusChanged = (event) => {
            console.log("Consent status changed", event.detail);
            setEventsLog([...eventsLogRef.current, event.detail]);
        }


        const onTokenExpired = (event) => {
            console.log("Token expired", event.detail);
            setEventsLog([...eventsLogRef.current, event.detail]);
        }
        
        const onItemsCreated = (event) => {
            const details = event.detail;
            console.log("Items created", details);
            setItemsCreated(details);
            setEventsLog([...eventsLogRef.current, details]);
        }

        widgetRef.current.addEventListener("datasourceConnected", onDataSourceConnected);
        widgetRef.current.addEventListener("itemsCreated", onItemsCreated);
        widgetRef.current.addEventListener("consentStatusChanged", onConsentStatusChanged);
        widgetRef.current.addEventListener("tokenExpired", onTokenExpired);


        return () => {
            widgetRef?.current?.removeEventListener("datasourceConnected", onDataSourceConnected);
            widgetRef?.current?.removeEventListener("itemsCreated", onItemsCreated);
            widgetRef?.current?.removeEventListener("consentStatusChanged", onConsentStatusChanged);
            widgetRef?.current?.removeEventListener("tokenExpired", onTokenExpired);

        }

    }, []);

    return (
        <Grid container >
            <Helmet>
                <script src="https://api-stg.measureone.com/v3/js/m1-link-2021042000.js" />
            </Helmet>
            <Grid item lg={6}>
                <div sx={{ borderRadius: "5px", borderColor: "#EFEFEF" }} style={{ borderRadius: "5px", borderColor: "#EFEFEF", border: "solid thin #EFEFEF", boxShadow: "5px", width: "380px" }}>
                    <m1-link

                        config={
                            JSON.stringify({
                                access_key: config.access_key,
                                host_name: config.host_name,
                                datarequest_id: config.datarequest_id,
                                branding: {
                                    styles: {
                                        isDark: true
                                    }
                                }
                            })}
                        ref={widgetRef}>

                    </m1-link>
                </div>
            </Grid>
            <Grid item lg={6} >
                <Grid container spacing={3} lg={12}>
                    <Grid item lg={12}>
                        <MuiColorInput format="hex" label="Primary Dark Color" value={primaryDarkColorRef.current}></MuiColorInput>
                    </Grid>
                    <Grid item lg={12}>
                        <MuiColorInput format="hex" label="Primary Light Color" value={primaryLightColorRef.current}></MuiColorInput>
                    </Grid>
                    <Grid item lg={12}>
                        <MuiColorInput format="hex" label="Secondary Color" value={secondaryColorRef.current}></MuiColorInput>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6}>
                <h4>Frontend Events</h4>
                {eventsLog.map((event, index) => {
                    return <MuiAccordion>
                        <MuiAccordionSummary>Event name: {event.name}</MuiAccordionSummary>
                        <MuiAccordionDetails>
                            <ReactJson src={event}> </ReactJson>
                        </MuiAccordionDetails>
                    </MuiAccordion>
                })}a
            </Grid>
            <Grid item lg={6}>
                <WebhooksComponent></WebhooksComponent>
            </Grid>
        </Grid >

    )
}