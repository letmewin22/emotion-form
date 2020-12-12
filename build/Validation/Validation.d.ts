export declare class Validation {
    readonly $input: HTMLInputElement;
    readonly options: string;
    constructor($input: HTMLInputElement, options: string);
    init(): boolean;
    notEmpty(): boolean;
    phone(): boolean;
    minlength(value: number): boolean;
    email(): boolean;
    maxlength(value: number): boolean;
}
