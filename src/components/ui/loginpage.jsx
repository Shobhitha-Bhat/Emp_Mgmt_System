
import { Button } from "./button";
import { Input } from "./input";

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
import { useForm } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { mockUsers } from "../../api/mockUsers";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/userSlice";
import { noError } from "@/redux/userSlice";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState("");
  const [loginError, setLoginError] = useState("");


const dispatch = useDispatch();
  const { loggedInUser, error } = useSelector((state) => state.user);

  const userName = watch("userName");
  const emailId = watch("emailId");
  const pwd = watch("pwd");
  const watchAllFields = watch();
  useEffect(() => {
  if (loginError && (userName || emailId || pwd)) {
    setLoginError("");
  }
}, [userName, emailId, pwd]);

  // useEffect(() => {
  //   if (error && (watchAllFields.userName || watchAllFields.emailId || watchAllFields.pwd || role)) {
  //     setLoginError("");
  //     reset();
  //   }

  //   if (loggedInUser) {
  //     navigate(loggedInUser.role === "admin" ? "/admindashboard" : "/empdashboard");
  //   }
  // }, [userName, emailId, pwd, role,loggedInUser]);


 useEffect(() => {
  if (error) {
    setLoginError("Invalid credentials. Please check and try again.");
    reset();
    setRole("");
  } else {
    setLoginError("");
  }

  if (loggedInUser) {
    reset();
    navigate(
      loggedInUser.role === "admin" ? "/admindashboard" : "/empdashboard"
    );
  }
}, [error, loggedInUser]);






  function handleLogin(data) {
    if (role === "") {
      setLoginError("Please select a role before logging in.");
      reset();
      return;
    }

 dispatch(
      login({
        username: data.userName,
        email: data.emailId,
        password: data.pwd,
        role,
      })
    );
  };

    // const storedUsers = JSON.parse(localStorage.getItem("mockUsers")) || [];
    // const allUsers = [...mockUsers, ...storedUsers];

    // const validData = allUsers.some(
    //   (u) =>
    //     u.username === data.userName &&
    //     u.email === data.emailId &&
    //     u.password === data.pwd &&
    //     u.role === role
    // );

    // if (validData) {
    //   setLoginError("");
    //   role === "admin"
    //     ? navigate("/admindashboard")
    //     : navigate("/empdashboard");
    // }
    // else {
    //   setLoginError("Invalid Credentials. Please Register or check for any typo.")
    //   reset();
    //   setRole("")
    // }
  
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
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
              <CardTitle>LOGIN</CardTitle>
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
            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
            <CardFooter className="flex flex-col items-center space-y-3">
              <Button type="submit" className="w-3/4">
                Login
              </Button>

              <p className="text-sm text-muted-foreground">
                Not yet registered?{" "}
                <Link
                  to="/registerpage"
                  className="text-primary hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
      <p>
      Credentials:
            username: "admin",
    email: "admin@company.in",
    password: "admin123",
    role: "admin",
      </p>
      <p>
        Credentials:
        username: "rahul",
    email: "rahul@company.in",
    password: "rahul123",
    role: "employee"
      </p>
        </div>
      </form>

    </>
  );
}

export default LoginPage;
