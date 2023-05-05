'use client';

import { CollatedUserInfo } from "@/types";
import Image from "next/image";
import styles from './card.module.css';

export declare interface UserCardProps {
  userInfo: CollatedUserInfo;
}

export default function UserCard({
  userInfo: { username, profileUrl, avatarUrl, followerCount, repositoryCount, topRepos }
}: UserCardProps) {
  return (
    <>
      <div className={styles.container}>
        <div><Image className={styles.avatar} src={avatarUrl} alt={username} width={100} height={100} /></div>
        <div className={styles.info}>
          <h2 className={styles.username}><a href={profileUrl}>{username}</a></h2>
          <div>Followers: {followerCount}</div>
        </div>
      </div>
      <div className={styles.divider}>Repos ({repositoryCount})</div>
      <div className={styles.repos}>
        {topRepos.map((repo) => (
          <div className={styles.repo} key={repo.url}>
            <a href={repo.url}>{repo.name}</a>
            <div>Stars: {repo.stars}</div>
            <div>Last updated: {Intl.DateTimeFormat('en-NZ').format(repo.updatedAt)}</div>
          </div>
        ))}
      </div>
      <div className={styles.more}>&hellip;</div>
    </>
  );
}