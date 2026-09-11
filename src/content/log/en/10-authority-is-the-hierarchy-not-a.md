---
numero: 10
sha: "9e77dfc"
fecha: "2026-06-02"
titulo: "Authority is the hierarchy, not a permission table"
tipo: decision
modulos: ["cauce-api", "cauce-tenancy", "docs/adr"]
capitulo: access
lang: en
limite: "No roles and no scopes. Still true today."
---

Real key authentication on every route: which tenant you are comes from the validated key, never from a header. Keys are hashed with a pepper. ADR 0002 fixes that authority *is* the visibility relation the database already enforces.
