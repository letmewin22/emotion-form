import { TInput } from './Input';
import { TLoader } from './Loader';
import { TOpts } from './TOpts';
interface IData {
    [key: string]: string;
}
export declare class FormSend {
    readonly $form: HTMLFormElement;
    readonly opts: TOpts;
    inputsInstance: TInput[];
    loader: TLoader;
    data: IData;
    inputInstance: any[];
    constructor($form: HTMLFormElement, opts: TOpts);
    private init;
    protected success(): void;
    protected error(): void;
    protected requestSend(): Promise<any>;
    protected submit(e: Event): void;
    focusFirstFailedInput(arr: Array<boolean>): void;
    protected reset(): void;
}
export {};
