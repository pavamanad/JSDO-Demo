var React = require('react');
var DescriptionStore = require('../stores/DescriptionStore');
var Codemirror = require('react-codemirror');
var Editor = require('./Editor');
require('../../../../node_modules/react-codemirror/node_modules/codemirror/mode/javascript/javascript');

var Description = React.createClass({
	getInitialState: function(){
		return{
			data:{
				mname:null,
				description:null,
				iframe:""
			},
			code:"(function(window,$,progress,undefined){\n\tvar serviceURI = 'http://oemobiledemo.progress.com/CustomerService'; \n\tvar catalogURI = 'http://oemobiledemo.progress.com/CustomerService/static/mobile/CustomerService.json';\n\t/**establishing session**/\n\t  session = new progress.data.Session();\n\t  session.login(serviceURI, '', '');\n\t  session.addCatalog(catalogURI);\n\t$('.js-read').on('click', function(){\n\t    /**fetching first 10 items **/  \n\t  jsdo = new progress.data.JSDO({ name: 'Customer' });\n\t  //attaching callbcak function for the AfterFill event\n\t  jsdo.subscribe('AfterFill', onAfterFillCustomers, this);\n\t  jsdo.fill('CustNum < 21');\n\t  function onAfterFillCustomers(jsdo, success, request) {\n\t    jsdo.eCustomer.foreach(function(customer) {\n\t      //console.log(jsdo.eCustomer.Name);\n\t      $('.reaction .list').append('<li class=\"list-item\">'+customer.data.CustNum + ' ' +  customer.data.Name + '</li>');\n\t    });\n\t  }\n\t});})(window,jQuery,progress)\n"
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
				<Codemirror value={this.state.code} options={{mode: 'javascript'}} />
				<Editor />
				<iframe height='800' scrolling='no' src={""+this.state.data.iframe} frameborder='no' allowtransparency='true' allowfullscreen='true' style={{width: '100%'}}>
				See the Pen 
				</iframe>
			</div>
		)
	}
});

module.exports = Description;