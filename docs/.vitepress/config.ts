import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.vuejs.org/config/app-configs
export default withMermaid({
  title: "Software Graph",
  description: "Contract-driven propagation-aware service mesh",

  themeConfig: {
    sidebar: [
      {
        text: "Overview",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Philosophy", link: "/philosophy" }
        ]
      },
      {
        text: "Architecture",
        items: [
          { text: "Overview", link: "/architecture/overview" },
          { text: "Mesh Model", link: "/architecture/mesh-model" },
          { text: "Propagation Engine", link: "/architecture/propagation" },
          { text: "Authentication Model", link: "/architecture/auth-model" },
          { text: "Contract Model", link: "/architecture/contract-model" }
        ]
      },
      {
        text: "Operations",
        items: [
          { text: "Workflow", link: "/operations/workflow" },
          { text: "Propagation Lifecycle", link: "/operations/propagation-lifecycle" },
          { text: "Submodule Sync", link: "/operations/submodule-sync" },
          { text: "Branch Protection", link: "/operations/branch-protection" }
        ]
      },
      {
        text: "Services",
        items: [
          { text: "Auth Service", link: "/services/auth" },
          { text: "API Editor Service", link: "/services/api-editor-service" }
        ]
      }
    ]
  }
})
