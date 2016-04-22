declare module ramda {
  declare function all<T>(_: (_: T) => bool, _: Array<T>): bool;
  declare function findIndex<T>(_: (_: T) => bool, _: Array<T>): number;
  declare function head<T>(_: Array<T>): ?T;
  declare function insert<T>(_: number, _: T, _: Array<T>): Array<T>;
  declare function last<T>(_: Array<T>): ?T;
  declare function length<T>(_: Array<T>): number;
  declare function reduce<T, U>(_: (_: U, _: T) => U, _: U, _: Array<T>): U;
  declare function slice<T>(_: number, _: number, _: Array<T>): Array<T>;
  declare function update<T>(_: number, _: T, _: Array<T>): Array<T>;
}
