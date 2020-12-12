export class Loader {
  constructor(readonly $form: HTMLFormElement) {}

  showLoader(): void {
    this.$form.classList.add('loading')
  }

  hideLoader(): void {
    this.$form.classList.remove('loading')
  }
}

export type TLoader = typeof Loader.prototype
