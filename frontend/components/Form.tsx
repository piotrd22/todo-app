import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type Form = {
  name: string;
  when: Date;
  text: string;
};

function Form() {
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

  const createTodo = async (data: Form) => {
    const res = await axios.post(`http://localhost:8080/api/todo`, data);

    return res.data;
  };

  const onSubmit = (data: Form) => {
    createTodo({
      name: data.name,
      text: data.text,
      when: new Date(data.when),
    })
      .then((_) => {
        reset();
        notify("Todo has been added!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <div className="collapse">
        <input type="checkbox" />
        <div className="flex-col justify-center collapse-title text-xl font-medium">
          <button className="btn btn-primary my-5 mx-auto flex">
            CLICK ME TO ADD TO DO
          </button>
        </div>
        <div className="collapse-content">
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
            <button className="btn btn-primary my-5 mx-auto flex">ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
