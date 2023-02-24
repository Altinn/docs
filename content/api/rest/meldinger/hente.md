---
title: Hente 
description: Operasjoner for å lese i meldingsboks og arkiv
toc: true
weight: 10
---

## Hent ut liste med meldinger og finn lenker

Det sentrale elementet som tilgjengeliggjøres i APIet er `Message`. Den representerer et element i sluttbrukerens meldingsboks i Altinn og
 kan være av typen `FormTask` og `Correspondence` og ha ulik status alt etter hvilken tilstand elementet er i.

Ved å gå til rot-ressursen https://www.altinn.no/api/my/messages/ er det mulig å navigere seg fram til elementene i brukerens meldingsboks.

Send følgende GET-forespørsel mot APIet, og du vil få returnert brukerens innhold i meldingsboksen (resultatet er begrenset til de 50 første
elementene, se punkt 7 under for informasjon om hvordan du får fram de 50 neste).

```HTTP
GET https://www.altinn.no/api/my/messages HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Ved korrekt autentisering vil du få følgende svar fra APIet:

```JSON
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/my/messages"
        },
        "find": {
            "href": "https://www.altinn.no/api/my/messages/{MessageId}",
            "isTemplated": true
        }
    },
    "_embedded": {
        "messages": [
            {
                "MessageId": "a385107",
                "Subject": "Vedr. saksnr 201301840, journalnr 2013021622 ",
                "Status": "Ulest",
                "LastChangedDateTime": "2013-11-11T13:41:01.703",
                "LastChangedBy": "Kommunene",
                "ServiceOwner": "Kommunene",
                "Type": "Correspondence",
                "MessageSender": "Brønnøy Kommune",
                "ServiceCode": "2479",
                "ServiceEdition": 2,
                "ReplyOptions": [
                    {
                        "Type": "Service",
                        "URL": "http://devenv.altinn.no/api/metadata/formtask/3008/102",
                        "Text": "Correspondence Sanity PROD",
                        "ServiceCode": "3008",
                        "ServiceEditionCode": 102
                    },
                    {
                        "Type": "ArchiveReference",
                        "URL": "http://devenv.altinn.no/api/my/messages/b3",
                        "Text": "Correspondence Sanity PROD"
                    },
                    {
                        "Type": "URL",
                        "URL": "http://www.altinn.no",
                        "Text": "Klikk her"
                    }
                ],                
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/my/messages/a385107"
                    },
                    "metadata": {
                        "href": "https://www.altinn.no/api/metadata/correspondence/2479/2"
                    },
                    "portalview": {
                        "href": "https://www.altinn.no/Pages...."
                    }
                }
            },
            {
                "MessageId": "a385103",
                "Subject": "Søknad om tilskudd til lokale samlivskurs",
                "Status": "Utfylling",
                "LastChangedDateTime": "2013-11-11T13:39:22.817",
                "LastChangedBy": "HÅKON TRANA",
                "ServiceOwner": "Barne-, ungdoms- og familiedirektoratet",
                "Type": "FormTask",
                "ServiceCode": "3606",
                "ServiceEdition": 130731,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/my/messages/a385103"
                    },
                    "print": {
                        "href": "https://www.altinn.no/api/my/messages/a385103/print",
                        "mime-type": "application/pdf"
                    },
                    "metadata": {
                        "href": "https://www.altinn.no/api/metadata/formtask/3606/130731"
                    },
                    "portalview": {
                        "href": "https://www.altinn.no/Pages....."
                    }
                }
            },
            {
                "MessageId": "a382871",
                "Subject": "RF-1015 Lønns- og trekkopplysninger for 2012",
                "Status": "Utfylling",
                "LastChangedDateTime": "2013-11-11T13:37:48.093",
                "LastChangedBy": "HÅKON TRANA",
                "ServiceOwner": "Skatteetaten",
                "Type": "FormTask",
                "ServiceCode": "2802",
                "ServiceEdition": 2203,
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/my/messages/a382871"
                    },
                    "print": {
                        "href": "https://www.altinn.no/api/my/messages/a382871/print",
                        "mime-type": "application/pdf"
                    },
                    "metadata": {
                        "href": "https://www.altinn.no/api/metadata/formtask/2802/2203"
                    },
                    "portalview": {
                        "href": "https://www.altinn.no/Pages......"

                    }
                }
            }
        ]
    }
}
```

### Message av typen FormTask
En message med type `FormTask` representerer en innsendingstjeneste (skjema) som ligger i sluttbrukers meldingsboks.
Status parameteren angir hvilken tilstand skjemaet har ("Utfylling", "Signering", "Sendt og arkivert"). 

### Message av typen Correspondence

En message med type `Correspondence` representerer en meldingstjeneste (melding fra etat til bruker) som ligger i sluttbrukers meldingsboks.
Status parameteren angir hvilken tilstand meldingen har ("Ulest", "Lest", "Arkivert"). 

#### Lesealternativer
Det er mulig å hente ned en melding uten å markere den som lest. APIet kan motta en valgfri parameter "markAsRead". 
Dette er en boolean som angir om Altinn skal markere henting av melding som en lesing av melding.
"markAsRead" vil default bli tolket som true.

#### Svaralternativer
Hvis tjenesteeier har angitt ett eller flere svaralternativ vil disse vises i tabellen "ReplyOptions". Svaralternativer kan ha en av tre typer:

- **Service** - Representerer en tjeneste som må fylles ut i respons til meldingen
- **ArchiveReference** - Representerer ett arkivert element som legges ved meldingen
- **URL** - Ekstern lenke lagt til meldingen

Alle typer svaralternativer inneholder minst tre elementer:

- **Type**  - Tekst som identifiserer typen svaralternativ. Mulige verdier er "Service", "ArchiveReference" eller "URL"
- **URL**   - URI til det aktuelle svaralternativet
- **Text**  - Tekst som kan brukes til å bygge lenken som vises for sluttbruker

Svaralternativer av typen "Service" inneholder i tillegg "ServiceCode" og "ServiceEditionCode" som kan brukes til å identifisere tjenesten det lenkes til.

### Lenker

Hvert enkelt message-element inneholder en hash tabell "_links" som inneholder lenker til beslektede elementer.
Det er viktig at din applikasjon aktivt bruker disse lenkene, og ikke hardkoder en rekke URL-er i applikasjonen.

```JSON
 "_links": {
    "self": {
        "href": "https://www.altinn.no/api/my/messages/a382871"
    },
    "print": {
        "href": "https://www.altinn.no/api/my/messages/a382871/print",
        "mime-type": "application/pdf"
    },
    "metadata": {
        "href": "https://www.altinn.no/api/metadata/formtask/2802/2203"
    },
    "portalview": {
        "href": "https://www.altinn.no/Pages......"
    }
}
```

Feltene i `_links` betyr følgende:

 - **self**  - URI til representasjon av den enkelte meldingen. 
 - **print** - URI til utskriftsversjonen av et arkivert skjema eller et skjema under utfylling.
   Er kun gyldig for message elementer av typen `FormTask`. For `print` relasjoner er "mime-type" i de fleste tilfeller "application/pdf" men
   vil i noen tilfeller også være "application/text-html".
 - **metadata** - URI til metadata ressurs for den aktuelle meldingen. 
 - **portalview** - URI til portalpresentasjonen av meldingen.
   Ved å følge lenken får brukeren opp Altinns presentasjon av elementet i [portalen](https://www.altinn.no).
   I portalen vil ressursen vises i den status den befinner seg i (Utfylling, Signering, Arkivert).

_links kan bli utvidet med ytterligere relasjoner i fremtidige oppdateringer av APIet.

 

## Hent ut liste med enheter brukeren kan representere

"Reportee" representerer en avgiver den påloggede brukeren har rettighet til å representere.
 Ved å gå til rot-ressursen https://www.altinn.no/api/reportees/ er det mulig å få en liste over alle avgivere en pålogget bruker kan representere
 og derfra navigere seg fram til en liste over elementene i avgiverens meldingsboks.
 Avgivere kan være andre personer (type=person) eller organisasjoner (type=organization) brukeren har rettighet til å representere.
 For avgivere av typen organization indikerer status parameteren om organisasjonen er slettet eller fremdeles aktiv.

Parameteren ReporteeID angir en unik id for aktuell avgiver, denne IDn kan benyttes i {my} parameteren i URL strukturen i APIet til
å angi hvilken avgiver som operasjonen mot APIet utføres for. Eks. https://www.altinn.no/api/{reporteeID}/messages/.

Send følgende GET-forespørsel mot APIet, og du vil få returnert en liste over avgivere brukeren har rettighet til å representere.
Resultatet er begrenset til de 50 første elementene, se punkt 7 under for informasjon om hvordan du får fram de 50 neste)

```HTTP
GET https://www.altinn.no/api/reportees HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Ved korrekt autentisering vil du få følgende svar fra APIet:

```JSON
{
    "_links": {
        "find": {
            "href": "https://altinn.no/api/reportees/{reporteeId}",
            "isTemplated": true
        },
        "self": {
            "href": "https://altinn.no/api/reportees"
        }
    },
    "_embedded": {
        "reportees": [
             {
                "ReporteeId": "r50170460",
                "Name": "DALEKVAM OG BORGEN",
                "Type": "Foretak",
                "OrganizationNumber": "910672991",
                "Status": "Active",
                "_links": {
                    "self": {
                        "href": "https://altinn.no/api/reportees/r50170460"
                    },
                    "messages": {
                        "href": "https://altinn.no/api/r50170460/messages"
                    }
                }
            },         
            {
                "ReporteeId": "r50165842",
                "Name": "FOTLANDSVÅG OG VERMA REGNSKAP",
                "Type": "Foretak",
                "OrganizationNumber": "910454013",
                "Status": "Active",
                "_links": {
                    "self": {
                        "href": "https://altinn.no/api/reportees/r50165842"
                    },
                    "messages": {
                        "href": "https://altinn.no/api/r50165842/messages"
                    }
                }
            },
            {
                "ReporteeId": "r50019105",
                "Name": "HÅKON TRANA",
                "Type": "Person",
                "SocialSecurityNumber": "05116602352",
                "_links": {
                    "self": {
                        "href": "https://altinn.no/api/reportees/r50019105"
                    },
                    "messages": {
                        "href": "https://altinn.no/api/r50019105/messages"
                    }
                }
            }            
        ]
    }
}
```

### Lenker fra reportee

Hvert enkelt reportee-element har en hash tabell `_links` som inneholder lenker til beslektede elementer.
Det er viktig at din applikasjon aktivt bruker disse lenkene, og ikke hardkoder en rekke URL-er i applikasjonen. 

```JSON
_links: {
    "messages": {
        "href": "https://www.altinn.no/api/910926551/messages"
     }
}
```

Feltene i `_links` betyr følgende:

 - **messages** - URI til liste over meldinger i meldingsboksen til den aktuelle organisasjonen. 

_links kan bli utvidet med ytterligere flere relasjoner i fremtidige oppdateringer av APIet.


## Hent enkelt melding med vedlegg

For å hente ut en enkelt melding kan applikasjonen følge `_self` lenken som finnnes for hvert message element.
Følgende request henter en enkelt melding fra brukerens meldingsboks.

```HTTP
GET https://www.altinn.no/api/my/messages/a1507495 HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel respons fra API for message av typen `FormTask`:

```JSON
{
    "MessageId": "a1507495",
    "Subject": "RF-1028 Selvangivelse for aksjeselskap mv.  2012, Anonym ASA",
    "Status": "Utfylling",
    "LastChangedDateTime": "2013-11-20T19:50:54.86",
    "LastChangedBy": "HÅKON TRANA",
    "ServiceOwner": "Skatteetaten",
    "Type": "FormTask",
    "ServiceCode": "2933",
    "ServiceEdition": 120806,    
    "_links": {
        "self": {
            "href": "https://www.altin.no/api/my/messages/a1507495"
        },
        "print": {
            "href": "https://www.altinn.no/api/my/messages/a1507495/print",
            "mime-type": "application/pdf"
        },
        "metadata": {
            "href": "https://www.altinn.no/api/metadata/formtask/2933/120806"
        },
        "portalview": {
              "href": "https://www.altinn.no/Pages......"
        },
        "form": [
            {
                "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/forms/760772",
                "name": "RF-1028 Selvangivelse for aksjeselskap mv.  2012, Anonym ASA"
            },
            {
                "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/forms/760773",
                "name": "RF-1016 Formue av skogseiendom 2012"
            }
        ],
        "attachment": [
            {
                "href": "https://www.altinn.no/api/my/messages/a1507495/attachments/282783",
                "name": "oppgaver",
                "fileName": "oppgaver.txt",
                "encrypted": false,
                "signinglocked": false,
                "signedbydefault": true,
                "filesize": 16027
            }
        ]
    }
}
```

Eksempel respons fra API for message av typen `Correspondence`:

```JSON
{
    "MessageId": "a385571",
    "Subject": "Vedr. saksnr 201301840, journalnr 2013021622 ",
    "Status": "Ulest",
    "LastChangedDateTime": "2013-11-26T13:58:44.34",
    "LastChangedBy": "Testdepartementet",
    "ServiceOwner": "Testdepartement",
    "Type": "Correspondence",
    "MessageSender": "Brønnøy Kommune",
    "Summary": "Vedr. saksnr 201301840, journalnr 2013021622",
    "Body": "<p>Vedr. saksnr 201301840, journalnr 2013021622</p>\n<p>Tillatelse til tiltak. Gnr 127 bnr 506, Skarelien 35.</p>\n \n<p>Klikk under for å åpne dokumentet.  </p>\n",
    "ServiceCode": "2479",
    "ServiceEdition": 2,
    "ArchiveReference": "AR3513210",
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/my/messages/a385571"
        },
        "metadata": {
            "href": "https://www.altinn.no/api/metadata/correspondence/2479/2"
        },
        "portalview": {
            "href": "https://www.altinn.no/Pages......"
        },
        "attachment": [
            {
                "href": "https://www.altinn.no/api/my/messages/a385571/attachments/187938",
                "name": "Tiltak_201301840",
                "fileName": "Tiltak_201301840.pdf",
                "encrypted": false,
                "signinglocked": false,
                "signedbydefault": true,
                "filesize": 967038
            }
        ],
        "archivereference": {
            "href": "https://www.altinn.no/api/my/messages/b3513210"
        },
    }
```

 

### Message lenker

Message-element inneholder en hash tabell `_links` som inneholder lenker til beslektede elementer.

```JSON
    "_links": {
        "self": {
            "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495"
        },
        "print": {
            "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/print",
            "mime-type": "application/pdf"
        },
        "metadata": {
            "href": "https://tt02.altinn.basefarm.net/api/metadata/formtask/2933/120806"
        },
        "portalview": {
            "href": "https://tt02.altinn.basefarm.net/Pages/......."
        },
        "attachment": [
            {
                "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/attachments/282783",
                "name": "oppgaver",
                "fileName": "oppgaver.txt",
                "encrypted": false,
                "signinglocked": false,
                "signedbydefault": true,
                "filesize": 16027
            }
        ],
        "form": [
            {
                "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/forms/760772",
                "name": "RF-1028 Selvangivelse for aksjeselskap mv.  2012, Anonym ASA"
            },
            {
                "href": "https://tt02.altinn.basefarm.net/api/my/messages/a1507495/forms/760773",
                "name": "RF-1016 Formue av skogseiendom 2012"
            }
        ],
        "archivereference": {
            "href": "https://www.altinn.no/api/my/messages/b3513210"
        },
    }   
```

Feltene i `_links` betyr følgende:

 - **self**  - URI til representasjon av den enkelte meldingen. 
 - **print** - URI til utskriftsversjonen av et arkivert skjema eller et skjema under utfylling.
   Er kun gyldig for message elementer av typen "FormTask". For "print" relasjoner er "mime-type" i de fleste tilfeller "application/pdf" men vil i noen tilfeller også være "application/text-html".
 - **metadata** - URI til metadata ressurs for den aktuelle meldingen. 
 - **portalview** - URI til portalpresentasjonen av meldingen. Ved å følge lenken får brukeren opp Altinns presentasjon av elementet i Portalen (www.altinn.no). I portalen vil ressursen vises i den status den befinner seg i (Utfylling, Signering, Arkivert).
 - **form** - URI til skjema knyttet til message av typen `FormTask`. 
 - **attachment** - URI til brukeropplastet vedlegg knyttet til skjema under utfylling eller vedlegg knyttet til melding fra etat. encrypted-parameter angir om vedlegget er kryptert.
 - **archivereference** - URI til en arkiv-referanse for meldingen.

`_links` kan bli utvidet med ytterligere flere relasjoner i fremtidige oppdateringer av APIet.

## Henting av melding uten å sette melding som lest
Som default vil Altinn markere en melding som lest i det den hentes ned av applikasjonen.
For å hente ut en enkelt melding uten å sette melding som lest, kan applikasjonen legge på en valgfri attribut "markAsRead" på `_self` lenken som finnnes for hvert message element.
Følgende request henter en enkelt melding fra brukerens meldingsboks uten å markere den som lest.


```HTTP
GET https://www.altinn.no/api/my/messages/a1507495?markAsRead=false HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```


## Filtrering av liste
OData  kan brukes til filtrering, paging og sortering i lister av elementer av alle typer.

Lister i APIet er begrenset i kode til å maksimalt inneholde 50 elementer. 

### Paging
Det er mulig å utføre paging ved å sende med OData parameteren `skip` (for eksempel `$skip=50`).

```HTTP
GET https://www.altinn.no/api/my/messages?$skip=50 HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

### Filtrering
Det er også mulig å filtrere listene som returneres basert på hvilke informasjonselementer de inneholder.
For eksempel vil følgende request med parameterene `$filter=ServiceOwner eq 'Skatteetaten'& $top=3` kun returnere de siste 3 meldinger fra Skatteetaten.

```HTTP
GET https://www.altinn.no/api/my/messages?$filter=ServiceOwner eq 'Skatteetaten'&$top=3 HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```
Det er også mulig å bygge mer spesifikke filtre, for eksempel større/mindre enn på dato og navn på tjenesteeier.

```HTTP
GET https://www.altinn.no/api/my/messages?$filter=CreatedDate gt DateTime'2018-01-22T00:00:00' and ServiceOwner eq 'Asker Kommune' HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

### Underliggende maksgrense
Alle kall til REST-APIet av prisgitt begrensinger i underliggende databasemodell som begrenser hvor mange meldinger som kan hentes fra databasen. - Dette inntreffer før OData-filtrene blir påført, og kan i tilfeller der det er mange meldinger føre til at returen blir ufullstendig.
Når dette skjer vil responsen ha en header **X-Warning-LimitReached** som indikerer at denne grensen har blitt nådd, og at man da muligens mangler relevant data.

En workaround er å legge til datofiltrene dateFrom og dateTo da disse går helt ned til databaselaget.

Sett intervallet mellom dem på en balansert måte slik at man ikke lenger får **X-Warning-LimitReached**, men uten å gjøre unødvendig mange kall.

## Laste ned XML payload for skjema (skjemadata)
Man kan nå laste ned (lese) XML-representasjon av Skjemadata.
Skjemadata er representert i XML og vil være en egen ressurs som er lenket fra Form-ressursen. For å laste ned XML-representasjon av et
skjema/underskjema kan man ta utgangspunkt i aktuelt message element og følge lenke `form`.

Eksempel:

https://www.altinn.no/api/910621211/messages/a1685777

Responsen på denne vil inneholde lenke(r) til de faktiske skjema, f.eks:

```JSON {hl_lines=[3]}
"form": [
    {
        "href": "https://www.altinn.no/api/910621211/messages/a1685777/forms/1049574",
        "name": "RF-0004 Omsetningsoppgave for primærnæringene, Hovedoppgave, Årlig, 2012"
    }
]
```

Når du følger denne lenken vil respons inkludere en lenke til selve XML payload i form av lenke `formdata`:

```JSON {hl_lines=[11]}
{
    "Type": "MainForm",
    "DataFormatId": "213",
    "DataFormatVersion": 10422,
    "ValidationStatus": "NotValidated",
    "Name": "RF-0004 Omsetningsoppgave for primærnæringene, Hovedoppgave, Årlig, 2012",
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/910621211/messages/a1685777/forms/1049574"
        },
        "formdata": {
            "href": "https://www.altinn.no/api/910621211/messages/a1685777/forms/1049574/formdata",
            "mime-type": "application/xml"
        }
    }
}
```

Lenken `formdata` vil returnere XML representasjon av skjemaet:

**Merk:** XML som er definert i Oppgaveregisteret har typisk `Skjema` som rot,
mens [XML definert i SERES](/docs/seres/brukerveiledninger/seresxsd/#altinn-tilpasset-struktur) har typisk `melding` som rot.

```XML
<Skjema>
    ...
    <Termin-grp-2591 gruppeid="2591">
        <OppgaveType-datadef-5659 orid="5659">1</OppgaveType-datadef-5659>
        <TerminType-datadef-20654 orid="20654">1</TerminType-datadef-20654>
        <Termin-datadef-20655 orid="20655">011</Termin-datadef-20655>
        <TerminAr-datadef-20656 orid="20656">2012</TerminAr-datadef-20656>
    </Termin-grp-2591>
    ...
</Skjema>
```
