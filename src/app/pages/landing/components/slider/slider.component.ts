
import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  num = input.required<number>();

  slideLeft = output<string>();
  slideRight = output<string>();


  goSlideLeft() {
    this.slideLeft.emit(`slider${this.num}`)
  }

  goSlideRigth() {
    this.slideRight.emit(`slider${this.num}`)
  }

  // rutas de las imagenes
  imgSlider: any [] = [
    { path: 'img/slider/imagen1.jpg' },
    { path: 'img/slider/imagen2.jpg' },
    { path: 'img/slider/imagen3.jpg' },
    { path: 'img/slider/imagen4.jpg' },
    { path: 'img/slider/imagen5.jpg' },
    { path: 'img/slider/imagen6.jpg' },
    { path: 'img/slider/imagen7.jpg' },
    { path: 'img/slider/imagen8.jpg' },
  ];

}
