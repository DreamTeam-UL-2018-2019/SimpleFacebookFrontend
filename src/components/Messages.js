import React from 'react';
import axios from 'axios';

class Messages extends React.Component {

  state = {
    messages: []
  }
  
  componentDidUpdate() {
    axios.get('https://localhost:44389/api/values/getMessage')
    .then(res => {
        const messages = res.data;
        this.setState({ messages});
    })
  }

  componentDidMount(){
    axios.get('https://localhost:44389/api/values/getMessage')
    .then(res => {
        const messages = res.data;
        this.setState({ messages});
    })
  }

  render() {
    const messages = this.state.messages.map((message)=> {
      return(
        <div className='listOfMessages' >
            <div className='Mail'>
              { this.props.Mail }
            </div>
            <div className='message-body'>
              {message.message1 }
            </div>
      </div>);
    });
    return (
      <div className='messages' >
          {messages}
        </div>
    );
  }
}

export default Messages;
