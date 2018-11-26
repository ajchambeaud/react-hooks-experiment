import React, { useState } from 'react';
import styled from 'styled-components';
import * as api from '../../api';
import useRequest from '../../hooks/useRequest';
import { PENDING } from '../../constants';
import ListItem from '../ListItem';

const List = ({ items, onRemove }) => items.map(item => <ListItem {...item} onRemove={onRemove} />);

export default List;
