---
title: Brukerveiledning for SERES Administrasjonsklient
linktitle: Administrasjonsklient
description: Hvordan logge inn og bruke Administrasjonsklienten. 
weight: 110
---

&nbsp; 
## Innledning

SERES Administrasjonsklient er en webklient for administrasjon av brukere, kataloger og miljøer i SERES Repository. Opplysningene brukes av Domeneklienten for autentisering og autorisasjon av
brukere, og for visning av oversikten over tilgjengelige kataloger. Endringer i nivåene under en katalog gjøres direkte i Domeneklienten.

Det finnes tre brukerrettigheter i klienten, «Bruker», «Katalogadministrator» og «Systemadministrator». Brukerrettighetene er beskrevet lenger ned i dokumentet.

Spørsmål angående SERES Administrasjonsklient kan sendes på e-post til [Digitalisering Servicedesk](mailto:tjenesteeier@altinn.no?Subject=Spørsmål%20angående%20SERES%20Administrasjonsklient).

## Innlogging

Etter å ha startet SERES Administrasjonsklient gjennom https://brukeradmin.seres.no/login får du
opp en innloggingsside:

![Figur 1](../../administrasjonsklient-innloggingsside.png)

Oppgi ditt brukernavn og passord. Hvis du har glemt passordet ditt, kan du bruke «Glemt passord» - funksjonen som finnes i innloggingsvinduet til Domeneklienten.

Etter at du har logget inn kommer du til «Min side» som er en oversikt over hvilke opplysninger som er registrert på din bruker:

![Figur 2](../../administrasjonsklient-minside.png)

Denne siden er lik for alle uavhengig av hvilke rettigheter man har. Her kan man endre sine personlige opplysninger som navn, passord, e-postadresse og mobilnummer. Dette gjør man ved å klikke i det aktuelle feltet, endre opplysningen og så trykke på «Lagre». Vær oppmerksom på at hvis du kjører Domeneklienten i vår VMware-løsning så må også endring av mobilnummer meldes til [Digitalisering Servicedesk](mailto:tjenesteeier@altinn.no?Subject=SERES%20Desktop%20(VMware)%20-%20endring%20av%20mobilnummer) eller Brønnøysundregistrene sin [IT support](mailto:it-support@brreg.no?Subject=SERES%20Desktop%20(VMware)%20-%20endring%20av%20mobilnummer). Dette er nødvendig for at vi skal få oppdatert mobilnummeret i engangskodegeneratoren.

### Endre passord

For å endre sitt eget passord må man først klikke i feltet «Nytt passord» og så skrive inn et gyldig passord. Etterpå klikker man i feltet «Bekreft passord» og gjentar det samme passordet. Når man er ferdig klikker man på «Lagre».

![Figur 3](../../administrasjonsklient-minside-endre-passord.png)

Man vil få feilmelding hvis det ikke er samsvar mellom passordene eller at passordet ikke er gyldig. For brukere med rettigheten «Bruker» eller «Katalogadministrator» er kravet til passordet at det skal bestå av minimum 10 tegn og ha en kombinasjon av store og små bokstaver, tall og spesialtegn. Passordet til brukere med rollen «Systemadministrator» skal være på minimum 15 tegn.

## Bruker

Rettigheten «Bruker» gis til alle som skal ha tilgang til SERES Domeneklienten. En bruker med denne rettigheten vil alltid ha lesetilgang til alle aktive modeller i Domeneklienten som har status publisert og historisk. I tillegg vil brukeren som hovedregel ha skrivetilgang til minst en katalog. Å ha skrivetilgang til en katalog innebærer at man kan opprette nye modeller og versjoner av modeller i domene(r) som ligger i katalogen. I SERES Administrasjonsklient vil "Bruker" medføre få rettigheter. De vil ha tilgang til «Min side» slik at de kan endre sine personlig opplysninger, og lesetilgang til egne opplysninger på siden «Brukere».

Øverst på siden i klienten er det arkfaner som viser hvilke sider som finnes og hvilke som er tilgjengelig, og når du er innlogget med kun rettigheten «Bruker» vil arkfanene se slik ut:

![Figur 4](../../administrasjonsklient-bruker-arkfane-brukerrettighet.png)

Den siden som er åpnet vil ha en arkfane som er omrammet og siden vil ha grått navn. Sider som du har tilgang til vil ha blått navn og de vil bli markert når du holder musepekeren over dem. Mens sider som du ikke har tilgang til vil ha grått navn uten omramming, og de vil ikke bli marker når du holder musepekeren over dem.

Klikk på arkfanen «Brukere» slik at siden vises:

![Figur 5](../../administrasjonsklient-brukere-brukerrettighet.png)

Hva du kan se og gjøre på denne siden er avhengig av hvilke rettigheter du har. En bruker som kun har rettigheten «Bruker» får kun se en oversikt over egen tilgang(er).

## Katalogadministrator

En som har rettigheten «Bruker» kan i tillegg gis rettigheten «Katalogadministrator» til en katalog. Det er eieren av katalogen som bestemmer hvem som skal ha denne rettigheten. I Domeneklienten vil den som har denne rettigheten i tillegg til å ha skrivetilgang til katalogen, ha rettigheter til å opprette nye domener og å endre opplysninger på eksisterende domener under katalogen. I SERES Administrasjonsklient vil brukere med denne rettigheten, i tillegg til å ha de samme rettighetene som en «Bruker», kunne se og endre hvem som skal ha skrivetilgang og «Katalogadministrator»-rettighet til katalogen på siden «Brukere», samt se organisasjonsnummer og se/oppdatere navn til katalogen på siden «Organisasjoner». Øverst på siden i klienten er det arkfaner som viser hvilke sider som finnes og hvilke som er tilgjengelig:

Øverst på siden i klienten er det arkfaner som viser hvilke sider som finnes og hvilke som er tilgjengelig, og når du er innlogget med rettighetene «Bruker» og «Katalogadministrator» vil arkfanene se slik ut:

![Figur 6](../../administrasjonsklient-katalogadministrator-arkfane-brukerrettighet.png)

Den siden som er åpnet vil ha en arkfane som er omrammet og siden vil ha grått navn. Sider som du har tilgang til vil ha blått navn og de vil bli markert når du holder musepekeren over dem. Mens sider som du ikke har tilgang til vil ha grått navn uten omramming, og de vil ikke bli markert når du holder musepekeren over dem.

### Brukere

Klikk på arkfanen «Brukere» slik at siden vises:

![Figur 7](../../administrasjonsklient-katalogadministrator-brukerrettighet.png)

Hva du kan se og gjøre på denne siden er avhengig av hvilke rettigheter du har. En bruker som har rettigheten «KatalogAdministrator» får se en oversikt over alle brukere som har skrivetilgang til katalogen(e) brukeren administrerer. I tillegg kan denne brukeren gi og fjerne andre brukeres skrivetilgang og «KatalogAdministrator»-rettighet til katalogen(e).

#### Gi en bruker skrivetilgang til katalog

For å kunne gi en bruker skrivetilgang til en katalog må brukeren først være opprettet av «Systemadministrator» med rettigheten «Bruker», og du må kjenne brukerens brukernavn.

Du er innlogget og siden «Brukere» er valgt:

![Figur 8](../../administrasjonsklient-katalogadministrator-brukerrettighet-knyttbruker.png)

Klikk på «Knytt bruker til katalog».

Dialogvinduet «Velg bruker» åpnes:

![Figur 9 (fortsett her)](../../administrasjonsklient-katalogadministrator-brukerrettighet-velgbruker.png)

Begynn med å velge katalog i nedtrekkslisten «Katalog». Hvis du kun har KatalogAdministrator-rettighet til en katalog vil katalogen automatisk være valgt for deg. I feltet «Brukernavn» skriver du brukernavnet til brukeren. Klikk så på «Legg til».

Brukeren har fått skrivetilgang til katalogen:

![Figur 10](../../administrasjonsklient-katalogadministrator-brukerrettighet-brukerlagttil.png)

Hvis det er oppgitt et brukernavn som ikke finnes vil du få en feilmelding:

![Figur 11](../../administrasjonsklient-katalogadministrator-brukerrettighet-ugyldigbruker.png)

#### Fjerne en brukers skrivetilgang til en katalog

Du er innlogget og siden «Brukere» er valgt:

![Figur 12](../../administrasjonsklient-katalogadministrator-brukerrettighet-fjernebruker.png)

Finn brukeren som ikke lenger skal ha skrivetilgang. Dobbeltklikk på cellen som viser hvilke(n) katalog(er) brukeren har skrivetilgang til. Fjern avkryssingen for den aktuelle katalogen. Etter at du har fjernet avkryssingen vil brukerne være borte fra oversikten din når siden oppdateres (ved f.eks. å trykke på F5-tasten). Vær oppmerksom på at hvis brukeren også har rettigheten «Katalogadministrator» til katalogen så må denne rettigheten fjernes først.

#### Gi en bruker rettigheten KatalogAdministrator

For å kunne gi en bruker rettigheten «KatalogAdministrator» til en katalog må brukeren først ha fått skrivetilgang til katalogen.

Du er innlogget og siden «Brukere» er valgt:

![Figur 13](../../administrasjonsklient-katalogadministrator-brukerrettighet-gikatalogadministratorrettighet.png)

Finn brukeren som skal gis rettigheten «KatalogAdministrator». Dobbeltklikk på cellen som viser hvilke(n) katalog(er) brukeren er «KatalogAdministrator» for. Kryss av for den aktuelle katalogen.

Etter at siden er oppdatert kan du se at brukeren er blitt «KatalogAdministrator» for katalogen:

![Figur 14](../../administrasjonsklient-katalogadministrator-brukerrettighet-harkatalogadministratorrettighet.png)

#### Fjerne en brukers rettighet som KatalogAdministrator

Du er innlogget og siden «Brukere» er valgt:

![Figur 15](../../administrasjonsklient-katalogadministrator-brukerrettighet-fjernekatalogadministratorrettighet.png)

Finn brukeren som ikke lenger skal være «KatalogAdministrator». Dobbeltklikk på cellen som viser hvilke(n) katalog(er) brukeren er «KatalogAdministrator» for. Fjern avkryssingen for den aktuelle katalogen. Etter at du har fjernet avkryssingen vil brukerens «KatalogAdministrator»-rettighet være borte fra oversikten din når siden oppdateres (ved f.eks. å trykke på F5-tasten).

### Organisasjon

Klikk på arkfanen «Organisasjoner» slik at siden vises:

![Figur 16](../../administrasjonsklient-katalogadministrator-organisasjon.png)

Hva du kan se og gjøre på denne siden er avhengig av hvilke rettigheter du har. En bruker som har rettigheten «KatalogAdministrator» får se en oversikt over organisasjonsnummer og navn til de som eier katalogen(e) du er «KatalogAdministrator» for. Navnet på eier vil være det samme som katalogens navn. I tillegg kan denne brukeren oppdatere navnet til eier/katalogen mot Enhetsregisteret.

#### Oppdatere navn til katalog

Du er innlogget og siden «Organisasjoner» er valgt:

![Figur 17](../../administrasjonsklient-katalogadministrator-organisasjon-velgorganisasjon.png)

Finn katalogen/enheten som du ønsker å oppdatere navnet på og dobbeltklikk på navnet til katalogen/enheten.

Navnet til katalogen/enheten er erstattet med knappen «Oppdater fra Enhetsregisteret»:

![Figur 18](../../administrasjonsklient-katalogadministrator-organisasjon-oppdater.png)

Klikk på knappen «Oppdater fra Enhetsregisteret». Navnet til katalogen/enheten blir endret til det nye navnet som enheten har i Enhetsregisteret.

## Systemadministrator

Rettigheten «Systemadministrator» gis kun til personer hos Digitaliseringsdirektoratet som har forvaltningsansvar for SERES-løsningen.

I Domeneklienten vil den som har denne rettigheten ha skrivetilgang og «Katalogadministrator»-rettighet til alle katalogene.

I SERES Administrasjonsklient vil brukere med denne rettigheten ha de samme rettighetene som en «Katalogadministrator» for alle katalogene. I tillegg vil de kunne opprette nye brukere, slette/aktivere/deaktivere brukere og kunne se og endre hvem som skal ha «Systemadministrator»-rettighet på siden «Brukere». På siden «Organisasjoner» kan de legge til og slette organisasjoner og på siden «Miljøer» kan de administrere hvilke miljøer som skal vises i «Domeneklienten» og «Administrasjonsklienten».
