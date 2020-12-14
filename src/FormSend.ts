import Bind from './decorators/@Bind'
import {ErrorMessage, TEM} from './ErrorMessage'
import {data} from './formData'
import {Input, TInput} from './Input'
import {SendData, TSendData} from './SendData'
import {TOpts} from './TOpts'

export class FormSend {
  inputsInstance: TInput[]
  em: TEM
  sd: TSendData

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
        error: this.error,
        success: this.success,
      },
      this.$form
    )

    Object.keys(data).forEach(key => {
      const inputClass = new Input(this.$form[key])
      this.inputInstance.push(inputClass)
    })

    this.submit = this.submit.bind(this)
    this.$form.addEventListener('submit', this.submit)
  }

  @Bind
  protected success(): void {
    this.reset()
    this.opts.onSuccess && this.opts.onSuccess()
  }

  @Bind
  protected error(): void {
    this.em.show()
    this.opts.onError && this.opts.onError()
  }

  protected async requestSend(): Promise<any> {
    const formData = new FormData()

    Object.keys(data).map(el => {
      return formData.append(el, data[el].value)
    })

    if (typeof this.opts.URL === 'string') {
      await this.sd.stringUrl(this.opts.URL, formData)
    }

    if (Array.isArray(this.opts.URL)) {
      await this.sd.arrayUrls(this.opts.URL, formData)
    }
  }

  protected submit(e: Event): void {
    e.preventDefault()
    const isValid = Object.keys(data).map((key, idx) => {
      this.inputInstance[idx].validate()
      return data[key].validation
    })

    if (!isValid.includes(false)) {
      this.requestSend()
    } else {
      this.focusFirstFailedInput(isValid)
    }
  }

  focusFirstFailedInput(arr: boolean[]): void {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === false) {
        this.inputInstance[i].focus()
        break
      }
    }
  }

  protected reset(): void {
    Object.keys(data).forEach(el => {
      this.$form[el].value = ''
      this.$form[el].blur()
      this.$form[el].classList.remove('js-focus')
    })

    document.body.classList.remove('e-fixed')
  }

  destroy(): void {
    this.reset()
    this.$form.removeEventListener('submit', this.submit)
    this.inputInstance.forEach(inst => inst.destroy())
    this.em.destroy()
  }
}

export type TFormSend = typeof FormSend.prototype
