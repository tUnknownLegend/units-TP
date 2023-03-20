import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SortButton } from './SortButton';

afterEach(jest.clearAllMocks);

describe('Button render', () => {
    const noop = () => {};

    it('SortButton snapshot and button text', () => {
        const renderedButton = render(
            <SortButton currentSort="по умолчанию" onSortButtonClick={noop} />
        );
        expect(renderedButton.asFragment()).toMatchSnapshot();
    });

    it('checks sort button click and ', () => {
        const onSortButtonClick = jest.fn();
        const renderedButton = render(
            <SortButton
                currentSort="по умолчанию"
                onSortButtonClick={onSortButtonClick}
            />
        );

        expect(onSortButtonClick).toHaveBeenCalledTimes(0);
        fireEvent.click(renderedButton.getByRole('button'));
        expect(onSortButtonClick).toHaveBeenCalledTimes(1);
    });
});
