import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/server";
import UserDashboard from "~/components/Dashboard/Dashboard";

const dashboard = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    return <UserDashboard />;
  }
  redirect("/auth/login");
};

export default dashboard;
