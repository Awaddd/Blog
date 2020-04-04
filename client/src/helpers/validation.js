import { extend } from 'vee-validate';
import { required, email, confirmed, min, max } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} cannot be empty'
});

extend('email', {
  ...email,
  message: '{_field_} must be a valid email'
});

extend('min', {
  ...min,
  message: '{_field_} is too short'
});

extend('max', {
  ...max,
  message: '{_field_} is too long'
});

extend('confirmed', {
  ...confirmed,
  message: '{_field_}s do not match'
});