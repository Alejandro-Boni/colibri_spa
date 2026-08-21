import { useState, useMemo, useRef, useEffect } from 'react'
import './App.css'

const MAINTENANCE_MODE = false

const WHATSAPP_NUMBER = '573106979485'
const BUSINESS_OPEN = '08:00'
const BUSINESS_CLOSE = '19:00'

function isWithinBusinessHours(time) {
  if (!time) return false
  return time >= BUSINESS_OPEN && time <= BUSINESS_CLOSE
}
const STONES_PRICE = 20000

const massages = [
  {
    id: 'susurro',
    category: 'masaje',
    name: 'Susurro de Alas',
    duration: '30 min',
    price: 140000,
    desc: 'Sesión focalizada y suave, ideal para una pausa rápida en el día o para liberar tensión en una zona específica: cuello y espalda.',
  },
  {
    id: 'sereno',
    category: 'masaje',
    name: 'Vuelo Sereno',
    duration: '60 min',
    price: 170000,
    desc: 'Nuestra experiencia insignia. Un recorrido completo de relajación para equilibrar cuerpo y mente, perfecto para resetear el sistema.',
    featured: true,
  },
  {
    id: 'libre',
    category: 'masaje',
    name: 'Vuelo Libre',
    duration: '90 min',
    price: 200000,
    desc: 'La inmersión total. Tiempo suficiente para trabajar profundamente cada músculo, sin prisas, logrando un estado de ligereza absoluto.',
  },
]

const facials = [
  {
    id: 'basica',
    category: 'facial',
    name: 'Limpieza Facial Básica',
    subtitle: 'Renovación & Brillo',
    duration: '45 min',
    price: 130000,
    protocol: [
      'Higienización profunda',
      'Exfoliación suave para retirar células muertas',
      'Tonificación equilibrante',
      'Mascarilla hidratante y nutritiva',
      'Sellado con masaje facial, hidratante y protección solar',
    ],
    benefit: 'Piel suave, fresca, oxigenada y lista para absorber mejor tus productos diarios.',
  },
  {
    id: 'profunda',
    category: 'facial',
    name: 'Limpieza Facial Profunda',
    subtitle: 'Purificación Total',
    duration: '1 h 15 min',
    price: 160000,
    protocol: [
      'Limpieza y exfoliación',
      'Vaporización y gel ablandador de comedones',
      'Extracción minuciosa de puntos negros e impurezas',
      'Alta frecuencia bactericida y calmante',
      'Mascarilla purificante de arcilla',
      'Sellado con masaje protector',
    ],
    benefit: 'Poros limpios, reducción de imperfecciones y piel completamente renovada.',
  },
]

const waxingFacial = [
  { id: 'cejas', category: 'depilacion', name: 'Cejas (diseño y depilación)', price: 50000 },
  { id: 'bozo', category: 'depilacion', name: 'Bozo', price: 35000 },
  { id: 'menton', category: 'depilacion', name: 'Mentón / Barbilla', price: 35000 },
  { id: 'patillas', category: 'depilacion', name: 'Patillas', price: 30000 },
  { id: 'rostro-completo', category: 'depilacion', name: 'Rostro Completo', desc: 'Cejas, bozo, mentón y patillas', price: 60000 },
]

const waxingIntimate = [
  { id: 'bikini-clasico', category: 'depilacion', name: 'Bikini Clásico', desc: 'Línea del traje de baño', price: 40000 },
  { id: 'bikini-brasileno', category: 'depilacion', name: 'Bikini Brasileño / Completo', desc: 'Zona íntima total + zona perianal', price: 70000 },
]

const waxingBody = [
  { id: 'axilas', category: 'depilacion', name: 'Axilas', price: 40000 },
  { id: 'brazos-completos', category: 'depilacion', name: 'Brazos completos', price: 60000 },
  { id: 'medio-brazo', category: 'depilacion', name: 'Medio brazo', price: 40000 },
  { id: 'piernas-completas', category: 'depilacion', name: 'Piernas completas', price: 70000 },
  { id: 'media-pierna', category: 'depilacion', name: 'Media pierna', desc: 'Pantorrilla o muslo', price: 50000 },
  { id: 'espalda-completa', category: 'depilacion', name: 'Espalda completa', price: 70000 },
  { id: 'abdomen-pecho', category: 'depilacion', name: 'Abdomen o Pecho', price: 70000 },
  { id: 'depilacion-completa', category: 'depilacion', name: 'Depilación completa', price: 100000 },
]

const threading = [
  { id: 'hilo-facial', category: 'hilo', name: 'Facial completo (con hilo)', price: 60000 },
]

const experiences = [
  {
    id: 'pausa-compartida',
    category: 'experiencia',
    name: 'Pausa Compartida',
    subtitle: 'El regalo perfecto para consentirse juntas',
    duration: '60 min',
    price: 170000,
    priceNote: 'por persona',
    includes: [
      'Ritual de bienvenida',
      'Masaje cráneo facial',
      'Aromaterapia y música ambiental',
      'Masaje relajante corporal',
      'Mascarilla / cuidado facial de hidratación',
    ],
  },
  {
    id: 'vuelo-amigas-chocoterapia',
    category: 'experiencia',
    name: 'Vuelo entre Amigas · Chocoterapia',
    subtitle: 'Una pausa dulce para desconectarse entre amigas',
    duration: '~90 min',
    price: 230000,
    priceNote: 'por persona',
    includes: [
      'Bienvenida dulce y aromaterapia (vainilla, cacao y naranja)',
      'Masaje relajante corporal de 90 min con aceite de chocolate',
      'Mascarilla facial nutritiva de cacao',
    ],
  },
  {
    id: 'duo-colibri',
    category: 'experiencia',
    name: 'Dúo Colibrí',
    subtitle: 'Un viaje sensorial para reconectar en pareja',
    duration: '90 min',
    price: 240000,
    priceNote: 'por persona',
    includes: [
      'Aromaterapia personalizada según el estado de ánimo',
      'Música ambiental suave',
      'Masaje facial Shiatsu',
      'Masaje capilar',
      'Masaje cuerpo completo',
      'Exfoliación',
      'Chocolaterapia',
    ],
  },
]

const formatPrice = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)

const todayISO = () => {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - offset * 60000)
  return local.toISOString().split('T')[0]
}

const Wing = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 30C20 24 12 22 6 14C12 16 18 16 22 20C21 12 17 8 15 2C21 5 26 10 27 18C31 12 33 8 38 6C36 12 35 17 30 22C36 22 40 20 46 20C40 26 32 28 27 26C29 32 27 38 24 44C22 38 22 34 24 30Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)

function Journey({ eyebrow, title, children, id }) {
  return (
    <section id={id} className="journey-section">
      <div className="rail">
        <span className="rail-icon">
          <Wing className="wing-icon" />
        </span>
      </div>
      <div className="section-body">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function MassageCard({ service, onSelect, isSelected }) {
  return (
    <div className={`card ${service.featured ? 'card--featured' : ''} ${isSelected ? 'card--selected' : ''}`}>
      {service.featured && <span className="card-tag">Experiencia insignia</span>}
      <h3>{service.name}</h3>
      <p className="card-meta">{service.duration} · {formatPrice(service.price)}</p>
      <p className="card-desc">{service.desc}</p>
      <button className="card-btn" onClick={() => onSelect(service)}>
        {isSelected ? 'Vuelo elegido ✓' : 'Elegir este vuelo'}
      </button>
    </div>
  )
}

function FacialCard({ service, onSelect, isSelected }) {
  return (
    <div className={`card ${isSelected ? 'card--selected' : ''}`}>
      <h3>{service.name}</h3>
      <p className="card-subtitle">{service.subtitle}</p>
      <p className="card-meta">{service.duration} · {formatPrice(service.price)}</p>
      <ul className="protocol-list">
        {service.protocol.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="card-desc">{service.benefit}</p>
      <button className="card-btn" onClick={() => onSelect(service)}>
        {isSelected ? 'Ritual elegido ✓' : 'Elegir este ritual'}
      </button>
    </div>
  )
}

function ZoneCard({ service, onSelect, isSelected }) {
  return (
    <div className={`zone-card ${isSelected ? 'card--selected' : ''}`}>
      <div>
        <p className="zone-name">{service.name}</p>
        {service.desc && <p className="zone-desc">{service.desc}</p>}
      </div>
      <div className="zone-action">
        <span className="zone-price">{formatPrice(service.price)}</span>
        <button className="card-btn" onClick={() => onSelect(service)}>
          {isSelected ? 'Elegido ✓' : 'Elegir'}
        </button>
      </div>
    </div>
  )
}

function ExperienceCard({ service, onSelect, isSelected }) {
  return (
    <div className={`card ${isSelected ? 'card--selected' : ''}`}>
      <h3>{service.name}</h3>
      {service.subtitle && <p className="card-subtitle">{service.subtitle}</p>}
      <p className="card-meta">
        {service.duration ? `${service.duration} · ` : ''}
        {service.price ? formatPrice(service.price) : 'Consultar valor'}
        {service.priceNote ? ` (${service.priceNote})` : ''}
      </p>
      <ul className="protocol-list">
        {service.includes.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <button className="card-btn" onClick={() => onSelect(service)}>
        {isSelected ? 'Experiencia elegida ✓' : 'Elegir esta experiencia'}
      </button>
    </div>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TiktokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.57h-3.1v13.06c0 1.42-1.15 2.58-2.58 2.58a2.58 2.58 0 0 1-2.58-2.58c0-1.53 1.42-2.68 2.94-2.44V9.75c-3.28-.4-6.14 2.13-6.14 5.56 0 3.16 2.62 5.56 5.78 5.56 3.16 0 5.78-2.4 5.78-5.56V8.98a7.24 7.24 0 0 0 4.24 1.37V7.24s-1.83.1-2.74-1.42z"/>
    </svg>
  )
}

function ParticleField() {
  const converge = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2
      const distance = 90 + Math.random() * 180
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        delay: Math.random() * 0.5,
        size: 2 + Math.random() * 3,
      }
    })
  }, [])

  const dust = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      size: 1 + Math.random() * 2,
    }))
  }, [])

  return (
    <div className="particle-field" aria-hidden="true">
      {converge.map((p) => (
        <span
          key={`c-${p.id}`}
          className="particle"
          style={{ '--tx': `${p.tx}px`, '--ty': `${p.ty}px`, '--delay': `${p.delay}s`, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}
      {dust.map((p) => (
        <span
          key={`d-${p.id}`}
          className="dust-particle"
          style={{ left: `${p.left}%`, '--delay': `${p.delay}s`, '--duration': `${p.duration}s`, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}
    </div>
  )
}

function IntroSplash({ onFinish }) {
  const introAudioRef = useRef(null)

  useEffect(() => {
    const audio = introAudioRef.current
    if (audio) {
      audio.currentTime = 0
      audio.volume = 0.55
      audio.play().catch(() => {})
    }
    const timer = setTimeout(onFinish, 5000)
    return () => {
      clearTimeout(timer)
      if (audio) audio.pause()
    }
  }, [onFinish])

  return (
    <div className="intro-splash">
      <audio ref={introAudioRef} src="/audio/intro-welcome.mp3" preload="auto" />
      <div className="intro-glow" aria-hidden="true" />

      {/* Colibrí Real usando la imagen oficial con animación de vuelo */}
      <div className="real-hummingbird-container">
        <img
          src="/logo-colibri.jpg"
          alt="Colibrí Spa"
          className="real-hummingbird-fly"
        />
      </div>

      <p className="intro-phrase">
        La sutileza del tacto, la fuerza de tu renovación vital.
      </p>

      <span className="sr-only">Cargando Spa Móvil Colibrí</span>
    </div>
  )
}

function WhatsappIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.6 10.8c1.3 2.7 3.6 5 6.3 6.3l2.1-2.1c.3-.3.7-.4 1.1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1L6.6 10.8Z" />
    </svg>
  )
}

function EntryGate({ onEnter }) {
  return (
    <div className="entry-gate">
      <div className="entry-content">
        <div className="logo-frame">
          <img
            src="/logo-colibri.jpg"
            alt="Colibrí Spa Logo"
            className="entry-logo"
          />
        </div>
        
        {/* Mantienes solo el eslogan o título principal */}
        <p className="entry-tagline reveal-text">
          CONECTA, LIBERA Y BRILLA
        </p>

        <button
          type="button"
          className="entry-btn reveal-text-delayed"
          onClick={onEnter}
        >
          Entrar
        </button>

        <p className="entry-hint reveal-text-delayed">
          Activa el sonido para vivir la experiencia completa
        </p>
      </div>
    </div>
  )
}

function HummingbirdField() {
  return (
    <div className="hb-field" aria-hidden="true">
      <Wing className="hb hb-1" />
      <Wing className="hb hb-2" />
      <Wing className="hb hb-3" />
      <Wing className="hb hb-4" />
      <Wing className="hb hb-5" />
    </div>
  )
}

function MaintenancePage() {
  return (
    <div className="entry-gate">
      <img src="/logo-colibri.jpg" alt="Spa Móvil Colibrí" className="entry-logo" />
      <p className="entry-tagline" style={{ marginTop: 24, fontSize: '1.1rem' }}>
        Estamos actualizando la experiencia
      </p>
      <p className="entry-hint" style={{ maxWidth: '32ch', marginTop: 8 }}>
        Disculpa las molestias, volvemos en unos minutos con mejoras para ti.
      </p>
      <a
        href="https://wa.me/573106979485"
        target="_blank"
        rel="noopener noreferrer"
        className="entry-btn"
        style={{ marginTop: 20, textDecoration: 'none', display: 'inline-block' }}
      >
        Escríbenos por WhatsApp
      </a>
    </div>
  )
}

export default function App() {
  if (MAINTENANCE_MODE) return <MaintenancePage /> 
  const [selected, setSelected] = useState(null)
  const [stones, setStones] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '', time: '' })
  const [error, setError] = useState('')
  const [hourBlocked, setHourBlocked] = useState(false)
  const [sent, setSent] = useState(false)
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const audioRef = useRef(null)

  const handleEnter = () => {
    setEntered(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.35
      audio.play().catch(() => {})
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  const total = useMemo(() => {
    if (!selected) return 0
    return selected.price + (selected.category === 'masaje' && stones ? STONES_PRICE : 0)
  }, [selected, stones])

  const handleSelect = (service) => {
    setSelected(service)
    setSent(false)
    setError('')
    if (service.category !== 'masaje') setStones(false)
    const el = document.getElementById('agenda')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const updateForm = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const buildMessage = () => {
    const lines = []
    lines.push('¡Hola Spa Móvil Colibrí! 🌸 Quiero agendar una experiencia:')
    lines.push('')
    lines.push(`Servicio: ${selected.name}`)
    if (selected.duration) lines.push(`Duración: ${selected.duration}`)
    if (selected.category === 'masaje' && stones) {
      lines.push('Incluye masaje con piedras volcánicas (+' + formatPrice(STONES_PRICE) + ')')
    }
    lines.push(`Valor: ${selected.price ? formatPrice(total) : 'a confirmar'}${selected.priceNote ? ' (' + selected.priceNote + ')' : ''}`)
    lines.push('')
    lines.push(`Fecha: ${form.date}`)
    lines.push(`Hora: ${form.time}`)
    lines.push(`Nombre: ${form.name}`)
    if (form.phone) lines.push(`Teléfono: ${form.phone}`)
    if (selected.category === 'masaje' || selected.category === 'experiencia') lines.push(`Dirección: ${form.address}`)
    lines.push('')
    lines.push('Quedo atent@ a la confirmación ✨')
    return lines.join('\n')
  }

  const handleConfirm = () => {
    setHourBlocked(false)
    if (!selected) return setError('Elige un vuelo o ritual para continuar.')
    if (!form.date || !form.time) return setError('Elige la fecha y la hora que prefieres.')
    if (!isWithinBusinessHours(form.time)) {
      setHourBlocked(true)
      return setError(
        'El agendamiento a esa hora no está permitido. Atendemos de 8:00 a.m. a 7:00 p.m.'
      )
    }
    if (!form.name.trim()) return setError('Cuéntanos tu nombre.')
    if ((selected.category === 'masaje' || selected.category === 'experiencia') && !form.address.trim())
      return setError('Escribe la dirección para el masaje a domicilio.')
    setError('')
    const message = encodeURIComponent(buildMessage())
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    setSent(true)
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/relaxing-music.mp3" loop preload="auto" />
      <HummingbirdField />
      {showIntro && <IntroSplash onFinish={() => setShowIntro(false)} />}
      {!showIntro && !entered && <EntryGate onEnter={handleEnter} />}
      {entered && (
        <button
          className="sound-toggle"
          onClick={toggleMute}
          aria-label={muted ? 'Activar música' : 'Silenciar música'}
        >
          {muted ? '🔇' : '🎵'}
        </button>
      )}
      {entered && (
        <a
          className="whatsapp-float"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp"
        >
          <WhatsappIcon className="whatsapp-float-icon" />
        </a>
      )}

      <header className="hero">
        <div className="hero-glow" />
        <p className="brand-prefix">Spa Móvil</p>
        <img src="/logo-colibri.jpg" alt="Spa Móvil Colibrí — Conecta, Libera y Brilla" className="hero-logo" />
        <p className="hero-hours">Martes a domingo · 8:00 a.m. – 7:00 p.m. · Lunes con cita previa</p>
        <button className="hero-cta" onClick={() => document.getElementById('vuelos').scrollIntoView({ behavior: 'smooth' })}>
          Ver la carta de experiencias
        </button>
      </header>

      <main className="journey">
        <Journey id="vuelos" eyebrow="En vuelo · Masajes a domicilio" title="Carta de Vuelos">
          <p className="section-intro">
            Cada sesión incluye desplazamiento dentro de la zona urbana norte, camilla y elementos
            desechables, aromaterapia y musicoterapia.
          </p>
          <div className="card-grid">
            {massages.map((m) => (
              <MassageCard key={m.id} service={m} onSelect={handleSelect} isSelected={selected?.id === m.id} />
            ))}
          </div>
          <label className={`stones-toggle ${selected?.category === 'masaje' ? '' : 'stones-toggle--hidden'}`}>
            <input
              type="checkbox"
              checked={stones}
              onChange={(e) => setStones(e.target.checked)}
              disabled={selected?.category !== 'masaje'}
            />
            Agregar masaje con piedras volcánicas (+{formatPrice(STONES_PRICE)})
          </label>
        </Journey>

        <Journey id="faciales" eyebrow="En tierra · Rituales faciales" title="Rituales de Piel">
          <div className="card-grid">
            {facials.map((f) => (
              <FacialCard key={f.id} service={f} onSelect={handleSelect} isSelected={selected?.id === f.id} />
            ))}
          </div>
        </Journey>

        <Journey id="depilacion" eyebrow="Piel lista · Depilación con cera" title="Menú de Depilación">
          <p className="section-intro">
            Piel suave, sedosa y libre de vello hasta por 4 semanas. Usamos ceras elásticas e
            hipoalergénicas: preparación con limpieza y desinfección previa, aplicación de cera
            tibia/caliente enriquecida con miel, manzanilla o aloe vera, y post-depilación con gel
            refrescante y aceite calmante para prevenir rojeces e hidratar.
          </p>
          <p className="section-intro">
            📌 Recomendaciones: exfolia la zona 24 a 48 horas antes, evita el sol directo el día del
            servicio y no apliques cremas ni desodorante justo antes de la sesión.
          </p>

          <h3 className="subheading">Zonas Faciales</h3>
          <div className="zone-grid">
            {waxingFacial.map((z) => (
              <ZoneCard key={z.id} service={z} onSelect={handleSelect} isSelected={selected?.id === z.id} />
            ))}
          </div>

          <h3 className="subheading">Zona Íntima (femenina / masculina)</h3>
          <div className="zone-grid">
            {waxingIntimate.map((z) => (
              <ZoneCard key={z.id} service={z} onSelect={handleSelect} isSelected={selected?.id === z.id} />
            ))}
          </div>

          <h3 className="subheading">Zonas Corporales</h3>
          <div className="zone-grid">
            {waxingBody.map((z) => (
              <ZoneCard key={z.id} service={z} onSelect={handleSelect} isSelected={selected?.id === z.id} />
            ))}
          </div>
        </Journey>

        <Journey id="hilo" eyebrow="Precisión natural · Depilación con hilo" title="Menú de Hilo">
          <p className="section-intro">
            Técnica milenaria 100% natural que extrae el vello desde la raíz sin tironeos agresivos
            ni químicos. Ideal para pieles sensibles.
          </p>
          <div className="zone-grid">
            {threading.map((z) => (
              <ZoneCard key={z.id} service={z} onSelect={handleSelect} isSelected={selected?.id === z.id} />
            ))}
          </div>
        </Journey>

        <Journey id="experiencias" eyebrow="Vuelos compartidos · Experiencias en pareja o grupo" title="Experiencias Colibrí">
          <p className="section-intro">
            A veces el mejor plan no es salir, sino hacer una pausa con las personas que quieres.
            Estas experiencias se realizan a domicilio.
          </p>
          <div className="card-grid">
            {experiences.map((e) => (
              <ExperienceCard key={e.id} service={e} onSelect={handleSelect} isSelected={selected?.id === e.id} />
            ))}
          </div>
        </Journey>

        <Journey id="agenda" eyebrow="Aterrizaje · Agenda tu cita" title="Confirma tu experiencia">
          {selected ? (
            <div className="summary">
              <p className="summary-name">{selected.name}</p>
              <p className="summary-meta">
                {selected.duration ? `${selected.duration} · ` : ''}
                {selected.price ? formatPrice(total) : 'Valor a confirmar'}
                {selected.priceNote ? ` (${selected.priceNote})` : ''}
                {selected.category === 'masaje' && stones ? ' (incluye piedras volcánicas)' : ''}
              </p>
            </div>
          ) : (
            <p className="summary-empty">Elige un vuelo o un ritual arriba para comenzar tu agendamiento.</p>
          )}

          <div className="form-grid">
            <label className="field">
              Fecha
              <input type="date" min={todayISO()} value={form.date} onChange={updateForm('date')} />
            </label>
            <label className="field">
              Hora
              <input type="time" min="08:00" max="19:00" value={form.time} onChange={updateForm('time')} />
            </label>
            <label className="field">
              Nombre
              <input type="text" placeholder="Tu nombre" value={form.name} onChange={updateForm('name')} />
            </label>
            <label className="field">
              Teléfono (opcional)
              <input type="tel" placeholder="300 000 0000" value={form.phone} onChange={updateForm('phone')} />
            </label>
            {(selected?.category === 'masaje' || selected?.category === 'experiencia') && (
              <label className="field field--wide">
                Dirección para el servicio a domicilio
                <input type="text" placeholder="Barrio, calle, apto" value={form.address} onChange={updateForm('address')} />
              </label>
            )}
          </div>

          <p className="policy-note">
            Las reservas se apartan con el 20% del valor. Cancelaciones con menos de 3 horas de
            antelación no tienen devolución del depósito.
          </p>

          {error && (
            <p className="form-error">
              {error}
              {hourBlocked && (
                <>
                  {' '}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="form-error-link"
                  >
                    Escríbenos directo por WhatsApp
                  </a>
                </>
              )}
            </p>
          )}
          {sent && !error && (
            <p className="form-success">Te llevamos a WhatsApp. Confirma el envío para reservar tu cupo.</p>
          )}

          <button className="confirm-btn" onClick={handleConfirm}>
            Confirmar por WhatsApp
          </button>
        </Journey>
      </main>

      <footer className="footer">
        <Wing className="wing-icon footer-wing" />
        <p>Spa Móvil Colibrí · Conecta, Libera y Brilla</p>
        <p className="footer-sub">Escríbenos directo: +57 310 697 9485</p>
        <div className="social-row">
          <a
            href="https://www.instagram.com/spamovilcolibri"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <InstagramIcon className="social-icon" />
          </a>
          <a
            href="https://www.tiktok.com/@spamovilcolibri"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="TikTok"
          >
            <TiktokIcon className="social-icon" />
          </a>
        </div>
      </footer>
    </>
  )
}