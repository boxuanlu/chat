import React, {Component} from 'react';


class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.message.user}</span>
        <span className="message-content">{this.props.message.text}</span>
      </div>
    );
  }
}

export default Message;
