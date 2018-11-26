import React, { useReducer } from 'react';
import ItemModal from './components/ItemModal';
import List from './components/List';
import styled from 'styled-components';
import useRequest from './hooks/useRequest';
import { findLocalNegativePatterns } from 'fast-glob/out/managers/tasks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  justify-items: center;
  width: 35%;
  min-width: 450px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.3em;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Count = styled.div`
  text-align: center;
  font-size: 0.8em;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 0.4em;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1.1em;
  color: #030000;
  border: none;
`;

const Placeholder = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 0.8em;
  height: 100px;
  align-items: center;
  background-color: #ffffff54;
  border-radius: 14px;
  margin-bottom: 15px;
  color: gray;
`;

const initialState = { showModal: false, items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, showModal: action.value };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.value], showModal: false };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.value), showModal: false };
    case 'LOAD_ITEMS':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, showModal } = state;
  const count = items.length;

  return (
    <Container>
      <Title>Supermarket List</Title>

      <Count>{count ? `${count} items` : 'No items'}</Count>

      {count ? (
        <List items={items} onRemove={id => dispatch({ type: 'REMOVE_ITEM', value: id })} />
      ) : (
        <Placeholder>The list is empty</Placeholder>
      )}

      {showModal && (
        <ItemModal
          onCancel={() => dispatch({ type: 'SHOW_MODAL', value: false })}
          onSave={item => dispatch({ type: 'ADD_ITEM', value: item })}
        />
      )}
      <Button onClick={() => dispatch({ type: 'SHOW_MODAL', value: true })}>Add item</Button>
    </Container>
  );
};

export default App;
