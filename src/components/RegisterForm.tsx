"use client";

import { ComponentProps, useState } from "react";
import TextField from "./TextField";
import {
  BuildingComplex,
  ChartPie,
  CircleUser,
  ClipboardPenLine,
  Link,
  Lock,
  LockKeyhole,
  Mail,
  UserShield,
  UserStar,
} from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import CheckBox from "./CheckBox";
import Button from "./Button";
import { INDUSTRIES, ROLES } from "@/enums";
import Select from "./Select";

interface Props {
  onStateChange: (state: "login" | "register" | "forgot") => void;
  onSubmit: ComponentProps<"form">["onSubmit"];
}

const RegisterForm = ({
  onStateChange,
  onSubmit,
  ...props
}: ComponentProps<"form"> & Props) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [agreetment, setAgreetment] = useState(false);

  const handleChangeAgreetment = () => {
    const next = !agreetment;
    setAgreetment(next);
    setValue("acceptTerms", next, { shouldValidate: true });
  };

  return (
    <form {...props} onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-1 border-2 border-outline rounded-2xl p-4">
          <TextField
            {...register("full_name")}
            label="Fullname *"
            icon={<CircleUser className="size-4.5" />}
            error={errors.full_name?.message as string | undefined}
          />
          <TextField
            {...register("email")}
            label="Email *"
            type="email"
            icon={<Mail className="size-4.5" />}
            error={errors.email?.message as string | undefined}
          />
          <TextField
            {...register("password")}
            label="Password *"
            type="password"
            icon={<Lock className="size-4.5" />}
            error={errors.password?.message as string | undefined}
          />
          <TextField
            {...register("confirmPassword")}
            label="Confirm password *"
            type="password"
            icon={<LockKeyhole className="size-4.5" />}
            error={errors.confirmPassword?.message as string | undefined}
          />
        </div>

        <div className="flex flex-col flex-1 gap-1 border-2 border-outline rounded-2xl p-4">
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Role *"
                placeholder="Select your role"
                icon={<UserShield className="size-4.5" />}
                error={fieldState.error?.message}
                optionsEnum={Object.values(ROLES)}
              />
            )}
          />
          <TextField
            {...register("job_title")}
            label="Job title"
            icon={<UserStar className="size-4.5" />}
            error={errors.job_title?.message as string | undefined}
          />
          <TextField
            {...register("company_name")}
            label="Company name"
            icon={<BuildingComplex className="size-4.5" />}
            error={errors.company_name?.message as string | undefined}
          />
          <Controller
            name="industry"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Industry"
                placeholder="Select your industry"
                icon={<ChartPie className="size-4.5" />}
                error={fieldState.error?.message}
                optionsEnum={Object.values(INDUSTRIES)}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 border-2 border-outline rounded-2xl p-4">
        <TextField
          {...register("workspace_name")}
          label="Workspace name *"
          icon={<ClipboardPenLine className="size-4.5" />}
          error={errors.workspace_name?.message as string | undefined}
        />
        <TextField
          {...register("workspace_slug")}
          label="Workspace slug *"
          icon={<Link className="size-4.5" />}
          error={errors.workspace_slug?.message as string | undefined}
        />
      </div>

      <CheckBox
        onChange={handleChangeAgreetment}
        checked={agreetment}
        lable="I agree with terms & conditions"
      />
      {errors.acceptTerms?.message && (
        <span className="text-red-500 text-regular">
          {String(errors.acceptTerms.message)}
        </span>
      )}

      <Button type="submit">Sign Up</Button>

      <button
        type="button"
        onClick={() => onStateChange("login")}
        className="cursor-pointer text-regular text-primary-gray max-w-fit mr-auto ml-auto"
      >
        I have account
      </button>
    </form>
  );
};

export default RegisterForm;
