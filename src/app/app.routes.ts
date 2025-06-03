import { Routes } from '@angular/router';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { RegisterUserComponent } from './pages/auth/register/register-user/register-user.component';
import { RegisterShelterComponent } from './pages/auth/register/register-shelter/register-shelter.component';
import { LoginUserComponent } from './pages/auth/login/login-user/login-user.component';
import { LoginShelterComponent } from './pages/auth/login/login-shelter/login-shelter.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'loginuser', component: LoginUserComponent },
  { path: 'loginshelter', component: LoginShelterComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  { path: 'registershelter', component: RegisterShelterComponent },
  { path: 'adopciones', component: AdopcionesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'publicaciones', component: PostsComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: '**', redirectTo: '' }
];
