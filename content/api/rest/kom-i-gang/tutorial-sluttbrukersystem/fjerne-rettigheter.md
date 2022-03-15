---
title: Fjerne delegeringer
description: "Hvordan trekke rettigheter en person har fått."
toc: false
aliases:
weight: 9
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autorisasjon, API, REST, integrasjon, Maskinporten, delegering]
tags: [REST, Autorisasjon]
---

I denne leksjonen vi vi vise hvordan man kan trekke rettigheter som er gitt til en person over REST.
Koden vi viser i denne leksjonen kan ses i sin helhet i [AuthorizationHandler.cs](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Handlers/AuthorizationHandler.cs) i det tilhørende C#/.Net prosjektet.

### DELETE authorization/Delegations
Det er ikke alle tilganger i Altinn som kan styres over REST.
Man kan ha tilganger på grunn av en rolle man har for organisasjonen.
Her vil vi derfor anta at personen har fått tilgang til en tjeneste som en delegering, som man nå ønsker å trekke tilbake.

Endepunktet vi skal bruke er [DELETE {who}/authorization/Delegations/{receiverId}/rights/{authzRuleId}](https://altinn.no/api/Help/Api/DELETE-who-authorization-Delegations-receiverId-rights-authzRuleId).
Dette endepunktet refererer til en gitt delegering ved å peke på `authzRuleId` til delegeringen.
Det forutsetter derfor at man kan hente eksisterende delegeringer.
Vi gjør dette ved å bygge på [GET Delegations](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hente-delegations/) som vi beskrev i en tidligere leksjon.

Delete-kallene vi vil utføre vil se slik ut:
```http
DELETE api/my/authorization/Delegations/r50828869/rights/{authzRuleId} HTTP/1.1
Host: https://tt02.altinn.no
Bearer: <Altinn token>
ApiKey: <API-nøkkel>
```

Det vi vil oppnå er å lage en liste med `authzRuleIds` for hver operasjonen for denne tjenesten.
Disse vil så tilsvare hvert sitt DELETE-kall mot endepunktet.

I det tilhørende C#/.Net-prosjektet har vi gjort dette ved hjelp av `LINQ`.

```cs
var delegations = await authzHandler.GetDelegations(altinnToken, "r50828869");

// Find any existing rights for the test service using LINQ
List<int> rightsToRemove = 
    (from r in delegations.Rights.Embedded.Rights
    where r.ServiceCode == "3225" && r.ServiceEditionCode == 536 
    select r.RightID)
    .ToList<int>();

foreach (int id in rightsToRemove)
{
    await authzHandler.DeleteDelegatedRights(altinnToken, "r50828869", id);
}

```

Metoden som implementerer Delete-kallet ser slik ut:
```cs
public async Task DeleteDelegatedRights(string altinnToken,
                                        string reporteeId,
                                        int authorizationRuleId)
{
    try
    {
        await "https://tt02.altinn.no"
            .AppendPathSegment(
$"api/my/authorization/Delegations/{reporteeId}/rights/{authorizationRuleId}")
            .WithOAuthBearerToken(altinnToken)
            .WithHeader("ApiKey", _apiKey)
            .DeleteAsync();
    }
    catch (FlurlHttpException ex)
    {
        var status = ex.Call.Response.StatusCode;
        var message = await ex.GetResponseStringAsync();
```
