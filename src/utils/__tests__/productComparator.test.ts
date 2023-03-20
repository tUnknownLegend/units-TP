import { describe } from '@jest/globals';
import { PriceSymbol, Product, SortBy } from '../../types';
import {
    productComparator,
    getProductRUBPrice,
    dollarToRublesPrice,
} from '../productComparator';

const defaultProduct: Product = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 234.234,
    category: 'Электроника',
};

describe('getProductRUBPrice func', () => {
    const testData: Array<{ value: Product; expected: number }> = [
        {
            value: { ...defaultProduct, price: 100, priceSymbol: '₽' },
            expected: 100,
        },
        {
            value: {
                ...defaultProduct,
                price: 123123123.23423,
            },
            expected: 123123123.23423,
        },
        {
            value: {
                ...defaultProduct,
                price: -123123123.23423,
                priceSymbol: '$',
            },
            expected: -123123123.23423 * dollarToRublesPrice,
        },
    ];
    test.each(testData)(
        'should check if function converts price to rubles correctly',
        ({ value, expected }) => {
            expect(getProductRUBPrice(value)).toStrictEqual(expected);
        }
    );
});

type testLoad = {
    lhs: Product;
    rhs: Product;
    expected: number;
};

const templateTest = (payload: {
    sortBy: SortBy;
    equal: testLoad;
    less: testLoad;
    more: testLoad;
}) => {
    it('checks case with equal price comparison', () => {
        expect(
            productComparator(payload.sortBy)(
                payload.equal.lhs,
                payload.equal.rhs
            )
        ).toStrictEqual(payload.equal.expected);
    });

    it('checks with less price comparison', () => {
        expect(
            productComparator(payload.sortBy)(
                payload.less.lhs,
                payload.less.rhs
            )
        ).toStrictEqual(payload.less.expected);
    });

    it('checks with more price comparison', () => {
        expect(
            productComparator(payload.sortBy)(
                payload.more.lhs,
                payload.more.rhs
            )
        ).toStrictEqual(payload.more.expected);
    });
};
describe('productComparator по умолчанию', () =>
    templateTest({
        sortBy: 'по умолчанию',
        equal: { lhs: defaultProduct, rhs: defaultProduct, expected: 0 },
        less: {
            lhs: { ...defaultProduct, price: 123 },
            rhs: { ...defaultProduct, price: 24234 },
            expected: 0,
        },
        more: {
            lhs: { ...defaultProduct, price: 23434.234 },
            rhs: { ...defaultProduct, price: 0 },
            expected: 0,
        },
    }));

describe('productComparator по убыванию цены', () =>
    templateTest({
        sortBy: 'по убыванию цены',
        equal: { lhs: defaultProduct, rhs: defaultProduct, expected: 0 },
        less: {
            lhs: { ...defaultProduct, price: 123 },
            rhs: { ...defaultProduct, price: 24234 },
            expected: 1,
        },
        more: {
            lhs: { ...defaultProduct, price: 234.234 },
            rhs: { ...defaultProduct, price: -123 },
            expected: -1,
        },
    }));

describe('productComparator по возрастанию цены', () =>
    templateTest({
        sortBy: 'по возрастанию цены',
        equal: { lhs: defaultProduct, rhs: defaultProduct, expected: 0 },
        less: {
            lhs: { ...defaultProduct, price: -123 },
            rhs: { ...defaultProduct, price: 0 },
            expected: -1,
        },
        more: {
            lhs: { ...defaultProduct, price: -23 },
            rhs: { ...defaultProduct, price: -123 },
            expected: 1,
        },
    }));
