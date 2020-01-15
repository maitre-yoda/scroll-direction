import { throttle } from 'throttle-debounce';

class ScrollDirection {
  constructor(options) {
    this.originalOptions = {
      target: window,
      addClassesTo: 'body',
      throttle: 10
    };

    this.options = Object.assign({}, this.originalOptions, options);

    if (typeof this.options.addClassesTo === 'string') { // String
      this.addClassesTo = document.querySelector(this.options.addClassesTo);
    } else if (this.options.addClassesTo.jquery) { // jQuery
      this.addClassesTo = this.options.addClassesTo[0];
    } else { // HTML element
      this.addClassesTo = this.options.addClassesTo;
    } 

    this.last = 0;
    this.direction = '';
    this.watch();
  }

  watch() {
    this.listener = this.detectDirection.bind(this);

    this.options.target.addEventListener('scroll', throttle(this.options.throttle, () => this.listener()));
  }

  stop() {
    this.options.target.removeEventListener('scroll', this.listener)
  }

  addClasses(){
    if(this.addClassesTo && this.direction) {
      if(this.direction === 'up') {
        this.addClassesTo.classList.add('scroll-direction-up');
        this.addClassesTo.classList.remove('scroll-direction-down');
      } else {
        this.addClassesTo.classList.add('scroll-direction-down');
        this.addClassesTo.classList.remove('scroll-direction-up');
      }
    }
  }

  onDirectionChange() {
    this.addClasses();
    this.options.target.dispatchEvent(new CustomEvent('scrollDirectionChange', { detail : this }));
  }

  detectDirection() {
    const scrolled = this.options.target.scrollY || this.options.target.scrollTop;
    const newDirection = (scrolled > this.last) ? 'down' : 'up';
    if(this.direction != newDirection) {
      this.direction = newDirection;
      this.onDirectionChange();
    }
    this.last = scrolled;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    ScrollDirection
  };
} else {
  if (typeof define === 'function' && define.amd) {
    define([], () => {
      return ScrollDirection;
    });
  } else {
    window.ScrollDirection = ScrollDirection;
  }
}
