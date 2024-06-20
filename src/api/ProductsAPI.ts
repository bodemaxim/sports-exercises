import axios from 'axios'
import type { AxiosResponse } from 'axios'
import axiosInstance from '@//api/apiInstance'

import type { IExercise } from '@/interfaces/IExercise'
import type { IResultModel } from '@/interfaces/IResultModel'

/**
 * Загрузить список продуктов.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const getProducts = async (): Promise<IExercise[]> => {
  return await axiosInstance
    .get<IExercise[]>('../api/products/getProducts')
    .then((response: AxiosResponse<IExercise[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}

/**
 * Обновить список продуктов.
 * @param request - запрос.
 * @returns Промис с результатом.
 * @throws Ошибка при выполнении запроса.
 */
export const updateProducts = async (request: IExercise[]): Promise<IExercise[]> => {
  return await axiosInstance
    .post<IExercise[]>('../api/products/updateProducts', request)
    .then((response: AxiosResponse<IExercise[]>) => response.data)
    .catch((error: Error) => Promise.reject(error))
}
