import { AbstractControl, ValidatorFn } from "@angular/forms";

export function confirmPasswordMatch(password: string): ValidatorFn {
  return (control: AbstractControl) => {
    // const confirmPass
    const confirmPassword = control.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {unMatchedPassword: `Password didn't match`};
    }

    return null;
  }
}
