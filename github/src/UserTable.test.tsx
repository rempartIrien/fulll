import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserTable from './UserTable';
import { EMPTY_PAGE, Page } from './github.api';
import { User } from './user.model';
import { getUserPage } from './test.utils';

test('displays an error message if there is no result', () => {
  render(
    <UserTable users={EMPTY_PAGE as Page<User>} onPageChange={jest.fn()} />
  );
  const errorMessage = screen.getByText(
    'No result for your search, please try again with another query.'
  );
  expect(errorMessage).toBeInTheDocument();
});

test('displays a table with provided users', () => {
  render(<UserTable users={getUserPage()} onPageChange={jest.fn()} />);
  const rempartIrienNode = screen.getByText('rempartIrien');
  const rempartIrien2Node = screen.getByText('rempartIrien2');
  expect(rempartIrienNode).toBeInTheDocument();
  expect(rempartIrien2Node).toBeInTheDocument();
});

test('displays next button if possible', () => {
  render(<UserTable users={getUserPage()} onPageChange={jest.fn()} />);

  const nextNode = screen.getByText('Next page');
  expect(nextNode).toBeInTheDocument();
});

test('does not display next button if not possible', () => {
  render(<UserTable users={getUserPage(3)} onPageChange={jest.fn()} />);

  const nextNode = screen.queryByText('Next page');
  expect(nextNode).toBeNull();
});

test('displays previous button if possible', () => {
  render(<UserTable users={getUserPage(2)} onPageChange={jest.fn()} />);

  const nextNode = screen.getByText('Previous page');
  expect(nextNode).toBeInTheDocument();
});

test('does not display previous button if not possible', () => {
  render(<UserTable users={getUserPage(1)} onPageChange={jest.fn()} />);

  const nextNode = screen.queryByText('Previous page');
  expect(nextNode).toBeNull();
});

test('asks for next users', () => {
  const onPageChange = jest.fn();
  render(<UserTable users={getUserPage()} onPageChange={onPageChange} />);

  const nextNode = screen.getByText('Next page');
  fireEvent.click(nextNode);

  expect(onPageChange).toBeCalledWith(2);
});

test('asks for previous users', () => {
  const onPageChange = jest.fn();
  render(<UserTable users={getUserPage(2)} onPageChange={onPageChange} />);

  const previousNode = screen.getByText('Previous page');
  fireEvent.click(previousNode);

  expect(onPageChange).toBeCalledWith(1);
});
