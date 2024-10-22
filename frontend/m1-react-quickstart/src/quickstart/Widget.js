import { AppBar, Button, Checkbox, Dialog, FormLabel, Grid, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useState from "react-usestateref";
import * as React from 'react';
import { MuiColorInput } from 'mui-color-input'
import WebhooksComponent from "./Webhooks";
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LaunchLink({ setEnableNext, datarequest_id }) {
    let widgetRef = React.useRef(null);
    let [eventsLog, setEventsLog, eventsLogRef] = useState([]);
    let [dsConnected, setDsConnected, dsConnectedRef] = useState({});
    let [itemsCreated, setItemsCreated, itemsCreatedRef] = useState({});
    let [primaryDarkColor, setPrimaryDarkColor, primaryDarkColorRef] = useState("#186793");
    let [primaryLightColor, setPrimaryLightColor, primaryLightColorRef] = useState("#2e9ccb");
    let [secondaryColor, setSecondaryColor, secondaryColorRef] = useState("#ffac00");
    let [isDark, setIsDark, isDarkRef] = useState(false);
    let [fontFamily, setFontFamily, fontFamilyRef] = useState("Open Sans, Sans Serif, sans-serif");
    let [fontURL, setFontURL, fontURLRef] = useState("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'");
    let [darkBackgroundColor, setDarkBackgroundColor, darkBackgroundColorRef] = useState("#186793");
    let [lightBackgroundColor, setLightBackgroundColor, lightBackgroundColorRef] = useState("#ffffff");
    let [lightTextColor, setLightTextColor, lightTextColorRef] = useState("#ffffff");
    let [darkTextColor, setDarkTextColor, darkTextColorRef] = useState("#343434");

    const widgetStyles = {
        primary_dark: primaryDarkColorRef.current,
        primary_light: primaryLightColorRef.current,
        secondary_color: secondaryColorRef.current,
        dark_background: darkBackgroundColorRef.current,
        light_background: lightBackgroundColorRef.current,
        light_text: lightTextColorRef.current,
        dark_text: darkTextColorRef.current,
        font_family: fontFamilyRef.current,
        font_url: fontURLRef.current,
        isDark: isDarkRef.current
    } 

    const config = {
        access_key: `${process.env.REACT_APP_ACCESS_KEY}`,
        host_name: `${process.env.REACT_APP_M1_HOSTNAME}`,
        datarequest_id: datarequest_id,
        branding: {
            styles: widgetStyles
        }
    }

    const formik = useFormik({
        initialValues: widgetStyles,
        onSubmit: values => {
            console.log(values);
        }
    });

    const componnenetDidMount = () => {
        console.log("Component did mount");
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrimaryColorChange = (color) => {
        setPrimaryDarkColor(color);
        formik.values.primary_dark = primaryDarkColorRef.current;

    }
    const handlePrimaryLightColorChange = (color) => {
        setPrimaryLightColor(color);
        formik.values.primary_light = primaryLightColorRef.current;
    }
    const handleSecondaryLightColorChange = (color) => {
        setSecondaryColor(color);
        formik.values.secondary_color = secondaryColorRef.current;
    }
    const handleDarkBackgroundColorChange = (color) => {
        setDarkBackgroundColor(color);
        formik.values.dark_background = darkBackgroundColorRef.current;
    }
    const handleLighBackgroundColorChange = (color) => {
        setLightBackgroundColor(color);
        formik.values.light_background = lightBackgroundColorRef.current
    }
    const handleLighTextColorChange = (color) => {
        setLightTextColor(color);
        formik.values.light_text = lightTextColorRef.current;

    }
    const handleDarTextColorChange = (color) => {
        setDarkTextColor(color);
        formik.values.dark_text = darkTextColorRef.current;
    }

    const handleIsDarkChange = (event) => {
        console.log("Is dark ", event.target.checked);
        setIsDark(event.target.checked);
        formik.values.isDark = isDarkRef.current
    }

    const onWidgetRefChange = React.useCallback(newWidgetRef => {

        const onDataSourceConnected = (event) => {
            console.log("Datasource connected", event.detail);
            setDsConnected(event.detail)
            setEventsLog([...eventsLogRef.current, event.detail]);
            handleClose();
        }

        const onConsentStatusChanged = (event) => {
            console.log("Consent status changed", event.detail);
            setEventsLog([...eventsLogRef.current, event.detail]);
        }


        const onTokenExpired = (event) => {
            console.log("Token expired ", event.detail);
            setEventsLog([...eventsLogRef.current, event.detail]);
        }

        const onItemsCreated = (event) => {
            const details = event.detail;
            console.log("Items created", details);
            setItemsCreated(details);
            setEventsLog([...eventsLogRef.current, details]);
            handleClose();
        }

        // if new ref is null , m1link has been unmounted , remove listeners of current ref
        if (newWidgetRef === null) { 
            if(widgetRef?.current){
                console.log("Removing event listeners");
                widgetRef?.current?.removeEventListener("datasourceConnected", onDataSourceConnected);
                widgetRef?.current?.removeEventListener("itemsCreated", onItemsCreated);
                widgetRef?.current?.removeEventListener("consentStatusChanged", onConsentStatusChanged);
                widgetRef?.current?.removeEventListener("tokenExpired", onTokenExpired);
            }


        } else {

             widgetRef.current = newWidgetRef;
                     
                console.log("Registering events");
                widgetRef?.current.addEventListener("datasourceConnected ", onDataSourceConnected);
                widgetRef?.current.addEventListener("itemsCreated", onItemsCreated);
                widgetRef?.current.addEventListener("consentStatusChanged", onConsentStatusChanged);
                widgetRef?.current.addEventListener("tokenExpired", onTokenExpired)
    
        }
      }, []); // adjust deps
    
    return (
        <React.Fragment>

            <Grid container spacing={2} marginTop={1}>
                <Grid item lg={12}>
                    <Checkbox value={formik.values.isDark} onChange={handleIsDarkChange} label="Enable Dark Mode">
                    </Checkbox>
                    <FormLabel>Enable Dark Mode</FormLabel>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Primary Dark Color" value={formik.values.primary_dark} onChange={handlePrimaryColorChange} ></MuiColorInput>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Primary Light Color" value={formik.values.primary_light} onChange={handlePrimaryLightColorChange}></MuiColorInput>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Dark Background Color" value={formik.values.dark_background} onChange={handleDarkBackgroundColorChange} ></MuiColorInput>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Light Background Color" value={formik.values.light_background} onChange={handleLighBackgroundColorChange}></MuiColorInput>
                </Grid>

                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Secondary Light Color" value={formik.values.secondary_color} onChange={handleSecondaryLightColorChange}></MuiColorInput>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Light Text Color" value={formik.values.light_text} onChange={handleLighTextColorChange} ></MuiColorInput>
                </Grid>
                <Grid item lg={3}>
                    <MuiColorInput format="hex" label="Dark Text Color" value={formik.values.dark_text} onChange={handleDarTextColorChange}></MuiColorInput>
                </Grid>
                <Grid item lg={12}>
                    <TextField type="text" label="Font Family" variant="outlined" fullWidth value={formik.values.font_family} ></TextField>
                </Grid>
                <Grid item lg={12}>
                    <TextField type="text" label="Font URL" placeholder="Font URL" variant="outlined" fullWidth value={formik.values.font_url} ></TextField>
                </Grid>

            </Grid>

            <Button variant="outlined" onClick={handleClickOpen} sx={{ marginTop: 4 }}>
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>


                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Launching MeasureOne Widget
                            <Typography variant="subtitle2">
                                The widget can also be launched without opening a Popup within your app
                            </Typography>
                        </Typography>
                       
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <HelmetProvider>
                    <Helmet>
                    <script src="https://api-stg.measureone.com/v3/js/m1-link-2021042000.js" />
                    </Helmet>
                </HelmetProvider>
                <Grid container style={{ marginLeft: "auto", marginRight: "auto" }}>

                    <Grid item lg={12} style={{ marginLeft: "auto", marginRight: "auto" }} >

                        <div sx={{ borderRadius: "5px", borderColor: "#EFEFEF" }} style={{ borderRadius: "5px", borderColor: "#EFEFEF", border: "solid thin #EFEFEF", boxShadow: "5px", width: "380px", marginLeft: "auto", marginRight: "auto", marginTop: "3em" }}>
                        <m1-link 
                                ref={onWidgetRefChange}
                                config={
                                    JSON.stringify({
                                        access_key: config.access_key,
                                        host_name: config.host_name,
                                        datarequest_id: config.datarequest_id,
                                        branding:config.branding,
                                    })}

                                
                            >
                            </m1-link>

                        </div>

                        <div style={{ marginTop: "3em"}}>
                            <WebhooksComponent />
                        </div>

                    </Grid>

                </Grid >
            </Dialog>

        </React.Fragment>


    )
}