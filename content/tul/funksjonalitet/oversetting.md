---
title: Oversetting
description: Hvis det er behov for å tilby en tjeneste på flere språk så kan oversettermodulen benyttes.
toc: true
---

En tjenesteutgave utvikles alltid i et hovedspråk.
Hovedspråket velges som utgaveparameter når [utgaven opprettes](../../tjenestetyper/ny/#lage-utgave), og kan ikke endres senere. Man kan velge mellom følgende språk: *bokmål*, *nynorsk*, *samisk* og *engelsk*. Alle deler av tjenesten
utvikles først i hovedspråket, både InfoPath-skjema og tekster som legges inn i TUL (for eksempel tjeneste- og utgavenavn, sidenavn,
signeringstekst, hjelpetekster).

Hvis det er behov for å tilby tjenesten på flere språk må TUL oversettermodul benyttes. Denne startes fra tjenesteutgavens arbeidsflate. Det
lønner seg å vente med oversettelsen til utgaven er komplett på hovedspråket, for å slippe ekstra vedlikehold.

For å starte oversettelse til et nytt språk, velg *Ny* i språkseksjonen i arbeidsflaten. Du får opp en side der du kan velge hvilket språk
du vil oversette til:

![Figur 103 – Velg språk du ønsker å oversette til.](/docs/images/guides/tul/velg-språk.png?width=700 "Figur 103 – Velg språk du ønsker å oversette til.")

Alternativene er de samme som for hovedspråk, se over, med unntak av det språket som er valgt som hovedspråk,

Når språk er valgt presenteres oversettelsessiden:

![Figur 104 - Oversettelsessiden i TUL](/docs/images/guides/tul/oversettelsessiden.png?width=700 "Figur 104 - Oversettelsessiden i TUL")

Her han du velge hva du vil oversette (parametre, hjelpetekster, skjemaelementer, valideringstekster eller alt sammen) og hvilket språk du
vil oversette fra.

For den første oversettelsen er det bare ett alternativ å oversette fra (hovedspråket), hvor det kun er mulig å endre tjenestenavnet, men
for senere oversettelser kan du fritt velge blant de eksisterende språkversjonene, uavhengig om de er komplette eller ikke.

På oversettelsessiden presenteres en liste over de tekstelementene som utgaven inneholder innenfor den kategorien du har valgt, med plass
til å skrive inn din oversettelse av hvert tekstelement. For noen av valgene må du gjøre et undervalg i tillegg; for eksempel hvis du velger
Dialogsider, vises en ny nedtrekksliste der du kan velge blant de definerte dialogsidene.

![Figur 105 - Oversetting i TUL](/docs/images/guides/tul/oversetting.png?width=700 "Figur 105 - Oversetting i TUL")

Skriv inn dine oversettelser. Klikk på *Sjekk inn* når du er ferdig med oversettelsen, eller ønsker at andre skal ta over arbeidet.

Merk at valideringstekster for skjermtips ikke kan være lengre enn 125 tegn. Det er lagt inn begrensning på dette i TUL.

Vær oppmerksom på at det må tas spesielle hensyn i InfoPath når skjemaet utvikles for at skjemaet skal kunne oversettes i TUL. Alle
språkavhengige elementer i skjemaet (ledetekster, hinttekster, gruppeoverskrifter osv.) må defineres som uttrykksfelter (”expression box”),
ellers vil de ikke bli oversatt. Uttrykksbokser beskrives i [Vedlegg A](../../vedlegg/a). For å teste en språkversjon av et skjema, kan du gå tilbake til
utgave-arbeidsflaten og velge *Vis InfoPath form* fra nedtrekksmenyen som er knyttet til språknavnet:

![Figur 106 - Test språkversjonen ved å trykke Vis InfoPath fra nedtrekksmenyen som er knyttet til språknavnet](/docs/images/guides/tul/test-språkversjon.png "Figur 106 - Test språkversjonen ved å trykke Vis InfoPath fra nedtrekksmenyen som er knyttet til språknavnet")

Skjemaet vil da bli vist i InfoPath med språkavhengige elementer erstattet med de oversettelsene som er lagt inn i TUL. I de fleste
tilfeller vil man måtte lagre skjemafilen lokalt og velge *design* for å få se at skjemaet er på riktig språk.

For å teste oversettelse av øvrige tekster må tjenesteutgaven [migreres](../migrering/) til et test-sluttbrukermiljø.
Dersom du migrerer en språkversjon til testmiljøene uten at alle tekster er oversatt, vil manglende oversettelser bli erstattet
av samme tekst på hovedspråket.

Dersom det ikke lenger er behov for en oversettelse kan den slettes fra utgaven ved å velge *Slett* fra nedtrekksmenyen som er knyttet til
språknavnet. Du får da opp et pop-up vindu der du må bekrefte at oversettelsen til dette språket skal slettes.

## Eksportere oversettelse

Dersom du vil gjøre oversettelsen utenfor TUL kan du eksportere en xml-fil som kan redigeres i for eksempel Excel.

![Figur 107 - Eksport og import av oversettelse.](/docs/images/guides/tul/eksport-import-oversettelse.png "Figur 107 - Eksport og import av oversettelse.")

For å eksportere tekster som kan oversettes klikker du på «Last ned eksisterende oversettelse». Det vil da bli generert en xml-fil som du må
lagre et sted du finner den igjen. Filen kan redigeres med hvilket som helst program som kan lese xml-filer, men det er først og fremst lagt
opp til at den blir redigert i Excel.

Dersom du bruker Excel må du velge å åpne filen som xml-tabell. Du vil da få en visning som ser slik ut:

![Figur 108 - Redigering i Excel uten oversatt tekst.](/docs/images/guides/tul/excel-oversetting.png?width=700 "Figur 108 - Redigering i Excel uten oversatt tekst.")

De tre kolonnene til venstre (A, B og C) skal du ikke røre fordi de blir brukt til identifikasjon under importen. Vi bruker disse til å
fortelle hva det er som skal oversettes. A og B er id-felter som blir brukt til å finne feltene. C er originaltekster som kommer fra
InfoPath-skjema. Gjør du endringer i disse kolonnene kan importen enten feile eller den oversatte teksten kan havne i feil felt.

Oversettelsene fyller du inn i kolonnene til de språkene som ikke er hovedspråk. I dette eksempelet er bokmål hovedspråk, og det er
kolonnene «English» og «NorwegianNN» som kan brukes til å legge inn oversettelse. Du bruker da kolonnen «NorwegianNO» som utgangspunkt for
det som skal oversettes. Her har vi bare fylt ut engelsk oversettelse, men du kan også fylle ut oversettelse for flere språk samtidig.

![Figur 109 - Redigering i Excel med oversatt engelsk tekst.](/docs/images/guides/tul/excel-oversetting-engelsk.png?width=700 "Figur 109 - Redigering i Excel med oversatt engelsk tekst.")

Etter at du har fylt ut den teksten du vil endre, skal du lagre filen som xml. Excel kan komme til å forsøke å få deg til å lagre den som
Excel-fil, men du må lagre den som xml.

## Importere oversettelse

Filen du laget i [Eksportere oversettelse](#eksportere-oversettelse) skal så lastes opp i tjenesteutgaven ved hjelp av «Last opp ny oversettelse» (se Figur 107).

Når filen er lastet opp vil du få valg om å godta endringene eller avbryte.

![Figur 110 - Opplasting av oversettelsesfil.](/docs/images/guides/tul/oversetting-opplasting.png "Figur 110 - Opplasting av oversettelsesfil.")

Du må da trykke «Ok» for å få inn oversettelsen. Dersom du har fylt inn oversettelse for et språk som ikke allerede eksisterer på utgaven,
så vil dette språket bli opprettet for deg med de oversettelsene du har fylt inn. En bekreftelsestekst i grønt vil fortelle deg at
opplastingen var vellykket.

![Figur 111 - Bekreftelse på opplastet fil.](/docs/images/guides/tul/oversetting-bekreftelse-opplastet-fil.png "Figur 111 - Bekreftelse på opplastet fil.")

Felter som du lar stå blanke i xml-fila vil bli ignorert under import. Det betyr at dersom du bare skal endre enkelte felt, så kan du la
resten stå blanke. Dermed vil bare de feltene du har lagt inn tekst i bli endret.
