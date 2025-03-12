import { useSearch } from "@renderer/hooks/useSearch"

export default function Search(){
  const {search, handleChange} = useSearch()
  return (
    <div className='bg-slate-50 p-3 drag rounded-lg'>
        <section className='bg-slate-200 p-2 text-2xl rounded-lg'>
            <input 
                type='text' 
                placeholder='Hi, mTools' 
                className='w-full rounded-md outline-none bg-slate-200 no-drag' 
                value={search}
                onChange={handleChange}
            />
        </section>
    </div>
  )
}
