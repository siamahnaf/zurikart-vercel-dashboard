interface Address {
    name: string;
    phone: string;
    address: string;
    country: string;
    area: string;
    city: string;
}
export interface Products {
    product: {
        name: string;
        totalPrice: number;
        slug: string;
    },
    quantity: number;
    variation: string;
};
export interface OrdersData {
    id?: string;
    orderId?: string;
    user?: {
        name: string;
        phone: string;
    }
    shippingAddress?: Address;
    billingAddress?: Address;
    products?: Products[];
    total?: number;
    shipping?: number;
    couponDiscount?: number;
    paymentMethod?: string;
    status?: string;
    note?: string;
    createdAt?: Date;
}