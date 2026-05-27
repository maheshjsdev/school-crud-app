import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: false,
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
})

export class InputText {
  @Input() form!: FormGroup;

  @Input() label = '';

  @Input() placeholder = '';

  @Input() controlName = '';

  @Input() type = 'text';

  @Input() required = false;


  @Input() minLength?: number;

  @Input() maxLength?: number;

  @Input() patternMessage = 'Invalid format';


  get control(): FormControl {
    return this.form?.get(this.controlName) as FormControl;
  }


  getErrorMessage(): string {
    if (!this.control) {
      return '';
    }
    if (
      this.control?.invalid &&
      (this.control?.dirty || this.control?.touched)
    ) {

      if (this.control.hasError('required')) {
        return `${this.label} is required`;
      }

      if (this.control.hasError('minlength')) {
        return `Minimum length is ${this.minLength}`;
      }

      if (this.control.hasError('maxlength')) {
        return `Maximum length is ${this.maxLength}`;
      }

      if (this.control.hasError('pattern')) {
        return this.patternMessage;
      }

      if (this.control.hasError('email')) {
        return 'Invalid email';
      }

    }

    return '';
  }
}
