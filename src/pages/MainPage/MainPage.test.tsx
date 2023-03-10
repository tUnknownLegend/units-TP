import {
    act,
    cleanup,
    fireEvent,
    render,
    renderHook,
} from '@testing-library/react';
import React from 'react';
import { MainPage } from './MainPage';
import { useCurrentTime } from '../../hooks';
import '@testing-library/jest-dom';

describe('Main page live clock', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(jest.clearAllMocks);

    const getTime = () => new Date().toLocaleTimeString('ru-RU');
    it('should be called on advance time', () => {
        jest.spyOn(global, 'setInterval');
        const callback = jest.fn(getTime);

        const { result } = renderHook(() => useCurrentTime(callback));
        expect(setInterval).toHaveBeenCalled();
        expect(callback).toHaveBeenCalled();
        cleanup();
    });

    it('should return correct time', () => {
        jest.spyOn(global, 'setInterval');
        const callback = jest.fn(getTime);

        const { result } = renderHook(() => useCurrentTime(callback));
        expect(result.current).toEqual(getTime());
        act(() => jest.advanceTimersByTime(69999));
        expect(result.current).toEqual(getTime());
        cleanup();
    });
});

describe('checks text fields on main page', () => {
    it('should have VK Маркет name', () => {
        const renderedMainPage = render(<MainPage />);

        expect(renderedMainPage.getByText('VK Маркет')).toHaveClass(
            'main-page__title'
        );
    });
});

describe('Main page select category', () => {
    it('clicl on the first matched button', () => {
        const renderedMainPage = render(<MainPage />);

        const categoryElement = renderedMainPage
            .getAllByTestId('button-select-category')
            .at(0);

        if (!categoryElement) {
            fail('no category button was found');
        }
        fireEvent.click(categoryElement);

        const productEdited = renderedMainPage.getAllByTestId(
            'product-card__category'
        );

        expect(
            productEdited.filter(
                (productCard) =>
                    productCard.innerText === categoryElement.innerText
            ).length
        ).toEqual(productEdited.length);
    });
});
