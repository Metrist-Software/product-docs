---
title: Encryption of sensitive data
---

# {{ $frontmatter.title }}

## Introduction

At times, Metrist will store data that you will likely consider to be sensitive. In this document,
we explain how we handle that data. Currently, we consider the following data to be sensitive:

* Any monitor configuration settings, like API keys, you store with us either through our API or through our Web UI. We encrypt
  this data with a monitor-specific random key.
* User email addresses. We encrypt this data with a user-specific random key.
* Your account name. We encrypt this data with an account-specific random key.

Please contact us if your security compliance requires you to have more data classified this way. Note that we may extend this
list at any time without prior notice.

## Encryption in transit

All data communicated to the Metrist application servers is encrypted in transit with TLS 1.2 or better. This is regardless
of whether the data is classified as sensitive or not.

## Encryption at rest

All data classified as sensitive above is encrypted at rest with AES256 in CBC mode, using a random initialization
vector per data item, a random key with scope as indicated above, and using random padding to the cipher's block length.

The random initialization vector is stored with the encrypted data, the random key is stored in Amazon AWS Secrets Manager. The
random key is only accessible by the Metrist backend and by our technical staff.

We use the Erlang [standard cryptography library](https://www.erlang.org/doc/man/crypto.html) for encryption and subsequent decription
of data.

## Destruction of keys

At your request, we will delete any key associated with your account with Metrist. This will irrevocably
and immediately make any sensitive data that you shared with us and got encrypted per the above inaccessible. If you
store new data that falls under this policy after that, a new random key will be generated.

## More information

If you require more information or have comments on this policy, please [contact support](mailto:support@metrist.io).
