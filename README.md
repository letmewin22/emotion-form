# What is this?
This is a package for convenient work with forms: validation of inputs, sending to the server

# Instalation

`npm i @emotionagency/form`

or

`yarn add @emotionagency/form`

# Usage

## Initialization

```
import Form from '@emotionagency/form'

  const form = new Form('selector', {
    URL: 'URL to send form data'
    onSuccess: callback on success form send
    onError: callback if sent was failed
  })
```

You can add focus for some of the inputs

```
form.addFocus(input number)
```

## HTML markup

**! You can change any classes, but you can't change structure and data-attributes**

```
 <form id="form" data-error="Some error" class="form" novalidate>
    <div class="input-container form__input-container">
      <input 
        data-input 
        data-validation="notEmpty" 
        type="text" class="input form__input" 
        name="Name" 
        id="name"
      >
      <label class="label form__label" for="name">Name</label>
      <div class="input-validate form__input-validate">Error text</div>
    </div>
    <button class="btn form__btn">Send</button>
  </form>
```

Inputs have 5 validation options: notEmpty, minlength, maxlength, phone with normalize and email

### Inputs examples

###### notEmpty

```
  <div class="input-container form__input-container">
      <input 
      data-input 
      data-validation="notEmpty" 
      type="text" 
      class="input form__input" 
      name="Name" 
      id="name"
      >
      <label class="label form__label" for="name">Name</label>
      <div class="input-validate form__input-validate">The field must not be empty</div>
    </div>
```
###### phone

You can also combine several validation rules

```
 <div class="input-container form__input-container">
      <input 
      data-input 
      data-validation="minlength(4) phone" 
      type="tel" 
      class="input form__input" 
      name="Phone" 
      id="tel"
      >
      <label class="label form__label" for="tel">Phone</label>
      <div class="input-validate form__input-validate">Incorrect number</div>
    </div>
```

###### email

```
    <div class="input-container form__input-container">
      <input 
      data-input 
      data-validation="email" 
      type="email" 
      class="input form__input" 
      name="Email" 
      id="email"
      >
      <label class="label form__label" for="email">Email</label>
      <div class="input-validate form__input-validate">Incorrect Email</div>
    </div>
```

###### minlength

```
 <div class="input-container form__input-container">
      <input 
      data-input 
      data-validation="minlength(8)" 
      type="text" 
      class="input form__input" 
      name="Name" 
      id="name"
      >
      <label class="label form__label" for="name">Name</label>
      <div class="input-validate form__input-validate">Minimum length 8 characters</div>
    </div>
```

###### maxlength
Along with this, you can use a countdown counter
```
    <div class="input-container form__input-container">
      <textarea 
      data-input 
      data-validation="maxlength(40)" 
      type="text" 
      class="input form__input" 
      name="Message" 
      id="text"
      >
      </textarea>
      <label class="label form__label" for="adress">Message</label>
      <div data-length class="length-counter form__length-counter">40</div>
      <div class="input-validate form__input-validate">Exceeded maximum length</div>
    </div>
```

## Recomended Styles

```
$accent: #2e54b7;
$red: #e73737;

.form {
  margin: 0 auto;
  margin-top: 60px;
  width: 800px;
  position: relative;
  &.loading {
    .form__btn-text {
      opacity: 0;
      visibility: hidden;
    }
    .form__btn-loader {
      opacity: 1;
      visibility: visible;
    }
  }
}

.input-container {
  position: relative;
  width: 100%;
  margin-top: 80px;
}

.input {
  background-color: transparent;
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  line-height: 1em;
  font-size: inherit;
  transition: border-color 0.3s ease;
  &:focus,
  &.js-focus {
    border-color: $accent;
    ~ .label {
      transform: translateY(-20px);
      font-size: 14px;
      color: $accent;
    }
  }
  &.error {
    border-color: $red;
    ~ .input-validate {
      opacity: 1;
      visibility: visible;
    }
    ~ .label {
      color: $red;
    }
  }
}

.label {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1em;
  pointer-events: none;
  transition: font-size 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.input-validate {
  color: $red;
  font-size: 14px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  position: absolute;
}

.form__btn {
  float: right;
  margin-top: 40px;
  background-color: $accent;
  color: white;
  padding: 20px 40px;
  position: relative;
  transition: opacity 0.2s ease;
  &:hover,
  &:focus {
    .btn__overlay {
      transform: translateY(0%);
      border-radius: 0%;
    }
  }
}

.form__length-counter {
  position: absolute;
  right: 0;
  font-size: 14px;
}

textarea {
  border: none;
  resize: none;
  border-radius: 0;
  line-height: normal;
  overflow-y: hidden;
  padding: 0px;
  margin: 0;
  min-height: 3rem;
  outline: none;
  padding-top: 10px;
}

//Reset autofill styles
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: black;
  box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}
```