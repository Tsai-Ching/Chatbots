import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function passwordValidator(): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const allow = !control.value ||
//       /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z]))(?=^\S*$).{8,20}\b/.test(control.value);
//     return !allow ? { wrongPasswordFomat: {value: control.value} } : null;
//   };
// }

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) {
      return null; // 如果是空值，由 required 驗證器來處理
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    // const validLength = password.length >= 9;

    const errors: ValidationErrors = {};
    if (!hasLowerCase) {
      errors['missingLowerCase'] = true;
    }
    if (!hasNumber) {
      errors['missingNumber'] = true;
    }
    // if (!validLength) {
    //   errors['invalidLength'] = true;
    // }

    return Object.keys(errors).length ? errors : null;
  };
}
