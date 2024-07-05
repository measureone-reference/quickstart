import React, { useEffect, useState } from 'react';

const WebhooksComponent = () => {
  const [notification, setNotification] = useState('');
  useEffect(() => {
    const eventSource = new EventSource('/api/webhooks/stream');
    eventSource.onmessage = (event) => {
      setNotification(event.data);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      <h2>Server-Sent Events (SSE) Notifications:</h2>
      <p>{notification}</p>
    </div>
  );
};
export default WebhooksComponent;