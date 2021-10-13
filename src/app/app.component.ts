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
  }
}
