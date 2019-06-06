---
title: Komme i gang
description: Forutsetninger for å ta i bruk samtykketjenesten
weight: 10
aliases:
 - /guides/samtykke/datakonsument/komme-i-gang/
---


## Før man kan ta i bruk tjenesten må følgende være på plass:

1.  Aktuell datakilde må ha laget en samtykketjeneste som datakonsument
    kan benytte. Datakonsument trenger tjenestekode (serviceCode) og
    tjenesteutgavekode (serviceEditionCode) for gjeldende tjeneste
    
2.	Aktuell datakilde må ha registrert organisasjonsnummeret til datakonsument i tjenesteeierstyrt rettighetsregister for ovennevnte tjeneste(r). 
    I dette registeret må datakilden også registrere domene som sluttbruker skal returneres til etter å ha gitt sitt samtykke. Det er kun schema/domene/host (ikke path) som legges inn og wildcard (*) kan benyttes for å støtte flere sub-domener. 
    Om schema ikke spesifiseres tillates både HTTP og HTTPS. Egendefinerte schema kan brukes for å sende resultat tilbake til f.eks. mobile applikasjoner. Wildcards må benyttes på sikker måte:
   
    Riktig               | Feil           
    -------------------- | ----------- 
    *.domene.no          | domene.*    
    https://domene.no    | *domene.no  
    myapp://consent      |

    Det er mulig å legge inn flere domener per org.nr. ved å skille de med semikolon. Domene må legges til både for test- og produksjonsmiljø (disse kan om ønskelig være like).
    
3.  For å hente token trenger man ApiKey som er knyttet til
    datakonsument sitt organisasjonsnummer. Dette kan bestilles hos
    Altinn ved å sende en hevendelse til [servicedesk@altinn.no](mailto:servicedesk@altinn.no). Det vil være en ApiKey for test
    og en for å benytte i produksjonsmiljøet. ( **NB!** For Samtykkebasert lånesøknad er det Bits som administrerer dette på vegne av bankene. Se https://www.bits.no/project/sbl.)
    
4.  Man må ha fiktive testpersoner som kan benyttes i test. Dette må man
    få hos datakilden da dette må være testbrukere som også er lest
    inn i deres systemer
    
Hvis en har en policy på å stenge for utgående trafikk i brannmur  må en i så fall åpne opp for trafikk mot miljøene listet under.  

 Miljø | IP-adresse    | Navn           | Port 
------ | ------------- | -------------- | -----
 PROD  | 89.250.123.0  | www.altinn.no  | 443
 TT02  | 89.250.123.40 | tt02.altinn.no | 443 


DNS må sjekkes. Hvis en hardkoder IP adresser i DNS må en legge inn IP adressene listet over i DNS
(en vil typisk få Network error. Connection refused o.l hvis DNS ikke er oppdatert)