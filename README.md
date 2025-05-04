# AiRiego - Frontend

Frontend para la aplicación AiRiego, desarrollado con Angular y Angular Material. Esta aplicación ayuda a los agricultores a optimizar sus horarios de riego semanales y el uso del agua, permitiéndoles mapear sus campos e ingresar información específica para generar un horario de riego sostenible y eficiente.

## Características

- Interfaz de usuario moderna y responsiva con Angular Material
- Sistema de autenticación completo (registro, login)
- Dashboard interactivo para visualizar zonas de cultivo
- Formulario para agregar nuevas zonas de cultivo
- Lista de zonas de cultivo con opciones para ver detalles, generar cronogramas y eliminar
- Visualización de cronogramas de riego para 7 días

## Tecnologías utilizadas

- Angular 19
- Angular Material para componentes UI
- RxJS para manejo de operaciones asíncronas
- TypeScript

## Requisitos

- Node.js 18 o superior
- npm (gestor de paquetes de Node.js)
- Angular CLI

## Instalación y configuración

### Opción 1: Instalación con Docker

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/frontend-ai-hackathon-2025.git
   cd frontend-ai-hackathon-2025
   ```

2. Construir y ejecutar el contenedor con Docker:
   ```bash
   docker build -t airiego-frontend .
   docker run -p 4200:4200 airiego-frontend
   ```

   Alternativamente, si tienes un archivo docker-compose.yml:
   ```bash
   docker-compose up --build
   ```
3. Abrir el navegador en `http://localhost:4200`

### Opción 2: Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/frontend-ai-hackathon-2025.git
   cd frontend-ai-hackathon-2025/project
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Abrir el navegador en `http://localhost:4200`

### Configuración

La configuración de la aplicación se encuentra en los archivos de entorno:

- `src/environments/environment.ts` (desarrollo)
- `src/environments/environment.prod.ts` (producción)

Puedes modificar la URL de la API y otras configuraciones en estos archivos.

## Estructura del proyecto

- `src/app/`: Código fuente de la aplicación
  - `components/`: Componentes reutilizables
  - `services/`: Servicios para comunicación con la API y lógica de negocio
  - `models/`: Interfaces y clases para tipos de datos
  - `interceptors/`: Interceptores HTTP para manejo de tokens y errores
  - `dashboard/`: Componentes relacionados con el dashboard
    - `zona-cultivo-form/`: Formulario para crear zonas de cultivo
    - `zona-cultivo-list/`: Lista de zonas de cultivo
  - `login/`: Componente de inicio de sesión
  - `register/`: Componente de registro

## Flujo de trabajo

1. **Registro/Login**: Los usuarios pueden registrarse o iniciar sesión para acceder a la aplicación.
2. **Dashboard**: Después de iniciar sesión, los usuarios ven el dashboard con un resumen de sus zonas de cultivo.
3. **Crear zona de cultivo**: Los usuarios pueden crear nuevas zonas de cultivo especificando nombre, coordenadas, área, tipo de cultivo, etapa de crecimiento y sistema de riego.
4. **Ver zonas de cultivo**: Los usuarios pueden ver una lista de todas sus zonas de cultivo.
5. **Generar cronograma**: Para cada zona, los usuarios pueden generar un cronograma de riego para los próximos 7 días basado en las condiciones climáticas y las características del cultivo.

## Integración con el backend

El frontend se comunica con el backend a través de una API RESTful. Los principales endpoints utilizados son:

- `/api/registro/`: Registro de usuarios
- `/api/token/`: Obtener tokens JWT
- `/api/tipos-cultivo/`: Obtener tipos de cultivo
- `/api/tipos-riego/`: Obtener tipos de riego
- `/api/zonas-cultivo/`: Gestionar zonas de cultivo

## Construir para producción

Para construir la aplicación para producción:

```bash
ng build --prod
```

Los archivos generados se encontrarán en el directorio `dist/`.

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un nuevo Pull Request

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).