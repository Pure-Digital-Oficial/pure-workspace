import { HttpClientResponse } from '@pure-workspace/domain';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export async function HttpClient<T = unknown>(
  instance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<HttpClientResponse<T>> {
  try {
    const response: AxiosResponse<T> = await instance.request(config);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError<T>;

    throw axiosError;
  }
}
