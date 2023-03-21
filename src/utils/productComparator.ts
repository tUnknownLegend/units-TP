import type { Product, SortBy } from '../types';

/**
 * export is only for tests, do not use for other purposes
 */
export const dollarToRublesPrice = 70;

/**
 * export is only for tests, do not use for other purposes
 */
export const getProductRUBPrice = (product: Product) =>
    product.priceSymbol === '$'
        ? product.price * dollarToRublesPrice
        : product.price;

export const productComparator =
    (sortBy: SortBy) =>
    (lhs: Product, rhs: Product): number => {
        if (sortBy === 'по умолчанию') return 0;

        const lhsPrice = getProductRUBPrice(lhs);
        const rhsPrice = getProductRUBPrice(rhs);

        if (rhsPrice > lhsPrice) {
            return sortBy === 'по убыванию цены' ? 1 : -1;
        }

        if (rhsPrice < lhsPrice) {
            return sortBy === 'по убыванию цены' ? -1 : 1;
        }

        return 0;
    };
