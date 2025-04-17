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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegisterMutation } from "../api";
import { toast } from "sonner";
import { log } from "console";
import { Loader } from "@/components/common/Loader";

const formSchema = z
  .object({
    displayName: z
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters"),
    username: z
      .string()
      .nonempty("UsernameUsername is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchema = z.infer<typeof formSchema>;

export const Register = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const onSubmit = async (data: FormSchema) => {
    try {
      const res = await register(data).unwrap();
      if (res) {
        navigate("/login", { state: "register successfully" });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 my-1">
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
            <Button className="flex items-center justify-center w-full h-12 px-4 py-3 border border-gray-300 rounded-full bg-accent hover:bg-primary text-black">
              <FcGoogle size={32} />
              Sign up with Google
            </Button>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Dòng phân cách */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="eg. John Griffin"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Username"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          {...field}
                          className="h-12 px-4 py-3 text-base rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <FaEye /> : <IoMdEyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-error">{error.data.errors}</p>}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full  bg-black text-white h-12 rounded-full hover:bg-black/90 transition duration-200"
              >
                Register
              </Button>
            </form>
          </Form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
