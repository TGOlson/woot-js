import R from 'ramda';
import * as Woot from '../../dist/woot';

const profileLocalInserts = (n) => {
  return [
    `Sending ${n} local inserts`,
    () => {
      let client = Woot.makeWootClientEmpty(0);

      R.times((i) => {
        const result = Woot.sendLocalInsert(client, i, 'a');
        client = result.client;
      }, n);
    },
  ];
};

// TODO: this isn't actually a good profile
// All delete attempts no-op since it is an empty wString.
const profileLocalDeletes = (n) => {
  return [
    `Sending ${n} local deletes`,
    () => {
      let client = Woot.makeWootClientEmpty(0);

      R.times((i) => {
        const result = Woot.sendLocalDelete(client, i);
        client = result.client;
      }, n);
    },
  ];
};


export default [
  profileLocalInserts(1000),
  profileLocalInserts(10000),
  profileLocalDeletes(1000),
  profileLocalDeletes(10000),
];
