var React = require('react');
var AsideStore = require('../stores/AsideStore');
var AsideAction = require('../actions/AsideTriggeredActions');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var SubMenuItem = React.createClass({
	_loadDescription: function(){
		AsideAction.LoadDescription(this.props.data);
	},
	componentDidMount: function(){
		if(location.pathname == "/"+(this.props.cname).split(" ").join('')+"/"+(this.props.data.mname).split(" ").join('')){
			setTimeout(function(){this._loadDescription();}.bind(this), 0);
			
		}
	},
	render: function(){
		return(
			<li onClick={this._loadDescription}>
		 		<Link 
		 		to={"/"+(this.props.cname).split(" ").join('')+"/"+(this.props.data.mname).split(" ").join('')} 
		 		className="level-2" 
		 		activeClassName="selected"
		 		>
		 			{this.props.data.mname}
		 		</Link>
			</li>
		);
	}
});


var MenuItem =  React.createClass({
render: function(){
		var subMenuItems = [];
		this.props.subMenuItems.forEach(function(subMenuItem){
			subMenuItems.push(<SubMenuItem cname={this.props.cname} data={subMenuItem} key={subMenuItem.mname} />);
		}.bind(this));
		return(
			<li>
				<span className = "level-1">
					<i className="fa fa-chevron-right" aria-hidden="true"></i>
					{this.props.cname}
				</span>
				<ul>
					{subMenuItems}
				</ul>
			</li>
		)
	}
});


var Aside = React.createClass({
	getInitialState: function(){
		return{};
	},
	componentWillMount: function(){
		AsideStore.addChangeListner(this._loadAside)
	},
	componentDidMount: function(){

	},

	_loadAside: function(){
		var data = AsideStore.getAsideData();
		this.setState({data:data});
	},

	render: function(){
		var menuItems = [];
		if(this.state.data != undefined){
			this.state.data.forEach(function(menuItem){
				menuItems.push(<MenuItem cname={menuItem.cname} subMenuItems={menuItem.methods} key={menuItem.cname} />)
			});
		}
		return(
			<aside className="aside">
				<h3 className="section-title">Table of content</h3>
				<ul>
					{menuItems}
					
				</ul>
			</aside>
		);
	}
});

module.exports = Aside;