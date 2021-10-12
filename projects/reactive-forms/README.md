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

## Validators

### requiredIfMatchValidator(requiredControls: string[], matchValue: any): ValidatorFn

Adds the required validator to the passed controllers (by name reference) if controller value w/ validator matches given value.
> **_NOTE:_**  The requiredControls needs to be siblings to the control you put the validator on. This is a great PR opportunity if you're looking.

```typescript
const myControl = new FormControl(null, [Validators.required]);

const myFormGroup = new FormGroup({
  myControl,
  yourControl: new FormControl()
});

myControl.addValidators([ReactiveFormsValidators.requiredIfMatchValidator(['yourControl'], 'myValue')]);
```

## License
MIT © [Hallo Verden](https://github.com/halloverden)

## Change log

### 1.0.0
- Initial version
