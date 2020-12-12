import {parsePhoneNumberFromString} from 'libphonenumber-js'

export class Validation {
  constructor(readonly $input: HTMLInputElement, readonly options: string) {}

  init(): boolean {
    const optionsValues = this.options.split(' ')

    const result = optionsValues.map(option => {
      const method = option.replace(/[\d()]/gm, '')
      const values = option.replace(/\D/gm, '')
      return this[method](this.$input.value, values && +values)
    })

    return !result.includes(false)
  }

  notEmpty(string: string): boolean {
    if (string.trim().length > 0) {
      return true
    }
    return false
  }

  phone(string: string): boolean {
    string = string.replace(/[A-z]|[А-я]|\s|[*!@#$%^&{}[\]~""/|=]/g, '')
    const phoneNumber = parsePhoneNumberFromString(string)
    if (phoneNumber) {
      string = phoneNumber.formatInternational()
    }

    return true
  }

  minlength(string: string, value: number): boolean {
    if (string.trim().length < value) {
      return false
    }
    return true
  }

  email(string: string): boolean {
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const isEmailValid = regExp.test(string.trim())
    if (!isEmailValid) {
      return false
    }
    return true
  }

  maxlength(string: string, value: number): boolean {
    const inputLength = string.trim().length
    if (this.$input && this.$input.parentNode) {
      const lc = this.$input.parentNode.querySelector('[data-length]')
      const diff = value - inputLength
      lc && (lc.innerHTML = diff.toString())
    }

    if (inputLength > value) {
      return false
    }
    return true
  }
}
