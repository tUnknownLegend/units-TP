import { describe } from '@jest/globals';
import { getPrice } from './getPrice';

describe('', () => {
    it('', () => {
        expect(getPrice(12345678.901, '₽')).toEqual('12,345,678.901 ₽');
    });
    it('', () => {
        expect(getPrice(12345678.901)).toEqual('12,345,678.901 ₽');
    });
    it('', () => {
        expect(getPrice(12345678.901, '$')).toEqual('12,345,678.901 $');
    });
});
