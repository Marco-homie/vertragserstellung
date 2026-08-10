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
            <Btn variant="secondary" onClick={downloadHTML}>⬇ HTML herunterladen</Btn>
            <Btn variant="secondary" onClick={downloadWord}>⬇ Word (.doc) herunterladen</Btn>

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

          <div style={{ marginTop: 20 }}>
            <Btn variant="secondary" onClick={() => setStep(4)}>← Bearbeiten</Btn>
          </div>
        </>)}

      </div>
    </div>
  )
}
