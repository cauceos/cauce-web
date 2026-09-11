---
numero: 25
sha: "82a1795"
fecha: "2026-07-25"
titulo: "A ledger of what each tenant spent"
tipo: shipped
modulos: ["cauce-orchestration", "cauce-memory"]
capitulo: operability
lang: en
limite: "Cost deliberately not materialised — pricing will be a versioned table and a view. No query endpoint, no aggregations."
---

One immutable row per LLM call, written synchronously before the response event is published. If the ledger insert fails, the invocation fails.
