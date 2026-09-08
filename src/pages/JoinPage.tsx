import { CheckCircle2, FileText, Megaphone, Tag, Users } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCategories } from '../hooks/useCategories';

const BENEFITS = [
  {
    icon: Megaphone,
    title: 'Presencia online',
    description: 'Tu comercio visible para miles de personas que buscan en Bahía Blanca.',
  },
  {
    icon: Users,
    title: 'Contacto directo',
    description: 'Recibí consultas por WhatsApp y llamadas sin intermediarios.',
  },
  {
    icon: Tag,
    title: 'Mayor visibilidad local',
    description: 'Aparecé en categorías, búsquedas y recomendaciones destacadas.',
  },
  {
    icon: FileText,
    title: 'Ficha comercial completa',
    description: 'Horarios, servicios, fotos y ubicación en un solo lugar.',
  },
];

interface FormState {
  businessName: string;
  category: string;
  contactName: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  businessName: '',
  category: '',
  contactName: '',
  phone: '',
  email: '',
  message: '',
};

export function JoinPage() {
  const { categories } = useCategories();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Para comercios
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-ink-950 sm:text-4xl">
          Publicá tu negocio en MegaGuía Bahía
        </h1>
        <p className="mt-3 text-ink-500">
          Sumate a la guía local y hacé que más vecinos de Bahía Blanca encuentren tu
          comercio, servicio o profesión.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-sm text-ink-500">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-ink-400">
        Próximamente: promociones y ofertas destacadas para socios de MegaGuía.
      </p>

      <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-ink-900">¡Listo! Esto es una demo</h2>
            <p className="max-w-sm text-sm text-ink-500">
              Todavía no enviamos datos a ningún servidor: esta es una versión de
              demostración del formulario. Pronto vas a poder publicar tu negocio de
              verdad.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_FORM);
                setSubmitted(false);
              }}
              className="mt-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Cargar otro negocio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold text-ink-900">Contanos sobre tu negocio</h2>

            <div>
              <label htmlFor="businessName" className="mb-1 block text-sm font-medium text-ink-700">
                Nombre del comercio
              </label>
              <input
                id="businessName"
                required
                value={form.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
                placeholder="Ej: Parrilla El Fortín"
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-ink-700">
                Categoría
              </label>
              <select
                id="category"
                required
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
              >
                <option value="" disabled>
                  Elegí una categoría
                </option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contactName" className="mb-1 block text-sm font-medium text-ink-700">
                  Nombre de contacto
                </label>
                <input
                  id="contactName"
                  required
                  value={form.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-700">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink-700">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full rounded-xl border border-ink-200 px-3 py-2.5 text-ink-900 focus-visible:outline-brand-600"
                placeholder="Contanos un poco más sobre tu negocio"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Publicar mi negocio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
