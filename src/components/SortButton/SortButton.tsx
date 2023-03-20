import React, { FC } from 'react';

import type { SortBy } from '../../types';

import './SortButton.css';

type SortButtonProps = {
    currentSort: SortBy;
    onSortButtonClick: () => void;
};

export const SortButton: FC<SortButtonProps> = ({
    onSortButtonClick,
    currentSort,
}) => {
    return (
        <button
            data-testid="sort-button-id"
            className="sort-button"
            onClick={onSortButtonClick}
        >
            Сортировать {currentSort}
        </button>
    );
};
