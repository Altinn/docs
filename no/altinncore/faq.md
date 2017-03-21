# Ofte stilte spørsmål

Her er svar på de vanligste spørsmålene om tjenester 3.0:


### Finnes det en beskrivelse av tjenester 3.0?

> Ja, på overordnet nivå så har vi [fire målsettinger](goals.md), og en beskrivelse av [arkitekturen](architecture.md).  


### Når kan vi ta i bruk tjenester 3.0?

> Vi er avhengig av finansiering for å få realisert tjenester 3.0 innen rimelig tid.
> Så lenge finansieringen ikke er plass så vil ikke [målsettingene](goals.md) for 3.0 kunne realiseres.  
> Vi ønsker likevel å forsøke å levere en frittstående "alpha-versjon" med begrenset funksjonalitet høsten 2017.
> Denne vil være basert på en "proof-of-concept" som har blitt laget for å bekrefte tekniske veivalg.  
>
> Det å tilgjengeliggjøre og oppdatere tjenester 3.0 fortløpende fremover, for å få kontinuerlig feedback, er ønsket måte å jobbe på.  
>
> Se [siste status](status.md) for detaljer.


### Kan man gjenbruke noe fra eksisterende tjenester basert på InfoPath, eller må vi starte helt på nytt?

> Tjenester 3.0 vil støtte eksisterende dataformater (XSD) fra [SERES](https://altinnett.brreg.no/no/SERES/) og [OR]((https://w2.brreg.no/oppgaveregisteret/spesifikasjon_etatsliste.jsp)),
> noe som betyr at alle grensesnitt (mottak, preutfylling, innsending, etc) vil kunne gjenbrukes uten
> endringer i tjenesteeiers fagsystemer eller [sluttbrukersystemer](https://altinnett.brreg.no/no/Sluttbrukersystemer/).
> Kall mot dagens "mappere" og interne tjenester skal også fortsatt fungere, selv om vi på sikt ønsker å fase ut mappere til fordel for noe bedre.  
>
> Vi har også vurdert muligheten for å lage et verktøy som automatisk konverterer fra InfoPath til tjenester 3.0, helt eller delvis.  
> Etter diskusjoner med diverse tjenesteutviklere, så har det kommet frem at man sannsynligvis uansett vil ønske å forbedre brukergrensesnitt, og forenkle tekster og logikk når man går over til responsive
> tjenester som skal fungere også på mobil. Det å utvikle et konverteringsverktøy er ikke utelukket, men det må gi en reell verdi.

### Finnes det noen retningslinjer for å lette overgangen fra InfoPath?

> - Lag enkle og fornuftige modeller (XSD) som inneholder så mye som mulig av datatyper, begrensninger, etc. istedenfor å kode disse selv.
> - Benytt regelmotor (XML) istedenfor C# i InfoPath for logikk (særlig for kompliserte skjema).
> - Lag gode og korte tekster som har en større sjanse for å fungere også på små skjermer.
> - Vurder om store tabeller (antall kolonner) egentlig er nødvendig.


### Vil vi fortsatt kunne utvikle eget brukergrensesnitt og kun benytte API'ene i Altinn?

> Ja. API'ene til Altinn vil fortsatt fungere som før, og tjenester 3.0 vil løfte API'ene til en kanal som er likestilt med portal også ved utvikling og testing av tjenester.
> Det vil også legges til rette for å eksponere *alle* ressurser som utvikles som API, f.eks. tekst-ressurser, metadata, semantiske koblinger, valideringer, etc.

### Vil det forsvinne funksjonalitet som finnes i dagens plattform?

> I utgangspunktet nei, så fremt det ikke er funksjonalitet som ikke benyttes, eller som ikke gir mening lengre.  
> De første versjon av tjenester 3.0 vil nok ikke inneholde all funkjsonalitet, da de viktigste egenskapene vil leveres først og videre utvikling vil gjøres basert på feedback.


### Er tjenester 3.0 egentlig prioritert?

> Ja. Tjenester 3.0 er helt sentral for å kunne realisere de fire satsingsområdene i [Altinn-strategien](https://altinnett.brreg.no/no/Emner/Altinn/Altinn-strategi/).
> I tillegg er tjenester 3.0 definert som ett av hovedproduktene i Altinn, og er dermed sentral også i Altinn produktstrategi.  


### Hva slags teknologi benyttes i tjenester 3.0?

> Se [arkitektur](architecture.md#programvare) under programvare.

### Hvorfor kjøper dere ikke bare inn noe ferdig hyllevare for skjema?

> Det finnes rett og slett ikke hyllevare som dekker alle behovene som Altinn sine brukere og tjenesteeiere har til ytelse, funksjonalitet og sikkerhet.  
>
> Bruk av hyllevare, først [Adobe Form Server](https://web.archive.org/web/20040805072324/http://www.adobe.com/products/server/formserver/main.html) (Altinn I)
> og så [Microsoft Forms Server](https://web.archive.org/web/20090112152812/http://office.microsoft.com/en-gb/formsserver/HA101656451033.aspx) (Altinn II),
> har vist at det er en veldig stor risiko å ikke selv ha kontroll over kjernefunksjonalitet i en stor løsning som skal leve lenge.
> Det har også vist seg å være ekstremt dyrt og krevende å forsøke å tilpasse hyllevare til å dekke behovene.
>
> Derfor velger vi heller å utvikle en løsning på toppen av åpen kildekode, og så dele det vi lager med alle.  
> Når vi forbedrer åpen kildekode som vi benytter, så vil også alle andre som baserer seg på de samme prosjektene nyte godt av det.

### Når vil den gamle InfoPath-løsningen fases ut?

> Enten når alle tjenester er migrert over eller når [support for InfoPath](https://support.microsoft.com/en-us/lifecycle/search/920) avsluttes (2020, ev. 2026 hvis vi bruker tid/penger på å oppgradere).  
> Vi håper på å unngå å måtte leve lenge med dagens løsning, men det er naturlig nok avhengig av finansiering.
> 
> Rent økonomisk så vil det være store gevinster ved å fase ut den gamle løsningen så fort som mulig.  

