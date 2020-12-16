import {data} from './formData'
import {FormSend, TFormSend} from './FormSend'
import {Input, TInput} from './Input'
import {TOpts} from './TOpts'

export class Form {
  $form: HTMLFormElement
  $inputs: NodeListOf<HTMLInputElement>
  formSend: TFormSend
  inputsInstances: TInput[] = []

  constructor(readonly formSelector: string, readonly opts: TOpts) {
    this.$form = document.querySelector(formSelector)

    if (!this.$form) {
      return
    }

    this.$inputs = this.$form.querySelectorAll('[data-input]')

    this.init()
  }

  private init(): void {
    this.$inputs.forEach($el => {
      data[$el.name] = {
        value: '',
        validation: $el.dataset.validation ? false : true,
      }
      const inst = new Input($el)
      inst.init()
      this.inputsInstances.push(inst)
    })
    this.formSend = new FormSend(this.$form, this.opts)
  }

  addFocus(idx: number): void {
    if (!this.$form) {
      return
    }
    this.$inputs[idx].focus()
    this.$inputs[idx].classList.add('js-focus')
    document.body.classList.add('e-fixed')
  }

  destroy(): void {
    this.formSend.destroy()
    this.inputsInstances.forEach(inst => inst.destroy())
    document.body.classList.remove('e-fixed')
  }
}
