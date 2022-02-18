---
title: Roller og rettigheter
description: Her finner du informasjon om hvordan man kan delegere roller og rettigheter til andre eller slette slike delegeringer via API. En kan også administrere innlogget bruker sine egne roller og rettigheter hos ulike avgivere.
toc: true
---


# Tilgangsstyring av roller og rettigheter

Integrasjoner som skal tilgangsstyre medarbeideres tilganger innefor egen virksomhet i Altinn trenger å bruke "delegations"-API-et som beskrevet under. Typisk benyttes da en [virksomhetsbrukerinnlogging](../../kom-i-gang/virksomhet/#autentisering-med-virksomhetsbruker-og-virksomhetssertifikat), med en virksomhetsbruker som er tildelt rollen "Hovedadministrator" hos den aktuelle virksomheten.

## Hente liste over rettighetshavere
Hvis innlogget bruker har rollen "Tilgangsstyrer" eller "Hovedadministrator" hos avgiveren `{who}`, kan brukeren hente en liste over hvem andre som har mottatt roller og rettigheter hos oppgitt `{who}`. Merk altså at dette ikke sier noe om _hva_ rettighetshaveren har av rettigheter, bare _at_ den har en eller annen rettighet.

I dette eksemplet vises en liste over alle personer og organisasjoner som innehar en eller annen rettighet hos 912345678.

```HTTP
GET /api/912345678/authorization/delegations/
Host: www.altinn.no
ApiKey: myKey
Accept: application/hal+json

{
    "_links": {
        "find": {
            "href": "https://www.altinn.no/api/912345678/authorization/delegations/{receiverId}",
            "isTemplated": true
        },
        "self": {
            "href": "https://www.altinn.no/api/912345678/authorization/delegations"
        }
    },
    "_embedded": {
        "rightholders": [
            {
                "RightHolderId": "r50006868",
                "Name": "KAI MOSSIGE",
                "LastName": "MOSSIGE",
                "SocialSecurityNumber": "020958*****",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50006868"
                    },
                    "rights": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50006868/rights"
                    },
                    "roles": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50006868/roles"
                    }
                }
            },
            {
                "RightHolderId": "r50016431",
                "Name": "HEINE GRØNLI",
                "LastName": "GRØNLI",
                "SocialSecurityNumber": "050344*****",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50016431"
                    },
                    "rights": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50016431/rights"
                    },
                    "roles": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50016431/roles"
                    }
                }
            },
            {
                "RightHolderId": "r50024102",
                "Name": "MAGNE JEPPESEN",
                "LastName": "JEPPESEN",
                "SocialSecurityNumber": "070344*****",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50024102"
                    },
                    "rights": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50024102/rights"
                    },
                    "roles": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50024102/roles"
                    }
                }
            },
            {
                "RightHolderId": "r50040934",
                "Name": "ORGANISASJONSNAVN AS",
                "OrganizationNumber": "812345679",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50040934"
                    },
                    "rights": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50040934/rights"
                    },
                    "roles": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50040934/roles"
                    }
                }
            },
            {
                "RightHolderId": "r50047780",
                "Name": "HALVARD LØTVEIT",
                "LastName": "LØTVEIT",
                "SocialSecurityNumber": "130462*****",
                "_links": {
                    "self": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50047780"
                    },
                    "rights": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50047780/rights"
                    },
                    "roles": {
                        "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50047780/roles"
                    }
                }
            }
        ]
    }
}
```

{{% notice warning  %}}
Merk at listen også vil inkludere rettighetshavere som har en rolle fra Enhetsregisteret, f.eks. daglig leder eller revisor. Rettighetshavere med disse rollene kan ikke fjernes.
{{% /notice %}}


## Hente liste med rettighetshaver sine roller og rettigheter 
Som indikert i returen fra Altinn i eksemplet over, må det gjøres et ytterligere kall for å hente ut hvilke roller og tjenesteerettigheter hver enkelt rettighetshaver har.

I dette eksemplet hentes det ut alle roller rettighetshaver med r-id 50006868 har hos 91234578.

```HTTP
GET /api/912345678/authorization/delegations/r50006868/roles 
Host: www.altinn.no
ApiKey: mykey
Accept: application/hal+json
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50006868/roles"
        }
    },
    "_embedded": {
        "roles": [
            {
                "RoleId": 515647,
                "RoleType": "Altinn",
                "RoleDefinitionId": 8,
                "RoleName": "Begrenset signeringsrettighet",
                "RoleDescription": "Tilgang til å signere utvalgte skjema og tjenester",
                "Delegator": "MONSTAD HALLVARD",
                "DelegatedTime": "2021-07-01T08:39:00.157",
                "_links": {
                    "roledefinition": {
                        "href": "https://www.altinn.no/api/912345678/authorization/roledefinitions/8"
                    }
                }
            }
        ]
    }
}
```

{{% notice warning  %}}
Merk at listen også vil inkludere roller fra Enhetsregisteret, f.eks. daglig leder eller revisor. Disse rolletildelingene kan ikke fjernes. Kunne roller med RoleType "Altinn" kan delegeres.
{{% /notice %}}


I dette eksemplet hentes det ut alle rettigheter rettighetshaver med r-id 50006868 har hos 912345678.

```HTTP
GET /api/912345678/authorization/delegations/r50006868/rights 
Host: www.altinn.no
ApiKey: mykey
Accept: application/hal+json
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/912345678/authorization/delegations/r50006868/rights"
        }
    },
    "_embedded": {
        "rights": [
            {
                "RightID": 1004893,
                "RightType": "Service",
                "ServiceCode": "1120",
                "ServiceEditionCode": 131028,
                "Action": "Read",
                "RightSourceType": "RoleTypeRights",
                "IsDelegatable": true
            },
            {
                "RightID": 1004895,
                "RightType": "Service",
                "ServiceCode": "1120",
                "ServiceEditionCode": 131028,
                "Action": "Write",
                "RightSourceType": "RoleTypeRights",
                "IsDelegatable": true
            },
            {
                "RightID": 1004897,
                "RightType": "Service",
                "ServiceCode": "1120",
                "ServiceEditionCode": 131028,
                "Action": "ArchiveRead",
                "RightSourceType": "RoleTypeRights",
                "IsDelegatable": true
            },
            {
                "RightID": 1004901,
                "RightType": "Service",
                "ServiceCode": "1120",
                "ServiceEditionCode": 131028,
                "Action": "Sign",
                "RightSourceType": "RoleTypeRights",
                "IsDelegatable": true
            },
            {
                "RightID": 1009589,
                "RightType": "Service",
                "ServiceCode": "3502",
                "ServiceEditionCode": 140117,
                "Action": "Read",
                "RightSourceType": "DirectlyDelegatedRights",
                "IsDelegatable": true
            }
        ]
    }
}
```

{{% notice warning  %}}
Merk at listen også inkluderer tjenesterettigheter som innehas som følge av at rettighetshaveren innehar en eller flere roller som omfatter den aktuelle tjenesten (indikeres med at RightSourceType er satt til "RoleTypeRights"). Disse enkeltrettighetene kan ikke slettes. For å fjerne disse, må rolletildelingen fjernes. 
{{% /notice %}}

{{% notice info  %}}
Tips! For å ikke få med rettigheter som er gitt via en rolle, kan du bruke OData-filtrering. Legg til på slutten av URL-en: `?$filter=RightSourceType ne 'RoleTypeRights'`
{{% /notice %}}

```HTTP
GET /api/912345678/authorization/delegations/r50006868/apprights 
Host: www.altinn.no
ApiKey: mykey
Accept: application/hal+json
{
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/r50002161/authorization/delegations/r50006868/apprights"
        }
    },
    "_embedded": {
        "apprights": [
            {
                "AltinnAppId": "ttd/apps-test",
                "ResourceId": "urn:altinn:task",
                "ResourceValue": "Task_1",
                "Action": "read",
                "RightSourceType": "RoleTypeRight",
                "IsDelegatable": true,                
            },
            {
                "RuleGuid": "195cd92d-43be-460d-91c5-be5a5435b90a",
                "AltinnAppId": "ttd/apps-test",
                "ResourceId": "urn:altinn:task",
                "ResourceValue": "Task_1",
                "Action": "write",
                "RightSourceType": "DirectlyDelegated",
                "IsDelegatable": true,
                "_links": {
                    "delete": {
                        "href": "https://at23.altinn.cloud/api/r50002161/authorization/apprights/ttd/apps-test/195cd92d-43be-460d-91c5-be5a5435b90a"
                    }
                }
            }
        ]
    }
}
```

{{% notice warning  %}}
Merk at listen også inkluderer tjenesterettigheter som innehas som følge av at rettighetshaveren innehar en eller flere roller som omfatter den aktuelle tjenesten (indikeres med at RightSourceType er satt til "RoleTypeRights"). Disse enkeltrettighetene kan ikke slettes. For å fjerne disse, må rolletildelingen fjernes. 
{{% /notice %}}

{{% notice info  %}}
Tips! For å ikke få med rettigheter som er gitt via en rolle, kan du bruke OData-filtrering. Legg til på slutten av URL-en: `?$filter=RightSourceType ne 'RoleTypeRight'`
{{% /notice %}}

## Slette delegerte tjenesterettigheter / roller
For å slette en delegert rolle eller rettighet hentet fra listene over, gjøres et DELETE til samme URL hvor den aktuelle RightId eller RoleId legges til på slutten av URL-en, eksempelvis:



```HTTP
DELETE https://www.altinn.no/api/912345678/authorization/delegations/r50006868/roles/515647
Host: www.altinn.no
ApiKey: myKey
```

```HTTP
DELETE https://www.altinn.no/api/912345678/authorization/delegations/r50006868/rights/1009589
Host: www.altinn.no
ApiKey: myKey

```
Returnerer tom respons og statuskoden `204 No Content`.


## Delegere roller og tjenesterettigheter
Hvis innlogget bruker har rollen "Tilgangsstyrer" eller "Hovedadministrator" hos avgiveren `{who}`, kan brukeren gi disse videre (delegere) til en annen person/organisasjon. `{who}` - kan være `my` (som da er innlogget bruker selv, eller for virksomhetsbrukere organisasjonen den er tilknyttet), organisasjonsnummer eller andre privatpersoner indikert med en "r-id". Avgiveren som mottar rollen/tjenesterettigheten kan være en person (fødselsnummer + etternavn), en virksomhet (organisasjonsnummer + navn) eller virksomhetsbruker (brukernavn + organisasjonsnummer).

Informasjon om rettighetsmottaker og hvilken rolle/tjenesterettigheter som skal tildeles legges i Body. Den innloggede brukeren må være tilgangsstyrer for avgiveren og selv ha rollen som skal delegeres (eller være hovedadministrator).

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/POST-who-authorization-Delegations).

Her er et eksempel som viser en delegering av en rolle (med id 64), samt leserettigheter på en enkelttjeneste til organisasjonen med orgnr 812345679.

```HTTP
POST /api/my/authorization/delegations HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
Content-Type: application/hal+json
{
    "OrganizationNumber": "812345679",
    "Name": "ORGANISASJONSNAVN AS",
    "_embedded" : {
        "Roles" : [{
            "RoleDefinitionId": 64;
        }],
        "Rights" : [{
            "ServiceCode": "5123",
            "ServiceEditionCode": 1,
            "Action": "Read"
        }]
    }
}
```

Her er et eksempel som viser en delegering av lese-, skrive- og signeringsrettigheter for en enkelttjeneste til en person med fødselsnummer 12018212345

```HTTP
POST /api/912345678/authorization/delegations HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
Content-Type: application/hal+json
{
    "SocialSecurityNumber": "12018212345",
    "LastName": "ETTERNAVN",
    "_embedded" : {
        "Rights" : [{
            "ServiceCode": "5123",
            "ServiceEditionCode": 1,
            "Action": "Read"
        },
        {
            "ServiceCode": "5123",
            "ServiceEditionCode": 1,
            "Action": "Write"
        },
        {
            "ServiceCode": "5123",
            "ServiceEditionCode": 1,
            "Action": "Sign"
        },
        {
            "ServiceCode": "5123",
            "ServiceEditionCode": 1,
            "Action": "ReadArchive"
        }]
    }
}
```


Hvis vellykket, Returneres tom respons og statuskode 201 Created.



# Innlogget bruker sine egne roller og rettigheter

I enkelte integrasjoner er det hensiktsmessig å kunne administrere den autentiserte brukerens egne rolller og rettigheter for de avgivere han/hun kan representere. Under vises hvordan dette kan utføres

## Hente innlogget bruker sine roller
Hente ut roller innlogget bruker har for `{who}` - kan være `my`, organisasjonsnummer eller andre privatpersoner
der man spør ved hjelp av `r{id}` som hentes fra api/reportees.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-roles_language).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/roles HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons på rettigheter innlogget bruker har for 910252240:
```JSON
{
  "_links": {
    "self": {
      "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roles"
    }
  },
  "_embedded": {
    "roles": [
      {
        "RoleId": 38069107,
        "RoleType": "Altinn",
        "RoleDefinitionId": 3,
        "RoleName": "L\u00f8nn og personalmedarbeider",
        "RoleDescription": "Tilgang til l\u00f8nns- og personalrelaterte tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:27:40.577",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/3"
          }
        }
      },
      {
        "RoleId": 38069108,
        "RoleType": "Altinn",
        "RoleDefinitionId": 6,
        "RoleName": "Regnskapsmedarbeider",
        "RoleDescription": "Tilgang til regnskapsrelaterte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:27:40.577",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/6"
          }
        }
      },
      {
        "RoleId": 38069101,
        "RoleType": "Altinn",
        "RoleDefinitionId": 8,
        "RoleName": "Begrenset signeringsrettighet",
        "RoleDescription": "Tilgang til \u00e5 signere utvalgte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:22:21.653",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/8"
          }
        }
      },
      {
        "RoleId": 38069102,
        "RoleType": "Altinn",
        "RoleDefinitionId": 11,
        "RoleName": "Utfyller\/Innsender",
        "RoleDescription": "Tilgang til utvalgte skjema og tjenester",
        "Delegator": "ELLEN FISKE",
        "DelegatedTime": "2014-11-19T08:22:21.653",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/11"
          }
        }
      },
      {
        "RoleType": "Altinn",
        "RoleDefinitionId": 89,
        "RoleName": "Basisrolle",
        "RoleDescription": "Rolle som f\u00f8lger automatisk med n\u00e5r en bruker f\u00e5r en annen Altinn-rolle",
        "_links": {
          "roledefinition": {
            "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/roledefinitions\/89"
          }
        }
      }
    ]
  }
}
```


## Hente innlogget bruker sine tjenesterettigheter
Hente ut tjenesterettigheter innlogget bruker har for `{who}` - kan være `my`, organisasjonsnummer eller andre privatpersoner der man
spør ved hjelp av `r{id}` som hentes fra api/reportees.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-rights).

```HTTP
GET https://www.altinn.no/api/{who}/authorization/rights HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
  "_links": {
    "self": {
      "href": "https:\/\/www.altinn.no\/api\/910252240\/authorization\/rights"
    }
  },
  "_embedded": {
    "rights": [
      {
        "RightID": 103,
        "RightType": "Service",
        "ServiceCode": "1261",
        "ServiceEditionCode": 1,
        "Action": "Read",
        "RightSourceType": "DirectlyDelegatedRights",
        "IsDelegatable": true
      },
      {
        "RightID": 104,
        "RightType": "Service",
        "ServiceCode": "1238",
        "ServiceEditionCode": 3,
        "Action": "Read",
        "RightSourceType": "DirectlyDelegatedRights",
        "IsDelegatable": false
      },
      {
        "RightID": 10481822,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Read",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481823,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Write",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481824,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "ArchiveRead",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481825,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "ArchiveDelete",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      },
      {
        "RightID": 10481843,
        "RightType": "Service",
        "ServiceCode": "1051",
        "ServiceEditionCode": 140619,
        "Action": "Sign",
        "RightSourceType": "RoleTypeRights",
        "IsDelegatable": true
      }
    ]
  }
}
```

{{% notice warning  %}}
Merk at dette også inkluderer tjenesterettigheter som innehas som følge av at innlogget bruker innehar en eller flere roller som omfatter den aktuelle tjenesten (indikeres med at RightSourceType er satt til "RoleTypeRights"). Disse enkeltrettighetene kan ikke slettes. For å fjerne disse, må rolletildeling fjernes. 
{{% /notice %}}

{{% notice info  %}}
Tips! For å ikke få med rettigheter som er gitt via en rolle, kan du bruke OData-filtrering. Legg til på slutten av URL-en: `?$filter=RightSourceType ne 'RoleTypeRights'`
{{% /notice %}}

```HTTP
GET https://www.altinn.no/api/{who}/authorization/apprights HTTP/1.1
Host: www.altinn.no
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:
```JSON
{
  "_links": {
    "self": {
      "href": "https:\/\/www.altinn.no\/api\/r50002161\/authorization\/apprights"
    }
  },
  "_embedded": {
    "apprights": [
            {
                "AltinnAppId": "ttd/apps-test",
                "ResourceId": "urn:altinn:task",
                "ResourceValue": "Task_1",
                "Action": "read",
                "RightSourceType": "RoleTypeRight",
                "IsDelegatable": true,                
            },
            {
                "RuleGuid": "195cd92d-43be-460d-91c5-be5a5435b90a",
                "AltinnAppId": "ttd/apps-test",
                "ResourceId": "urn:altinn:task",
                "ResourceValue": "Task_1",
                "Action": "write",
                "RightSourceType": "DirectlyDelegated",
                "IsDelegatable": true,
                "_links": {
                    "delete": {
                        "href": "https://at23.altinn.cloud/api/r50002161/authorization/apprights/ttd/apps-test/195cd92d-43be-460d-91c5-be5a5435b90a"
                    }
                }
            }
        ]
}
```

{{% notice warning  %}}
Merk at dette også inkluderer tjenesterettigheter som innehas som følge av at innlogget bruker innehar en eller flere roller som omfatter den aktuelle tjenesten (indikeres med at RightSourceType er satt til "RoleTypeRights"). Disse enkeltrettighetene kan ikke slettes. For å fjerne disse, må rolletildeling fjernes. 
{{% /notice %}}

{{% notice info  %}}
Tips! For å ikke få med rettigheter som er gitt via en rolle, kan du bruke OData-filtrering. Legg til på slutten av URL-en: `?$filter=RightSourceType ne 'RoleTypeRight'`
{{% /notice %}}


## Slette innlogget bruker sine mottatte roller
Sletter en rolle innlogget bruker har for `{who}` (`r{id}` fra api/reportees, organisasjonsnummer eller brukernavn) ved hjelp av `roleid` fra GET.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/DELETE-who-authorization-roles-roleID).

```HTTP
DELETE https://www.altinn.no/api/{who}/authorization/roles/{rolleid} HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
```

Returnerer tom respons og statuskode/-melding.


## Slette innlogget bruker sine mottatte tjenesterettigheter
Sletter en tjenesterettighet innlogget bruker har for `{who}` (`r{id}` fra api/reportees, organisasjonsnummer eller brukernavn) ved hjelp av `rightid` fra GET rights.

Se beskrivelse på [altinn.no/api/help](https://www.altinn.no/api/Help/Api/GET-who-authorization-roles_language).

```HTTP
DELETE https://www.altinn.no/api/{who}/authorization/rights/{rettighetsid} HTTP/1.1
Host: www.altinn.no
ApiKey: myKey
```
Returnerer tom respons og statuskode/-melding.
