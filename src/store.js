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
    fetchTodos: async () => {
      set({ loading: true });

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=10'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch todos!');
        }

        set({ todos: await response.json(), error: null }); //!
      } catch (error) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
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
