# 011 · Pipelines exclusivamente manuales

Petición del propietario, 2026-10-17: retirar todos los disparadores automáticos
y no ejecutar trabajos de GitHub sin permiso explícito por ejecución.

Studio no muestra ejecuciones nuevas desde el9 de octubre. Las notificaciones
investigadas corresponden al cron Mail outbox de cojauny-landing.

Actions y CI deshabilitados remotamente, con lectura posterior. Se sustituyen
push/PR por workflow_dispatch válido. Vercel Git deployments deshabilitados
en vercel.json para evitar ejecución indirecta al publicar. AGENTS y regla
alwaysApply exigen permiso por ejecución. No se cambia lógica de producto,
secrets, alertas ni secret scanning. No se inicia ningún job o despliegue.

Estado: validación local PASS; publicación pendiente. No finalizada. YAML validado, único evento workflow_dispatch, jobs preservados. JSON Vercel, regla alwaysApply y enlaces PASS. Copilot autenticado: No rulesets; no cambios de opciones.
Rama task/001-github-manual-only desde master e501b2e (rama predeterminada real).
