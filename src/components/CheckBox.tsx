"use client";

import { ComponentProps, useState } from "react";

interface Props {
  checked?: boolean;
  lable?: string;
}

const CheckBox = ({
  checked,
  lable,
  ...props
}: ComponentProps<"input"> & Props) => {
  return (
    <label className="flex gap-2.5 items-center cursor-pointer">
      <input
        type="checkbox"
        {...props}
      />
      {!checked ? (
        <div className="size-5 rounded-full bg-outline" />
      ) : (
        <div className="rounded-full bg-primary size-5 flex justify-center items-center">
          <div className="rounded-full bg-white size-2" />
        </div>
      )}
      <span>{lable}</span>
      <span
        className={`checkbox ${checked ? "checkbox--active" : ""}`}
        aria-hidden="true"
      />
    </label>
  );
};

export default CheckBox;
