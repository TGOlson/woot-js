declare module ramda {
  declare function join(_:string, _:Array<string>): string;
  declare function length(_:Array<any>): number;
  declare function identity<T>(_:T): T;
  declare function compose<A, B, C>(_:(_:A) => B, _:(_:B) => C): C;
  declare function reverse(_:string): string;
  declare function isEmpty(_:Array<any>): boolean;
  declare function append<T>(_:T, _:Array<T>): Array<T>;
  declare function last<T>(_:Array<T>): ?T;
  declare function head<T>(_:Array<T>): ?T;
  declare function chain<T>(_:T, _:Array<T>): Array<T>;
  declare function map<A, B>(_:(_:A) => B, _:Array<A>): Array<B>;
  declare function chain<A, B>(_:(_:A) => Array<B>, _:Array<A>): Array<B>;

  // TODO:
  declare var insert: any;
  declare var complement: any;
  declare var curry: any;
  declare var findIndex: any;
  declare var isNil: any;
  declare var assoc: any;
  declare var evolve: any;
  declare var prop: any;
  declare var reduce: any;
  declare var inc: any;
  declare var path: any;
  declare var has: any;
  declare var update: any;
  declare var slice: any;
}
