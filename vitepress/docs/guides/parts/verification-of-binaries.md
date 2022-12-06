All binaries are signed by a key that is listed in our [public keyring](https://raw.githubusercontent.com/Metrist-Software/orchestrator/main/dist/trustedkeys.gpg). Our installation instructions always include verify commands, such as:

```
gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc

# where %orch_lastest.asc is the path to one of our binaries
```

Example:

```sh
wget -nc https://raw.githubusercontent.com/Metrist-Software/orchestrator/main/dist/trustedkeys.gpg -O /tmp/metrist.gpg
orch_latest=$(curl https://dist.metrist.io/orchestrator/ubuntu/20.04.x86_64.latest.txt)
wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest
wget https://dist.metrist.io/orchestrator/ubuntu/$orch_latest.asc
gpg --verify --keyring=/tmp/metrist.gpg $orch_latest.asc
```

::: details On warning: “gpg: Can't check signature: No public key”

Note the message: `gpg: Signature made Day ## Month yyyy hh:mm:ss`. This indicates the binary’s signature is valid.

You will also see: `gpg: Can't check signature: No public key`. This is to be expected and indicates that you have not, with your own private key, declared trust in our keyring. Contact us for more information.

[Read about how we sign code](/guides/how-we-sign-code) for more information.
:::
