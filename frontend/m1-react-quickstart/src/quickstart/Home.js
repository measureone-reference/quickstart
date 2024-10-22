import * as React from 'react';
import { Container, Divider, StepContent, Alert } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import CreateIndividual from './Individual';
import CreateDataRequest from './DataRequest';
import LaunchLink from './Widget';
import useState from 'react-usestateref';

const steps = [
    {
        label: 'Step 1: Create Individual',
        description: `The Individual is a core resource that represents your user. At the start of the workflow an Individual representing the user must be created. Retrieved Items are associated with the Individual. Almost all Service APIs take the Individual ID as a reference.`,

    },
    {
        label: 'Step 2: Create Data Request',
        description:
            'A consumer-permissioned data workflow is initiated and defined by the Data Request resource. A Data Request specifies or bind together the various elements of a consumer-permissioned data workflow, in particular: the Individual, the type of data requested, the reports to be generated, the Link experience, optional Individual communication and messaging. The consumer experience powered by MeasureOne Link is specified by the required datarequest_id. MeasureOne supports multiple types of data requests catering to different use cases. All services accept datarequest_id as a reference.',
    },
    {
        label: 'Step 3: Launch the Consumer Flow using M1-LINK Widget',
        description: `MeasureOne Link is a front-end component that provides you all the capabilities necessary to initiate the the consumer-permissioning workflow for your users. It enables your users to permit your application to access their data in a consumer-permissioned manner.
                        Link handles the consent, the data source identification, the credential collection, and the integration with the MeasureOne platform to access and acquire the consumer-permissioned data. It handles a variety of authentication mechanisms including multi-factor authentication and offers various configuration options to tailor the UI to your application.

                        As an alternative to the embedded widget, MeasureOne supports hosted solutions of Link, providing no-code options for your integrations. Please login to the Dashboard for more details.`,
    },
];
export default function Home() {

    const [activeStep, setActiveStep, activeStepRef] = useState(0);
    let [enableNext, setEnableNext, enableNextRef] = useState(false);
    let [individual_id, setIndividual_id, individual_idRef] = useState("");
    let [dr_id, setDr_id, dr_idRef] = useState("");
    const maxSteps = steps.length;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (

        <Container display="flex" maxWidth={"xl"} style={{ marginTop: "8em", justifyContent: "center", display: "flex", flexDirection: "column" }} >
            <Typography variant='h2'>
                Integrating MeasureOne
            </Typography>
            <Divider></Divider>
            <Stepper
                sx={{ width: '100%', backgroundColor: "#f5f5f5" }}
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}

            />
            <Divider></Divider>
            <Stepper orientation='vertical' activeStep={activeStep}>

                <Step sx={{ paddingTop: "3em" }} >
                    <StepLabel>
                        <Typography variant='body2' fontWeight={"bold"}>
                            {steps[0].label}
                        </Typography>
                        <Typography variant='subtitle2' color={"#808080"} >
                            {steps[0].description}
                        </Typography>

                        <Alert severity="success" sx={{ display: individual_idRef.current != "" ? "block" : "none", paddingTop: "1em" }}>
                            <Typography variant='body2' fontWeight={"bold"}>Individual Created. ID: {individual_idRef.current}</Typography>
                            <Typography variant='body'>To view more properties of an Individual, click <a href="#">here</a></Typography>
                        </Alert>

                    </StepLabel>
                    <StepContent>
                        <CreateIndividual setEnableNext={setEnableNext} setIndividual_id={setIndividual_id} setActiveStep={setActiveStep} />
                    </StepContent>
                </Step>
                <Step >
                    <StepLabel>

                        <Typography variant='body2' fontWeight={"bold"}>
                            {/* {steps[1].label} {individual_idRef.current != "" ? `for Individual ID: ${individual_idRef.current}` : ""} */}
                        </Typography>
                        <Typography variant='subtitle2' color={"#808080"} >
                            {steps[1].description}
                        </Typography>

                        <Alert severity="success" sx={{ display: dr_idRef.current != "" ? "block" : "none", paddingTop: "1em" }}>
                            <Typography variant='body2' fontWeight={"bold"}>Data Request Created. ID: {dr_idRef.current}</Typography>
                            <Typography variant='body'>To view more properties of the Data Request, click <a href="#">here</a></Typography>
                        </Alert>

                    </StepLabel>
                    <StepContent>

                        <CreateDataRequest setEnableNext={setEnableNext} individual_id={individual_idRef.current} setDr_id={setDr_id} setActiveStep={setActiveStep} />

                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>
                        <Typography variant='body2' fontWeight={"bold"}>
                            {steps[2].label}
                        </Typography>
                        <Typography variant='subtitle2' color={"#808080"} >
                            {steps[2].description}
                        </Typography>
                    </StepLabel>
                    <StepContent sx={{ marginTop: "2em" }}>
                        <Typography variant='button' color={"#343434"} fontWeight={"bold"}>
                            Customize your widget before launch
                        </Typography>

                        <LaunchLink setEnableNext={setEnableNext} datarequest_id={dr_idRef.current} />

                    </StepContent>
                </Step>

            </Stepper >

        </Container >
    );
}




