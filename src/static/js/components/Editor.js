var React = require('react');
var DescriptionStore = require('../stores/DescriptionStore');
var Codemirror = require('react-codemirror');
require('../../../../node_modules/react-codemirror/node_modules/codemirror/mode/javascript/javascript');



var Editor = React.createClass({
	
	render: function(){
		return(
			<div className='editor'>
				<ul className='nav-tab'>
					<li className=''>JS</li>
					<li className=''>HTML</li>
					<li className=''>CSS</li>
					<li className=''>Preview</li>
				</ul>
				<div class="tab-content">
					<div className='tab-pane'>
					
					</div>
					<div className='tab-pane'>
						
					</div>
					<div className='tab-pane'>
						
					</div>
				</div>
				<div className='iframe-container'>
				</div>
			</div>
		)
	}
})


module.exports = Editor;




















