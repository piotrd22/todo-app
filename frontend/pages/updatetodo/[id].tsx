import Form from "@/components/Form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function UpdateTodoForm() {
  const router = useRouter();
  const { id } = router.query;

  const notify = (data: string) =>
    toast.success(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      when: new Date(),
      text: "",
    },
  });

  const updateTodo = async (data: Form) => {
    const res = await axios.put(`http://localhost:8080/api/todo/${id}`, data);

    return res.data;
  };

  const onSubmit = (data: Form) => {
    updateTodo({
      name: data.name,
      text: data.text,
      when: new Date(data.when),
    })
      .then((_) => {
        reset();
        router.push(`/`);
        notify("Todo has been updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Link href="/" className="btn m-5">
        &#8592; Back
      </Link>
      <form
        className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mt-5 mb-2">Title</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <div className="my-2">This field is required!</div>}
        <label className="mt-5 mb-2">When</label>
        <input
          className="input input-bordered w-full"
          type="date"
          {...register("when")}
        />
        <label className="mt-5 mb-2">More</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("text")}
        />
        <button className="btn btn-primary my-5 mx-auto flex">UPDATE!</button>
      </form>
    </div>
  );
}

export default UpdateTodoForm;
