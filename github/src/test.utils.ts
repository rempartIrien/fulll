import { Page } from './github.api';
import { User } from './user.model';

const id: User['id'] = 72293375;
const login: User['login'] = 'rempartIrien';
const partialUser: Omit<Omit<User, 'id'>, 'login'> = {
  node_id: 'MDQ6VXNlcjcyMjkzMzc=',
  avatar_url: 'https://avatars.githubusercontent.com/u/7229337?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/rempartIrien',
  html_url: 'https://github.com/rempartIrien',
  followers_url: 'https://api.github.com/users/rempartIrien/followers',
  following_url:
    'https://api.github.com/users/rempartIrien/following{/other_user}',
  gists_url: 'https://api.github.com/users/rempartIrien/gists{/gist_id}',
  starred_url:
    'https://api.github.com/users/rempartIrien/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/rempartIrien/subscriptions',
  organizations_url: 'https://api.github.com/users/rempartIrien/orgs',
  repos_url: 'https://api.github.com/users/rempartIrien/repos',
  events_url: 'https://api.github.com/users/rempartIrien/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/rempartIrien/received_events',
  type: 'User',
  site_admin: false,
  score: 1.0,
};

export function getUserPage(pageNumber = 1): Page<User> {
  return {
    total_count: 5,
    page_number: pageNumber,
    per_page: 2,
    incomplete_results: false,
    items: getItems(pageNumber),
  };
}

function getItems(pageNumber: number): User[] {
  if (pageNumber === 1) {
    return [
      { ...partialUser, id, login },
      { ...partialUser, id: id + 1, login: `${login}2` },
    ];
  } else if (pageNumber === 2) {
    return [
      { ...partialUser, id: id + 2, login: `${login}3` },
      { ...partialUser, id: id + 3, login: `${login}4` },
    ];
  } else if (pageNumber === 3) {
    return [{ ...partialUser, id: id + 4, login: `${login}5` }];
  } else {
    throw new Error(
      `Seems like you sjhouldn't be here with pageNumber ${pageNumber}`
    );
  }
}
