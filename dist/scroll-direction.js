'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollDirection = function () {
  function ScrollDirection(options) {
    _classCallCheck(this, ScrollDirection);

    var _options$target = options.target,
        target = _options$target === undefined ? window : _options$target,
        _options$addClassesTo = options.addClassesTo,
        addClassesTo = _options$addClassesTo === undefined ? 'body' : _options$addClassesTo;

    this.target = target;
    this.addClassesTo = addClassesTo ? document.querySelector(addClassesTo) : addClassesTo;
    this.watch();
    this.last = 0;
    this.direction = 'down';
  }

  _createClass(ScrollDirection, [{
    key: 'watch',
    value: function watch() {
      var _this = this;

      var limiter = void 0;
      var limitCount = 0;
      this.listener = this.detectDirection.bind(this);
      this.target.addEventListener('scroll', function () {
        if (limitCount < 10) {
          clearTimeout(limiter);
          limitCount++;
        }
        limiter = setTimeout(function () {
          limitCount = 0;
          _this.listener();
        }, 10);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.target.removeEventListener('scroll', this.listener);
    }
  }, {
    key: 'addClasses',
    value: function addClasses() {
      if (this.addClassesTo && this.direction) {
        var el = this.addClassesTo;
        var right = this.direction;
        var wrong = right == 'down' ? 'up' : 'down';
        el.className = el.className.replace('scroll-direction-' + wrong, '').replace('\s\s', ' ') + ' scroll-direction-' + right;
      }
    }
  }, {
    key: 'onDirectionChange',
    value: function onDirectionChange() {
      console.log("Change found");
      this.addClasses();
      this.target.dispatchEvent(new CustomEvent('scrollDirectionChange', { detail: this }));
    }
  }, {
    key: 'detectDirection',
    value: function detectDirection(event) {
      var scrolled = this.target.scrollY || this.target.scrollTop;
      var newDirection = scrolled > this.last ? 'down' : 'up';
      console.log("Detecting changes...", scrolled);
      if (this.direction != newDirection) {
        this.direction = newDirection;
        this.onDirectionChange();
      }
      this.last = scrolled;
    }
  }]);

  return ScrollDirection;
}();