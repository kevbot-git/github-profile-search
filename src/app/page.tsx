'use client';

import styles from './page.module.css'
import SearchForm from './components/SearchForm';

const GITHUB_API_URL = 'https://api.github.com';

export default function Home() {

  async function onSearch(query: string) {
    const response = await fetch(`${GITHUB_API_URL}/users/${query}`);
    const json = await response.json();
    alert(JSON.stringify(json));
  }

  return (
    <main className={styles.main}>
      <div>
        <SearchForm onSubmit={onSearch}></SearchForm>
      </div>
    </main>
  )
}
