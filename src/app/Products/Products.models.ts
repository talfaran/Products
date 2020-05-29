export interface IProduct {
    name: string;
    category: ICategory;
    date: Date | string;
    price: number;
    id: number;
}

export interface ICategory {
    name: string;
    id: number;
}
