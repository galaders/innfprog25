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
// document.getElementById("employees").innerHTML = HTML_employees //
//lage en datastruktur for de ansatte og en datastruktur for stillinger
//bruk av navn emal og sånt bruk en fiktivt register eller noe likt "bare fake navn stillinger emal kontor og sånt"