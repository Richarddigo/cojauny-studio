# Mandatory GitHub execution policy

Owner instruction, 2026-10-17, applies to every agent and task in this repository.

- Never start, retry, rerun or enable a GitHub pipeline, review/agent job or other
  hosted automation without explicit prior permission for that execution.
- Permission must name the repository, workflow/job, reviewed ref/SHA and scope.
  General implementation/delivery requests do not authorize a job or its retries.
- Keep all workflows manual-only (`workflow_dispatch`), repository Actions and
  versioned workflows disabled. Do not introduce automatic events or schedules.
- Before an authorized push/PR/merge or other remote write, verify that it cannot
  trigger jobs; obtain execution permission first if it can.
- Do not substitute another scheduler, bot, cron or hook for removed automation.
- Preserve security alerts and secret scanning. Read-only inspection and local
  validation are allowed. Never bypass branch protections.
- The owner's removal request authorizes disabling automation and publishing
  these rule/trigger changes, with zero pipeline executions.
