---
numero: 41
sha: "856b355"
fecha: "2026-09-11"
titulo: "Cada entrada de auditoría lleva ahora una firma"
tipo: shipped
modulos: ["cauce-governance", "cauce-memory", "cauce-api"]
capitulo: signatures
lang: es
limite: "El JDK no puede derivar la clave pública a partir de la privada, así que se configuran ambas y el par se autocomprueba al arrancar. El informe de cobertura de firmas se quedó interno hasta la unidad 42."
---

Ed25519 sobre el hash v2 de la entrada. La clave privada vive en la configuración del proceso y nunca toca la base de datos, así que una base de datos por sí sola no basta para falsificar una entrada. El registro de id de clave a clave pública es un fichero que se lee desde fuera de la base de datos.
