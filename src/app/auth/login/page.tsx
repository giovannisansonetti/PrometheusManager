import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import Login from "~/components/auth/SignIn/Form";

const login = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return <Login />;
  }
  redirect("/");
};
export default login;
