---
title: Begrepsliste for TUL
linktitle: Begrepsliste
description: Liste over mye brukte begreper i tjenesteutviklingsløsningen (TUL).
---

  - **Datakilde**  
    En samling felt og grupper som definerer og lagrer dataene for et InfoPath-skjema. Kontroller i skjemaet er bundet til feltene og
    gruppene i datakilden.

  - **ELMER**  
    [ELMER](http://www.elmer.no/) er vedtatt som retningslinjer for brukergrensesnitt i offentlige skjemaer på Internett

  - **Hovedskjema**  
    En innsendingstjeneste vil Alltid ha ett skjema som er hovedskjema. Det kan knyttes null, ett eller flere underskjemaer til et
    hovedskjema.

  - **Hovedspråk**  
    En tjeneste vil alltid ha ett språk som hovedspråk. Dette angis når tjenesten opprettes og kan ikke endres i etterkant. Tjenesten
    kan oversettes til ett eller flere andre språk i tillegg til hovedspråket. En tjeneste kan ikke bli migrert til noe miljø uten at
    hovedspråket er komplett.

  - **InfoPath**  
    InfoPath er et verktøy fra Microsoft som benyttes til å utvikle skjemaer. I TUL må tjenesteutviklere utvikle skjemaer i InfoPath og
    koble disse – gjennom å laste opp InfoPath-dokumentet – til TUL for å kunne spesifisere innholdet i skjemaet og bruken av det
    ytterligere.

  - **Kodeliste**  
    En kodeliste er en liste med faste verdier som for eksempel postnummer og poststed. Kodelisten brukes typisk i nedtrekkslister i
    skjema i sluttbruker­løsningen. En kodeliste kan brukes på tvers av tjenesteeiere og tjenester, eller den kan spesiallages for
    enkelte tjenesteeiere eller tjenester. Kodelister vil vedlikeholdes utenfor den enkelte tjeneste og må migreres over til
    sluttbrukerløsningen på linje med tjenestene.

  - **Kortnavn**  
    Både tjenester og utgaver har kortnavn. Kortnavnene både for tjeneste og for utgave benyttes *kun* i TUL for å angi navn på
    henholdsvis tjenestens og utgavens arbeidsflate i TUL.

  - **Migrere**  
    Pakke sammen alle data i en tjenesteutgave, versjonere, og legge det over til et sluttbrukermiljø.

  - **Innholdsreferanser**  
    Felter som beskriver utfylt instans av en utgave

  - **Preutfylling**  
    Felter fylles ut av SBL ved åpning av utgave

  - **Prosessflyt**  
    Automatisert navigasjon gjennom en spesifikk rekkefølge av handlinger eller oppgaver relatert til en forretningsprosess.

  - **Sideegenskaper**  
    Egenskaper for en visning (side) fra InfoPath-skjema.

  - **Skjemasett**  
    Samling av skjemaer og vedlegg som signeres og sendes inn i én prosess. Der innsendingsrutinen forutsetter at ett bestemt skjema
    alltid er med i sendingen, er dette et *hovedskjema* og resten er *underskjema*.

  - **Sporvalg**  
    Definerer en samling av sider som bare presenteres for en bestemt avgivergruppe eller avgivere i en bestemt situasjon. Grunnlaget
    for sporvalg kan være basert på tidligere svar i samme skjema eller på allerede kjente opplysninger hos oppgaveinnhenteren. Sporene
    kan delvis, men ikke utelukkende, være satt sammen av identiske sider.

  - **Tjeneste**  
    En tjeneste kan ha en eller flere tjenesteutgaver, for eksempel en utgave per år. Det er tjenesteutgaven som migreres over til
    sluttbrukerløsningen. Det finnes ulike tjenestetyper, for eksempel innsendingstjeneste og meldingstjeneste. Eksempel på tjeneste:
    *Selvangivelse for næringsdrivende mv (RF-1030)*.

  - **Tjenesteeier**  
    En tjenesteeier er en etat som utvikler og eier tjenester som tilgjengeliggjøres gjennom Altinn. Eksempel på tjenesteeiere:
    Skattedirektoratet, NAV, Mattilsynet, Husbanken.

  - **Tjenestekatalog**  
    Liste over av alle tjenester i Altinn. Kan være nyttig i forbindelse med utvikling av mappere og betingelser (conditions). Ligger
    hos BRG på følgende adresse: https://altinn.brreg.no/sites/program/altinn%20II/Lists/Tjenestekatalog

  - **Tjenesteparametre**  
    Tjenesteparametre er egenskaper ved tjenesten som settes på tjenestenivå.

  - **Underskjema**  
    Et underskjema er et skjema som benyttes som tillegg til et hovedskjema for en tjeneste. Et skjema kan eksistere kun som
    underskjema, eller det kan eksistere som hovedskjema for én tjeneste men benyttes som underskjema for én eller flere andre tjenester
    (da må det i så fall være forskjellige utgaver eller forskjellige tjenester som bruker samme xsn-fil). Et underskjema kan knyttes
    til ett eller flere hovedskjema.

  - **Utgave**  
    Også kalt *tjenesteutgave*. En tjeneste kan ha en eller flere utgaver, for eksempel en utgave per år. Det er tjenesteutgaven som
    migreres over til sluttbrukerløsningen.

  - **Utgaveparametre**  
    Utgaveparametre er egenskaper ved utgaven som settes på utgavenivå.

  - **Versjon**  
    Hver gang en tjenesteutgave blir migrert til et miljø blir det opprettet en ny versjon av tjenesteutgaven.

  - **WCAG**  
    WCAG er en forkortelse for Web Content Accessibility Guidelines. Dette er [retningslinjer](https://www.w3.org/TR/WCAG20/) for å gjøre webinnhold tilgjengelig for
    mennesker med funksjonshemninger. Webinnhold generelt refererer til informasjon på en webside eller web-applikasjon, inkludert
    tekst, bilder, lyd og video.

  - **XSD**  
    XSD er en forkortelse for *XML Schema Definition*. XSD er en filtype som brukes til å implementere et InfoPath-skjema. Også kalt
    *datakilde. Denne filen styrer strukturen til XML som lagres i Altinn, og sluttbrukersystemene benytter XSD’en for å vite hvordan
    skjemadata som sendes inn skal være* formatert.

  - **XSN**  
    XSN er filtypen til InfoPath-skjema

  - **TFS**  
    Team Foundation Server er ALM og kildekodesystemet som benyttes i Altinn. Bruk av TFS er integrert i Visual Studio.

