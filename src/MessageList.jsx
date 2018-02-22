import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
      let picture = [];
      let textMessage = message.content;
        if (message.content.match(/.(jpg|png|gif)/)) {
          const joinMess = [];
          const splitMess = message.content.split(" ");
          for (let word of splitMess) {
            if (word.match(/.(jpg|png|gif)$/)) {
              picture.push(word);
            } else {
              joinMess.push(word);
            } textMessage = joinMess.join(" ");
          }

        }
        return (
          <div key={message.id} className="message">
            <span className="message-username" style={{color: message.color}} >{message.username}</span>
            <span className="message-content" >{textMessage}<img src={picture} /></span>
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
