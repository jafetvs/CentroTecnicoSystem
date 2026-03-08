# Centro Técnico System

Aplicación web desarrollada para un centro técnico, creada con el objetivo de brindar presencia digital al negocio y contar con una solución funcional para la gestión de información y administración del sistema.

El proyecto está compuesto por:

- **Frontend:** interfaz web para clientes y administración
- **Backend:** API y lógica del sistema
- **Servicios externos:** integración y configuración para persistencia y manejo de datos según el entorno del proyecto

---

# Tecnologías utilizadas

## Frontend
- React
- JavaScript
- HTML
- CSS
- Vite

## Backend
- .NET
- C#
- ASP.NET Web API

## Base de datos y servicios
- SQL Server
- Supabase

---

# Estructura del proyecto

```text
CentroTecnicoSystem
│
├── frontend
│   └── centro-tecnico-web
│
├── backend
│   └── CentroTecnico.Api
│
└── README.md
```

---

# Descripción del proyecto

Este sistema fue desarrollado como una solución web real para un centro técnico, permitiendo mostrar información del negocio, mejorar su presencia digital y contar con una parte administrativa para la gestión interna.

El proyecto demuestra integración entre frontend, backend y servicios externos, aplicando una estructura moderna orientada a una necesidad real.

---

# Funcionalidades principales

- Página web pública para mostrar información del centro técnico
- Interfaz moderna y responsive
- Parte administrativa para gestión de información
- Comunicación entre frontend y backend mediante API
- Integración con servicios externos para persistencia de datos

---

# Consideraciones para ejecución local

Este proyecto fue configurado originalmente para un entorno de desarrollo específico, por lo que para ejecutarlo en otra máquina puede ser necesario ajustar manualmente algunos archivos de configuración.

Entre los elementos que pueden requerir cambios se encuentran:

- `appsettings.json`
- cadenas de conexión
- configuración de servicios externos como Supabase
- rutas de servicios en el frontend
- configuración del backend en `Program.cs`

Por esta razón, este repositorio se presenta principalmente como muestra técnica y de portafolio.

---

# Ejecución del frontend

Entrar a la carpeta del frontend:

```bash
cd frontend/centro-tecnico-web
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

---

# Ejecución del backend

Entrar a la carpeta del backend:

```bash
cd backend/CentroTecnico.Api
```

Restaurar dependencias:

```bash
dotnet restore
```

Ejecutar el proyecto:

```bash
dotnet run
```

---

# Nota importante

La correcta ejecución completa del sistema puede depender de configuraciones locales, credenciales, servicios externos y variables que no se incluyen de forma pública en este repositorio.

Por ello, este proyecto debe entenderse como una muestra real de desarrollo aplicado, arquitectura y experiencia técnica.

---

# Objetivo del proyecto

Desarrollar una solución web funcional para un cliente real, capaz de combinar presencia digital, experiencia moderna de usuario y una base administrativa para la gestión del sistema.

---

# Autor

**Jafet Vásquez Sandoval**

Ingeniero en Sistemas  
Costa Rica

GitHub  
https://github.com/jafetvs

LinkedIn  
https://www.linkedin.com/in/jafet-vasquez-2b6b26162