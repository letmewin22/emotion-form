import { TTA } from './Textarea';
export declare class Input {
    readonly $input: HTMLInputElement;
    textarea: TTA;
    constructor($input: HTMLInputElement);
    init(): void;
    bounds(): void;
    change(): void;
    focus(): void;
    blur(): void;
    validate(): boolean;
    destroy(): void;
}
export declare type TInput = typeof Input.prototype;
