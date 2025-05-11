import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ChatbotComponent {
  @Input() cultivoId!: number;

  mensaje: string = '';
  respuesta: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  enviarPregunta() {
    if (!this.mensaje.trim()) return;

    this.loading = true;

    const token = localStorage.getItem('token');

    this.http.post<any>(
      `${environment.apiUrl}/chatbot/cultivos/${this.cultivoId}/preguntar/`,
      { mensaje: this.mensaje },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (data) => {
        this.respuesta = data.respuesta;
        this.loading = false;
      },
      error: (err) => {
        this.respuesta = 'Ocurrió un error al consultar el chatbot.';
        this.loading = false;
      }
    });
  }
}