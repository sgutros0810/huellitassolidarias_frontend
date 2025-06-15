import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible) {
      <div class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-[9999] animate-fade-in">
        {{ message }}
      </div>
    }
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `]
})
export class ToastComponent {
  @Input() message: string = 'Operación completada con éxito';
  visible: boolean = false;

  show(durationMs: number = 3000) {
    this.visible = true;
    setTimeout(() => this.visible = false, durationMs);
  }
}
