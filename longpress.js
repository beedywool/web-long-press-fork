
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory();
  } else {
    root.LongPress = factory();
  }
})(typeof window !== "undefined" ? window : global, function () {
  // default options
  var defaultOptions = {
    triggerClass: "long-press",
    pressDelay: 800,
    eventName: "longpress",
    bubbles: true
  }; // constructor

  function LongPress(opts) {
    this.options = _objectSpread(_objectSpread({}, defaultOptions), opts);
    this.timer;
    this.init();
  }
  /**
   * initialize
   */


  LongPress.prototype.init = function () {
    var that = this;
    var timer = that.timer;
    if (timer) clearTimeout(timer);
    var pressStart = that.pressStart.bind(that);
    var init = that.init.bind(that);

    if ("ontouchstart" in document.body) {
      document.addEventListener("touchstart", pressStart, {
        once: true,
        passive: false
      });
      document.addEventListener("touchend", init, {
        once: true
      });
    } else {
      document.addEventListener("mousedown", pressStart, {
        once: true
      });
      document.addEventListener("mouseup", init, {
        once: true
      });
    }
  };
  /**
   * handle press start
   * @param {Event} e
   * @param {Object} options
   */

  LongPress.prototype.pressStart = function (e) {
    var that = this;
    var options = that.options;
  
    // Check if the target has the trigger class, if not, return early
    if (e.target.className.split(" ").indexOf(options.triggerClass) < 0) return;
  
    // Variables to track movement and scrolling
    var startX = e.touches ? e.touches[0].clientX : e.clientX;
    var startY = e.touches ? e.touches[0].clientY : e.clientY;
    var moved = false;
  
    // Function to check if the user has scrolled
    function onMove(moveEvent) {
      var moveX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      var moveY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
      if (Math.abs(moveX - startX) > 10 || Math.abs(moveY - startY) > 10) {
        moved = true;
      }
    }
  
    // Add event listener for touchmove to detect scrolling
    document.addEventListener("touchmove", onMove, { passive: true });
      if (!moved && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault(); // Prevent default if the user hasn't scrolled
      }
    // Start the timer for the long press
    that.timer = setTimeout(function () {
      that.handleLongPress(e.target);
  
      // Remove the touchmove event listener after the long press is handled
      document.removeEventListener("touchmove", onMove);
    }, options.pressDelay);
  };



  LongPress.prototype.handleLongPress = function (target) {
    var _this$options = this.options,
        eventName = _this$options.eventName,
        bubbles = _this$options.bubbles;
    target.dispatchEvent(new Event(eventName, {
      bubbles: bubbles
    }));
  };

  return LongPress;
});
