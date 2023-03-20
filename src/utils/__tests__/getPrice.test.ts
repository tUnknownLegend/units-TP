import { describe } from '@jest/globals';
import { getPrice } from '../getPrice';
import { PriceSymbol, SortBy } from '../../types';

describe('getPrice function', () => {
    const testData: Array<{
        value: number;
        symbol?: PriceSymbol;
        expected: string;
    }> = [
        { value: 178, symbol: '₽', expected: '178 ₽' },
        { value: 15678.234, expected: '15,678.234 ₽' },
        { value: 12345678.901, symbol: '$', expected: '12,345,678.901 $' },
    ];
    test.each(testData)(
        `should check if price and currency 
        sign converted to single string correctly`,
        ({ value, symbol, expected }) => {
            expect(getPrice(value, symbol)).toStrictEqual(expected);
        }
    );
});
