import type { WChar } from './wchar';

export type OperationType = 'INSERT' | 'DELETE';

export type Operation = {
  type: OperationType,
  clientId: number,
  wChar: WChar,
}

export const makeInsertOperation = (clientId: number, wChar: WChar): Operation => ({
  type: 'INSERT',
  clientId,
  wChar,
});

export const makeDeleteOperation = (clientId: number, wChar: WChar): Operation => ({
  type: 'DELETE',
  clientId,
  wChar,
});
