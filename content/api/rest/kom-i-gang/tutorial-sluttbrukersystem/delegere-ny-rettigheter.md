---
title: Nye delegeringer
description: "Hvordan delegere nye rettigheter til en person."
toc: false
aliases:
weight: 8
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autorisasjon, API, REST, integrasjon, Maskinporten, delegering]
tags: [REST, Autorisasjon]
---

I denne leksjonen vil vi vise hvordan man delegerer nye rettigheter til en person over REST.
Leksjonen bygger på [modeller](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hal-json-modeller/) og [konverterere](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hal-json-konverterer/) vil definerte i tidligere leksjoner.
Koden vi viser i denne leksjonen kan ses i sin helhet i [AuthorizationHandler.cs](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Handlers/AuthorizationHandler.cs) i det tilhørende C#/.Net prosjektet.
 
### POST authorization/Delegations

For å delegere nye roller og rettigheter til en aktør over REST skal man bruke [POST api/{who}/authorization/Delegations](https://altinn.no/api/Help/Api/POST-who-authorization-Delegations).

[RightHolder](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hal-json-modeller/#rightholder) modellen som skal brukes som body i kallet skal inneholde følgende:
- Rettighetsmottakers identitet i form av fødselsnummer og etternavn. `SocialSecurityNumber` og `LastName`
- Hvilke roller og rettigheter som skal gis. `_embedded.roles[]` og `_embedded.rights[]`

Under ser vi hvordan en delegering av Lese- og Skrive-tilgang til en tjeneste til vår testperson ser ut.
Merk at hver operasjon eller `Action` som det skal gis tilgang til tilsvarer et nytt innslag i `rights[]` listen.

For å finne ut hvilke operasjoner som gjelder for en gitt tjeneste kan man se på `RoleRequirement` for tjenesten.
Det er tilgjengelig over REST via metadata-endepunktet:
[GET api/metadata/rolerequirements](https://tt02.altinn.no/api/metadata/rolerequirements?serviceCode=3225&serviceEditionCode=536)
med `ServiceCode` og `ServiceEditionCode` som parametre.

For de aller fleste tjenester i Altinn er det disse kombinasjonene av operasjoner som gjelder:
- Read, Write, ArchiveRead, ArchiveDelete
- Read, Write, ArchiveRead, ArchiveDelete, Sign
- Access

```http
POST api/my/authorization/Delegations HTTP/1.1
Host: https://tt02.altinn.no
Bearer: <Altinn token>
ApiKey: <API-nøkkel>
Content-Type: application/hal+json
{
    "LastName": "HEIS",
    "SocialSecurityNumber": "26899299344",
    "_embedded":{
        "rights":[
            {
                "ServiceCode": "3225",
                "ServiceEditionCode": 536,
                "Action": "Read"
            },
            {
                "ServiceCode": "3225",
                "ServiceEditionCode": 536,
                "Action": "Write"
            }
        ]
    }
}
```

#### Definere rettigheten i RightHolder
Her kommer vi i koden til å referere til [NewDelegations](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hal-json-modeller/#newdelegations) i `RightHolder`.
I det tilhørende C#/.Net prosjektet har vi hard-kodet `Read` og `Write` som operasjoner, men en forbedret versjon burde tatt inn operasjonene som argument til `PostDelegations()`.

```cs
public async Task<string> PostDelegations(string altinnToken,
                                          string ssn,
                                          string lastName,
                                          Service service)
{
    NewDelegations rightsToDelegate = new NewDelegations
    {
        Rights = new List<Right>()
    };

    rightsToDelegate.Rights.Add(new Right
    {
        ServiceCode = service.ServiceCode,
        ServiceEditionCode = service.ServiceEditionCode,
        Action = "Read"
    });
    rightsToDelegate.Rights.Add(new Right
    {
        ServiceCode = service.ServiceCode,
        ServiceEditionCode = service.ServiceEditionCode,
        Action = "Write"
    });

    RightHolder delegations = new RightHolder {
        SocialSecurityNumber = ssn,
        LastName = lastName,
        NewDelegations = rightsToDelegate
    };
```

`RightHolder` brukes så som body i delegeringskallet.
```cs
try
{
    var response = await "https://tt02.altinn.no"
        .AppendPathSegment("api/my/authorization/Delegations/")
        .WithOAuthBearerToken(altinnToken)
        .WithHeader("ApiKey", _apiKey)
        .WithHeader("Content-Type", "application/hal+json")
        .PostStringAsync(
            rightHolderString
        )
        .ReceiveString();

    return response;
}
catch (FlurlHttpException ex)
{
    var status = ex.Call.Response.StatusCode;
    var message = await ex.GetResponseStringAsync();
```

Forventet respons for dette kallet er `201 Created`.