---
title: 18.2
description: Diverse forbedringer relatert til skattemeldingen.
weight: 110
type: releasenote
releasenote_info: Release 18.2, produksjonssatt 12. februar 2018.
---


## Endringer i webSA

### Årsrevisjon (9811)
Hvert år gjøres det oppdateringer og endringer i RF-1030 (skattemeldingen/webSA), f.eks. nye poster, endring i eksisterende poster, sletting av utgåtte poster.
Disse oppdateringene gjøres i RF-1030 datamodellen, som tas inn i nye utgaver av tjenestene "RF-1030PSA" og "RF-1030PSAN".
I tillegg oppdateres en rekke tekster og det gjøres også endringer på bl.a. overførings- og valideringsregler.

#### Endringer knyttet til årsrevisjon

- Rekkelfølge på felter i XSD (8067)
- Overførigsregler knyttet til Saldogruppe C er oppdatert (8411)
- Overstyring av tekster - webSA 2018 (14578)
- Obligatorisk felt i XSD og fjerne regler i regelfil (8057)
- Lenke til ELSA oppdateres (8115)
- Arvet bolig (8065)
- Endre valideringstekst - Val_54, Val_21, Val_58 og Val_59 (15592)

### Ny skatteberegningsmodul (8117)
Tidligere tjeneste for skatteberegning var en [COBOL](https://en.wikipedia.org/wiki/COBOL)-modul som måtte vedlikeholdes hvert år ifm årsrevisjon.
Det er nå implementert støtte for ny og mer moderne tjeneste for skatteberegning som er utviklet av Skatteetaten, og gammel modul fjernes derfor.

### Endringer i skattemeldings-menyen
Det er åpnet for at brukere som kommer til skattemeldingen fra skattetaten.no skal få mulighet til å se lenken "til innboks" i menyen.
Denne lenken har tidligere vært skjult for disse brukerne. Lenken _Se informasjon om hvordan skattepengene brukes_ fjernes fra menyen, da siden som lenkes til ikke lenger vedlikeholdes.
I tillegg blir meldingen RF-1088 synlig under "Årets skattedokumenter", og lenke til meldiger under "Årets skattedokumenter" er oppdatert til å 
peke på ny meldingsvisning.

- Årets skattedokumenter (13539)
- Tilgang til skattemeldingen til skatteetaten.no (15852)
- Fjerne lenke "Se informasjon om hvordan skattepengene brukes" (16972)

### Tekstendringer
Det er gjort noen tekstendringer i løsningen for å forbedre brukskvalitet, bl.a. på hjelpesidene til webSA.

- Opplasting av fil og feilmelding (8113)
- Hjelpedokument del 1 og 2 (14841)
- RF-1030 PSA/PSAN - Tekstendring på nynorsk "Eigarpart" bør endres til "eigardel" (8091)
- RF-1030 PSAN m/RF-1175 - RF-1175 Mangler lenke i hjelpetekster til postene 7080 og 7099 (8081)
- Utrekk av siste webSA tekster (8095)
- Visning av hjelpetekst mangler (13404)

### Diverse endringer i webSA-løsningen
Det er flere mindre endringer i webSA-løsningen, både i portalen og på selve tjenesten.
Bl.a. er "forenklet signeringsvisning" tatt bort som valg for RF-1030PSA i TUL.
Øvrige endringer i selve tjenesten er primært i metadata. 
Blant endringer i webSA-løsningen i portal er flere sider oppdatert og regler i regelmotor som er spesifikke for webSA er oppdatert.

- RF-1030 - PSAN - KS/ANS, felles bedrift med ektefelle: Felt i RF-1219 skal være låst til poster i Skattemeldingen (8051) 
- RF-1030 - PSAN - KS/ANS, felles bedrift med ektefelle: Felt i RF-1125 "Bruk av bil" skal være låst til poster i Skattemeldingen (8053)
- RF-1030 PSAN Endring vedrørende poster med overføring fra RF-1177 Landbruk. (8055)
- RF-1030 PSA/PSAN Post 2.2.3 Pensjon fra annen EØS-stat... - Fra dato/Til dato må endre rekkefølge i regnearket (8071)
- Uttrekk av Hjelpetekst i RF-1175 webSA (8077)
- Svalbard US via RF-1175 fordeling? (8083)
- PSA - visning av signeringssteg (8093)
- RF-1030 Post 3.2.8. Reise mellom hjem og fast arbeidssted (8099)
- RF-1030 med næringsrapport skatt (8109)
- RF-1030 PSAN under start tjeneste mangler RF-nr for næringsrapport skatt (8123)
- RF-1030 . PSA/PSAN - Endring av maksgrense for fradrag for reise mellom hjem og arbeid/besøksreiser, post 3.2.8/3.2.9 (8127)
- Fjern valget "Tillat at virksomhetsbrukere kan benytte tjenesten" (8129)
- RF-1030 - PSA/PSAN - Feil overføring av beløpet null fra post 3.2.8/3.2.9 til nivå 2 og overstryking av prefill på nivå 1 (8131)
- Validering for NRS sammen med andre Næringsoppgaver/modus (8143)
- Dersom andre signerer for deg, synes ikke dette. (8374)
- Endring av regel VO_349 (8376)
- TJ05 - Næringsoppgave 1 og familiebarnehage - webSA (8391)
- Nedtrekksliste på post 3.1 / 4.1 / 4.5 - endre rekkefølge (8399)
- Ny ordning for skattefavorisert individuell sparing til pensjon (10974)
- Datovalidering på felt (11137)
- Tillate innsending fra SBS for orid 37266 (11491)
- Slette felt fra HTML (12156)
- Dynamikk i portal - SFU (12350)
- Oppdatering av design på post 3.2.10 Foreldrefradrag (kostnader til barnehage mv.) (12518)
- påkrevde felt i webSA (12733)
- Endre format på 1000 skille for engelsk - html (13070)
- Oppdatering av VAL_64 (13074)
- Ny ordning for Skattefavorisert individuell pensjonsordning i en annen EØS-stat (13234)
- VO endring for RF-1098 (13244)
- Oppdatert betingelse på overføring fra RF-1177 (13363)
- Justering av nettleservindu som åpnes via lenker (13371)
- Post 3.3.5 Dato for oppstart av pensjonsordningen i EØS-staten - Visning (13394)
- Fjering av custom signering og kvitteringssider for PSA og PSAN (13859)
- Popup til orid 37375 - skattebegrensning § 17-4 (14118)

### Rettinger av feil som er funnet i tidligere releaser
Flere feil som har blitt oppdaget i løsningen i tidligere releaser har blitt rettet. Disse omfatter endringer i både 
sider i webSA-løsningen og i metadata på tjenesten.
 
- RF-1030 PSAN m/1175, Opplysninger henger igjen i 9910 generelle oppl. når vi lager ny kopi og endrer (8047)
- RF-1030 PSA og PSAN Post 3.2.13 Særskilt fradrag for sjøfolk. Ikke mulig å lese hjelpetekst til posten dersom denne ikke er pre utfylt (8049)
- RF-1030 PSAN alle modus Feil tekst på VOI-siden (8059)
- RF-1030 PSAN Post 2.7.3 (orid 21704) mangler i nedtrekkslista under sumpost 2.7 (8061)
- Feil tekst på kvitteringssiden RF-1030 PSAN og Nynorsk og Engelsk versjon av PSA (8069)
- RF-1030 - PSAN m/RF-1175: Navnet på RF-1224 vises på bokmål i html med engelsk som språkvalg (8105)
- RF-1030 PSA/PSAN post 4.6.1 Fast eiendom i utlandet html - Kjøpsdato vises i feil format bokmål/nynorsk/engelsk (8073)
- RF-1030 PSA/PSAN Innlagte verdier i boligpostene mangler tusenskille i html. (8075)
- RF-1030 PSA og PSAN, post 2.1.9 og 2.1.2, Beløp mangler tusenskille og er venstrestilt (8119)
- RF-1030 PSA/PSAN - Post 3.5.1 Særfradrag for enslige forsørgere vises ikke på print (8137)
- WebSAMenuAvailableDate og feilmeldinger (8133)
- Tekst forsvinner på 1175 fordelingssiden (1250)
- orid 36583 skal ikke være synlig ved legg til (8373)
- Utbedre feil lenking - delegert rettighet og komplett innsending fra SBS (1273)
- Sjekkbokser er redigerbare på 4.3.2 bolig og Boenhet i boligselskap (1433)
- Redigerbare prefill felt blir slettet (8139)
- Håndtering av prefiks 00/+ for landkode på varslingsinfo fra Kofuvi (17048)


## Plattformendringer

### Kan ikke printe WebSA dersom mer enn 50 underskjema (9044)
Det ligger en begrensning inne på signerings- og kvitteringssiden som gjør at man ikke kan "Print all" hovedskjema og underskjema dersom 
bruker har fler enn 50 underskjema. Det er unødvendig at WebSA er omfattet av denne begrendningen, da WebSA bruker en egen print-visning
som uansett ikke tillatter at PDF for alle underskjema genereres på en gang. Derfor unntas WebSA (PSA/PSAN) fra denne begrensingen.


### Dobbelt kommategn i utskriften til RF1030 i navnet på RF-skjema i tjenesteeiers arkiv (8085)
Basert på en feil relatert til WebSA print-visning fra tjenesteeiers arkiv som ble oppdaget i en tidligere release.
I tilfeller der underskjema har presentasjonsfelter vises lenke til underskjema i print-visning med dobbelt kommategn
foran presentasjonsfeltet.

### Tilbake til innboks fra PSA arkiv print (8107)
Når PSA bruker går til kvitteringssiden fra arkiv, vises lenke øverst i venstre hjørne som "Tilbake"
og sender bruker til PSA-menyen. Dette er endret sånn at lenke viser "Til innboks" og bruker kommer tilbake til innboksen.
Dette gjelder også når bruker er på kvitteringssiden etter å ha sendt inn PSA. Når bruker kommer til kvitterinssiden via 
"Årets skattedokumenter" på PSA-menyen viser lenke "Tilbake" og går til PSA-menyen som før.
 

### Svakhet i regelmotor (8121)
Det er en svakhet i regelmotoren når man overfører repeterende poster/felter , med 
`<Param name="TransferRecurringFields" value="true"/>` Når dette gjøres henter koden ut verdien i feltet som et tall. 
Dersom den faktiske verdien i feltet ikke er et tall (som oppstår i noen tilfeller for WebSA) så blir tallverdien 0.
Altså overføres verdien 0 i stedet for den faktiske verdien i feltet.

Dette løses ved å oppdatere metoden i regelmotoren for overføring av repeterende felter,
[TransferRecurringFields](/docs/guides/tul/vedlegg/regelmotor/regler/#transferrecurringfields) slik at den også håndtererå kunne overføre string-verdier.
Dette er gjort ved å innføre en ny parameter `StringTransfer` som settes opp på de aktuelle overføringsreglene i regelfil.
På den måten unngår man i så stor grad som mulig å berøre eksisterende regler som bruker "TransferRecurringFields". 

### Skatteetaten eller Skattedirektoratet (8135)
Når Skatteetaten som tjenesteeier sender meldinger blir MessageSender satt til "Skattedirektoratet". Dette er fordi det er beskrivelses-feltet fra tjenesteeiertabellen som brukes, og
dette står som "Skattedirektoratet" i alle miljøer (bortsett fra utviklingsmiljø). Det er opprettet databasescript for å oppdatere dette til "Skatteetaten". 

### Ny avgivertype i TUL (14767)
Det er innført nytt avgiverkrav i TUL, "Konkursbo og juridisk enhet". SBL er oppdatert til å håndtere det nye avgiverkravet.

### Endring decision point (14809)
I sammenheng med 18.1 ble muligheten til å sperre (deny) tilgang til et element fjernet.
For å ferdigstille denne endringen, og forbedre ytelsen i Altinn, så har vi nå fjernet noen unødvendige kall til databasen.

### Innføre SoftDueDate for RF-1088K (16171)
Tjenesten RF-1088K legges inn i listen over tjenester som benytter [soft due date](../../2017/17-3/#soft-due-date) funksjonaliteten som ble innført i 17.3.
