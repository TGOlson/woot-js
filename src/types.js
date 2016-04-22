// More useful than flow's builtin `?x` syntax.
// With `Optional` we don't have to account for `undefined`.
export type Optional<a> = a | null;

export type Ordering = 'LT' | 'GT' | 'EQ';
