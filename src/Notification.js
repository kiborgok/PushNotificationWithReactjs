import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";

const Notification = () => {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken().then((res) => {
    console.log(res);
  });

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification({ title: payload.data.title, body: payload.data.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default Notification;
