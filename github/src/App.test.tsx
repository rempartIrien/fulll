import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './App';
import { QueryParams, searchUsers } from './github.api';
import { getUserPage } from './test.utils';

jest.mock('./github.api');

test('displays a text input to search users', () => {
  render(<App />);
  const inputNode = getTextInput();
  expect(inputNode).toBeInTheDocument();
});

test('displays an error message if request cannot be made', () => {
  render(<App />);
  const errorMessage = screen.getByText(
    'Please type a username in the input field.'
  );
  expect(errorMessage).toBeInTheDocument();
});

test('debounces user inputs not to make too many requests', async () => {
  render(<App />);
  const inputNode = getTextInput();

  mockAndGetGoodResponse();

  fireEvent.change(inputNode, { target: { value: '1st try' } });
  fireEvent.change(inputNode, { target: { value: '2nd try' } });
  await waitFor(() => delay(100));
  fireEvent.change(inputNode, { target: { value: '3rd try' } });
  await waitFor(() => delay(250));
  fireEvent.change(inputNode, { target: { value: '4th try' } });
  await waitFor(() => delay(100));
  fireEvent.change(inputNode, { target: { value: '5th try' } });
  await waitFor(() => delay(250));
  fireEvent.change(inputNode, { target: { value: '6th try' } });
  await waitFor(() => delay(500));
  fireEvent.change(inputNode, { target: { value: '7th try' } });
  await waitFor(() => delay(250));
  fireEvent.change(inputNode, { target: { value: '8th try' } });
  await waitFor(() => delay(500));

  expect(searchUsers).toHaveBeenCalledTimes(5);

  const calledWith: string[] = (
    searchUsers as jest.MockedFunction<typeof searchUsers>
  ).mock.calls.map((call) => call[0].query);
  expect(calledWith).toEqual([
    '3rd try',
    '5th try',
    '6th try',
    '7th try',
    '8th try',
  ]);
});

test('changes page', async () => {
  render(<App />);
  const inputNode = getTextInput();

  mockAndGetGoodResponse();

  fireEvent.change(inputNode, { target: { value: 'rempartirien' } });
  await waitFor(() => delay(250));

  expect(searchUsers).toHaveBeenCalledTimes(1);

  const nextNode = screen.getByText('Next page');
  fireEvent.click(nextNode);
  await waitFor(() => delay(250));

  expect(searchUsers).toHaveBeenCalledTimes(2);

  const previousNode = await waitFor(() => screen.getByText('Previous page'));

  fireEvent.click(previousNode);
  await waitFor(() => delay(250));

  expect(searchUsers).toHaveBeenCalledTimes(3);
  const calls: [QueryParams][] = (
    searchUsers as jest.MockedFunction<typeof searchUsers>
  ).mock.calls;
  expect(calls).toEqual([
    [{ query: 'rempartirien', pageNumber: 1 }],
    [{ query: 'rempartirien', pageNumber: 2 }],
    [{ query: 'rempartirien', pageNumber: 1 }],
  ]);
});

describe('when request is made', () => {
  test('displays an error message if request is in error', async () => {
    render(<App />);

    (searchUsers as jest.MockedFunction<typeof searchUsers>).mockImplementation(
      () => Promise.reject('Oops, something went wrong.')
    );

    const inputNode = getTextInput();
    fireEvent.change(inputNode, { target: { value: '100th try' } });

    const errorMessage = await waitFor(() =>
      screen.getByText('Oops! Something went wrong, please try again later.')
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays results if request is successfull', async () => {
    render(<App />);

    const inputNode = getTextInput();
    fireEvent.change(inputNode, { target: { value: 'rempartirien' } });

    mockAndGetGoodResponse();

    const username = await waitFor(() => screen.getByText('rempartIrien'));
    expect(username).toBeInTheDocument();
  });
});

function getTextInput(): HTMLInputElement {
  return screen.getByLabelText('Search for username', {
    selector: 'input',
  }) as HTMLInputElement;
}

function delay(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function mockAndGetGoodResponse(): void {
  (searchUsers as jest.MockedFunction<typeof searchUsers>).mockImplementation(
    ({ pageNumber = 1 }) => Promise.resolve(getUserPage(pageNumber))
  );
}
