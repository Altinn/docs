---
title: Validering av mottaker
description: Valideringstjenesten lar tjenesteeier kontrollere status på bruker i Altinn før en melding eller varsel sendes ut
---


I Altinn er det mulig å opprette melding og varsel knyttet til et organisasjon- eller personnummer. Men det er ikke alle virksomheter eller personer det er hensiktmessig å opprette en melding eller varsel til. I mange tilfeller vil det være best å sjekke dette FØR man sender melding/varsel. 

Valideringstjenesten gir tjenesteeier en mulighet ti å kontrollere følgende forhold før en melding opprettes eller et varsel sendes: 
- Er organisasjonsnummer gyldig? 
- Finnes organisasjonsnummer i Enhetsregisteret?
- Er organisasjonenen slettet? 

- Er fødselsnummer gyldig?
- Lever personen fødselsnummer refererer til?
- Har personen brukerprofil i Atlinn?
- Har personen reservert seg mot elektronisk post? 

## Detaljer om tjenesten

Teknisk dokumentasjon finnes [her](https://www.altinn.no/api/serviceowner/Help/Api/GET-serviceowner-notifications-validaterecipient_organizationNumber_socialSecurityNumber_lastName_serviceCode_serviceEditionCode)


### Request
```HTTP
GET https://www.altinn.no/api/serviceowner/notifications/validaterecipient?organizationNumber={organizationNumber}&socialSecurityNumber={socialSecurityNumber}&lastName={lastName}&serviceCode={serviceCode}&serviceEditionCode={serviceEditionCode} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```
Krav til spørring: 

- OrganizationNumber skal være et norsk organisasjonsnummer. Må oppgis alene.
- SocialSecurityNumber er et norsk f- eller d-nummer. Må oppgis sammen med lastName.
- ServiceCode og serviceEdition er valgfrie, men skal alltid oppgis sammen

### Respons 
Svar på en gyldig spørring vil være: 

    - "inboxAccessible": true/false,
    - "canReceiveNotificationBySms": true/false 
    - "canReceiveNotificationByEmail": true/false

<br>

#### Valideringer som ligger bak verdiene som settes
<br>

**inboxAccessible** settes til true hvis:

*For Orgnaisasjonsnummer:*
- organisasjonsnummeret er gyldig og eksisterer i Enhetsregistert
- organisasjonsnummeret er ikke merket som slettet

*For Fødselsnummer:*
- fødsels- eller d-nummeret er gyldig
- første fire tegn av oppgitt "lastName" matcher personens etternavn
- personen det refererer til lever
- personen har brukerprofil i Altinn
- personen har ikke reservert seg mot elektronisk post i KRR

I alle andre tilfeller settes inboxAccessible til false  
<br>
#### canReceiveNotificationBySms settes til true hvis:

*For organisasjonsnummer:*
- inboxAccessible også er true
- Organisasjonen har minst en av følgende to ting:
    - Registrert minst ett mobilnr for SMS i KoFuVi
    - Minst en rettighetshaver som har registrert kontaktinformasjon i form av et mobilnr for virksomheten. Denne betingelsen hensyntas kun hvis: 
        - Det er oppgitt tjenestekode/utgave i spørringen
        - Rettighetshaveren enten ikke har definert begrensning på varsling tjeneste, eller den aktuelle tjenesten er på listen av tjenester
        - Rettighetshaveren har "les" på oppgitt tjenestekoder/utgave

*For fødselsnummer:*
- inboxAccessible også er true
- Brukeren har registrert et mobilnr for SMS i KRR

I alle andre tilfeller settes canReceiveNotificationBySms til false

<br>

#### canReceiveNotificationByEmailsettes til true hvis: 
*For organisasjonsnummer:*
- inboxAccessible også er true
- Organisasjonen har minst en av en følgende to ting:
    - Registrert minst en e-postadresse i KoFuVi
    - Minst en rettighetshaver som har registrert kontaktinformasjon i form av en e-post for virksomhete. Denne betingelsen hensyntas kun hensyntas hvis:
        - Det er oppgitt tjenestekode/utgave i spørringen
        - Rettighetshaveren enten ikke har definert begrensning på varsling tjeneste, eller den aktuelle tjenesten er på listen av tjenester
        - Rettighetshaveren har "les" på oppgitt tjenestekoder/utgave

*For fødselsnummer*
- inboxAccessible også er true
- Brukeren har registrert et en e-postadresse i KRR

I alle andre tilfeller settes canReceiveNotificationByEmail til false