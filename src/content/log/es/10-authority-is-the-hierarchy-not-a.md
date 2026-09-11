---
numero: 10
sha: "9e77dfc"
fecha: "2026-06-02"
titulo: "La autoridad es la jerarquía, no una tabla de permisos"
tipo: decision
modulos: ["cauce-api", "cauce-tenancy", "docs/adr"]
capitulo: access
lang: es
limite: "Sin roles y sin scopes. Sigue siendo cierto hoy."
---

Autenticación real por clave en cada ruta: qué tenant eres sale de la clave validada, nunca de una cabecera. Las claves se hashean con un pepper. El ADR 0002 fija que la autoridad *es* la relación de visibilidad que la base de datos ya impone.
