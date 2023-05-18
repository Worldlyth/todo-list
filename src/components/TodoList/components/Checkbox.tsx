import React from 'react';
import styled from 'styled-components';
import checkboxBlank from '../../../assets/icons/check-blank.svg';
import checkboxFilled from '../../../assets/icons/check-filled.svg';

interface ICheckboxProps {
    isChecked: boolean;
    onClick: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = props => {
    const { isChecked, onClick } = props;

    return (
        <SCheckbox>
            <SCheckboxIcon onClick={onClick} src={isChecked ? checkboxFilled : checkboxBlank} />
        </SCheckbox>
    );
};

export default Checkbox;

const SCheckboxIcon = styled.img`
    cursor: pointer;
    height: 25px;
    &:hover {
        transform: scale(1.2);
    }
`;

const SCheckbox = styled.div`
    display: flex;
`;
