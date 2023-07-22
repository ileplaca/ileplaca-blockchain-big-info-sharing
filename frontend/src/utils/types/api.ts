export enum ResponseStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
export type ResponseStatusType = `${ResponseStatus}`;
