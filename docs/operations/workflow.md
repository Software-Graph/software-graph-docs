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
- Each submodule `dev` push triggers `notify-metarepo`.
- Meta-repo `sync-submodules` updates pointer commits on `dev`.

To update your local mesh:

```bash
sg pull dev
```

## Promotion Flow (`dev` -> `main`)

1. Open submodule promotion PRs:

```bash
sg promote
```

2. Merge submodule promotion PRs:

```bash
sg merge-all --base main --head dev --merge
```

3. Promote meta-repo pointers from `dev` to `main`:

```bash
sg pr meta --base main --allow-submodule-pointers
sg merge meta --pr <number> --base main --squash
```

4. Tag the known-good mesh combination:

```bash
sg tag <version>
```

Notes:

- `main` pointer updates should come from the meta `dev -> main` PR path.
- `sg push main` remains a legacy/manual recovery path only.

## Fast Command Reference

```bash
# mesh-wide
sg status
sg pull dev
sg checkout dev
sg checkout main
sg promote
sg merge-all --base main --head dev --merge
sg pr meta --base main --allow-submodule-pointers
sg tag <version>

# per-service feature flow
sg branch <service> --name <branch>
sg commit <service> -m "message"
sg prepr <service>
sg push <service>
sg pr <service>
sg merge <service> --pr <number>
```
