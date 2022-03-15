---
title: Maskinporten token
description: "Hvordan konstruere JWT assertion og requesten for å hente et Maskinporten token."
toc: false
aliases:
weight: 2
categories: [Kom-i-gang veiledninger]
keywords: [API, REST, integrasjon, Maskinporten, virksomhetssertifikat]
tags: [REST, Autorisasjon]
---

Denne leksjonen vil vise hvordan man lager en JWT (JSON Web Token) grant og bruker det til å hente et Maskinporten token.
For overordnet beskrivelse refererer vi til [Maskinportens guide for API-konsumenter](https://docs.digdir.no/maskinporten_guide_apikonsument#5-be-om-token).
Koden under er skrevet i C# og .Net Core 3.1 og kan ses i sin helhet på [Github](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Handlers/AuthenticationHandler.cs).

### JWT grant oppsett
JWT grantet består av to deler:
1. Header - som beskriver hvordan hvordan JSON Web Tokenet er signert. Dette forutsetter at koden har tilgang til virksomhetssertifkatet.
2. Body - som beskriver hvilke `claims` klienten har. De forskjellige `claims` som må spesifiseres mot Maskinporten er også beskrevet [her](https://altinn.github.io/docs/api/rest/kom-i-gang/virksomhet/#1-hent-token-fra-maskinporten-1).

I C#/.Net prosjektet er JWT grantet konstruert på følgende måte:
```cs
private string GetJwtAssertion(X509Certificate2 certificate)
{
    X509SecurityKey securityKey = new X509SecurityKey(certificate);
    List<string> certificateChain = new List<string>()
    {
        Convert.ToBase64String(certificate.GetRawCertData())
    };

    // The header of the JWT grant towards Maskinporten must have the
    // following claims:
    // "alg": "RS256"
    // "x5c": "<X.509 Certificate chain>"
    JwtHeader header = new JwtHeader(
        new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256))
    {
        { "x5c", certificateChain }
    };

    // Remove claims that are not needed for Enterprise Certificate grants.
    header.Remove("typ");
    header.Remove("kid");

    // 120 seconds is the maximum expiration time allowed by Maskinporten.
    // This value is chosen to make debugging more lenient.
    long issuedAt = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
    long expirationTime = issuedAt + 120;

    JwtPayload body = new JwtPayload
    {
        { "aud", "https://ver2.maskinporten.no/" },
        { "resource", "https://tt02.altinn.no" }, 
        { "scope", "altinn:enduser" },
        { "iss", _clientId },
        { "exp", expirationTime },
        { "iat", issuedAt },
        { "jti", Guid.NewGuid().ToString() },
    };

    JwtSecurityToken securityToken = new JwtSecurityToken(header, body);
    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

    return tokenHandler.WriteToken(securityToken);
}
```

#### X.509 Sertifikat
Hvordan man henter og bruker virksomhetsertifikatet i koden er utelatt fra denne veiledning, men et eksempel kan ses i [GetCertificateFromX509Store()](https://github.com/Altinn/altinn2-test-apiclient/blob/b86a4db823231578243db0da200a47610e456389/src/Handlers/AuthenticationHandler.cs#L84).

### Hente Maskinporten token
Selve HTTP requesten ser slik ut:
```http
POST /token HTTP/1.1
Host: https://ver2.maskinporten.no
Content-type: application/x-form-urlencoded
{
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": "<JWT>"
}
```
Her skal `<JWT>` erstattes av det enkodede JWT grantet vi lagde.
I det tilhørende .Net Core prosjektet har vi benyttet [Flurl](https://flurl.dev/) for å gjøre REST kallene.
```cs
public async Task<TokenResponse> PostMaskinportenToken()
{
    try
    {
        X509Certificate2 certificate = GetCertificateFromX509Store();
        string jwtAssertion = GetJwtAssertion(certificate);

        string response = await "https://ver2.maskinporten.no/"
            .AppendPathSegment("token")
            .PostUrlEncodedAsync(new 
            {
                grant_type = "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion = jwtAssertion
            })
            .ReceiveString();

        return JsonSerializer.Deserialize<TokenResponse>(response);
    }
    catch (FlurlHttpException ex)
    {
        var status = ex.Call.Response.StatusCode;
        var message = await ex.GetResponseStringAsync();
        ...
```

Responsen på et vellykket kall vil se slik ut:
```json
"{\"access_token\":\"eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJd
UZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJodHRwczpcL1wvdHQwMi5hbHRpbm4ubm8i
LCJzY29wZSI6ImFsdGlubjplbmR1c2VyIiwiaXNzIjoiaHR0cHM6XC9cL3ZlcjIubWFza2lucG9ydG
VuLm5vXC8iLCJjbGllbnRfYW1yIjoidmlya3NvbWhldHNzZXJ0aWZpa2F0IiwidG9rZW5fdHlwZSI6
IkJlYXJlciIsImV4cCI6MTY0Mjc1NTExNSwiaWF0IjoxNjQyNzU0OTk1LCJjbGllbnRfaWQiOiJkMz
k1MDQzZi0xOWRlLTQ4ZjctOWVhNy05ZTM4Yzk2YjU0NzIiLCJqdGkiOiJIZWZhM0ljeFp4aXZfazdq
NkhEY1VXSnhrTUIzVGlkQ0RWQlFyZ0dGWGdVIiwiY29uc3VtZXIiOnsiYXV0aG9yaXR5IjoiaXNvNj
UyMy1hY3RvcmlkLXVwaXMiLCJJRCI6IjAxOTI6OTkxODI1ODI3In19.fCH89kCuOmdOTpkhxB6l57U
Ll7B-iXvbgpJdZmE6NqrXs5Vu8J-zPC8evhVRwQ8H7J13wJQiUwmP-3IRCtuUFurLPU9Mk2_wIrkzC
u0gPigJ4nFbDZOiOSoagAHt9jSEF8fFQkPif0MgcE2mqYkYRS2QqjQqORLWRhDAxCltxFphhFFuzxH
D7ogGaKQnJejnlWcUq6ZnEz-GeyupRSAy-Z8qZeXohiAbiNsDFXcOulJI29ivUduuGnLE07zyNXLu6
cb8fGtyTU_C2lIrR3Q0mRYxAVk-Gb6Np_uQ5UZVUjPiJPBb6bwS9uWXjrlbDsPdKnsLcysBPuOfZMn
aMrDO_g\",\"token_type\" :\"Bearer\",\"expires_in\":119,\"scope\":\"altinn:end
user\"}"
```
Man kan inspisere `access_token` verdien ved å dekode ved hjelp av [jwt.io](jwt.io).
For å deserialisere strengen som ble returnert til et objekt kan man bruke biblioteket `System.Text.Json`.
Objektet eller modellen for responsen ser slik ut:

```cs
using System.Text.Json.Serialization;

// The TokenResponse from Maskinporten
public class TokenResponse
{
    // An Oauth2 access token, either by reference or as a JWT depending
    // on which scopes was requested and/or client registration properties.
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }

    // The list of scopes issued in the access token. Included for 
    // convenience only, and should not be trusted for access control
    // decisions.
    [JsonPropertyName("scope")]
    public string Scope { get; set; }

    // Type of token
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; }
}
```

Det er strengen fra `access_token` som er skal brukes som `bearer token` i neste leksjon for å [hente Altinn autentiseringstoken](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/altinn-token/).