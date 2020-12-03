---
title: Teknisk
description: Spørsmål og svar som gjelder det tekniske rundt implementasjon
weight: 300
toc: true
---

***
## _Hvilke IP-adresser og porter brukes?_

**Svar:**  
Produksjon IP: 89.250.123.0  
TT02 IP: 89.250.123.40
 
Port 80 for http  
Port 443 for https

***

## _Hvor finner jeg skjemaspesifikasjonene?_

**Svar:**  
SOAP Webservice:  
For tjenester som finnes i test/produksjon kan man benytte en egen webservice for å hente ut metadata. Webservicen heter ServiceMetadataExternal
https://altinn.github.io/docs/guides/integrasjon/sluttbrukere/webservice/

REST:  
https://altinn.no/api/metadata

***

## _Er ParentReference påkrevd?_

**Svar:** Nei, strengt tatt ikke. ParentReference er optional, men som «best practice» anbefaler vi at man setter denne.

I et hovedskjema vil denne attributten være:  
ParentReference=””.


***

## _Hvordan kan jeg knytte underskjemaer til hovedskjemaer i ett oppgavesett?_

**Svar:** Her bruker du parentReference og EndUserSystemReference.
 
- Hovedskjemaet har ingen parent, altså er parentReference = ""
- Hovedskjemaet skal ha EndUserSystemReference
- Underskjemaet har parentReference = EndUserSystemReference til hovedskjemaet
- Underskjemaet har EndUserSystemReference != EndUserSystemReference til hovedskjemaet
 
Altså: EndUserSystemReference må være unik!
***