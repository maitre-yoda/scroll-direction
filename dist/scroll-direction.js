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
    this.addClassesTo = addClassesTo;
    this.watch();
    this.last = 0;
    this.direction = '';
  }

  _createClass(ScrollDirection, [{
    key: 'watch',
    value: function watch() {
      this.listener = this.detectDirection.bind(this);
      this.target.addEventListener('scroll', this.listener);
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
        var el = document.querySelector(this.addClassesTo);
        el.classList.add('scroll-direction-' + this.direction);
        el.classList.remove('scroll-direction-' + (this.direction == 'down' ? 'up' : 'down'));
      }
    }
  }, {
    key: 'onDirectionChange',
    value: function onDirectionChange() {
      this.addClasses();
      this.target.dispatchEvent(new CustomEvent('scrollDirectionChange', { detail: this }));
    }
  }, {
    key: 'detectDirection',
    value: function detectDirection(event) {
      var scrolled = this.target.scrollY || this.target.scrollTop;
      var newDirection = scrolled > this.last ? 'down' : 'up';
      if (this.direction != newDirection) {
        this.direction = newDirection;
        this.onDirectionChange();
      }
      this.last = scrolled;
    }
  }]);

  return ScrollDirection;
}();