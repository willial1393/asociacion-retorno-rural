export class Product {
    id: number;
    name: string;
    description: string;
    value: string;
    image: string;
    discount: string;

    getJson() {
        return this;
    }

    getJsonLogin() {
        return this;
    }
}
