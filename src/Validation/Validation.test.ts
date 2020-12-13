import {Validation} from './Validation'

const newValidation = (inputValue: string, validationType: string) => {
  const $input: HTMLInputElement = document.createElement('input')
  $input.value = inputValue
  return new Validation($input, validationType)
}

describe('Validation init', () => {
  test('should return false', () => {
    const v = newValidation('', 'notEmpty')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const v = newValidation('12345', 'minlength(4)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "notEmtpy"', () => {
  test('should return false', () => {
    const v = newValidation('', 'notEmpty')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const v = newValidation('t', 'notEmpty')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "phone"', () => {
  test('should return true', () => {
    const v = newValidation('', 'phone')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "minlength"', () => {
  test('should return false', () => {
    const v = newValidation('1234', 'minlength(5)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const v = newValidation('12345', 'minlength(5)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "email"', () => {
  test('should return false', () => {
    const v = newValidation('test', 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return false', () => {
    const v = newValidation('test@gmail.comd', 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return false', () => {
    const v = newValidation('test.gmail.com', 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const v = newValidation('test@gmail.com', 'email)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "maxlength"', () => {
  test('should return false', () => {
    const v = newValidation('1234567', 'maxlength(6)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const v = newValidation('123456', 'maxlength(6)')
    expect(v.init()).toBe(true)
  })
})
