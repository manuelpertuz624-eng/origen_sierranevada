-- SOLUCIÓN AL ERROR DE RECURSIÓN INFINITA (Infinite Recursion) en Supabase

-- Problema:
-- Si intentamos verificar si un usuario es 'admin' leyendo la propia tabla 'profiles' dentro de una política de 'profiles',
-- creamos un bucle infinito (Policy -> Consulta Profiles -> Activa Policy -> ...).

-- Solución:
-- Usamos una función "SECURITY DEFINER". Esta función se ejecuta con permisos de superusuario,
-- saltándose las políticas RLS (Row Level Security), rompiendo así el bucle.

BEGIN;

-- 1. Función segura para verificar si soy admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Eliminar políticas antiguas que puedan estar causando conflictos
DROP POLICY IF EXISTS "Usuarios pueden ver su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Allow all for admins" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all" ON public.profiles;

-- 3. Crear las políticas correctas y optimizadas

-- Lectura: Cada uno ve lo suyo, los Admins ven todo.
CREATE POLICY "Permitir lectura de perfiles"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id          -- El usuario ve su propio perfil
    OR
    public.is_admin()        -- O el admin ve el de todos (usando la función segura)
  );

-- Escritura (Update): Solo el usuario dueño o el admin.
CREATE POLICY "Permitir actualizar perfiles"
  ON public.profiles
  FOR UPDATE
  USING ( auth.uid() = id OR public.is_admin() );

-- Insert: Generalmente manejado por el Trigger, pero por si acaso.
CREATE POLICY "Permitir insertar perfil propio"
  ON public.profiles
  FOR INSERT
  WITH CHECK ( auth.uid() = id );

COMMIT;
