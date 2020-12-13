import Bind from './decorators/@Bind'

type TFunc = () => void

export class Textarea {
  constructor(readonly $textarea: HTMLInputElement) {
    this.init()
  }

  observe(element: HTMLInputElement, event: string, handler: TFunc): void {
    element.addEventListener(event, handler, false)
  }

  private init(): void {
    const delayedResize = () => {
      window.setTimeout(this.resize, 0)
    }

    this.observe(this.$textarea, 'change', this.resize)
    this.observe(this.$textarea, 'cut', delayedResize)
    this.observe(this.$textarea, 'paste', delayedResize)
    this.observe(this.$textarea, 'drop', delayedResize)
    this.observe(this.$textarea, 'keydown', delayedResize)

    this.$textarea.focus()
    this.resize()
  }

  @Bind
  resize(): void {
    this.$textarea.style.height = 'auto'
    this.$textarea.style.height = this.$textarea.scrollHeight + 'px'
  }
}
