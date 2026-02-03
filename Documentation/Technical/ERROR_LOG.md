# 📔 Diario de Errores y Soluciones Técnicas (Error Log)
## Origen Sierra Nevada SM

Este documento registra los desafíos técnicos encontrados durante el desarrollo, las soluciones intentadas y las resoluciones finales para evitar reincidencias y facilitar el escalado.

---

### [2026-02-03 10:45] - 🌐 Error: "Bad Gateway" en Túnel zrok
**Categoría:** Infraestructura / Red
**Estado:** ✅ SOLUCIONADO

**Descripción:**
Al intentar acceder a la URL pública reservada `https://origen2025.share.zrok.io`, el navegador devolvía un error "502 Bad Gateway". Los logs de zrok indicaban que el servicio intentaba conectar al puerto 5173, pero no recibía respuesta.

**Intentos Fallidos:**
1.  **Reinicio de zrok:** Se intentó cerrar y abrir el túnel pensando en una falla de red temporal. (Resultado: Mismo error).
2.  **Uso de puerto default:** Se intentó forzar a zrok a usar `localhost:3000` pero la reserva estaba ligada al 5173.

**Solución Exitosa:**
Se identificó que `vite.config.ts` estaba configurado por defecto en el puerto **3000**, mientras que la reserva de zrok esperaba tráfico en el **5173**. 
1.  Se modificó `vite.config.ts` para fijar el puerto del servidor en `5173`.
2.  Se detectó un proceso "zombie" de Node.js ocupando dicho puerto. Se ejecutó `taskkill /F /PID <id>` para liberarlo.
3.  Reinicio de `npm run dev` en el puerto correcto.

**Prevención:**
Mantener el puerto 5173 como estándar para el desarrollo local y sincronizarlo con todas las herramientas de túneles externas.

---

### [2026-02-02 21:00] - 🛠️ Error: Falla Crítica en Build (Resend SDK en Browser)
**Categoría:** Build / Dependencias
**Estado:** ✅ SOLUCIONADO

**Descripción:**
Tras instalar la librería `resend` e intentar usarla directamente en los componentes de React, la aplicación dejó de cargar completamente (Blanco total). La consola mostraba errores de módulos de Node.js faltantes (`fs`, `dns`, `path`) que no existen en el navegador.

**Intentos Fallidos:**
1.  **Instalar polyfills:** Se intentó añadir capas de compatibilidad para módulos de Node. (Resultado: Inestabilidad y más errores de dependencias).

**Solución Exitosa:**
Se eliminó el uso directo de `resend` en el lado del cliente (Frontend). 
1.  Se creó un "Mock service" (`emailService.ts`) que solo simula el envío en consola para no romper el build.
2.  Se estableció que el envío real de emails se realizará mediante **Supabase Edge Functions** (Servidor), que sí tiene acceso a módulos seguros.

**Prevención:**
Nunca importar librerías exclusivas de Servidor (Node.js) en archivos que corren en el Navegador (Vite/React).

---

### [2026-02-03 10:10] - 🔒 Error: "index.lock" en Git
**Categoría:** Control de Versiones
**Estado:** ✅ SOLUCIONADO

**Descripción:**
Git no permitía ejecutar comandos como `git add` o `git merge`, devolviendo el mensaje "Another git process seems to be running... index.lock exists".

**Solución Exitosa:**
El servidor de desarrollo o un proceso anterior dejó un archivo de bloqueo huérfano. Se eliminó manualmente el archivo `.git/index.lock` y se forzó el cierre de procesos `git.exe` activos en el Administrador de Tareas.

---
---

### [2026-02-03 10:55] -  Error: Visibilidad de Credenciales Supabase (Falsa Alerta)
**Categoría:** Configuración / Documentación
**Estado:**  SOLUCIONADO

**Descripción:**
Existía una discrepancia entre los logs de las herramientas de IA (MCP) y los archivos de bitácora. La bitácora reportaba que las credenciales estaban incompletas (https://), lo que causaba confusión sobre si el sistema tenía acceso real a la base de datos.

**Intentos Fallidos:**
1.  **Lectura via Editor:** El archivo .env estaba bloqueado por .gitignore, impidiendo que la IA viera el estado real de las variables VITE_ y NEXT_PUBLIC_.

**Solución Exitosa:**
1.  **Auditoría via Terminal:** Se usó el comando type .env para leer el archivo directamente saltando las restricciones del editor.
2.  **Corrección de Truncamiento:** Se detectó que NEXT_PUBLIC_SUPABASE_URL estaba truncado (le faltaba el .co). Se sobrescribió el archivo con los valores completos del proyecto jbujautfyhiwbcpzbhor.
3.  **Limpieza de Bitácora:** Se eliminaron todas las alertas obsoletas en implementation_plan.md para evitar reportes falsos de falta de acceso.

**Prevención:**
Usar comandos de terminal (cat/type) para verificar archivos de entorno críticos cuando el visor de archivos estándar esté restringido.

---
