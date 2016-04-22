import { profile, profileWithLogs } from './profiler';

import { forEach } from 'ramda';

// Runs need to be lazily loaded to build-time dependencies on /dist
const runs = () => {
  return require('./runs/index.js').default;
};

export const runProfiles = () => {
  forEach((o) => profile.apply(null, o), runs());
};

export const runProfilesWithLogs = () => {
  forEach((o) => profileWithLogs.apply(null, o), runs());
};
