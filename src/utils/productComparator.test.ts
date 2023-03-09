import { describe, expect, test } from '@jest/globals';
import { Category, PriceSymbol } from '../types';
import { productComparator, getProductRUBPrice } from './productComparator';

const defaultProduct = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 234.234,
    category: 'Электроника' as Category,
};

describe('по умолчанию', () => {
    it('equal', () => {
        expect(getProductRUBPrice(defaultProduct)).toEqual(234.234);
    });
    it('positive', () => {
        expect(
            getProductRUBPrice({ ...defaultProduct, price: 123123123.23423 })
        ).toEqual(123123123.23423);
    });
    it('negative', () => {
        expect(
            getProductRUBPrice({ ...defaultProduct, price: -123123123.23423 })
        ).toEqual(-123123123.23423);
    });
});

describe('по умолчанию', () => {
    it('equal', () => {
        expect(
            productComparator('по умолчанию')(defaultProduct, defaultProduct)
        ).toEqual(0);
    });

    it('less', () => {
        expect(
            productComparator('по умолчанию')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(0);
    });

    it('more', () => {
        expect(
            productComparator('по умолчанию')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(0);
    });
});

describe('по убыванию цены', () => {
    it('equal', () => {
        expect(
            productComparator('по убыванию цены')(
                defaultProduct,
                defaultProduct
            )
        ).toEqual(0);
    });

    it('less', () => {
        expect(
            productComparator('по убыванию цены')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(1);
    });

    it('more', () => {
        expect(
            productComparator('по убыванию цены')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(-1);
    });
});

describe('по возрастанию цены', () => {
    it('equal', () => {
        expect(
            productComparator('по возрастанию цены')(
                defaultProduct,
                defaultProduct
            )
        ).toEqual(0);
    });

    it('less', () => {
        expect(
            productComparator('по возрастанию цены')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(-1);
    });

    it('more', () => {
        expect(
            productComparator('по возрастанию цены')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(1);
    });
});
