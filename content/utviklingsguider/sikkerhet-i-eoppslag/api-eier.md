---
title: For API-eier
description: Om hvordan du som API-eier kan registrere ditt API som en delegerbar ressurs i Altinn
weight: 10
---

{{% notice warning  %}}
Sikkerhet i eOppslag er i pilotdrift. Alt på disse sidene er gjenstand for endring. 
{{% /notice %}}

## Introduksjon

For å kunne ta i bruk kreves per i dag følgende:

- Din virksomhet er [tjenesteeier i ID-porten](https://difi.github.io/idporten-integrasjonsguide/1_tilgang_til_idporten), er blitt provisjonert tilgang til [Maskinporten](https://samarbeid.difi.no/felleslosninger/maskinporten)
- Din virksomhet er [tjenesteeier i Altinn](https://www.altinndigital.no/kom-i-gang/guide-kom-i-gang-med-altinn/)
- Din virksomhet er gitt tilgang til [Altinns Maskinporten-API](https://www.altinn.no/maskinporten-api/ui/swagger/)

Merk at tilgang til Maskinporten-API per i dag kun deles ut til pilotkunder. 

## Delegerbare API-ressurser

"Delegerbare API-ressurser" er betegnelsen på det som er å regne som en slags lenketjeneste i Altinn. Disse kan i likhet med de fleste andre Altinn-tjenester delegeres fritt mellom alle virksomheter i portal eller API på vanlig måte. Merk at en delegering i seg selv gir ikke tilgang til API-et det representerer - [dette må gjøres i Maskinporten](https://samarbeid.difi.no/felleslosninger/maskinporten/dokumentasjon). Delegeringer i Altinn eksisterer altså uavhengig av tilganger gitt Maskinporten.

Delegering av tilganger til Maskinporten-API kan kun gjøres mellom virksomheter, og ikke mellom privatpersoner og/eller virksomhetsbrukere. 

## Opprettelse av API i Maskinporten

Les mer om denne prosessen i [dokumentasjonen for Maskinporten](https://samarbeid.difi.no/felleslosninger/maskinporten/dokumentasjon).

## Registrering av delegerbar ressurs i Altinn

For å registrere scopes som delegerbare API-ressurser ("delegation schemes") i Altinn kreves en Maskinporten-autentitisering med scopet `altinn:maskinporten/delegationSchemes.write`. Som regel vil en også ha `altinn:maskinporten/delegationSchemes.read` for å kunne administrere sine delegation-schemes.

#### Sikkerhetsnivå for delegering av Delegation Schemes fra Maskinporten
Normalt kreves kun pålogging på sikkerhetsnivå 2 for å delegere rettigheter i Altinn. Hvis API-eier mener dette ikke er tilstrekkelig kan man ved opprettelse av ett delegation scheme oppgi minimum sikkerhetsnivå bruker må være innlogget med for å kunne delegere tilgang til delegation schemet. Dersom en bruker forsøker å delegere tilgang til delegation scheme i portalen med for lavt innloggingsnivå, vil bruker bli bedt om å logge på med høyere nivå. Etter innlogging vil bruker bli sendt tilbake til portal for å fortsette og gjennomføre delegering av schemet.

API-et er dokumentert på https://www.altinn.no/maskinporten-api/swagger/ui/index. Under er et eksempel på et delegationScheme:

```
POST /maskinporten-api/delegationSchemes HTTP/1.1
Host: www.altinn.no
Authorization: Bearer eyJraWQiOiJIdFl....
Content-Type: application/json

{
    "owner_org": "974760673",
    "scopes": [        
        "altinn:sometestscope.read",
        "altinn:sometestscope.write",
        "altinn:someothertestscope"
    ],
    "title": [
        {
            "code": "nb_NO",
            "value": "Full tilgang til et test-API"
        },
        {
            "code": "nn_NO",
            "value": "Full tilgang til eit test-API"
        },
        {
            "code": "en",
            "value": "Full access to a test-API"
        }
    ],
    "description": [
        {
            "code": "nb_NO",
            "value": "Denne tjenesten gir full tilgang til et test-API"
        },
        {
            "code": "nn_NO",
            "value": "Denne tenesta gir full tilgang til eit test-API"
        },
        {
            "code": "en",
            "value": "This service grants full access to a test API"
        }        
    ],
    "default_language": "nb_NO", 
    "delegation_source_config": {
        "required_security_level": 3
    }
}
```

Dette kallet vil returnere en GUID, som da kan brukes for å slå opp og endre på delegeringsoppsettet senere.

Delegeringsoppsettet er nå tilgjengelig for delegering mellom vilkårlige virksomheter i Altinn, se [kapitlet for tilgangsstyrer](../tilgangsstyrer). 

## Scopes vs API-ressurs

Maskinporten opererer med OAuth2-scopes, og tilganger i Maskinporten gis til konsumenter på enkeltscopes fra eierne av disse scopene.

En API-ressurs er en samling av én eller flere scopes, og delegeringer skjer altså på disse samlet. Et scope kan befinne seg i flere distinkte API-ressurser. Et typisk eksempel her er om det finnes to scopes, `mittapi.read` og `mittapi.write`, som representerer hhv. lese- og skrivetilgang til et API. Dette vil kunne registereres i to ulike API-ressurser som kan kalles "Lesetilgang til Mitt API" og "Full tilgang til Mitt API", hvor det første inneholder bare det ene scopet mens det andre inneholder begge.

På denne måten utgjør API-ressurs et abstraksjonslag over de mer tekniske scopene, og API-eiere har du mulighet til å samle relaterte scopes sammen i forskjellige API-ressurser etter eget ønske.

Husk at konsumentens faktiske tilganger til scopet i Maskinporten alltid ligger til grunn for utstedelse av tokens.
