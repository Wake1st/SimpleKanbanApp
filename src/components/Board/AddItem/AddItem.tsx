import { useState } from 'react';

export type AddItemProps = {
  addItem: (title: string) => void,
};

const AddItem = ({ addItem }: AddItemProps) => {
  const [text, setText] = useState<string>("");

  return (
    <div className='flex justify-between gap-4 bg-sky-800 p-4 rounded-lg'>
      <input 
        className='basis-3/4 bg-sky-100 p-2 text-slate-900 rounded-md'
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button 
        className='basis-1/4 bg-sky-700 p-2 text-slate-100 rounded-md' 
        onClick={() => {
          addItem(text);
          setText('');
        }}
      >
        Add Item
      </button>
    </div>
  )
};

export default AddItem;
