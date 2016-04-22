import type { it, describe, expect } from 'jasmine';
import R from 'ramda';

import * as WootNamedImport from '../src/woot';

const topLevelExports = [
  'makeWootClient',
  'makeWootClientEmpty',
  'sendOperation',
  'sendOperations',
  'sendLocalDelete',
  'sendLocalInsert',
  'showClientString',
  'WString',
  'WChar',
  '__version',
];

const wStringExports = [
  'makeEmptyWString',
  'show',
  'insert',
  'indexOf',
  'contains',
  'subsection',
  'nthVisible',
  'hideChar',
];

const wCharExports = [
  'wCharBeginning',
  'wCharEnding',
  'hide',
  'compareWCharIds',
];

const hasAllProps = (ps, o) => R.all((p) => R.has(p, o), ps);

const assertExports = (exportDesc, ps, o) => {
  it(`should expose all ${exportDesc} exports`, () =>
    expect(hasAllProps(ps, o)).toBe(true)
  );
};

describe('Woot', () =>
  describe('exports', () => {
    assertExports('top level', topLevelExports, WootNamedImport);
    assertExports('WString', wStringExports, WootNamedImport.WString);
    assertExports('WChar', wCharExports, WootNamedImport.WChar);
  })
);
