import React from 'react';
import styled from 'styled-components';
import { FilterType } from '..';

interface ICountProps {
    value: number;
    currentTodos: FilterType
}

const Count: React.FC<ICountProps> = props => {
    const { value, currentTodos } = props;

    return <SCount>{`${currentTodos.toUpperCase()}: ${value}`}</SCount>;
};

export default Count;

const SCount = styled.div`
    font-size: 30px;
    margin-bottom: 20px
`;
