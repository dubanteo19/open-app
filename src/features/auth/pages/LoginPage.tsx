import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toastError } from "@/features/user/feed/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useLoginMutation } from "../api";
import { GoogleLoginButton } from "../components/GoogleLoginButton";

const schema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof schema>;

export const LoginPage = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data).unwrap();
      if (res) navigate("/feed");
    } catch (error) {
      toastError(error);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {isLoading && <Loader />}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold flex items-center justify-center gap-x-1.5">
            Sign in to{" "}
            <div className="w-10 h-10 ">
              <img
                className="h-max w-max"
                src="https://logosandtypes.com/wp-content/uploads/2022/04/enovis.svg"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <GoogleLoginButton />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Dòng phân cách */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Email</FormLabel> */}
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 px-4 py-3 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Password</FormLabel> */}
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                          className="h-12 px-4 py-3 text-base rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          tabIndex={-1}
                        >
                          {showPassword ? <FaEye /> : <IoMdEyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="rounded-full w-full text-white h-12"
              >
                Sign in
              </Button>
              <Button
                type="button"
                className="w-full  bg-black text-white h-12 rounded-full hover:bg-black/90 transition duration-200"
              >
                Forgot password?
              </Button>
            </form>
          </Form>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
