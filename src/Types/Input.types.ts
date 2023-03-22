interface Specification {
    title: string;
    value: string;
}

export interface Inputs {
    name: string;
    category: string;
    subCategory: string[];
    brand: string;
    unit: string;
    minPurchase: string;
    tags: string[];
    flash: string;
    productUrl: string;
    youtubeLink: string;
    price: number;
    quantity: number;
    discount: number | string;
    discountUnit: string;
    doorDeliveryFee: number;
    specification: Specification[];
    pickupFee: number;
    meta: {
        title: string;
        description: string;
        image: string;
        metaTags: string[];
    },
    visibility: boolean;
    showStock: boolean;
    disclaimer: string;
    tax: number;
    taxUnit: string;
}

export interface Values {
    value: string;
    label: string;
}