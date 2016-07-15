var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var _descitionData = {};
var loadDescription = function(data){
	_descitionData  = data;
};

var DescriptionStore = assign({}, EventEmitter.prototype, {
	getDescriptionData: function(){
		return _descitionData;
	},
	emitChange: function(){
		this.emit('change')
	},
	addChangeListner: function(callback){
		this.on('change', callback);
	},
	removeChangeListner: function(callback){
		this.removeListner('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;
	var data;
	switch(action.actionType){
		case AppConstants.LOAD_DESCRIPTION:
			data = action.data;
			loadDescription(data);
			break;
		default:
			return true;
	}
	DescriptionStore.emitChange();
	return true;
});

module.exports = DescriptionStore;