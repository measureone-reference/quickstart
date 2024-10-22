import React from 'react';
import { Alert, Button, Grid, ListSubheader, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useState from 'react-usestateref' // see this line
import axios from 'axios';
import ReactJson from 'react-json-view'

export default function CreateDataRequest({ setEnableNext, setDr_id, individual_id, setActiveStep }) {
    let [disabled, setDisabled, disabledRef] = useState(true);
    let [displaySuccess, setDisplaySuccess] = useState("none");
    let [displayError, setDisplayError] = useState("none");
    let [selectedDR, setSelectedDR, selectedDRRef] = useState("0");
    let [datarequestJSON, setDataRequestJSON, datarequestJSONRef] = useState({});
    let [displayResponse, setDisplayResponse, displayResponseRef] = useState("none");

    const formik = useFormik({

        initialValues: {
            drType: "0"
        },
        validationSchema: yup.object().shape({
            drType: yup.string().required("Data Request type is required!")
        }),
        validateForm: (values) => {
            if (values.drType != 0) {
                setDisabled(false)
                return true;
            } else {
                setDisabled(true);
                return false;
            }
        },

    });

    const buttonClicked = async () => {
        setDisabled(true);
        if (formik.isValid) {
            let response = await createAndGetDataRequest({
                "individual_id": individual_id,
                "type": formik.values.drType
            });
            setDataRequestJSON(response.data);
            setDisplayResponse("block");
            formik.resetForm();
            setDisabled(true)
            setDr_id(response.data.id);
            setDisplaySuccess("block")
            setActiveStep(2);
        }
    };

    const onChange = (event) => {
        setDisplayError("none");
        setDisplaySuccess("none");
        setSelectedDR(event.target.value);
        setDisplayResponse("none");
        setDisabled(true)
        if (selectedDRRef.current != 0) {
            setDisabled(false);
        }
        formik.setFieldValue("drType", selectedDRRef.current);
    }

    return (
        <div>
            <form id="drform" >

                <Grid container spacing={3} style={{ marginTop: "", display: "flex", direction: "column" }} >
                    <Grid item lg={12}>
                        <Grid item display={displaySuccess} lg={12}>
                            <Alert severity="success" style={{ marginTop: "1em" }}>Data Request created Successfully. Click NEXT</Alert>
                        </Grid>

                        <Grid item display={displayError} lg={12}>
                            <Alert severity="error" style={{ marginTop: "1em" }}>Could not create Data Request. Please try again later</Alert>
                        </Grid>
                        <Grid item display={displaySuccess} lg={12}>
                            <Alert severity="info" style={{ marginTop: "1em" }}>To view more properties of Data Request, clicke here</Alert>
                        </Grid>
                        
                    </Grid>
                    <Grid item lg={6}>
                        
                        <Select id="drType" name="drType" variant="outlined" onChange={onChange} value={formik.values.drType}
                            placeholder='Select' required lg={12} sx={{ minWidth: "16rem" }}>

                            <MenuItem value="0" >Select Data Request Type</MenuItem>
                            <ListSubheader sx={{ fontWeight: "bold", backgroundColor: "#EFEFEF" }}>INSURANCE</ListSubheader>
                            <MenuItem value="AUTO_INSURANCE_DETAILS">Auto Insurance Details</MenuItem>
                            <MenuItem value="HOME_INSURANCE_DETAILS">Home Insurance Details</MenuItem>
                            <ListSubheader sx={{ fontWeight: "bold", backgroundColor: "#EFEFEF" }}>EDUCATION</ListSubheader>
                            <MenuItem value="ACADEMIC_SUMMARY">Academic Summary</MenuItem>
                            <MenuItem value="ENROLLMENT_STATUS">Enrollment Status</MenuItem>
                            <ListSubheader sx={{ fontWeight: "bold", backgroundColor: "#EFEFEF" }}>INCOME & EMPLOYMENT</ListSubheader>
                            <MenuItem value="EMPLOYMENT_SUMMARY">Employment Summary</MenuItem>
                            <MenuItem value="INCOME_SUMMARY">Income Summary</MenuItem>
                            <MenuItem value="INCOME_EMPLOYMENT_DETAILS">VOIE - Income & Employment Details</MenuItem>
                            <ListSubheader sx={{ fontWeight: "bold", backgroundColor: "#EFEFEF" }}>TAX PREPERATION</ListSubheader>
                            <MenuItem value="REALIZED_GAINS">1099-B Realized Gains</MenuItem>

                        </Select>
                        <Grid item lg={12} marginTop={"3em"}>
                            <Button type="button" size='large' variant='outlined' color="primary" disabled={disabled} onClick={buttonClicked} >Create Data Request</Button>
                        </Grid>
                    </Grid>
                    <Grid item lg={6} display={displayResponse}>
                        <ReactJson src={datarequestJSONRef.current} />
                    </Grid>


                </Grid>

            </form>
        </div>
    )
}

async function createAndGetDataRequest(values) {
    let response = await axios.post('/api/datarequests/new', values, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response;
}
