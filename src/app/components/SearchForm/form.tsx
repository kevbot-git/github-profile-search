'use client';

import styles from './form.module.css';
import { useState } from "react";

export declare interface SearchFormProps {
  onSubmit?: (query: string) => any;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [query, setQuery] = useState('');

  return (
    <>
      <form className={styles.form} onSubmit={(e) => {e.preventDefault(); onSubmit?.(query)}}>
        <input type="text" value={query} onChange={({ target: { value }}) => setQuery(value)} />
        <button type="submit">Search</button>
      </form>
    </>
  )
}