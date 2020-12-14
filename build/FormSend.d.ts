import { TEM } from './ErrorMessage';
import { TInput } from './Input';
import { TSendData } from './SendData';
import { TOpts } from './TOpts';
export declare class FormSend {
    readonly $form: HTMLFormElement;
    readonly opts: TOpts;
    inputsInstance: TInput[];
    em: TEM;
    sd: TSendData;
    inputInstance: any[];
    constructor($form: HTMLFormElement, opts: TOpts);
    private init;
    protected success(): void;
    protected error(): void;
    protected requestSend(): Promise<any>;
    protected submit(e: Event): void;
    focusFirstFailedInput(arr: boolean[]): void;
    protected reset(): void;
    destroy(): void;
}
export declare type TFormSend = typeof FormSend.prototype;
