import { describe } from '@jest/globals';
import { getPrice } from '../getPrice';

describe('getPrice function', () => {
    it('rubles', () => {
        expect(getPrice(12345678.901, '₽')).toEqual('12,345,678.901 ₽');
    });
    it('no symbol', () => {
        expect(getPrice(12345678.901)).toEqual('12,345,678.901 ₽');
    });
    it('dollars', () => {
        expect(getPrice(12345678.901, '$')).toEqual('12,345,678.901 $');
    });
});
