import { describe } from '@jest/globals';
import { Category } from '../../types';
import { productComparator, getProductRUBPrice } from '../productComparator';

const defaultProduct = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 234.234,
    category: 'Электроника' as Category,
};

describe('getProductRUBPrice func', () => {
    it('have no explicit priceSymbol', () => {
        expect(
            getProductRUBPrice({
                ...defaultProduct,
                price: 100,
                priceSymbol: '₽',
            })
        ).toEqual(100);
    });

    it('have rubles sign', () => {
        expect(
            getProductRUBPrice({
                ...defaultProduct,
                price: 123123123.23423,
                priceSymbol: '₽',
            })
        ).toEqual(123123123.23423);
    });

    it('have dollar sign', () => {
        expect(
            getProductRUBPrice({
                ...defaultProduct,
                price: -123123123.23423,
                priceSymbol: '$',
            })
        ).toEqual(-123123123.23423 * 70);
    });
});

describe('productComparator по умолчанию', () => {
    it('equal price', () => {
        expect(
            productComparator('по умолчанию')(defaultProduct, defaultProduct)
        ).toEqual(0);
    });

    it('less price', () => {
        expect(
            productComparator('по умолчанию')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(0);
    });

    it('more price', () => {
        expect(
            productComparator('по умолчанию')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(0);
    });
});

describe('productComparator по убыванию цены', () => {
    it('equal price', () => {
        expect(
            productComparator('по убыванию цены')(
                defaultProduct,
                defaultProduct
            )
        ).toEqual(0);
    });

    it('less price', () => {
        expect(
            productComparator('по убыванию цены')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(1);
    });

    it('more price', () => {
        expect(
            productComparator('по убыванию цены')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(-1);
    });
});

describe('productComparator по возрастанию цены', () => {
    it('equal price', () => {
        expect(
            productComparator('по возрастанию цены')(
                defaultProduct,
                defaultProduct
            )
        ).toEqual(0);
    });

    it('less price', () => {
        expect(
            productComparator('по возрастанию цены')(
                { ...defaultProduct, price: 123 },
                { ...defaultProduct, price: 24234 }
            )
        ).toEqual(-1);
    });

    it('more price', () => {
        expect(
            productComparator('по возрастанию цены')(
                { ...defaultProduct, price: 23434.234 },
                { ...defaultProduct, price: -123 }
            )
        ).toEqual(1);
    });
});
