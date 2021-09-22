import sequelize from '../../src/sequelize'

export default async (): Promise<void> => {
    const models = Object.values(sequelize.models)

    const modelsInCorrectOrder = models.reverse()

    const promisesToSolve = modelsInCorrectOrder.map(model =>
        model.destroy({ truncate: true }),
    )

    await Promise.all(promisesToSolve)
}
