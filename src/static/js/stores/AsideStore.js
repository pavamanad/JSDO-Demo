var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var _asideData = {};
var loadAside = function(data){
	_asideData  = data;
};

var AsideStore = assign({}, EventEmitter.prototype, {
	getAsideData: function(){
		return _asideData;
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
		case AppConstants.LOAD_ASIDE:
			data = action.data;
			loadAside(data);
			break;
		default:
			return true;
	}
	AsideStore.emitChange();
	return true;
});

module.exports = AsideStore;