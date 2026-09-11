---
numero: 9
sha: "6838a14"
fecha: "2026-06-02"
titulo: "La aplicación deja de ser la dueña de la base de datos"
tipo: decision
modulos: ["cauce-memory", "cauce-orchestration", "docs/adr"]
capitulo: access
lang: es
limite: "No es un pendiente sino una restricción permanente: cada nueva necesidad entre tenants exige una función nueva y una razón documentada."
---

Ahora se conecta como un rol de mínimo privilegio con row-level security activa en tiempo de ejecución. La reclamación entre tenants del worker en segundo plano pasa por funciones de ámbito estrecho, y el ADR 0001 fija esas tres como las únicas salidas sancionadas.
