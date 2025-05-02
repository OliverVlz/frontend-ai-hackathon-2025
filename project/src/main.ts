import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/interceptors/token.interceptor';  // Importa la función

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([tokenInterceptor])  // Usamos la función directamente
    ),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
