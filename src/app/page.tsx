import NavBar from "~/components/NavBar/NavBar";
import { createClient } from "utils/supabase/server";
import Main from "~/components/HomePage/Home";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
  }

  return (
    <div>
      <NavBar name={data.user?.email} />
      <Main />
    </div>
  );
}
