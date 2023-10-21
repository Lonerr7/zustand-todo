import create from 'zustand';
import { nanoid } from 'nanoid';
import { persist } from 'zustand/middleware';

export const useTodos = create(
  persist((set) => ({
    todos: [
      { id: 1, title: 'Learn JS', completed: true },
      { id: 2, title: 'Learn React', completed: false },
    ],
    loading: false,
    error: null,

    addTodo: (title) =>
      set((state) => {
        const newTodo = { id: nanoid(), title, completed: false };

        return {
          todos: [...state.todos, newTodo],
        };
      }),
    toggleTodo: (todoId) =>
      set((state) => {
        return {
          todos: state.todos.map((todo) => {
            if (todo.id === todoId) {
              todo.completed = !todo.completed;
            }

            return todo;
          }),
        };
      }),
  }))
);

export const useFilter = create((set) => ({
  filter: 'all',
  setFilter: (value) =>
    set(() => {
      return {
        filter: value,
      };
    }),
}));
