declare type TInputsValues = {
    value: string;
    validation: boolean;
};
export interface IData {
    [key: string]: TInputsValues;
}
export declare const data: IData;
export {};
