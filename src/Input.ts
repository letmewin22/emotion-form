import {Textarea, TTA} from './Textarea'
import {Validation} from './Validation/Validation'
import {data} from './formData'

export class Input {
  textarea: TTA

  constructor(readonly $input: HTMLInputElement) {}

  init(): void {
    this.bounds()
    this.$input.addEventListener('focus', this.focus)
    this.$input.addEventListener('blur', this.blur)
    this.$input.addEventListener('input', this.change)

    if (this.$input.tagName === 'TEXTAREA') {
      this.textarea = new Textarea(this.$input)
    }
  }

  bounds(): void {
    const methods = ['change', 'focus', 'blur']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  change(): void {
    this.validate()
    data[this.$input.name].value = this.$input.value
  }

  focus(): void {
    this.$input.focus()
    this.$input.classList.add('js-focus')
    document.body.classList.add('e-fixed')
  }

  blur(): void {
    if (!this.$input.value.trim().length) {
      this.$input.blur()
      this.$input.classList.remove('js-focus')
    }
    this.$input.classList.remove('error')
    document.body.classList.remove('e-fixed')
  }

  validate(): boolean {
    const validation = this.$input.dataset.validation

    if (validation) {
      const v = new Validation(this.$input, validation)

      if (!v.init()) {
        this.$input.classList.add('error')
        data[this.$input.name].validation = false
        return false
      }

      this.$input.classList.remove('error')
      data[this.$input.name].validation = true
      return true
    }
    return true
  }

  destroy(): void {
    this.$input.removeEventListener('focus', this.focus)
    this.$input.removeEventListener('blur', this.blur)
    this.$input.removeEventListener('input', this.change)
    if (this.$input.tagName === 'TEXTAREA') {
      this.textarea && this.textarea.destroy()
    }
  }
}

export type TInput = typeof Input.prototype
