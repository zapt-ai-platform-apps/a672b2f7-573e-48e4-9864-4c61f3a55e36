import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export default function useStateContext(): any {
  return useContext(StateContext);
}