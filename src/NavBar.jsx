import React, { Component } from 'react';
class NavBar extends Component {
  render() {
    const count = this.props.count;
    console.log('Rendering <NavBar/>');
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-count">{count} users online</div>
      </nav>);
  }
}
export default NavBar;


