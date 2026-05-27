import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-modal',
  standalone: false,
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal {
  @Input() isVisible = false;

  @Input() title = 'Modal';

  @Input() okText = 'Ok';
  @Input() okLoading = false;
  @Input() cancelText = 'Cancel';

  @Output() ok = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();


  handleOk(): void {
    this.ok.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
