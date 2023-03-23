import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

afterEach(jest.clearAllMocks);

jest.mock('../../utils/getPrice', () => ({
    __esModule: true,
    getPrice: jest.fn(() => '999 ₽'),
}));

const elem: Product = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 1231,
    priceSymbol: '₽',
    category: 'Электроника',
    imgUrl: 'string',
};

describe('ProductCard snapshot', () => {
    it('should have img', () => {
        const renderedProductCard = render(<ProductCard {...elem} />);

        const imgElement = renderedProductCard.getByTestId(
            'product-card__image'
        );

        expect(imgElement).toBeInstanceOf(HTMLImageElement);
        expect(imgElement.getAttribute('src')).toStrictEqual(elem.imgUrl);

        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
    it('shouldnt have img', () => {
        const renderedProductCard = render(
            <ProductCard {...elem} imgUrl={undefined} />
        );

        expect(
            renderedProductCard.queryByTestId('product-card__image')
        ).toBeNull();
        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
});
