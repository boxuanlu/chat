import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
  }
// user change their name
    changeName = (nameEntered) => {
    if (nameEntered.target.value !== this.userName) {
      this.props.changeName(nameEntered.target.value);
      this.userName = nameEntered.target.value;
    }
  }
// message set up
  messageinput = (messageEntered) => {
    let chatMessage = messageEntered.target.value;
    if (messageEntered.key === 'Enter') {
      this.props.messageinput(chatMessage);
      messageEntered.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          placeholder="Your Name (Optional)"
          onBlur={this.changeName} // here to use onBlur make the name change easier to use.(no need for hit enter every time)
        />
        <input
          className="chatbar-message"
          name="chatMessage"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.messageinput}
        />
      </footer>
    );
  }
}
export default Chatbar;
