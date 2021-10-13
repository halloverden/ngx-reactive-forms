# NgxReactiveForms

A collection of helper methods and validators to help you when dealing with [Angular reactive forms](https://angular.io/guide/reactive-forms).

## Helpers

### getAsFormArray(control: AbstractControl): FormArray
Takes an `AbstractControl` and returns it as a `FormArray`.

### getAsFormControl(control: AbstractControl): FormControl
Takes an `AbstractControl` and returns it as a `FormControl`.

### getAsFormGroup(control: AbstractControl): FormGroup
Takes an `AbstractControl` and returns it as a `FormGroup`.

### getRequiredValues(control: AbstractControl): object
Returns an `object` as `myForm.value` would do, but only containing the values of the `FormControls` that has `Validator.required`.
> **_NOTE:_** The helper only considers Validator.required on FormControls, not on FormGroups or FormArrays.

### getFormControlName(control: AbstractControl): string
Returns the name of the control. Throws error if control has no parent.
> **_NOTE:_** The control MUST have a parent.

### hasRequiredChildren(control: FormGroup|FormArray): boolean
Returns true if the passed `FormGroup` or `FormArray` has `FormControls` that are required.

### isRequired(control: FormControl): boolean
Alias for `myControl.hasValidator(Validators.required);`.

## Validators

### requiredIfMatchValidator(requiredControls: string[], matchValue: any): ValidatorFn

Adds the required validator to the passed controllers (by name reference) if controller value w/ validator matches given value.
> **_NOTE:_** The requiredControls need to be siblings to the control you put the validator on.  
> :trophy: This is a great PR opportunity if you're looking.

```typescript
const myControl = new FormControl(null, [Validators.required]);

const myFormGroup = new FormGroup({
  myControl,
  yourControl: new FormControl()
});

myControl.addValidators([ReactiveFormsValidators.requiredIfMatchValidator(['yourControl'], 'someValue')]);
```

## License
MIT © [Hallo Verden](https://github.com/halloverden)

## Change log

### 1.0.0
- Initial version
