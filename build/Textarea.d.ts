declare type TFunc = () => void;
export declare class Textarea {
    readonly $textarea: HTMLInputElement;
    constructor($textarea: HTMLInputElement);
    observe(element: HTMLInputElement, event: string, handler: TFunc): void;
    private init;
    resize(): void;
}
export {};
