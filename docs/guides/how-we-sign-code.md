# How We Sign Code

For most, if not all, of our downloads you can download a PGP/GnuPG (GPG) signature by appending `.asc` to the download URL.

This signature can help you to verify that the code you are about to install is indeed the code we published. It is important, however, to realize exactly what is verified so you can work from the correct assumptions. Note that we assume that you know how public key encryption works; for further information on that topic see for example [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography).

Three components are involved in verifying the integrity of our distribution binaries:

* The binary itself;
* The signature;
* The list of PGP keys that are allowed to sign.

Once you download all three and verify the binary (see [our installation documentation](/guides/orchestrator-installation) for details), you should expect output like the following:

```sh
# (Note the details may vary.)

gpg: assuming signed data in 'metrist-orchestrator-0.1.0_amazon_linux_2_60e8415-1.x86_64.rpm'
gpg: Signature made Wed 23 Nov 2022 08:23:38 AM CST
gpg:                using RSA key 1694322BAC8EA0B319D327B21FEB2FDD18CA2320
gpg: Good signature from "Metrist Github Actions Signing Key <support@metrist.io>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 1694 322B AC8E A0B3 19D3  27B2 1FEB 2FDD 18CA 2320
```

There are two important outputs here:

* “Good signature” means that the three items — the list of keys, the signature, and the binary — match. In other words, one of the keys in the keyring you downloaded created the signature as a signature for the binary.
* “WARNING: This key is not certified with a trusted signature!” means that GnuPG does not know for sure that this key is to be trusted.

For GPG, “trust” is a big issue. On the public internet, you delegate trust: you trust your browser vendor, your browser trusts certificate authorities, and they trust people who ask for a certificate. Through that chain of trust — an electronically encoded series of signed declarations (“I declare that…”) — your browser knows that the machine it is talking to is indeed `https://yourbank.com/` and not some hacker that subverted things. GPG does not have that centralized trust model and instead lets the user make their own decisions.

By merely downloading a keyring, you do not tell GPG anything about how much you trust any of the keys on that keyring. It is also technically not needed; this warning is just a reminder that you need to decide whether to trust these keys. A couple of questions come to mind:

_Is this a recent keyring?_

: We (Metrist) may have revoked keys or added new ones in preparation of a regular refresh of our signing keys. We recommend you fetch the keyring each time when you want to verify a download.

_Did it come from a trustworthy source?_

: We store the keyring on Github and signing (typically) happens on Github as well.

: Also, all changes to the keyring are made with signed commits with signing keys in the keyring. The [whole history](https://github.com/Metrist-Software/orchestrator/commits/main/dist/trustedkeys.gpg) is traceable and, if you trust the first commit, you can be sure that the last commit is also trusted.

: As you download the binary from one source — `dist.metrist.io` (on AWS S3) — and the signature from another source, someone would need to subvert two systems to tamper with the data. That should be sufficiently difficult that you can trust everything is alright. **If you need more certainty, two options are avaialable to you:**:

	- [Contact us](mailto:support@metrist.io) and ask for manual verification of the keyring,
	- or, where it concerns an Open Source product like Metrist Orchestrator, you can get the source code and do your own build on a system you trust.
