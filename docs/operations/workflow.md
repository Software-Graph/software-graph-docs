# Workflow

This is the intended day-to-day workflow for Software Graph using `sg` commands.

## Branch Model

- `dev`: integration branch for active development and propagation.
- `main`: stable branch for promoted changes.
- Feature branches: per-service branches created from `origin/dev`.

## Daily Development Flow

### 1. Create a feature branch in one service

```bash
sg branch <service> --name <feature-branch>
```

Example:

```bash
sg branch jb-auth --name feature/token-claims
```

### 2. Make changes and commit via `sg`

```bash
sg commit <service> -m "feat: ..."
```

Guardrails:

- `sg commit` refuses direct commits on `dev` or `main`.
- Use feature branches only.

### 3. Run pre-PR checks locally

```bash
sg prepr <service>
```

This runs the local CI dry-run path (`test -> gate -> propagate preview`) for the service.

Important: `sg prepr` currently supports services/packages defined in `sg-mesh.yaml`.
If a repo is outside the mesh graph (for example `software-graph-docs` today), run its native checks directly instead.

### 4. Push feature branch

```bash
sg push <service>
```

### 5. Open PR to `dev`

```bash
sg pr <service>
```

`sg pr` pushes branch (if needed) and opens a PR targeting `dev`.

### 6. Merge PR to `dev`

Use GitHub UI or:

```bash
sg merge <service> --pr <number>
```

On merge, service CI runs and the mesh workflow may propagate breaking changes.

## After Merge to `dev`

- `mesh-gate` handles gate + propagation logic.
- Each submodule push triggers `notify-metarepo`.
- Meta-repo `sync-submodules` updates pointer commits on `dev`.

To update your local mesh:

```bash
sg pull dev
```

## Promotion Flow (`dev` -> `main`)

1. Promote each submodule through its normal PR process to `main`.
2. Sync meta `main` pointers to submodule `origin/main` heads:

```bash
sg push main
```

Notes:

- `sg push main` updates meta pointers; it does not force submodule `dev -> main` promotion.
- If `main` is protected, open a PR for the pointer-sync commit if direct push is blocked.

## Fast Command Reference

```bash
# mesh-wide
sg status
sg pull dev
sg checkout dev
sg checkout main

# per-service feature flow
sg branch <service> --name <branch>
sg commit <service> -m "message"
sg prepr <service>
sg push <service>
sg pr <service>
sg merge <service> --pr <number>
```
