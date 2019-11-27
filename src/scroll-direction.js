class ScrollDirection{

  constructor(options){
    const { target = window , addClassesTo = 'body' } = options
    this.target = target
    this.addClassesTo = addClassesTo ? document.querySelector(addClassesTo) : addClassesTo;
    this.last = 0
    this.direction = 'down'
    this.addClasses()
    this.watch()
  }

  watch(){
    let limiter
    let limitCount = 0
    this.listener = this.detectDirection.bind(this)
    this.target.addEventListener('scroll',()=>{
      if(limitCount < 10){
        clearTimeout(limiter)
        limitCount++
      }
      limiter = setTimeout(()=>{
        limitCount = 0
        this.listener()
      },10)


    })
  }

  stop(){
    this.target.removeEventListener('scroll',this.listener)
  }

  addClasses(){
    if(this.addClassesTo && this.direction){
      const el = this.addClassesTo
      const right = this.direction
      const wrong = right == 'down' ? 'up' : 'down'
      el.className = el.className.replace('scroll-direction-'+wrong, '').replace('\s\s',' ') + ' scroll-direction-'+right
    }
  }

  onDirectionChange(){
    console.log("Change found")
    this.addClasses()
    this.target.dispatchEvent(new CustomEvent('scrollDirectionChange',{ detail : this }))
  }

  detectDirection(event){
    const scrolled      = this.target.scrollY || this.target.scrollTop
    const newDirection  = (scrolled > this.last) ? 'down' : 'up'
    console.log("Detecting changes..." , scrolled)
    if(this.direction   != newDirection){
      this.direction    = newDirection
      this.onDirectionChange()
    }
    this.last           = scrolled
  }

}
