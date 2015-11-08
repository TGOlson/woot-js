// Write a spec to test default and named exports of the bundle
import R from 'ramda';

import WootDefaultImport from '../dist/woot';
import * as WootNamedImport from '../dist/woot';

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
  'Operation',
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
  'makeWChar',
  'makeWCharId',
  'wCharBeginning',
  'wCharEnding',
  'hide',
  'compareWCharIds',
];

const operationExports = [
  'makeInsertOperation',
  'makeDeleteOperation',
];

const hasAllProps = (ps, o) => R.all((p) => R.has(p, o), ps);

const assertExports = (exportDesc, ps, o) => {
  it(`should expose all ${exportDesc} exports`, () => {
    expect(
      hasAllProps(ps, o)
    ).toBe(true);
  });
};

describe('Woot', () => {
  describe('default imports', () => {
    assertExports('top level', topLevelExports, WootDefaultImport);
    assertExports('WString', wStringExports, WootDefaultImport.WString);
    assertExports('WChar', wCharExports, WootDefaultImport.WChar);
    assertExports('Operation', operationExports, WootDefaultImport.Operation);
  });

  describe('named imports', () => {
    assertExports('top level', topLevelExports, WootNamedImport);
    assertExports('WString', wStringExports, WootNamedImport.WString);
    assertExports('WChar', wCharExports, WootNamedImport.WChar);
    assertExports('Operation', operationExports, WootNamedImport.Operation);
  });
});
