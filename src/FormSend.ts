import Bind from './decorators/@Bind'
import {ErrorMessage, TEM} from './ErrorMessage'
import {Input, TInput} from './Input'
import {SendData, TSendData} from './SendData'
import {TOpts} from './TOpts'

interface IData {
  [key: string]: string
}

export class FormSend {
  inputsInstance: TInput[]
  em: TEM
  sd: TSendData

  data: IData = {}
  inputInstance = []

  constructor(readonly $form: HTMLFormElement, readonly opts: TOpts) {
    this.init()
  }

  private init(): void {
    if (!this.opts || !this.opts.URL) {
      throw new Error('URL is must be defined')
    }
    this.em = new ErrorMessage(this.$form)

    this.sd = new SendData(
      {
        error: () => this.error(),
        success: () => this.success(),
      },
      this.$form
    )
    this.$form.addEventListener('submit', this.submit)
  }

  protected success(): void {
    this.reset()
    this.inputInstance.forEach(inst => inst.destroy())
    this.inputInstance = []
    this.opts.onSuccess && this.opts.onSuccess()
  }

  protected error(): void {
    this.em.show()
    this.opts.onSuccess && this.opts.onError()
  }

  protected async requestSend(): Promise<any> {
    const formData = new FormData()

    Object.keys(this.data).map(el => {
      return formData.append(el, this.data[el])
    })

    if (typeof this.opts.URL === 'string') {
      await this.sd.stringUrl(this.opts.URL, formData)
    }

    if (Array.isArray(this.opts.URL)) {
      await this.sd.arrayUrls(this.opts.URL, formData)
    }
  }

  isInput(input: any): boolean {
    return (
      (input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA') &&
      input.type !== 'submit'
    )
  }

  @Bind
  protected submit(e: Event): void {
    e.preventDefault()
    const inputs: any[] = [...this.$form.elements]
    const isValid = inputs.map(input => {
      if (this.isInput(input)) {
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
    const inputs: any[] = [...this.$form.elements]
    inputs.forEach(input => {
      if (this.isInput(input)) {
        input.value = ''
        input.blur()
        input.classList.remove('js-focus')
      }
    })
    document.body.classList.remove('e-fixed')
  }
}

export type TFormSend = typeof FormSend.prototype
