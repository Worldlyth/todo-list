import React, { useState } from 'react';
import styled from 'styled-components';
import addIcon from '../../../assets/icons/add.svg';
import { v4 as uuidv4 } from 'uuid';
import { ITodo } from '../../../models/todo.model';

interface INewTodoProps {
    addTodo: (todo: ITodo) => void;
}

const NewTodo: React.FC<INewTodoProps> = props => {
    const { addTodo } = props;

    const [todoTitle, setTodoTitle] = useState<string>('');

    const handleSetTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value);
    };

    const handleOnClick = () => {
        addTodo({ id: uuidv4(), title: todoTitle, completed: false });
        setTodoTitle('');
    };

    return (
        <SNewTodo>
            <SInput
                value={todoTitle}
                type='text'
                placeholder='Enter here what you want to do'
                onChange={handleSetTodoTitle}
            />
            <SAddIcon src={addIcon} onClick={handleOnClick} />
        </SNewTodo>
    );
};

export default NewTodo;

const SInput = styled.input`
    appearance: none;
    border: none;
    border-radius: 10px;
    background-color: #fdf0d5;
    width: 400px;
    padding: 0 20px;
`;

const SAddIcon = styled.img`
    height: 40px;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

const SNewTodo = styled.div`
    display: flex;
    gap: 10px;
    max-width: 500px;
    position: relative;
`;
