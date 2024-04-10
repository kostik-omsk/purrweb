export default function useForm() {
  const FORM = document.querySelector('.form');
  const SUCCESS = document.querySelector('.success');
  const NAME_INPUT = document.querySelector('#name');
  const MAIL_INPUT = document.querySelector('#email');
  const PHONE_INPUT = document.querySelector('#phone');
  const SUBMIT_BUTTON = document.querySelector('.form__button');

  function validateField(block, value) {
    const isValid = value.length > 0;

    if (isValid) {
      handleValidField(block);
      return true;
    } else {
      handleInvalidField(block, 'This field is required.');
      return false;
    }
  }

  function validatePhone(block, value) {
    const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const isValid = PHONE_REGEX.test(value);

    if (isValid) {
      handleValidField(block);
      return true;
    } else {
      handleInvalidField(block, 'Please, use +7 (999) 999-99-99 format.');
      return false;
    }
  }

  function handleValidField(block) {
    if (block.classList.contains('_error')) {
      block.classList.remove('_error');
      SUBMIT_BUTTON.disabled = false;
      errorMessage(block);
    }
  }

  function handleInvalidField(block, message) {
    block.classList.add('_error');
    errorMessage(block, message);
    SUBMIT_BUTTON.disabled = true;
  }

  function errorMessage(block, message) {
    const parent = block.parentNode;

    if (!message) {
      parent.querySelector('.form__error').remove();
      return;
    }

    if (parent.querySelector('.form__error')) {
      parent.querySelector('.form__error').remove();
    }
    const error = document.createElement('p');
    error.classList.add('form__error');
    error.textContent = message;
    parent.append(error);
  }

  NAME_INPUT.addEventListener('input', (event) => {
    const value = event.target.value;
    validateField(NAME_INPUT, value);
  });

  MAIL_INPUT.addEventListener('input', (event) => {
    const value = event.target.value;
    validateField(MAIL_INPUT, value);
  });

  PHONE_INPUT.addEventListener('input', (event) => {
    let value = event.target.value;
    validateField(PHONE_INPUT, value);
    validatePhone(PHONE_INPUT, value);
  });

  PHONE_INPUT.addEventListener('keydown', (event) => {
    let key = event.key;
    let value = event.target.value;
    const isNumber = /^\d$/.test(key);

    if (isNumber || 'Backspace' === key) {
      if ('Backspace' != key) {
        if (value.length < 4 || value === '') {
          event.target.value = '+7 (';
        }
        if (value.length === 7) {
          event.target.value = value + ') ';
        }
        if (value.length === 12) {
          event.target.value = value + '-';
        }
        if (value.length === 15) {
          event.target.value = value + '-';
        }
      }
    } else {
      event.preventDefault();
    }
  });

  PHONE_INPUT.addEventListener('focus', (event) => {
    const value = event.target.value;
    if (!value) {
      event.target.value = '+7 (';
    }
  });

  FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const isName = validateField(NAME_INPUT, data.name);
    const isMail = validateField(MAIL_INPUT, data.email);
    const isPhone = validateField(PHONE_INPUT, data.phone) && validatePhone(PHONE_INPUT, data.phone);

    if (isName && isMail && isPhone) {
      try {
        console.log('send', data);
      } catch (error) {
        console.log('error', error);
      } finally {
        FORM.reset();
        FORM.classList.add('none');
        SUCCESS.classList.remove('none');
      }
    }
  });
}
