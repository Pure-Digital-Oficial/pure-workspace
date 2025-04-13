import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { HttpClientResponse } from '@pure-workspace/domain';
import { tokenRefreshService } from '../auth';

interface Options {
  refresh?: boolean;
  appId?: string;
  tokenKey?: string;
  ctx: GetServerSidePropsContext | null;
}

export async function HttpClient<T = unknown>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options?: Options
): Promise<HttpClientResponse<T>> {
  try {
    const response = await instance.request<T>(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (err) {
    const error = err as AxiosError;

    if (!options?.refresh || !error.response) {
      console.error('Error:', error.message);
      throw error;
    }

    const shouldTryRefresh = error.response.status === 400;
    if (!shouldTryRefresh) {
      throw error;
    }

    return await tokenRefreshService<T>({
      appId: options.appId ?? '',
      ctx: options.ctx,
      tokenKey: options.tokenKey ?? '',
    });
  }
}
