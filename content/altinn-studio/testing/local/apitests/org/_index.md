---
title: API test org
linktitle: org api
description: Når man kjører applikasjonene lokalt sammen med den lokale testplattformen kan man teste API som applikasjon eksponerer
weight: 100
---


Appen har en rekke API som kan benyttes av applikasjonseier. Beskrivelsen du finner her er laget for [Postman](https://www.getpostman.com/).

## Autentisering av tjenesteier org
I testmiljø og produksjon brukes maskinporten for å autentisere organisasjoner som eier apper. 

Testplattformen for lokal testing tilbyr et enkelt api for å autentisere organisjonen som er ansvarlig.

Man trenger bare å oppgi tjenesteeier kode (som f.eks brg, skd osv)






## Multipart instansiering
Applikasjonene støtter at man instansierer instanser til aktører. Personer eller organsiasjoner.


```
--abcdefg
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name="instance"

{
    "instanceOwner": {
    	"partyId": "500000"
    }
}

--abcdefg
Content-Type: application/xml
Content-Disposition: form-data; name="RF0002"

<?xml version="1.0"?>
<Skjema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" skjemanummer="212" spesifikasjonsnummer="10420" blankettnummer="RF-0002" tittel="Alminnelig omsetningsoppgave" gruppeid="20">
	<GenerellInformasjon-grp-2581 gruppeid="2581">
		<Avgiftspliktig-grp-50 gruppeid="50">
			<RapporteringsenhetNavn-datadef-21771 orid="21771">DDG Fitness</RapporteringsenhetNavn-datadef-21771>
			<RapporteringsenhetAdresse-datadef-21773 orid="21773">Sofies Gate 1</RapporteringsenhetAdresse-datadef-21773>
			<RapporteringsenhetPostnummer-datadef-21774 orid="21774">0170</RapporteringsenhetPostnummer-datadef-21774>
            <RapporteringsenhetPoststed-datadef-21775 orid="21775">By</RapporteringsenhetPoststed-datadef-21775>
            <RapporteringsenhetOrganisasjonsnummer-datadef-21772 orid="21772">897069650</RapporteringsenhetOrganisasjonsnummer-datadef-21772>
        </Avgiftspliktig-grp-50>
    </GenerellInformasjon-grp-2581>
</Skjema>

--abcdefg--


