import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

export class ReactiveFormsHelpers {
  /**
   * Return a given AbstractControl as FormControl.
   *
   * @param {AbstractControl} control
   * @returns {FormControl}
   */
  static getAsFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  /**
   * Return given AbstractControl as FormArray.
   *
   * @param {AbstractControl} control
   * @returns {FormArray}
   */
  static getAsFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }

  /**
   * Return given AbstractControl as FormGroup.
   *
   * @param {AbstractControl} control
   * @returns {FormGroup}
   */
  static getAsFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  /**
   * Returns the name of the control, if it has a parent.
   *
   * @param {AbstractControl} control
   * @throws Error
   * @returns string
   */
  static getFormControlName(control: AbstractControl): string {
    let parent = control.parent;
    let name = '';

    if (!parent) {
      throw Error('Control has no parent');
    }

    Object.entries(parent.controls).forEach((entry: [string, AbstractControl]) => {
      if (entry[1] === control) {
        name = entry[0];
      }
    });

    return name;
  }

  /**
   * Returns an object as myForm.value would do, but only containing the values of the FormControls that has Validator.required.
   *
   * @param {AbstractControl} control
   * @returns object
   */
  static getRequiredValues(control: AbstractControl): object {
    let value: {[key: string]: any} = {};

    switch (true) {
      case control instanceof FormArray && ReactiveFormsHelpers.hasRequiredChildren(control):
        let array: {[key: string]: any} = [];

        ReactiveFormsHelpers.getAsFormArray(control).controls.forEach((arrayControl: AbstractControl) => {
          if (arrayControl instanceof FormControl && !ReactiveFormsHelpers.isRequired(arrayControl)) {
            return;
          }

          array.push(ReactiveFormsHelpers.getRequiredValues(arrayControl));
        });
        return array;
      case control instanceof FormControl:
        if (ReactiveFormsHelpers.isRequired(ReactiveFormsHelpers.getAsFormControl(control))) {
          return control.value;
        }
        break;
      case control instanceof FormGroup && ReactiveFormsHelpers.hasRequiredChildren(control):
        Object.entries(ReactiveFormsHelpers.getAsFormGroup(control).controls).forEach((groupControl: [string, AbstractControl]) => {
          if (groupControl[1] instanceof FormControl && !ReactiveFormsHelpers.isRequired(groupControl[1])) {
            return;
          }

          value[groupControl[0]] = ReactiveFormsHelpers.getRequiredValues(groupControl[1]);
        });
        break;
    }

    return value;
  }

  /**
   * Returns true if the passed FormGroup or FormArray has FormControls that are required.
   *
   * @param {FormControl|FormArray} control
   * @returns boolean
   */
  static hasRequiredChildren(control: FormGroup|FormArray): boolean {
    let hasRequiredChildren = false;

    Object.values(control.controls).forEach((ctrl: AbstractControl) => {
      if (ctrl instanceof FormControl && ReactiveFormsHelpers.isRequired(ctrl)) {
        hasRequiredChildren = true;
      } else if ((ctrl instanceof FormArray || ctrl instanceof FormGroup) && ReactiveFormsHelpers.hasRequiredChildren(ctrl)) {
        hasRequiredChildren = true;
      }
    });

    return hasRequiredChildren;
  }

  /**
   * Alias for myControl.hasValidator(Validators.required).
   *
   * @param {FormControl} control
   * @returns boolean
   */
  static isRequired(control: FormControl): boolean {
    return control.hasValidator(Validators.required);
  }
}
