
export type User = {
    id?: number
    first_name?: string
    last_name?: string
    username: string
    password: string
}

export type Product = {
    id?: number
    product_name?: string
    product_price?: number
    category_id?: number
}

export type Category = {
    id?: number
    category_name?: string
}

export type Order = {
    id?: number
    user_id?: number
    order_status?: string
}

export type OrderProduct = {
    id?: number
    order_id?: number
    product_id?: number
    product_quantity?: number
}
