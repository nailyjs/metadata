# TC39 Stage 3 Proposal TypeScript Decorators Metadata

> English version README is translated by chatGPT 4.0, please forgive me if there is any mistake.

[中文](./README.md)

## Introduction

As is well known, TypeScript 5.x has not yet implemented decorator metadata, which prevents us from retrieving decorator metadata at runtime. This repository uses a babel plugin to implement decorator metadata.

The principle behind it is quite simple; the entire project consists of only one file, `src/index.ts`, which modifies `Reflect.metadata`.

`Reflect.metadata` is the implementation of decorator metadata in older versions. There is a Babel repository `babel-plugin-transform-typescript-metadata`, which converts TypeScript's decorator metadata into `Reflect.metadata`.

- Go to [babel-plugin-transform-typescript-metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata/tree/master) Repo

The purpose of this repository is to convert `Reflect.metadata` into the new version of decorator metadata, enabling runtime retrieval of decorator metadata.

The source code is straightforward but implements this very important functionality and is helpful.

## Usage

```bash
npm install @nailyjs/metadata
```

```ts
// First, import @nailyjs/metadata at the top
import "@nailyjs/metadata";

// Define a Stage 3 decorator
function log() {
  return (target: Function, ctx: DecoratorContext) => {};
}

@log()
class TestService {
  constructor(readonly i: number) {}

  @log()
  test() {}
}

console.log(TestService[Symbol.metadata]);
```

The above code will output:

```js
[Object: null prototype] {
  'design:method': {
    test: { 'design:paramtypes': [], 'design:type': [Function: Function] }
  },
  'design:class': {
    'design:paramtypes': [ [Function: Number] ],
    'design:type': [Function: Function]
  }
}
```

See examples in the `test` directory of this repository.
