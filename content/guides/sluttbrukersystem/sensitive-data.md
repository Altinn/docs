---
title: Sensitive data
description: Beskrivelse av hvilken funksjonalitet som finnes med referanser til hvilke web services som benyttes
weight: 970
---

{{< figure src="/docs/images/guides/sluttbrukersystemer/sensitive-data.png" title="">}}

Kodeeksempler for innsending av sensitiv data
----------------

Kodeeksempel på generering av nøkkel i Java ved hjelp av Bouncy Castle
----------------

```xml
private static final String SYMMETRIC\_ALGORITHM = "AES";
private static final int KEY\_SIZE = 128;
keyGenerator = KeyGenerator.getInstance(SYMMETRIC\_ALGORITHM);
keyGenerator.init(KEY\_SIZE);
byte \[\] symmetricKey =
Base64.encode(keyGenerator.generateKey().getEncoded());
```

Kodeeksempel på kryptering av symmetrisk nøkkel ved hjelp av PKI
----------------

```xml
byte \[\] SO\_Certificate = Base64.decode(certificateValue);
X509certificate= (X509Certificate)
certificateFactory.generateCertificate(new
ByteArrayInputStream(SO\_Certificate));
PublicKey rsaPublicKey= X509certificate.getPublicKey();
encryptCipher.init(Cipher.ENCRYPT\_MODE, rsaPublicKey);
bytesOIDandSymmetricKeyEncryptedWithCertificate =
encryptCipher.doFinal(symmetricKey);
byte \[\] tempCertificateValue =
Base64.encode(bytesOIDandSymmetricKeyEncryptedWithCertificate);
certificateValue= new String(tempCertificateValue);
```

Kodekesempel på kryptering av symmetrisk nøkkel ved hjelp av password
---------------------------------------------------------------------

```xml
private static final String MESSAGE\_DIGEST\_ALGORITHM = "MD5";
byte\[\] messageDigestOfPassword = new byte\[PASSWORD.length()\];
char\[\] password = PASSWORD.toCharArray();
MessageDigest messageDigest = MessageDigest.getInstance(MESSAGE\_DIGEST\_ALGORITHM);
for(int i = 0; i &lt; password.length; i++){
messageDigest.update((byte) password\[i\]);
} messageDigestOfPassword = messageDigest.digest();
symmetricPasswordKey = new SecretKeySpec(messageDigestOfPassword,
SYMMETRIC\_ALGORITHM);
Cipher encryptCipher =Cipher.getInstance(SYMMETRIC\_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT\_MODE, symmetricPasswordKey);
byte \[\] enSyKeyPwd = encryptCipher.doFinal(Base64.decode(symmetricKey));
byte \[\] tempSymmetricKeyEncryptedWithPassword = Base64.encode(enSyKeyPwd);
symmetricKeyEncryptedWithPassword = new String(tempSymmetricKeyEncryptedWithPassword);
```

Kodeeksempel på kryptering av skjemadata
----------------------------------------

```xml
Cipher encryptCipher =Cipher.getInstance(SYMMETRIC\_ALGORITHM);
encryptCipher.init(Cipher.ENCRYPT\_MODE, new
SecretKeySpec(symmetricKey,SYMMETRIC\_ALGORITHM));
byte\[\] encryptedData = null;
encryptedData=encryptCipher.doFinal(formDataOutPut.getBytes());
byte \[\] tempformDataOutPut = Base64.encode(encryptedData);
formDataOutPut= new String(tempformDataOutPut);
```

Eksempel på skjema data med sensitive felt
----------------

```xml
&lt;my:myFields xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:my="http://schemas.microsoft.com/office/infopath/2003/myXSD/2010-06-01T08:11:58"
xmlns:xd="http://schemas.microsoft.com/office/infopath/2003"
xml:lang="nb-NO"&gt;
&lt;my:txtFName&gt;Rune&lt;/my:txtFName&gt;
&lt;my:txtMName&gt;Tømmerås&lt;/my:txtMName&gt;
&lt;my:txtLName&gt;Larsen&lt;/my:txtLName&gt;
&lt;my:dpDOB&gt;1975-07-03&lt;/my:dpDOB&gt;
&lt;my:dpDOJ&gt;2005-10-10&lt;/my:dpDOJ&gt;
&lt;my:txtDept&gt;1005&lt;/my:txtDept&gt;
&lt;my:txtLoc&gt;Oslo&lt;/my:txtLoc&gt;
&lt;my:txtTower /&gt;
&lt;my:txtFloor /&gt;
&lt;my:txtBay /&gt;
&lt;my:txtWorkSN /&gt;
&lt;my:txtFN&gt;8Qgnh6BPUq7OmigGSm8Vvg==&lt;/my:txtFN&gt;
&lt;my:txtDp&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtDp&gt;
&lt;my:txtWN&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtWN&gt;
&lt;my:txtSignView&gt;eSJAxnzWAx2B71/YWkri8g==&lt;/my:txtSignView&gt;
&lt;my:dpDJ&gt;2W6ID+y4Hr4hyYo7FpDyiw==&lt;/my:dpDJ&gt;
&lt;my:txtFirst /&gt;
&lt;my:txtMiddle /&gt;
&lt;my:txtLast /&gt;
&lt;my:dpDateOfBirth xsi:nil="true" /&gt;
&lt;my:dpDateOfJoining xsi:nil="true" /&gt;
&lt;my:txtDepartment /&gt;
&lt;my:txtLocation /&gt;
&lt;my:txtTowerPV /&gt;
&lt;my:txtFloorPV /&gt;
&lt;my:txtBayPV /&gt;
&lt;my:txtWStaPV /&gt;
&lt;my:txtPrintView /&gt;
&lt;my:dpDOJRV xsi:nil="true" /&gt;
&lt;my:txtDeptRV /&gt;
&lt;my:txtLocRV /&gt;
&lt;my:txtTowerRV /&gt;
&lt;my:txtFloorRV /&gt;
&lt;my:txtBayRV /&gt;
&lt;my:txtWSRV /&gt;
&lt;my:txtReceiptView /&gt;
&lt;my:field1 /&gt;
&lt;/my:myFields&gt;
```

------------