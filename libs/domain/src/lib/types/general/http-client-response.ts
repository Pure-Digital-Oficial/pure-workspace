export type HttpClientResponse<T = unknown> = {
  data: T;
  status: number;
};
