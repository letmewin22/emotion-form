import Bind from './decorators/@Bind'

export class ErrorMessage {
  $error: HTMLElement

  constructor(readonly $form: HTMLFormElement) {
    this.$error = $form.querySelector('[data-error]')

    this.$error.addEventListener('click', this.hide)
  }

  get computeHeight(): string {
    return this.$error.scrollHeight.toString()
  }

  show(): void {
    this.$error.style.setProperty('--h', this.computeHeight + 'px')
    this.$form.classList.add('error')
  }

  @Bind
  hide(): void {
    this.$form.classList.remove('error')
    this.$error.style.setProperty('--h', '0')
  }

  destroy(): void {
    this.$error.removeEventListener('click', this.hide)
  }
}

export type TEM = typeof ErrorMessage.prototype
