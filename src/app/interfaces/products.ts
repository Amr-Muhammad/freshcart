export interface productsInterface {
    sold:            number;
    images:          string[];
    subcategory:     Category[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    slug:            string;
    description:     string;
    quantity:        number;
    price:           number;
    imageCover:      string;
    category:        Category;
    brand:           null;
    ratingsAverage:  number;
    createdAt:       Date;
    updatedAt:       Date;
    id:              string;
}

export interface Category {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}
