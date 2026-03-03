# Branch Protection

These settings match the current Software Graph workflow while keeping room for team scaling.

## Scope

Apply rules to `dev` and `main` across the org repos (or selected repos first if rolling out gradually).

## Recommended Baseline (`dev`)

Enable:

- Require a pull request before merging
- Require status checks to pass
- Require conversation resolution before merging
- Block force pushes
- Restrict deletions

Optional (enable when practical):

- Require linear history
- Dismiss stale approvals when new commits are pushed

For solo development, required approvals can stay `0` initially if speed matters.

## Recommended Baseline (`main`)

Enable all of the above, plus stricter promotion discipline:

- Require status checks to pass
- Require PR-only updates
- Block force pushes
- Restrict deletions

Use `main` as promotion-only. No direct feature work there.

## Status Checks to Require

Use the checks that enforce your actual gates, for example:

- service CI test job(s)
- mesh gate job (where applicable)

Avoid requiring transient/non-deterministic checks.

## Bypass Notes

Ruleset bypass actors are roles/teams/apps, not PAT strings.

If automation must bypass protections, use a dedicated GitHub App or explicit role/app actor in the bypass list. Keep this minimal.

## Practical Rollout

1. Start in evaluate mode if available.
2. Confirm no required workflow is accidentally blocked.
3. Switch to active enforcement.
4. Revisit required checks after adding/removing CI jobs.
