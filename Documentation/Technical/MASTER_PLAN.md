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

### [2026-02-03 15:15] - 🎉 Misión Cumplida: Círculo Interno Operativo
*   **Workflow de Autorización**: Sistema 100% validado. Registro -> Alerta Real -> Aprobación -> Bienvenida Heroica.
*   **Dashboard de Comando**: Implementación de alertas inteligentes y secciones de prioridad en el Panel Admin.
*   **Terminología**: Ajuste de "Curaduría" a "En espera de autorización" para alinearse con el contexto local (Colombia).
*   **Technical Done**: Registro exhaustivo de soluciones de infraestructura y seguridad en el `ERROR_LOG.md`.

### [2026-02-03 16:15] - 💳 Fase 5: Ritual de Pago e Infraestructura de Pedidos
*   **Gestión de Pedidos**: Creación de tablas `orders` y `order_items` con RLS.
*   **Checkout**: Implementación de la página de pago con resumen de carrito y descuento de miembros.
*   **Logística**: Sistema de cálculo de envío dinámico por ciudad (`shippingService.ts`).
*   **Inventario**: Sincronización de stock automática (resta de unidades tras compra).
*   **Post-Venta**: Automatización de correos de confirmación para el cliente (`sendCustomerOrderEmail`).
*   **Pasarela de Pago**: Integración estructural con `paymentService` (Simulación PoliPay/Integra).

### [2026-02-03 23:00] - 💎 Definición Visual & Garantía Técnica (Logo & UI)
*   **Logo Responsivo ("Elegancia Robusta")**: Implementación de sistema dual:
    *   **Móvil/Tablet**: Renderizado de `logo-completo.png` para garantía visual absoluta y compatibilidad universal.
    *   **PC/Desktop**: Renderizado SVG nativo con fuentes internas (`Papyrus`, `Playfair Display`) corregidas para máxima nitidez vectorial.
*   **Tipografía Embebida**: Integración directa de fuentes clave en Base64 (CSS) para eliminar dependencias externas y asegurar la identidad de marca.
*   **Restauración de UI**: Recuperación crítica de enlaces a *Material Icons* y *Google Fonts* en `index.html`, solucionando fallos de renderizado en iconos de navegación.
*   **Estabilidad**: Recuperación del servidor de desarrollo y validación de despliegue en túnel público `zrok`.

### [2026-02-03 16:30] - 🚀 Fase 6: Optimización SEO & Performance
*   **SEO Dinámico**: Implementación del componente `<SEO />` para gestión de meta-tags, títulos y Open Graph por página.
*   **Performance (Bundle Splitting)**: Migración a `React.lazy` y `Suspense` para carga bajo demanda de rutas, reduciendo el peso inicial del bundle.
*   **Eficiencia Visual**: Implementación de `loading="lazy"` en todo el catálogo de productos y secciones pesadas de imágenes.
*   **Indexación**: Configuración de meta-datos base en `index.html` para mejorar el posicionamiento en buscadores.
*   **Dashboard Admin**: Sistema de gestión de productos y aprobación de usuarios.
*   **Branding Hero**: Perfeccionamiento del "Pop-Out Ring System" (Efecto 3D del anillo).
*   **Túnel Zrok**: Restauración y estabilización del túnel `origen2025` mediante ruta absoluta.

---

## 🗺️ Hoja de Ruta (Next Steps)
1.  [x] **Logística**: Configuración de reglas de envío por ciudad/departamento (`shippingService.ts`).
2.  [x] **Inventario Dinámico**: Sincronización automática de stock tras cada compra (Implementado en `CheckoutPage`).
3.  [x] **Post-Venta**: Automatización del email de confirmación de pago para clientes (`sendCustomerOrderEmail`).
4.  [ ] **Pasarela Real**: Reemplazar simulación por credenciales reales de Redeban/Integra cuando estén disponibles.
5.  [ ] **Dashboard de Usuario**: Visualización de historial de pedidos para clientes.

---

## 📜 Historial de Decisiones (Log)
*   **Decisión**: Migrar de `resend` SDK local a Edge Functions para evitar conflictos con Vite/Browser. (Resultado: Éxito).
*   **Decisión**: Implementar "Pending by Default" en registros para mantener la exclusividad de la marca. (Resultado: Éxito).
*   **Decisión**: Unificar todas las bitácoras en un solo Plan Maestro en la raíz. (Resultado: Cumplido).

---
