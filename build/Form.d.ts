import { TOpts } from './TOpts';
export declare class Form {
    readonly formSelector: string;
    readonly opts: TOpts;
    $form: HTMLFormElement;
    $inputs: NodeListOf<HTMLInputElement>;
    formSend: any;
    constructor(formSelector: string, opts: TOpts);
    private init;
    addFocus(idx: number): void;
}
