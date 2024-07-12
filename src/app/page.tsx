import NavBar from "~/components/NavBar/NavBar";
import { createClient } from "utils/supabase/server";

export default async function HomePage() {

  const supabase = createClient()
  const {error} = await supabase.auth.getUser()
  
  return (
    <div>
      <NavBar isLogged={false} name="diocane"/>
    </div>
  );
}
