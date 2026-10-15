"use client";

import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDataSchema, RegisterDataSchema } from "@/schemas";
import LoginForm from "@/components/LoginForm";
import { LoginData, RegisterData } from "@/types";
import RegisterForm from "@/components/RegisterForm";
import { cn } from "cn";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const [loginState, setLoginState] = useState<"login" | "register" | "forgot">(
    "login",
  );
  const { login, register } = useAuth();

  const loginMethods = useForm({
    resolver: zodResolver(LoginDataSchema) as Resolver<LoginData>,
    mode: "onTouched",
  });

  const registerMethods = useForm({
    resolver: zodResolver(RegisterDataSchema) as Resolver<RegisterData>,
    mode: "onTouched",
  });

  const handleChangeState =
    (newState: "login" | "register" | "forgot") => () => {
      setLoginState(newState);
    };

  const onSubmitRegister = (formData: RegisterData) => {
    register({ ...formData, invite_emails: [] });
  };

  const onSubmitLogin = (formData: LoginData) => {
    login(formData);
  };

  return (
    <div className="w-full h-dvh flex bg-primary">
      <div className="flex h-full w-[50%] bg-background-white py-27 rounded-r-2xl justify-center items-center">
        <div
          className={cn(
            "flex flex-col transition-all duration-200",
            loginState === "login" ? "w-[50%] gap-15.5" : "w-[75%] gap-7",
          )}
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-primary-dark text-h1">
              Welcome to CashDash. <br /> Sign{" "}
              {loginState === "login" ? "In" : "Up"} to getting started.
            </h1>
            <Link href={"/dashboard"}>
              <span className="text-regular text-primary-gray">
                Enter your details to proceed further
              </span>
            </Link>
          </div>
          {loginState === "login" && (
            <FormProvider {...loginMethods}>
              <LoginForm
                onStateChange={handleChangeState("register")}
                onSubmit={loginMethods.handleSubmit(onSubmitLogin)}
              />
            </FormProvider>
          )}
          {loginState === "register" && (
            <FormProvider {...registerMethods}>
              <RegisterForm
                onStateChange={handleChangeState("login")}
                onSubmit={registerMethods.handleSubmit(onSubmitRegister)}
              />
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
