import Bind from './decorators/@Bind'
import {Input} from './Input'
import {TOpts} from './TOpts'

export class FormSend {
  inputsInstance: Array<any>
  data: any

  inputInstance = []

  constructor(readonly $form: HTMLFormElement, readonly opts: TOpts) {
    this.init()
  }

  private init(): void {
    if (!this.opts || !this.opts.URL) {
      throw new Error('URL is must be defined')
      return
    }
    this.$form.addEventListener('submit', this.submit)
  }

  showLoader(): void {
    this.$form.classList.add('loading')
  }

  hideLoader(): void {
    this.$form.classList.remove('loading')
  }

  protected success(): void {
    this.reset()
    this.inputInstance.forEach(inst => inst.destroy())
    this.inputInstance = []
    this.opts.onSuccess && this.opts.onSuccess()
  }

  protected error(): void {
    this.opts.onSuccess && this.opts.onError()
  }

  protected async requestSend(): Promise<any> {
    const formData = new FormData()

    Object.keys(this.data).map(el => {
      return formData.append(el, this.data[el])
    })

    this.showLoader()
    try {
      const res = await fetch(this.opts.URL, {
        method: 'POST',
        body: formData,
      })

      if (res.status >= 200 && res.status < 400) {
        this.success()
        return
      } else {
        alert('Error')
        this.error()
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.hideLoader()
    }
  }

  @Bind
  protected submit(e: Event): void {
    e.preventDefault()
    const inputs: Array<any> = [...this.$form.elements]

    const isValid = inputs.map(input => {
      if (
        (input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA') &&
        input.type !== 'submit'
      ) {
        this.data[input.name] = input.value
        const inputClass = new Input(input)
        this.inputInstance.push(inputClass)
        return inputClass.validate(input)
      }
    })
    if (!isValid.includes(false)) {
      this.requestSend()
    } else {
      this.focusFirstFailedInput(isValid)
    }
  }

  focusFirstFailedInput(arr: Array<boolean>): void {
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i]
      if (el === false) {
        this.inputInstance[i].focus()
        break
      }
    }
  }

  protected reset(): void {
    const inputs: Array<any> = [...this.$form.elements]
    inputs.forEach(input => {
      if (input.nodeName === 'INPUT' && input.type !== 'submit') {
        input.value = ''
        input.blur()
        input.classList.remove('js-focus')
      }
    })
    document.body.classList.remove('e-fixed')
  }
}
