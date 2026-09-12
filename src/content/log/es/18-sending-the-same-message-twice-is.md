---
numero: 18
sha: "e50786e"
fecha: "2026-07-04"
titulo: "Enviar el mismo mensaje dos veces no duplica nada"
tipo: shipped
modulos: ["cauce-api", "cauce-orchestration"]
capitulo: hardening
lang: es
limite: "Sin huella del cuerpo de la petición y sin purga de retención."
---

Una cabecera de idempotencia opcional: una repetición con la misma clave para el mismo agente devuelve los ids originales y no ingesta nada, sostenida por un bloqueo insert-first sobre una restricción de unicidad.
