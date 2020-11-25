import { Validator, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PasswordMatchVaildator implements Validator {

  validate(formGroup: FormGroup) {
    const { password, confirmationPassword } = formGroup.value;

    if (password === confirmationPassword) {
      return null;
    } else {
      return { noMatchingPassword: true };
    }
  }
  
}