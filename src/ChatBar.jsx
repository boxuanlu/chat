import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
  }

    onEnterName = (nameEntered) => {
    if (nameEntered.target.value !== this.userName) {
      this.props.onEnterName(nameEntered.target.value);
      this.userName = nameEntered.target.value;
    }
  }

  onEnterMessage = (messageEntered) => {
    let chatMessage = messageEntered.target.value;
    if (messageEntered.key === 'Enter') {
      this.props.onEnterMessage(chatMessage);
      messageEntered.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
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
