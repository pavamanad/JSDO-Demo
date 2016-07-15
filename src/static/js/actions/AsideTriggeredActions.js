var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var MenuSelection = {
	LoadDescription: function(data){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.LOAD_DESCRIPTION,
			data:data
		});
	}
}

module.exports = MenuSelection;