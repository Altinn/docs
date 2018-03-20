---
title: 18.3
description: Oppgradert database samt bedre ytelse, stabilitet og robusthet
weight: 100
type: releasenote
releasenote_info: Release 18.3 ble satt i drift i produksjon lørdag 10. mars kl. 09:15.
---

Innholdet i versjon 18.3 er planlagt ut i fra å øke ytelse, stabilitet og robusthet.
Det er **ikke** lagt til ny funksjonalitet i denne releasen.


## Database
Databasen er oppgradert til [SQL Server 2016](https://www.microsoft.com/en-us/sql-server/sql-server-2016).
Flere "in-memory" ytelsesforbedringer er i den forbindelse innført.

I tillegg er følgende forbedringer innført:

- Timeout for nedlasting av veldig stor fil med klientdelegeringer er fikset (16364)
- Forbedrete ytelse i lagret prosedyre for henting av shipment status (16312)
- Fiks av potensielle deadlocks for åpningsdag (16223)
- Optimalisering av sentral lagret prosedyre (15518)
- Bedre skalering for skjemasett elementliste (17943)
- Potensiell flaskehals fjernet for sletting av roller og rettigheter (17946)
- Tuning av lagret prosedyre for å skalere bedre i produksjon (18409) - (forbedring lagt ut i produksjon 20. mars)
- Legge til en indeks til en tabell for å bedre oppslagstiden (18407) - (forbedring lagt ut i produksjon 20. mars)
- Forbedret kjøreplan på prosedyrer med sqlserver 2016 (18478) - (forbedring lagt ut i produksjon 20. mars)
- Forbedring av skalering av lagret prosedyre (18411) - (forbedring lagt ut i produksjon 20. mars)
- Redusere CPU forbruk på lagret prosedyre (18412) - (forbedring lagt ut i produksjon 20. mars)

## Infoportal
- Tiltak og forbedringer av ytelse i infoportal (17560)
- Skjemakatalog på mobil - får ikke navigere ned til siste nivå (18154) 

## Selvangivelsen
- Overføring av prosentsats for RF-1098 fungerer kun for første skjema (17234)
- Historikk for selvangivelsen har lenker til meldinger med gammelt design (16573)

## Portal
    
- Bedre feilhåndtering i MVC-portal (17720)
- Skjema import medfører blokkering i databasen (17679)
- Nytt design på vente- og nedetidsplakater (14945)
- Flaskehals åpningsdag - autorisasjonslogg (17143)
- Portal skalering åpningsdag (17224)
- Link to service missing in correspondence message (17489)
- Revarsel vises i aktivitetsloggen før det er sendt (14926)
- Som bruker av REST-APIet ønsker jeg at den underliggende SearchBE kan få satt DateFrom / DateTo med query parametre (17217)
- Inbox element is not retrieved when the dateTo value is exact time of createdDate (17635)
- Treg avgiverliste for brukere med virksomhetssertifikat (17451)
- Flaskehals i context handler fjernet (17940) (forbedring lagt ut i produksjon 20. mars)
      
## Integrasjon
    
- Fiks av regresjon for noen grensesnitt innført i 17.3 (14928)
