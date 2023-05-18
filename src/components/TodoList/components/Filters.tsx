import React from 'react';
import styled from 'styled-components';
import { FilterType } from '..';

interface IFiltersProps {
    setFilter: (value: FilterType) => void;
}

const Filters: React.FC<IFiltersProps> = props => {
    const { setFilter } = props;
    return (
        <SFilters>
            <SFilter onClick={() => setFilter('all')}>Show all</SFilter>
            <SFilter onClick={() => setFilter('active')}>Show active</SFilter>
            <SFilter onClick={() => setFilter('completed')}>Show completed</SFilter>
        </SFilters>
    );
};

export default Filters;

const SFilters = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    background-color: #669bbc;
    padding: 20px 40px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const SFilter = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    font-size: 20px;
    background-color: #fdf0d5;
    border-radius: 10px;
    &:hover {
        transform: scale(1.1);
    }
`;
