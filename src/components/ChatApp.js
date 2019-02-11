
import Messages from './Messages';
import ChatInput from './ChatInput';
import React from 'react';
import './ChatApp.css';
import { PostData } from '../services/PostData';

class ChatApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
  }

  sendHandler(message)
  {
    const messageObject = {
      idSender: 1,
      idReceiver:2,
      message1: message,
      date: new Date().toLocaleString(),
      file:'',
      idGroup:null
    }
    this.addMessage(messageObject);
  }

  //getUserId() {
   // var jwtDecode = require('jwt-decode');
    //const token = sessionStorage.getItem("token");
    //var userId = jwtDecode(token).user.idSender;
   // console.log(userId);
   // return userId;
 // }

  addMessage(message) 
  {
    PostData('api/values/sendMessage', message)
  }
  
  render() {
    return (
      <div className="container" >
        <h3>Chat</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  Mail: 'Anonymous'
};

export default ChatApp;
