var React = require('react');
var DescriptionStore = require('../stores/DescriptionStore');

var Description = React.createClass({
	getInitialState: function(){
		return{
			data:{
				mname:null,
				description:null,
				iframe:""
			}
		};
	},
	componentWillMount: function(){
		DescriptionStore.addChangeListner(this._loadDescription)
	},

	_loadDescription: function(){
		var data = DescriptionStore.getDescriptionData();
		this.setState({data:data});
	},

	render: function(){
		// var description=[];
		
		// 	description.push(
		// 		<div className="description">
		// 			<h1 className="section-title">{this.state.data.mname}</h1>
		// 			<p>{this.state.data.description}</p>
		// 			<iframe height='350' scrolling='no' src={""+this.state.data.iframe} frameborder='no' allowtransparency='true' allowfullscreen='true' style={{width: '100%'}}>
		// 			See the Pen 
		// 			</iframe>
		// 		</div>
		// 	);
		
		
		//  description.push(<div className="description"></div>)
	
		return(			
			<div className="description">
				<h1 className="section-title">{this.state.data.mname}</h1>
				<p className="description-text">{this.state.data.description}</p>
				<iframe height='800' scrolling='no' src={""+this.state.data.iframe} frameborder='no' allowtransparency='true' allowfullscreen='true' style={{width: '100%'}}>
				See the Pen 
				</iframe>
			</div>
		)
	}
});

module.exports = Description;