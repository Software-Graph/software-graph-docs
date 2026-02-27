# Propagation Engine

The Propagation Engine computes downstream impact from contract changes.



## Trigger

A propagation begins when:

- An OpenAPI schema changes
- A dependency version updates
- A node interface mutates



## Algorithm (Conceptual)

1. Identify changed node.
2. Traverse outgoing edges.
3. Mark dependent nodes as impacted.
4. Fork impacted subgraph into Dev Mesh.
5. Apply automated code updates (future agent layer).
6. Execute tests.
7. Evaluate coverage thresholds.
8. Decide promotion.



## Guarantees

The system aims to guarantee:

- No silent contract breakage.
- Deterministic update ordering.
- Explicit promotion boundaries.
- Traceable change history.

Propagation is structural, not manual.

## Propagation Flow

```mermaid
graph LR
    Change[Contract Change in B]
    B[Service B]
    A[Service A]
    C[Service C]
    DevMesh[Dev Mesh Fork]

    B --> A
    B --> C
    Change --> B
    A --> DevMesh
    C --> DevMesh
```

## Subgraph Fork

```mermaid
graph TD
    B[Service B v2]
    A[Service A v1]
    C[Service C v1]

    B --> A
    B --> C

    subgraph Dev Fork
        A2[Service A v2]
        C2[Service C v2]
    end

    A --> A2
    C --> C2
```