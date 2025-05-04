import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      MatSidenavModule,
      MatListModule,
      MatMenuModule,
      MatButtonModule,
      MatDividerModule,
      MatToolbarModule,
      MatGridListModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule
    )
  ]
};
