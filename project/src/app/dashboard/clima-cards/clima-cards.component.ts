import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-clima-cards',
  standalone: true,
  templateUrl: './clima-cards.component.html',
  styleUrls: ['./clima-cards.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
  ],
})
export class ClimaCardsComponent implements OnInit {
  climaData: any = null;
  cultivoData: any = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/cultivos/reciente`).subscribe({
      next: (data) => {
        this.cultivoData = data;
        const geojson = data.ubicacion_info.coordenadas;
        const [lat, lon] = this.getCentroid(geojson);

        this.getClimaPorCoordenadas(lat, lon).subscribe({
          next: (clima) => (this.climaData = clima),
        });
      }
    });
  }

  private getCentroid(geojson: any): [number, number] {
    const coords: [number, number][] = geojson.coordinates[0];
    const lat = coords.reduce((sum, [_, lat]) => sum + lat, 0) / coords.length;
    const lon = coords.reduce((sum, [lon]) => sum + lon, 0) / coords.length;
    return [lat, lon];
  }

  private getClimaPorCoordenadas(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,precipitation_sum,et0_fao_evapotranspiration,wind_speed_10m_max&timezone=auto`;
    return this.http.get(url);
  }
}
