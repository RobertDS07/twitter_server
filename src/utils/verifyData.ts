const verifyData = <T>(data: T): void => {
    for (const property in data) {
        if (!data[property]) throw new Error('Preencha todos os campos!')
    }
}

export default verifyData
