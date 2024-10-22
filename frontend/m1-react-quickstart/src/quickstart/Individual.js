import React, { useEffect } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useState from 'react-usestateref';
import axios from 'axios';
import ReactJson from 'react-json-view'

const validationSchema = yup.object({
    first_name: yup
        .string('Enter your first name')

        .required('First name is required'),
    last_name: yup
        .string('Enter your last name')

        .required('Last name is required'),
    email: yup.string("Valid email is required").email("Invalid email").required("Email is required")
});

export default function CreateIndividual({ setEnableNext, setIndividual_id, setActiveStep }) {
    let [disabled, setDisabled, disabledRef] = useState(true);
    let [displaySuccess, setDisplaySuccess, displaySuccessRef] = useState("none");
    let [displayError, setDisplayError, displayErrorRef] = useState("none");
    let [individualJson, setIndividualJson, individualJsonRef] = useState({first_name:"", last_name:"", email:"", external_id:""});
    let [displayResponse, setDisplayResponse, displayResponseRef] = useState("none");


    const formik = useFormik({
        initialValues: { first_name: "", last_name: "", email: "", external_id: "" },
        validationSchema: validationSchema,
        validate: (values) => {
            setDisabled(true);
            setEnableNext(false);
            if (formik.isValid) {
                setDisabled(false)
            }
        }
    });

    const buttonClicked = async () => {

        if (formik.isValid) {

            setDisplaySuccess("none")
            setDisplayResponse("none")
            setDisabled(true);
            let response = await createAndGetIndividual(formik.values);
            // setIndividualJson(response.data);
            setIndividual_id(response.data.id);
            setDisabled(false);
 
            setDisplaySuccess("block")
            setDisplayResponse("block")

            setActiveStep(1);
        }
    };

    return (
        <div >

            <form   >
                <Grid container spacing={1} style={{ display: "flex", direction: "column" }} >
                    <Grid item lg={12}>
                        <Grid item display={displaySuccess} lg={12}>
                        </Grid>
                        <Grid item display={displaySuccess} lg={12}>
                            <Alert severity="success" style={{ marginTop: "1em" }}>Individual created Successfully. Click NEXT to proceed</Alert>
                        </Grid>
                        <Grid item display={displayError} lg={12}>
                            <Alert severity="success" style={{ marginTop: "1em" }}>Individual created Successfully. Click NEXT button below to proceed</Alert>
                        </Grid>

                    </Grid>
                    <Grid item lg={6}>
                        <Grid container spacing={2}>
                            <Grid item lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    label="First Name"
                                    placeholder='Enter first name'
                                    value={formik.values.first_name}
                                    onBeforeInput={formik.handleBeforeInput}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyUp={formik.handleKeyUp}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    placeholder='Enter last name'
                                    type="text"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formik.values.email }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    id="external_id"
                                    name="external_id"
                                    label="Your user ID (Optional)"
                                    placeholder='This is the ID you will use to identify the Individual uniquely in your system'
                                    type={formik.values.external_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.external_id && Boolean(formik.errors.external_id)}
                                    helperText={formik.touched.external_id && formik.errors.external_id}
                                />
                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid item lg={6} display={displayResponse}>
                        <ReactJson src={individualJsonRef.current} />
                    </Grid>



                    <Grid item lg={12} >
                        <div style={{ marginTop: "1em", width: "100%" }}>
                            <Button type="button" size='large' variant='outlined' color="primary" disabled={disabled} onClick={buttonClicked} >CREATE INDIVIDUAL</Button>

                        </div>

                    </Grid>
                </Grid>
            </form>
        </div >
    );

}

async function createAndGetIndividual(values) {
    let response = await axios.post('/api/individuals/new', values, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response;
}