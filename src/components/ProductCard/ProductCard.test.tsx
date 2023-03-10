import React, { FC } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Category, PriceSymbol } from '../../types';

afterEach(jest.clearAllMocks);

jest.mock('../../utils/getPrice', () => {
    return {
        __esModule: true,
        getPrice: jest.fn(() => '999 ₽'),
    };
});

const elem = {
    id: 1,
    name: 'string',
    description: 'string',
    price: 1231,
    priceSymbol: '₽' as PriceSymbol,
    category: 'Электроника' as Category,
    imgUrl: 'string',
};

describe('ProductCard snapshot', () => {
    it('should have img', () => {
        const renderedProductCard = render(
            <ProductCard
                id={elem.id}
                name={elem.name}
                description={elem.description}
                price={elem.price}
                priceSymbol={elem.priceSymbol}
                category={elem.category}
                imgUrl={elem.imgUrl}
            />
        );
        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
    it('shouldnt have img', () => {
        const renderedProductCard = render(
            <ProductCard
                id={elem.id}
                name={elem.name}
                description={elem.description}
                price={elem.price}
                priceSymbol={elem.priceSymbol}
                category={elem.category}
            />
        );
        expect(renderedProductCard.asFragment()).toMatchSnapshot();
    });
});
