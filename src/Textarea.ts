type TFunc = () => void

export class Textarea {
  constructor(readonly $textarea: HTMLInputElement) {
    this.init()
  }

  observe(element: HTMLInputElement, event: string, handler: TFunc): void {
    element.addEventListener(event, handler, false)
  }

  unsubscribe(element: HTMLInputElement, event: string, handler: TFunc): void {
    element.removeEventListener(event, handler, false)
  }

  private init(): void {
    this.resize = this.resize.bind(this)
    this.delayedResize = this.delayedResize.bind(this)

    this.observe(this.$textarea, 'change', this.resize)
    this.observe(this.$textarea, 'cut', this.delayedResize)
    this.observe(this.$textarea, 'paste', this.delayedResize)
    this.observe(this.$textarea, 'drop', this.delayedResize)
    this.observe(this.$textarea, 'keydown', this.delayedResize)

    this.$textarea.focus()

    this.resize()
  }

  resize(): void {
    this.$textarea.style.height = 'auto'
    this.$textarea.style.height = this.$textarea.scrollHeight + 'px'
  }

  delayedResize(): void {
    window.setTimeout(this.resize, 0)
  }

  destroy(): void {
    this.unsubscribe(this.$textarea, 'change', this.resize)
    this.unsubscribe(this.$textarea, 'cut', this.delayedResize)
    this.unsubscribe(this.$textarea, 'paste', this.delayedResize)
    this.unsubscribe(this.$textarea, 'drop', this.delayedResize)
    this.unsubscribe(this.$textarea, 'keydown', this.delayedResize)
  }
}

export type TTA = typeof Textarea.prototype
