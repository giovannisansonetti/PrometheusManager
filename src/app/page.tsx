import NavBar from "~/components/NavBar/NavBar";
import { createClient } from "utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
  }

  return (
    <div>
      <NavBar name={data.user?.email} />
    </div>
  );
}
