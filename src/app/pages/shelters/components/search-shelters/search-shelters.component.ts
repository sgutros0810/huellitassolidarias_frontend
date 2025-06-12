import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ShelterModel } from '../../../../core/modals/shelter.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-shelters',
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './search-shelters.component.html',
  styleUrl: './search-shelters.component.css'
})
export class SearchSheltersComponent implements OnInit{

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Output() results = new EventEmitter<ShelterModel[]>();

  form!: FormGroup;
  loading = false;

  constructor() {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      query: [''] //Consulta (lo que escribe el usuario en el buscador)
    });
  }

  onSearch(): void {
    const raw = this.form.get('query')?.value || '';
    const parts = raw.trim().split(/\s+/);
    const filters: any = {};
    if (parts[0]) filters.nameShelter = parts[0];
    if (parts[1]) filters.username    = parts[1];
    if (parts[2]) filters.city        = parts[2];
    if (parts[3]) filters.country     = parts[3];

    this.loading = true;
    this.userService.searchShelters(filters).subscribe({
      next: data => {
        this.loading = false;
        this.results.emit(data);
      },
      error: () => {
        this.loading = false;
        this.results.emit([]);
      }
    });
  }

}
