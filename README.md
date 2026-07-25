# Spa Movil Colibrí — App de Agendamiento

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

## Música de fondo
La app tiene una pantalla de bienvenida ("Entrar") que activa música relajante
en loop — necesaria porque los navegadores bloquean el audio automático hasta
que hay un clic. Debes colocar tu archivo mp3 en:

```
public/audio/relaxing-music.mp3
```

Ver `public/audio/LEEME.txt` para sugerencias de bancos de música libre de
derechos. Si no agregas el archivo, la app funciona igual, simplemente no
sonará nada.

## Datos configurables
- Número de WhatsApp: `src/App.jsx` → constante `WHATSAPP_NUMBER`.
- Horario de atención: `src/App.jsx` → inputs `date`/`time` (min/max) y texto en el hero.
- Servicios y precios: arrays `massages` y `facials` en `src/App.jsx`.
