---
title: Informasjon om token
description: Bruk og verifisering av self contained OAuth-token som mottas fra datakonsument
toc: true
weight: 330
aliases:
 - /guides/samtykke/datakilde/bruk-av-token/
---

## Bruk av self-contained OAuth-token 

Self-contained OAuth 2.0 token er nøkkelen som datakonsumententen
benytter for å få tilgang til data som ligger hos datakilden. Altinn
utsteder et signert [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) (JWT). Tokenet inneholder all
informasjon knyttet til de delegerte rettighetene inkludert

* tjenestekoder for lenketjenesten i Altinn
* fødsels- eller organisasjonsnummer som samtykket
* tildelte rettigheter til datakonsumenten
* person- eller organisasjonsnummer for datakonsumenten som har mottatt rettighetene
* organisasjonsnummer for tredjepart som kan behandle samtykket på vegne av mottaker (dersom dette foreligger)
* tidspunkt for når samtykke ble gitt
* tidspunkt for når rettigheten opphører

Det signerte tokenet må verifiseres av
datakilde ved å validere signaturen. 

Man kan også lese om JSON webtokens her: <https://jwt.io/introduction/>.

For å verifisere signert token må datakilden benytte Altinn sitt
offentlige sertifikat. Nedenfor finnes sertifikatpakker for test- og produksjonsmiljø : 

- [Testmiljø (TT02)](public_sert_root_sertAltinn_TT02.zip) 
- [Produksjonsmiljø (gyldig fra 16. april 2018)](PROD_PUBLIC-Buypass%20ID-REGISTERENHETEN%20I%20BRØNNØYSUND-serienummer15517594916826301650255239-2018-04-12.zip)




## JSON Web Token

Består av tre punktumseparerte deler:

 - [Header](#header)
 - [Payload](#payload)
 - [Signature](#signature)

Under viser et eksempel på et signert og Base64-encodet self-contained JSON Web Token.

### Header
Header inneholder informasjon om token typen og hvilken hash algoritme som er brukt. Her finner man også identifikatorene "kid" og "x5t" som er Base64Url enkoding av fingeravtrykket (thumbprint) til sertifikatet bruk for signering av tokenet.
Disse identifikatorene kan da brukes for få identifisere korrekt sertifikat for validering av signatur.    
For mer informasjon om uthenting av Altinn sine offentlige sertifikat og validering av token se seksjonene [JSON Web Keys og well-known endepunkter](#json-web-keys-og-well-known-endepunkter) og [Verifisere JWT token signatur](#verifisere-jwt-token-signatur)

#### Encoded eksempel:
```text
eyJhbGciOiJSUzI1NiIsImtpZCI6IkF4NDlDZ3l3U0I1VkJ2dEg0bmdaYnJjU3VfTSIsIng1dCI6IkF4NDlDZ3l3U0I1VkJ2dEg0bmdaYnJjU3VfTSIsInR5cCI6IkpXVCJ9
```

#### Decoded eksempel:
```JSON
{
  "alg": "RS256",
  "kid": "Ax49CgywSB5VBvtH4ngZbrcSu_M",
  "x5t": "Ax49CgywSB5VBvtH4ngZbrcSu_M",
  "typ": "JWT"
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

#### HandledBy
HandledBy inneholder Organisasjonsnummer for tredjepart som gjennom rettighetsstyring i tjenesteeierstyrt rettighetsregister (SRR) er autorisert til å behandle samtykker på vegne av CoveredBy.    
Denne vil bare være en del av payload dersom det er tredjepart selv som har hentet signert JWT for å bruke dette for å autorisere seg for datakilden utenfor Altinn.

Eksempel:  
OrgNo: `"HandledBy": "910459880"`

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

![Eksempel på decoding og verifisering av signature med jwt.io verktøyet](verifisere-token.png "Eksempel på decoding og verifisering av signature med jwt.io verktøyet")




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

## JSON Web Keys og well-known endepunkter

### JSON Web Keys (JWK)
Det åpne metadata grensesnittet i REST APIet til Altinn er det gjort tilgjengelig ett [endepunkt for uthenting av JSON Web Keys (JWK)](https://altinn.no/api/Help/Api/GET-metadata-jwk). Endepunktet lister ut både hoved- og sekundær-sertifikatet som er konfigurert opp for signering av samtykketokens i Altinn. I tillegg til å liste ut public key-chain for sertifikatene viser man her til “kid” og “x5t” identifikatorene som man vil finne igjen som header verdier i ett utstedt signert JWT samtykketoken. Slik kan da både samtykketoken signert med hoved- og sekundær-sertifikatet verifiseres i en overgangsperiode ved utbytting av sertifikat hos Altinn.

### Well-known metadata
På det åpne metadata grensesnittet i REST APIet til Altinn er det tilgjengelig ett [endepunkt for metadata](https://altinn.no/api/Help/Api/GET-metadata-jwk) som viser til hvor man finner JWK endepunkt. Denne informasjonen også gjennom ett så kallet “well-known” endepunkt under domenet til Altinn: https://altinn.no/.well-known/oauth-authorization-server