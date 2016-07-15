var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var InitialAction = {
	loadAside: function(){
		$.ajax({
			url: "/static/data/data.json"
		})
		.done(function(data) {
			AppDispatcher.handleViewAction({
				actionType: AppConstants.LOAD_ASIDE,
				data:data
			});
		})
	}
}

module.exports = InitialAction;