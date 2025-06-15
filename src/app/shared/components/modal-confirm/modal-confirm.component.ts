import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent {
  @Input() title: string = 'Confirmación';
  @Input() message: string = '¿Estás seguro de que deseas continuar?';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmText: string = 'Confirmar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
