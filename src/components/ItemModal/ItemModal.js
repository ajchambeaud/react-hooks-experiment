import React, { useState } from 'react';
import styled from 'styled-components';
import * as api from '../../api';
import useRequest from '../../hooks/useRequest';
import { PENDING } from '../../constants';

const ModalOverlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #808080b8;
`;

const Modal = styled.div`
  z-index: 1010;
  position: fixed;
  width: 25%;
  min-width: 300px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 5px;
  box-shadow: 3px 2px 20px 0px #9e9e9e;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 1.3em;
  width: 100%;
  text-align: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Input = styled.input`
  padding: 0.3em;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1.2em;
  margin-top: 15px;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  flex: 1;
`;

const Button = styled.button`
  padding: 0.4em;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1.1em;
  color: #030000;
  border: none;
  width: 30%;

  &.save {
    background-color: #22b0f1bd;
  }

  &.cancel {
    background-color: #bcc5cabd;
  }

  &:disabled {
    color: white;
    background-color: #eee;
  }
`;

const ItemModal = ({ onCancel, onSave }) => {
  const [text, setText] = useState('');
  const [status, addItemRequest] = useRequest(api.addItem, onSave);

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleSave = () => {
    addItemRequest(text);
  };

  const handleCancel = () => {
    if (status !== PENDING) {
      onCancel();
    }
  };

  return (
    <>
      <Modal>
        <Title>Add Item</Title>
        <Form>
          <Input type="text" value={text} onChange={handleTextChange} placeholder="Item title" />
          <ButtonGroup>
            <Button onClick={onCancel} className="cancel" disabled={status === PENDING}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="save" disabled={status === PENDING || text.trim() === ''}>
              Save
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
      <ModalOverlay onClick={handleCancel} />
    </>
  );
};

export default ItemModal;
