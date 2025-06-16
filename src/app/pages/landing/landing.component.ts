import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { SliderComponent } from "./components/slider/slider.component";
import { CardComponent } from "./components/card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports: [CommonModule, SliderComponent, CardComponent, RouterLink],
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  title = 'sliderApp';


  slideLeft(sliderId:string){
    console.log("left" + sliderId)
    const slider = document.getElementById(sliderId) as HTMLElement | null;
    if(slider){
      slider.scrollLeft -=500;
    }
  }

  slideRight(sliderId:string){
    console.log("right" + sliderId)
    const slider = document.getElementById(sliderId) as HTMLElement | null;
    if(slider){
      slider.scrollLeft +=500;
    }
  }

  // isUserLogged() {
  //   this.userService.getUser().subscribe((user) => {
  //     console.log(user);
  //   });
  // }
}
