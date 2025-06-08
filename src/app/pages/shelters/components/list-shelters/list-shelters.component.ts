import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShelterModel } from '../../../../core/modals/shelter.model';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-shelters',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-shelters.component.html',
  styleUrl: './list-shelters.component.css'
})
export class ListSheltersComponent implements OnInit{

  sheltersList!: Observable<ShelterModel[]>;
  shelters: ShelterModel[] = [];

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.sheltersList = this.userService.listSheltersObs$;
    this.userService.getShelters(0, 10);
  }


}
