import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ComoFuncionaComponent,
    QuienesSomosComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

}
