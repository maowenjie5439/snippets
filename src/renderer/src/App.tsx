import Search from '@renderer/components/Search'
import Result from '@renderer/components/Result'
import { CodeContext } from '@renderer/context/CodeContext'
import { type Item } from './data'
import codes from './data'
import { useState } from 'react'

function App(): JSX.Element {
  const [data, setData] = useState<Item[]>([])
  const [show, setShow] = useState(true)
  console.log('App组件渲染')

  console.log('window.api.message:', window.api.message)
  return (
    <CodeContext.Provider value={{ data, setData }}>
      {/* <div className="bg-red-500">
        <h1>Hello World</h1>
      </div> */}
      <Search />
      {show && <Result />}
      <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button>
    </CodeContext.Provider>
  )
}

export default App
