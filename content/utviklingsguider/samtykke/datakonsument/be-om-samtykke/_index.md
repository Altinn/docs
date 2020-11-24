---
title: Be om samtykke
description: Hvordan sende sluttbruker til samtykkesiden i Altinn.
toc: true
weight: 20
aliases:
 - /guides/samtykke/datakonsument/be-om-samtykke/
---

## Overordnet om løsningen

Samtykkeløsningen tilbyr to mekanismer for å innehente et samtykke fra en sluttbruker. I begge tilfellene skal brukeren videresendes til en adresse i Altinn, hvor samtykke blir innfridd.

Den foretrukne mekanismen er _forhåndsregistrerte samtykkeforespørsler_, som er beskrevet under. Den andre mekanismen er _lenkebaserte samtykker_, som er å regne som legacy og ikke vil bli videreutviklet. Alle nye integrasjoner mot samtykkeløsningen anbefales å bruke forhåndregistrerte samtykkeforespørsler.

Forhåndsregistrerte samtykkeforespørsler har en rekke fordeler over lenkebaserte samtykkeforespørsler:

* Mulighet for offline flyter som ikke er avhengige av at brukeren alltid er tilstede (f.eks. visning av innkommende samtykkeforespørsler i portal)
* Bruk av maler – høy fleksibilitet i hvordan dialogen presenteres
* Datakonsument kan sjekke status på en gitt samtykkeforespørsel (er den åpnet/innfridd/nektet/feilet?), uavhengig av redirect-URL-flyt
* Mulighet for server-til-server notifikasjon ved innfrielse/trekking av samtykke (kommer i Q1 2021!)

### Forhåndsregistrerte samtykkeforespørsler
For å be om et samtykke kreves det at datakonsument først oppretter en samtykkeforespørsel via REST, for så å sende sluttbrukeren til samtykkesiden.

For utfyllende informasjon om hvordan datastrukturen for en samtykkeforespørsel via REST er, vennligst gå til _ConsentRequest_ i [API-dokumentasjonen](https://www.altinn.no/api/help) 

{{% notice warning  %}}
Merk at dette API-et krever virksomhetsautentisering med virksomhetssertifikat eller Maskinporten-token. Hvis du skal administrere samtykker på vegne av en kunde, se <a href="../leverandor">leverandør-integrasjoner</a>.
{{% /notice %}}

Eksempel på forespørsel:
```
{
    "coveredBy": "910514458",               --Orgnr til datakonsument
    "offeredBy": "27042000537",             --Fnr/orgnr til den som gir samtykke
    "offeredByName": "NORDMANN",            --Etternavn/orgnavn til samme
    "validTo": "2019-09-30T10:30:00.000",   --Gyldighetsdato for samtykke 
    "redirectUrl": "https://www.altinn.no", --URL som bruker sendes til
    "portalViewMode": "Hide",               --Om den skal synes i portalen¹
    "requestResources": [                   --Tjenestene med eventuelle metadata
        {
            "ServiceCode": "4629",
            "ServiceEditionCode": 2,
            "Metadata": {
                "inntektsaar": "2016"
            }
        },
        {
            "ServiceCode": "4630",
            "ServiceEditionCode": 2,
            "Metadata": {
                "fraOgMed": "2017-06",
                "tilOgMed": "2017-08"
            }
        }
    ],
    "requestMessage": {     --Tidligere omtalt som DelegationContext
        "no-nb": "Ved å samtykke, gir du Skatteetaten rett til å utlevere...",
        "no-nn": "Ved å samtykka, gir du Skatteetaten rett til å utlevera...",
        "en": "By accepting the consent, you grant the Tax Authority the..."
    }
}
```
<p style="font-size: 74%;">
¹ `portalViewMode` bestemmer om en samtykkeforespørsel skal være synlig i portalen for sluttbruker eller ikke. Dette er funksjonalitet som vil komme i 20.12. Forespørsler som besvares via portal vil ikke medføre at sluttbrukeren blir sendt til endepunkt oppgitt i `redirectUrl`.
</p>


Eksempel på svar:
```
{
    "AuthorizationCode": "c44f284f-b43b-4355-925a-2add17439659",
    "CoveredBy": "910514458",
    "OfferedBy": "27042000537",
    "validTo": "2019-09-30T10:30:00.000",
    "redirectUrl": "https://www.altinn.no",
    "portalViewMode": "Hide",
    "requestResources": [
        {
            "ServiceCode": "4629",
            "ServiceEditionCode": 2,
            "Metadata": {
                "inntektsaar": "2016"
            }
        },
        {
            "ServiceCode": "4630",
            "ServiceEditionCode": 2,
            "Metadata": {
                "fraOgMed": "2017-06",
                "tilOgMed": "2017-08"
            }
        }
    ],
    "requestMessage": {
        "no-nb": "Ved å samtykke, gir du Skatteetaten rett til å utlevere...",
        "no-nn": "Ved å samtykka, gir du Skatteetaten rett til å utlevera...",
        "en": "By accepting the consent, you grant the Tax Authority the..."
    },
    "_links": {
        "self": {
            "href": "https://altinn.no/api/consentRequest/c44f284f-b43b-4355-925a-2add17439659"
        },
        "gui": {
            "href": "https://altinn.no/ui/AccessConsent/request?id=c44f284f-b43b-4355-925a-2add17439659"
        }
    }
}
```


### Sende brukeren til samtykkesiden med AuthorizationCode som input

Etter at en samtykkeforespørsel er registrert og man har fått tilbake en list med `_links` som inneholder `gui`-link. 

{{% notice warning  %}}
Merk at det må oppgis <code>Accept: application/hal+json</code> som en header i requesten for at HAL-lenker som <code>_links</code> skal komme med i svaret. 
{{% /notice %}}

Videre benytter man denne for å sende brukeren til samtykkesiden:
```
https://altinn.no/ui/AccessConsent/request?id=c44f284f-b43b-4355-925a-2add17439659
```

Det eksisterer også en valgfri parameter (`languageCode`) som kan benyttes for å laste samtykkesiden på et forhåndsbestemt språk (en, nb-NO, nn-NO):
```
https://altinn.no/ui/AccessConsent/request?id=c44f284f-b43b-4355-925a-2add17439659?languageCode=en
```
Dersom man ikke spesifiserer `languageCode` vil samtykkesiden bli lastet på det språket som brukeren har valgt i altinn.
I eksempelet over vil samtykkesiden lastes på engelsk.

I seksjonen lengre nede ser man eksempel på hvordan samtykkesiden vil se ut for en sluttbruker.


### Lenkebaserte samtykker (legacy)
{{% notice warning  %}}
Denne måten å sende sluttbrukeren til samtykkesiden er en eldre versjon av samtykkeløsningen i Altinn, og anbefales ikke for nye integrasjoner. Se seksjonen over om forhåndsregistrerte samtykkeforespørsler. {{% /notice %}}

Datakonsument må sende sluttbruker til samtykkesiden med en parameter som sier at den ønsker en autorisasjonskode tilbake etter at samtykke er gitt.
Autorisasjonskoden benyttes til å hente token, som er nøkkelen som datakonsumenten benytter for å få tilgang til data hos datakilden.

Når låntaker for eksempel underveis i en søknadsprosess har angitt at han ønsker å gi samtykke til at opplysninger om han kan innhentes
så må datakonsumenten sende brukeren til samtykkesiden i Altinn.

Nedenfor er et eksempel på URL til samtykkeside i produksjonsmiljøet i Altinn.  
*Dette er bare et eksempel som viser oppbyggingen. URL må tilpasses tjenesten som skal benyttes.*

Skal samtykkesiden vises på f.eks. engelsk må parametre som `DelegationContext` og eventuelle
metadata være på engelsk og verdi for engelsk må legges i `LanguageCode`.

### URL

```markdown
https://www.altinn.no/ui/AccessConsent/?Resources=4629_2.4630_2&CoveredBy=910514458&RedirectUrl=https://www.altinn.no&ValidToDate=2019-09-30%2010:30:00&LanguageCode=nb-NO&DelegationContext=Ved%20%C3%A5%20samtykke,%20gir%20du%20Skatteetaten%20rett%20til%20%C3%A5%20utlevere%20opplysninger%20om%20deg%20direkte%20til%20Banken%20AS.%20Banken%20f%C3%A5r%20opplysningene%20for%20%C3%A5%20behandle%20s%C3%B8knaden%20din%20om%20finansiering.&ResponseType=code&4629_2_inntektsaar=2016&4630_2_fraOgMed=2017-06&4630_2_tilOgMed=2017-08 
```

Forklaring til parameterne i url: 

 Parameter         | Format                                                  | Obligatorisk/valgfri | Beskrivelse                                                                                                                                                            
 ----------------- | ------------------------------------------------------- | -------------------- | -------------------------------------------
 Resources         | xxxx_x                                                  | Obligatorisk         | Tjenestekode og tjenesteutgavekode        på tjenesten som datakilde har definert som samtykketjeneste. Kan også være flere tjenester dersom det skal samtykkes til å dele data fra flere datasett hos en eller flere datakilder. Tjenestekode og tjenesteutgavekode separeres med underscore og ved bruk av flere tjenester separeres disse med punktum (eks. Resources=4629_2.4630_1) Kodene må man få hos datakilde
 CoveredBy         | organisasjonsnummer                                     | Obligatorisk         | Organisasjonsnummeret til datakonsument.<br>På samtykkesiden er det navnet som er knyttet til organisasjonsnummeret som presenteres.
 OfferedBy         | organisasjonsnummer eller fødselsnummer                 | Valgfri              | Inneholder fødselsnummer eller organisasjonsnummer til aktøren som det ønskes samtykke fra.
 RedirectUrl       | gyldig url                                              | Obligatorisk         | Url som sluttbruker blir sendt tilbake til etter å ha samtykket/ikke samtykket til innsyn i data
 ValidToDate       | YYYY-MM-DD hh:mm:ss                                     | Obligatorisk         | Dato og tidspunkt for når samtykket opphører
 LanguageCode      | en<br>nb-NO<br>nn-NO                                    | Valgfri              | Angir hvilket språk sluttbruker skal få opp samtykkesiden på. Kan velge mellom engelsk (en), bokmål (nb-NO) og nynorsk (nn-NO). Sendes ikke språkkode med kommer samtykkesiden opp på språket som er satt av bruker i profilen i Altinn                                                                               
 DelegationContext | tekst                                                   | Obligatorisk         | Beskrivelse fra datakonsument på hva som er formålet med samtykket. *Det kan hende at det finnes føringer fra datakilde på utformingen av denne teksten. Sjekk med datakilde.*
 ResponseType      | code                                                    | Obligatorisk         | Vil alltid være «code». Angir at man skal ha en autorisasjonskode i retur som skal benyttes for å hente token
 Metadata          | tjenestekode_tjenesteutgavekode<br>_parameternavn=verdi | Valgfri              | For å gi ekstra metadata kan det defineres en eller flere samtykkeparameter som generelt er valgfri men kan påtvinges av utformingen av samtykketeksten som er definert av datakilde (eks. 4629_2_inntektsaar=2016)
 UserToken         | Hex-enkodet SHA-256, eks: CF1F71474AF6B8F6241C1AE...    | Valgfri              | Kan oppgis som en SHA-256 hash av en brukers fødselsnummer (11 siffer uten mellomrom). Hvis oppgitt, blir denne sammenlignet med evt. allerede innlogget bruker i Altinn. Hvis bruker er innlogget med et annet fødselsnummer, blir brukeren bedt om å logge inn på nytt.


## Eksempel på en samtykkeside
I figuren nedenfor kan man se sammenhengen mellom det som ligger i url/json og det som presenteres for sluttbrukeren på samtykkesiden. Denne siden vil kunne lastes både gjennom en GUID dersom det foreligger en forhåndsregistrert samtykkeforespørsel, og via URL-parameter som definert i seksjonen over.

![Sammenheng mellom opplysninger i url/json og samtykkesiden](sammenheng-url-sbl.png "Sammenheng mellom opplysninger i url/json og samtykkesiden")

## Autorisasjonskode

Når sluttbruker har fått opp samtykkesiden og gitt samtykke vil han sendes tilbake til siden som er angitt i `RedirectUrl`.  
I denne url vil det sendes med **autorisasjonskode** og **status**. Ved bruk av forhåndsregistrerte samtykkeforespørsler er dette samme autorisasjonskode som ble
returnert ved opprettelse av forespørselen.

Eksempel på url hvor status er OK:

```
https://www.eksempel.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK
```

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for "Nei, jeg vil ikke gi samtykke":

```
https://www.eksempel.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent&FailedAuthorizationCode=435d832-193b-4a13-a6d1-d172c18e18c7
```

Dersom samtykkesiden ble lastet ved hjelp av `AuthorizationCode`, vil **autorisasjonskode** være den samme som sluttbrukeren lastet samtykkesiden med.

Merk at `FailedAuthorizationCode` ikke blir sendt med ved bruk av lenke-baserte samtykkeforespørsler, kun forhåndsregistrerte forespørsler. Fra 20.12 vil det i tillegg bli sendt med en feilkode her, som indikerer hva som gikk galt hos brukeren.
