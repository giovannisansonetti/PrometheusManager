import SignUp from "~/components/auth/SignUp/Form";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";

const signup = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return <SignUp />;
  }
  redirect("/");
};

export default signup;
