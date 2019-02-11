import React from 'react';
import axios from 'axios';

class Messages extends React.Component {

  state = {
    messages: []
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }


  componentDidMount(){
    axios.get('https://localhost:44389/api/values/getMessage')
    .then(res => {
        const messages = res.data;
        this.setState({ messages});
        console.log(this.state.messages);
    })
  }

  render() {
    const messages = this.state.messages.map((message)=> {
      return(

        <div className='listOfMessages'>
            <div className='Mail'>
              { this.props.Mail }
            </div>
            <div className='message-body'>
              {message.message1 }
            </div>
      </div>);
      
    });
    return (
      <div className='messages' id='messageList'>
         {messages}
        </div>
    );
  }
}

export default Messages;
