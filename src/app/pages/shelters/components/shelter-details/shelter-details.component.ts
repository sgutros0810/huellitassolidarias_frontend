import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { ShelterDetailModel } from '../../../../core/modals/shelter-detail.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdopcionesComponent } from "../../../adopciones/adopciones.component";
import { ShelterAdoptionsListComponent } from "../shelter-adoptions-list/shelter-adoptions-list.component";

@Component({
  selector: 'app-shelter-details',
  imports: [CommonModule, AdopcionesComponent, RouterModule, ShelterAdoptionsListComponent],
  templateUrl: './shelter-details.component.html',
  styleUrl: './shelter-details.component.css'
})
export class ShelterDetailsComponent {

 
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private sanitizer = inject(DomSanitizer);

  shelter = signal<ShelterDetailModel | null>(null);
  mapUrl!: SafeResourceUrl;
  activeTab = signal<'datos' | 'ayuda' | 'adopciones'>('datos'); // campo activo, por defecto es 'datos'


  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('id del refugio:', id);

    this.userService.getShelterById(id).subscribe({
      next: (response) => {
        this.shelter.set(response)
        // console.log(s);
        this.updateMapUrl(response);
      },
      error: (err) => console.error('Error cargando refugio', err)
    });
  }

  // Cambiar pestaña activa
  setActiveTab(tab: 'datos' | 'ayuda' | 'adopciones') {
    this.activeTab.set(tab);
  }


  // Direccion de url del mapa de Google Maps (iframe)
  private updateMapUrl(shelter: ShelterDetailModel) {
    if (shelter.address && shelter.city && shelter.country) {
      const query = `${shelter.address}, ${shelter.city}, ${shelter.country}`.trim();
      if (query.length > 0) {
        const encoded = encodeURIComponent(query);
        const url = `https://www.google.com/maps?q=${encoded}&output=embed`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    }
  }
}
