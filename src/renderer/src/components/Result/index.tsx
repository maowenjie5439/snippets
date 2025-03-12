import React from 'react'
import styles from './style.module.scss'
import { useCodeSelect } from '@renderer/hooks/useCodeSelect'
export default function Result() {
  const { id, data, selectItem} = useCodeSelect()

  return (
    <main className={styles.main}>
      {data.map((item) => (
        <div key={item.id} className={`${styles.item} ${id === item.id ? styles.active : ''}`} onClick={() => selectItem(item.id)}>
          {item.content}
        </div>
      ))}
    </main>
  )
}
