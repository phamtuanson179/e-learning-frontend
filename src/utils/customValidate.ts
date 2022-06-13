import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const IPValidate =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let checkError = false;
    if (value && value.indexOf('.') != -1) {
      const arr = value.split('.');
      if (arr.length != 4) checkError = true;
      for (let p of arr) {
        if (p.length > 3 || p.length <= 0 || (p.length > 1 && p[0] == '0'))
          checkError = true;
        for (let c of p) {
          if (isNaN(c)) checkError = true;
        }
        let num = parseInt(p);
        if (num < 0 || num > 255) checkError = true;
      }
    } else checkError = true;
    return checkError ? { checkIP: true } : null;
  };

export const MinAmountElementsInArrayValidate =
  (min: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let checkError = false;
    if (value) {
      if (min && value.length < min) {
        checkError = true;
      }
    } else checkError = true;
    return checkError ? { checkMin: true } : null;
  };

export const MaxAmountElementsInArrayValidate =
  (max: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let checkError = false;
    if (value) {
      if (max && value.length > max) {
        checkError = true;
      }
    } else checkError = true;
    return checkError ? { checkMax: true } : null;
  };

export const ExactlyAmountElementsInArrayValidate =
  (amount: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let checkError = false;
    if (value) {
      if (amount && value.length != amount) {
        checkError = true;
      }
    } else checkError = true;
    return checkError ? { checkAmount: true } : null;
  };
