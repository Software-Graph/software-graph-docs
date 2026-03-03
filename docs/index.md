# Software Graph

> Typed mesh architecture with deterministic propagation and tracked submodule pointers.

Software Graph is a multi-repo system managed as a single dependency graph.

- Each service/package is a node.
- Dependencies are edges with type and tag-level context.
- Contract changes are analyzed, then propagated to affected dependents.
- The meta-repo tracks exact submodule commits for reproducible mesh state.

## Current Operating Model

Software Graph currently runs on two long-lived mesh branches:

- `dev`: integration branch for all active development and propagation.
- `main`: stable branch that tracks only promoted `main` commits from each submodule.

### What Happens on `dev`

1. You work in a feature branch inside one submodule.
2. You open a PR to that submodule's `dev` branch.
3. On merge, CI runs tests and `mesh-gate`.
4. If there are breaking contract changes, propagation waves and linked issues are created.
5. The submodule push triggers notify workflow -> meta-repo sync workflow -> pointer update in meta `dev`.

### What Happens on `main`

- Promotion is explicit.
- Submodules are merged to `main` first.
- Then meta-repo opens a `dev -> main` PR that carries pointer updates from `dev`.
- That merged state can be tagged with `sg tag <version>` as a known-good mesh snapshot.

## Where to Start

- Workflow: [Operations / Workflow](/operations/workflow)
- Issue creation and closure flow: [Operations / Propagation Lifecycle](/operations/propagation-lifecycle)
- Pointer sync internals: [Operations / Submodule Sync](/operations/submodule-sync)
- Ruleset setup: [Operations / Branch Protection](/operations/branch-protection)

## Core Principles

- Contracts are first-class and diffed semantically.
- Propagation is structural and tag-aware.
- Breaking changes are visible across both source and target repos.
- The graph state is recorded as code and commits, not tribal knowledge.
