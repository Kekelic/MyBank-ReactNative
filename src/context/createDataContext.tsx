import React, { useReducer } from 'react';
import { Action, Dispatch } from 'redux';

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type BoundActions<T> = {
  [K in keyof T]: T[K] extends (d: Dispatch<Action>) => infer R ? R : never;
};

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({ children }: ThemeContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {} as BoundActions<any>;
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
