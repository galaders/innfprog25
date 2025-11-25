// Hver kontor har navn, etasje og bygning
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

// Ansatte-data
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

// Epost-data
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

// Stillingstyper
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
  // Rektor (1) - Administrasjon
  { id: 1, stillingId: 1, kontor: "A101", kursansvar: { harKursansvar: false } },

  // Dekaner (2) - Administrasjon
  { id: 2, stillingId: 2, kontor: "A102", kursansvar: { harKursansvar: false } },
  { id: 3, stillingId: 2, kontor: "A103", kursansvar: { harKursansvar: false } },

  // Vaktmestere (3) - Administrasjon
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
