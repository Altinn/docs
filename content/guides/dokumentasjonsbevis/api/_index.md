---
title: API
description: API for Nadobe
weigth: 10
---

{{% notice info %}}
Dette er levende dokumentasjon (under arbeid) for NADOBE - Nasjonal Tjeneste for Dokumentasjonsbevis
{{% /notice %}}

All funksjonalitet vil eksponeres via et REST-basert API. Mønsteret vil være at man først oppgir autorisasjonsdata, som inneholder en liste med beviskoder samt hvem dette gjelder for. Hvis kallet verifiseres, opprettes en akkreditering som kan benyttes for å gjøre påfølgende oppslag eller sjekke status på samtykkeforespørsler. En slik akkreditering har altså en-til-en relasjon med en "subject", som da vil være leverandør-organisasjonen.

Klientsertifikat-validering (kun autentisering), tildeling av API-keys, throttling, versjonering og andre policies implementeres i [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/).

## OpenAPI
API-et er beskrevet i en OpenAPI 3.0-spesifikasjon (OAS3):

 * [OpenAPI spec (JSON)](/docs/swagger/openapi-spec.json)
 * [Visualisering via swagger.io](https://generator.swagger.io/?url=https://altinn.github.io/docs/swagger/openapi-spec.json) [(åpne for redigering)](https://editor.swagger.io/?url=https://altinn.github.io/docs/swagger/openapi-spec.json)

## Actions
| Verb / URL | Beskrivelse | Skisse |
| ---------- | ----------- | ------ |
| **GET /accreditations**                            | Returnerer alle Accreditations knyttet til autentisert organisasjon         | [Flytskisse](https://www.lucidchart.com/publicSegments/view/34a9c7de-c5d8-40a2-961c-3b7a11c621de/image.png) / [Åpne](https://www.lucidchart.com/documents/view/794e9ce7-bd42-4a0f-ad60-bf89da0725ce) |
| **POST /authorization**                            | Tar en Authorization-modell og oppretter og returnerer en ny Accreditation  | [Flytskisse](https://www.lucidchart.com/publicSegments/view/702aaf01-91d6-4d02-bd30-0b1b2f5ef2d5/image.png) / [Åpne](https://www.lucidchart.com/documents/view/acc6ac71-025e-4ce4-91d5-2a2fd139bad7) |
| **GET /evidence/{accreditationId}**                | Returnerer alle beviskoder tilknyttet avgiver assosiert med akkrediteringen | [Flytskisse](https://www.lucidchart.com/publicSegments/view/da0685e6-a26b-4b28-be0c-302e306119da/image.png) / [Åpne](https://www.lucidchart.com/documents/view/4c549f6e-d007-4ed3-b885-6bb93cd49b09) |
| **GET /evidence/{accreditationId}/{evidenceCode}** | Returnerer bevispakken assosiert med oppgitt akkreditering og kode          | [Flytskisse](https://www.lucidchart.com/publicSegments/view/fe69ff0a-a5fc-44b3-9c01-b311d995a117/image.png) / [Åpne](https://www.lucidchart.com/documents/view/22d64d62-a1c3-4d4e-8feb-ad823db133f3) |
| **GET /metadata/statuscodes**                      | Metadatatjeneste. Returnerer alle statuskoder for bevis med beskrivelse     | |
| **GET /metadata/errorcodes**                       | Metadatatjeneste. Returnerer alle feilkoder med beskrivelse                 | |
| **GET /metadata/evidence**                         | Metadatatjeneste. Returnerer alle logiske beviskoder i løsningen            | [Flytskisse](https://www.lucidchart.com/publicSegments/view/8f201b7c-1f2c-40ab-b694-01fb9314d9be/image.png) / [Åpne](https://www.lucidchart.com/documents/view/1ed694d8-38bf-4dde-a647-99efb7913c75) |

## Models
Se [Swagger-visualiseringen](https://generator.swagger.io/?url=https://altinn.github.io/docs/swagger/openapi-spec.json)

## Feilkoder
Dette er en (ikke-uttømmende) liste over feilmeldinger som skal kunne returneres ved ulike scenarioer:

* Ugyldig sertifkat (mangler X-Client-Cert)
* Ugyldig virksomhet (ikke offentlig virksomhet)
* Akkrediteringen eksisterer ikke
* Akkrediteringen er utløpt
* Ugyldig subject
* Slettet subject
* Ukjent beviskode
* Ugyldig legalBasis
* Feil i legalBasis referanse
* Krever samtykke
* Samtykke utløpt
* Samtykke slettet (bruker har aktivt fjernet samtykke)
* Avgiver ikke tilgjengelig (ie Skatt er nede)
* Gyldig/manglende TED eller Doffin referanse?

Se `/metadata/errorcodes`-tjenesten beskrevet over for til enhver tid fullstendig liste over feilkoder.