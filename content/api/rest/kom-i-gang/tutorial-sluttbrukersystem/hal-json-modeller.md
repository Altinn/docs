---
title: HAL+JSON modeller
description: "Hvordan lage JSON modeller for Rights, Roles, og RightHolder"
toc: false
aliases:
weight: 5
categories: [Kom-i-gang veiledninger]
keywords: [autorisasjon, API, REST, integrasjon, HAL+JSON, JSON, System.Text.Json, Rights, Roles, RightHolder]
tags: [REST]
---

Så langt i veiledningen har vi kun håndtert JSON modeller som `System.Text.Json` har hatt innebygd støtte for.
*Hypertext Appplication Language* (HAL) brukes i Altinn 2s REST API for å inkludere lenker og lister av ressurser i responsene.
Lenker er inkludert i `_links` og listen over ressurser er inkludert i `_embedded`. 
For å kunne håndtere listene med roller og rettigheter som autorisasjons APIet returnerer må vi beskrive HAL+JSON modellen og lage en tilpasset konverterer som kan serialisere lister av ressurser.

### RightHolder
`RightHolder` beskriver hvilke rettigheter en avgiver (eng: Reportee) har for en annen aktør.
Modellen er mer kompleks, og inneholder lister av både `Roles` og `Rights` som også må lages.
Alle modellene for Altinn 2s REST API er beskrevet på [API Help](https://altinn.no/api/Help).

[Role](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Models/Role.cs) og [Right](https://github.com/Altinn/altinn2-test-apiclient/blob/main/src/Models/Right.cs) modellene er enkle og vi henviser derfor bare til kodefilene i eksempelprosjektet.
`RightHolder` ser slik ut:
```json
{
    "RightHolderId":"r50828869",
    "Name":"TOM HEIS",
    "LastName":"HEIS",
    "SocialSecurityNumber":"268992*****",
    "Roles":{
        "_links":{
            "self":{
                "href": ".../api/my/authorization/delegations/r50828869/roles"
            }
        },
        "_embedded":{
            "roles":[
                {
                    "RoleType":"Local",
                    "RoleDefinitionId":0,
                    "RoleName":"Single Rights",
                    "RoleDescription":"Collection of single rights",
                    "Delegator":"",
                    "DelegatedTime":"2021-12-01T11:57:43.373",
                    "_links":{
                        "roledefinition":{
                            "href": "...i/my/authorization/roledefinitions/0"
                        }
                    }
                },
                ...
            ]
        }
    },
    "Rights":{
        "_links":{
            "self":{
                "href": "...pi/my/authorization/delegations/r50828869/rights"
                }
            },
        "_embedded":{
            "rights":[
                {
                    "RightID":4371450,
                    "RightType":"Service",
                    "ServiceCode":"4864",
                    "ServiceEditionCode":1,
                    "Action":"Read",
                    "RightSourceType":"DirectlyDelegatedRights",
                    "IsDelegatable":true
                },
                ...
            ]
        }
    },
    "_links":{
        "self":{
            "href": "...altinn.no/api/my/authorization/delegations/r50828869"
        },
        "rights":{
            "href": "...no/api/my/authorization/delegations/r50828869/rights"
        },
        "roles":{
            "href": "....no/api/my/authorization/delegations/r50828869/roles"
        }
    }
}
```
For å håndtere `_embedded` listene har vi valgt å strukturere modellene på så lik måte som mulig.
Det vil si at C#/.Net koden ser slik ut:
```cs
using System.Collections.Generic;
using System.Text.Json.Serialization;

public class RightHolder
{
    [JsonPropertyName("RightHolderId")]
    public string RightHolderId { get; set; }

    [JsonPropertyName("Name")]
    public string Name { get; set; }

    [JsonPropertyName("LastName")]
    public string LastName { get; set; }

    [JsonPropertyName("UserName")]
    public string UserName { get; set; }

    [JsonPropertyName("Email")]
    public string Email { get; set; }

    [JsonPropertyName("SocialSecurityNumber")]
    public string SocialSecurityNumber { get; set; }

    [JsonPropertyName("OrganizationNumber")]
    public string OrganizationNumber { get; set; }

    // A list of existing roles given to the rights holder.
    [JsonPropertyName("Roles")]
    public Roles Roles { get; set; }

    // A list of existing rights given to the rights holder.
    [JsonPropertyName("Rights")]
    public Rights Rights { get; set; }

    // Struct of Roles and Rights lists used when making new delegations.
    [JsonPropertyName("_embedded")]
    public NewDelegations NewDelegations { get; set; }
}

public class Roles
{
    [JsonPropertyName("_embedded")]
    public RolesEmbedded Embedded { get; set; }
}

public class RolesEmbedded
{
    [JsonPropertyName("roles")]
    public List<Role> Roles { get; set; }
}

public class Rights
{
    [JsonPropertyName("_embedded")]
    public RightsEmbedded Embedded { get; set; }
}

public class RightsEmbedded
{
    [JsonPropertyName("rights")]
    public List<Right> Rights { get; set; }
}

public class NewDelegations
{
    [JsonPropertyName("rights")]
    public List<Right> Rights { get; set; }

    [JsonPropertyName("roles")]
    public List<Role> Roles { get; set; }

}
```

#### NewDelegations
Det er verdt å merke seg at vi har inkludert en struktur som heter `NewDelegations`, som ikke var vist i JSON eksempelet over.
Denne er nødvendig når man kaller `POST {who}/authorization/Delegations`.
For dette kallet er dessverre listene over roller og rettigheter strukturert forskjellig fra den modellen som blir returnert fra `GET`.

I neste leksjon skal vi lage en [tilpasset konverterer](/docs/api/rest/kom-i-gang/tutorial-sluttbrukersystem/hal-json-konverterer/) som kan konvertere lister av roller og rettigheter med `System.Text.Json`.
