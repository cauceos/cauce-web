---
numero: 41
sha: "856b355"
fecha: "2026-09-11"
titulo: "Every audit entry now carries a signature"
tipo: shipped
modulos: ["cauce-governance", "cauce-memory", "cauce-api"]
capitulo: signatures
lang: en
limite: "The JDK can't derive the public key from the private one, so both are configured and the pair self-checks at startup. The signature coverage report stayed internal until unit 42."
---

Ed25519 over the v2 entry hash. The private key lives in process configuration and never touches the database, so a database alone is not enough to forge an entry. The key-id to public-key registry is a file read from outside the database.
