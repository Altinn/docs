---
title: Samhandlingstjeneste 
description: Administrere samhandlingstjenestene
weight: 800
---

## CaseAgencySystem

Case er tjenesten i Altinn for administrering av samhandlingstjenester for tjenesteeiere.

### InstantiateCollaborationAgencySystem

Denne operasjonen brukes av tjenesteeier til å instansiere samhandlingstjenester for en gitt person eller organisasjon.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                  | **Beskrivelse**                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------- |
| externalServiceCode        | Angir tjenestekoden for samhandlingstjeneste som skal instansieres                 |
| externalServiceEditionCode | Angir tjenesteutgavekoden for samhandlingstjenesten som skal instansieres          |
| reporteeNumber             | Fødselsnummer eller organisasjonsnummer som saken skal opprettes for               |
| visibleDateTime            | Angir når samhandlingstjenesten skal være synlig (yyyy-MM-dd / yyy-MM-ddThh:mm:ss) |
| dueDate                    | Angir når samhandlingstjenesten skal være ferdig (yyyy-MM-dd / yyy-MM-ddThh:mm:ss) |
| **Returverdi**             | **Beskrivelse**                                                                    |
| CaseId                     | Unike identifikator for samhandlingstjenesten                                      |

Tabellen under angir mulige feilkoder for operasjonen

| **Feilkode** | **Beskrivelse**                                           |
| ------------ | --------------------------------------------------------- |
| 60002        | Tjenestekode og tjenesteutgavekode er ikke angitt         |
| 60012        | Angitt avgiver er ikke gyldig                             |
| 60024        | Angitt tjenesteeier er ikke autorisert for valgt tjeneste |

### GetCaseListAgencySystem

Denne operasjonen brukes av tjenesteeier til å hente informasjon om eksisterende samhandlingstjenester.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                  | **Beskrivelse**                                                             |
| -------------------------- | --------------------------------------------------------------------------- |
| caseID                     | **Enten:** Unike identifikator for samhandlingstjenesten som skal hentes    |
| externalServiceCode        | **Eller:** Tjenestekoden for samhandlingstjenesten det skal slås opp mot    |
| externalServiceEditionCode | **Og:** Tjenesteutgavekoden for samhandlingstjenesten det skal slås opp mot |
| languageID                 | Språk id: 1033 - English, 1044 - Bokmål, 2068-Nynorsk                       |
| reporteeNumber             | Fødselsnummer eller organisasjonsnummer det skal hentes for                 |
| **Returverdi**             | **Beskrivelse**                                                             |
| CaseList                   | Liste med ExternalCaseBE objekter                                           |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**             | **Beskrivelse**                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
|                          | **ExternalCaseBE**                                                                                  |
| CaseID                   | Unik identifikator for samhandlingstjenesten                                                        |
| CaseName                 | Samhandlingstjenestens navn definert i TUL                                                          |
| CurrentStateFriendlyName | Visningsvennlig navn for samhandlingstjenestens tilstand basert på languageID parameter, satt i TUL |
| CurrentStateID           | Unik identifikator for samhandlingstjenestens tilstand, som satt i TUL                              |
| CurrentStateName         | Navn for samhandlingstjenestens tilstand, som satt i TUL                                            |
| NoticeTemplateID         | Unik identifikator for eventuell merknad satt på samhandlingstjenesten                              |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode** | **Beskrivelse**                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| 60001        | Angitt CaseID er ikke gyldig                                                        |
| 60002        | Tjenestekode og tjenesteutgavekode er ikke angitt, eller er ikke en gyldig tjeneste |
| 60012        | Angitt avgiver er ikke gyldig                                                       |
| 60014        | Angitt CaseID er arkivert                                                           |
| 60015        | Angitt CaseID er slettet                                                            |
| 60024        | Angitt tjenesteeier er ikke autorisert for valgt tjeneste                           |

### NotifyEventAgencySystem

Denne operasjonen benyttes for å registrere en hendelse på en eksisterende samhandlingstjeneste.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                            | **Beskrivelse**                                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| notificationInfo                     | Objekt av typen StateMachineEventNotificationBE som angir hendelse og hva hendelsen gjelder for |
| **Returverdi**                       | **Beskrivelse**                                                                                 |
| StateMachineNotificationResultBEList | Liste av typen StateMachineNotificationResultBE som angir resultat av hendelsen                 |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**               | **Beskrivelse**                                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| CaseID                     | **Enten:** Unik identifikator for bestemt samhandlingstjeneste hendelsen gjelder for                                                |
| ExternalServiceCode        | **Eller:** Tjenestekoden for samhandlingstjenestene hendelsen gjelder for                                                           |
| ExternalServiceEditionCode | **Og:** Tjenesteutgavekoden for samhandlingstjenestene hendelsen gjelder for                                                        |
| Event                      | Hendelsen som skal registreres                                                                                                      |
| ReporteeElementID          | Eventuell id til sub-element som trigger hendelsen, benyttes kun i logg sammenheng                                                  |
|                            | **StateMachineNotificationResultBE**                                                                                                |
| CaseID                     | Identifikator for samhandlingstjenesten hendelsen ble registrert for                                                                |
| IsStateChanged             | Boolsk verdi som angir om en tilstandsendring skjedde                                                                               |
| ConditionName              | Navn på betingelsen som er assosiert                                                                                                |
| ConditionEvaluationResult  | Boolsk verdi som angir resultatet for betingelsen hvis en betingelse er tilknyttet (satt til True om ingen betingelse er involvert) |
| CurrentStateName           | Samhandlingens nåværende tilstand                                                                                                   |
| HasException               | Boolsk parameter som antyder om det oppstod en feil i tilstandsmaskinen                                                             |
| ExceptionDetail            | Inneholder feilinformasjon for en eventuell feil i tilstandsmaskinen                                                                |
| ErrorCode                  | Inneholder feilkoden for en eventuell feil i tilstandsmaskinen                                                                      |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode** | **Beskrivelse**                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| 60001        | Angitt CaseID er ikke gyldig                                                        |
| 60002        | Tjenestekode og tjenesteutgavekode er ikke angitt, eller er ikke en gyldig tjeneste |
| 60014        | Angitt CaseID er arkivert                                                           |
| 60015        | Angitt CaseID er slettet                                                            |
| 60022        | Hendelsesinformasjon er ikke angitt                                                 |
| 60023        | Hendelse er ikke angitt                                                             |
| 60032        | Hendelsen kunne ikke registreres for valgt tjeneste                                 |

### SetNoticeAgencySystem

Denne operasjonen lar tjenesteeier sette en merknad på en instans av en samhandlingstjeneste, eller en underliggende instans av meldingstjeneste, innsendingstjeneste, eller arkivert innsynstjeneste.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**         | **Beskrivelse**                                                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| reporteeElementID | Identifikator for elementet merknaden skal settes på: 1. Saks identifikator – caseId.	2. Arkivert element tilknyttet samhandlingstjenesten – reporteeElementID prefikset med AR 3. Aktivt element tilknyttet samhandlingstjenesten – reporteeElementID |
| noticeInfo        | Objekt av typen NoticeBE som inneholder mal og eventuelle substitusjoner                                                                                                                                                                               |
| **Returverdi**    | **Beskrivelse**                                                                                                                                                                                                                                        |
| N/A               | N/A                                                                                                                                                                                                                                                    |

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten.

| **Property**     | **Beskrivelse**                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
|                  | **NoticeBE**                                                                          |
| NoticeTemplateID | Identifikator for merknadsmalen opprettet i TUL.                                      |
| NoticeTokens     | Liste av typen NoticeTokenBE objekter som inneholder key-value par for substitusjoner |
|                  | **NoticeTokenBE**                                                                     |
| TokenKey         | Nøkkel for substitusjon                                                               |
| TokenValue       | Verdi for substitusjonen                                                              |

Tabellen under angir mulige feilkoder for operasjonen:

| **Feilkode** | **Beskrivelse**                                              |
| ------------ | ------------------------------------------------------------ |
| 60005        | Angitt element er ikke på gyldig format                      |
| 60014        | Angitt saks identifikator er arkivert                        |
| 60015        | Angitt saks identifikator er slettet                         |
| 60016        | Angitt element eksisterer ikke                               |
| 60017        | Angitt element er ikke assosiert til en samhandlingstjeneste |
| 60018        | Angitt element er slettet                                    |
| 60019        | Angitt element er arkivert, benytt valid arkivreferanse      |
| 60024        | Angitt tjenesteeier er ikke autorisert for valgt tjeneste    |
