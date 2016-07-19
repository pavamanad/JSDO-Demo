/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">                 
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img className="logo-img" src="/static/images/logo.png" /> 
            </a>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;