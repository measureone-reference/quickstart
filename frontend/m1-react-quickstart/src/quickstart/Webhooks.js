import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReactJson from 'react-json-view';

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
  return (
    <div>

      {notifications.length > 0 && (
        <div>
          <Alert severity="success" sx={{ paddingTop: "1em" }}>
            <Typography variant='body2' fontWeight={"bold"}>Server-Sent Events (SSE) Notifications:</Typography>
          </Alert>

          {notifications.map((notification, index) => (

            <div key={index} style={{ marginBottom: "1em" }}>
              <Alert severity="success" sx={{ marginTop: "1em" }}>

                <Typography variant='body'>
                  <strong>{JSON.parse(notification).event}</strong>
                </Typography>

                <Typography key={index} variant='body'>
                  <ReactJson src={JSON.parse(notification)} collapsed={false} />
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