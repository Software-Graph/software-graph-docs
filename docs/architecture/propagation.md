# Propagation Engine

The propagation engine is implemented as a CI-backed workflow, not just a conceptual graph walk.

## Trigger Path

1. A service PR merges to `dev`.
2. Service CI invokes the reusable workflow from the `Software-Graph` meta repo.
3. That centralized workflow installs the pinned released `sg-mesh` tooling, runs `sg gate <service>`, and handles propagation orchestration.
4. If meaningful source changes exist, the centralized gate flow runs `sg propagate <service>`.

## Breaking-Change Filtering

`sg propagate` performs smart filtering:

- If no contract diff is available, propagation is skipped unless forced.
- If only non-breaking changes are found, propagation is skipped.
- If breaking changes are found, only dependents consuming affected tag groups are targeted.

Dry-run support is available with:

```bash
sg propagate <service> --dry-run
```

## Wave Artifact

When propagation is needed, a wave file is written to:

```text
propagations/<source>-YYYYMMDD-HHMMSS.json
```

That wave includes source metadata, targets, tags, and issue references once created.

## Issue and Dispatch Flow

After wave generation, the centralized meta-repo gate workflow:

1. Creates an actionable issue in each impacted target repo.
2. Creates a linked visibility issue in the meta-repo.
3. Cross-links both issues.
4. Dispatches `repository_dispatch` (`mesh-propagation`) to each target repo.

Target repos handle that dispatch in CI and can auto-close tracking issues when verification passes.

## Practical Guarantees

- Breaking changes are visible to impacted dependents.
- Source and meta tracking stay linked.
- Non-breaking edits avoid unnecessary propagation noise.
