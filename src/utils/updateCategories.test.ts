import { describe, expect, test } from '@jest/globals';
import { updateCategories } from './updateCategories';

describe('', () => {
    it('', () => {
        expect(
            updateCategories(['Электроника', 'Для дома', 'Одежда'], 'Одежда')
        ).toEqual(['Электроника', 'Для дома']);
    });

    it('', () => {
        expect(updateCategories([], 'Одежда')).toEqual(['Одежда']);
    });
});
