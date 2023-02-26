import { useState } from 'react';

export type AddItemProps = {
  addItem: (title: string) => void,
};

const AddItem = ({ addItem }: AddItemProps) => {
  const [text, setText] = useState<string>("");

  return (
    <>
      <label>Title</label>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button onClick={() => addItem(text)}>
        Add Item
      </button>
    </>
  )
};

export default AddItem;
