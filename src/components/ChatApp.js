import Messages from './Messages';
import ChatInput from './ChatInput';
import React from 'react';
import './ChatApp.css';
import * as jwt from 'jwt-decode';
import axios from 'axios';

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
    let groupId = this.props.match.params.group;
    let userId = this.props.match.params.user;
    message.idSender = userId;
    message.idGroup = groupId;
    
    axios.post("https://localhost:44389/api/values/sendMessage", message)
            .then(res => {});
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