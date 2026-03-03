# Submodule Sync

The meta-repo tracks submodules by commit SHA. Since Git submodules do not track branches automatically, Software Graph uses an event-driven sync.

## How It Works

1. A submodule receives a push on `dev` or `main`.
2. The submodule's `notify-metarepo.yml` sends `repository_dispatch` to `Software-Graph/Software-Graph`.
3. Meta-repo `sync-submodules.yml` runs on that dispatch.
4. It fast-forwards targeted submodule(s) to `origin/<branch>`.
5. If pointers changed, it commits and pushes updated refs in the meta-repo.

## Why Event-Driven (No Cron)

- Immediate pointer updates after real changes.
- No periodic polling load.
- Better branch fidelity (`dev` events update `dev`, `main` events update `main`).

## Concurrency Behavior

`sync-submodules` uses branch-level concurrency:

- group: `sync-<branch>`
- `cancel-in-progress: true`

When many submodules update quickly, older runs are canceled and the latest run performs the effective sync.

## Safety and Guards

- Only `dev` and `main` are accepted by sync workflow.
- Notify workflow skips meta-repo self-dispatch to avoid loops.
- Manual `workflow_dispatch` is available for recovery (`branch` + optional specific `submodule`).

## Required Secret

Both notify and sync workflows require `MESH_TOKEN` with permissions for:

- reading/writing repo contents where commits are pushed
- creating repository dispatch events
- creating/closing issues for propagation tracking

Using an org-level secret keeps onboarding of new repos simpler.

## Troubleshooting

### 401 Bad credentials in notify

- `MESH_TOKEN` missing or invalid in that repo/org context.
- Verify the secret is available to the repository.

### Pointer not updated in meta

- Confirm notify ran on the submodule push.
- Check `sync-submodules` run for branch mismatch or token errors.
- Use manual dispatch path to recover a specific branch/submodule.
