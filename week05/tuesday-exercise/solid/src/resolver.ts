type ResolverFN = (parent: any, args: any, context: any, info: any) => any;

const logging: (resolver: any) => ResolverFN = (resolver) => {
  return (parent?: any, args?: any, context?: any, info?: any) => {
    console.log("parent:", parent, "\nargs:", args, "\ncontext:", context, "\ninfo:", info);
    const res = resolver(parent, args, context, info);
    console.log("result:", res);
    return res;
  };
}

const hello = (_: never, args: {name: string}) => `Hello ${args.name}`;

export const Query = {
  hello: logging(hello),
}
