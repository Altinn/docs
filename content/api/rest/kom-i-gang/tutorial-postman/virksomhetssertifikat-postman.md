---
title: Hvordan legge til et virksomhetssertifikat i Postman
linktitle: Virksomhetssertifikat
description: "Denne leksjonen vil vise hvordan man legger til et virksomhetssertifikat i Postman slik at det kan brukes som autentisering mot Altinn API endepunkter."
toc: false
aliases:
weight: 16
categories: [Kom-i-gang veiledninger]
keywords: [Postman, API, REST, virksomhetssertifkat]
tags: [REST, Postman]
---

## Bruke Windows Certificates Manager til å eksportere sertifikatet
For at Altinn skal akseptere et virksomhetssertifikat er det flere ting som må stemme.
Ved å installere sertifikatet i Windows og eksportere det i riktig format fra Windows Certificate Manager (certlm) så garanterer man at formatet er riktig.
Denne leksjonen antar at sertifikatet er installert med privat nøkkel i Windows.

1. Velg sertifikatet i listen over sertifikat. Fra nedtrekksmenyen velg *All Tasks* > *Export...*.
![Export Certificate](/docs/images/guides/postman/Certificate-export.png "Eksporter virksomhetssertifikat")
2. Velg *Yes, export the private key* 
![Export Certificate with the private key](/docs/images/guides/postman/Certificate-yes-private-key.png "Eksporter virksomhetssertifikatet med privatnøkkelen.")
3. Velg *Personal Information Exchange - PKCS #12 (.PFX)* som Export File Format.
![Export Certificate as PFX](/docs/images/guides/postman/Certificate-PFX-format.png "Exporter virksomhetssertifikatet som PFX.")
4. Velg *Password* som Security. Dette er passordet som skal legges inn i Postman senere.
![Password as security meassure](/docs/images/guides/postman/Certificate-password.png "Velg passord som sikkerhetsmekanisme.")
5. Fullfør *Certificate Export Wizard*.

## Importer sertifikatet i Postman

1. *Settings > Certificates > Add Certificate*
![Add Certificate in Postman](/docs/images/guides/postman/Postman-add-certificate.png "Legg til virksomhetssertifikat i Postman.")
2. Fyll ut følgende felter:
![Fill inn certificate information](/docs/images/guides/postman/Postman-add-certificate-fill.png "Fyll ut informasjon om sertifikatfilen.")
   1. *Host*: `tt02.altinn.no`
   2. *PFX file*: velg den eksporterte sertifikatfilen.
   3. *Passphrase*: skriv inn passordet som du valgt i steg 4.

Nå vil sertifikatet være tilgjengelig for REST forespørsler i Postman mot TT02 hvis man bruker Query-parametereret `?ForceEIAuthentication`.