---
title: Altut
description: For bakoverkompatibilitet tilbys AltUt grensesnittet for registrering av meldinger til eksisterende tjenesteeiere. Nye tjenesteeiere skal benytte grensesnittet correspondence. AltUt grensesnittet blir ikke lenger oppdatert ettersom Altinn videreutvikles.
weight: 800
---

### SubmitAltutMessagePw

Operasjonen SubmitAltutMessagePw benyttes av eksisterende tjenesteeiere for å sende meldinger til avgivere i Altinn.

Tabellen under beskriver datakontrakten for operasjonen:

| **Input**                  | **Beskrivelse**                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------- |
| altutMessage               | Meldingen som skal sendes til Altinn. Må være i henhold til AltUt.xsd (versjon 6.0) |
| Password                   | Tjenesteeiers passord                                                               |
| **Returverdi**             | **Beskrivelse**                                                                     |
| submitAltutMessagePwResult | Kvittering for innsendingen. Er i henhold til GovOrganReceipt.xsd (versjon 6.0)     |

Se avsnitt Batch grensesnitt – Altut format for bilde av xml struktur i Altut.xsd.

Tabellen under gir en nærmere beskrivelse av objektene som inngår i datakontrakten

| **Property**                                                        | **Beskrivelse** |
| ------------------------------------------------------------------- | --------------- |
| **altutMessage (AltUt.xsd)**                                        |                 |
| Se definisjonen på xsd i avsnittet Batch grensesnitt – Altut format |                 |

| **Element**                                            | **Beskrivelse**                                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| GovOrganReceipt                                        | Rotnode                                                                                                     |
| schemaVersion                                          | Versjon på kvittering                                                                                       |
| GovOrganReceipt.DataUnitInReceipt                      | Elementet inneholder status på og tidspunkt for forsendelse, samt elementer for melding til kallende system |
| receiptType                                            | Kvitteringstype (valgfritt): PREFILL, ALTUT                                                                 |
| status                                                 | Status på innsending                                                                                        |
| timeReceived                                           | Tidspunkt for innsending                                                                                    |
| GovOrganReceipt.DataUnitInReceipt.Message              | Overordnet element                                                                                          |
| GovOrganReceipt.DataUnitInReceipt.Message.MessageEntry | Elementet inneholder melding som beskriver resultat for forsendelse                                         |
