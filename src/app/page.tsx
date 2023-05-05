'use client';

import styles from './page.module.css'
import SearchForm from './components/SearchForm';
import { CollatedUserInfo, GitHubReposResult, GitHubUserResult, RepoInfo } from '@/types';
import { useState } from 'react';
import UserCard from './components/UserCard';
import ThemeToggle from './components/ThemeToggle';

const GITHUB_API_URL = 'https://api.github.com';

export default function Home() {
  const [foundUserInfo, setFoundUserInfo] = useState<CollatedUserInfo>();

  const [searchError, setSearchError] = useState<Error>();

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
    try {
      const userResult = await getUser(query);
      const reposResult = await getRepos(userResult);
      const userInfo = collateUserInfo(userResult, reposResult);

      setFoundUserInfo(userInfo);
      setSearchError(undefined);
    } catch (error) {
      setSearchError(error as Error);
      setFoundUserInfo(undefined);
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <ThemeToggle />
      </div>
      <div>
        <SearchForm onSubmit={onSearch} />
      </div>
        {searchError && (
          <div className={styles.errorMessage}>{searchError.message}</div>
        )}
      {foundUserInfo && (
        <UserCard userInfo={foundUserInfo} />
      )}
    </main>
  )
}
