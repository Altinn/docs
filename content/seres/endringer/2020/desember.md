---
title: Desember
description: Retting av feil i Domeneklienten.
weight: 19
type: releasenote
releasenote_info: Produksjonssatt 8. desember 2020
---


### Retting av feil i løsningen for å sende generert XSD på e-post

Rettet feil som gjorde at det ikke lenger var mulig å sende generert XSD på e-post ved bruk av XSD-generatoren til Domeneklienten. Feilen ble kun funnet når man kjørte Domeneklienten via SERES Desktop (VMware).


###  Retting av feil i løsningen som sammenligner lagringstidspunkt for lokal lagring og lagring til repository

Rettet feil som gjorde at man fikk et varsel om at lagret versjon i repository var nyere en lokalt lagret versjon, selv om versjonene var lagret samtidig og av samme person. Feilen ble kun funnet når man kjørte Domeneklienten via SERES Desktop (VMware).


### Domeneklient er blitt signert med et kodesigneringssertifikat

Domeneklienten er nå digitalt signert med et kodesigneringssertifikat slik at man kan være sikker på at programvaren kommer fra Digitaliseringsdirektoratet og at den ikke er blitt endret av noen andre.