import {Loader, TLoader} from './Loader'
import {TSendOptions} from './TSendOptions'

export class SendData {
  loader: TLoader
  constructor(readonly opts: TSendOptions, readonly $form: HTMLFormElement) {
    this.loader = new Loader($form)
  }

  async fetchData(url: string, formData: FormData): Promise<any> {
    this.loader.showLoader()
    try {
      return await fetch(url, {
        method: 'POST',
        body: formData
      })
    } catch (e) {
      console.log(e)
    } finally {
      this.loader.hideLoader()
    }
  }

  async stringUrl(url: string, formData: FormData): Promise<any> {
    const res = await this.fetchData(url, formData)

    if (res.status >= 200 && res.status < 400) {
      this.opts.success()
      return
    } else {
      this.opts.error()
    }
  }

  async arrayUrls(urls: string[], formData: FormData): Promise<any> {
    const p = urls.map(url => {
      return this.fetchData(url, formData)
    })

    const res = await Promise.all(p)
    if (res.filter(r => r.status >= 200 && r.status < 400).length) {
      this.opts.success()
      return
    } else {
      this.opts.error()
    }
  }
}

export type TSendData = typeof SendData.prototype
