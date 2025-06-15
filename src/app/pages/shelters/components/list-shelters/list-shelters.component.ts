import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShelterModel } from '../../../../core/models/shelter.model';
import { UserService } from '../../../../core/services/user.service';
import { buildImageUrl } from '../../../../shared/utils/image-url.util';

@Component({
  selector: 'app-list-shelters',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-shelters.component.html',
  styleUrl: './list-shelters.component.css'
})
export class ListSheltersComponent implements OnChanges {

  private userService = inject(UserService);
  readonly sheltersList = this.userService.listSheltersObs$;

  @Input({ required: true }) searchTerm: string = '';
  shelters: ShelterModel[] = [];
  loading = false;
  defaultImage = '/img/logopro.png';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.searchShelters();
    }
  }

  searchShelters(): void {
    this.loading = true;
    this.userService.searchShelters({ nameShelter: this.searchTerm }).subscribe({
      next: data => {
        this.shelters = data;
        this.loading = false;
      },
      error: () => {
        this.shelters = [];
        this.loading = false;
      }
    });
  }

  getImageSrc(imageUrl: string | null | undefined): string {
    return buildImageUrl(imageUrl, this.defaultImage);
  }
}
