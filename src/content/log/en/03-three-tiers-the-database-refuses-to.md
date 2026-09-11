---
numero: 3
sha: "220b577"
fecha: "2026-05-21"
titulo: "Three tiers the database refuses to mix"
tipo: shipped
modulos: ["cauce-core", "cauce-memory", "cauce-tenancy"]
capitulo: isolation
lang: en
limite: "The provider field was a free string validated against a hardcoded set, waiting for the contract that arrived in unit 5."
---

Operator, partner, client — with visibility enforced by row-level security where each entity's rule calls its parent's. Forgetting a filter cannot leak another tenant's rows, because the database will not return them.
