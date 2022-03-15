---
title: Hente Reportee ID
description: "Hvordan konvertere et fødsels- eller organisasjonsnummer til en Altinn Reportee ID"
toc: false
aliases:
weight: 4
categories: [Kom-i-gang veiledninger]
keywords: [autorisasjon, API, REST, integrasjon, ReporteeID]
tags: [REST, Autorisasjon]
---
I denne leksjonen vil vi vise hvordan man henter en Reportee ID over REST hvis man har fødselsnummer og etternavnet til en person.
Dette er IDen til personen som senere skal gis rettigheter til.
Kodeeksemplene som brukes i denne leksjonen er hentet fra [ReporteeHandler.cs](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Handlers/ReporteeHandler.cs) og 
[Reportee.cs](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Models/Reportee.cs).

### POST reportees/ReporteeConversion
REST endepunket som skal brukes er [POST reportees/ReporteeConversion](https://altinn.no/api/Help/Api/POST-reportees-ReporteeConversion).
I tillegg til [Altinn token](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/altinn-token/) så krever dette endepunktet [API-nøkkel](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/forarbeid/#api-nøkkel-fra-altinn).

HTTP requesten ser slik ut.
```http
POST reportees/ReporteeConversion HTTP/1.1
Host: https://tt02.altinn.no
Bearer: <Altinn token>
ApiKey: <API-nøkkel>
Accept: application/json
Content-Type: application/json
{
    "SocialSecurityNumber": "26899299344",
    "LastName": "HEIS"
}
```
Det som returneres for denne testpersonen er:

```json
{
    "ReporteeId": "r50828869",
    "Name": "HEIS TOM",
    "Type": "Person",
    "SocialSecurityNumber": "26899299344"
}
``` 

Dette er de feltene i `Reportee` modellen som er relevante for en person.
Hvis man kaller `ReporteeConversion` med et organisasjonsnummer og navn så vil man få tilbake andre felter.
I begge tilfeller er det `ReporteeId` vi trenger for å kunne identifisere mottager av rettigheter i senere kall.

Den komplette Reportee modellen kan beskrives slik i C#/.Net:
```cs
using System.Text.Json.Serialization;

// The ReporteeConversion response from Altinn reportees endpoint.
public class Reportee
{
    // The reportee id
    [JsonPropertyName("ReporteeId")]
    public string ReporteeId { get; set; }

    // The full name of the person or organization.
    [JsonPropertyName("Name")]
    public string Name { get; set; }

    // Person or organization
    [JsonPropertyName("Type")]
    public string Type { get; set; }

    // Social Security Number
    [JsonPropertyName("SocialSecurityNumber")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string SocialSecurityNumber { get; set; }

    /// The Organization Number
    [JsonPropertyName("OrganizationNumber")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string OrganizationNumber { get; set; }

    // The Organization Number of the Parent organization, if any.
    [JsonPropertyName("ParentOrganizationNumber")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string ParentOrganizationNumber { get; set; }

    // The Organization Form
    [JsonPropertyName("OrganizationForm")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string OrganizationForm { get; set; }

    // The status of the organization
    [JsonPropertyName("Status")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string Status { get; set; }
}
```

Hvis vi skal implementere dette i C#/.Net ser det slik ut:

```cs
public async Task<string> GetReporteeId(string altinnToken,
                                        string ssn,
                                        string lastName)
{
    try
    {
        var response = await "https://tt02.altinn.no"
            .AppendPathSegment("api/reportees/ReporteeConversion")
            .WithOAuthBearerToken(altinnToken)
            .WithHeader("ApiKey", _apiKey)
            .WithHeader("Accept", "application/json")
            .PostJsonAsync(new {
                SocialSecurityNumber = ssn,
                LastName = lastName 
            })
            .ReceiveString();

        Reportee reportee = JsonSerializer.Deserialize<Reportee>(response);
        return reportee.ReporteeId;
    }
    catch (FlurlHttpException ex)
    {
        var status = ex.Call.Response.StatusCode;
        var message = await ex.GetResponseStringAsync();
```

Nå har vi hentet Reportee IDen til personen vi skal gi rettigheter til.
