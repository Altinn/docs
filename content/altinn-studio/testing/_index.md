---
title: Testing in Altinn Studio
linktitle: Testing
description: An app can be tested in Altinn Studio without migrating to a test environment. This is a way to check that the app looks and behaves as expected. 
weight: 500
---

Testing is available once a data model has been uploaded to the service. 

1. Select _Test -> Manuell_ in the top navigation menu. 
2. Select a test user from the list of available users.
3. Choose to start a new instance, or to reuse an existing instance (if any are available).
   By using an existing instance, data used in a previous instance can be re-used.

![Test en app i Altinn Studio](runtime-test.gif "Test en app i Altinn Studio")

The following can be tested in Altinn Studio:

- Layout/look of service
- Client-side validations on data model
- Dynamics (f.ex. hide/show)
- Client-side API calls
- Loading of code lists

The following needs to be tested in a complete test environment:

- Server-side logic (validation/calculation)
- Server-side API calls

{{%notice info%}}
Complete test environments are currently not available. The documentation will be updated when it is possible to test a service in a test environment.
{{% /notice%}}


