import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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
   *
   * @param ctrl
   */
  static getFormControlName(ctrl: AbstractControl): string {
    let parent = ctrl.parent;
    let name = '';

    if (!parent) {
      throw Error('Control has no parent');
    }

    Object.entries(parent.controls).forEach((entry: [string, AbstractControl]) => {
      if (entry[1] === ctrl) {
        name = entry[0];
      }
    });

    return name;
  }

  /**
   *
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
   *
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
   *
   */
  static isRequired(control: FormControl): boolean {
    return control.hasValidator(Validators.required);
  }
}
