import { cn } from "cn";

const Card = ({ className, ...props }: React.ComponentProps<"div">) => {
    return( 
        <div className={ cn(className, "bg-white py-5 px-3 flex rounded-lg w-fit") } {...props} />
     )
};

export default Card;