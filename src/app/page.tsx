'use client';

import styles from './page.module.css'
import SearchForm from './components/SearchForm';
import { CollatedUserInfo, GitHubReposResult, GitHubUserResult, RepoInfo } from '@/types';
import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';

const GITHUB_API_URL = 'https://api.github.com';

export default function Home() {

  function setTheme(theme: 'dark' | 'light') {
    setIsDarkTheme(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [foundUserInfo, setFoundUserInfo] = useState<CollatedUserInfo>();

  /**
   * 
   * @param reposResult A list of repos to sort
   * @param firstN The number of repos to take from the top
   * @returns Top n public repos sorted firstly by stars, then by most recently updated
   */
  function getTopRepos(reposResult: GitHubReposResult, firstN: number) {
    return reposResult
      .filter((repo) => repo.visibility === 'public')
      .sort((repoA, repoB) => repoB.stargazers_count - repoA.stargazers_count
        || new Date(repoB.updated_at).getTime() - new Date(repoA.updated_at).getTime())
      .slice(0, firstN)
      .map((repo) => ({
        name: repo.full_name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        updatedAt: new Date(repo.updated_at),
      } as RepoInfo));
  }

  function collateUserInfo(userResult: GitHubUserResult, reposResult: GitHubReposResult) {
    const userInfo: CollatedUserInfo = {
      username: userResult.login,
      profileUrl: userResult.html_url,
      avatarUrl: userResult.avatar_url,
      followerCount: userResult.followers,
      repositoryCount: reposResult.length,
      topRepos: getTopRepos(reposResult, 4),
    }

    return userInfo;
  }

  async function getUser(userQuery: string) {
    const response = await fetch(`${GITHUB_API_URL}/users/${userQuery}`);

    if (response.status === 404) {
      throw new Error(`User '${userQuery}' not found`);
    }

    if (!response.ok) throw new Error('An unhandled error occurred');

    const userResult: GitHubUserResult = await response.json();

    return userResult;
  }

  async function getRepos(userResult: GitHubUserResult) {
    const response = await fetch(userResult.repos_url);

    if (!response.ok) throw new Error('An unhandled error occurred');

    const reposResult: GitHubReposResult = await response.json();

    return reposResult;
  }

  async function onSearch(query: string) {
    const userResult = await getUser(query);

    const reposResult = await getRepos(userResult);

    console.log('user', userResult);
    console.log('repos', reposResult);

    const userInfo = collateUserInfo(userResult, reposResult);
    console.log('userInfo', userInfo);

    setFoundUserInfo(userInfo);
  }

  return (
    <main className={styles.main}>
      <div>
        <button onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}>{isDarkTheme ? 'Light' : 'Dark'} mode</button>
      </div>
      <div>
        <SearchForm onSubmit={onSearch}></SearchForm>
      </div>
      {foundUserInfo && (
        <UserCard userInfo={foundUserInfo} />
      )}
    </main>
  )
}
