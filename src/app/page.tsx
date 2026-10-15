import { redirect, RedirectType } from "next/navigation";

const Home = () => {
    redirect("/login", RedirectType.replace)
};

export default Home