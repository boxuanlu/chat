import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: "",
    };
  }
// connected to the server
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('open', (e) => {
      console.log("Connected to Server");
    });
    this.socket.onmessage = (event) => {
      let incomingMessage = JSON.parse(event.data);
      if (!incomingMessage.type) {
        this.setState({count: incomingMessage})
      } else {
        this.setState({ messages: this.state.messages.concat(incomingMessage) })
    }
    }
  }

  // set up a newmessage box for user chat each other;
  onEnterMessage = (messageEntered) => {
    const newMessage = {
      type: "user",
    username: this.state.currentUser.name,
    content: messageEntered
  };
    const messages = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(newMessage));
  }

// on entername function is to help user change their name and the server know it's a system message;
  onEnterName = (nameEntered) => {
    const newUser = nameEntered;
    const contentMessage = this.state.currentUser.name + " has changed their name to " + newUser;
    const newUserUpdate = {
      type: "system",
    content: contentMessage
  };
    this.state.currentUser.name = newUser;
    this.socket.send(JSON.stringify(newUserUpdate));
  }

  render() {
    return (
      <div>
        <NavBar count={this.state.count}/>
        <MessageList messages={this.state.messages} />
        <Chatbar name={"Anonymous"} onEnterName={this.onEnterName} onEnterMessage={this.onEnterMessage}/>
      </div>
    );
  }
}

export default App;
