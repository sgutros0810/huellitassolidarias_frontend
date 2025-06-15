import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalReportService } from '../../../../core/services/animal-report.service';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() saved  = new EventEmitter<void>();
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private animalReportService: AnimalReportService
  ) {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      location:    ['', Validators.required],
      contactName: ['', Validators.required],
      contactPhone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      image:        [null, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  close() {
    this.closed.emit();
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const fd = new FormData();
    fd.append('name', val.name);
    fd.append('description', val.description);
    fd.append('location', val.location);
    fd.append('state', 'MISSING');
    fd.append('contactName', val.contactName);
    fd.append('contactPhone', val.contactPhone);

    if (this.selectedFile) {
      fd.append('image', this.selectedFile);
    }

    try {
      await this.animalReportService.createReport(fd);
      this.saved.emit();
      this.closed.emit();
    } catch (err) {
      console.error('Error creating report', err);
    }
  }
}
