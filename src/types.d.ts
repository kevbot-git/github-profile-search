export declare type GitHubUserResult = {
  login: string;
  html_url: string;
  avatar_url: string;
  repos_url: string;
  followers: number;
}

export declare type GitHubReposResult = Array<{
  html_url: string;
  full_name: string;
  visibility: 'public' | 'private';
  stargazers_count: number;
  updated_at: string;
}>

export declare type RepoInfo = {
  url: string,
  name: string,
  stars: number;
  updatedAt: Date;
}

export declare type CollatedUserInfo = {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  followerCount: number;
  repositoryCount: number;
  topRepos: Array<RepoInfo>;
}