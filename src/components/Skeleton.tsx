import { cn } from "cn";
import { ComponentProps } from "react";

const Skeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(className, "animate-pulse bg-primary-resting")}
    />
  );
};

export default Skeleton;
