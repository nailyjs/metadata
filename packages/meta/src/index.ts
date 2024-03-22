declare global {
  namespace Reflect {
    function metadata(
      metadataKey: any,
      metadataValue: any,
    ): {
      (target: Function, ctx: ClassMemberDecoratorContext): void;
      (target: undefined, ctx: ClassFieldDecoratorContext): void;
    };
  }
}

if (!Symbol.metadata) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Symbol.metadata = Symbol("metadata");
}

Reflect.metadata = (metadataKey: any, metadataValue: any) => {
  return (_target: Function | undefined, ctx: DecoratorContext) => {
    if (metadataKey === "design:type" || metadataKey === "design:paramtypes" || metadataKey === "design:returntype") {
      if (!ctx.metadata[`design:${ctx.kind}`]) {
        ctx.metadata[`design:${ctx.kind}`] = {};
      }
      if (ctx.kind === "class") {
        ctx.metadata[`design:${ctx.kind}`][metadataKey] = metadataValue;
      } else {
        if (!ctx.metadata[`design:${ctx.kind}`][ctx.name]) {
          ctx.metadata[`design:${ctx.kind}`][ctx.name] = {};
        }
        ctx.metadata[`design:${ctx.kind}`][ctx.name][metadataKey] = metadataValue;
      }

      return;
    }

    ctx.metadata[metadataKey] = metadataValue;
  };
};

export {};
