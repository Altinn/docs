---
title: Be om samtykke
description: Hvordan sende sluttbruker til samtykkesiden i Altinn
weight: 20
aliases:
 - /guides/samtykke/datakonsument/be-om-samtykke/
---


## Sende sluttbruker til samtykkesiden
Datakonsument må sende sluttbruker til samtykkesiden med en parameter
som sier at den ønsker en autorisasjonskode tilbake etter at samtykke er
gitt. Autorisasjonskoden benyttes til å hente token, som er nøkkelen som datakonsumenten benytter for å få tilgang til data hos datakilden. Når låntaker for eksempel underveis i en søknadsprosess har angitt
at han ønsker å gi samtykke til at opplysninger om han kan innhentes så
må datakonsumenten sende brukeren til samtykkesiden i Altinn.

Nedenfor er et eksempel på URL til samtykkeside i produksjonsmiljøet i
Altinn. *Dette er bare et eksempel som viser oppbyggingen. URL må
tilpasses tjenesten som skal benyttes.* Skal samtykkesiden vises på
f.eks. engelsk må parametre som `DelegationContext` og eventuelle
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


I figuren nedenfor kan man se sammenhengen mellom det som ligger i url og det som presenteres for sluttbrukeren på samtykkesiden.  

{{<figure src="sammenheng-url-sbl.png" title="Sammenheng mellom opplysninger i url og samtykkesiden" >}}

## Autorisasjonskode

Når sluttbruker har fått opp samtykkesiden og gitt samtykke vil han sendes tilbake til siden som er angitt i `RedirectUrl`.  
I denne url vil det sendes med **autorisasjonskode** og **status**.

Eksempel på url hvor status er OK:

```
https://www.eksempel.no/?AuthorizationCode=0435d832-193b-4a13-a6d1-d172c18e18c7&Status=OK
```

Eksempel på url hvor sluttbruker har valgt å trykke på knappen for "Nei, jeg vil ikke gi samtykke":

```
https://www.eksempel.no/?Status=Failed&ErrorMessage=User%2520did%2520not%2520give%2520consent
```
