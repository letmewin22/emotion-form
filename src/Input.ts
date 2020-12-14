import Bind from './decorators/@Bind'
import {Textarea} from './Textarea'
import {Validation} from './Validation/Validation'
import {data} from './formData'

export class Input {
  constructor(readonly $input: HTMLInputElement) {
    this.init()
  }

  private init(): void {
    this.$input.addEventListener('focus', this.focus)
    this.$input.addEventListener('blur', this.blur)
    this.$input.addEventListener('input', this.change)

    if (this.$input.tagName === 'TEXTAREA') {
      new Textarea(this.$input)
    }
  }

  @Bind
  change(): void {
    this.validate(this.$input)
    data[this.$input.name] = this.$input.value
  }

  @Bind
  focus(): void {
    this.$input.focus()
    this.$input.classList.add('js-focus')
    document.body.classList.add('e-fixed')
  }

  @Bind
  blur(): void {
    if (!this.$input.value.trim().length) {
      this.$input.blur()
      this.$input.classList.remove('js-focus')
    }
    this.$input.classList.remove('error')
    document.body.classList.remove('e-fixed')
  }

  validate($el: HTMLInputElement): boolean {
    const validation = $el.dataset.validation

    if (validation) {
      const v = new Validation($el, validation)

      if (!v.init()) {
        $el.classList.add('error')
        return false
      }

      $el.classList.remove('error')
      return true
    }
  }

  destroy(): void {
    this.$input.removeEventListener('focus', this.focus)
    this.$input.removeEventListener('blur', this.blur)
    this.$input.removeEventListener('input', this.change)
  }
}

export type TInput = typeof Input
