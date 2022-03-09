---
title: Hente ut liste over apprettigheter
weight: 200
---
Denne siden beskriver hvordan Altinn kan brukes til å hente ut liste over rettigheter en bruker har på vegne av andre

## Hente ut apprettigheter

Hente ut alle apprettigheter en person `{subject}` har for en annen person eller organisasjon `{reportee}` på tjenester som tilhører autentisert tjenesteeier.

```HTTP
GET https://www.altinn.no/api/serviceowner/authorization/apprights?ForceEIAuthentication&subject={subject}&reportee={reportee} HTTP/1.1
Accept: application/hal+json
ApiKey: myKey
```

Eksempel på respons:

```JSON
 {
    "Subject": {
        "Name": "MUHAMMAD HUSEBØ",
        "Type": "Person",
        "SocialSecurityNumber": "{subject}"
    },
    "Reportee": {
        "Name": "NAMSSKOGAN OG GARDVIK REGNSKAP",
        "Type": "Enterprise",
        "OrganizationNumber": "{reportee}",
        "OrganizationForm": "AS",
        "Status": "Active"
    },
    "AppRights": [
        {
            "RuleGuid": "",
            "AltinnAppId": "ttd/access-control-app",
            "ResourceId": "urn:altinn:task",
            "ResourceValue": "Task_1",
            "Action": "write",
            "RightSourceType": "RoleTypeRight",
            "IsDelegatable": true
        },
        {
            "RuleGuid": "a9e683be-86ac-4935-99e2-62ed6f411018",
            "AltinnAppId": "ttd/app-issue",
			"ResourceId": "urn:altinn:task",
            "ResourceValue": "Task_1",
            "Action": "read",
            "RightSourceType": "DirectlyDelegated",
            "IsDelegatable": true
        },
		{
            "RuleGuid": "e5d3ea01-1f08-47d1-9475-13d9aa1f95b1",
            "AltinnAppId": "ttd/app-issue",
			"ResourceId": "urn:altinn:task",
            "ResourceValue": "Task_1",
            "Action": "write",
            "RightSourceType": "DirectlyDelegated",
            "IsDelegatable": true
        },
		{
            "RuleGuid": "",
            "AltinnAppId": "ttd/app-insight",
            "ResourceId": "urn:altinn:end-event",
            "ResourceValue": "EndEvent_1",
            "Action": "read",
            "RightSourceType": "RoleTypeRight",
            "IsDelegatable": true
        }
    ],
    "_links": {
        "self": {
            "href": "https://www.altinn.no/api/serviceowner/authorization/apprights?subject={subject}&reportee={reportee}"
        }
    }
}
```
