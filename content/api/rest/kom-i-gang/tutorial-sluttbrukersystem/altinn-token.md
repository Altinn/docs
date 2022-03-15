---
title: Altinn token
description: "Hvordan hente et Altinn autentiseringstoken basert på et Maskinporten token."
toc: false
aliases:
weight: 3
categories: [Kom-i-gang veiledninger]
keywords: [virksomhetsbruker, autentisering, API, REST, integrasjon, Maskinporten, scope]
tags: [REST, Autentisering, Maskinporten]
---

REST kallet for å bytte et Maskinporten token mot et Altinn (beriket) token ser slik ut:

```http
GET authentication/api/v1/exchange/maskinporten HTTP/1.1
Host: https://platform.tt02.altinn.no
Bearer: eyJraWQiOiJjWmswME1rbTVIQzR ... aMrDO_g
X-Altinn-EnterpriseUser-Authentication: <enkodet brukernavn:passord>
Accept: application/json
```
Her må man oppgi brukernavnet og passordet til [virksomhetsbrukeren man opprettet](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/forarbeid/#opprette-og-autorisere-virksomhetsbruker).
Merk at strengen har formatet `brukernavn:passord` og skal være Base64 enkodet.
I det tilhørende .Net Core prosjektet er dette implementert slik:
```cs
public async Task<string> GetAltinnExchangeToken(string maskinportenToken)
{
    try
    {
        var basicAuthEncodedBytes = 
            System.Text.Encoding.UTF8.GetBytes($"{_username}:{_password}");
        string basicAuthEncodedString = 
            System.Convert.ToBase64String(basicAuthEncodedBytes);

        string response = await "https://platform.tt02.altinn.no"
            .AppendPathSegment("authentication/api/v1/exchange/maskinporten")
            .WithOAuthBearerToken(maskinportenToken)
            .WithHeader("X-Altinn-EnterpriseUser-Authentication",
                        basicAuthEncodedString)
            .WithHeader("Accept", "application/json")
            .GetStringAsync();
        
        return response;
    }
    catch (FlurlHttpException ex)
    {
        var status = ex.Call.Response.StatusCode;
        var message = await ex.GetResponseStringAsync();
        ...
```

Responsen er en streng som skal brukes som `bearer token` på fremtidig REST kall mot Altinn.