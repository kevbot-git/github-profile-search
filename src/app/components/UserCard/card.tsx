'use client';

import { CollatedUserInfo } from "@/types";
import Image from "next/image";

export declare interface UserCardProps {
  userInfo: CollatedUserInfo;
}

export default function UserCard({
  userInfo: { username, profileUrl, avatarUrl, followerCount, repositoryCount, topRepos }
}: UserCardProps) {
  return (
    <>
      <div>
        <div><a href={profileUrl}>{username}</a></div>
        <div><Image src={avatarUrl} alt={username} width={100} height={100} /></div>
        <div>Followers: {followerCount}</div>
        <div>Repos: {repositoryCount}</div>
      </div>
      <div>
        {topRepos.map((repo) => (
          <div key={repo.url}>
            <a href={repo.url}>{repo.name}</a>
            <div>Stars: {repo.stars}</div>
            <div>Last updated: {Intl.DateTimeFormat('en-NZ').format(repo.updatedAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
}