type TInputsValues = {
  value: string
  validation: boolean
}

export interface IData {
  [key: string]: TInputsValues
}

export const data: IData = {}
