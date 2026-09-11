---
numero: 40
sha: "94de4c0"
fecha: "2026-09-11"
titulo: "Pinning down exactly what gets hashed"
tipo: shipped
modulos: ["cauce-governance"]
capitulo: signatures
lang: en
limite: "An unknown scheme was reported as a malformed entry, which is misleading. Fixed in unit 42. The preimage spec lives in Javadoc, not in docs."
---

The id enters the preimage, timestamps serialise at fixed microsecond precision and strings normalise to NFC, so the same entry hashes the same everywhere. Older entries aren't recomputed; the verifier branches on the scheme each row declares.
