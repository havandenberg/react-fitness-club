import * as moment from 'moment';
import { dobField } from '../types/user';

export const isValidEmail = (email: string) =>
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
    email,
  );

export const isValidPhone = (phone: string) =>
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);

export const isValidPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password);

export const isValidZipCode = (zip: string) => /^(\d{5})/.test(zip);

export const isValidZipCodeField = (zip: string) => /^\d{0,5}$/.test(zip);

export const isNumber = (value: string) => /^\d+$/.test(value);

export const containsLowercase = (password: string) =>
  /^(?=.*[a-z])/.test(password);

export const containsUppercase = (password: string) =>
  /^(?=.*[A-Z])/.test(password);

export const containsNumber = (password: string) =>
  /^(?=.*[0-9])/.test(password);

export const enoughCharacters = (password: string) =>
  /^(?=.{8,})/.test(password);

export const maxLength = (value: string, max: number) => value.length <= max;

export const isValidDOBField = (value: string, field: dobField) =>
  (isNumber(value) || value === '') && isValidDOBLength(value, field);

export const isValidDOBLength = (value: string, field: dobField) => {
  switch (field) {
    case 'month':
      return value.length <= 2;
    case 'day':
      return value.length <= 2;
    case 'year':
      return value.length <= 4;
    default:
      return false;
  }
};

export const isUnderEighteen = (age: string) =>
  moment().diff(moment(age, 'YYYYMMDD'), 'years') < 18;
