// Funksjon for å rendre ansatte i grid
function renderAnsatte(liste)  {
  const grid = document.getElementById("ansatteGrid");
  grid.innerHTML = "";
  liste.forEach(a => {
    const kontorInfo = kontorer[a.kontor] || { navn: a.kontor, etasje: "", bygning: "" };
    const card = document.createElement("div");
    card.className = "card";
    // Bygg tekst for kurs, håndter både numeriske id-er og tekst-verdier
    let kursTekst = 'Ingen kursansvar';
    if (a.kursansvar?.harKursansvar) {
      const kListe = (a.kursansvar.kurs || []).map(item => {
        return (typeof item === 'number') ? (kurs[item] || item) : item;
      });
      kursTekst = 'Kursansvar: ' + kListe.join(', '); 
    }

    // Sett HTML-innhold uten slett-knappen
    card.innerHTML = `
      <h2>${navn[a.id]}</h2>
      <p><strong>Stilling:</strong> ${stillinger[a.stillingId].navn}</p>
      <p><strong>Kategori:</strong> ${stillinger[a.stillingId].kategori}</p>
      <p><strong>Kontor:</strong> ${kontorInfo.navn}${kontorInfo.etasje ? " (" + kontorInfo.etasje + ", " + kontorInfo.bygning + ")" : ""}</p>
      <p class="email"><strong>E-post:</strong> <a href="mailto:${emails[a.id]}">${emails[a.id]}</a></p>
      <p>${kursTekst}</p>
    `;
    // Legg til en slett-knapp i kortet
    const deleteBtn = createDeleteButton(a.id, navn[a.id]);
    const actionsWrap = document.createElement('div');
    actionsWrap.style.marginTop = '12px';
    actionsWrap.appendChild(deleteBtn);
    card.appendChild(actionsWrap);
    grid.appendChild(card);
  });
}

// Oppretter en ekte HTML-knapp som kaller slettPerson(id) ved klikk
function createDeleteButton(id, navnStr) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'filter-btn delete-btn';
  btn.id = `slett-${id}`;
  btn.dataset.deleteId = String(id);
  btn.setAttribute('aria-label', `Slett ${navnStr}`);
  btn.textContent = 'Slett person';
  btn.addEventListener('click', () => {
    slettPerson(id);
  });
  return btn;
}

 // Slett en ansatt basert på ID
function slettPerson(id) {
  const index = ansatte.findIndex(a => a.id === id);
  if (index === -1) return;
  ansatte.splice(index, 1);
  renderAnsatte(ansatte);
}

// Hjelpefunksjoner og skjema-logic for å legge til ny ansatt
function getNextId() {
  return Math.max(0, ...ansatte.map(a => a.id)) + 1;
}

// Fyll stilling-select og kurs-select i skjema//
function populateStillings() {
  const sel = document.getElementById('stillingSelect');
  if (!sel) return;
  sel.innerHTML = Object.keys(stillinger).map(id => `<option value="${id}">${stillinger[id].navn}</option>`).join('');
  // Når stilling endres, slå av/på kursfeltet
  sel.addEventListener('change', toggleKursInput);
}


// Slå av/på kurs-input basert på stilling //
function toggleKursInput() {
  const kursInput = document.getElementById('kursInput');
  const stillingSel = document.getElementById('stillingSelect');
  if (!kursInput || !stillingSel) return;
  const id = parseInt(stillingSel.value, 10);
  // Kun Professor (4) og Lektor (5) kan legge til kurs
  if (id === 4 || id === 5) {
    kursInput.disabled = false;
    kursInput.placeholder = 'Skriv kurs (komma-separert)';
  } else {
    kursInput.disabled = true;
    kursInput.value = '';
    kursInput.placeholder = 'Kun Professor/Lektor kan legge til kurs';
  }
}


// Fyll kurs-select i skjema
function populateKurs() {
  const sel = document.getElementById('kursSelect');
  if (!sel) return;
  sel.innerHTML = Object.keys(kurs).map(id => `<option value="${id}">${kurs[id]}</option>`).join('');
}


// Legg til ny ansatt fra skjema
function leggTilAnsatt() {
  const fornavn = document.getElementById('fornavn')?.value.trim();
  const etternavn = document.getElementById('etternavn')?.value.trim();
  const epost = document.getElementById('epost')?.value.trim();
  const kontor = document.getElementById('kontor')?.value.trim() || '';
  const stillingSel = document.getElementById('stillingSelect');
  const kursInput = document.getElementById('kursInput');
  const formError = document.getElementById('formError');


  // Hjelpefunksjon for å sette feilmelding
  function setFormError(msg, focusEl) {
    if (formError) formError.textContent = msg || '';
    if (msg && focusEl) focusEl.focus();
  }
  // Valider påkrevde felt
  if (!fornavn || !etternavn || !epost || !stillingSel) {
    setFormError('Fyll ut fornavn, etternavn, e-post og stilling.', document.getElementById(!fornavn ? 'fornavn' : !etternavn ? 'etternavn' : 'epost'));
    return;
  }

  // Enkel e-post-validering: må inneholde '@'
  if (!epost.includes('@')) {
    setFormError('E-post må inneholde @', document.getElementById('epost'));
    return;
  }


  // Hent stillingId og kursliste
  const stillingId = parseInt(stillingSel.value, 10); 
  const kursValues = (kursInput?.value || '').split(',').map(s => s.trim()).filter(Boolean);


// Opprett ny ansatt-objekt
  const newId = getNextId();
  // Oppdater navne- og epost-mapper slik resten av koden bruker
  navn[newId] = `${fornavn} ${etternavn}`;
  emails[newId] = epost;


  // Lag ny ansatt-objekt
  const nyAnsatt = {
    id: newId,
    stillingId: stillingId,
    kontor: kontor,
    kursansvar: { harKursansvar: kursValues.length > 0, kurs: kursValues }
  };


  // Legg til i ansatte-listen og rendre på nytt
  ansatte.push(nyAnsatt);
  renderAnsatte(ansatte);

  // Tøm skjema
  document.getElementById('fornavn').value = '';
  document.getElementById('etternavn').value = '';
  document.getElementById('epost').value = '';
  document.getElementById('kontor').value = '';
  if (kursInput) kursInput.value = '';
  stillingSel.selectedIndex = 0;
  // fjern eventuelle feilmeldinger
  setFormError('');
}

// Initialiser skjema ved DOM-lastning
document.addEventListener('DOMContentLoaded', () => {
  populateStillings();
  populateKurs();
  // Fjern inline feilmelding når brukeren endrer innhold
  ['fornavn','etternavn','epost','kontor','kursInput','stillingSelect'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const feilmeld = document.getElementById('formError');
      if (feilmeld) feilmeld.textContent = '';
    });
  });
  // Initial toggle av kursfeltet
  toggleKursInput();
});


// --- Filter funksjoner ---
function visAlle() { renderAnsatte(ansatte); }
function visUndervisere() {
  renderAnsatte(ansatte.filter(a => stillinger[a.stillingId].kategori === "Undervisere"));
}


// Vis administrasjon
function visAdministrasjon() {
  renderAnsatte(ansatte.filter(a => stillinger[a.stillingId].kategori === "Administrasjon"));
}
function visMedKursansvar() { renderAnsatte(ansatte.filter(a => a.kursansvar?.harKursansvar)); }
function visUtenKursansvar() { renderAnsatte(ansatte.filter(a => !a.kursansvar?.harKursansvar)); }
function filtrerStilling(stilling) { renderAnsatte(ansatte.filter(a => a.stilling === stilling)); }
function filtrerKontor(kode) { renderAnsatte(ansatte.filter(a => a.kontor === kode)); }

// Initialiser visning ved DOM-lastning 
document.addEventListener("DOMContentLoaded", () => {
  // initial visning
  visAlle();

  // Koble filter-knapper //
  document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte); // start med alle

  // knapper for spesifikke stillinger basert på stillingId //
  document.querySelectorAll("[data-stilling-id]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.currentTarget.dataset.stillingId, 10);
      const filtrert = ansatte.filter(a => a.stillingId === id);
      renderAnsatte(filtrert);
    });
  });
});

// Koble filter-knapper
  const map = id => document.getElementById(id);
  map("btnAlle")?.addEventListener("click", () => { visAlle(); toggleActive("btnAlle"); });
  map("btnUndervisere")?.addEventListener("click", () => { visUndervisere(); toggleActive("btnUndervisere"); });
  map("btnAdministrasjon")?.addEventListener("click", () => { visAdministrasjon(); toggleActive("btnAdministrasjon"); });
  map("btnMedKurs")?.addEventListener("click", () => { visMedKursansvar(); toggleActive("btnMedKurs"); });
  map("btnUtenKurs")?.addEventListener("click", () => { visUtenKursansvar(); toggleActive("btnUtenKurs"); });

  
  // <button data-stilling="Bibliotekar" class="btn-stilling">Bibliotekar</button>
  document.querySelectorAll("[data-stilling]").forEach(btn =>
    btn.addEventListener("click", e => {
      filtrerStilling(e.currentTarget.dataset.stilling);
      clearActiveGroup("data-stilling");
      e.currentTarget.classList.add("active");
    })
  );

  // <button data-kontor="A101" class="btn-kontor">A101</button>
  document.querySelectorAll("[data-kontor]").forEach(btn =>
    btn.addEventListener("click", e => {
      filtrerKontor(e.currentTarget.dataset.kontor);
      clearActiveGroup("data-kontor");
      e.currentTarget.classList.add("active");
    })
  );
});


// --- Hjelpefunksjoner for knapptilstand ---
function toggleActive(id) {
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}
// Fjern "active" fra alle knapper i en gruppe
function clearActiveGroup(attr) {
  document.querySelectorAll(`[${attr}]`).forEach(b => b.classList.remove("active"));
}

// Vis alle kurs nederst på siden
function visAlleKurs() {
  const kursDiv = document.getElementById("kursContainer");
  kursDiv.innerHTML = `
    <h2>Alle kurs</h2>
    <ul>
      ${Object.values(kurs).map(k => `<li>${k}</li>`).join("")}
    </ul>
  `;
}
// Initialiser visning ved DOM-lastning
document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte);  // viser personkortene
  visAlleKurs();           // viser kurslisten nederst
});

// Knapper for spesifikke stillinger basert på stillingId "se over denne blokken"
document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte); // start med alle
  document.querySelectorAll("[data-stilling-id]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.currentTarget.dataset.stillingId, 10);
      const filtrert = ansatte.filter(a => a.stillingId === id);
      renderAnsatte(filtrert);
    });
  });
});




