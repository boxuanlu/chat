import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
        let textMessage = message.content;
        return (
          <div key={message.id} className="message">
            <span className="message-username" style={{color: message.color}} >{message.username}</span>
            <span className="message-content" >{textMessage}</span>
          </div>
        );
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className="message system">
             {message.content}
          </div>
        );
      }
    });
    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}
export default MessageList;
