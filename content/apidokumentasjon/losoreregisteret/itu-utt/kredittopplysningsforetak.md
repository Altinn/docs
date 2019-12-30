---
title: ITU/UTT for kredittopplysningsforetak
description: ITU/UTT API for kredittopplysningsforetak
weight: 100
---

> **_INFO:_**  Denne siden inneholder en del tekst som vil bli flyttet inn i OpenAPI-spesifikasjon når denne er klar.

## Innledning

Utlegg-api-ekstern er en standardisert maskin-til-maskin tjeneste (API) som kan benyttes av eksterne partnere for innsyn i utleggsdata fra Brønnøysundregistrene.

Dokumentasjonen kan benyttes som veiledning for hvordan eksterne systemer skal integrere seg mot API'et.

Den skal gi et innblikk i hvordan API'et er bygd opp, teknologivalg, hvordan man gjør søk og hvordan man navigerer i API-ets modell.

Implementering av tjenesten krever at integrasjon fra en annen programvare eller system er bygget mot API'et. 

## Syntetiske testdata

Vi har en [Excel-fil med syntetiske testdata](../Testdata ITU-UTT pr 04.10.2019-PPE.xlsx) for personer/virksomheter som det er registrert saker på. Alt er oppkonstruert, både personer, virksomheter og saker.
Merk at avvik mellom filen og respons fra tjenesten kan forekomme over tid, ettersom tjenesten oppdateres fortløpende.

## API-referanse

Utlegg-api-ekstern tilbyr opplysninger fra Løsøreregisteret om:

* Intet til utlegg og utleggstrekk på fødselsnummer/d-nummer og organisasjonsnummer
* Intet til utlegg på organisasjonsnummer

## Sikkerhetsmekanismer

Siden dette er begrensede API-er så skal kallende parter autentiseres gjennom [Maskinporten](https://difi.github.io/idporten-oidc-dokumentasjon/oidc_guide_maskinporten.html).
Dette gjøres ved å hente et JWT-token fra maskinporten på en bruker som har et gyldig scope for brreg:losore/utlegg. Tokenet som hentes
fra maskinporten må bli sendt som autorisasjonstoken(Bearer token) når et kall mot utlegg-api-ekstern blir utført.

[Regelverk](https://lovdata.no/dokument/SF/forskrift/2015-12-11-1668/%C2%A76): hjemler for tilgjengeliggjøring av data fra Brønnøysundregistrene.

## Grensesnittbeskrivelse

Tjeneren tilbyr blant annet følgende funksjonalitet for eksterne systemer/brukere:

Alle kall som brukes for å hente ut data fra API'et bruker GET-metoder i HTTP.

| HTTP-metode   | URL                                                            | Beskrivelse                                                                                                                   |
|:------------- |:-------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |
| GET           | https://\{domain\}/utlegg/personer-utvidet/\{fnr/dnr\}        | Hent opplysninger om intet til utlegg og utleggstrekk på et fødselsnummer eller d-nummer.                                     |
| GET           | https://\{domain\}/utlegg/endringslogg/\{løpenummer\}       | Hent endringslogg om intet til utlegg og utleggstrekk på fødselsnummer, d-nummer og organisasjonsnummer basert på løpenummer. |
| GET           | https://\{domain\}/utlegg/endringslogg/enheter/\{løpenummer\} | Hent endringslogg om intet til utlegg på organisasjonsnummer basert på løpenummer.                                            |
| GET           | https://\{domain\}/utlegg/totalbestand/\{løpenummer\}       | Hent totalbestand om intet til utlegg og utleggstrekk på fødselsnummer, d-nummer og organisasjonsnummer basert på løpenummer. |
| GET           | https://\{domain\}/utlegg/totalbestand/enheter/\{løpenummer\} | Hent totalbestand om intet til utlegg på organisasjonsnummer basert på løpenummer.                                            |

**Merknader**:

* \<domain\> er ennå ikke avklart.

---

### Oppslag på fødselsnummer eller d-nummer

#### Beskrivelse

Tjenesten tar imot en forespørsel om oppslag på et fødselsnummer eller d-nummer, forespørselen valideres før utførelsen og returnerer opplysninger om kun aktive intet til utlegg og utleggstrekk på fødselsnummer eller d-nummer.

#### Request

Tar i mot et fødselsnummer eller d-nummer som del av URL.

#### Validering

Maskinport-tokenet som blir sendt inn er knyttet til sluttbrukers orgnummer og dette orgnummeret skal være gyldig
samt ha en gyldig avtale om å kunne hente ut utlegg. 

Forespørselen skal alltid inneholde fødselsnummer eller d-nummer på den det gjøres oppslag på.
Dersom forespørselen inneholder et fødselsnummer eller d-nummer som ikke er lovlig oppbygd, returneres det en feilmelding.

#### Response

Returnerer tilbake et JSON-objekt som inneholder opplysninger om intet til utlegg og utleggstrekk

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format.

Eksempelrespons

```json
{
 "antallITU": 1,
 "antallUTT": 3,
 "utlegg": [
      {
         "ubnr": 20181230000024,
 "ubmeldnr": 1,
 "utleggstype": "ITU",
 "avholdtForretning": "2017-08-01",
 "innfortILosoreregisteret": "2018-08-02",
 "aktorer": [
            {
               "rolletype": "Prosessfullmektig",
 "organisasjonsnummer": "810305002",
 "referansenummer": "1"
 },
 {
               "rolletype": "Saksøker",
 "organisasjonsnummer": "810305282"
 },
 {
               "rolletype": "Namsmyndighet",
 "organisasjonsnummer": "810304642"
 },
 {
               "rolletype": "Saksøkt",
 "personidentifikator": "01096501311"
 }
         ]
      },
 {
         "ubnr": 20181230000026,
 "ubmeldnr": 1,
 "utleggstype": "UTT",
 "avholdtForretning": "2017-06-01",
 "innfortILosoreregisteret": "2018-08-02",
 "trekkbelop": 25000.00,
 "trekkvaluta": "NOK",
 "periodeStart": "2017-07-13",
 "periodeSlutt": "2020-07-13",
 "aktorer": [
            {
               "rolletype": "Prosessfullmektig",
 "organisasjonsnummer": "810305002",
 "referansenummer": "1"
 },
 {
               "rolletype": "Saksøker",
 "organisasjonsnummer": "810305282"
 },
 {
               "rolletype": "Namsmyndighet",
 "organisasjonsnummer": "810304642"
 },
 {
               "rolletype": "Saksøkt",
 "personidentifikator": "01096501311"
 }
         ]
      },
 {
         "ubnr": 20181230000027,
 "ubmeldnr": 1,
 "utleggstype": "UTT",
 "avholdtForretning": "2017-06-01",
 "innfortILosoreregisteret": "2018-08-02",
 "trekkbelop": 500.00,
 "trekkvaluta": "NOK",
 "periodeStart": "2017-07-01",
 "periodeSlutt": "2020-07-01",
 "aktorer": [
            {
               "rolletype": "Prosessfullmektig",
 "organisasjonsnummer": "810305002",
 "referansenummer": "1"
 },
 {
               "rolletype": "Saksøker",
 "organisasjonsnummer": "810305282"
 },
 {
               "rolletype": "Namsmyndighet",
 "organisasjonsnummer": "810304642"
 },
 {
               "rolletype": "Saksøkt",
 "personidentifikator": "01096501311"
 }
         ]
      },
 {
         "ubnr": 20181230000028,
 "ubmeldnr": 1,
 "utleggstype": "UTT",
 "avholdtForretning": "2017-06-01",
 "innfortILosoreregisteret": "2018-08-02",
 "trekkbelop": 500.00,
 "trekkvaluta": "NOK",
 "periodeStart": "2017-07-01",
 "periodeSlutt": "2020-07-01",
 "aktorer": [
            {
               "rolletype": "Prosessfullmektig",
 "organisasjonsnummer": "810305002",
 "referansenummer": "1"
 },
 {
               "rolletype": "Saksøker",
 "organisasjonsnummer": "810305282"
 },
 {
               "rolletype": "Namsmyndighet",
 "organisasjonsnummer": "810304642"
 },
 {
               "rolletype": "Saksøkt",
 "personidentifikator": "01096501311"
 }
         ]
      }
   ],
 "meldinger": [
   ]
}
```

---

### Oppslag på endringer på fødselsnummer eller d-nummer og organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel hvor det er oppgitt et løpenummer, og returnerer alle endringer som er registrert kronologisk etter oppgitt løpenummer.

Maksimalt antall meldinger som returneres per forespørsel er 1000, og dette regnes som én side med resultater. Dette vil ofte ikke gi alle endringer på en dag, men lenke til neste side finnes som Location-header i responsen fra tjenesten dersom det er flere sider.
Dersom løpenummeret i forespørselen tilhører en melding som er eldre enn 7 dager, returneres det en feilmelding.

#### Request

Tar i mot en forespørsel hvor det er oppgitt et løpenummer som del av URL.

#### Response

Returnerer to alternative responser som inneholder opplysninger om:

1. intet til utlegg og utleggstrekk på fødselsnummer eller d-nummer og organisasjonsnummer
2. intet til utlegg på organisasjonsnummer.

Siste løpenummer returneres som en del av responsen, slik at dette kan benyttes for å kontrollere om man har fått alt, samt som input i neste forespørsel.

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format.

Eksempelrespons for Intet til utlegg på organisasjonsnummer:

```json
{
    "antallITU": 3,
    "antallUTT": 0,
    "sisteLopenr": 262,
    "endringslogg": [
        {
            "ubnr": 20181234500091,
            "ubmeldnr": 1,
            "utleggstype": "ITU",
            "avholdtForretning": "2018-07-01",
            "innfortILosoreregisteret": "2018-10-22",
            "aktorer": [
                {
                    "rolletype": "Prosessfullmektig",
                    "personidentifikator": "01065101935",
                    "referansenummer": "1"
                },
                {
                    "rolletype": "Saksøker",
                    "navn": "Simon Skogseth",
                    "adresse": "Gråen 4",
                    "postnr": "4844",
                    "poststed": "Arendal",
                    "landkode": "NO"
                },
                {
                    "rolletype": "Namsmyndighet",
                    "organisasjonsnummer": "810304642",
                    "saksnummer": "1"
                },
                {
                    "rolletype": "Saksøkt",
                    "organisasjonsnummer": "910452223"
                }
            ]
        },
        {
            "ubnr": 20181234500095,
            "ubmeldnr": 2,
            "utleggstype": "ITU",
            "avholdtForretning": "2018-10-01",
            "innfortILosoreregisteret": "2018-10-23",
            "aktorer": [
                {
                    "rolletype": "Prosessfullmektig",
                    "personidentifikator": "01065101935",
                    "referansenummer": "1"
                },
                {
                    "rolletype": "Saksøker",
                    "navn": "Simon Skogseth",
                    "adresse": "Gråen 4",
                    "postnr": "4844",
                    "poststed": "Arendal",
                    "landkode": "NO"
                },
                {
                    "rolletype": "Namsmyndighet",
                    "organisasjonsnummer": "810304642",
                    "saksnummer": "1"
                },
                {
                    "rolletype": "Saksøkt",
                    "organisasjonsnummer": "910452223"
                }
            ]
        },
        {
            "ubnr": 20181234500100,
            "ubmeldnr": 1,
            "utleggstype": "ITU",
            "avholdtForretning": "2018-07-01",
            "innfortILosoreregisteret": "2018-10-24",
            "aktorer": [
                {
                    "rolletype": "Prosessfullmektig",
                    "personidentifikator": "01065101935",
                    "referansenummer": "1"
                },
                {
                    "rolletype": "Saksøker",
                    "navn": "Simon Skogseth",
                    "adresse": "Gråen 4",
                    "postnr": "4844",
                    "poststed": "Arendal",
                    "landkode": "NO"
                },
                {
                    "rolletype": "Namsmyndighet",
                    "organisasjonsnummer": "810304642",
                    "saksnummer": "1"
                },
                {
                    "rolletype": "Saksøkt",
                    "organisasjonsnummer": "910452223"
                }
            ]
        }
    ],
    "meldinger": []
}
```

---

### Oppslag på totalbestand på fødselsnummer, d-nummer og organisasjonsnummer

#### Beskrivelse

Tjenesten tar imot en forespørsel hvor det er oppgitt et løpenummer, og returnerer alle **aktive utlegg** som er registrert kronologisk etter oppgitt løpenummer.
Merk at det vil nødvendigvis være hull i nummereringen, etterlatt av saker som ikke lenger er aktive ved oppslagstidspunktet.

Maksimalt antall meldinger som returneres per forespørsel er 1000, og dette regnes som én side med resultater. Dette vil ikke være hele totalbestanden, men lenke til neste side leveres i responsen så lenge det er flere sider.

#### Request

Tar i mot en forespørsel hvor det er oppgitt et løpenummer som del av URL.

Tjenesten kalles initielt med løpenummer 0 for å få de første 1000 elementene, og for å iterativt hente neste side med resultater bruker man verdien fra feltet _sisteLopenr_ fra forrige respons som spørreparameter.
Alternativt kan man benytte lenken til neste side som returneres som eget felt.

#### Response

Returnerer to alternative responser som inneholder opplysninger om ; 1. intet til utlegg og utleggstrekk på fødselsnummer, d-nummer og organisasjonsnummer og 2. intet til utlegg på organisasjonsnummer.
Siste løpenummer er en del av responsen.

Dersom kallet lykkes får man HTTP-status 200 og data fra tjenesten på JSON-format.

Eksempelrespons for intet til utlegg og utleggstrekk på fødselsnummer, d-nummer og organisasjonsnummer:

```json
{
	"antallITU": 5,
	"antallUTT": 5,
	"sisteLopenr": 182,
	"totalbestand": [ 
{ "ubnr": 20181234500016, "ubmeldnr": 1, "utleggstype": "ITU", "avholdtForretning": "2017-11-25", "innfortILosoreregisteret": "2018-09-11", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "navn": "Tarald Vassbotn", "adresse": "Hjortestien 15", "postnr": "1615", "poststed": "Fredrikstad", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810306092", "referansenummer": "1" }, { "rolletype": "Saksøkt", "personidentifikator": "20020100568" } ] }, 
{ "ubnr": 20181234500017, "ubmeldnr": 1, "utleggstype": "ITU", "avholdtForretning": "2018-06-12", "innfortILosoreregisteret": "2018-09-17", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "personidentifikator": "01065101935", "referansenummer": "3" }, 
 { "rolletype": "Saksøker", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "20020100568" } ] }, 
 { "ubnr": 20181234500018, "ubmeldnr": 1, "utleggstype": "UTT", "avholdtForretning": "2018-03-10", "innfortILosoreregisteret": "2018-09-17", "trekkbelop": 5000.00, "trekkvaluta": "NOK", "periodeStart": "2018-03-13", "periodeSlutt": "2019-07-13", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "personidentifikator": "01065101935", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "20020100568" } ] }, 
{ "ubnr": 20181234500019, "ubmeldnr": 1, "utleggstype": "UTT", "avholdtForretning": "2018-03-10", "innfortILosoreregisteret": "2018-09-17", "trekkbelop": 1000.00, "trekkvaluta": "NOK", "periodeStart": "2018-04-13", "periodeSlutt": "2019-07-13", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "personidentifikator": "01065101935", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "20020100568" } ] }, 
{ "ubnr": 20181234500022, "ubmeldnr": 1, "utleggstype": "ITU", "avholdtForretning": "2018-06-28", "innfortILosoreregisteret": "2018-09-18", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "personidentifikator": "01065101935", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "organisasjonsnummer": "810311312" } ] }, 
{ "ubnr": 20181234500023, "ubmeldnr": 1, "utleggstype": "ITU", "avholdtForretning": "2017-11-25", "innfortILosoreregisteret": "2018-09-18", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO", "referansenummer": "1001" }, 
 { "rolletype": "Saksøker", "navn": "Tarald Vassbotn", "adresse": "Hjortestien 15", "postnr": "1615", "poststed": "Fredrikstad", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810306092", "referansenummer": "100" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "01124901770" } ] }, 
{ "ubnr": 20181234500024, "ubmeldnr": 1, "utleggstype": "ITU", "avholdtForretning": "2017-12-28", "innfortILosoreregisteret": "2018-09-18", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "personidentifikator": "01065101935", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "navn": "Simon Skogseth", "adresse": "Gråen 4", "postnr": "4844", "poststed": "Arendal", "landkode": "NO" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810306092", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "02012200571" } ] }, 
{ "ubnr": 20181234500026, "ubmeldnr": 1, "utleggstype": "UTT", "avholdtForretning": "2017-06-10", "innfortILosoreregisteret": "2018-09-20", "trekkbelop": 2500.00, "trekkvaluta": "NOK", "periodeStart": "2017-07-13", "periodeSlutt": "2019-07-13", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "organisasjonsnummer": "810305002", "referansenummer": "1" }, 
 { "rolletype": "Saksøker", "organisasjonsnummer": "810305282" }, 
 { "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
 { "rolletype": "Saksøkt", "personidentifikator": "01065100394" } ] }, 
 { "ubnr": 20181234500028, "ubmeldnr": 2, "utleggstype": "UTT", "avholdtForretning": "2017-06-10", "innfortILosoreregisteret": "2018-09-20", "trekkbelop": 9.00, "trekkvaluta": "NOK", "periodeStart": "2017-07-13", "periodeSlutt": "2019-07-13", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "organisasjonsnummer": "810305002", "referansenummer": "1" }, 
{ "rolletype": "Saksøker", "organisasjonsnummer": "810305282" }, 
{ "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
{ "rolletype": "Saksøkt", "personidentifikator": "13020100251" } ] }, 
{ "ubnr": 20181234500029, "ubmeldnr": 2, "utleggstype": "UTT", "avholdtForretning": "2018-06-10", "innfortILosoreregisteret": "2018-09-20", "trekkprosent": 9.0, "periodeStart": "2018-07-13", "periodeSlutt": "2021-07-13", 
"aktorer": [ { "rolletype": "Prosessfullmektig", "organisasjonsnummer": "810305002", "referansenummer": "1" }, 
{ "rolletype": "Saksøker", "organisasjonsnummer": "810305282" }, 
{ "rolletype": "Namsmyndighet", "organisasjonsnummer": "810304642", "referansenummer": "1" }, 
{ "rolletype": "Saksøkt", "personidentifikator": "02012600898" } ] } ],
	"meldinger": [],
	"_links": { "next": { "href": "http://localhost:8181/utlegg/v1/totalbestand/182" } } }
```

---

## Feilmeldinger

Dersom man ikke får HTTP-status 200, så får man en melding fra tjenesten i JSON-format.

| HTTP-kode   | Feilmelding                                                                                 |
|:----------- |:------------------------------------------------------------------------------------------- |
| 404         | Det er ikke registrert opplysninger om intet til utlegg på dette fødselsnummeret/d-nummeret |
| 404         | Det er ikke registrert opplysninger om utleggstrekk på dette fødselsnummeret/d-nummeret     |
| 404         | Det er ikke registrert opplysninger om intet til utlegg på dette organisasjonsnummeret      |
| 400         | Organisasjonsnummer mangler                                                                 |
| 400         | Ugyldig organisasjonsnummer                                                                 |
| 400         | Fødselsnummer/d-nummer mangler                                                              |
| 400         | Ugyldig fødselsnummer/d-nummer                                                              |
| 404         | Løpenummer tilhører melding eldre enn 7 dager                                               |
| 404         | Fant ingen meldinger fra løpenummer {oppgitt løpenr}                                        |
| 400         | Ugyldig løpenr oppgitt                                                                      |
| 403         | Forespørsel inneholder ingen gyldig bearer token                                            |
## HTTP-statuskoder

Oversikt over HTTP-statuskoder i API'et.

| HTTP-kode                 | Beskrivelse |
|:------------------------- |:----------- |
| 200 OK                    | Henting av data gikk bra |
| 400 Bad Request           | Feil i spørring. Applikasjonen vil gi en detaljert feilmelding for hva som er feil med spørring |
| 404 Not Found             | Applikasjonen vil gi en detaljert feilmelding for hva som ikke ble funnet. Kan også bety at man bruker feil adresse for tjenesten (i så fall vil man få en standard "404 NOT FOUND" og ikke et svar fra applikasjonen) |
| 500 Internal Server Error | Feil på server side, for eksempel at en underliggende datakilde ikke svarer |

## Ordliste

Definisjoner på begrep som er brukt i denne dokumentasjonen.

| Begrep | Definisjon |
|:------ |:---------- |
| API | Programmeringsgrensesnitt |
| HTTP | Datakommunikasjonsstandard |
| HTTP-statuskoder | Statuskoder for datakommunikasjonsstandard |
| REST | Datakommunikasjonmønster |
| JSON | Åpen standard for dataformat |
| D-nummer | Identifikasjonsnummer tildeles personer med midlertidig tilknytning til Norge, det vil si som ikke er bosatt i Norge. Består av en modifisert sekssifret fødselsdato og et femsifret personnummer. Fødselsdatoen modifiseres ved at det legges til 4 på det første sifferet. |
| Fødselsnummer	| Identifikasjonsnummer fra folkeregistret og består av 11 siffer |
| Personidentifikator | Fødselsnummer eller d-nummer |
| Organisasjonsnummer | Identifikasjonsnummer for organisasjon |
| Utlegg | Intet til utlegg og utleggstrekk |
| ITU | Intet til utlegg |
| UTT | Utleggstrekk |
| Aktive | Med aktive menes de utleggstrekkene eller intet til utlegg som har status GO (godkjent) |
| Endringslogg | Endringsinformasjon (nye/slettede/endrede) om intet til utlegg og utleggstrekk. Det er bare kredittopplysningsforetak som kan abonnere på endringslogg. De har hjemmel for abonnement i utleggsregisterforskriftens § 3, jf tinglysningslovens § 34 a. |
| Totalbestand | Alle aktive saker (utleggstrekkene/intet til utlegg som har status GO) om intet til utlegg og utleggstrekk. Det er bare kredittopplysningsforetak som kan be om å få hente totalbestand. De har hjemmel for abonnement i utleggsregisterforskriftens § 3, jf tinglysningslovens § 34 a. |

## JSON-schema som brukes for validereing av responsen

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
 "additionalProperties": false,
 "type": "object",
 "required": [
    "antallITU",
 "antallUTT"
 ],
 "dependencies": {
    "utlegg": {"not": {"required": ["sisteLopenr"]}}
  },
 "oneOf": [
    {"required": ["endringslogg"]},
 {"required": ["totalbestand"]},
 {"required": ["utlegg"]}
  ],
 "properties": {
    "sisteLopenr": {
      "type": "integer"
 },
 "antallITU": {
      "type": "integer"
 },
 "antallUTT": {
      "type": "integer"
 },
 "meldinger": {
      "type": "array",
 "items": {"type": ["string", "null"]}
    },
 "_links": {
      "type": ["object", "null"],
 "properties": {
        "next": {
          "type": "object",
 "properties": {
            "href": {
              "type": "string"
 }
          },
 "required": ["href"]
        }
      },
 "required": ["next"]
    }
  },
 "patternProperties": {
    "^(endringslogg|totalbestand|utlegg)$": {
      "type": "array",
 "items": {
        "additionalProperties": false,
 "type": "object",
 "required": [
          "ubnr",
 "ubmeldnr",
 "utleggstype",
 "avholdtForretning",
 "innfortILosoreregisteret",
 "aktorer"
 ],
 "oneOf": [
          {
            "properties": {
              "utleggstype": {"enum": ["UTT"]}
            },
 "required": ["periodeStart", "periodeSlutt"],
 "oneOf": [
              {"required": ["trekkprosent"]},
 {"required": ["trekkbelop", "trekkvaluta"]}
            ]
          },
 {
            "properties": {
              "utleggstype": {"enum": ["ITU"]}
            },
 "not": {
              "anyOf": [
                {"required": ["periodeStart"]},
 {"required": ["periodeSlutt"]},
 {"required": ["trekkprosent"]},
 {"required": ["trekkbelop"]},
 {"required": ["trekkvaluta"]}
              ]
            }
          }
        ],
 "properties": {
          "ubnr": {
            "type": "integer",
 "minimum": 10000000000000,
 "maximum": 99999999999999,
 "examples": 20180000000000
 },
 "ubmeldnr": {
            "type": "integer",
 "minimum": 0,
 "maximum": 999,
 "examples": 1
 },
 "utleggstype": {
            "type": "string",
 "enum": ["ITU","UTT"]
          },
 "avholdtForretning": {
            "type": "string",
 "format": "date",
 "pattern": "^[12]\\d{3}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
 "examples": "2017-11-28"
 },
 "innfortILosoreregisteret": {
            "type": "string",
 "format": "date",
 "pattern": "^[12]\\d{3}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
 "examples": "2017-06-11"
 },
 "slettekode": {
            "type": "string",
 "enum": ["S","A","F"]
          },
 "slettedato": {
            "type": "string",
 "format": "date",
 "pattern": "^[12]\\d{3}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
 "examples": "2017-06-11"
 },
 "trekkprosent": {
            "type": "number",
 "minimum": 0.01,
 "maximum": 100.00,
 "examples": 50.00,
 "multipleOf": 0.01
 },
 "trekkbelop": {
            "type": "number",
 "examples": 5000.0
 },
 "trekkvaluta": {
            "type": "string",
 "pattern": "^[A-Z]{3}$",
 "examples": "NOK"
 },
 "periodeStart": {
            "type": "string",
 "format": "date",
 "pattern": "^[12]\\d{3}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
 "examples": "2018-01-16"
 },
 "periodeSlutt": {
            "type": "string",
 "format": "date",
 "pattern": "^[12]\\d{3}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$",
 "examples": "2023-01-16"
 },
 "aktorer": {
            "type": "array",
 "items": {
              "additionalProperties": false,
 "type": "object",
 "required": ["rolletype"],
 "anyOf": [
                {
                  "properties": {
                    "rolletype": {"enum": ["Namsmyndighet"]}
                  },
 "not": {"required": ["referansenummer"]}
                },
 {
                  "properties": {
                    "rolletype": {"enum": ["Prosessfullmektig","Saksøker"]}
                  },
 "not": {"required": ["saksnummer"]}
                },
 {
                  "properties": {"rolletype": {"enum": ["Saksøkt"]}
                  },
 "oneOf": [
                    {"required": ["organisasjonsnummer"]},
 {"required": ["personidentifikator"]}
                  ]
                }
              ],
 "properties": {
                "rolletype": {
                  "type": "string",
 "enum": [
                    "Namsmyndighet",
 "Prosessfullmektig",
 "Saksøker",
 "Saksøkt"
 ]
                },
 "organisasjonsnummer": {
                  "type": "string",
 "pattern": "^[8|9][0-9]{8}",
 "examples": "810304642"
 },
 "personidentifikator": {
                  "type": "string",
 "pattern": "^[0-9]{11}",
 "examples": "01065100394"
 },
 "navn": {
                  "type": "string"
 },
 "adresse": {
                  "type": "string"
 },
 "postnr": {
                  "type": "string"
 },
 "poststed": {
                  "type": "string"
 },
 "landkode": {
                  "type": "string",
 "pattern": "^[a-zA-Z]{2}$",
 "examples": "NO"
 },
 "saksnummer": {
                  "type": "string",
 "examples": "T2018-001234"
 },
 "referansenummer": {
                  "type": "string",
 "examples": "123456789"
 }
              }
            }
          }
        }
      }
    }
  }
}
```
