# NgxReactiveForms

A collection of helper methods and validators to help you when dealing with [Angular reactive forms](https://angular.io/guide/reactive-forms).

## Helpers

### getAsFormArray(control: AbstractControl): FormArray
Takes an `AbstractControl` and returns it as a `FormArray`.

```typescript
const myFormArray: FormArray = ReactiveFormsHelpers.getAsFormArray(control);
```

### getAsFormControl(control: AbstractControl): FormControl
Takes an `AbstractControl` and returns it as a `FormControl`.

```typescript
const myFormControl: FormControl = ReactiveFormsHelpers.getAsFormControl(control);
```

### getAsFormGroup(control: AbstractControl): FormGroup
Takes an `AbstractControl` and returns it as a `FormGroup`.

```typescript
const myFormGroup: FormGroup = ReactiveFormsHelpers.getAsFormGroup(control);
```

### hasError(control: AbstractControl, error: string): boolean
Checks if a control has a given error.

### isRequired(control: AbstractControl): boolean
Checks if a control is required. Alias for hasError(myControl, 'required'').


## Validators

### requiredIfMatchValidator(dependentControl: AbstractControl, matchValue: any): ValidatorFn

Renders the FormControl required if the value of a `dependentControl` matches a given `matchValue`.

```typescript
FormControl.setValidators([ReactiveFormsValidators.requiredIfMatchValidator(dependentControl, true)]);
```

## License
MIT © [Hallo Verden](https://github.com/halloverden)

## Change log

### 1.0.0
- Initial version
