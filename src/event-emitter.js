define(['lodash-amd/modern/arrays/pull',
  'immutable/dist/immutable'], function (pull, Immutable) {

  'use strict';

  // TODO: once
  // TODO: unit test
  // Good example of a complete(?) implementation: https://github.com/Wolfy87/EventEmitter
  function EventEmitter() {
    this._listeners = {};
  }

  EventEmitter.prototype.on = function (eventName, fn) {
    var listeners = this._listeners[eventName] || Immutable.Set();

    this._listeners[eventName] = listeners.add(fn);
  };

  EventEmitter.prototype.off = function (eventName, fn) {
    var listeners = this._listeners[eventName] || Immutable.Set();
    if (fn) {
      listeners = listeners.delete(fn);
    } else {
      listeners = listeners.clear();
    }
  };

  EventEmitter.prototype.trigger = function (eventName, args) {
    var listeners = this._listeners[eventName] || Immutable.Set();

    listeners.forEach(function (listener) {
      listener.apply(null, args);
    });
  };

  return EventEmitter;

});
