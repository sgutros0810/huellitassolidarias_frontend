import { Component } from '@angular/core';
import { ListSheltersComponent } from "./components/list-shelters/list-shelters.component";
import { UserService } from '../../core/services/user.service';
import { ShelterModel } from '../../core/models/shelter.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shelters',
  imports: [ListSheltersComponent, FormsModule],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {

  search = '';
  private timeoutId: any = null;

  constructor(private userService: UserService) {
    this.userService.getShelters(0, 50);
  }

  onSearchChange(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      const trimmed = this.search.trim();
      if (trimmed.length === 0) {
        this.userService.getShelters(0, 50);
      } else {
        this.userService.searchShelters({ nameShelter: trimmed }).subscribe({
          next: result => this.userService.listSheltersBS.next(result),
          error: () => this.userService.listSheltersBS.next([])
        });
      }
    }, 300);
  }
}
