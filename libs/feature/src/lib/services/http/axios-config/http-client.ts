import { HttpClientResponse } from '@pure-workspace/domain';
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export async function HttpClient<T = unknown>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  refresh?: boolean
): Promise<HttpClientResponse<T>> {
  try {
    const response: AxiosResponse<T> = await instance.request(config);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError<T>;

    //Verificar o retorno
    if (axiosError.response?.status === 400 && refresh) {
      console.log('Olá');
    }

    throw axiosError;
  }
}
