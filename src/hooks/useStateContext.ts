import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export function useStateContext(): any {
  return useContext(StateContext);
}