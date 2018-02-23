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
    this.messageinput = this.messageinput.bind(this);
    this.changeName = this.changeName.bind(this);
  }
// connected to the server
componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001");

  this.socket.onopen = (event) => {
    console.log("Connected to server");
  };

  this.socket.onmessage = (event) => {
    console.log(event);
    // The socket event data is encoded as a JSON string.
    // This line turns it into an object
    const data = JSON.parse(event.data);
    switch(data.type) {
      case "user":
        this.setState({ messages: this.state.messages.concat(data)});
        break;
      case "system":
        this.setState({ messages: this.state.messages.concat(data)});
        break;
      default:
        this.setState({count: data});
        //
    }
  };
}
// set up a newmessage object to connect with server
  messageinput(messageEntered){
    const newMessage = {
      type: "user",
    username: this.state.currentUser.name,
    content: messageEntered
  };
    this.socket.send(JSON.stringify(newMessage));
  }

// on entername function is to help user change their name and the server know it's a system message;
  changeName(nameEntered){
    console.log(nameEntered);
    if (nameEntered === "") {
      console.log("sdasad");
      nameEntered = "Anonymous";
    };
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
        <Chatbar name={this.state.currentUser.name} changeName={this.changeName} messageinput={this.messageinput}/>
      </div>
    );
  }
}

export default App;
