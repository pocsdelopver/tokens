# API de Autenticación con Tokens

API REST para autenticación y validación de tokens JWT, desarrollada con Node.js y Express.

## Características

- Autenticación de usuarios con JWT
- Validación de tokens
- Documentación con Swagger
- Manejo de errores
- Seguridad con middleware de autenticación

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd tokens
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=8080
JWT_SECRET=tu_clave_secreta
```

## Estructura del Proyecto

```
src/
├── commons/         # Configuraciones y utilidades
├── controllers/     # Controladores de la aplicación
├── middleware/      # Middleware de autenticación
├── routes/          # Rutas de la API
├── services/        # Lógica de negocio
└── index.js         # Punto de entrada de la aplicación
```

## Uso

1. Iniciar el servidor:
```bash
npm start
```

2. Acceder a la documentación Swagger:
```
http://localhost:8080/api-docs
```

## Endpoints

### Autenticación

#### POST /login
Inicia sesión y obtiene un token JWT.

**Request Body:**
```json
{
    "username": "admin",
    "password": "1234"
}
```

**Response (200):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /validaToken
Valida un token JWT y obtiene datos protegidos.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "mensaje": "Acceso concedido",
    "usuario": {
        "username": "admin"
    }
}
```

## Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga automática:
```bash
npm run dev
```

## Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## Seguridad

- Los tokens JWT tienen una expiración de 1 hora
- Las contraseñas deben ser manejadas de forma segura
- Se implementa middleware de autenticación para rutas protegidas

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.