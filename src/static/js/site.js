// (function(){
// 	var serviceURI = "http://localhost:8810/Sports/";
// 	var catalogURI =  "http://localhost:8810/Sports/static/SportsService.json";

// 	session = new progress.data.Session();
// 	session.login(serviceURI, "", "");
// 	session.addCatalog(catalogURI);

// 	jsdo = new progress.data.JSDO({ name: 'Customer' });
// 	//dataSet = new progress.data.JSDO("Customer");
// 	//console.log(dataSet);

// 	var readOperation = function(){
// 		jsdo.subscribe('AfterFill', onAfterFillCustomers, this);	
// 		jsdo.fill();

// 		function onAfterFillCustomers(jsdo, success, request) {
// 			jsdo.ttCustomer.foreach(function(customer) {
// 				console.log(customer.data);
// 				$("#readResults").append(customer.data.CustNum + ' ' + customer.data.Name + '<br>');
// 			});
// 		};
// 	};
// 	var updateOperation =  function(){
// 		jsdo.subscribe('AfterFill', onAfterFillCustomers, this);	
// 		jsdo.fill();

// 		function onAfterFillCustomers(jsdo, success, request) {
// 			var jsrecord = jsdo.ttCustomer.findById(jsdo.ttCustomer.getId());
// 			jsrecord.assign({Name:"Pavaman"});
// 			jsdo.saveChanges();
// 		};
		
// 	}

// 	$(function(){
// 		$('#read').on('click', readOperation);
// 		$('#update').on('click', updateOperation);
// 	});

// })();

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Navbar = require('./components/Navbar');
var Aside = require('./components/Aside');
var Description = require('./components/Description');
var AppAction = require('./actions/InitialAction.js');




var PageContainer = React.createClass({

	componentWillMount: function(){
		AppAction.loadAside();
	},
	render: function(){
		return(
			<div className="pageContainer">
				<Navbar />
				<main className="container-fluid">
					<div className="row">
						<div className="col-md-3">
							<Aside />
						</div>
						<div className="col-md-9">
							<Description />
						</div>
					</div>
					
				</main>
			</div>
		);
	}
});

ReactDOM.render((
	<Router history={browserHistory}>
	    <Route path="/" component={PageContainer}>
	    	<Route path="*" component={PageContainer}/>
	    </Route>
  	</Router>
),document.getElementById('reactContainer'));