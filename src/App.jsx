import { useState, useMemo } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '573106979485'
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

export default function App() {
  const [selected, setSelected] = useState(null)
  const [stones, setStones] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', date: '', time: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

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
    lines.push('¡Hola Colibrí! 🌸 Quiero agendar una experiencia:')
    lines.push('')
    lines.push(`Servicio: ${selected.name}`)
    lines.push(`Duración: ${selected.duration}`)
    if (selected.category === 'masaje' && stones) {
      lines.push('Incluye masaje con piedras volcánicas (+' + formatPrice(STONES_PRICE) + ')')
    }
    lines.push(`Valor: ${formatPrice(total)}`)
    lines.push('')
    lines.push(`Fecha: ${form.date}`)
    lines.push(`Hora: ${form.time}`)
    lines.push(`Nombre: ${form.name}`)
    if (form.phone) lines.push(`Teléfono: ${form.phone}`)
    if (selected.category === 'masaje') lines.push(`Dirección: ${form.address}`)
    lines.push('')
    lines.push('Quedo atent@ a la confirmación ✨')
    return lines.join('\n')
  }

  const handleConfirm = () => {
    if (!selected) return setError('Elige un vuelo o ritual para continuar.')
    if (!form.date || !form.time) return setError('Elige la fecha y la hora que prefieres.')
    if (!form.name.trim()) return setError('Cuéntanos tu nombre.')
    if (selected.category === 'masaje' && !form.address.trim())
      return setError('Escribe la dirección para el masaje a domicilio.')
    setError('')
    const message = encodeURIComponent(buildMessage())
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    setSent(true)
  }

  return (
    <>
      <header className="hero">
        <div className="hero-glow" />
        <img src="/logo-colibri.jpg" alt="Colibrí — Conecta, Libera y Brilla" className="hero-logo" />
        <p className="hero-hours">Domingo a domingo · 6:00 a.m. – 9:00 p.m.</p>
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

        <Journey id="agenda" eyebrow="Aterrizaje · Agenda tu cita" title="Confirma tu experiencia">
          {selected ? (
            <div className="summary">
              <p className="summary-name">{selected.name}</p>
              <p className="summary-meta">
                {selected.duration} · {formatPrice(total)}
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
              <input type="time" min="06:00" max="21:00" value={form.time} onChange={updateForm('time')} />
            </label>
            <label className="field">
              Nombre
              <input type="text" placeholder="Tu nombre" value={form.name} onChange={updateForm('name')} />
            </label>
            <label className="field">
              Teléfono (opcional)
              <input type="tel" placeholder="300 000 0000" value={form.phone} onChange={updateForm('phone')} />
            </label>
            {selected?.category === 'masaje' && (
              <label className="field field--wide">
                Dirección para el masaje a domicilio
                <input type="text" placeholder="Barrio, calle, apto" value={form.address} onChange={updateForm('address')} />
              </label>
            )}
          </div>

          {error && <p className="form-error">{error}</p>}
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
        <p>Colibrí · Conecta, Libera y Brilla</p>
        <p className="footer-sub">Escríbenos directo: +57 310 697 9485</p>
      </footer>
    </>
  )
}
