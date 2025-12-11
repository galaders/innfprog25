
/**
 * `!slettPerson(id) denne knappen vist på alle html sider vis du ikke vil at den skal visses må du ha den som er under for å gjemme den! */ 
     // <style>
      //.delete-btn { display: none !important; }
     // </style>`.
   
function renderAnsatte(liste)  { // Rendre ansatte i grid
  // Hent grid-container
  const grid = document.getElementById("ansatteGrid"); // sjekk at den finnes
  grid.innerHTML = ""; // tøm eksisterende innhold
  // Bygg kort for hver ansatt
  liste.forEach(a => {
    // Hent kontorinfo, med fallback hvis kontoret ikke finnes
    const kontorInfo = kontorer[a.kontor] || { navn: a.kontor, etasje: "", bygning: "" }; // hent kontorinfo eller fallback
    // Lag kort for hver ansatt
    const card = document.createElement("div"); // lag kort
    card.className = "card"; // sett kort-klasse
    // Bygg tekst for kurs, håndter både numeriske id-er og tekst-verdier
    let kursTekst = 'Ingen kursansvar';
    // Sjekk om ansatt har kursansvar
    if (a.kursansvar?.harKursansvar) { // har kursansvar
      const kListe = (a.kursansvar.kurs || []).map(item => { // map kurs til navn
        return (typeof item === 'number') ? (kurs[item] || item) : item; // hent kursnavn eller bruk verdi
      });
      // Lag kursansvar-tekst
      kursTekst = 'Kursansvar: ' + kListe.join(', ');  // join kurs med komma
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
    const deleteBtn = createDeleteButton(a.id, navn[a.id]); // lag slett-knapp
    // Pakk knappen i en div for styling
    const actionsWrap = document.createElement('div'); // lag wrapper for knapp
    // fikser litt avstand mellom knapp og innhold
    actionsWrap.style.marginTop = '12px'; // legg til litt margin-top
    // fest knappen i wrappen
    actionsWrap.appendChild(deleteBtn); 
    // fest kortet
    card.appendChild(actionsWrap); // legg til actions-wrap i kort
    // Legg kortet til i griden
    grid.appendChild(card); // legg til i grid
  });
}

// Oppretter en ekte HTML-knapp som kaller slettPerson(id) ved klikk
/**
 * Oppretter en knapp-element for sletting
 * @param {number} id - ansattens id
 * @param {string} navnStr - visningsnavn for aria-label
 * @returns {HTMLButtonElement} ferdig konfigurert knapp
 */
function createDeleteButton(id, navnStr) {
  // Lager en knapp
  const btn = document.createElement('button'); // lag knapp
  // Setter attributter og tekst
  btn.type = 'button'; // for å unngå submit i skjema
  btn.className = 'filter-btn delete-btn'; // bruk samme stil som filter-knapper
  btn.id = `slett-${id}`; // unik id
  btn.dataset.deleteId = String(id); // data-attributt for identifikasjon
  btn.setAttribute('aria-label', `Slett ${navnStr}`); // for skjermlesere
  btn.textContent = 'Slett person'; // knappetekst
  // Legger til klikk-håndterer
  btn.addEventListener('click', () => {
    slettPerson(id); // kall slett-funksjon ved klikk
  }); // lukk event listener
  return btn; // returner ferdig knapp
}

/**
 * Slett en ansatt fra `ansatte`-listen
 * @param {number} id - id til personen som skal slettes
 */
function slettPerson(id) {
  const index = ansatte.findIndex(a => a.id === id);
  // Hvis ikke funnet, gjør ingenting
  if (index === -1) return;
  // Fjern fra ansatte-listen
  ansatte.splice(index, 1);
  // Rendre på nytt
  renderAnsatte(ansatte);
}





// Hjelpefunksjoner og skjema-logic for å legge til ny ansatt
/**
 * Finn neste ledige ID for en ny ansatt
 */
function getNextId() {
  // Finn høyeste eksisterende ID og returner neste
  return Math.max(0, ...ansatte.map(a => a.id)) + 1; // bruk 0 som fallback hvis listen er tom
}

/**
 * Fyller `#stillingSelect` med alternativer fra `stillinger`-objektet
 * Legger også på en `change`-listener for å slå av/på kursfeltet.
 */
function populateStillings() {
  // Hent select-elementet
  const sel = document.getElementById('stillingSelect'); // hent element
  if (!sel) return; // sjekk at element finnes
  sel.innerHTML = Object.keys(stillinger).map(id => `<option value="${id}">${stillinger[id].navn}</option>`).join(''); // bygg options
  // Når stilling endres, slå av/på kursfeltet
  sel.addEventListener('change', toggleKursInput); // koble til toggle-funksjon
}


/**
 * Aktivér/deaktivér kurs-input avhengig av valgt stilling
 * Kun stillingId 4 (Professor) og 5 (Lektor) tillater å skrive kurs.
 */
function toggleKursInput() {
  // Hent elementer
  const kursInput = document.getElementById('kursInput'); // tekstfelt for kurs
  const stillingSel = document.getElementById('stillingSelect'); // stillingsvalg
  if (!kursInput || !stillingSel) return; // sjekk at elementer finnes
  // Sjekk valgt stilling
  const id = parseInt(stillingSel.value, 10); //  hent valgt stillingId
  // Aktiver/deaktiver kurs-input basert på stilling
  if (id === 4 || id === 5) {
    kursInput.disabled = false;  //
    kursInput.placeholder = 'Skriv kurs (komma-separert)';  // oppdater placeholder
  } else {
    kursInput.disabled = true; // deaktiver felt
    kursInput.value = ''; // tøm feltet
    kursInput.placeholder = 'Kun Professor/Lektor kan legge til kurs'; // oppdater placeholder
  }
}


/**
 * Fyller `#kursSelect` med kurs fra `kurs`-objektet.
 */
function populateKurs() {
  const sel = document.getElementById('kursSelect');
  if (!sel) return; // sjekk at element finnes
  sel.innerHTML = Object.keys(kurs).map(id => `<option value="${id}">${kurs[id]}</option>`).join('');
}


/**
 * Leser skjema-feltene, validerer input og legger til ny ansatt
 * Oppdaterer også `navn` og `emails`-map som resten av appen bruker.
 * Feilmeldinger vises i `#formError` ved invalid input.
 */
function leggTilAnsatt() {
  // Hent skjema-felter
  const fornavn = document.getElementById('fornavn')?.value.trim(); // fornavn må fylles ut
  const etternavn = document.getElementById('etternavn')?.value.trim(); // etternavn må fylles ut
  const epost = document.getElementById('epost')?.value.trim(); // epost må fylles ut
  const kontor = document.getElementById('kontor')?.value.trim() || ''; // kontor kan være tomt
  const stillingSel = document.getElementById('stillingSelect'); // stillingsvalg
  const kursInput = document.getElementById('kursInput'); // kursfelt
  const formError = document.getElementById('formError'); // feilmeldings-element


  // Hjelpefunksjon for å sette feilmelding
  function setFormError(msg, focusEl) {
    if (formError) formError.textContent = msg || ''; // sett eller fjern feilmelding
    if (msg && focusEl) focusEl.focus(); // sett fokus hvis gitt
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


  // Hent stillingId og kursliste
  const stillingId = parseInt(stillingSel.value, 10); // hent valgt stillingId
  const kursValues = (kursInput?.value || '').split(',').map(s => s.trim()).filter(Boolean); // splitt og trim kursliste


// Opprett ny ansatt-objekt
  const newId = getNextId(); // generer ny id
  // Oppdater navne- og epost-mapper slik resten av koden bruker
  navn[newId] = `${fornavn} ${etternavn}`; // lagre navn
  emails[newId] = epost; // lagre epost


  // Lag ny ansatt-objekt
  const nyAnsatt = {
    id: newId, // bruk generert id
    stillingId: stillingId, // lagre stillingId
    kontor: kontor, // lagre kontor
    kursansvar: { harKursansvar: kursValues.length > 0, kurs: kursValues } // lagre kursansvar
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
  populateStillings(); // Fyll stillingsvalg
  populateKurs(); // Fyll kursvalg
  // Fjern feilmelding når brukeren endrer innhold
  ['fornavn','etternavn','epost','kontor','kursInput','stillingSelect'].forEach(id => {
    const el = document.getElementById(id); // hent element
    if (!el) return; // sjekk at det finnes
    el.addEventListener('input', () => { // legg til input-listener
      const feilmeld = document.getElementById('formError'); // hent feilmeldings-element
      if (feilmeld) feilmeld.textContent = ''; // fjern feilmelding
    });
  });
  // Initial toggle av kursfeltet
  toggleKursInput();
});


// --- Filter funksjoner ---
function visAlle() { renderAnsatte(ansatte); } // Vis alle ansatte
// Vis undervisere
function visUndervisere() {
  // Filtrer ansatte for undervisere basert på stillingens kategori
  renderAnsatte(ansatte.filter(a => stillinger[a.stillingId].kategori === "Undervisere"));
}


// Vis administrasjon
function visAdministrasjon() {
  // Filtrer ansatte for administrasjon basert på stillingens kategori
  renderAnsatte(ansatte.filter(a => stillinger[a.stillingId].kategori === "Administrasjon"));
}
// Vis med kursansvar
function visMedKursansvar() { renderAnsatte(ansatte.filter(a => a.kursansvar?.harKursansvar)); }
// Vis uten kursansvar
function visUtenKursansvar() { renderAnsatte(ansatte.filter(a => !a.kursansvar?.harKursansvar)); }
// Filtrer på stillingstype
function filtrerStilling(stilling) { renderAnsatte(ansatte.filter(a => a.stilling === stilling)); }
// Filtrer på kontor
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
      // hente stillingId fra data-attributt
      const id = parseInt(e.currentTarget.dataset.stillingId, 10);
      // filtrer ansatte basert på stillingId
      const filtrert = ansatte.filter(a => a.stillingId === id);
      // rendre filtrert liste
      renderAnsatte(filtrert);
    });
  });
});

// Koble filter-knapper
// Hjelpefunksjon for å hente element og legge til event listener
  const map = id => document.getElementById(id);
  // Koble knapper til funksjoner
  map("btnAlle")?.addEventListener("click", () => { visAlle(); toggleActive("btnAlle"); }); // Vis alle
  map("btnUndervisere")?.addEventListener("click", () => { visUndervisere(); toggleActive("btnUndervisere"); }); // Vis undervisere
  map("btnAdministrasjon")?.addEventListener("click", () => { visAdministrasjon(); toggleActive("btnAdministrasjon"); }); // Vis administrasjon
  map("btnMedKurs")?.addEventListener("click", () => { visMedKursansvar(); toggleActive("btnMedKurs"); }); // Vis med kursansvar
  map("btnUtenKurs")?.addEventListener("click", () => { visUtenKursansvar(); toggleActive("btnUtenKurs"); }); // Vis uten kursansvar

  
  // <knap data-stilling="Rektor" class="btn-stilling">Rektor</knap>
  document.querySelectorAll("[data-stilling]").forEach(btn => // velg alle knapper med data-stilling
    btn.addEventListener("click", e => { // legg til klikk-håndterer
      filtrerStilling(e.currentTarget.dataset.stilling); // filtrer på stilling
      clearActiveGroup("data-stilling"); // fjern .active fra andre knapper i samme gruppe
      e.currentTarget.classList.add("active"); // legg til .active på klikket knapp
    })
  );

  // <knap data-kontor="A101" class="btn-kontor">A101</knap>
  document.querySelectorAll("[data-kontor]").forEach(btn => // velg alle knapper med data-kontor
    btn.addEventListener("click", e => { // legg til klikk-håndterer
      filtrerKontor(e.currentTarget.dataset.kontor); // filtrer på kontor
      clearActiveGroup("data-kontor"); // fjern .active fra andre knapper i samme gruppe
      e.currentTarget.classList.add("active"); // legg til .active på klikket knapp
    })
  );
});


// --- Hjelpefunksjoner for knapptilstand ---
/**.
 * @param {string} id - element-id for knappen som skal markeres som aktiv
 */
function toggleActive(id) {
  // Fjern .active fra alle knapper i .filters
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active")); // fjern fra alle
  document.getElementById(id)?.classList.add("active"); // legg til på valgt
}

/**
 * Fjern .active fra alle elementer som matcher et gitt attributt.
 * @param {string} attr
 */
function clearActiveGroup(attr) { // fjern .active fra alle med gitt attributt
  document.querySelectorAll(`[${attr}]`).forEach(b => b.classList.remove("active"));
}

// Vis Kursoversikt nederst på siden
/**
 * Render en enkel liste av Kursoversikt i `#kursContainer`.
 */
function visAlleKurs() { // hent container
  const kursDiv = document.getElementById("kursContainer"); // sjekk at den finnes
  // bygg liste av kurs
  kursDiv.innerHTML = `
    <h2>Kursoversikt</h2>
    <ul>
      ${Object.values(kurs).map(k => `<li>${k}</li>`).join("")} // lag listeelement for hvert kurs //
    </ul>
  `;
}
// Initialiser visning ved DOM-lastning
document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte);  // viser personkortene
  visAlleKurs();           // viser kurslisten nederst
});

// Knapper for spesifikke stillinger basert på stillingId
document.addEventListener("DOMContentLoaded", () => {
  renderAnsatte(ansatte); // start med alle
  document.querySelectorAll("[data-stilling-id]").forEach(btn => { // velg alle knapper med data-stilling-id
    btn.addEventListener("click", e => { // legg til klikk-håndterer
      const id = parseInt(e.currentTarget.dataset.stillingId, 10); // hente stillingId fra data-attributt
      const filtrert = ansatte.filter(a => a.stillingId === id); // filtrer ansatte basert på stillingId
      renderAnsatte(filtrert); // rendre filtrert liste
    });
  });
});




