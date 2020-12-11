import { Validator, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PasswordMatchVaildator implements Validator {

  validate(formGroup: FormGroup) {
    const { password, confirmationPassword } = formGroup.value;

    if (password === confirmationPassword) {
      if(password.match(/[A-Z]/gi) && password.match(/\d/g) && ((password.match(/\W/g) || []).length > (password.match(/\s/g) || []).length) ){
        return null;
      }else{
        return { noSpecialNumberOrLetterCharacters : true };
      }
    } else {
      return { noMatchingPassword: true };
    }
  }
  
}