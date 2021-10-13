import {Component, OnInit} from '@angular/core';
import {ReactiveFormsHelpers} from '../../projects/reactive-forms/src/lib/reactive-forms.helpers';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsValidators} from '../../projects/reactive-forms/src/lib/reactive-forms.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  input1!: AbstractControl|null;
  input2!: AbstractControl|null;
  form!: FormGroup;
  form2!: FormGroup;
  formHelper = ReactiveFormsHelpers;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {}

  /**
   *
   */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      input1: ['', [Validators.required]],
      input2: ['']
    });

    this.input1 = this.form.get('input1') as FormControl;
    this.input2 = this.form.get('input2') as FormControl;

    // Ctrl2 is required if ctrl1.value ==== '1'
    this.input1.addValidators([ReactiveFormsValidators.requiredIfMatchValidator(['input2'], '1')]);

    this.form2 = this.formBuilder.group({
      erich: new FormArray([
        new FormControl(null),
        new FormGroup({
          test3: new FormControl('ewrd')
        })
      ], [Validators.required]),
      test6: new FormControl('asfdsdf6'),
      test: new FormGroup({
        test2: new FormArray([
          new FormControl('asfdsdf'),
          new FormGroup({
            test3: new FormControl('ewrd')
          })
        ], [Validators.required])
      })
    })

    console.log((this.form2.get('erich') as FormArray).controls[0].hasValidator(Validators.required));
    console.log((this.form2.get('erich') as FormArray).controls[0].errors);
  }
}
