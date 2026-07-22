# Colibrí Spa — App de Agendamiento

App estática (React + Vite, sin backend ni base de datos) con el brochure de
servicios de Colibrí y un flujo de agendamiento que envía la solicitud por WhatsApp.

## Cómo correr localmente
```bash
npm install
npm run dev
```

## Cómo desplegar en Vercel
1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: "Add New Project" → importa el repo.
3. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
4. Deploy.

## Datos configurables
- Número de WhatsApp: `src/App.jsx` → constante `WHATSAPP_NUMBER`.
- Horario de atención: `src/App.jsx` → inputs `date`/`time` (min/max) y texto en el hero.
- Servicios y precios: arrays `massages` y `facials` en `src/App.jsx`.
