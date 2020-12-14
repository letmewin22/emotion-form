declare type TFunc = () => void;
export declare class Textarea {
    readonly $textarea: HTMLInputElement;
    constructor($textarea: HTMLInputElement);
    observe(element: HTMLInputElement, event: string, handler: TFunc): void;
    unsubscribe(element: HTMLInputElement, event: string, handler: TFunc): void;
    private init;
    resize(): void;
    delayedResize(): void;
    destroy(): void;
}
export declare type TTA = typeof Textarea.prototype;
export {};
