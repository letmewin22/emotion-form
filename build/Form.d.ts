import { TFormSend } from './FormSend';
import { TInput } from './Input';
import { TOpts } from './TOpts';
export declare class Form {
    readonly formSelector: string;
    readonly opts: TOpts;
    $form: HTMLFormElement;
    $inputs: NodeListOf<HTMLInputElement>;
    formSend: TFormSend;
    inputsInstances: TInput[];
    constructor(formSelector: string, opts: TOpts);
    private init;
    addFocus(idx: number): void;
    destroy(): void;
}
