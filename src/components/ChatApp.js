
import Messages from './Messages';
import ChatInput from './ChatInput';
import React from 'react';
import './ChatApp.css';
import { PostData } from '../services/PostData';
import * as jwt from 'jwt-decode';

class ChatApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
  }

  messagesEnd = React.createRef()

  sendHandler(message)
  {
    const messageObject = {
      idSender: this.getUserId,
      idReceiver:2,
      message1: message,
      date: new Date().toLocaleString(),
      file:'',
      idGroup:null
    }
    this.addMessage(messageObject);
  }

  getUserId() {
    const token = sessionStorage.getItem("token");
    var userId = jwt(token).user.idSender;
    console.log(userId);
    return userId;
  }

  componentDidMount(){
    this.scrollToBottom();
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth'})
  }

  addMessage(message) 
  {
    PostData('api/values/sendMessage', message)
  }
  
  render() {
    return (
      <div className="container" >
        <h3>Chat</h3>
        <div className="container" ref={this.messagesEnd}>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
        </div>
      </div>
    );
  }

}
ChatApp.defaultProps = {
  Mail: 'Anonymous'
};

export default ChatApp;
