import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {} // ← AQUÍ se inyecta el Router

  login() {
    if (this.email === 'demo@demo.com' && this.password === '1234') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}
