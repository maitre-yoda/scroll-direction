class ScrollDirection{

  constructor(options){
    const { target = window , addClassesTo = 'body' } = options
    this.target = target
    this.addClassesTo = addClassesTo
    this.watch()
    this.last = 0
    this.direction = ''
  }

  watch(){
    this.listener = this.detectDirection.bind(this)
    this.target.addEventListener('scroll',this.listener)
  }

  stop(){
    this.target.removeEventListener('scroll',this.listener)
  }

  addClasses(){
    if(this.addClassesTo && this.direction){
      const el = document.querySelector(this.addClassesTo)
      el.classList.add('scroll-direction-'+this.direction)
      el.classList.remove('scroll-direction-'+ (
        this.direction == 'down' ? 'up' : 'down'
      ) )
    }
  }

  onDirectionChange(){
    this.addClasses()
    this.target.dispatchEvent(new CustomEvent('scrollDirectionChange',{ detail : this }))
  }

  detectDirection(event){
    const scrolled      = this.target.scrollY || this.target.scrollTop
    const newDirection  = (scrolled > this.last) ? 'down' : 'up'
    if(this.direction   != newDirection){
      this.direction    = newDirection
      this.onDirectionChange()
    }
    this.last           = scrolled
  }

}
