import React, { useState } from 'react';
import styled from 'styled-components';
import * as api from '../../api';
import useRequest from '../../hooks/useRequest';
import { INIT, PENDING, FAILURE } from '../../constants';
import { ClipLoader } from 'react-spinners';

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  color: red;
`;

const ListItem = ({ id, title, onRemove }) => {
  const [status, remove] = useRequest(api.removeItem, () => {
    console.log(`calling on remove ${id}`);
    onRemove(id);
  });

  return (
    <ItemRow key={id}>
      {title}
      {(status === INIT || status === FAILURE) && <DeleteButton onClick={() => remove(id)}>✕</DeleteButton>}
      {status === PENDING && <ClipLoader size={10} color={'red'} loading={true} />}
    </ItemRow>
  );
};

export default ListItem;
