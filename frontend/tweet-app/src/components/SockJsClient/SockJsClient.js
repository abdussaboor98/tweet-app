import React, { useEffect } from 'react';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const SockJsClient = ({ url, headers, subscribeEndpoint, onMessage }) => {
  useEffect(() => {
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {
      // To stop debugging logs
    };
    stompClient.connect(headers, (frame) => {
      console.log('Connected');
      stompClient.subscribe(subscribeEndpoint, (message) => {
        onMessage(JSON.parse(message.body));
      });
    });
    return () => {
      stompClient.disconnect(() => {
        console.log('Disconnected');
      });
      socket.close();
    };
  }, []);
  return <div></div>;
};

export default SockJsClient;
