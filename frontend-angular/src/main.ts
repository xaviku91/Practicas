import { bootstrapApplication } from '@angular/platform-browser'; // Función para inicializar la aplicación
import { AppComponent } from './app/app.component'; // Componente principal
import { appConfig } from './app/app.config'; // Configuración de la aplicación

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
