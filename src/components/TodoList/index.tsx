import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ITodo, todos, TodosType } from '../../models/todo.model';
import Count from './components/Count';
import Filters from './components/Filters';
import NewTodo from './components/NewTodo';
import Todo from './components/Todo';

interface ITodoListProps {}

export type FilterType = 'all' | 'active' | 'completed';

const TodoList: React.FC<ITodoListProps> = () => {
    const [todoList, setTodoList] = useState<TodosType>(todos);
    const [filteredTodoList, setFilteredTodoList] = useState<TodosType>(todos);
    const [filter, setFilter] = useState<FilterType>('all');

    const getFromLocalStorage = () => {
        const data = localStorage.getItem('todos');
        if (data) {
            setTodoList(JSON.parse(data));
        }
        const currentFilter = localStorage.getItem('currentFilter');
        if (currentFilter) setFilter(currentFilter as FilterType);
    };

    const setToLocalStorage = useCallback(
        (todos: TodosType) => {
            const data = JSON.stringify(todos);
            localStorage.setItem('todos', data);
            localStorage.setItem('currentFilter', filter);
        },
        [filter]
    );

    const removeTodo = (id: string) => {
        const updatedTodos = todoList.filter(el => el.id !== id);
        setTodoList(updatedTodos);
    };

    const addTodo = (todo: ITodo) => {
        if (todo.title.length > 0) {
            setTodoList([...todoList, todo]);
        }
    };

    const completeTodo = (id: string) => {
        const updatedTodos = todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodoList(updatedTodos);
    };

    const editTodo = (id: string, title: string) => {
        const updatedTodos = todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, title: title };
            }
            return todo;
        });
        setTodoList(updatedTodos);
    };

    const handleSetFilter = (filter: FilterType) => {
        setFilter(filter);
    };

    useEffect(() => {
        switch (filter) {
            case 'active':
                return setFilteredTodoList(todoList.filter(el => !el.completed));
            case 'completed':
                return setFilteredTodoList(todoList.filter(el => el.completed));
            default:
                return setFilteredTodoList(todoList);
        }
    }, [filter, todoList]);

    useEffect(() => {
        setToLocalStorage(todoList);
    }, [filter, setToLocalStorage, todoList]);

    useMemo(() => {
        getFromLocalStorage();
    }, []);

    return (
        <STodoWrapper>
            <SHeader>
                <SH1>TODO LIST</SH1>
                <NewTodo addTodo={addTodo} />
            </SHeader>
            <Filters setFilter={handleSetFilter} />
            <STodoList>
                <Count currentTodos={filter} value={filteredTodoList.length} />
                {filteredTodoList.map(todo => {
                    const { id, title, completed } = todo;
                    return (
                        <Todo
                            key={id}
                            title={title}
                            completed={completed}
                            completeTodo={completeTodo}
                            removeTodo={removeTodo}
                            editTodo={editTodo}
                            id={id}
                        />
                    );
                })}
            </STodoList>
        </STodoWrapper>
    );
};

export default TodoList;

const STodoList = styled.div`
    background-color: #669bbc;
    padding: 20px 40px;
    border-radius: 10px;
`;

const SH1 = styled.h1`
    font-size: 40px;
`;

const SHeader = styled.div`
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 20px 40px;
    background-color: #669bbc;
`;

const STodoWrapper = styled.div`
    margin: 10vh 20vw;
    color: #003049;
`;
