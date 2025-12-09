#1
# Liste over programmeringsrelaterte ord
# Listen kan enkelt utvides med flere ord ved behov
# Hvert ord representerer et konsept eller en komponent innen programmering
# Listen kan brukes til øvelser i tekstbehandling eller algoritmeutvikling
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
def lungo(ordliste): 
    if not ordliste: # sjekker om listen er tom
        return None # returnerer None hvis tom
    return max(ordliste, key=len) # finner og returnerer lengste ord

#3
# Funksjon for å legge til et nytt ord i listen prw
# Tar et nytt ord som input
# Fjerner eventuelle ledende eller etterfølgende mellomrom fra ordet
# Legger det nye ordet til i listen prw
# Kan brukes til å utvide listen med flere programmeringsrelaterte ord
def add(nytt_ord): # legger til et nytt ord i listen prw
    prw.append(nytt_ord.strip()) # fjerner mellomrom og legger til i listen

#4
# Legger til et nytt ord i listen prw
# Ordet som legges til er "objektorientert" 
# Bruker funksjonen add definert tidligere
# Kan brukes til å teste funksjonaliteten til add-funksjonen
add("objektorientert") # legger til et nytt ord i listen prw

#5
# Finner og skriver ut det lengste ordet i listen prw
# Bruker funksjonen lungo definert tidligere
# Skriver resultatet til konsollen
# Viser hvordan funksjonen fungerer i praksis
# Kan brukes til å verifisere at listen er oppdatert korrekt
resultat = lungo(prw) # finner lengste ord i listen prw
print("Lengst:", resultat) # skriver ut lengste ord