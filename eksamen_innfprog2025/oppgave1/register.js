const navn = [""] //21 1 Rektor 2 Dekan  3 Vaktmester 5 Professor 10 Lektor
const stillinger =[""] //5 engen liste for dette index
const kursansvar =[""] // ingen kursansvar skal stå på  de som ikke har kursansvar
const kontor = ["c308 til c329"] // 21
const epost = [""] // 21
const dobbelStillinger = [""] // 3
const undervisere = [""] // 15
console.log(kontor)
const employees = [
            {name: "Hans Hansen", position: "Programmerer", email: "hans.hansen@email.com", office: "316", image: "man"},
            {name: "Jens Jensen", position: "Programmerer", email: "jens.jensen@email.com", office: "323", image: "man2"},
            {name: "Trine Trinesdotter", position: "Programmerer", email: "trine.trinesdotter@email.com", office: "304", image: "woman"},
        ]
console.log(employees)
function sendEmail() {
  window.location.href = "mailto:recipient@example.com";
}
const personer = [
  { name: "Anne Berg", position: "Rektor", email: '<a href="mailto:anne.berg@email.com">anne.berg@email.com</a>', office: "101" },
  { name: "Bjørn Olsen", position: "Dekan", email: '<a href="mailto:bjorn.olsen@email.com">bjorn.olsen@email.com</a>', office: "102" },
  { name: "Camilla Nilsen", position: "Dekan", email: '<a href="mailto:camilla.nilsen@email.com">camilla.nilsen@email.com</a>', office: "103" },
  { name: "Dag Johansen", position: "Vaktmester", email: '<a href="mailto:dag.johansen@email.com">dag.johansen@email.com</a>', office: "104" },
  { name: "Eirik Hansen", position: "Vaktmester", email: '<a href="mailto:eirik.hansen@email.com">eirik.hansen@email.com</a>', office: "105" },
  { name: "Frida Solberg", position: "Vaktmester", email: '<a href="mailto:frida.solberg@email.com">frida.solberg@email.com</a>', office: "106" },
  { name: "Gunnar Lie", position: "Professor", email: '<a href="mailto:gunnar.lie@email.com">gunnar.lie@email.com</a>', office: "107" },
  { name: "Hanne Kristoffersen", position: "Professor", email: '<a href="mailto:hanne.kristoffersen@email.com">hanne.kristoffersen@email.com</a>', office: "108" },
  { name: "Ingrid Dahl", position: "Professor", email: '<a href="mailto:ingrid.dahl@email.com">ingrid.dahl@email.com</a>', office: "109" },
  { name: "Jonas Aas", position: "Professor", email: '<a href="mailto:jonas.aas@email.com">jonas.aas@email.com</a>', office: "110" },
  { name: "Kari Lund", position: "Professor", email: '<a href="mailto:kari.lund@email.com">kari.lund@email.com</a>', office: "111" },
  { name: "Lars Bergström", position: "Lektor", email: '<a href="mailto:lars.bergstrom@email.com">lars.bergstrom@email.com</a>', office: "112" },
  { name: "Maria Haugen", position: "Lektor", email: '<a href="mailto:maria.haugen@email.com">maria.haugen@email.com</a>', office: "113" },
  { name: "Nils Eriksen", position: "Lektor", email: '<a href="mailto:nils.eriksen@email.com">nils.eriksen@email.com</a>', office: "114" },
  { name: "Oda Kristiansen", position: "Lektor", email: '<a href="mailto:oda.kristiansen@email.com">oda.kristiansen@email.com</a>', office: "115" },
  { name: "Per Andreassen", position: "Lektor", email: '<a href="mailto:per.andreassen@email.com">per.andreassen@email.com</a>', office: "116" },
  { name: "Ragnhild Moen", position: "Lektor", email: '<a href="mailto:ragnhild.moen@email.com">ragnhild.moen@email.com</a>', office: "117" },
  { name: "Sindre Foss", position: "Lektor", email: '<a href="mailto:sindre.foss@email.com">sindre.foss@email.com</a>', office: "118" },
  { name: "Tiril Evensen", position: "Lektor", email: '<a href="mailto:tiril.evensen@email.com">tiril.evensen@email.com</a>', office: "119" },
  { name: "Ulrik Strand", position: "Lektor", email: '<a href="mailto:ulrik.strand@email.com">ulrik.strand@email.com</a>', office: "120" },
  { name: "Vilde Knutsen", position: "Lektor", email: '<a href="mailto:vilde.knutsen@email.com">vilde.knutsen@email.com</a>', office: "121" }
];

console.log(personer);


// document.getElementById("employees").innerHTML = HTML_employees //
//lage en datastruktur for de ansatte og en datastruktur for stillinger
//bruk av navn emal og sånt bruk en fiktivt register eller noe likt "bare fake navn stillinger emal kontor og sånt"