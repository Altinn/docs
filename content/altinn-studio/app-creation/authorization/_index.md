---
title: Define authorization rules
linktitle: Authorization
description: How to define the authorization rules for a application
weight: 200
---

Authorization rules for a App is defined as a XACML Policy file defined in the application repository.

The XACML Policy contains one or many rules that defines who can perform a given operation on different resources.

[See XACML structure for details how rules are defined](https://docs.altinn.studio/architecture/security/authorization/altinn-apps/app/xacmlpolicy/)

The XACML file can by modified by any editor. 

## Modifying Template Rules
The current asp.net template contians a XACML Policy file that is created when a new app is created in Altinn Studio


### Modifying required roles
The standard XACML files is defined so that the managing director (DAGL) can perform the operation. This role code needs to be change to the correct one depending on user scenario.

See details on how to configure which role or org that can perform a operation [here](https://docs.altinn.studio/architecture/security/authorization/altinn-apps/app/xacmlpolicy/)


### Modifying authentication level
The needed authentication level is defined like a obligation in the XACML policy. See [XACML documentation for Altinn Apps](https://docs.altinn.studio/architecture/security/authorization/altinn-apps/app/xacmlpolicy/) to see how that is configured. 




