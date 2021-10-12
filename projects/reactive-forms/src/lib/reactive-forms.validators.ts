import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';

export class ReactiveFormsValidators {
  /**
   *
   */
  static requiredIfMatchValidator(requiredControls: string[], matchValue: any): ValidatorFn {
    return ((control: AbstractControl) => {
      requiredControls.forEach((requiredControl: string) => {
        const requiredControlInstance = control.parent?.get(requiredControl) as FormControl;

        if (!requiredControlInstance) {
          return;
        }

        if (control.value === matchValue) {
          requiredControlInstance.addValidators([Validators.required]);
          requiredControlInstance.updateValueAndValidity();
        } else {
          requiredControlInstance.removeValidators([Validators.required]);
          requiredControlInstance.updateValueAndValidity();
        }
      })

      return null;
    });
  }
}
