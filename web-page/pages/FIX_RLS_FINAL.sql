-- SOLUCIÓN DEFINITIVA Y LIMPIEZA TOTAL DE POLÍTICAS
-- Este script borra TODAS las políticas existentes en la tabla 'profiles' (sin importar el nombre)
-- y vuelve a crear las 3 políticas correctas y seguras.

BEGIN;

-- 1. Limpieza Profunda: Borrar CUALQUIER política existente en 'profiles'
DO $$ 
DECLARE 
  r RECORD; 
BEGIN 
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND schemaname = 'public') LOOP 
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.profiles'; 
  END LOOP; 
END $$;

-- 2. Asegurar que la función segura existe (la volvemos a definir por si acaso)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Crear las políticas limpias (Solo estas 3 deben existir)

-- A) LECTURA
CREATE POLICY "profiles_read_policy"
  ON public.profiles FOR SELECT
  USING ( auth.uid() = id OR public.is_admin() );

-- B) ACTUALIZACIÓN
CREATE POLICY "profiles_update_policy"
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id OR public.is_admin() );

-- C) INSERCIÓN
CREATE POLICY "profiles_insert_policy"
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

COMMIT;
