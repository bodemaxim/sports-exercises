export interface IResultModel {
  /**
   * Статус.
   * @type {Status}
   */
  readonly status: Status

  /**
   * Данные.
   * @type {any}
   */ readonly data: any

  /**
   * Сообщение.
   * @type {string}
   */
  readonly message: string
}
/**
 * @typedef {Object} Status
 * @property {string} Success - "Успешно".
 * @property {string} Error - "Ошибка".
 * @property {string} SuccessAndNext - "Успешный и следующий шаг".
 * @property {string} Warning - "Предупреждение".
 */
export enum Status {
  Success = 1,
  Error = 2,
  SuccessAndNext = 3,
  Warning = 4
}
