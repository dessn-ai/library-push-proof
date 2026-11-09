# Dessn Library push for GitHub Actions (github.com and GitHub Enterprise Server)

Each push to your default branch updates a Dessn Library with that commit's code. The first push sets the Library up.
It needs only outbound HTTPS from the runner to Dessn and a Dessn API key; Dessn never connects to your Git host.

1. In Dessn: Settings › MCP › **Create API key**, for the team the Library belongs to, with **Library push** ticked.
   Save it as the repository (or organisation) secret `DESSN_TOKEN`.
2. Copy this folder (`action.yml` and `dessn.cjs`) into your repository as `.github/actions/dessn-push/`.
3. Add `sample-workflow.yml` as `.github/workflows/dessn.yml`.

The action is a JavaScript action (`runs: using: node20`) whose code is the one committed file `dessn.cjs`:
`@dessn-ai/mcp-cli`'s `dessn push` with all it uses bundled in, pinned to the version in its first lines. The runner
needs only node 20 (its own) and git. It fetches nothing: no npm registry, no actions from github.com, no
`setup-node`.

Inputs: `token` (required), `library` (default the repository's name), `dir` (a monorepo's app folder), `repo`
(`host/path`, default `${{ github.server_url }}/${{ github.repository }}`), `url`. Outputs: `status` (`setting_up`,
`updating` or `unchanged`), `library-url`, `status-url`, `push-id`.

## Without the action: one `run:` step

The same file is a CLI. Commit `dessn.cjs` anywhere in the repository and run it:

```yaml
jobs:
  push:
    runs-on: ubuntu-latest   # or your self-hosted GHES runner's label
    steps:
      - uses: actions/checkout@v4
      - run: node .github/actions/dessn-push/dessn.cjs push --commit "$GITHUB_SHA" --repo "${GITHUB_SERVER_URL#https://}/$GITHUB_REPOSITORY" --source action
        env:
          DESSN_TOKEN: ${{ secrets.DESSN_TOKEN }}
```

`node dessn.cjs push --help` lists the options (`--library`, `--dir`, `--json`, `--dry-run`, …).

Exit codes: 0 started or unchanged, 2 refused by Dessn (the message and fix are in the log), 1 any other failure
(safe to re-run: a push is idempotent on the commit). Full contract: `docs/library-push/CONTRACT.md`.

## Building `dessn.cjs`

From `packages/dessn-mcp-cli`: `pnpm build:action` (`tsup.action.config.ts`, entry `src/action.ts`). Rebuild and commit
it with any change to `src/push.ts` or Dessn's folder upload rules it bundles.
