import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../../elements/Checkbox';
import deleteIcon from '../../../../assets/icons/delete.svg';
import editIcon from '../../../../assets/icons/edit.svg';
import doneIcon from '../../../../assets/icons/done.svg';
import cancelIcon from '../../../../assets/icons/cancel.svg';

interface ITodoProps {
    title: string;
    completed: boolean;
    id: string;
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    editTodo: (id: string, title: string) => void;
}

const Todo: React.FC<ITodoProps> = props => {
    const { title, completed, id, removeTodo, completeTodo, editTodo } = props;
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>(title);

    const handleEditTodo = () => {
        setIsEditMode(false);
        editTodo(id, todoTitle);
        if (todoTitle.length === 0) {
            removeTodo(id);
        }
    };

    const renderActions = () => {
        if (isEditMode) {
            return (
                <SActions>
                    <SIcon src={doneIcon} onClick={handleEditTodo} />
                    <SIcon src={cancelIcon} onClick={() => setIsEditMode(false)} />
                </SActions>
            );
        }
        return (
            <SActions>
                <SIcon src={editIcon} onClick={() => setIsEditMode(true)} />
                <SIcon src={deleteIcon} onClick={handleRemoveTodo} />
            </SActions>
        );
    };

    const renderCheckbox = () => {
        if (isEditMode) return;
        return <Checkbox isChecked={completed} onClick={handleCompleteTodo} />;
    };

    const handleCompleteTodo = () => {
        completeTodo(id);
    };

    const handleRemoveTodo = () => {
        removeTodo(id);
    };

    const renderTitle = () => {
        if (isEditMode) {
            return <SInput onChange={e => setTodoTitle(e.currentTarget.value)} type='text' value={todoTitle} />;
        }
        return <STodoTitle>{title}</STodoTitle>;
    };

    return (
        <STodo>
            {renderCheckbox()}
            {renderTitle()}
            {renderActions()}
        </STodo>
    );
};

export default Todo;

const STodo = styled.div`
    display: flex;
    padding: 20px 40px;
    border-radius: 10px;
    font-size: 20px;
    align-items: center;
    gap: 20px;
    background-color: #fdf0d5;
    margin-bottom: 20px;
`;

const STodoTitle = styled.div`
    font-size: 24px;
    text-align: left;
`;

const SIcon = styled.img`
    height: 25px;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
    }
`;

const SActions = styled.div`
    display: flex;
    gap: 20px;
    margin-left: auto;
`;

const SInput = styled.input`
    color: #003049;
    font-size: 24px;
    border-radius: 10px;
    background-color: #fdf0d5;
    width: 400px;
    padding: 10px 20px;
`;
