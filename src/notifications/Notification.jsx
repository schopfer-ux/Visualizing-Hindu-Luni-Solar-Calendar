import React, { useState, useEffect } from 'react';
import { generateToken, messaging } from '../firebase';
import { onMessage } from 'firebase/messaging';

const Notification = ({ tithi }) => {
  const [hasPermission, setHasPermission] = useState(false);
  
  console.log("Notification Triggered")

  useEffect(() => {
    // Initialize Firebase Cloud Messaging and listen for messages
    const initFirebase = async () => {
      try {
        onMessage(messaging, (payload) => {
          console.log("Message received: ", payload);
        });
      } catch (error) {
        console.error("Error initializing Firebase Messaging: ", error);
      }
    };

    initFirebase();
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await generateToken();
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error("Error requesting notification permission: ", error);
    }
  };

  useEffect(() => {
    if (tithi && hasPermission) {
      triggerNotification(tithi);
    }
  }, [tithi, hasPermission]);

  const triggerNotification = (tithi) => {
    // Ensure that the service worker is ready before triggering notifications
    navigator.serviceWorker.ready
      .then((registration) => {
        if (registration.showNotification) {
          registration.showNotification('New Tithi in Effect', {
            body: `Current Tithi: ${tithi}`,
            icon: '/logo.svg', // Optional icon
          });
        } else {
          console.warn('showNotification is not supported');
        }
      })
      .catch((error) => {
        console.error("Error showing notification: ", error);
      });
  };

  return (
    <div>
      <button onClick={requestNotificationPermission}>
        Enable Notifications
      </button>
    </div>
  );
};

export default Notification;
