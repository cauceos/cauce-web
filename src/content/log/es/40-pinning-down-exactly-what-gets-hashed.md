---
numero: 40
sha: "94de4c0"
fecha: "2026-09-11"
titulo: "Fijar exactamente qué entra en el hash"
tipo: shipped
modulos: ["cauce-governance"]
capitulo: signatures
lang: es
limite: "Un esquema desconocido se reportaba como entrada malformada, lo cual inducía a error. Corregido en la unidad 42. La especificación de la preimagen vive en Javadoc, no en docs."
---

El id entra en la preimagen, los timestamps se serializan con precisión fija de microsegundos y las cadenas de texto se normalizan a NFC, de modo que la misma entrada produce el mismo hash en todas partes. Las entradas antiguas no se recalculan; el verificador bifurca según el esquema que declara cada fila.
