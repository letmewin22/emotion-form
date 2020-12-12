import {FormSend} from './FormSend'
import {Input} from './Input'
import {TOpts} from './TOpts'

export class Form {
  $form: HTMLFormElement
  $inputs: NodeListOf<HTMLInputElement>
  formSend: any

  constructor(readonly formSelector: string, readonly opts: TOpts) {
    this.$form = document.querySelector(formSelector)
    this.$inputs = this.$form.querySelectorAll('[data-input]')

    this.formSend = new FormSend(this.$form, this.opts)

    this.init()
  }

  private init(): void {
    this.$inputs.forEach($el => new Input($el))
  }

  addFocus(idx: number): void {
    this.$inputs[idx].focus()
    this.$inputs[idx].classList.add('js-focus')
    document.body.classList.add('e-fixed')
  }
}
