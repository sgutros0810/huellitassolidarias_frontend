import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-login-prompt-modal',
  imports: [],
  templateUrl: './login-prompt-modal.component.html',
  styleUrl: './login-prompt-modal.component.css'
})
export class LoginPromptModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() login  = new EventEmitter<void>();

  onCancel() { this.cancel.emit(); }
  onLogin()  { this.login.emit(); }
}
