export declare class ErrorMessage {
    readonly $form: HTMLFormElement;
    $error: HTMLElement;
    constructor($form: HTMLFormElement);
    get computeHeight(): string;
    show(): void;
    hide(): void;
    destroy(): void;
}
export declare type TEM = typeof ErrorMessage.prototype;
