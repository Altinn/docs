---
title: Core
description: NADOBE Core
weight: 10
---

"Kjernen" av tjenesten eksponerer et offentlig REST API som er offentlig tilgjengeling (men fremdeles er gjenstand til autorisasjon). De ulike delene av APIet vil bli implementert av Azure Functions.

De ulike beviskodene implementeres også ved hjelp av separate function apps som ligger i uavhengige repositories og som i teorien vil kunne utvikles av tredjeparter. Aksessering av selve datakildene er definert i en kontrakt med Core, som lar en hente metadata om og høste bevis. ES-ene skal ikke håndtere autorisasjon, dette er ansvaret til Core.

Et [NuGet-bibliotek](https://www.nuget.org/packages/Altinn.Nadobe.Common/) er offentlig tilgjengelig og inneholder i tillegg til alle datamodellene som brukes i NADOBE også en del støttefunksjonaltitet for å aksessere avgiver-registre tilgjengelig over HTTP.

NADOBE Core vil bestå av følgende Azure komponenter:

<div style="width: 100%; height: 800px; margin: 10px 0; position: relative;"><iframe allowfullscreen frameborder="0" style="width:100%; height:800px" src="https://www.lucidchart.com/documents/embeddedchart/b2f665fe-1bae-4631-b099-d9be0db8cc80" id="ipBglfLMcFS5"></iframe></div>

## Azure API Management
* Autentisering av klient sertifikat
* Namespaces for ulike versjoner og miljøer av APIet
* Ulik autentiseringskrav for ulike deler av API-et (f.eks. krever ikke metadata verken API-key eller EC)
* Router requests til Core

## Function: Authorization
* Håndterer kall til /authorization
* Utfører validering av input, bl.a. sjekk av legal basis
* Oppretter og returnerer akkrediteringer

## Function: Accreditation
* Håndterer kall til /accreditations
* Lister ut aktive akkrediteringen for et gitt EC

## Function: EvidenceHarvester
* Håndterer kall til /evidence/{accreditationId}/{evidenceCode}
* Sjekker tilgangstatus for oppgitt beviskode
* Gjør oppslag i tilhørende function(s) for oppgitt beviskode

## Function: EvidenceStatus
* Håndterer kall til /evidence/{accreditationId}
* Henter oppgitt akkreditering, og sjekker status på alle beviskoder

## Function: MetadataEvidence
* Håndterer kall til /metadata/evidence
* Utfører ikke autorisasjon
* Metadata-tjeneste til hjelp for konsumenter tjenesten
* Løper gjennom alle konfigurerte ES-er og returnerer en samlet liste med beviskoder

## Function: MetadataErrorCodes
* Håndterer kall til /metadata/errorcodes
* Utfører ikke autorisasjon
* Metadata-tjeneste til hjelp for konsumenter tjenesten
* Returnerer alle mulige feilkoder i løsningen

## Function: MetadataStatusCodes
* Håndterer kall til /metadata/statuscodes
* Utfører ikke autorisasjon
* Metadata-tjeneste til hjelp for konsumenter tjenesten
* Returnerer alle mulige statuskoder for bevisforespørsler i løsningen

## CosmosDB
* Persistens av akkrediteringer og annen tilstand i en NoSQL-database