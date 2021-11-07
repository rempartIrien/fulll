import React, { useEffect, useState } from 'react';

import { useDebounce } from './debounce.hook';
import { EMPTY_PAGE, Page, QueryParams, searchUsers } from './github.api';
import { User } from './user.model';
import UserTable from './UserTable';

import './App.css';

function App(): JSX.Element {
  const [users, setUsers] = useState<Page<User>>(EMPTY_PAGE as Page<User>);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    query: '',
    pageNumber: 1,
  });
  const delayedQueryParams: QueryParams = useDebounce(queryParams, 250);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!delayedQueryParams.query) {
      setError('Please type a username in the input field.');
    } else if (delayedQueryParams) {
      setError('');
      searchUsers(delayedQueryParams)
        .then((page) => setUsers(page))
        .catch(() =>
          setError('Oops! Something went wrong, please try again later.')
        );
    }
  }, [delayedQueryParams]);

  function search(query: string, pageNumber: number = 1): void {
    setQueryParams({ query, pageNumber });
  }

  function changePage(pageNumber: number): void {
    setQueryParams({ ...queryParams, pageNumber });
  }

  function displayResult(): JSX.Element {
    if (error) {
      return <p>{error}</p>;
    } else {
      return (
        <UserTable
          users={users}
          onPageChange={(pageNumber) => changePage(pageNumber)}
        ></UserTable>
      );
    }
  }

  return (
    <div className="App">
      <h1>Github user search API</h1>
      <form>
        <label>
          Search for username
          <input
            type="text"
            value={queryParams.query}
            onChange={(event) => search(event.target.value)}
          />
        </label>
      </form>
      <section>{displayResult()}</section>
    </div>
  );
}

export default App;
