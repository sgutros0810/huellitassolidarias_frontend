import { Routes } from '@angular/router';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterUserComponent } from './pages/auth/register/register-user/register-user.component';
import { RegisterShelterComponent } from './pages/auth/register/register-shelter/register-shelter.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'loginuser', component: LoginComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  { path: 'registershelter', component: RegisterShelterComponent },
  { path: 'adopciones', component: AdopcionesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: '**', redirectTo: '' }
];
