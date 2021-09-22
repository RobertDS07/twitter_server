import { FindAndCountOptions, Model, ModelCtor, Order } from 'sequelize/types'

import { IPaginated } from 'src/interfaces/paginated'

type TPossibleOrdering = `asc` | `desc`

export type TOrder = Record<string, TPossibleOrdering>

export interface IPropsFind<T extends Model>
    extends Omit<FindAndCountOptions<T[`_attributes`]>, `order`> {
    skip?: number
    order?: TOrder
}

export default class BaseRepository<T extends Model> {
    model: ModelCtor<T>

    constructor(model: ModelCtor<T>) {
        this.model = model
    }

    async create(data: T[`_attributes`]): Promise<T[`_attributes`]> {
        const createdEntity = await this.model.create(data)

        return createdEntity.toJSON()
    }

    private formatOrdering(ordinations: Record<string, string>): Order {
        const ordinationKeys = Object.keys(ordinations)

        const formattedOrdering = ordinationKeys.map(key => {
            const value = ordinations[key]

            const formattedValue = [key, value]

            return formattedValue
        })

        return formattedOrdering as Order
    }

    async getById(id: number): Promise<T | null> {
        const target = await this.model.findByPk(id)

        return target
    }

    async find({
        skip,
        limit,
        order,
        where,
        ...rest
    }: IPropsFind<T> = {}): Promise<IPaginated<T>> {
        const formattedOrdering = order ? this.formatOrdering(order) : undefined

        const result = await this.model.findAndCountAll({
            limit,
            raw: true,
            nest: true,
            offset: skip,
            order: formattedOrdering,
            where: {
                ...where,
                deletedAt: null,
            },
            ...rest,
        })

        const formattedResult = {
            data: result.rows,
            total: result.count,
        }

        return formattedResult
    }

    //TODO: IMPLEMENTAR O RESTO
}
