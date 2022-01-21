---
title: Hente delegeringer
description: "Hvordan hente roller og rettigheter som er delegert til en person for en organisasjon."
toc: false
aliases:
weight: 7
---

REST kallet vi skal bruke for å hente alle rollene og rettighetene en person har for en organisasjon er 
[GET {who}/authorization/Delegations/{receiverId}](https://altinn.no/api/Help/Api/GET-who-authorization-Delegations-receiverId_language).

`{who}` er aktøren som det gis tilgang til. 
Man kan bruke det forhåndsdefinerte argumentet `my` for å referere til samme aktør som har autentisert seg for dette REST kallet.
Det vil i vårt tilfelle bety at `my` vil gi samme resultat som om man skrev organisasjonsnummeret til eier av virksomhetssertifkatet.

`recevierId` er personen som enten har fått tildelt rettigheter. I dette eksempelet bruker `Reportee ID` som vi hentet i en [tidligere leksjon](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/konvertere-reporteeid/).

`?language` parameteret bestemmer hvilket språk beskrivelser skal være på.
Det 3 språkene vi støtter er bokmål `1044`, nynorsk `2068` og engelsk `1033`.

REST kallet ser derfor slik ut:
```http
GET api/my/authorization/Delegations/r50828869?language=1044 HTTP/1.1
Host: https://tt02.altinn.no
Bearer: <Altinn token>
ApiKey: <API-nøkkel>
Accept: application/hal+json
```

Når vi implementerer dette i C#/.Net blir det slik:
```cs
public async Task<RightHolder> GetDelegations(string altinnToken,
                                              string reporteeId)
{
    try
    {
        var response = await "https://tt02.altinn.no"
            .AppendPathSegment(
                $"api/my/authorization/Delegations/{reporteeId}")
            .SetQueryParam("language", 1044)
            .WithOAuthBearerToken(altinnToken)
            .WithHeader("ApiKey", _apiKey)
            .WithHeader("Accept", "application/hal+json")
            .GetStringAsync();

        var deserializeOptions = new JsonSerializerOptions();
        deserializeOptions.Converters.Add(new EmbeddedListConverter());

        RightHolder rightHolder = JsonSerializer.Deserialize<RightHolder>(
            response, deserializeOptions);

        return rightHolder;
    }
    catch (FlurlHttpException ex)
    {
        var status = ex.Call.Response.StatusCode;
        var message = await ex.GetResponseStringAsync();
        ...
```
Legg merke til at vi inkluderer `EmbeddedListConverter()` som vi laget for forrige leksjon.