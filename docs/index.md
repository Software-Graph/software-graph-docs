# Software Graph

> Contract-driven. Propagation-aware. Deterministic.

Software Graph is an experimental architecture model for building software as an explicit dependency graph of services and contracts.

### At its core:

- Every service is a node.
- Every dependency is an edge.
- Every contract is a first-class artifact.
- Every change propagates deterministically.

## Core Principles

### 1. Contracts First

All services expose explicit OpenAPI specifications.

Contracts are not documentation — they are the source of truth.

Schema changes trigger downstream propagation.

### 2. Graph-Native Design

Services form a directed graph:

- Nodes represent services or components.
- Edges represent dependency relationships.
- Changes propagate along outgoing edges.

The system treats architecture as data.

### 3. Dev/Prod Mesh Separation

Two meshes exist:

- **Dev Mesh** — experimental propagation space
- **Prod Mesh** — stable validated graph

When a contract changes:

1. A forked subgraph is created in dev.
2. Dependent services are updated automatically.
3. Tests and coverage gates are executed.
4. Only validated graphs are promoted to prod.

### 4. Self-Contained Authentication

Authentication is designed to avoid central bottlenecks.

- JWT access tokens
- Public JWKS verification
- Structured scopes
- Audience enforcement
- Optional introspection for debugging

Auth is graph-aware.

## Why This Exists

Modern software development:

- Breaks contracts silently
- Lacks global dependency awareness
- Requires manual coordination
- Treats architecture as documentation

Software Graph treats architecture as executable structure.

## Status

Early experimental phase.

Design and contract modeling are underway.

Automation and propagation engines in progress.

## Philosophy

Software should be:

- Traceable
- Deterministic
- Self-describing
- Propagation-aware

The graph is the system.