---
numero: 26
sha: "848b936"
fecha: "2026-07-25"
titulo: "Captura que no se puede saltar"
tipo: shipped
modulos: ["cauce-governance", "cauce-memory"]
capitulo: chain
lang: es
limite: "Columnas de cadena creadas reservadas y a null. Todavía sin emisores reales."
---

Un outbox escrito dentro de la propia transacción de negocio de quien llama, y un ledger de solo anexado donde update y delete están revocados para el rol de base de datos de la aplicación. Si el hecho de negocio hace commit, su registro de auditoría hace commit con él.
