import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    static checkForWhiteSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.length){
            let isOnlyWhitespace = (control.value || '').trim().length === 0;
            let isValid = !isOnlyWhitespace;
            return isValid ? null : { 'onlyWhitespace': true}
        }
        return null;
    }
}