import type { WChar } from './wchar';

export type OperationType = 'INSERT' | 'DELETE';

export type Operation = {
  type: OperationType,
  clientId: number,
  wChar: WChar,
}
