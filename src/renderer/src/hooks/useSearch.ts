import { CodeContext } from "@renderer/context/CodeContext"
import { useContext, useState } from "react"
import codes from "@renderer/data"

export const useSearch = () => {
    const [search, setSearch] = useState('')
    const {data, setData} = useContext(CodeContext)!
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log('handleChange: ', e.target.value)
      setSearch(e.target.value)
      const newData = codes.filter(item => item.content.toLowerCase().includes(e.target.value.toLowerCase() || '@@@@'))
      // console.log('newData: ', newData)
      setData(newData)
    }

    return {search, handleChange}
}
