import { Item } from '@renderer/data'
import React, { createContext, Dispatch, SetStateAction } from 'react'

interface Props {
    data: Item[],
    setData: (data: SetStateAction<Item[]>) => void 
}
export const CodeContext = createContext<Props | undefined>(undefined)
