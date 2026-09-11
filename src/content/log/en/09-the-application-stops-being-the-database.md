---
numero: 9
sha: "6838a14"
fecha: "2026-06-02"
titulo: "The application stops being the database owner"
tipo: decision
modulos: ["cauce-memory", "cauce-orchestration", "docs/adr"]
capitulo: access
lang: en
limite: "Not a pending item but a standing constraint: every new cross-tenant need requires a new function and a documented reason."
---

It now connects as a least-privilege role with row-level security live at runtime. The background worker's cross-tenant claim goes through narrowly scoped functions, and ADR 0001 fixes those three as the only sanctioned ways out.
