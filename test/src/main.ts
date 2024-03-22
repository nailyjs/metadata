import "@nailyjs/metadata";

// 定义一个Stage 3装饰器
function log() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (target: Function, ctx: DecoratorContext) => {};
}

@log()
class TestService {
  constructor(readonly i: number) {}

  @log()
  test() {}
}

console.log(TestService[Symbol.metadata]);
