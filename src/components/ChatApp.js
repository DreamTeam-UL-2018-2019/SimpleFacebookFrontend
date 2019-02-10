
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

  sendHandler(message) {
    const messageObject = {
      id:0,
      idSender:0,
      idReceiver:0,
      message1: message,
      date: new Date().toLocaleString(),
      file:'',
      idGroup:0
    }
    this.addMessage(messageObject);
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    PostData('api/values/sendMessage', message)
  }

  comeBack(){
    window.location = '/home';
}

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        
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
