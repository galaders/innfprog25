const NAVN_LISTE = [
      "Ola Nordmann", "Kari Olsen", "Per Hansen", "Anne Johansen",
      "Morten Berg", "Lise Nilsen", "Erik Larsen", "Sara Pedersen",
      "Jonas Kristoffersen", "Camilla Andresen", "Henrik Solberg",
      "Marte Lie", "Sindre Aas", "Helene Dahl", "Tor Eriksen",
      "Ida Svendsen", "Magnus Haugen", "Nora Evensen", "Eirik Moe",
      "Sofie Gundersen", "Greg Jensen"
    ];
    
    // Datastruktur med alle kontor
// --- Kontorer (kan tilpasses) ---
const kontorer = {
  A101: { navn: "Kontor A101", etasje: "1. etasje", bygning: "Hovedbygget" },
  A102: { navn: "Kontor A102", etasje: "1. etasje", bygning: "Hovedbygget" },
  A103: { navn: "Kontor A103", etasje: "1. etasje", bygning: "Hovedbygget" },
  B201: { navn: "Kontor B201", etasje: "2. etasje", bygning: "Bygg B" },
  B202: { navn: "Kontor B202", etasje: "2. etasje", bygning: "Bygg B" },
  B203: { navn: "Kontor B203", etasje: "2. etasje", bygning: "Bygg B" },
  C301: { navn: "Kontor C301", etasje: "3. etasje", bygning: "Bygg C" },
  C302: { navn: "Kontor C302", etasje: "3. etasje", bygning: "Bygg C" },
  C303: { navn: "Kontor C303", etasje: "3. etasje", bygning: "Bygg C" },
  D401: { navn: "Kontor D401", etasje: "4. etasje", bygning: "Bygg D" },
  D402: { navn: "Kontor D402", etasje: "4. etasje", bygning: "Bygg D" },
  D403: { navn: "Kontor D403", etasje: "4. etasje", bygning: "Bygg D" },
  E210: { navn: "Kontor E210", etasje: "2. etasje", bygning: "Bygg E" },
  E211: { navn: "Kontor E211", etasje: "2. etasje", bygning: "Bygg E" },
  E212: { navn: "Kontor E212", etasje: "2. etasje", bygning: "Bygg E" },
  F115: { navn: "Kontor F115", etasje: "1. etasje", bygning: "Bygg F" },
  F116: { navn: "Kontor F116", etasje: "1. etasje", bygning: "Bygg F" },
  G320: { navn: "Kontor G320", etasje: "3. etasje", bygning: "Bygg G" },
  G321: { navn: "Kontor G321", etasje: "3. etasje", bygning: "Bygg G" },
  H105: { navn: "Kontor H105", etasje: "1. etasje", bygning: "Bygg H" },
  H205: { navn: "Kontor H205", etasje: "2. etasje", bygning: "Bygg H" }
};

const navn = {
  1: "Greg Jensen",
  2: "Kari Olsen",
  3: "Per Hansen",
  4: "Anne Johansen",
  5: "Morten Berg",
  6: "Lise Nilsen",
  7: "Erik Larsen",
  8: "Sara Pedersen",
  9: "Jonas Kristoffersen",
  10: "Camilla Andresen",
  11: "Henrik Solberg", 
  12: "Marte Lie",
  13: "Sindre Aas",
  14: "Tor Eriksen",
  15: "Ida Svendsen",
  16: "Magnus Haugen",
  17: "Nora Evensen",
  18: "Eirik Moe",
  19: "Sofie Gundersen",
  20: "Helene Dahl",
  21: "Ola Nordmann",
};

const emails = {
  1: "Greg.Jensen@hiof.no",
  2: "Kari.Olsen@hiof.no",
  3: "Per.Hansen@hiof.no",
  4: "Anne.Johansen@hiof.no",
  5: "Morten.Berg@hiof.no",
  6: "Lise.Nilsen@hiof.no",
  7: "Erik.Larsen@hiof.no",
  8: "Sara.Pedersen@hiof.no",
  9: "Jonas.Kristoffersen@hiof.no",
  10: "Camilla.Andresen@hiof.no",
  11: "Henrik.Solberg@hiof.no",
  12: "Marte.Lie@hiof.no",
  13: "Sindre.Aas@hiof.no",
  14: "Tor.Eriksen@hiof.no",
  15: "Ida.Svendsen@hiof.no",
  16: "Magnus.Haugen@hiof.no",
  17: "Nora.Evensen@hiof.no",
  18: "Eirik.Moe@hiof.no",
  19: "Sofie.Gundersen@hiof.no",
  20: "Helene.Dahl@hiof.no",
  21: "Ola.Nordmann@hiof.no",
};

// Kurs-struktur
const kurs = {
  1: "Programmering 1",
  2: "Webutvikling",
  3: "3D-modellering",
  4: "3D-Animasjon",
  5: "3D-Spillutvikling",
  6: "Kunstig intelligens",
  7: "Maskinlæring",
  8: "Databaser",
  9: "Operativsystemer",
  10: "Webdesign",
  11: "Responsiv Utvikling",
  12: "Grunnleggende JavaScript",
  13: "Frontend_utvikling",
  14: "CSS og design",
  15: "Python og web",
  16: "Systemutvikling",
  17: "Datakommunikasjon",
  18: "Datasikkerhet"
};

const stillinger = {
  1: { navn: "Rektor", kategori: "Administrasjon" },
  2: { navn: "Dekan", kategori: "Administrasjon" },
  3: { navn: "Vaktmester", kategori: "Administrasjon" },
  4: { navn: "Professor", kategori: "Undervisere" },
  5: { navn: "Lektor", kategori: "Undervisere" }
};





// 21 ansatte med kobling til kontorer
const ansatte = [
  // Administrasjon (6)
  { id: 1, stillingId: 1, kontor: "A101", kursansvar: { harKursansvar: false } },

  { id: 2, stillingId: 2, kontor: "A102", kursansvar: { harKursansvar: false } },
  { id: 3, stillingId: 2, kontor: "A103", kursansvar: { harKursansvar: false } },

  { id: 4, stillingId: 3, kontor: "B201", kursansvar: { harKursansvar: false } },
  { id: 5, stillingId: 3, kontor: "B202", kursansvar: { harKursansvar: false } },
  { id: 6, stillingId: 3, kontor: "B203", kursansvar: { harKursansvar: false } },

  // Professorer (5) - Undervisere
  { id: 7, stillingId: 4, kontor: "C301", kursansvar: { harKursansvar: true, kurs: [1, 2] } },
  { id: 8, stillingId: 4, kontor: "C302", kursansvar:  { harKursansvar: true, kurs: [3, 4] } },
  { id: 9, stillingId: 4, kontor: "C303", kursansvar: { harKursansvar: true, kurs: [5, 6] } },
  { id: 10, stillingId: 4, kontor: "D401", kursansvar: { harKursansvar: true, kurs: [7] } },
  { id: 11, stillingId: 4, kontor: "D402", kursansvar: { harKursansvar: true, kurs: [8] } },

  // Lektorer (10) - Undervisere
  { id: 12, stillingId: 5, kontor: "D403", kursansvar: { harKursansvar: true, kurs: [9] } },
  { id: 13, stillingId: 5, kontor: "E210", kursansvar: { harKursansvar: true, kurs: [10] } },
  { id: 14, stillingId: 5, kontor: "E211", kursansvar: { harKursansvar: true, kurs: [11] } },
  { id: 15, stillingId: 5, kontor: "E212", kursansvar: { harKursansvar: true, kurs: [12] } },
  { id: 16, stillingId: 5, kontor: "F115", kursansvar: { harKursansvar: true, kurs: [13] } },
  { id: 17, stillingId: 5, kontor: "F116", kursansvar: { harKursansvar: true, kurs: [14] } },
  { id: 18, stillingId: 5, kontor: "G320", kursansvar: { harKursansvar: true, kurs: [15] } },
  { id: 19, stillingId: 5, kontor: "G321", kursansvar: { harKursansvar: true, kurs: [16] } },
  { id: 20, stillingId: 5, kontor: "H105", kursansvar: { harKursansvar: true, kurs: [17] } },
  { id: 21, stillingId: 5, kontor: "H205", kursansvar: { harKursansvar: true, kurs: [18] } },
];



    const ANTALL = {
      Rektor: 1,
      Dekan: 2,
      Vaktmester: 3,
      Professor: 5,
      Lektor: 10,
    };

    

function renderAnsatte(liste) {
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
    // Ingen slett-knapp legges til
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

function populateStillings() {
  const sel = document.getElementById('stillingSelect');
  if (!sel) return;
  sel.innerHTML = Object.keys(stillinger).map(id => `<option value="${id}">${stillinger[id].navn}</option>`).join('');
  // Når stilling endres, slå av/på kursfeltet
  sel.addEventListener('change', toggleKursInput);
}

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

function populateKurs() {
  const sel = document.getElementById('kursSelect');
  if (!sel) return;
  sel.innerHTML = Object.keys(kurs).map(id => `<option value="${id}">${kurs[id]}</option>`).join('');
}

function leggTilAnsatt() {
  const fornavn = document.getElementById('fornavn')?.value.trim();
  const etternavn = document.getElementById('etternavn')?.value.trim();
  const epost = document.getElementById('epost')?.value.trim();
  const kontor = document.getElementById('kontor')?.value.trim() || '';
  const stillingSel = document.getElementById('stillingSelect');
  const kursInput = document.getElementById('kursInput');
  const formError = document.getElementById('formError');

  function setFormError(msg, focusEl) {
    if (formError) formError.textContent = msg || '';
    if (msg && focusEl) focusEl.focus();
  }

  if (!fornavn || !etternavn || !epost || !stillingSel) {
    setFormError('Fyll ut fornavn, etternavn, e-post og stilling.', document.getElementById(!fornavn ? 'fornavn' : !etternavn ? 'etternavn' : 'epost'));
    return;
  }

  // Enkel e-post-validering: må inneholde '@'
  if (!epost.includes('@')) {
    setFormError('E-post må inneholde @', document.getElementById('epost'));
    return;
  }

  const stillingId = parseInt(stillingSel.value, 10);
  const kursValues = (kursInput?.value || '').split(',').map(s => s.trim()).filter(Boolean);

  // Sjekk at kun Professor eller Lektor kan ha kurs
  if (kursValues.length > 0 && !(stillingId === 4 || stillingId === 5)) {
    setFormError('Kun Professor eller Lektor kan legge til kurs. Endre stilling eller fjern kurs.', document.getElementById('stillingSelect'));
    return;
  }

  const newId = getNextId();
  // Oppdater navne- og epost-mapper slik resten av koden bruker
  navn[newId] = `${fornavn} ${etternavn}`;
  emails[newId] = epost;

  const nyAnsatt = {
    id: newId,
    stillingId: stillingId,
    kontor: kontor,
    kursansvar: { harKursansvar: kursValues.length > 0, kurs: kursValues }
  };

  ansatte.push(nyAnsatt);
  renderAnsatte(ansatte);

  // Reset skjema
  document.getElementById('fornavn').value = '';
  document.getElementById('etternavn').value = '';
  document.getElementById('epost').value = '';
  document.getElementById('kontor').value = '';
  if (kursInput) kursInput.value = '';
  stillingSel.selectedIndex = 0;
  // fjern eventuelle feilmeldinger
  setFormError('');
}

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

function visAdministrasjon() {
  renderAnsatte(ansatte.filter(a => stillinger[a.stillingId].kategori === "Administrasjon"));
}
function visMedKursansvar() { renderAnsatte(ansatte.filter(a => a.kursansvar?.harKursansvar)); }
function visUtenKursansvar() { renderAnsatte(ansatte.filter(a => !a.kursansvar?.harKursansvar)); }
function filtrerStilling(stilling) { renderAnsatte(ansatte.filter(a => a.stilling === stilling)); }
function filtrerKontor(kode) { renderAnsatte(ansatte.filter(a => a.kontor === kode)); }

// --- Koble knapper (forutsetter ID-er i HTML) ---
document.addEventListener("DOMContentLoaded", () => {
  // initial visning
  visAlle();

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

  const map = id => document.getElementById(id);

  map("btnAlle")?.addEventListener("click", () => { visAlle(); toggleActive("btnAlle"); });
  map("btnUndervisere")?.addEventListener("click", () => { visUndervisere(); toggleActive("btnUndervisere"); });
  map("btnAdministrasjon")?.addEventListener("click", () => { visAdministrasjon(); toggleActive("btnAdministrasjon"); });
  map("btnMedKurs")?.addEventListener("click", () => { visMedKursansvar(); toggleActive("btnMedKurs"); });
  map("btnUtenKurs")?.addEventListener("click", () => { visUtenKursansvar(); toggleActive("btnUtenKurs"); });

  // Eksempel: knapper for spesifikke stillinger eller kontor (hvis du har slike knapper i HTML)
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
function clearActiveGroup(attr) {
  document.querySelectorAll(`[${attr}]`).forEach(b => b.classList.remove("active"));
}

function visAlleKurs() {
  const kursDiv = document.getElementById("kursContainer");
  kursDiv.innerHTML = `
    <h2>Alle kurs</h2>
    <ul>
      ${Object.values(kurs).map(k => `<li>${k}</li>`).join("")}
    </ul>
  `;
}
document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte);  // viser personkortene
  visAlleKurs();           // viser kurslisten nederst
});


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




