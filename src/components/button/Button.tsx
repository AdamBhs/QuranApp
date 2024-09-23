import "./btnStyle.css";

type PropsType = {
    name: string;
  };
  
export default function Button({ name }: PropsType) {
    return <button>{name}</button>;
}
