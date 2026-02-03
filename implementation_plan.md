# Integración Supabase - Origen Sierra Nevada

Implementación completa de autenticación con Supabase, Panel Administrativo y Experiencia de Usuario Premium.

## Status Update: February 02, 2026 (Night)
**Reporte de Avances - Seguridad, Emails & Gestión Dinámica**

### 1. Sistema Administrativo (`/admin`) ✅
*   **Dashboard Implementado**: Diseñado `AdminDashboard.tsx` con accesos rápidos a Productos y Brandbook.
*   **Gestor de Productos**: Creado `ProductManager.tsx` para la futura carga de inventario (CRUD).
*   **Autenticación Robusta**:
    *   **Login Refinado**: `LoginPage.tsx` rediseñado para ser acogedor ("Bienvenido al Ritual"), no intimidante.
    *   **Registro Completo**: `RegisterPage.tsx` creado capturando Nombre, Teléfono y Email.
    *   **Roles**: Lógica de verificación de roles (`checkIsAdmin`) lista para diferenciar clientes de admins.

### 2. Cumplimiento Legal (Habeas Data) ✅
*   **Consentimiento en Registro**: Checkbox obligatorio para Términos y Política de Privacidad.
*   **Cookie Banner**: Componente `CookieBanner.tsx` implementado:
    *   Diseño no intrusivo (Glassmorphism).
    *   Opción Aceptar/Configurar.
    *   Persistencia en `localStorage`.

### 3. Experiencia Visual (Hero & Branding) ✅
*   **Pop-Out Ring System V2**: Perfeccionado el efecto 3D del anillo en el Home. Se ajustaron las máscaras (`clip-path`) para que las capas se fundan invisiblemente.
*   **Identidad de Marca**:
    *   Actualizado el Footer con logos oficiales en lugar de texto.
    *   Fechas corregidas: **EST. 2025** (Fundación) y **© 2026** (Año actual).

### 4. Infraestructura ✅
*   **Zrok Tunneling**: Túnel estable (`https://jyus1vkso3x9.share.zrok.io`) permitiendo auditoría externa en tiempo real.

---

## 🗺️ DAY TASK: Ruta de Trabajo del Día (02 Feb)

Esta es la ruta trazada para la sesión de hoy. Nos enfocaremos en cerrar el ciclo funcional del usuario.

### Completado (Done) ✅
1.  **Auditoría Externa**: Levantar túnel Zrok para compartir progreso.
2.  **Correcciones Visuales**:
    *   [x] Home: Arreglar solapamiento del anillo (Pop-out seam).
    *   [x] Login: Cambiar textos restrictivos por bienvenida elegante.
    *   [x] Footer: Actualizar años y logos.
3.  **Módulo Legal & Ético**:
    *   [x] Crear Banner de Cookies (Glassmorphism).
    *   [x] Agregar Checkbox legal en Registro.
    *   [x] **Sistema de Blindaje Anti-Fraude**: Reporte categorizado de usuarios sospechosos.
4.  **Sistema de Usuarios & Control de Acceso**:
    *   [x] Crear página de Registro (`/register`) con campos extra.
    *   [x] **Curaduría de Membresía**: Proceso de validación proactiva presentado como control de calidad y exclusividad.
    *   [x] **Directorio Dinámico (Soft Delete)**: Sistema de archivos para usuarios borrados/bloqueados sin pérdida de datos forenses.
    *   [x] **Alertas de Antecedentes**: Badge visual para detectar reincidentes.
5.  **Comunicaciones Transaccionales (Refinadas)**:
    *   [x] **Integración Resend API**: Sistema profesional de envío de correos.
    *   [x] **Experiencia de Origen Email**: Correo de bienvenida con tono sutil y acogedor.
    *   [x] **Admin Alerts**: Notificaciones de actividad para gestión de curaduría.

### Pendiente / En Curso (To-Do) 🚧
1.  **Conexión Base de Datos**: Migrar de Mock DB a Supabase real para la tabla `products`.
2.  **Infraestructura de Email**: Implementar Edge Functions para envío de correos seguro (reemplazar MOCK actual).
3.  **Seguridad**: Pruebas de estrés en el flujo de aprobación/bloqueo.
4.  **UI Admin**: Pulido final del gestor de productos (filtros y búsqueda).

### Logros de Hoy (Resumen de Cierre) ✅
*   [x] **Refinamiento de Marca**: Evolución del tono de "Seguridad" a "Curaduría Exclusiva". ✨
*   [x] **Arquitectura de Datos**: Restauración total del sistema de tipos (Suscripción, Guías, IA Lab).
*   [x] **Soporte Multilingüe**: Implementación de lógica dinámica para Catálogo y Home (ES/EN).
*   [x] **Blindaje de Build**: Solución de conflictos de dependencias Node.js en el cliente.
*   [x] **Comunicaciones**: Configuración base de Resend (Modo Mock para estabilidad).

---

## User Review Required

> [!IMPORTANT]
> **Próximo Paso Crítico**: Necesitamos confirmar que tienes acceso al Dashboard Administrativo con tu usuario (`manuel78pertuz@gmail.com`). Una vez dentro, validaremos que la tabla de productos se pueda crear desde el panel o script SQL.

---

## Proposed Changes (Next Steps)

### Base de Datos Supabase (Pendiente)

#### Esquema SQL `products`
```sql
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  region text default 'Sierra Nevada',
  roast_level text check (roast_level in ('light', 'medium', 'dark')),
  image_url text, -- URL de Storage
  stock_quantity integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Solo admins pueden escribir, todos pueden leer
alter table public.products enable row level security;
create policy "Public read products" on public.products for select using (true);
create policy "Admin insert products" on public.products for insert with check (public.check_if_admin() = true);
create policy "Admin update products" on public.products for update using (public.check_if_admin() = true);
```

### Standardized Hero Presentation ("Pop-Out Ring System")

> [!NOTE]
> **Guidelines for Administrators:**
> The "Pop-Out" effect relies on a perfect PNG cutout. When uploading new products via the `ProductManager`, ensure images are:
> 1.  Centered.
> 2.  Transparent background.
> 3.  Tall enough to break the top circle boundary.


---

## 📜 Bitácora de Proyecto (Project Log)

### [2026-02-02 14:55] - Definición de Gestión de Usuarios
**Acción:** Requerimiento de funcionalidad administrativa crítica.
**Detalle:** 
El administrador requiere control total sobre la base de usuarios. Se establece que:
1.  Todo registro nuevo es rol `user` por defecto.
2.  El administrador puede ascender usuarios a `admin` (dueño/colaborador) o eliminarlos.
3.  Implementación de módulo CRUD de usuarios.

**Plan de Ejecución:**
1.  Actualizar `authService` para permitir listar todos los perfiles (requiere permisos de admin en RLS).
2.  Crear componente `UserManager.tsx` para visualizar tabla de usuarios.
3.  Agregar controles de "Ascender a Admin" y "Eliminar Usuario".
4.  Integrar acceso en `AdminDashboard.tsx`.

**Estado:** ✅ Completado

### [2026-02-02 15:15] - Definición de Experiencia de Cliente (User Dashboard)
**Acción:** Creación del "Customer Area".
**Detalle:** 
Un usuario registrado necesita percibir valor inmediato. Se define el Panel de Cliente con:
1.  **Identidad:** Gestión de perfil y preferencias de consumo.
2.  **Transaccional:** Historial de pedidos y facturas.
3.  **Fidelización:** Visualización de beneficios (descuentos, nivel).
4.  **Navegación:** Acceso directo desde el Navbar logueado (`/account`).

**Estado:** ✅ Completado

### [2026-02-02 15:30] - Implementación de Catálogo y Precios Dinámicos
**Acción:** Creación de `CatalogPage` e integración de beneficios.
**Detalle:**
1.  **Catálogo Visual:** Grid de productos con filtrado (Café, Accesorios, etc.).
2.  **Lógica de Precios:** Detección de sesión de usuario para aplicar 10% OFF automático.
    *   *Guest:* Precio Full.
    *   *User:* Precio Promo + Precio Full tachado.
3.  **UX:** Etiquetas de "Precio Socio" para reforzar el valor de la membresía.

**Estado:** ✅ Completado

### [2026-02-02 15:40] - Cierre de Sesión: Ecosistema de Usuario
**Resumen:** Se ha completado el ciclo de vida del usuario registrado.
1.  **Registro y Login:** Funcionales con validación y UX mejorada.
2.  **Panel de Cliente:** Espacio VIP con acceso a beneficios legales y de compra.
3.  **Economía Dinámica:** El sistema ahora reconoce al usuario y aplica descuentos automáticamente en todo el sitio (`/catalog` y Home).
4.  **Gestión Administrativa:** El superusuario puede ver y gestionar el staff desde `/admin/users`.

**Próximos Pasos (Mañana):**
### [2026-02-02 17:30] - Sistema de Compras y Refinamiento Visual
**Acción:** Implementación completa del flujo de carrito y pulido estético.
**Detalle:**
1.  **Cart System (Carrito):**
    *   Implementado `CartContext.tsx` con persistencia local.
    *   Drawer lateral funcional en `Navbar.tsx`.
    *   Limpieza de datos "fantasmas" (mock data eliminada).
2.  **UX Móvil:**
    *   Análisis y optimización de vistas en dispositivos móviles.
    *   Ajuste de solapamiento de imágenes en Hero Section.
3.  **Identidad Visual:**
    *   Cambio de terminología técnica ambigua ("Terroir" -> "Tipo de Suelo").
    *   Generación e integración de activos visuales personalizados (Imagen Modal con cascada Minca).
    *   Corrección de consistencia de marca (eliminación de imágenes de stock genéricas).

**Estado:** ✅ Completado

**Estado:** ✅ Completado

### [2026-02-02 21:00] - Blindaje de Seguridad y Control de Acceso V2
**Acción:** Implementación de protocolos de seguridad y auditoría en el Directorio.
**Detalle:**
1.  **Reporte de Cumplimiento:**
    *   Categorización de infracciones: Fraude, Estafa, Extorsión, Uso Indebido.
    *   Motivos administrativos: Usuario de Prueba, Inactividad (+1 año).
2.  **Workflow de Autorización:**
    *   Nueva política: "Pending by Default". Los registros no acceden hasta que un Admin los aprueba manualmente.
    *   Interfaz de Aprobación rápida integrada en la tabla de usuarios.
3.  **Sistema de Archivo (Soft Delete):**
    *   Icono de eliminación que oculta usuarios del panel principal pero mantiene registros permanentes para cumplimiento legal.
    *   Filtro "Ver Archivos" para auditorías de historial.
4.  **Inteligencia Preventiva:**
    *   Badge de **ALERTA** para identificar instantáneamente a usuarios con antecedentes de seguridad durante el scroll del directorio.

**Próximos Pasos (Inmediato):**
1.  Conectar Base de Datos Real (Susituir Mock Data de Productos).
2.  Pasarela de Pagos (PoliPay / Integra).
3.  Pruebas de estrés de seguridad en el flujo de aprobación.

**Historial Reciente:**
### [2026-02-02 21:40] - Cierre de Sesión: Estabilidad y Alineación de Marca
**Acción:** Restauración técnica y pulido de experiencia de usuario.
**Detalle:**
1.  **Rescate de Build:** Se neutralizaron dependencias de Node.js incompatibles con el navegador (Resend SDK), manteniendo la lógica lista para Edge Functions.
2.  **Unificación de Tipos:** Se reconstruyó el núcleo de interfaces para asegurar que todas las secciones (Suscripción, Guías, Lab) funcionen sincronizadas.
3.  **Localización:** El catálogo ahora es 100% dinámico, alternando entre ES y EN de forma fluida.
4.  **Ritual de Bienvenida:** El flujo de registro ahora es cálido y aspiracional, alineado con el lujo de Café Malu.

**Status Final:** Operativo y listo para migración de datos.

