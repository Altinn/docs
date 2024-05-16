---
title: Rettigheter 
description: Benyttes for å hente ut opplysning om rettigheter.
weight: 800
---

## RegisterSRRAgencyExternal
{{% notice warning  %}}
Alle SOAPtjenester for Autorisasjon vil fases ut i forbindelse med overgang fra Altinn 2 til Altinn 3 plattform. 
Nye RESTAPI vil tilbys på Altinn 3 første halvdel av 2024. 
{{% /notice %}}
### GetRights

Denne operasjonen benyttes for å hente ut gjeldende rettigheter for en tjeneste fra det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**            | **Beskrivelse**                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| servicecode          | Angir tjenestekoden man skal hente regler for. Feltet er påkrevd                                             |
| serviceEditionCode   | Angir tjenesteutgavekoden man skal hente regler for. Feltet er påkrevd                                       |
| reportee             | Angir hvilken avgiver regler skal hentes for. Hvis ingen verdi angis vil regler for alle avgivere returneres |
| **Returverdi**       | **Beskrivelse**                                                                                              |
| GetRightResponseList | Liste av typen GetRightResponse som angir reglene som ligger i registeret basert på input parametere         |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property** | **Beskrivelse**                                                                                                                                                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|              | **GetRightResponse (utvidelse av RegisterSSRRight)**                                                                                                                                                                                                                                                                   |
| ValidTo      | Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)                                                                                                                                                                                                                                                           |
| Reportee     | Angir avgiveren regelen gjelder for                                                                                                                                                                                                                                                                                    |
| Right        | Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt, Access - rettighet tilgang er satt, Sign - rettighet signering er satt, ArchiveRead - rettighet les fra arkiv er satt, ArchiveDelete - rettighet slett fra arkiv er satt |
| Condition    | Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret                                                                                                                                                                                  |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode** | **Beskrivelse**                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| 450210       | Angitt avgiver (reportee) er ikke et valid organisasjons- eller fødselsnummer |

### AddRights

Denne operasjonen benyttes for å legge til nye regler i det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**            | **Beskrivelse**                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| servicecode          | Angir tjenestekoden man skal legge til regler for. Feltet er påkrevd                                                               |
| serviceEditionCode   | Angir tjenesteutgavekoden man skal legge til regler for. Feltet er påkrevd                                                         |
| insertRightList      | Liste (AddRightRequestList) av objekter av typen AddRightRequest som angir reglene som skal legges til i registeret                |
| **Returverdi**       | **Beskrivelse**                                                                                                                    |
| AddRightResponseList | Liste av typen AddRightResponse som angir reglene som skulle legges til (insertRightList) i registeret med en status på hver regel |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**    | **Beskrivelse**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                 | **AddRightRequest (utvidelse av RegisterSSRRight)**                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ValidTo         | Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Reportee        | Angir avgiveren regelen gjelder for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Right           | Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt, Access - rettighet tilgang er satt, Sign - rettighet signering er satt, ArchiveRead - rettighet les fra arkiv er satt, ArchiveDelete - rettighet slett fra arkiv er satt                                                                                                                                                                                               |
| Condition       | Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret                                                                                                                                                                                                                                                                                                                                                                                |
|                 | **AddRightResponse (utvidelse av AddRightRequest som sendes inn)**                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| OperationResult | Angir resultatet for regelen som skulle legges til. Mulige verdier er: Ukjent – status er ukjent, OK – regel ble lagt til som forventet, RuleNotFound – regel som skulle slettes ble ikke funnet, RuleAlreadyExists – regel som skal legges til eksisterer allerede. Regel må først slettes for å kunne oppdateres, EmptyOrNotAValidSsnOrOrganisation – avgiver for regel er ikke et valid organisasjons- eller fødselsnummer, RightAlreadyExpired – regel som skal legges til er allerede gått ut på gyldighetsdato |
| Validto         | Angir dato og tid regel er gyldig til, (yyyy-MM-ddThh:mm:ss)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Reportee        | Angir avgiveren regelen gjelder for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Right           | Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt, Access - rettighet tilgang er satt, Sign - rettighet signering er satt, ArchiveRead - rettighet les fra arkiv er satt, ArchiveDelete - rettighet slett fra arkiv er satt                                                                                                                                                                                               |
| Condition       | Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret                                                                                                                                                                                                                                                                                                                                                                                |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode** | **Beskrivelse**                   |
| ------------ | --------------------------------- |
| 450211       | Angitt «condition» er ikke gyldig |

### DeleteRights

Denne operasjonen benyttes for å slette eksisterende regler i det tjenesteeierstyrte rettighetsregisteret.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**               | **Beskrivelse**                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| servicecode             | Angir tjenestekoden man skal slette regler for. Feltet er påkrevd                                                                    |
| serviceEditionCode      | Angir tjenesteutgavekoden man skal slette regler for. Feltet er påkrevd                                                              |
| deleteRightList         | Liste (DeleteRightRequestList) av objekter av typen DeleteRightRequest som angir reglene som skal slettes fra registeret             |
| **Returverdi**          | **Beskrivelse**                                                                                                                      |
| DeleteRightResponseList | Liste av typen DeleteRightResponse som angir reglene som skulle slettes (deleteRightList) fra registeret med en status på hver regel |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**    | **Beskrivelse**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                 | **DeleteRightRequest (utvidelse av RegisterSSRRight)**                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Reportee        | Angir avgiveren regelen gjelder for                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Right           | Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt, Access - rettighet tilgang er satt, Sign - rettighet signering er satt, ArchiveRead - rettighet les fra arkiv er satt, ArchiveDelete - rettighet slett fra arkiv er satt                                                                                                                                                                                            |
| Condition       | Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret                                                                                                                                                                                                                                                                                                                                                                             |
|                 | **AddRightResponse (utvidelse av AddRightRequest som sendes inn)**                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| OperationResult | Angir resultatet for regelen som skulle slettes. Mulige verdier er: Ukjent – status er ukjent, OK – regel ble lagt til som forventet, RuleNotFound – regel som skulle slettes ble ikke funnet, RuleAlreadyExists – regel som skal legges til eksisterer allerede. Regel må først slettes for å kunne oppdateres, EmptyOrNotAValidSsnOrOrganisation – avgiver for regel er ikke et valid organisasjons- eller fødselsnummer, RightAlreadyExpired – regel som skal legges til er allerede gått ut på gyldighetsdato |
| Reportee        | Angir avgiveren regelen gjelder for                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Right           | Angir rettighet regelen gir. Mulige verdier er: None – rettighet er ikke satt, Read – rettighet les er satt, Write – rettighet skriv er satt, Access - rettighet tilgang er satt, Sign - rettighet signering er satt, ArchiveRead - rettighet les fra arkiv er satt, ArchiveDelete - rettighet slett fra arkiv er satt                                                                                                                                                                                            |
| Condition       | Kan angi en spesifikk betingelse for regelen, se mer informasjon om mulige verdier under respektive tjenester som benytter registeret                                                                                                                                                                                                                                                                                                                                                                             |
