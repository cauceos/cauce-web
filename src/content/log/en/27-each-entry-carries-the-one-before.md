---
numero: 27
sha: "7f09be7"
fecha: "2026-07-25"
titulo: "Each entry carries the one before it"
tipo: shipped
modulos: ["cauce-governance", "cauce-memory"]
capitulo: chain
lang: en
limite: "Signing still reserved, and with it the documented residual: a privileged attacker who recomputes the whole chain and rewrites the head is not detectable by recomputation alone."
---

A hash chain per tenant, with a head row as the single source of sequence. Alter an old entry and every link after it stops matching; the verifier reports the exact sequence where it first breaks.
