export declare class Validation {
    readonly $input: HTMLInputElement;
    readonly options: string;
    constructor($input: HTMLInputElement, options: string);
    init(): boolean;
    notEmpty(string: string): boolean;
    phone(string: string): boolean;
    minlength(string: string, value: number): boolean;
    email(string: string): boolean;
    maxlength(string: string, value: number): boolean;
}
