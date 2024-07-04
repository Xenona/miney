import { useState } from "react";

interface IUseFormProps {
  type: string, 
  initialValue?: string,
  [key: string]: any,
}

export default function useInput({type, initialValue="", ...props}: IUseFormProps) {
  const [value, setValue] = useState<string>(initialValue);
  
  const input = (
    <input
    type={type}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    {...props}
    />
  )
  
  return {value, setValue, input}
}
