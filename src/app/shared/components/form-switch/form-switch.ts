import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-switch',
  standalone: false,
  templateUrl: './form-switch.html',
  styleUrl: './form-switch.css',
})
export class FormSwitch {
  @Input() form?: FormGroup;

  @Input() controlName = '';

  @Input() label = '';


  get control(): FormControl | null {

    if (!this.form) {
      return null;
    }

    return this.form.get(this.controlName) as FormControl;

  }
}
