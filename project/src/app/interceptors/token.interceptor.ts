import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';  

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // Lista de rutas que no requieren autenticación
  const publicRoutes = [
    '/api/registro/',
    '/api/token/',
    '/api/token/refresh/',
    '/api/tipos-cultivo/',
    '/api/tipos-riego/'
  ];
  
  // Verificar si la URL actual está en la lista de rutas públicas
  const isPublicRoute = publicRoutes.some(route => req.url.includes(route));
  
  // Solo añadir el token si no es una ruta pública y el token existe
  const token = localStorage.getItem('access_token');
  console.log(`URL: ${req.url}, isPublicRoute: ${isPublicRoute}, token exists: ${!!token}`);
  
  if (token && !isPublicRoute) {
    console.log(`Añadiendo token a la solicitud para: ${req.url}`);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else if (!token && !isPublicRoute) {
    console.warn(`No hay token para una ruta protegida: ${req.url}`);
  }
  
  return next(req);
};