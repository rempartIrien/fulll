import { User } from './user.model';

export interface Page<T> {
  page_number: number;
  per_page: number;
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export const EMPTY_PAGE: Page<unknown> = {
  total_count: 0,
  page_number: 1,
  per_page: 1,
  incomplete_results: false,
  items: [],
};

export interface QueryParams {
  query: string;
  pageNumber?: number;
  perPage?: number;
}

const GITHUB_API: string = 'https://api.github.com/search';

/**
 * Returns a page of users.
 * Throws an Error in case of status different from 200.
 * @param query The query string
 * @param pageNumber The page number, default is 1
 * @param perPage The number of items per page, default is 30
 */
export function searchUsers({
  query,
  pageNumber = 1,
  perPage = 30,
}: QueryParams): Promise<Page<User>> {
  if (!query) {
    return Promise.resolve(EMPTY_PAGE as Page<User>);
  }
  return window
    .fetch(
      `${GITHUB_API}/users?q=${encodeURIComponent(
        query
      )}&page=${pageNumber}&per_page=${perPage}`
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((page) => {
      return { ...page, page_number: pageNumber, per_page: perPage };
    });
}
