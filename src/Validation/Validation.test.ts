/* eslint-disable no-undef */
import {Validation} from './Validation'

describe('Validation init', () => {
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    const v = new Validation($input, 'notEmpty')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = '12345'
    const v = new Validation($input, 'minlength(4)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "notEmtpy"', () => {
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = ''
    const v = new Validation($input, 'notEmpty')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = 't'
    const v = new Validation($input, 'notEmpty')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "phone"', () => {
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = ''
    const v = new Validation($input, 'phone')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "minlength"', () => {
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = '1234'
    const v = new Validation($input, 'minlength(5)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = '12345'
    const v = new Validation($input, 'minlength(5)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "email"', () => {
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = 'test'
    const v = new Validation($input, 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = 'test@gmail.comd'
    const v = new Validation($input, 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = 'test.gmail.com'
    const v = new Validation($input, 'email)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = 'test@gmail.com'
    const v = new Validation($input, 'email)')
    expect(v.init()).toBe(true)
  })
})

describe('Validation "maxlength"', () => {
  test('should return false', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = '1234567'
    const v = new Validation($input, 'maxlength(6)')
    expect(v.init()).toBe(false)
  })
  test('should return true', () => {
    const $input: HTMLInputElement = document.createElement('input')
    $input.value = '123456'
    const v = new Validation($input, 'maxlength(6)')
    expect(v.init()).toBe(true)
  })
})
