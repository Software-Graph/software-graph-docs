# Branch Protection

These settings match the current Software Graph workflow while keeping room for team scaling.

## Scope

Apply rules to `main` across the org repos (or selected repos first if rolling out gradually).

## Recommended Baseline (`main`)

- Require status checks to pass
- Require PR-only updates
- Block force pushes
- Restrict deletions
- Require the stable repo gate for that repo:
  - submodules: `CI / Main PR Gate`
  - meta repo: `Meta CI / Main PR Gate`

## Status Checks to Require

Use the checks that enforce your actual gates, for example:

- `CI / Main PR Gate`
- `Meta CI / Main PR Gate`

Avoid requiring transient/non-deterministic checks.

## Bypass Notes

Ruleset bypass actors are roles/teams/apps, not PAT strings.

If automation must bypass protections, use a dedicated GitHub App or explicit role/app actor in the bypass list. Keep this minimal.

## Practical Rollout

1. Start in evaluate mode if available.
2. Confirm no required workflow is accidentally blocked.
3. Switch to active enforcement.
4. Revisit required checks after adding/removing CI jobs.
