---
title: Delegere rolle på vegne av innbygger
weight: 400
---

Denne siden beskriver bruk av Altinn's tjenesteeier API, hvor tjenesteeier kan opptre som autorisasjonskilde for spesifikke forhold hvor brukeren selv kanskje ikke har tilgang til Altinn for å utføre delegering av en rolle.

APIet krever en API nøkkel i Altinn med tilgang til ServiceOwner API ressursen samt at tjenesteier autentiserer seg gjennom maskinporten og der har tilgang til scopet: `altinn:serviceowner/delegations.write`

Det er for nå begrenset til delegering av rollen; `A0282 - Skatteforhold for privatpersoner`, men dette kan utvides etter hvert som nye behov skulle dukke opp.    
For å finne RoleDefinitionId for rollen man skal delegere må det gjøres oppslag til RoleDefinitions APIet: 
[GET serviceowner/roledefinitions](https://altinn.no/api/serviceowner/Help/Api/GET-serviceowner-roledefinitions_language)

## Delegere rolle

Delegering av en rolle på vegne av en person `{onBehalfOf}` til en annen person eller organisasjon i Altinn. 

```HTTP
POST https://www.altinn.no/api/serviceowner/delegations/roles/?onBehalfOf={SSN/Dnumber}
Content-Type: application/hal+json
ApiKey: myKey
Authorization: Bearer eyJhbGci...
```

Eksempel på body for delegering hvor mottaker er en annen bruker i Altinn:

```JSON
{
    "Type": "Email",
    "Email": "username@domain.com", // Optional if the SocialSecurityNumber has a registered email address in the common contact register, otherwise required. Used for notifying the recipient of the delegation.
    "SocialSecurityNumber": "SocialSecurityNumber",
    "LastName": "SSN_LastName", // Must match last name of SocialSecurityNumber in the National Registry
    "_embedded" : {
        "Roles" : [{
            "RoleDefinitionId": 12345 // RoleDefinitionId can be found using api/serviceowner/roledefinitions
        }]
    }
}
```

Eksempel på body for delegering hvor mottaker er en organisasjon i Altinn:

```JSON
{
    "Type": "Email",
    "Email": "post@domain.com", // Required. Used for notifying the recipient of the delegation.
    "OrganizationNumber": "OrganizationNumber",
    "Name": "OrgName", // Must match the organization name from the Register of Legal Entities
    "_embedded" : {
        "Roles" : [{
            "RoleDefinitionId": 12345 // RoleDefinitionId can be found using api/serviceowner/roledefinitions
        }]
    }
}
```

Eksempel på mulige responser

```201 Created```: Rollen ble delegert
```401 Authorization failed: There is no authenticated organization number set on this request```: Manglende token fra maskinporten på request
```401 IDX10223: Lifetime validation failed. The token is expired. ValidTo: {timestamp}, Current time: {timestamp}```: Token oppgitt er utløpt
```401 Claims Authorization failed: Missing required scope```: Gyldig token men tjenesteeier mangler tilgang til nødvendig scope i maskinporten
```403 {Feilmelding}```: Valideringsfeil for request modellen. Se ReasonPhrase på http responsen for feilmelding    

## Trekke rolle
Roller en tjenesteeier selv har delegert på vegne av en bruker, vil de også kunne trekke tilbake. For å finne rolle id for tjenesteeierens egne delegeringer kan man benytte Roles APIet:
[Hente liste over roller](../hent_rolle/), og filtrere resultatet på ```Delegator``` property i rolle modellen.

```HTTP
DELETE https://www.altinn.no/api/serviceowner/delegations/roles/{id}
ApiKey: myKey
Authorization: Bearer eyJhbGci...
```

## Tekniske detaljer
De utfyllende tekniske detaljene finnes under [API-dokumentasjonen på altinn.no](https://www.altinn.no/api/serviceowner/Help)

### API dokumentasjon

[POST serviceowner/delegations/roles/?onBehalfOf={SSN/Dnumber}](https://altinn.no/api/serviceowner/Help/Api/POST-serviceowner-delegations-roles_onBehalfOf)

[DELETE serviceowner/delegations/roles/{id}](https://altinn.no/api/serviceowner/Help/Api/DELETE-serviceowner-delegations-roles-roleId)