import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

export class ReactiveFormsValidators {
  /**
   * TODO: Set angular dependency on Angular < 12.2 to have functions available for dynamically adding (and removing?) validators
   * https://github.com/angular/angular/issues/13461#issuecomment-885052770
   */
  static requiredIfMatchValidator(dependentControl: AbstractControl, matchValue: any): ValidatorFn {
    return ((control: AbstractControl) => {
      dependentControl.valueChanges.pipe(
        tap((value) => {
          if (value === matchValue) {
            // TODO: Check that this does not this overwrite
            console.log(control.validator);
            control.setValidators([Validators.required])
            control.updateValueAndValidity();
          } else {
            // TODO: Reset just required if possible
            control.clearValidators();
            control.updateValueAndValidity();
          }
        })
      ).subscribe();

      // First run
      if (control.value === matchValue) {
        return {required: true}
      }

      return null;
    });
  }
}
