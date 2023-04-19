import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  hooks: { afterAllFileWrite: ["prettier --write"] },
  generates: {
    "query/generated.ts": {
      // preset: 'client',
      schema:
        "https://api.thegraph.com/subgraphs/name/steegecs/uniswap-v3-polygon",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        "fragment-matcher",
      ],
      documents: "query/*.graphql",
      config: {
        dedupeFragments: true,
        fetcher: { func: "./auth-defi-fetcher#fetcher", isReactHook: false },
      },
    },
  },
};

export default config;
