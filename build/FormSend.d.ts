import { TOpts } from './TOpts';
export declare class FormSend {
    readonly $form: HTMLFormElement;
    readonly opts: TOpts;
    inputsInstance: Array<any>;
    data: any;
    inputInstance: any[];
    constructor($form: HTMLFormElement, opts: TOpts);
    private init;
    showLoader(): void;
    hideLoader(): void;
    protected success(): void;
    protected error(): void;
    protected requestSend(): Promise<any>;
    protected submit(e: Event): void;
    focusFirstFailedInput(arr: Array<boolean>): void;
    protected reset(): void;
}
