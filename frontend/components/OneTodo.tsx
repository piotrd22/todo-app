import { Todo } from "@/types/Todo";
import axios from "axios";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaTrashAlt, FaKeyboard } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
  todo: Todo;
  key: number;
  index: number;
  setTodo: Dispatch<SetStateAction<Todo[]>>;
};

function OneTodo({ todo, setTodo }: Props) {
  const notifyDelete = () =>
    toast.success("Todo has been deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const fetchDeleteTodo = async () => {
    const res = await axios.delete(`http://localhost:8080/api/todo/${todo.ID}`);

    return res.data;
  };

  const deleteTodo = () => {
    fetchDeleteTodo()
      .then(() => {
        notifyDelete();
        setTodo((prev) => prev.filter((x) => x.ID !== todo.ID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="border flex-row justify-center m-10 p-10">
      <div className="flex justify-between mb-5">
        <p>{todo.Name}</p>
        {new Date(todo.When).toLocaleDateString()}
      </div>
      {todo.Text && <div className="mb-5">{todo.Text}</div>}
      <div className="flex justify-end">
        <FaTrashAlt className="cursor-pointer m-2" onClick={deleteTodo} />
        <Link href={`/updatetodo/${todo.ID}`}>
          <FaKeyboard className="cursor-pointer m-2" />
        </Link>
      </div>
    </div>
  );
}

export default OneTodo;
