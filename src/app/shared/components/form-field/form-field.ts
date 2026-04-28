import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: false,
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class FormField {
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  @Input() label = '';
  @Input() type: 'text' | 'email' | 'number' | 'select' = 'text';
  @Input() placeholder = '';
  @Input() isRequired = false;

  @Input() minlength?: number;
  @Input() maxlength?: number;

  // for dropdown
  @Input() options: string[] = [];

  // for special validation messages
  @Input() patternType?: 'phone' | 'email';

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
