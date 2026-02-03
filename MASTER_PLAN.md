# 🗺️ Plan Maestro de Implementación: Origen Sierra Nevada

Este es el documento central de verdad única para el proyecto. Consolida la visión estratégica, el estado técnico de Supabase y el progreso diario.

---

## 📊 Estado del Proyecto (Gobernanza)
*   **Visión**: Experiencia de café premium y curaduría exclusiva desde la Sierra Nevada de Santa Marta.
*   **Tecnología**: React 19 + Vite + TypeScript + Supabase.
*   **Acceso Público**: [https://origen2025.share.zrok.io](https://origen2025.share.zrok.io)

---

## ✅ Infraestructura y Conexión (Consolidado)
### 1. Base de Datos (Supabase)
*   **Proyecto ID**: `jbujautfyhiwbcpzbhor`
*   **Estado**: **OPERATIVO Y VERIFICADO**.
*   **Tablas Activas**: 
    *   `profiles`: Gestión de usuarios, roles (admin/user) y estados de aprobación.
    *   `products`: Catálogo real con soporte multilingüe (ES/EN) y gestión de stock.
*   **Seguridad**: Row Level Security (RLS) habilitado para proteger datos sensibles y brandbook.

### 2. Comunicaciones (Email Engine)
*   **Tecnología**: Supabase Edge Functions + Resend API.
*   **Función**: `send-email` (Desplegada).
*   **Templates**: Bienvenida al "Ritual" personalizada con branding premium.

---

## 🛠️ Registro de Avances Recientes (Timeline)

### [2026-02-03] - Estabilización e Infraestructura Real
*   **Sincronización de Red**: Solución definitiva al error "Bad Gateway" mediante unificación de puertos (5173).
*   **Migración de Datos**: El catálogo ahora consume datos 100% reales desde Supabase.
*   **Edge Functions**: Activación del motor de correos para registros de nuevos socios.
*   **Limpieza de Proyecto**: Consolidación de bitácoras y eliminación de archivos basura/huérfanos.

### [2026-02-02] - Seguridad y Experiencia de Usuario
*   **Módulo Legal**: Implementación de Cookie Banner (Habeas Data) y Checkbox de términos.
*   **Dashboard Admin**: Sistema de gestión de productos y aprobación de usuarios.
*   **Branding Hero**: Perfeccionamiento del "Pop-Out Ring System" (Efecto 3D del anillo).
*   **Túnel Zrok**: Lanzamiento de la reserva `origen2025`.

---

## 🗺️ Hoja de Ruta (Next Steps)
1.  [ ] **Pasarela de Pagos**: Integración con PoliPay / Integra.
2.  [ ] **Admin UI**: Pulido final de filtros en el gestor de productos.
3.  [ ] **Pruebas de Estrés**: Simulación de carga masiva de usuarios y validación de seguridad.
4.  [ ] **SEO & Performance**: Optimización de imágenes y meta-tags para buscadores.

---

## 📜 Historial de Decisiones (Log)
*   **Decisión**: Migrar de `resend` SDK local a Edge Functions para evitar conflictos con Vite/Browser. (Resultado: Éxito).
*   **Decisión**: Implementar "Pending by Default" en registros para mantener la exclusividad de la marca. (Resultado: Éxito).
*   **Decisión**: Unificar todas las bitácoras en un solo Plan Maestro en la raíz. (Resultado: Cumplido).

---
