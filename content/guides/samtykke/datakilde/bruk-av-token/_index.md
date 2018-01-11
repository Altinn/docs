---
title: Informasjon om token
description: Bruk og verifisering av self contained OAuth-token som mottas fra datakonsument
weight: 330
---

## Bruk av self-contained OAuth-token 

Self-contained OAuth 2.0 token er nøkkelen som datakonsumententen
benytter for å få tilgang til data som ligger hos datakilden. Altinn
utsteder et signert [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWT). Tokenet inneholder all
informasjon knyttet til de delegerte rettighetene inkludert

* tjenestekoder for lenketjenesten i Altinn
* fødsels- eller organisasjonsnummer som samtykket
* tildelte rettigheter til datakonsumenten
* person- eller organisasjonsnummer for datakonsumenten som fikk rettighetene
* tidspunkt for når samtykke ble gitt
* tidspunkt for når rettigheten opphører

Det signerte tokenet må verifiseres av
datakilde ved å validere signaturen. 

Man kan også lese om JSON webtokens her: <https://jwt.io/introduction/>.

For å verifisere signert token må datakilden benytte Altinn sitt
offentlige sertifikat:

### Sertifikat for testmiljø:
```text
-----BEGIN CERTIFICATE-----
MIIFNzCCBB+gAwIBAgILAUcaZj5pySjzVQgwDQYJKoZIhvcNAQELBQAwUTELMAkG
A1UEBhMCTk8xHTAbBgNVBAoMFEJ1eXBhc3MgQVMtOTgzMTYzMzI3MSMwIQYDVQQD
DBpCdXlwYXNzIENsYXNzIDMgVGVzdDQgQ0EgMzAeFw0xNzA1MzExMjA5NDRaFw0y
MDA1MzEyMTU5MDBaMIGcMQswCQYDVQQGEwJOTzEoMCYGA1UECgwfUkVHSVNURVJF
TkhFVEVOIEkgQlLDmE5Ow5hZU1VORDElMCMGA1UECwwcQnLDuG5uw7h5c3VuZHJl
Z2lzdHJlbmUtdGVzdDEoMCYGA1UEAwwfUkVHSVNURVJFTkhFVEVOIEkgQlLDmE5O
w5hZU1VORDESMBAGA1UEBRMJOTc0NzYwNjczMIIBIjANBgkqhkiG9w0BAQEFAAOC
AQ8AMIIBCgKCAQEA6WN6C6bTY6Uxoi5cTmnUoOy+c1tsDPBsOHrEDTXCLugfQ5Nv
QK9AJ7er/B3iX5mf35iaaobDyJRCaqnEGElebBswsYuCbuCIsQ5aghiUdG9aZ8yM
SWi5BYtA0aDhqQvjfu5NSc5foii1XRpDn1nIDkoyi0HTl51dM2IwLnVUK6g8tESv
tdH170hnbH2QtXU3NwLV9gW3yvV9YJQK+2yEUbVUcFR3mN33h96/qcvyJ0t70rZ0
KJur5fpOohk2+MOS+IYPm0biZ3hFXNjfFQGs8pEWerY7NOUo1ShnhNSqSp84o4G4
2b/dBb80fEh8tsfIgriPM9bifw5g6QzjiYdsvQIDAQABo4IBwjCCAb4wCQYDVR0T
BAIwADAfBgNVHSMEGDAWgBQ/rvV4C5KjcCA1X1r69ySgUgHwQTAdBgNVHQ4EFgQU
fwXgV5qwnLSDVe5bIZdoZuaLBpMwDgYDVR0PAQH/BAQDAgSwMBYGA1UdIAQPMA0w
CwYJYIRCARoBAAMCMIG7BgNVHR8EgbMwgbAwN6A1oDOGMWh0dHA6Ly9jcmwudGVz
dDQuYnV5cGFzcy5uby9jcmwvQlBDbGFzczNUNENBMy5jcmwwdaBzoHGGb2xkYXA6
Ly9sZGFwLnRlc3Q0LmJ1eXBhc3Mubm8vZGM9QnV5cGFzcyxkYz1OTyxDTj1CdXlw
YXNzJTIwQ2xhc3MlMjAzJTIwVGVzdDQlMjBDQSUyMDM/Y2VydGlmaWNhdGVSZXZv
Y2F0aW9uTGlzdDCBigYIKwYBBQUHAQEEfjB8MDsGCCsGAQUFBzABhi9odHRwOi8v
b2NzcC50ZXN0NC5idXlwYXNzLm5vL29jc3AvQlBDbGFzczNUNENBMzA9BggrBgEF
BQcwAoYxaHR0cDovL2NydC50ZXN0NC5idXlwYXNzLm5vL2NydC9CUENsYXNzM1Q0
Q0EzLmNlcjANBgkqhkiG9w0BAQsFAAOCAQEAiqSiL3nCFcAUwTL8XLZRe8xIx25U
dbMovsgO1L29M1u70KrgiLXBoHMJsHUnLYFsD2yzfS6eud+FibTXM08TQ/8jORSn
1+lDkHDD/PZ0MDgj8tNuHqDdHUaz76INWQgxVa+GTDlyISRyw4EV9yO55iOv6jMy
cq8jdSTB6frmnJObCP2/83LIQ65Q1KUcgo90I2VJcUykZCepbl5Baf1g9IltziqB
veLSi+r/hDvyFOH531VHg2AcLtGgEG1byXLO3B2VJH2C4u5zJHAa6AiZX/sJp2hz
Kf/CCfXRY4nYzvcbZDkY5ElkBU9ypnYUvxXZ/d6kxtU/EQXR+yDLXO/INQ==
-----END CERTIFICATE-----
```
### Sertifikat for produksjonsmiljø:
```text
-----BEGIN CERTIFICATE-----
MIIEzzCCA7egAwIBAgILEpeC/JTrBpciUdcwDQYJKoZIhvcNAQEFBQAwSzELMAkG
A1UEBhMCTk8xHTAbBgNVBAoMFEJ1eXBhc3MgQVMtOTgzMTYzMzI3MR0wGwYDVQQD
DBRCdXlwYXNzIENsYXNzIDMgQ0EgMTAeFw0xMzAxMTYxNDA0NDFaFw0xNjAxMTYx
NDA0MzdaMIGZMQswCQYDVQQGEwJOTzEoMCYGA1UECgwfUkVHSVNURVJFTkhFVEVO
IEkgQlLDmE5Ow5hZU1VORDEiMCAGA1UECwwZQWx0aW5uIHNlbnRyYWxmb3J2YWx0
bmluZzEoMCYGA1UEAwwfUkVHSVNURVJFTkhFVEVOIEkgQlLDmE5Ow5hZU1VORDES
MBAGA1UEBRMJOTc0NzYwNjczMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAlyi/W/a4qEVEyeJ7ztfMbWqn/Rp7wwjruwdKkm7t0Jvs3VvQHhUrtRwu8C7a
USCa9v6y+8hGXkRvQ3i4jDDFzBxvRA2DRAlnMPDst3DqrfInWq9IHenittmvWjhI
mHiAJHbps/bFtLDSpG7cYjA/hH7WaXiyfrSnLlBmolgL7w78NT+hMFshWIuN/Vkm
ZQscfgqNKdcnh5bMYQlO4BtIDjeX1lZPNRwIpJibh8xRXTk8gpNTWvZR5Mo6GJTh
VOCRQva8Pc6N82pwNc8vHZgVqXyPoXXeozCHIK95i5x1HuX0DClxnYZI+3lT5mUs
T3FujVRCBVMWm1ig5rJv7S84PwIDAQABo4IBYzCCAV8wCQYDVR0TBAIwADAfBgNV
HSMEGDAWgBQ4FObI8KmkA/ROPiKjW/LW4K1AdDAdBgNVHQ4EFgQUEpco9+abUKyY
ME6IaovJ2XNEGWYwDgYDVR0PAQH/BAQDAgSwMBUGA1UdIAQOMAwwCgYIYIRCARoB
AwIwgaUGA1UdHwSBnTCBmjAvoC2gK4YpaHR0cDovL2NybC5idXlwYXNzLm5vL2Ny
bC9CUENsYXNzM0NBMS5jcmwwZ6BloGOGYWxkYXA6Ly9sZGFwLmJ1eXBhc3Mubm8v
ZGM9QnV5cGFzcyxkYz1OTyxDTj1CdXlwYXNzJTIwQ2xhc3MlMjAzJTIwQ0ElMjAx
P2NlcnRpZmljYXRlUmV2b2NhdGlvbkxpc3QwQwYIKwYBBQUHAQEENzA1MDMGCCsG
AQUFBzABhidodHRwOi8vb2NzcC5idXlwYXNzLm5vL29jc3AvQlBDbGFzczNDQTEw
DQYJKoZIhvcNAQEFBQADggEBAE+KXd1/qqvpVEfYuTev9qNj2HvKdsH3Lxn7yjW0
BTmXR3CsmIg3EJWcE9eze9TJ0gFZ5DSzMxvlUkCVAEuuiozSYzou7ve9rMSqBOnu
PaGBzZnTdWCfuXiAHxxQMLhLpoyaQ/oIXDhv250aS0Uc87Wnh5IazKtHeTSltSX/
Zo0Bw780SqAj5ErBHaPEDUhY2FeIYiLd8iTPPkWA5iqQM7+NDvKH0lse5kKWDxgz
eZe7HuLmgaPap33OFYdnzhI96ua/96o3z6x4fMN3qDIOMrdERIjBptd0Yl+N581P
z3J/q70Lsc1G5ZMX2K9UoQCDIbXtA+6IsS5x9eD+oZKbG8Q=
-----END CERTIFICATE-----
```


## JSON Web Token

Består av tre punktumseparerte deler:

 - [Header](#header)
 - [Payload](#payload)
 - [Signature](#signature)

Under viser et eksempel på et signert og Base64-encodet self-contained JSON Web Token.

### Header
Header inneholder informasjon om token typen og hvilken hash algoritme som er brukt.

#### Encoded eksempel:
```text
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkthUGxpMFJUdVVUcl9yUXJWSmhzQkNXQS0yayJ9
```

#### Decoded eksempel:
```JSON
{
  "typ": "JWT",
  "alg": "RS256",   
  "x5t":"mXGy2XES9W3b9beWTKff5XcQf1Q"
}

```

### Payload
Payload inneholder påstandene (claims) i tokenet. Påstandene er den informasjonen som datakilden trenger
for å få bekreftet at datakonsumenten har fått et gyldig samtykke.

#### Encoded eksempel:
```text
eyJTZXJ2aWNlcyI6WyI0NjI5LDIiLCI0NjI5LDIsaW5udGVrdHNhYXI9MjAxNSIsIjQ2MzAsMiIsIjQ2MzAsMixmcmFPZ01lZD1ub3ZlbWJl
ciAyMDE2LHRpbE9nTWVkPWphbnVhciAyMDE3Il0sIkF1dGhvcml6YXRpb25Db2RlIjoiMDkzZDAwNzAtMjJhZC00YzQ5LTlkNzEtZjUzNjdj
Zjk5MWI4IiwiT2ZmZXJlZEJ5IjoiMzAwNTAxMDEyMTEiLCJDb3ZlcmVkQnkiOiI5MTA1MTQ0NTgiLCJEZWxlZ2F0ZWREYXRlIjoiMjAxNy0w
NC0xOCAwOTozMzoxMyIsIlZhbGlkVG9EYXRlIjoiMjAxNy0wNi0zMCAxMDozMDowMCIsImlzcyI6ImFsdGlubi5ubyIsImV4cCI6MTQ5MjUw
MDk0MiwibmJmIjoxNDkyNTAwOTEyfQ
```

#### Decoded eksempel: 
```JSON
{
  "Services": [
    "4629_2",
    "4629_2_inntektsaar=2016",
    "4630_2",
    "4630_2_fraOgMed=2017-06",
    "4630_2_tilOgMed=2017-08"
  ],
  "AuthorizationCode": "c7dbe642-0fc1-4c3b-8959-8a92e3e1f17d",
  "OfferedBy": "11025802170",
  "CoveredBy": "910514458",
  "DelegatedDate": 1503855661,
  "ValidToDate": 1506760200,
  "iss": "altinn.no",
  "exp": 1503860347,
  "nbf": 1503860317
}
```

### Signature
Signature inneholder signert og encoded header og encoded payload.
Algoritmen som er benyttet er beskrevet i header.

#### Encoded eksempel:
```text
pumdz9xtOYk_mojdKU1X_uQlT3DKr4IUxoOSJPiLZ3SB2oy-R4Q40jn8gxdnxBLrGD3W1osra_v3x15Nrx9jsWUIz9eQA3H04cxeehTQBbM
MT7XZGU-XnCE34AtQScaDQnyPObPZEQeSvl2nmxNdfjgrzFLsapthiKYNuhv3lzSheTs06Ko3jWHTUg19X_2QSbpOmBVORTai8XeYrm1Tzq
_5CSxZo4pQEkxmBpSrtXcC3MuaF7cM514Bt-
```

#### Decoded eksempel:  
For å verifisere signaturen må datakilden benytte Altinns offentlige sertifikat.
Se under for detaljer om hvordan signaturen verifiseres.


### Innhold i Payload
 
#### ServiceCodes
Inneholder en string eller et array of strings som representerer tjenestekodene for tjenesten(e) som er omfattet av samtykket brukeren har gitt.
ServiceCodes strengen er inneholder to verdier; ServiceCode og ServiceEditionCode separert med underscore.

Ved bruk av metadata for `{inntektsaar}`, `{fraOgMed}` og `{tilOgMed}` i samtykketekst:

Single Service:
```JSON
"ServiceCodes": "4629_2"
```

Multiple Services:
```JSON
"ServiceCodes": [
    "4629_2",
    "4630_2"
  ]

"Services": [
    "4629_2",
    "4629_2,inntektsaar=2016",
    "4630_2",
    "4630_2_fraOgMed=2017_06",
    "4630_2_tilOgMed=2017_08"
  ],

```

#### OfferedBy
OfferedBy inneholder Personnummer eller Organisasjonsnummer for den som har gitt samtykke. 

Eksempel:  
SSN: `"OfferedBy": "11025802170"`

OrgNo: `"OfferedBy": "999999999"`


#### CoveredBy
CoveredBy inneholder Personnummer eller Organisasjonsnummer for den som har mottatt rettigheter igjennom brukeren samtykke.

Eksempel:  
SSN: `"CoveredBy": "02056260016"`

OrgNo: `"CoveredBy": "910514458"`

#### ValidToDate
Dato og tidspunkt for når samtykket utløper

Eksempel: `"ValidToDate": 1506760200`

#### DelegatedDate
Dato og tidspunkt for når samtykket ble gitt.

Eksempel: `"DelegatedDate": 1503855661`

#### AuthorizationCode / Autorisasjonskode
Autorisasjonskoden som er benyttet for å hente det gitte tokenet.
Kan brukes av datakilde til å logge bruk av tokene og dermed informere brukeren om at datakonsumenten har hentet data. 

#### Iss
`iis` spesifiserer hvem som har utstedt tokened, som skal verfiseres mot signaturen.

Eksempel: `"iss": "altinn.no"`

#### Exp
Unikt tidsstempel som spesifiserer utløpstidspunket for det gitte tokenet. 

Eksempel: `"exp": 1474526471`

#### Nbf
Unikt tidsstempel som spesifiserer første gang det gitte tokenet kan brukes

Eksempel: `"nbf": 1492500912`

## Verifisere JWT Token signatur
En enkel måte å teste og verifisere JWT token er [*jwt.io*](https://jwt.io/) webpage tool. For å bruke nettsiden:

1. Lim inn komplett encodet JWT inkludert header, payload og signature.
2. Velg algoritmen RS256 fra nedtrekksmenyen.
3. Lim inn BASE64 encoded offentlig X-509 sertifikatet til Altinn under “Verify Signature”.    

{{<figure src="verifisere-token.png" title="Eksempel på decoding og verifisering av signature med jwt.io verktøyet" >}}




### Eksempel på C\# decode og verifisering av signatur

Under vises et eksempel på en hjelpemetode som tar inn det offentlige
sertifikatet til Altinn og et encoded JWT token som en string. Metoden
benytter JwtSecurityTokenHandler Class (System.IdentityModel.Tokens) for
å gjøre den faktiske decodingen og verifikasjonen av signaturen, basert
på de spesifiserte TokenValidationParameters. Dersom valideringen er en
suksess inneholder SecurityToken informasjonselementer som SecurityKeys,
ValidFrom and ValidTo, og decodet JSON object som inneholder Header og
Payload.

MSDN links:

-   [*JwtSecurityTokenHandler*](https://msdn.microsoft.com/en-us/library/system.identitymodel.tokens.jwtsecuritytokenhandler)
-   [*SecurityToken*](https://msdn.microsoft.com/en-us/library/system.identitymodel.tokens.securitytoken(v=vs.110).aspx)

```csharp
private SecurityToken ValidateToken(X509Certificate2 publicCertificate, string tokenString)
{
    var tokenHandler = new JwtSecurityTokenHandler();

    // Token Validation Parameters
    var validationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = new X509SecurityKey(publicCertificate),
        ValidateAudience = false,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidIssuer = "altinn.no"
    };

    SecurityToken securityToken;
    tokenHandler.ValidateToken(tokenString, validationParameters, outsecurityToken);

    return securityToken;
}
```
