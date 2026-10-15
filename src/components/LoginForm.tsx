import { ComponentProps } from "react";
import TextField from "./TextField";
import { Lock, Mail } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Button from "./Button";

interface Props {
  onStateChange: (state: "login" | "register" | "forgot") => void;
  onSubmit: ComponentProps<"form">["onSubmit"];
}

const LoginForm = ({
  onStateChange,
  onSubmit,
  ...props
}: ComponentProps<"form"> & Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <form {...props} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 w-full">
        {errors.email?.message && (
          <span className="text-red-500 text-regular">
            {String(errors.email.message)}
          </span>
        )}
        <TextField
          {...register("email")}
          label="Email"
          type="email"
          icon={<Mail className="size-4.5" />}
        />

        {errors.password?.message && (
          <span className="text-red-500 text-regular">
            {String(errors.password.message)}
          </span>
        )}
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          icon={<Lock className="size-4.5" />}
        />

        <span
          onClick={() => onStateChange("forgot")}
          className="cursor-pointer text-regular text-primary-gray max-w-fit mr-auto ml-auto"
        >
          Forgot password?
        </span>
      </div>

      <Button type="submit">Sign In</Button>

      <span
        onClick={() => onStateChange("register")}
        className="cursor-pointer text-regular text-primary-gray max-w-fit mr-auto ml-auto"
      >
        I don&apos;t have account
      </span>
    </form>
  );
};

export default LoginForm;
