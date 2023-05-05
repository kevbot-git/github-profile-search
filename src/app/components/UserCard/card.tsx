'use client';

import { CollatedUserInfo } from "@/types";
import Image from "next/image";
import styles from './card.module.css';
import PeopleIcon from '@mui/icons-material/People';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HistoryIcon from '@mui/icons-material/History';

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
          <h2 className={styles.username}><a href={profileUrl} target="_blank">{username}</a></h2>
          <div className={styles.iconStat}>
            <PeopleIcon titleAccess="Followers" />
            {followerCount}
          </div>
        </div>
      </div>
      <div className={styles.divider}>Repos ({repositoryCount} total)</div>
      <div className={styles.repos}>
        {topRepos.map((repo) => (
          <div className={styles.repo} key={repo.url}>
            <a href={repo.url} target="_blank">{repo.name}</a>
            <div className={styles.repoInfo}>
              <div className={styles.iconStat}>
                <StarBorderIcon titleAccess="Stars" />
                {repo.stars}
              </div>
              <div className={styles.iconStat}>
                <HistoryIcon titleAccess="Last updated" />
                {Intl.DateTimeFormat('en-NZ').format(repo.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.more}>&hellip;</div>
    </>
  );
}