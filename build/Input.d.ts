export declare class Input {
    readonly $input: HTMLInputElement;
    constructor($input: HTMLInputElement);
    private init;
    change(): void;
    focus(): void;
    blur(): void;
    validate($el: HTMLInputElement): boolean;
    destroy(): void;
}
