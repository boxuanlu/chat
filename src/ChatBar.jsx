import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
  }

  onEnterMessage = (e) => {
    let chatMessage = e.target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(chatMessage);
      this.props.onEnterMessage(chatMessage);
      e.target.value = '';
    }
  }

  onEnterName = (e) => {
    if (e.target.value !== this.userName) {
      this.props.onEnterName(e.target.value);
      this.userName = e.target.value;
    }
  }

  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.name}
          onBlur={this.onEnterName}
        />
        <input
          className="chatbar-message"
          name="chatMessage"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onEnterMessage}
        />
      </footer>
    );
  }
}
export default Chatbar;
