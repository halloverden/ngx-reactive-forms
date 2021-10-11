import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export class ReactiveFormsHelpers {
  /**
   * Return a given AbstractControl as FormControl.
   *
   * @param {AbstractControl} ctrl
   * @returns {FormControl}
   */
  static getAsFormControl(ctrl: AbstractControl): FormControl {
    return ctrl as FormControl;
  }

  /**
   * Return given AbstractControl as FormArray.
   *
   * @param {AbstractControl} ctrl
   * @returns {FormArray}
   */
  static getAsFormArray(ctrl: AbstractControl): FormArray {
    return ctrl as FormArray;
  }

  /**
   * Return given AbstractControl as FormGroup.
   *
   * @param {AbstractControl} ctrl
   * @returns {FormGroup}
   */
  static getAsFormGroup(ctrl: AbstractControl): FormGroup {
    return ctrl as FormGroup;
  }

  /**
   * Checks if a control has a given error.
   * TODO: Check what control.validator does
   * TODO: Changed it from passing New Control to passing the actual control.
   */
  static hasError(control: AbstractControl, error: string): boolean {
    let errors: any = control.validator && control.validator(control);
    return errors !== null && !!errors[error];
  }

  /**
   * Checks if a control is required. Alias for hasError(myControl, 'required'')
   */
  static isRequired(control: AbstractControl): boolean {
    return ReactiveFormsHelpers.hasError(control, 'required');
  }
}
