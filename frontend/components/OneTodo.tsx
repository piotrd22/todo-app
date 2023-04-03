import { Todo } from "@/types/Todo";

type Props = {
  todo: Todo;
  key: number;
  index: number;
};

function OneTodo({ todo }: Props) {
  return <div>{todo.Name}</div>;
}

export default OneTodo;
