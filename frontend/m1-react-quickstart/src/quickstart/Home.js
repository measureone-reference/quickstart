import * as React from 'react';
import { Box, Container, MobileStepper, Paper, Divider } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
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
        <Container display="flex" maxWidth={"lg"} style={{ marginTop: "8em", justifyContent: "center", display: "flex", flexDirection: "column" }} >
            <Divider></Divider>
            <MobileStepper
                sx={{ width: '100%', backgroundColor: "#f5f5f5" }}
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={(activeStep === maxSteps - 1) || (enableNext == false)}
                    >
                        Next
                    </Button>
                }
            />
            <Divider></Divider>
            <Typography variant='h3' marginTop={3}>{steps[activeStep].label} </Typography>

            <Box sx={{ width: '100%', marginTop: "0.5em" }} color={"#898989"}>
                {steps[activeStep].description}
            </Box>

            <div style={{ marginTop: "3em" }}>
                {activeStep === 0 && <CreateIndividual setEnableNext={setEnableNext} setIndividual_id={setIndividual_id} />}
                {activeStep === 1 && <CreateDataRequest setEnableNext={setEnableNext} individual_id={individual_idRef.current} setDr_id={setDr_id} />}
                {activeStep === 2 && <LaunchLink setEnableNext={setEnableNext} datarequest_id={dr_idRef.current} />}
            </div>



        </Container >
    );
}




