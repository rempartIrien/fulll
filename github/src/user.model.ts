export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: `https://api.github.com/users/${User['login']}`;
  html_url: `https://github.com/${User['login']}`;
  followers_url: `https://api.github.com/users/${User['login']}/followers`;
  subscriptions_url: `https://api.github.com/users/${User['login']}/subscriptions`;
  organizations_url: `https://api.github.com/users/${User['login']}/orgs`;
  repos_url: `https://api.github.com/users/${User['login']}/repos`;
  received_events_url: `https://api.github.com/users/${User['login']}/received_events`;
  type: 'User';
  score: number;
  following_url: `https://api.github.com/users/${User['login']}/following{/other_user}`;
  gists_url: `https://api.github.com/users/${User['login']}/gists{/gist_id}`;
  starred_url: `https://api.github.com/users/${User['login']}/starred{/owner}{/repo}`;
  events_url: `https://api.github.com/users/${User['login']}/events{/privacy}`;
  site_admin: boolean;
}
