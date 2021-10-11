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
}
