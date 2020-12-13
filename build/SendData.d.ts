import { TLoader } from './Loader';
import { TSendOptions } from './TSendOptions';
export declare class SendData {
    readonly opts: TSendOptions;
    readonly $form: HTMLFormElement;
    loader: TLoader;
    constructor(opts: TSendOptions, $form: HTMLFormElement);
    fetchData(url: string, formData: FormData): Promise<any>;
    stringUrl(url: string, formData: FormData): Promise<any>;
    arrayUrls(urls: string[], formData: FormData): Promise<any>;
}
export declare type TSendData = typeof SendData.prototype;
