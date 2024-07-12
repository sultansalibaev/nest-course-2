// utils/query-utils.ts
import { FindOptions, WhereOptions, Op } from 'sequelize';

interface QueryParams {
    _start?: number;
    _limit?: number;
    q?: string;
    _sort?: string;
    _order?: 'ASC' | 'DESC';
    [key: string]: any; // Для дополнительных фильтров
}

export function buildQueryOptions(params: QueryParams, searchBy?: string, model?: any): FindOptions {
    const { _start, _limit, q, _sort, _order, ...filters } = params;

    // Базовые опции
    const options: FindOptions = {
        where: {},
        order: [],
        offset: undefined,
        limit: undefined,
    };

    // Добавление фильтрации по тексту
    if (q && searchBy !== undefined) {
        options.where = {
            ...options.where,
            [Op.or]: [
                { [searchBy]: { [Op.iLike]: `%${q}%` } }, // Пример для поиска по полю title
                // { text: { [Op.iLike]: `%${q}%` } }, // Пример для поиска по полю text
            ],
        };
    }

    const tableColumns = Object.keys(model?.rawAttributes || {});

    // Добавление фильтрации по полям
    for (const key in filters) {
        if (filters.hasOwnProperty(key) && tableColumns?.includes?.(key)) {
            options.where[key] = filters[key];
        }
    }

    // Пагинация
    if (_start !== undefined) {
        options.offset = _start;
    }

    if (_limit !== undefined) {
        options.limit = _limit;
    }

    // Сортировка
    if (_sort && _order) {
        // @ts-ignore
        options.order.push([_sort, _order]);
    }

    return options;
}

