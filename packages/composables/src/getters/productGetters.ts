import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice
} from '@vue-storefront/core';
import { Product } from '../types';
// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: Product): string => product?.descriptor.name || 'Product\'s name';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getProductSlug = (product: Product): string => product.sku;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: Product): AgnosticPrice => {
  return {
    regular: product?.price?.value || 0,
    special: product?.price?.minimum_value || 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => [
  {
    small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  },
  {
    small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
    big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getProductCoverImage = (product: Product): string => 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getProductFiltered = (products: Product[], filters: ProductFilters | any = {}): Product[] => {
//   return [
//     {
//       _id: 1,
//       _description: 'Some description',
//       _categoriesRef: [
//         '1',
//         '2'
//       ],
//       name: 'Black jacket',
//       sku: 'black-jacket',
//       images: [
//         'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
//       ],
//       price: {
//         original: 12.34,
//         current: 10.00
//       }
//     },
//     {
//       _id: 2,
//       _description: 'Some different description',
//       _categoriesRef: [
//         '1',
//         '2',
//         '3'
//       ],
//       name: 'White shirt',
//       sku: 'white-shirt',
//       images: [
//         'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
//       ],
//       price: {
//         original: 15.11,
//         current: 11.00
//       }
//     }
//   ];
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductShortDescription = (product: Product): any => product?.descriptor?.short_des || '';

export const getProductLongDescription = (product: Product): any => product?.descriptor?.long_desc || '';

export const getProductCategoryIds = (product: Product): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: Product): string => (product as any)?.id || '';

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: Product): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getProductAverageRating = (product: Product): number => 0;

const productGetters = {
  getName: getProductName,
  // getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  // getCoverImage: getProductCoverImage,
  // getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  // getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews
  // getAverageRating: getProductAverageRating
};

export default productGetters;
