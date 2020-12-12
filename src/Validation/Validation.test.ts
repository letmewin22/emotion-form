import {Validation} from './Validation'

const $input: HTMLInputElement = document.createElement('input')

const v = new Validation($input, '')

describe('Validation init', () => {
  test('should return false', () => {
    const v2 = new Validation($input, 'notEmpty')
    expect(v2.init()).toBe(false)
  })
  test('should return true', () => {
    const $input2: HTMLInputElement = document.createElement('input')
    $input2.value = '1234'
    const v2 = new Validation($input2, 'minlength(4)')
    expect(v2.init()).toBe(true)
  })
})

describe('Validation "notEmtpy"', () => {
  test('should return false', () => {
    expect(v.notEmpty('')).toBe(false)
  })
  test('should return true', () => {
    expect(v.notEmpty('t')).toBe(true)
  })
})

describe('Validation "phone"', () => {
  test('should return true', () => {
    expect(v.phone('')).toBe(true)
  })
})

describe('Validation "minlength"', () => {
  test('should return false', () => {
    expect(v.minlength('1234', 5)).toBe(false)
  })
  test('should return true', () => {
    expect(v.minlength('12345', 5)).toBe(true)
  })
})

describe('Validation "email"', () => {
  test('should return false', () => {
    expect(v.email('test')).toBe(false)
  })
  test('should return false', () => {
    expect(v.email('test@gmail.comd')).toBe(false)
  })
  test('should return false', () => {
    expect(v.email('test.gmail.com')).toBe(false)
  })
  test('should return true', () => {
    expect(v.email('test@gmail.com')).toBe(true)
  })
})

describe('Validation "maxlength"', () => {
  test('should return false', () => {
    expect(v.maxlength('1234567', 6)).toBe(false)
  })
  test('should return true', () => {
    expect(v.maxlength('123456', 6)).toBe(true)
  })
})
