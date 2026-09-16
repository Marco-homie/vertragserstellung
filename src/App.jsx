import { useState, useEffect } from 'react'

// ─── LOGO (base64) ────────────────────────────────────────────────────────────
const LOGO_SRC = 'data:image/png;base64,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'

// ─── TIER DATA ───────────────────────────────────────────────────────────────────
const TIER_DATA = {
  'Standard': {
    preis: '0,00',
    preisLabel: 'Inklusive',
    tagline: '',
    features: [
      ['Verfügbarkeit', 'Mo–Fr 08:00–18:00 Uhr'],
      ['Reaktionszeit', 'Nächster Werktag'],
      ['Support-Kanäle', 'E-Mail, Telefon'],
      ['Persönlicher Sparrings-Partner', 'Nein'],
      ['Performance-Meetings', 'Auf Anfrage / bei Verfügbarkeit'],
      ['Service-Umfang', 'Fehlerbehebung'],
      ['Priorisierung bei Updates', 'Nein'],
    ],
  },
  'Express': {
    preis: '290,00',
    preisLabel: '290 € / Monat',
    tagline: '',
    features: [
      ['Verfügbarkeit', 'Mo–Fr 08:00–20:00 Uhr'],
      ['Reaktionszeit', 'Mo–Fr 4h'],
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
      ['Reaktionszeit', 'Mo–Fr 2h, Sa 4h'],
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
  const _sofortVal = parseFloat((d.monatlichPreis||'').replace(/\./g,'').replace(',','.'))
  const _regelpreisStr = isNaN(_sofortVal) ? '–' : String(Math.round(_sofortVal * 1.1))
  const _abDatum = (() => {
    const p = (d.sofortpreisGueltigBis||'').split('.')
    if (p.length === 3) {
      const dt = new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0])+1)
      return String(dt.getDate()).padStart(2,'0')+'.'+String(dt.getMonth()+1).padStart(2,'0')+'.'+dt.getFullYear()
    }
    return d.sofortpreisGueltigBis
  })()
  const _setupAbDatum = (() => {
    const p = (d.setupGueltigBis||'').split('.')
    if (p.length === 3) {
      const dt = new Date(parseInt(p[2]), parseInt(p[1])-1, parseInt(p[0])+1)
      return String(dt.getDate()).padStart(2,'0')+'.'+String(dt.getMonth()+1).padStart(2,'0')+'.'+dt.getFullYear()
    }
    return d.setupGueltigBis
  })()
  const tier = TIER_DATA[d.serviceLevel] || TIER_DATA['Standard']
  const serviceRow = `
    <tr>
      <td style="padding:8px;border:1px solid #ccc;font-weight:bold">3</td>
      <td style="padding:8px;border:1px solid #ccc">
        <strong>Enterprise Customer Service Level (${d.serviceLevel})</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 16px;margin-top:6px;font-size:10pt;line-height:1.5">
          ${tier.features.map(([k,v]) => `<div>– ${k}: ${v}</div>`).join('')}
        </div>
        <div style="margin-top:6px;font-size:10pt;font-style:italic"><em>Andere Service-Pakete sind jederzeit zubuchbar (optional).</em></div>
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
  h2{font-size:11.5pt;font-weight:bold;margin-top:22px;border-bottom:1.5px solid #ddd;padding-bottom:4px;page-break-after:avoid;break-after:avoid}p{margin:5px 0;orphans:4;widows:4}h2+p{page-break-before:avoid}
  table{width:100%;border-collapse:collapse;margin:10px 0;font-size:10.5pt}
  th{background:#1E3A5F;color:#fff;padding:8px 10px;text-align:left}
  td{border:1px solid #ccc;padding:7px 9px;vertical-align:top}
  p{margin:5px 0}
  .c{text-align:center}
  @media print{@page{margin:2cm 2.5cm 2cm 2cm}.logo-header{position:fixed;top:12px;right:24px;width:80px;filter:grayscale(100%)}}
</style>
</head>
<body>
<div style="text-align:right;margin-bottom:8px"><img src="${d.logoSrc}" class="logo-header" style="width:80px;filter:grayscale(100%)" alt="homie AI" /></div>
<h1>Software-Nutzungsvertrag: KI-Agent "homie AI"</h1>
<p class="c" style="color:#555;font-size:10pt">Softwareanwendung für: ${d.firmenname}</p>
<p>von</p>
<p><strong>baoo Technologies GmbH</strong><br/>c/o Projekton, Salierring 32<br/>50677 Köln<br/>– nachfolgend <strong>"Auftragnehmer"</strong> genannt –</p>
<p>an</p>
<p><strong>${d.firmenname}</strong><br/>${d.strasse} ${d.hausnummer}${d.adresszusatz ? '<br/>' + d.adresszusatz : ''}<br/>${d.plz} ${d.stadt}<br/>${d.land}<br/>– nachfolgend <strong>"Auftraggeber"</strong> genannt –</p>
<p>Köln, den ${d.vertragsdatum}</p>

<h2>Präambel</h2>
<p>Der Auftragnehmer hat mit <strong>homie AI</strong> eine KI-gestützte Beratungssoftware entwickelt (nachfolgend auch "KI-Agent" oder "Software" genannt), die Unternehmen aller Branchen dabei unterstützt, ihren Kunden, Partnern und Interessenten einen intelligenten, automatisierten Kontakt rund um die Uhr zu bieten.</p>
<p>homie AI führt eigenständige Beratungs- und Informationsgespräche, gibt Empfehlungen und beantwortet Anfragen zu Produkten, Leistungen, Services und weiteren Themen des Auftraggebers – kontextsensitiv, mehrsprachig und jederzeit verfügbar. Die Tiefe der Beratung richtet sich dabei nach Thema und Anfrage.</p>
<p>Der Auftraggeber ist die ${d.firmenname}.</p>

<h2>§1 Vertragsgegenstand</h2>
<p>Gegenstand des Vertrages ist die entgeltliche monatliche Nutzung der KI-Live-Beratungssoftware ("KI-Agent") des Auftragnehmers in dem Leistungspaket ENTERPRISE gemäß der Leistungsbeschreibung in Abschnitt 4 dieses Vertrages und in der jeweils aktuellen und bereitgestellten Version (nachfolgend: "Software") während der Laufzeit dieses Vertrages.</p>
<p>Die technische Integration der Software beim Auftraggeber erfolgt je nach Einsatzszenario über ein Code-Snippet (iFrame oder JavaScript), eine API-Anbindung oder eine andere individuell vereinbarte Schnittstelle. Des Weiteren erhält der Auftraggeber Zugriff per Login auf eine Plattform zur Verwaltung des KI-Agenten.</p>

<h2>§2 Obliegenheiten des Kunden</h2>
<p>Der Auftraggeber stellt einen zentralen Ansprechpartner für das technische Setup des KI-Agenten zur Verfügung, da die Einrichtung individuell für den Auftraggeber erfolgt.</p>
<p>Der Auftraggeber stellt dem Auftragnehmer relevante Daten und Informationen bereit, auf deren Grundlage der KI-Agent laufend betrieben wird. Dazu gehören insbesondere Produkt-, Leistungs- und Servicedaten des Auftraggebers. Die Bereitstellung kann beispielsweise per API oder Datenfeed erfolgen.</p>
<p>Die technische Integration des KI-Agenten durch den Auftraggeber erfolgt gemäß der gemeinsam vereinbarten Implementierungsmethode.</p>

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
  <td><strong>Individuelles technisches Set-Up des KI-Agenten</strong>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 16px;margin-top:6px;font-size:10pt;line-height:1.5">
    <div>– Daten &amp; Inhalte anbinden, Daten-Cluster anlegen</div>
    <div>– Interface auf CI des Auftraggebers anpassen</div>
    <div>– Live-Daten-Abgleich einrichten</div>
    <div>– Technische Integration bereitstellen (JS, iFrame o. ä.)</div>
    <div>– Dialog und Kommunikation anpassen</div>
    <div>– Dashboard für Administration bereitstellen</div>
  </div></td>
  <td style="text-align:center">1</td><td style="text-align:center">Pauschal</td><td>${d.setupPreisStaffelung ? `<strong>${d.setupPreis}&nbsp;€</strong><div style="font-size:9.5pt;color:#666;margin-top:3px">Setup-Preis gültig bis ${d.setupGueltigBis}</div><strong>${d.setupRegelpreis}&nbsp;€</strong><div style="font-size:9.5pt;color:#666;margin-top:3px">Setup-Preis ab ${_setupAbDatum}</div>` : `<strong>${d.setupPreis}&nbsp;€</strong>`}</td>
</tr>
</table>
<p><em>Alle Preise zzgl. gesetzlicher Mehrwertsteuer (19%)</em></p>

<p><strong>Monatliche wiederkehrende Leistungen – Leistungspaket "ENTERPRISE":</strong></p>
<table>
<tr><th style="width:40px">Pos.</th><th>Leistung</th><th style="width:50px">Anz.</th><th style="width:80px">Einheit</th><th style="width:120px">Preis (netto)</th></tr>
<tr>
  <td><strong>2</strong></td>
  <td><strong>Leistungspaket ENTERPRISE</strong>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 20px;margin-top:8px;font-size:10pt;line-height:1.5">
    <div>
      <strong>Umfang</strong><br/>
      ${d.kiAssistenten} KI-Agenten<br/>
      ${d.produktseiten} Produktdetailseiten mit KI-Fragen<br/>
      Inkl. ${d.nachrichtenProMonat} Nachrichten/Monat<br/>
      Je weitere Nachricht: ${d.preisProNachricht}&nbsp;€
    </div>
    <div>
      <strong>Data Dashboard</strong><br/>
      – Live-Einsicht Kunden-Interaktionen &amp; Nutzerbewertungen<br/>
      – Auswertung der Kunden-Interaktionen<br/>
      – Individuelle Einstellungen | bis zu 10 Zugänge
    </div>
  </div>
  <div style="margin-top:8px;font-size:10pt;line-height:1.5">
    <strong>Inklusivleistungen:</strong> White-Label KI-Agenten-Lösung · Individuelle Tonalität · 24/7 Live-Daten Abgleich &amp; Verfügbarkeit · Voice- &amp; Texteingabe in &gt;50 Sprachen
  </div></td>
  <td style="text-align:center">1</td><td style="text-align:center">Monat</td><td><strong>${d.monatlichPreis}&nbsp;€</strong><div style="font-size:9.5pt;color:#666;margin-top:3px">Sofortpreis gültig bis ${d.sofortpreisGueltigBis}</div><strong>${_regelpreisStr}&nbsp;€</strong><div style="font-size:9.5pt;color:#666;margin-top:3px">Regelpreis ab ${_abDatum}</div></td>
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
<p>Die Datenverarbeitung wird in dem angehängten AVV, nebst den technischen und organisatorischen Maßnahmen (TOMs), dargestellt.</p>
<p>Der Auftragnehmer sichert alle Daten des Auftraggebers (z.B. Produkt- oder Bestandsdaten) in einem separaten Datenbank Cluster mit Multi-Tenancy (Mandantentrennung). Die Daten sind auf Servern in Deutschland gesichert.</p>
<p>Der Auftragnehmer stellt dem Auftraggeber auf Wunsch eine Datenschutzerklärung, nebst Nutzungsbedingungen für die Nutzung des KI-Agenten, zur Verfügung.</p>

<h2>§10 Haftungsausschluss</h2>
<p>Haftung des Auftragnehmers tritt nur bei Verletzung von Kardinalpflichten, grober Fahrlässigkeit oder Vorsatz ein. Haftung für Körper-, Lebens- und Gesundheitsschäden bleibt unberührt.</p>

<h2>§11 Geheimhaltung und Vertraulichkeit</h2>
<p>Kundendaten werden nicht mit anderen Vertragspartnern ausgetauscht (Mandantentrennung). Nicht-öffentliche Daten werden nur für den laufenden Betrieb des KI-Agenten genutzt.</p>

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
    firmenname: '', strasse: '', hausnummer: '', plz: '', stadt: '', adresszusatz: '', land: 'Deutschland',
    unterzeichner1Name: '', unterzeichner1Position: '',
    hatZweitenUnterzeichner: false, unterzeichner2Name: '', unterzeichner2Position: '',
    kiAssistenten: '', produktseiten: '', nachrichtenProMonat: '', preisProNachricht: '',
    setupPreis: '', setupPreisStaffelung: false, setupGueltigBis: '', setupRegelpreis: '', monatlichPreis: '',
    serviceLevel: 'Standard',
    vertragslaufzeit: '12', testphase: 'keine', sonderkuendigungsrecht: '2',
    vertragsdatum: new Date().toLocaleDateString('de-DE'),
    gfName: 'Marco Werner', gfPosition: 'Geschäftsführer',
    gfEmail: 'marco@yourhomie.ai', senderEmail: '',
    praxisberichtZustimmung: true,
    sonstiges: '',
  })
  const set = (k, v) => setF(p => ({ ...p, [k]: v }))

  const goPreview = () => { setContractHTML(buildContractHTML({...f, logoSrc: LOGO_SRC})); setStep(5) }

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
  Produktdetailseiten:      ${f.produktseiten}
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
  const step2ok = f.kiAssistenten && f.produktseiten && f.nachrichtenProMonat && f.preisProNachricht
  const step3ok = f.setupPreis && f.monatlichPreis && /^\d{2}\.\d{2}\.\d{4}$/.test(f.sofortpreisGueltigBis) && (!f.setupPreisStaffelung || (f.setupRegelpreis && /^\d{2}\.\d{2}\.\d{4}$/.test(f.setupGueltigBis)))
  const step4ok = f.vertragsdatum

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
            <Field label="Adresszusatz"><Inp value={f.adresszusatz} onChange={v => set('adresszusatz', v)} placeholder="c/o, Etage, Gebäude …" /></Field>
            <Row>
              <div style={{ flex: 0.7 }}><Field label="PLZ" required><Inp value={f.plz} onChange={v => set('plz', v)} placeholder="50667" /></Field></div>
              <div style={{ flex: 2 }}><Field label="Stadt" required><Inp value={f.stadt} onChange={v => set('stadt', v)} placeholder="Köln" /></Field></div>
            </Row>
            <Field label="Land" required><Inp value={f.land} onChange={v => set('land', v)} placeholder="Deutschland" /></Field>
          </Card>

          <Card title="1. Unterzeichner (Auftraggeber)">
            <Row>
              <div style={{ flex: 1 }}><Field label="Vor- und Nachname" required><Inp value={f.unterzeichner1Name} onChange={v => set('unterzeichner1Name', v)} placeholder="z.B. Florian Bein" /></Field></div>
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
              <div style={{ flex: 1 }}><Field label="Anzahl KI-Assistenzen" required><Inp value={f.kiAssistenten} onChange={v => set('kiAssistenten', v)} placeholder="" /></Field></div>
              <div style={{ flex: 1 }}><Field label="Produktdetailseiten mit KI-Fragen" required><Inp value={f.produktseiten} onChange={v => set('produktseiten', v)} placeholder="" /></Field></div>
            </Row>
            <Row>
              <div style={{ flex: 1 }}><Field label="Inklusiv-Nachrichten / Monat" required><Inp value={f.nachrichtenProMonat} onChange={v => set('nachrichtenProMonat', v)} placeholder="" /></Field></div>
              <div style={{ flex: 1 }}>
                <Field label="Preis je weiterer Nachricht (netto)" required>
                  <div style={{ position: 'relative' }}>
                    <Inp value={f.preisProNachricht} onChange={v => set('preisProNachricht', v)} placeholder="" />
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                  </div>
                </Field>
              </div>
            </Row>
          </Card>

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

          <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '14px 18px',
            border: '1px solid #BFDBFE', marginBottom: 18 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1D4ED8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Immer inklusive im Enterprise-Paket</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 0', fontSize: 12.5, color: '#3B82F6' }}>
              {['White-Label ChatBot-Lösung','Individuelle Chat-Tonalität','Voice- & Texteingabe >50 Sprachen','Data Dashboard (bis 10 Zugänge)'].map(i => <p key={i}>✓ {i}</p>)}
            </div>
          </div>

          <NavRow onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!step2ok} />
        </>)}

        {/* STEP 3 */}
        {step === 3 && (<>
          <p style={{ fontSize: 21, fontWeight: 700, color: '#1E2D40', marginBottom: 3 }}>Preise & Konditionen</p>
          <p style={{ fontSize: 13.5, color: '#64748B', marginBottom: 26 }}>Alle Preise netto, zzgl. 19% MwSt.</p>

          <Card title="Setup-Gebühr (einmalig)">
            <Field label="Setup-Preis (netto)" required>
              <div style={{ position: 'relative' }}>
                <Inp value={f.setupPreis} onChange={v => set('setupPreis', v)} placeholder="" />
                <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
              </div>
            </Field>
            <Toggle on={f.setupPreisStaffelung} onToggle={v => set('setupPreisStaffelung', v)} label="Zeitlich gestaffelter Setup-Preis" sub="Zwei Preise mit Datum — z.B. bei zeitlich befristetem Angebot" />
            {f.setupPreisStaffelung && (
              <Row>
                <div style={{ flex: 1 }}>
                  <Field label="Setup-Preis gültig bis" required>
                    <Inp value={f.setupGueltigBis} onChange={v => set('setupGueltigBis', v)} placeholder="TT.MM.JJJJ" />
                    <p style={{ fontSize: 11.5, marginTop: 4, color: f.setupGueltigBis && !/^\d{2}\.\d{2}\.\d{4}$/.test(f.setupGueltigBis) ? '#EF4444' : '#94A3B8' }}>
                      {f.setupGueltigBis && !/^\d{2}\.\d{2}\.\d{4}$/.test(f.setupGueltigBis) ? '⚠ Bitte im Format TT.MM.JJJJ eingeben' : 'Format: TT.MM.JJJJ'}
                    </p>
                  </Field>
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="Setup-Preis ab Folgedatum (netto)" required>
                    <div style={{ position: 'relative' }}>
                      <Inp value={f.setupRegelpreis} onChange={v => set('setupRegelpreis', v)} placeholder="" />
                      <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                    </div>
                  </Field>
                </div>
              </Row>
            )}
          </Card>

          <Card title="Monatliche Vergütung">
            <Row>
              <div style={{ flex: 1 }}>
                <Field label="Sofortpreis / Monat (netto)" required>
                  <div style={{ position: 'relative' }}>
                    <Inp value={f.monatlichPreis} onChange={v => set('monatlichPreis', v)} placeholder="" />
                    <span style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>€</span>
                  </div>
                </Field>
              </div>
              <div style={{ flex: 1 }}>
                <Field label="Sofortpreis gültig bis" required>
                  <Inp value={f.sofortpreisGueltigBis} onChange={v => set('sofortpreisGueltigBis', v)} placeholder="TT.MM.JJJJ" />
                  <p style={{ fontSize: 11.5, marginTop: 4, color: f.sofortpreisGueltigBis && !/^\d{2}\.\d{2}\.\d{4}$/.test(f.sofortpreisGueltigBis) ? '#EF4444' : '#94A3B8' }}>
                    {f.sofortpreisGueltigBis && !/^\d{2}\.\d{2}\.\d{4}$/.test(f.sofortpreisGueltigBis) ? '⚠ Bitte im Format TT.MM.JJJJ eingeben' : 'Format: TT.MM.JJJJ'}
                  </p>
                </Field>
              </div>
            </Row>
            {f.monatlichPreis && (() => {
              const _v = parseFloat(f.monatlichPreis.replace(/\./g, '').replace(',', '.'))
              if (isNaN(_v)) return null
              return (
                <Field label="Regelpreis / Monat (netto) — automatisch berechnet">
                  <div style={{ padding: '9px 13px', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 8, fontSize: 13.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: '#1E293B' }}>{String(Math.round(_v * 1.1))} €</span>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>Sofortpreis + 10 %</span>
                  </div>
                </Field>
              )
            })()}
          </Card>

          <div style={{ borderLeft: '3px solid #D97706', background: '#FFFBEB', borderRadius: '0 6px 6px 0', padding: '11px 16px', marginBottom: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', margin: '0 0 2px' }}>Achte auf ein realistisches Datum.</p>
              <p style={{ fontSize: 13, color: '#B45309', margin: 0 }}>Nicht zu kurzfristig, aber auch nicht zu langfristig. Berücksichtige Informationen wie Urlaub, Budget-Termine im Unternehmen etc.</p>
            </div>
          </div>

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
                    <div style={{ paddingTop: 10 }}>
                      <p style={{ fontSize: 10, color: '#94A3B8', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monatlich (netto)</p>
                      <p style={{ fontSize: 16, fontWeight: 700, color: active ? '#2563EB' : '#1E293B', margin: '0 0 6px' }}>
                        {tier === 'Standard' ? <span style={{ fontSize: 13, fontWeight: 500, color: '#059669' }}>Inklusive</span> : `${t.preis} €`}
                      </p>
                      <p style={{ fontSize: 11, color: '#64748B', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>Andere Service-Pakete jederzeit buchbar (optional)</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {f.setupPreis && f.monatlichPreis && f.sofortpreisGueltigBis && (
            <div style={{ background: '#1E2D40', borderRadius: 10, padding: '16px 22px', marginBottom: 18 }}>
              <p style={{ fontSize: 10.5, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Preisübersicht</p>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[['Setup (einmalig)', `${f.setupPreis} €`], [`Sofortpreis / Monat (bis ${f.sofortpreisGueltigBis})`, `${f.monatlichPreis} €`], ['Regelpreis / Monat', `${String(Math.round(parseFloat(f.monatlichPreis.replace(/\./g,'').replace(',','.'))*1.1))} €`], [`Service Level (${f.serviceLevel})`, `${f.serviceLevel === 'Standard' ? 'Inklusive' : `${TIER_DATA[f.serviceLevel]?.preis || '0,00'} €`}`]].map(([l,v]) => (
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
            <Field label="Heutiges Datum" required>
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
            <Btn variant="secondary" onClick={downloadGoogleDocs}>⬇ Google Docs herunterladen (.html)</Btn>

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



          <div style={{
            marginBottom: 24, padding: '18px 22px',
            background: '#FFF8E7',
            border: '2px solid #F59E0B',
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#92400E', marginBottom: 10 }}>
              📋 Wie geht es weiter?
            </div>
            <div style={{ color: '#78350F', fontSize: 13.5, lineHeight: 1.8 }}>
              <div>1. Kundenordner unter <strong>Offene Verträge</strong> in Google Drive anlegen</div>
              <div>2. Docs-Datei (.html) herunterladen → in den Ordner hochladen → mit <strong>Google Docs</strong> öffnen</div>
              <div>3. In Google Docs: <strong>Extras → eSignature</strong> → Unterschriftsfeld für <strong>GF Marco Werner</strong> setzen</div>
              <div>4. Signing-Anfrage absenden — Marco erhält einen Link per E-Mail zur Unterzeichnung</div>
              <div>5. Nach Unterzeichnung: fertig signiertes Dokument + <strong>AVV</strong> an Kunden senden</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Btn variant="secondary" onClick={() => setStep(4)}>← Bearbeiten</Btn>
          </div>
        </>)}

      </div>
    </div>
  )
}
