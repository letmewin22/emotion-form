import {parsePhoneNumberFromString} from 'libphonenumber-js'

export class Validation {
  constructor(readonly $input: HTMLInputElement, readonly options: string) {}

  init(): boolean {
    const optionsValues = this.options.split(' ')

    const result = optionsValues.map(option => {
      const method = option.replace(/[\d()]/gm, '')
      const values = option.replace(/\D/gm, '')
      return this[method](values && +values)
    })

    return !result.includes(false)
  }

  notEmpty(): boolean {
    if (this.$input.value.trim().length > 0) {
      return true
    }
    return false
  }

  phone(): boolean {
    this.$input.value = this.$input.value.replace(
      /[A-z]|[А-я]|\s|[*!@#$%^&{}[\]~""/|=]/g,
      ''
    )
    const phoneNumber = parsePhoneNumberFromString(this.$input.value)
    if (phoneNumber) {
      this.$input.value = phoneNumber.formatInternational()
    }

    return true
  }

  minlength(value: number): boolean {
    if (this.$input.value.trim().length < value) {
      return false
    }
    return true
  }

  email(): boolean {
    const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const isEmailValid = regExp.test(this.$input.value.trim())
    if (!isEmailValid) {
      return false
    }
    return true
  }

  maxlength(value: number): boolean {
    const lc = this.$input.parentNode.querySelector('[data-length]')
    const inputLength = this.$input.value.trim().length
    const diff = value - inputLength
    lc && (lc.innerHTML = diff.toString())
    if (inputLength > value) {
      return false
    }
    return true
  }
}
