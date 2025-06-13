import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AnimalReportService } from '../../../../core/services/animal-report.service';
import { AnimalReportModel } from '../../../../core/modals/animal-report.model';

@Component({
  selector: 'app-report-form',
  imports: [ AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  form!: FormGroup;
  selectedFile: File | null = null;


  constructor(private animalReportService: AnimalReportService,  private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:           ['', Validators.required],
      description:    ['', Validators.maxLength(1000)],
      location:       ['', Validators.maxLength(100)],
      state:         ['MISSING', Validators.required],
      image:    [null, Validators.required]
      // contactPhone:   ['', Validators.pattern(/^[\d+\-\s]{7,15}$/)],
      // contactEmail:   ['', Validators.email],
    });

  }


  onFileSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ image: this.selectedFile });
    }
  }

  async submitReport(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, String(val));
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


    try {
      await this.animalReportService.createReport(formData);
      await this.animalReportService.getAllReports(0, 10);
      this.closeModal();
    } catch (err) {
      console.error(err);
      alert('Error al publicar la adopción');
    }
  }

  closeModal(): void {
    this.closed.emit();
  }

}
