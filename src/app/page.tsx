'use client';

import styles from './page.module.css'
import SearchForm from './components/SearchForm';

export default function Home() {

  async function onSearch(query: string) {
    alert(`searching for '${query}'...`);
  }

  return (
    <main className={styles.main}>
      <div>
        <SearchForm onSubmit={onSearch}></SearchForm>
      </div>
    </main>
  )
}
