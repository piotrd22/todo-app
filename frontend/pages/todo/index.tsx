import { Todo } from "@/types/Todo";
import axios from "axios";
import OneTodo from "@/components/OneTodo";

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8080/api/todo");
  return {
    props: {
      todos: res.data.todos,
    },
  };
}

type Props = {
  todos: Todo[];
};

function Todo({ todos }: Props) {
  const todoComponent = todos?.map((todo: Todo, index: number) => (
    <OneTodo todo={todo} index={index} key={todo.ID} />
  ));

  return (
    <>
    {todoComponent}
    </>
  )
}

export default Todo;