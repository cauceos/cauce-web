---
numero: 23
sha: "440bd0e"
fecha: "2026-07-17"
titulo: "Listas que no se caen a escala"
tipo: breaking
modulos: ["cauce-api", "cauce-memory"]
capitulo: operability
lang: es
limite: "El listado de claves de API se quedó fuera del contrato y sigue devolviendo un array desnudo."
---

Paginación por keyset sobre el id ordenado en el tiempo, un sobre uniforme en todos los endpoints de listado. Una ruptura de contrato respecto a los arrays desnudos que había antes.
