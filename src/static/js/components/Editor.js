var React = require('react');
var ReactDOM = require('react-dom');
var DescriptionStore = require('../stores/DescriptionStore');
var Codemirror = require('react-codemirror');
require('../../../../node_modules/react-codemirror/node_modules/codemirror/mode/javascript/javascript');
require('../../../../node_modules/react-codemirror/node_modules/codemirror/mode/htmlmixed/htmlmixed');
require('../../../../node_modules/react-codemirror/node_modules/codemirror/mode/css/css');

var Preview = React.createClass({
	render: function() {
        return <iframe ref='preview' src='#' style={{width: '100%'}} height="600" frameBorder="0"/>;
    },
    componentDidMount: function() {
        var previewFrame = this.refs.preview;
		var previewDoc = previewFrame.contentWindow.document;
		var content = '<html><head><style>'+this.props.css+'</style></head><body>'+this.props.html+'<script>'+this.props.js+'</script></body></html>';
		previewDoc.write(content);
    },
    componentDidUpdate: function() {
        var previewFrame = this.refs.preview;
		var previewDoc = previewFrame.contentWindow.document;
		previewDoc.open();
		previewDoc.clear();
		var content = '<html><head><style>'+this.props.css+'</style></head><body>'+this.props.html+'<script>'+this.props.js+'</script></body></html>';
		previewDoc.write(content);
    }
});

var Editor = React.createClass({

	getInitialState: function(){
		return {
			tabFlag: true,
			previewFlag: true,
			previewPane:"iframe-container col-md-6",
			htmlTabPane:"tab-pane active",
			jsTabPane:"tab-pane active",
			cssTabPane:"tab-pane active",
			previewTab:"",
			htmlTab:"tab",
			cssTab:"tab",
			jsTab:"tab active",
			cssCode:'@import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800);\n\tbody {\n\tpadding: 0 50px 50px;\n\tfont-family: "Open Sans", sans-serif;\n\tfont-size: 16px;\n\tline-height: 22px;\n\tmargin: 0;\n\t}\n\t.container {\n\tmargin: 15px;\n\t}\n\t.btn {\n\tborder: 0;\n\tpadding: 7px 15px;\n\tfont-size: 16px;\n\tborder-radius: 5px;\n\t}\n\t.primary-btn {\n\tbackground: #25bcce;\n\tcolor: #fff;\n\t}\n\t.action, .reaction {\n\tborder: 1px solid;\n\tborder-radius: 5px;\n\tpadding: 15px;\n\tmargin-bottom: 15px;\n\t}\n\t.action .description, .reaction .description {\n\tmargin: 0 0 5px 0;\n\t}\n\t.list {\n\tpadding: 0;\n\tmargin: 0;\n\tlist-style-type: none;\n\t}\n\t.list .list-item {\n\tpadding: 0;\n\t}\n\t',
			htmlCode:'<script src="https://code.jquery.com/jquery-2.2.4.min.js" type="text/javascript"></script><script src="http://oemobiledemo.progress.com/jsdo/progress.jsdo.js" type="text/javascript"></script><div class="container">\n\t<div class="action">\n\t<p class="description">\n\tTo <b>READ</b> the sample data from DataBase, click the button below\n\t</p>\n\t<button class="primary-btn btn js-read">\n\tREAD\n\t</button>\n\t</div>\n\t<div class="reaction">\n\t<p class="description">\n\tYou can see the changes/data below\n\t</p>\n\t<ul class="list">\n\t</ul>\n\t</div>\n\t</div>\n',
			jsCode:"(function(window,$,progress,undefined){\n\tvar serviceURI = 'http://oemobiledemo.progress.com/CustomerService'; \n\tvar catalogURI = 'http://oemobiledemo.progress.com/CustomerService/static/mobile/CustomerService.json';\n\t/**establishing session**/\n\t  session = new progress.data.Session();\n\t  session.login(serviceURI, '', '');\n\t  session.addCatalog(catalogURI);\n\t$('.js-read').on('click', function(){\n\t    /**fetching first 10 items **/  \n\t  jsdo = new progress.data.JSDO({ name: 'Customer' });\n\t  //attaching callbcak function for the AfterFill event\n\t  jsdo.subscribe('AfterFill', onAfterFillCustomers, this);\n\t  jsdo.fill('CustNum < 21');\n\t  function onAfterFillCustomers(jsdo, success, request) {\n\t    jsdo.eCustomer.foreach(function(customer) {\n\t      //console.log(jsdo.eCustomer.Name);\n\t      $('.reaction .list').append('<li class=\"list-item\">'+customer.data.CustNum + ' ' +  customer.data.Name + '</li>');\n\t    });\n\t  }\n\t});})(window,jQuery,progress)\n"
		};
	},

	_htmlTab:function(){
		if(this.state.htmlTab=='tab'){
			this.setState({
				htmlTabPane:"tab-pane active",
				jsTabPane:"tab-pane",
				cssTabPane:"tab-pane",
				htmlTab:'tab active',
				cssTab:"tab",
				jsTab:"tab"
			});
		}
	},

	_jsTab:function(){
		if(this.state.jsTab=='tab'){
			this.setState({
				htmlTabPane:"tab-pane",
				jsTabPane:"tab-pane active",
				cssTabPane:"tab-pane",
				jsTab:'tab active',
				htmlTab:"tab",
				cssTab:"tab"
			});
		}
	},

	_cssTab:function(){
		if(this.state.cssTab=='tab'){
			this.setState({
				htmlTabPane:"tab-pane",
				jsTabPane:"tab-pane",
				cssTabPane:"tab-pane active",
				cssTab:'tab active',
				htmlTab:"tab",
				jsTab:"tab"
			});
		}
	},

	_previewTab:function(){

	},
	_updateHtml:function(updatedHtmlCode){
		this.setState({htmlCode:updatedHtmlCode});
	},
	_updateJs:function(updatedJsCode){
		this.setState({jsCode:updatedJsCode});
	},
	_updateCss:function(updatedCssCode){
		this.setState({cssCode:updatedCssCode});
	},
	componentDidMount: function(){
		this.setState({
				htmlTabPane:"tab-pane",
				jsTabPane:"tab-pane active",
				cssTabPane:"tab-pane",
				jsTab:'tab active',
				htmlTab:"tab",
				cssTab:"tab"
			});
	},
	render: function(){
		return(
			<div className='editor'>
				<ul className='nav-tab'>
					<li className={this.state.jsTab} onClick={this._jsTab}>JS</li>
					<li className={this.state.htmlTab} onClick={this._htmlTab}>HTML</li>
					<li className={this.state.cssTab} onClick={this._cssTab}>CSS</li>
					<li className='tab active' onClick={this._previewTab} >Preview</li>
				</ul>
				<div className="tab-content col-md-6">
					<div className={this.state.jsTabPane}>
						<Codemirror value={this.state.jsCode} options={{mode: 'javascript'}} onChange={this._updateJs}/>
					</div>
					<div className={this.state.htmlTabPane}>
						<Codemirror value={this.state.htmlCode} options={{mode: 'htmlmixed'}} onChange={this._updateHtml}/>
					</div>
					<div className={this.state.cssTabPane}>
						<Codemirror value={this.state.cssCode} options={{mode: 'css'}}  onChange={this._updateCss}/>
					</div>
				</div>
				<div className={this.state.previewPane}>
					<Preview html={this.state.htmlCode} css={this.state.cssCode} js ={this.state.jsCode} ></Preview>
				</div>
			</div>
		)
	}
})


module.exports = Editor;




















