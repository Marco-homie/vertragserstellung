import { useState, useEffect } from 'react'

// ─── TIER DATA ───────────────────────────────────────────────────────────────────
const TIER_DATA = {
  'Standard': {
    preis: '0,00',
    preisLabel: 'Inklusive',
    tagline: '',
    features: [
      ['Verfügbarkeit', 'Mo–Fr 10:00–16:00 Uhr'],
      ['Reaktionszeit', 'Nächster Werktag'],
      ['Support-Kanäle', 'E-Mail'],
      ['Persönlicher Sparrings-Partner', 'Nein'],
      ['Performance-Meetings', 'Auf Anfrage'],
      ['Service-Umfang', 'Fehlerbehebung'],
      ['Priorisierung bei Updates', 'Nein'],
    ],
  },
  'Express': {
    preis: '290,00',
    preisLabel: '290 € / Monat',
    tagline: '',
    features: [
      ['Verfügbarkeit', 'Mo–Fr 08:00–18:00 Uhr'],
      ['Reaktionszeit', 'Mo–Fr 8h'],
      ['Support-Kanäle', 'E-Mail, Telefon'],
      ['Persönlicher Sparrings-Partner', 'Ja'],
      ['Performance-Meetings', '1× pro Quartal, fix terminiert'],
      ['Service-Umfang', 'Fehlerbehebung, Beratung & individuelle Anpassungen'],
      ['Priorisierung bei Updates', 'Ja'],
    ],
  },
  'Priority': {
    preis: '490,00',
    preisLabel: '490 € / Monat',
    tagline: '',
    features: [
      ['Verfügbarkeit', 'Mo–Fr 08:00–20:00 Uhr + Sa 10:00–18:00 Uhr'],
      ['Reaktionszeit', 'Mo–Fr 4h, Sa 6h'],
      ['Support-Kanäle', 'E-Mail, Telefon, Slack/Teams/WhatsApp'],
      ['Persönlicher Sparrings-Partner', 'Ja'],
      ['Performance-Meetings', '1× pro Monat, fix terminiert'],
      ['Service-Umfang', 'Fehlerbehebung, Beratung, individuelle Anpassungen & proaktive Optimierung'],
      ['Priorisierung bei Updates', 'Ja, inkl. eigene Testumgebung'],
    ],
  },
}

// ─── CONTRACT HTML BUILDER ────────────────────────────────────────────────────
function buildContractHTML(d) {
  const tier = TIER_DATA[d.serviceLevel] || TIER_DATA['Standard']
  const serviceRow = `
    <tr>
      <td style="padding:8px;border:1px solid #ccc;font-weight:bold">3</td>
      <td style="padding:8px;border:1px solid #ccc">
        <strong>Enterprise Customer Service Level (${d.serviceLevel})</strong><br/>
        ${tier.features.map(([k,v]) => `– ${k}: ${v}`).join('<br/>')}
      </td>
      <td style="padding:8px;border:1px solid #ccc;text-align:center">1</td>
      <td style="padding:8px;border:1px solid #ccc;text-align:center">Monat</td>
      <td style="padding:8px;border:1px solid #ccc;font-weight:bold">${tier.preis}&nbsp;€</td>
    </tr>`

  const testphaseText = d.testphase !== 'keine' ? `
    <p>Dem Auftraggeber wird eine kostenlose Testphase von ${d.testphase} eingeräumt. Die Testphase beginnt mit Vertragsabschluss und ist Bestandteil der Grundlaufzeit von ${d.vertragslaufzeit} Monaten. Während der Testphase sind alle vertraglich vereinbarten Leistungen vollständig verfügbar.</p>` : ''

  const sonderkuendigungsText = `
    <p>Dem Auftraggeber wird ein Sonderkündigungsrecht von ${d.sonderkuendigungsrecht} Monaten ab Vertragsabschluss eingeräumt. Innerhalb dieses Zeitraums kann der Auftraggeber den Vertrag jederzeit in Textform kündigen, ohne dass weitere Kosten entstehen. Die Grundlaufzeit von ${d.vertragslaufzeit} Monaten beginnt erst nach Ablauf des Sonderkündigungsrechts.</p>`

  const sig2 = d.hatZweitenUnterzeichner ? `
<table style="width:100%;margin-top:32px;border-collapse:collapse">
<tr>
  <td style="width:50%;border:none;padding:0;padding-right:40px;vertical-align:top">
    <div style="border-bottom:1px solid #333;width:220px;margin-bottom:7px">&nbsp;</div>
    <div style="font-size:10pt"><strong>${d.firmenname}</strong></div>
    <div style="font-size:10pt;color:#555">${d.unterzeichner2Name} · ${d.unterzeichner2Position}</div>
  </td>
  <td style="width:50%;border:none;padding:0;vertical-align:top">
    <div style="border-bottom:1px solid #333;width:220px;margin-bottom:7px">&nbsp;</div>
    <div style="font-size:10pt"><strong>baoo Technologies GmbH</strong></div>
    <div style="font-size:10pt;color:#555">&nbsp;</div>
  </td>
</tr>
</table>` : ''

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><title>Vertrag – ${d.firmenname}</title>
<style>
  body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.65;color:#111;max-width:840px;margin:0 auto;padding:48px 40px}
  h1{font-size:15pt;text-align:center;margin-bottom:4px}
  h2{font-size:11.5pt;font-weight:bold;margin-top:22px;border-bottom:1.5px solid #ddd;padding-bottom:4px}
  table{width:100%;border-collapse:collapse;margin:10px 0;font-size:10.5pt}
  th{background:#1E3A5F;color:#fff;padding:8px 10px;text-align:left}
  td{border:1px solid #ccc;padding:7px 9px;vertical-align:top}
  p{margin:5px 0}
  .c{text-align:center}
  @media print{@page{margin:2cm}}
</style>
</head>
<body>
<h1>Software-Nutzungsvertrag: KI-Assistenz "homie AI"</h1>
<p class="c" style="color:#555;font-size:10pt">Softwareanwendung für: ${d.firmenname}</p>
<p>von</p>
<p><strong>baoo Technologies GmbH</strong><br/>c/o Projekton, Salierring 32<br/>50677 Köln<br/>– nachfolgend <strong>"Auftragnehmer"</strong> genannt –</p>
<p>an</p>
<p><strong>${d.firmenname}</strong><br/>${d.strasse} ${d.hausnummer}<br/>${d.plz} ${d.stadt}<br/>– nachfolgend <strong>"Auftraggeber"</strong> genannt –</p>
<p>Köln, den ${d.vertragsdatum}</p>

<h2>Präambel</h2>
<p>Der Auftragnehmer hat mit <strong>homie AI</strong> eine KI-gestützte Beratungssoftware entwickelt (nachfolgend auch "KI-Assistenz" oder "Software" genannt), die Unternehmen aller Branchen dabei unterstützt, ihren Kunden, Partnern und Interessenten einen intelligenten, automatisierten Kontakt rund um die Uhr zu bieten.</p>
<p>homie AI führt eigenständige Beratungs- und Informationsgespräche, gibt Empfehlungen und beantwortet Anfragen zu Produkten, Leistungen, Services und weiteren Themen des Auftraggebers – kontextsensitiv, mehrsprachig und jederzeit verfügbar. Die Tiefe der Beratung richtet sich dabei nach Thema und Anfrage.</p>
<p>Der Auftraggeber ist die ${d.firmenname}</p>

<h2>§1 Vertragsgegenstand</h2>
<p>Gegenstand des Vertrages ist die entgeltliche monatliche Nutzung der KI-Live-Beratungssoftware ("KI-Assistenz") des Auftragnehmers in dem Leistungspaket ENTERPRISE gemäß der Leistungsbeschreibung in Abschnitt 4 dieses Vertrages und in der jeweils aktuellen und bereitgestellten Version (nachfolgend: "Software") während der Laufzeit dieses Vertrages.</p>
<p>Die technische Integration der Software beim Auftraggeber erfolgt je nach Einsatzszenario über ein Code-Snippet (iFrame oder JavaScript), eine API-Anbindung oder eine andere individuell vereinbarte Schnittstelle. Des Weiteren erhält der Auftraggeber Zugriff per Login auf eine Plattform zur Verwaltung der KI-Assistenz.</p>

<h2>§2 Obliegenheiten des Kunden</h2>
<p>Der Auftraggeber stellt einen zentralen Ansprechpartner für das technische Setup des KI-Assistenzs zur Verfügung, da die Einrichtung individuell für den Auftraggeber erfolgt.</p>
<p>Der Auftraggeber stellt dem Auftragnehmer relevante Daten und Informationen bereit, auf deren Grundlage die KI-Assistenz trainiert und laufend betrieben wird. Dazu gehören insbesondere Produkt-, Leistungs- und Servicedaten des Auftraggebers. Die Bereitstellung kann beispielsweise per API oder Datenfeed erfolgen.</p>
<p>Die technische Integration der KI-Assistenz durch den Auftraggeber erfolgt gemäß der gemeinsam vereinbarten Implementierungsmethode.</p>

<h2>§3 Softwareüberlassung</h2>
<p>Der Auftragnehmer räumt dem Auftraggeber das nicht-ausschließliche, nicht-übertragbare und nicht-unterlizenzierbare Nutzungsrecht an der Software für die Laufzeit dieses Vertrages ein.</p>
<p>Die Software wird dem Auftraggeber in einer Private-Cloud zur Nutzung bereitgehalten. Der Auftraggeber erhält Zugriff über die bereitgestellte technische Schnittstelle sowie Zugangsdaten für das Dashboard.</p>
${(parseFloat(d.setupPreis.replace(',','.')) || 0) > 0 ? '<p>Der Auftragnehmer wird das initiale technische SetUp für die individuelle Software-Anpassung und Bereitstellung für den Auftraggeber einmalig entgeltlich abrechnen.</p>' : ''}

<h2>§4 Leistungspaket und Softwarenutzung</h2>
<p><strong>Einmalige Leistungen:</strong></p>
<table>
<tr><th style="width:40px">Pos.</th><th>Leistung</th><th style="width:50px">Anz.</th><th style="width:80px">Einheit</th><th style="width:120px">Preis (netto)</th></tr>
<tr>
  <td><strong>1</strong></td>
  <td><strong>Individuelles technisches Set-Up des KI-Assistenzs</strong><br/>
  – Relevante Daten und Inhalte des Auftraggebers anbinden und in einem individuellen Daten-Cluster anlegen<br/>
  – Einrichtung eines laufenden Live-Daten-Abgleichs<br/>
  – KI initial auf Produkte, Leistungen und Inhalte des Auftraggebers trainieren und fine-tunen<br/>
  – Dialog und Kommunikation anpassen<br/>
  – Chat-Interface auf CI des Auftraggebers anpassen<br/>
  – Technische Integrationslösung bereitstellen (z. B. JavaScript Snippet, iFrame oder individuelle Schnittstelle)<br/>
  – Dashboard für Administration bereitstellen</td>
  <td style="text-align:center">1</td><td style="text-align:center">Pauschal</td><td><strong>${d.setupPreis}&nbsp;€</strong></td>
</tr>
</table>
<p><em>Alle Preise zzgl. gesetzlicher Mehrwertsteuer (19%)</em></p>

<p><strong>Monatliche wiederkehrende Leistungen – Leistungspaket "ENTERPRISE":</strong></p>
<table>
<tr><th style="width:40px">Pos.</th><th>Leistung</th><th style="width:50px">Anz.</th><th style="width:80px">Einheit</th><th style="width:120px">Preis (netto)</th></tr>
<tr>
  <td><strong>2</strong></td>
  <td><strong>Leistungspaket ENTERPRISE</strong><br/>
  ${d.kiAssistenten} KI-Assistenzen<br/>
  ${d.landingpages} Landingpages im Wissensspeicher<br/>
  ${d.produktseiten} Produktseiten mit Produktfragen<br/><br/>
  <strong>Data Dashboard</strong><br/>
  – Live-Einsicht in alle Chats und Nutzerbewertungen<br/>
  – Auswertung der Chat-Interaktionen<br/>
  – Individuelle Einstellungen des KI-Assistenzs<br/>
  – bis zu 10 Zugänge<br/><br/>
  <strong>Inklusivleistungen</strong><br/>
  – White-Label ChatBot-Lösung, Individuelle Chat-Tonalität<br/>
  – 24/7 Live-Daten Abgleich &amp; Verfügbarkeit<br/>
  – Voice- und Texteingabe in &gt;50 Sprachen<br/><br/>
  <strong>Inkl. Volumen:</strong> ${d.nachrichtenProMonat} Nachrichten/Monat<br/>
  Jede weitere Nachricht: ${d.preisProNachricht}&nbsp;€</td>
  <td style="text-align:center">1</td><td style="text-align:center">Monat</td><td><strong>${d.monatlichPreis}&nbsp;€</strong></td>
</tr>
${serviceRow}
</table>
<p><em>Alle Preise zzgl. gesetzlicher Mehrwertsteuer (19%)</em></p>

<h2>§5 Vertragslaufzeit und Kündigung</h2>
<p>Der Softwarenutzungsvertrag wird für eine Laufzeit von ${d.vertragslaufzeit} Monaten geschlossen (Grundlaufzeit) und kann beiderseitig mit einer Kündigungsfrist von 3 Monaten zum Ende der Grundlaufzeit gekündigt werden. Wird der Vertrag nicht gekündigt, verlängert sich der Vertrag um weitere ${d.vertragslaufzeit} Monate mit gleicher Kündigungsfrist.</p>
${testphaseText}
${sonderkuendigungsText}
<p>Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor, wenn der Auftraggeber mit der Zahlung in Verzug gerät oder sich Kontaktdaten und Zahlungsmittel als unrichtig erweisen.</p>
<p>Jede Kündigung bedarf der Textform.</p>

<h2>§6 Vergütung und Preisanpassung</h2>
<p>Der Auftraggeber zahlt eine einmalige Einrichtungsgebühr sowie die vereinbarte monatliche Vergütung gemäß §4.</p>
<p>Die Vergütung wird quartalsweise im Voraus gezahlt, spätestens bis zum dritten Werktag des jeweiligen Leistungszeitraumes.</p>
<p>Der Auftragnehmer ist berechtigt, den Zugriff zu sperren, wenn der Auftraggeber mit der Zahlung mindestens zwanzig (20) Werktage in Verzug ist.</p>
<p>Erstmalig nach 12 Monaten kann der Auftragnehmer die Vergütung um max. 10% erhöhen, mit mindestens 3 Monaten Vorlauf in Textform. Der Auftraggeber hat ein Sonderkündigungsrecht innerhalb von 4 Wochen nach Mitteilung.</p>

<h2>§7 Änderung des Leistungspaketes</h2>
<p>Einvernehmliche Paketanpassungen während der Laufzeit sind in Schriftform möglich, wirksam jeweils zum Monatsbeginn.</p>

<h2>§8 Systemverfügbarkeit</h2>
<p>Der Auftragnehmer verpflichtet sich zu einer durchschnittlichen monatlichen Systemverfügbarkeit von mindestens 99,9%.</p>
<p>Ausgenommen sind: geplante Wartungen (3 Werktage Vorlauf), höhere Gewalt sowie kundenseitige Infrastruktur.</p>
<p>Bei Unterschreitung ist der Auftraggeber berechtigt, eine verhältnismäßige Vergütungsminderung zu verlangen.</p>

<h2>§9 Datenschutz</h2>
<p>Der Auftragnehmer verarbeitet im Rahmen dieses Vertrags keine personenbezogenen Daten. Sollte er dennoch welche erhalten, informiert er den Auftraggeber unverzüglich.</p>
<p>Alle Daten sind auf deutschen Servern in einem separaten Datenbankcluster mit Multi-Tenancy gesichert.</p>
<p>Eine Beschreibung der TOMs und die EU-AI-Act-Konformität sind im Anhang aufgeführt.</p>

<h2>§10 Haftungsausschluss</h2>
<p>Haftung des Auftragnehmers tritt nur bei Verletzung von Kardinalpflichten, grober Fahrlässigkeit oder Vorsatz ein. Haftung für Körper-, Lebens- und Gesundheitsschäden bleibt unberührt.</p>

<h2>§11 Geheimhaltung und Vertraulichkeit</h2>
<p>Kundendaten werden nicht mit anderen Vertragspartnern ausgetauscht (Mandantentrennung). Nicht-öffentliche Daten werden nur für den laufenden Chat-Betrieb genutzt.</p>

${d.praxisberichtZustimmung ? `
<h2>§12 Referenzkundenstatus und Praxisbericht</h2>
<p>Der Auftraggeber erklärt sich einverstanden, dass der Auftragnehmer die Zusammenarbeit im Rahmen eines Praxisberichts (Use-Case) dokumentieren und veröffentlichen darf. Der Auftragnehmer ist berechtigt, den Unternehmensnamen, das Logo sowie eine Beschreibung des Einsatzszenarios und erzielter Ergebnisse in Marketingmaterialien, auf der Website, in Präsentationen, sozialen Medien und auf Fachmessen zu verwenden.</p>
<p>Der Auftragnehmer informiert den Auftraggeber vor der Erstveröffentlichung des Praxisberichts.</p>
<p>Diese Einwilligung ist freiwillig, kostenlos und jederzeit in Textform widerrufbar. Der Widerruf gilt für künftige Veröffentlichungen; bereits veröffentlichte Materialien bleiben davon unberührt. Die Erteilung oder Verweigerung dieser Einwilligung hat keine Auswirkungen auf die vertraglichen Leistungen oder die Vergütung.</p>
` : ''}
<h2>${d.praxisberichtZustimmung ? '§13' : '§12'} Schlussbestimmungen</h2>
<p>Mündliche Nebenabreden bestehen nicht. Änderungen bedürfen der Schriftform. Es gilt deutsches Recht.</p>

${d.sonstiges ? `
<h2>${d.praxisberichtZustimmung ? '§14' : '§13'} Sonstiges</h2>
<p>${d.sonstiges.replace(/\n/g, '<br/>')}</p>
` : ''}

<p style="margin-top:48px;font-size:10pt;color:#555">Köln, den ${d.vertragsdatum}</p>

<table style="width:100%;margin-top:32px;border-collapse:collapse">
<tr>
  <td style="width:50%;border:none;padding:0;padding-right:40px;vertical-align:top">
    <div style="border-bottom:1px solid #333;width:220px;margin-bottom:7px">&nbsp;</div>
    <div style="font-size:10pt"><strong>${d.firmenname}</strong></div>
    <div style="font-size:10pt;color:#555">${d.unterzeichner1Name} · ${d.unterzeichner1Position}</div>
  </td>
  <td style="width:50%;border:none;padding:0;vertical-align:top">
    <div style="border-bottom:1px solid #333;width:220px;margin-bottom:7px">&nbsp;</div>
    <div style="font-size:10pt"><strong>baoo Technologies GmbH</strong></div>
    <div style="font-size:10pt;color:#555">${d.gfName} · ${d.gfPosition}</div>
  </td>
</tr>
</table>

${sig2}
<p style="margin-top:28px;font-size:9pt;color:#888">baoo Technologies GmbH &nbsp;|&nbsp; c/o Projekton, Salierring 32, 50677 Köln</p>
</body></html>`
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const inp = {
  width: '100%', padding: '9px 13px', border: '1.5px solid #E2E8F0', borderRadius: 8,
  fontSize: 13.5, color: '#1E293B', background: '#fff', boxSizing: 'border-box',
  outline: 'none', fontFamily: 'inherit',
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Field({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B',
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
        {label}{required && <span style={{ color: '#EF4444', marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 4 }}>{hint}</p>}
    </div>
  )
}

function Inp({ value, onChange, placeholder, type = 'text' }) {
  const [focus, setFocus] = useState(false)
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{ ...inp, borderColor: focus ? '#2563EB' : '#E2E8F0', transition: 'border-color 0.15s' }} />
  )
}

function Sel({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inp, cursor: 'pointer', appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32 }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function Toggle({ on, onToggle, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 4 }}>
      <button onClick={() => onToggle(!on)} style={{
        width: 38, height: 21, borderRadius: 10.5, cursor: 'pointer', border: 'none',
        padding: 0, background: on ? '#2563EB' : '#CBD5E1', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0, marginTop: 1 }}>
        <span style={{ position: 'absolute', top: 2.5, left: on ? 19 : 2.5, width: 16, height: 16,
          borderRadius: '50%', background: '#fff', transition: 'left 0.2s', display: 'block',
          boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }} />
      </button>
      <div>
        <p style={{ fontSize: 13.5, color: '#334155', fontWeight: 500 }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{sub}</p>}
      </div>
    </div>
  )
}

function Card({ title, accent, hint, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 26, border: '1px solid #E2E8F0', marginBottom: 18 }}>
      {title && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: accent || '#2563EB',
            textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: hint ? 3 : 0 }}>{title}</p>
          {hint && <p style={{ fontSize: 12, color: '#94A3B8' }}>{hint}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

function PillSelect({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          padding: '9px 20px', borderRadius: 20, fontSize: 13.5, fontWeight: value === o.value ? 600 : 400,
          background: value === o.value ? '#2563EB' : '#F1F5F9',
          color: value === o.value ? '#fff' : '#475569',
          border: value === o.value ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
          {value === o.value && <span style={{ marginRight: 6 }}>✓</span>}
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Row({ children }) {
  return <div style={{ display: 'flex', gap: 12 }}>{children}</div>
}

function Btn({ onClick, disabled, children, variant = 'primary', fullWidth }) {
  const base = { padding: '10px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
    transition: 'all 0.15s', border: 'none', width: fullWidth ? '100%' : undefined }
  const variants = {
    primary:   { background: '#2563EB', color: '#fff' },
    secondary: { background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' },
    success:   { background: '#059669', color: '#fff' },
    ghost:     { background: 'transparent', color: '#64748B', border: '1px solid transparent' },
  }
  return <button onClick={!disabled ? onClick : undefined} style={{ ...base, ...variants[variant] }}>{children}</button>
}

function NavRow({ onBack, onNext, nextLabel = 'Weiter →', nextDisabled }) {
  return (
    <div style={{ display: 'flex', justifyContent: onBack ? 'space-between' : 'flex-end', marginTop: 28 }}>
      {onBack && <Btn variant="secondary" onClick={onBack}>← Zurück</Btn>}
      <Btn onClick={onNext} disabled={nextDisabled}>{nextLabel}</Btn>
    </div>
  )
}

// ─── SETTINGS MODAL ───────────────────────────────────────────────────────────
function SettingsModal({ onClose }) {
  const [key, setKey] = useState(() => localStorage.getItem('baoo_api_key') || '')
  const save = () => { localStorage.setItem('baoo_api_key', key); onClose() }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 32, width: 460,
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: '#1E2D40', marginBottom: 6 }}>Einstellungen</p>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
          Für den automatischen E-Mail-Versand via Claude API wird ein Anthropic API Key benötigt.
        </p>
        <Field label="Anthropic API Key"
          hint="Wird lokal im Browser gespeichert. Unter console.anthropic.com abrufbar.">
          <input type="password" value={key} onChange={e => setKey(e.target.value)}
            placeholder="sk-ant-..." style={{ ...inp, fontFamily: 'monospace', fontSize: 12 }} />
        </Field>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
          <Btn variant="secondary" onClick={onClose}>Abbrechen</Btn>
          <Btn onClick={save}>Speichern</Btn>
        </div>
      </div>
    </div>
  )
}

// ─── STEPS CONFIG ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Kundendaten',    note: 'Firma & Unterzeichner'  },
  { id: 2, label: 'Leistungspaket', note: 'Umfang konfigurieren'   },
  { id: 3, label: 'Preise',         note: 'Setup & monatlich'      },
  { id: 4, label: 'Optionen',       note: 'Datum & Versand'        },
  { id: 5, label: 'Vorschau',       note: 'Prüfen & absenden'      },
]

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]           = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [contractHTML, setContractHTML] = useState('')
  const [sendState, setSendState] = useState('idle') // idle | sending | sent | error
  const [sendMsg, setSendMsg]     = useState('')

  const [f, setF] = useState({
    firmenname: '', strasse: '', hausnummer: '', plz: '', stadt: '',
    unterzeichner1Name: '', unterzeichner1Position: '',
    hatZweitenUnterzeichner: false, unterzeichner2Name: '', unterzeichner2Position: '',
    kiAssistenten: '', landingpages: '', produktseiten: '', nachrichtenProMonat: '', preisProNachricht: '0,05',
    setupPreis: '', monatlichPreis: '',
    serviceLevel: 'Standard',
    vertragslaufzeit: '12', testphase: 'keine', sonderkuendigungsrecht: '2',
    vertragsdatum: new Date().toLocaleDateString('de-DE'),
    gfName: 'Marco Werner', gfPosition: 'Geschäftsführer',
    gfEmail: 'marco@yourhomie.ai', senderEmail: '',
    praxisberichtZustimmung: true,
    sonstiges: '',
  })
  const set = (k, v) => setF(p => ({ ...p, [k]: v }))

  const goPreview = () => { setContractHTML(buildContractHTML(f)); setStep(5) }

  const openPrint = () => {
    try {
      const win = window.open('', '_blank')
      if (!win) { setSendMsg('Popup-Blocker aktiv – bitte kurz deaktivieren und nochmal klicken.'); return }
      win.document.title = `Vertrag – ${f.firmenname}`
      win.document.write(contractHTML)
      win.document.close()
      setTimeout(() => { win.focus(); win.print() }, 600)
    } catch(e) { setSendMsg('PDF-Export fehlgeschlagen: ' + e.message) }
  }

  const downloadGoogleDocs = () => {
    try {
      const blob = new Blob([contractHTML], { type: 'text/html;charset=utf-8' })
      const url  = URL.createObjectURL(blob)
      const a    = Object.assign(document.createElement('a'), {
        href: url,
        download: `Vertrag_${(f.firmenname || 'Kunde').replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.html`,
        style: 'display:none',
      })
      document.body.appendChild(a); a.click()
      setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url) }, 500)
    } catch(e) { setSendMsg('Download fehlgeschlagen: ' + e.message) }
  }

  // Open native email client with pre-filled content
  const openMailto = () => {
    const subject = encodeURIComponent(`Zur Unterzeichnung: Software-Nutzungsvertrag mit ${f.firmenname}`)
    const body = encodeURIComponent(
`Hallo,

ein neuer ENTERPRISE-Vertrag wurde vom Sales-Team erstellt und wartet auf deine Prüfung und Unterzeichnung.

VERTRAGSDETAILS
────────────────────────────
Kunde:            ${f.firmenname}
Adresse:          ${f.strasse} ${f.hausnummer}, ${f.plz} ${f.stadt}
Datum:            ${f.vertragsdatum}
Paket:            ENTERPRISE

PREISE (netto, zzgl. 19% MwSt.)
  Setup (einmalig):         ${f.setupPreis} €
  Monatlich ENTERPRISE:     ${f.monatlichPreis} €\n  Service Level (${f.serviceLevel}):    ${f.serviceLevel === 'Standard' ? 'Inklusive' : `${TIER_DATA[f.serviceLevel]?.preis || '0,00'} €/Monat`}

LEISTUNGSUMFANG
  KI-Assistenzen:           ${f.kiAssistenten}
  Landingpages:             ${f.landingpages}
  Produktseiten:            ${f.produktseiten}
  Nachrichten/Monat:        ${f.nachrichtenProMonat}
  Laufzeit:                 ${f.vertragslaufzeit} Monate
  Testphase:                ${f.testphase}
  Sonderkündigungsrecht:    ${f.sonderkuendigungsrecht} Monate

UNTERZEICHNER KUNDENSEITE:
  ${f.unterzeichner1Name} (${f.unterzeichner1Position})${f.hatZweitenUnterzeichner ? `\n  ${f.unterzeichner2Name} (${f.unterzeichner2Position})` : ''}

Sales Manager:    ${f.senderEmail}
────────────────────────────
Das vollständige Vertragsdokument ist als HTML-Datei im Anhang beigefügt.
Bitte prüfe die Daten und zeichne den Vertrag ab.

Viele Grüße,
baoo Sales Team`)
    window.location.href = `mailto:${f.gfEmail}?subject=${subject}&body=${body}`
    setSendState('sent')
    setSendMsg('E-Mail-Client geöffnet. Bitte die E-Mail noch manuell absenden.')
  }

  // Auto-send via Anthropic API + Gmail MCP
  const sendViaAPI = async () => {
    const apiKey = localStorage.getItem('baoo_api_key')
    if (!apiKey) { setShowSettings(true); return }
    setSendState('sending'); setSendMsg('')
    const emailText = `Hallo,\n\nein neuer ENTERPRISE-Vertrag für ${f.firmenname} wartet auf deine Unterzeichnung.\n\nKunde: ${f.firmenname}, ${f.plz} ${f.stadt}\nSetup: ${f.setupPreis} €  |  Monatlich: ${f.monatlichPreis} €  |  Service Level (${f.serviceLevel}): ${f.serviceLevel === 'Standard' ? 'Inklusive' : `${TIER_DATA[f.serviceLevel]?.preis || '0,00'} €`}\nKI-Assistenzen: ${f.kiAssistenten}, Nachrichten/Mon: ${f.nachrichtenProMonat}\nSales Manager: ${f.senderEmail}\n\nBitte Vertrag prüfen und abzeichnen.\n\nViele Grüße, baoo Sales Team`
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6', max_tokens: 1000,
          messages: [{ role: 'user', content: `Bitte sende über Gmail eine E-Mail:\nAn: ${f.gfEmail}\nBetreff: Zur Unterzeichnung: Software-Nutzungsvertrag mit ${f.firmenname}\n\nInhalt:\n${emailText}` }],
          mcp_servers: [{ type: 'url', url: 'https://gmailmcp.googleapis.com/mcp/v1', name: 'gmail' }]
        })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const ok = (data.content || []).some(b => b.type === 'text' && b.text?.length > 5)
      if (ok) { setSendState('sent'); setSendMsg(`E-Mail erfolgreich an ${f.gfEmail} gesendet.`) }
      else { setSendState('error'); setSendMsg('Keine Bestätigung vom API. Bitte E-Mail-Client als Fallback nutzen.') }
    } catch (e) {
      setSendState('error'); setSendMsg('API-Fehler: ' + e.message)
    }
  }

  // Guards
  const step1ok = f.firmenname && f.strasse && f.hausnummer && f.plz && f.stadt && f.unterzeichner1Name && f.unterzeichner1Position
  const step2ok = f.kiAssistenten && f.landingpages && f.produktseiten && f.nachrichtenProMonat
  const step3ok = f.setupPreis && f.monatlichPreis
  const step4ok = f.vertragsdatum && f.gfEmail && f.senderEmail

  const hasApiKey = !!localStorage.getItem('baoo_api_key')

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', system-ui, sans-serif",
      background: '#F8FAFC', overflow: 'hidden' }}>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* ── SIDEBAR ── */}
      <div style={{ width: 210, background: '#1E2D40', padding: '26px 16px',
        flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginBottom: 1 }}>baoo</p>
        <p style={{ fontSize: 9.5, color: '#475569', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 34 }}>Contract Wizard</p>

        {STEPS.map(st => {
          const active = step === st.id
          const done   = step > st.id
          return (
            <div key={st.id} onClick={() => done && setStep(st.id)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px',
                borderRadius: 8, marginBottom: 2, cursor: done ? 'pointer' : 'default',
                background: active ? 'rgba(37,99,235,0.2)' : 'transparent', transition: 'background 0.15s' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                background: done ? '#059669' : active ? '#2563EB' : 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff' }}>
                {done ? '✓' : st.id}
              </div>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: active ? 600 : 400,
                  color: done ? '#6EE7B7' : active ? '#93C5FD' : '#64748B' }}>{st.label}</p>
                <p style={{ fontSize: 10.5, color: '#334155', marginTop: 1 }}>{st.note}</p>
              </div>
            </div>
          )
        })}

        <div style={{ flex: 1 }} />
        <button onClick={() => setShowSettings(true)}
          style={{ background: 'none', border: '1px solid #334155', borderRadius: 8,
            padding: '7px 12px', color: '#64748B', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, width: '100%' }}>
          ⚙ Einstellungen
        </button>
        <p style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.6 }}>
          baoo Technologies GmbH<br/>Köln · {new Date().getFullYear()}
        </p>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, padding: '36px 48px', overflowY: 'auto' }}>

        {/* STEP 1 */}
        {step === 1 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Kundendaten</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 26 }}>Unternehmen und Unterzeichner des Auftraggebers</p>

          <Card title="Unternehmen">
            <Field label="Firmenname" required><Inp value={f.firmenname} onChange={v => set('firmenname', v)} placeholder="Musterfirma GmbH" /></Field>
            <Row>
              <div style={{ flex: 2 }}><Field label="Straße" required><Inp value={f.strasse} onChange={v => set('strasse', v)} placeholder="Musterstraße" /></Field></div>
              <div style={{ flex: 0.7 }}><Field label="Nr." required><Inp value={f.hausnummer} onChange={v => set('hausnummer', v)} placeholder="12a" /></Field></div>
            </Row>
            <Row>
              <div style={{ flex: 0.7 }}><Field label="PLZ" required><Inp value={f.plz} onChange={v => set('plz', v)} placeholder="50667" /></Field></div>
              <div style={{ flex: 2 }}><Field label="Stadt" required><Inp value={f.stadt} onChange={v => set('stadt', v)} placeholder="Köln" /></Field></div>
            </Row>
          </Card>

          <Card title="1. Unterzeichner (Auftraggeber)">
            <Row>
              <div style={{ flex: 1 }}><Field label="Name" required><Inp value={f.unterzeichner1Name} onChange={v => set('unterzeichner1Name', v)} placeholder="Max Mustermann" /></Field></div>
              <div style={{ flex: 1 }}><Field label="Position / Funktion" required><Inp value={f.unterzeichner1Position} onChange={v => set('unterzeichner1Position', v)} placeholder="Geschäftsführer" /></Field></div>
            </Row>
          </Card>

          <Card>
            <Toggle on={f.hatZweitenUnterzeichner} onToggle={v => set('hatZweitenUnterzeichner', v)}
              label="Zweiter Unterzeichner" sub="Optional – z. B. bei Kollektivunterschrift oder Prokura" />
            {f.hatZweitenUnterzeichner && (
              <Row>
                <div style={{ flex: 1 }}><Field label="Name"><Inp value={f.unterzeichner2Name} onChange={v => set('unterzeichner2Name', v)} placeholder="Erika Musterfrau" /></Field></div>
                <div style={{ flex: 1 }}><Field label="Position"><Inp value={f.unterzeichner2Position} onChange={v => set('unterzeichner2Position', v)} placeholder="Prokuristin" /></Field></div>
              </Row>
            )}
          </Card>

          <NavRow onNext={() => setStep(2)} nextDisabled={!step1ok} />
        </>)}

        {/* STEP 2 */}
        {step === 2 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Leistungspaket ENTERPRISE</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 26 }}>Umfang der gebuchten Leistungen konfigurieren</p>

          <Card title="KI-Assistenzen & Inhalte">
            <Row>
              <div style={{ flex: 1 }}><Field label="Anzahl KI-Assistenzen" required><Inp value={f.kiAssistenten} onChange={v => set('kiAssistenten', v)} placeholder="z. B. 3" /></Field></div>
              <div style={{ flex: 1 }}><Field label="Landingpages im Wissensspeicher" required><Inp value={f.landingpages} onChange={v => set('landingpages', v)} placeholder="z. B. 50" /></Field></div>
            </Row>
            <Row>
              <div style={{ flex: 1 }}><Field label="Produktseiten mit Produktfragen" required><Inp value={f.produktseiten} onChange={v => set('produktseiten', v)} placeholder="z. B. 500" /></Field></div>
              <div style={{ flex: 1 }}><Field label="Inklusiv-Nachrichten / Monat" required><Inp value={f.nachrichtenProMonat} onChange={v => set('nachrichtenProMonat', v)} placeholder="z. B. 10.000" /></Field></div>
            </Row>
            <Row>
              <div style={{ flex: 1 }}>
                <Field label="Preis je weiterer Nachricht (netto)" required hint="Vorausgefüllt mit 0,05 € – bei Bedarf anpassen">
                  <div style={{ position: 'relative' }}>
                    <Inp value={f.preisProNachricht} onChange={v => set('preisProNachricht', v)} placeholder="0,05" />
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                  </div>
                </Field>
              </div>
              <div style={{ flex: 1 }} />
            </Row>
          </Card>

          <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '14px 18px',
            border: '1px solid #BFDBFE', marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1D4ED8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Immer inklusive im Enterprise-Paket</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 0', fontSize: 12.5, color: '#3B82F6' }}>
              {['White-Label ChatBot-Lösung','Individuelle Chat-Tonalität','24/7 Live-Daten Abgleich','24/7 Verfügbarkeit','Voice- & Texteingabe >50 Sprachen','Data Dashboard (bis 10 Zugänge)'].map(i => <p key={i}>✓ {i}</p>)}
            </div>
          </div>

          <div style={{
            borderLeft: '3px solid #D97706', background: '#FFFBEB',
            borderRadius: '0 6px 6px 0', padding: '11px 16px',
            marginBottom: 18, display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', margin: '0 0 2px' }}>Wir haben nichts zu verschenken.</p>
              <p style={{ fontSize: 13, color: '#B45309', margin: 0 }}>Bitte prüfe die Zahlen sorgfältig — wie hoch müssen sie wirklich sein?</p>
            </div>
          </div>

          <NavRow onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!step2ok} />
        </>)}

        {/* STEP 3 */}
        {step === 3 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Preise & Konditionen</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 26 }}>Alle Preise netto, zzgl. 19% MwSt.</p>

          <Card title="Einmalige & monatliche Vergütung">
            <Row>
              <div style={{ flex: 1 }}>
                <Field label="Setup-Preis (einmalig, netto)" required>
                  <div style={{ position: 'relative' }}>
                    <Inp value={f.setupPreis} onChange={v => set('setupPreis', v)} placeholder="2.500,00" />
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                  </div>
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field label="Monatliche Vergütung ENTERPRISE (netto)" required>
                  <div style={{ position: 'relative' }}>
                    <Inp value={f.monatlichPreis} onChange={v => set('monatlichPreis', v)} placeholder="499,00" />
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                  </div>
                </Field>
              </div>
            </Row>
          </Card>

          <Card title="Enterprise Customer Service Level" hint="Standard ist immer inklusive – Express und Priority als Upgrade buchbar">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 4 }}>
              {Object.keys(TIER_DATA).map(tier => {
                const t = TIER_DATA[tier]
                const active = f.serviceLevel === tier
                return (
                  <div key={tier} onClick={() => set('serviceLevel', tier)} style={{
                    border: active ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
                    borderRadius: 10, padding: '14px 14px 12px', cursor: 'pointer',
                    background: active ? '#EFF6FF' : '#fff', transition: 'all 0.15s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>                      <span style={{ fontSize: 13, fontWeight: 700, color: active ? '#2563EB' : '#334155' }}>{tier}</span>
                      {active && <span style={{ fontSize: 10, background: '#2563EB', color: '#fff', borderRadius: 4, padding: '2px 6px', fontWeight: 600 }}>✓</span>}
                    </div>
                    <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10, display: 'none' }}>{t.tagline}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                      {t.features.map(([k, v]) => (
                        <div key={k}>
                          <p style={{ fontSize: 11, fontWeight: 600, color: '#475569', margin: 0 }}>{k}</p>
                          <p style={{ fontSize: 11, color: '#64748B', margin: '1px 0 0' }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 10 }}>
                      <p style={{ fontSize: 10, color: '#94A3B8', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monatlich (netto)</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: active ? '#2563EB' : '#1E293B', margin: 0 }}>
                        {tier === 'Standard' ? <span style={{ fontSize: 13, fontWeight: 500, color: '#059669' }}>Inklusive</span> : `${t.preis} €`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {f.setupPreis && f.monatlichPreis && (
            <div style={{ background: '#1E2D40', borderRadius: 10, padding: '16px 22px', marginBottom: 18 }}>
              <p style={{ fontSize: 10.5, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Preisübersicht</p>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[['Setup (einmalig)', `${f.setupPreis} €`], ['ENTERPRISE / Monat', `${f.monatlichPreis} €`], [`Service Level (${f.serviceLevel})`, `${f.serviceLevel === 'Standard' ? 'Inklusive' : `${TIER_DATA[f.serviceLevel]?.preis || '0,00'} €`}`]].map(([l,v]) => (
                  <div key={l}>
                    <p style={{ fontSize: 11, color: '#64748B', marginBottom: 3 }}>{l}</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <NavRow onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!step3ok} />
        </>)}

        {/* STEP 4 */}
        {step === 4 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Optionen & Versand</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 26 }}>Vertragslaufzeit, Konditionen und E-Mail-Versand</p>

          <Card title="Vertragslaufzeit">
            <PillSelect
              value={f.vertragslaufzeit}
              onChange={v => set('vertragslaufzeit', v)}
              options={[
                { value: '12', label: '12 Monate' },
                { value: '24', label: '24 Monate' },
                { value: '36', label: '36 Monate' },
              ]}
            />
          </Card>

          <Card title="Kostenlose Testphase" hint="Teil der Vertragslaufzeit – beginnt mit Vertragsabschluss">
            <PillSelect
              value={f.testphase}
              onChange={v => set('testphase', v)}
              options={[
                { value: 'keine', label: 'Keine' },
                { value: '14 Tage', label: '14 Tage' },
              ]}
            />
          </Card>

          <Card title="Sonderkündigungsrecht" hint="Grundlaufzeit startet erst nach Ablauf des Sonderkündigungsrechts">
            <PillSelect
              value={f.sonderkuendigungsrecht}
              onChange={v => set('sonderkuendigungsrecht', v)}
              options={[
                { value: '2', label: '2 Monate' },
                { value: '3', label: '3 Monate' },
              ]}
            />
          </Card>

          <Card title="Vertragsdatum">
            <Field label="Datum des Vertragsabschlusses" required>
              <Inp value={f.vertragsdatum} onChange={v => set('vertragsdatum', v)} placeholder="29.07.2026" />
            </Field>
          </Card>

          <Card title="baoo – Unterzeichner (Auftragnehmer)">
            <Row>
              <div style={{ flex: 1 }}>
                <Field label="Name Geschäftsführer" required>
                  <Inp value={f.gfName} onChange={v => set('gfName', v)} placeholder="Marco Werner" />
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field label="Position">
                  <Inp value={f.gfPosition} onChange={v => set('gfPosition', v)} placeholder="Geschäftsführer" />
                </Field>
              </div>
            </Row>
          </Card>

          <Card title="Praxisbericht-Zustimmung" hint="Einwilligung zur Veröffentlichung eines Use-Case-Berichts – kostenlos, jederzeit widerrufbar">
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ value: true, label: 'Ja' }, { value: false, label: 'Nein' }].map(opt => (
                <button key={String(opt.value)} onClick={() => set('praxisberichtZustimmung', opt.value)} style={{
                  padding: '9px 28px', borderRadius: 20, fontSize: 13.5,
                  fontWeight: f.praxisberichtZustimmung === opt.value ? 600 : 400,
                  background: f.praxisberichtZustimmung === opt.value ? '#2563EB' : '#F1F5F9',
                  color: f.praxisberichtZustimmung === opt.value ? '#fff' : '#475569',
                  border: f.praxisberichtZustimmung === opt.value ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {f.praxisberichtZustimmung === opt.value && <span style={{ marginRight: 6 }}>✓</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Versand an Geschäftsführung">
            <Field label="E-Mail Geschäftsführer (Empfänger)" required
              hint="Der Vertrag wird per E-Mail an diese Adresse weitergeleitet">
              <Inp value={f.gfEmail} onChange={v => set('gfEmail', v)} placeholder="gf@baoo.de" type="email" />
            </Field>
            <Field label="Deine E-Mail (Sales Manager)" required
              hint="Für die interne Kommunikation">
              <Inp value={f.senderEmail} onChange={v => set('senderEmail', v)} placeholder="sales@baoo.de" type="email" />
            </Field>
          </Card>

          <Card title="Sonstiges" hint="Sonstiges ist vorher mit dem GF Marketing & Sales abzustimmen">
            <textarea
              value={f.sonstiges}
              onChange={e => set('sonstiges', e.target.value)}
              placeholder="Individuelle Vereinbarungen, Sonderkonditionen oder ergänzende Hinweise hier eintragen…"
              rows={5}
              style={{
                width: '100%', padding: '9px 13px', border: '1.5px solid #E2E8F0', borderRadius: 8,
                fontSize: 13.5, color: '#1E293B', background: '#fff', boxSizing: 'border-box',
                outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6,
              }}
            />
          </Card>

          <NavRow onBack={() => setStep(3)} onNext={goPreview} nextLabel="Vertrag generieren →" nextDisabled={!step4ok} />
        </>)}

        {/* STEP 5 */}
        {step === 5 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Vorschau & Versand</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 22 }}>
            Vertrag für <strong>{f.firmenname}</strong> · {f.vertragsdatum}
          </p>

          {/* Action bar */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
            <Btn variant="secondary" onClick={openPrint}>⬇ Als PDF speichern</Btn>
            <Btn variant="secondary" onClick={downloadGoogleDocs}>⬇ Google Docs (.html)</Btn>

            {sendState !== 'sent' ? (<>
              <Btn onClick={openMailto} variant="secondary">
                ✉ In Mail-Client öffnen
              </Btn>
              <Btn onClick={sendViaAPI} disabled={sendState === 'sending'}
                style={{ background: sendState === 'sending' ? '#94A3B8' : '#2563EB', color: '#fff', border: 'none' }}>
                {sendState === 'sending' ? 'Wird gesendet…' : `⚡ Automatisch senden${!hasApiKey ? ' (API Key benötigt)' : ''}`}
              </Btn>
            </>) : (
              <div style={{ padding: '9px 16px', background: '#F0FDF4', border: '1px solid #BBF7D0',
                borderRadius: 8, color: '#166534', fontSize: 13, fontWeight: 600 }}>
                ✅ Fertig!
              </div>
            )}

            {sendMsg && (
              <p style={{ fontSize: 12.5, color: sendState === 'error' ? '#991B1B' : '#64748B',
                background: sendState === 'error' ? '#FEF2F2' : 'transparent',
                padding: sendState === 'error' ? '8px 12px' : 0,
                borderRadius: 6, border: sendState === 'error' ? '1px solid #FECACA' : 'none' }}>
                {sendMsg}
              </p>
            )}
          </div>

          {/* Contract preview */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '10px 16px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', gap: 6 }}>
              {['#EF4444','#F59E0B','#10B981'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 12, color: '#94A3B8' }}>
                Vertragsvorschau — {f.firmenname}
              </span>
            </div>
            <iframe srcDoc={contractHTML} style={{ width: '100%', height: 620, border: 'none', display: 'block' }}
              title="Vertragsvorschau" sandbox="allow-same-origin" />
          </div>

          {/* Download bar below preview */}
          <div style={{ marginTop: 16, padding: '16px 20px', background: '#F8FAFC',
            border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', gap: 12,
            alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#64748B', marginRight: 4 }}>Dokument herunterladen:</span>
            <button onClick={openPrint} style={{
              padding: '9px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              background: '#1E3A5F', color: '#fff', border: 'none',
            }}>⬇ Als PDF speichern</button>
            <button onClick={downloadGoogleDocs} style={{
              padding: '9px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              background: '#fff', color: '#1E3A5F', border: '1.5px solid #1E3A5F',
            }}>⬇ Google Docs (.html)</button>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>→ In Google Drive hochladen → mit Google Docs öffnen</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: '-10px 0 16px' }}>
            💡 PDF-Tipp: Im Druckdialog unter „Weitere Einstellungen" → <strong>Kopf- und Fußzeilen deaktivieren</strong>
          </p>

          <div style={{ marginTop: 16 }}>
            <Btn variant="secondary" onClick={() => setStep(4)}>← Bearbeiten</Btn>
          </div>
        </>)}

      </div>
    </div>
  )
}
