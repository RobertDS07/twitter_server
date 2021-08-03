export interface IUsePaginate<T> {
    data: T
    total: number
}

export default function usePaginate<T>(
    data: T,
    total: number,
): IUsePaginate<T> {
    return {
        data,
        total,
    }
}
