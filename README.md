# TC39 Stage 3 提案 TypeScript 装饰器 metadata

[English](./README.en.md)

## 介绍

众所周知，TypeScript 5.x目前还没有实现装饰器的元数据，这使得我们无法在运行时获取装饰器的元数据。这个仓库使用babel插件的方式，实现了装饰器的元数据。

其实原理很简单，整个项目只有一个文件，就是`src/index.ts`，它的作用就是修改`Reflect.metadata`。

`Reflect.metadata`是旧版本的装饰器元数据的实现，有一个Babel仓库`babel-plugin-transform-typescript-metadata`，它的作用是将TypeScript的装饰器元数据转换为`Reflect.metadata`。

- Go to [babel-plugin-transform-typescript-metadata](https://github.com/leonardfactory/babel-plugin-transform-typescript-metadata/tree/master) Repo

而这个仓库的作用是将`Reflect.metadata`转换为新版本的装饰器元数据，这样就可以在运行时获取装饰器元数据了。

源码很简单，只有一个文件，但是实现了这个很重要的功能，希望有所帮助。

## 使用

```bash
npm install @nailyjs/metadata
```

```ts
// 首先在最顶上引入@nailyjs/metadata
import "@nailyjs/metadata";

// 定义一个Stage 3装饰器
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

上面的代码会输出为：

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

见本仓库的`test`目录的例子。
