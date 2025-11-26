#1
# Liste over programmeringsrelaterte ord
#prw står for "programmeringsrelaterte ord"
#listen inneholder ti ord
# Disse ordene kan brukes i ulike programmeringsoppgaver
# Listen kan enkelt utvides med flere ord ved behov
# Hvert ord representerer et konsept eller en komponent innen programmering
# Ordene er valgt for å dekke et bredt spekter av programmeringsaspekter
# Listen kan brukes til øvelser i tekstbehandling eller algoritmeutvikling
# Ordene er på norsk for å gjøre dem mer tilgjengelige for norske brukere
# Listen kan også brukes i spill eller læringsaktiviteter relatert til programmering
prw = [
    "kompilator",
    "variabel",
    "funksjon",
    "rekursjon",
    "syntaks",
    "bibliotek",
    "algoritme",
    "iterasjon",
    "datastruktur",
    "kommentar"
]

#2
# Funksjon som finner det lengste ordet i en liste
# Tar en liste av ord som input
# Returnerer det lengste ordet i listen
# Hvis listen er tom, returneres None
# Bruker innebygd funksjon max med key=len for å finne lengste ord
# Effektiv og enkel implementering
# Kan håndtere lister med flere ord av samme lengde
# Kan brukes i ulike sammenhenger der lengste ord er relevant
def lungo(ordliste):
    if not ordliste:
        return None
    return max(ordliste, key=len)

#3
# Funksjon for å legge til et nytt ord i listen prw
# Tar et nytt ord som input
# Fjerner eventuelle ledende eller etterfølgende mellomrom fra ordet
# Legger det nye ordet til i listen prw
# Kan brukes til å utvide listen med flere programmeringsrelaterte ord
# Enkel å bruke og forstå
def add(nytt_ord):
    prw.append(nytt_ord.strip())

#4
# Legger til et nytt ord i listen prw
# Ordet som legges til er "objektorientert" 
# Bruker funksjonen add definert tidligere
# Dette demonstrerer hvordan man kan utvide listen med nye ord
# Ordet "objektorientert" er relevant innen programmering
# Viser fleksibiliteten til listen prw
# Kan brukes til å teste funksjonaliteten til add-funksjonen
add("objektorientert")

#5
# Finner og skriver ut det lengste ordet i listen prw
# Bruker funksjonen lungo definert tidligere
# Skriver resultatet til konsollen
# Viser hvordan funksjonen fungerer i praksis
# Kan brukes til å verifisere at listen er oppdatert korrekt
resultat = lungo(prw)
print("Lengst:", resultat)
