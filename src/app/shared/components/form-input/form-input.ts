import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: false,
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})

export class FormInput {
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Input() isRequired: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;

  // ✅ cleaner getter (recommended)
  get control() {
    return this.form.get(this.controlName);
  }

  isInvalid(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }
}
