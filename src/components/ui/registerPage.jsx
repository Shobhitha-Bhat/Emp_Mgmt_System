import { Button } from "./button";
import { Input } from "./input";

// import SimpleForm from "./components/ui/SimpleForm";
// import Dashboard from "./components/ui/dashboard";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { mockUsers } from "../../api/mockUsers";
import { toast } from "sonner";


function RegisterPage() {
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState("");
  const [registerError, setRegisterError] = useState("");

  const userName = watch("userName");
const emailId = watch("emailId");
const pwd = watch("pwd");
const watchAllFields = watch();

 useEffect(() => {
  if (registerError && (watchAllFields.userName || watchAllFields.emailId || watchAllFields.pwd || role)) {
    setRegisterError("");
  }
}, [userName, emailId, pwd, role]);


  function handleRegistration(data) {
    if(role=== ""){
        setRegisterError("Please select a role before registering.");
        reset();
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
    const allUsers = [...mockUsers, ...storedUsers];
    const exists = allUsers.some(
          (u) => u.username === data.userName || u.email === data.emailId
        );
    if (exists) {
      setRegisterError("User already exists. Please login instead.");
      reset();
      setRole("");
      return;
    }
    
    // mockUsers.push(newUser);
    // console.log("Updated mockUsers:", mockUsers);
    
    
    // const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
    const newUser = {
      username: data.userName,
      email: data.emailId,
      password: data.pwd,
      role: role,
    };
allUsers.push(newUser);
localStorage.setItem("mockUsers", JSON.stringify(allUsers));


    toast.success("Registration successful! Please login.");
    reset();
    setRole("");
    navigate("/loginpage");
  }
  
  return (
    <>
    <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <ToggleGroup
            type="single"
            value={role}
            onValueChange={(val) => val && setRole(val)}
          >
            <ToggleGroupItem value="admin">ADMIN</ToggleGroupItem>
            <ToggleGroupItem value="employee">EMPLOYEE</ToggleGroupItem>
          </ToggleGroup>
          <Card className="w-3/4 max-w-xl">
            <CardHeader>
              <CardTitle>REGISTER</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 w-full">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("userName", { required: true, maxLength: 20 })}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("emailId", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                  maxLength: 20,
                })}
              />

              {/* error message */}
              {errors.emailId && (
                <p className="text-red-500 text-sm ">{errors.emailId.message}</p>
              )}
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register("pwd", { required: true, maxLength: 20 })}
              />
            </CardContent>
            {registerError && (
                <p className="text-red-500 text-sm mt-2 text-center">{registerError}</p>
              )}
            <CardFooter className="flex flex-col items-center space-y-3">
              <Button type="submit" className="w-3/4">
                Register
              </Button>

              <p className="text-sm text-muted-foreground">
                Already a User?{" "}
                <Link
                  to="/loginpage"
                  className="text-primary hover:underline"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
