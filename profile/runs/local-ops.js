import R from 'ramda';
import Woot from '../../';

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
