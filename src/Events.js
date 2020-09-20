function Event(name){
  this.name = name;
  this.callbacks = [];
}
Event.prototype.registerCallback = function(callback){
  this.callbacks.push(callback);
}

function Events(){
  this.events = {};
}

Events.prototype.registerEvent = function(eventName){
  var event = new Event(eventName);
  this.events[eventName] = event;
};

Events.prototype.dispatchEvent = function(eventName, eventArgs){
  this.events[eventName].callbacks.forEach(function(callback){
    callback(eventArgs);
  });
};

Events.prototype.addEventListener = function(eventName, callback){
  this.events[eventName].registerCallback(callback);
};

export {Events};