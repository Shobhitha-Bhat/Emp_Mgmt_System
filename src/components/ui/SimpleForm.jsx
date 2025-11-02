import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SimpleForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    alert("hello");
    console.log("Form data:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label>First Name</label>
        <Input {...register("firstName", { required: true })} placeholder="Enter first name" />
      </div>

      <div>
        <label>Last Name</label>
        <Input {...register("lastName", { required: true })} placeholder="Enter last name" />
      </div>

      <div>
        <label>Age</label>
        <Input {...register("age", { min: 18, max: 99 })} type="number" placeholder="Enter age" />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )
}
