export declare class Loader {
    readonly $form: HTMLFormElement;
    constructor($form: HTMLFormElement);
    showLoader(): void;
    hideLoader(): void;
}
export declare type TLoader = typeof Loader.prototype;
