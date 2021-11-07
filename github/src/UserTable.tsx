import { useMemo } from 'react';

import { Page } from './github.api';
import { User } from './user.model';

interface UserTableProps {
  users: Page<User>;
  onPageChange: (pageNumber: number) => unknown;
}

/**
 * Displays a user table of an error message in case the user page is empty.
 */
function UserTable({ users, onPageChange }: UserTableProps): JSX.Element {
  const isPreviousAllowed: boolean = useMemo(
    () => users.page_number - 1 > 0,
    [users]
  );
  const isNextAllowed: boolean = useMemo(
    () => users.page_number < users.total_count / users.per_page,
    [users]
  );

  if (!users.total_count) {
    return (
      <p>No result for your search, please try again with another query.</p>
    );
  }

  return (
    <>
      <p>
        {users.total_count} result{users.total_count > 1 ? 's' : ''}
      </p>
      {isPreviousAllowed && (
        <button onClick={() => onPageChange(users.page_number - 1)}>
          Previous page
        </button>
      )}
      {isNextAllowed && (
        <button onClick={() => onPageChange(users.page_number + 1)}>
          Next page
        </button>
      )}
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Login</td>
          </tr>
        </thead>
        <tbody>
          {users.items.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <a href={user.html_url}>{user.login}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
