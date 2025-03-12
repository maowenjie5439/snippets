import { useCallback, useContext, useEffect, useState } from 'react'
import { CodeContext } from '@renderer/context/CodeContext'
import { Item } from '@renderer/data'

/**
 * 代码选择器
 * @param currentIndex 当前索引
 * @param setCurrentIndex 设置当前索引
 */
export const useCodeSelect = () => {
  //   const [currentIndex, setCurrentIndex] = useState(0)
  const { data } = useContext(CodeContext)!
  const [id, setId] = useState(0)

  // 当数据和当前索引变化时，更新处理函数
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      console.log('keydown: ', e.code)
      if (data.length > 0) {
        let targetIndex = -1
        switch (e.code) {
          case 'ArrowUp':
            console.log('上')
            targetIndex = data.findIndex((item) => item.id === id)
            setId(data[targetIndex - 1 >= 0 ? targetIndex - 1 : data.length - 1].id)
            break
          case 'ArrowDown':
            console.log('下')
            targetIndex = data.findIndex((item) => item.id === id)
            setId(data[targetIndex + 1 < data.length ? targetIndex + 1 : 0].id)
            break
          case 'Enter':
            console.log('Enter')
            selectItem(id)
            break
        }
      }
    },
    [data, id]
  )

  // 监听键盘事件，当处理函数变化时，重新监听
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      console.log('移除事件')
    }
  }, [handleKeyDown])

  // 当数据变化时，重置当前索引
  useEffect(() => {
    setId(0)
  }, [data])

  const selectItem = (id: number) => {
    navigator.clipboard.writeText(data.find((item) => item.id === id)!.content)
    console.log(`复制成功: ${data.find((item) => item.id === id)!.content}`)

    window.api.hideWindow({ message: 'maowenjie' })
  }
  console.log('currentId: ', id)

  return { data, id, selectItem }
}
