export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description?: string,
    sale_price?: number,
    quantity: number,
    status: number | string,
    image?: string,
    category?: string,
    createdAt?: string
}

export type ProductCart = {
    _id: string,
    name: string,
    price: number,
    value: number,
    image?: string
}