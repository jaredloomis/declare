
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../common/graphql/schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts", '!src/gql/**/*'],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    'src/gql/fragments.json': {
      plugins: ['fragment-matcher'],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
