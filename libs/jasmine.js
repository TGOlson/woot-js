declare module 'jasmine' {
  declare function it(_: string, _: () => void): void
  declare function describe(_: string, _: () => void): void
  declare var expect: any;
}
