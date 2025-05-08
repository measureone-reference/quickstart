import React, { useEffect, useState } from 'react';
import { Alert, IconButton, Tooltip, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReactJson from 'react-json-view';
import CopyIcon from '@mui/icons-material/FileCopy';
const WebhooksComponent = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const eventSource = new EventSource(`${process.env.REACT_APP_SERVER_URL}/webhooks/stream`);
    eventSource.onmessage = (event) => {

      setNotifications((prevNotifications) => [
        ...prevNotifications,
        event.data,
      ]);

    };
    return () => {
      eventSource.close();
    };
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert('Copied to clipboard!'),
      (err) => alert('Failed to copy: ', err)
    );
  };
  
  return (
    <div>

      {notifications.length > 0 && (
        <div>
          <Alert severity="success" sx={{ paddingTop: "1em" }}>
            <Typography variant='body2' fontWeight={"bold"}>Server-Sent Events (SSE) Notifications:</Typography>
          </Alert>

          {notifications.map((notification, index) => (

            <div key={index} style={{ marginBottom: "1em" }}>
              <Alert severity="success" sx={{ marginTop: "1em", '& .MuiAlert-message': { padding: 0 } }}>

                <Typography variant='body'>

                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <strong>{JSON.parse(notification).event}</strong>

                    <Tooltip title="Copy to clipboard">
                      <IconButton
                        sx={{
                          marginLeft: "8px",
                          fontSize: '18px',
                          color: 'inherit',
                        }}
                        onClick={() => copyToClipboard(JSON.stringify(JSON.parse(notification)))}
                      >
                        <CopyIcon sx={{ fontSize: 'inherit' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Typography>

                <Typography key={index} variant='body'>
                  <ReactJson src={JSON.parse(notification)} enableClipboard={false} collapsed={false} />
                </Typography>

              </Alert>
              <hr />
            </div>

          ))}
        </div>
      )}
    </div>
  );
};
export default WebhooksComponent;