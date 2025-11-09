import { Form, Link, NavLink, useNavigation } from "react-router";
import type { Route } from "./+types/testing-page";
import { sleep } from "~/lib/sleep";


export async function action({ request }: Route.ActionArgs) {
  await sleep(1000)
 
  const data = await request.formData();

  console.log("data")
  console.log(data)
  return { ok: true, };
}

export async function loader() {
  return { message: "Hello from loader!" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // call the server loader
  const serverData = await serverLoader();

  return { message: "Hello from client loader!", serverData };
}

export default function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {

  const navigate = useNavigation();
 const isPosting = navigate.state === "submitting";

 console.log(isPosting)
  return (
    <div>
      <h1 className="text-2xl font-bold">Testing Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>

     



      <NavLink
        to="/auth/testing-args/ABC-123"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Go to Testing Args Page
      </NavLink>


      <Form method="post"  className="flex flex-col gap-2 mt-4">
        <input type="text" name="name" placeholder="Name" className="border border-gray-300 rounded px-2 py-1" />
        <input type="text" name="age" placeholder="Age" className="border border-gray-300 rounded px-2 py-1" />
        
        <button disabled={isPosting} type="submit" className={isPosting ? "bg-blue-200 text-black px-2 py-1 rounded cursor-not-allowed" : "bg-blue-500 text-white px-2 py-1 rounded"}>Submit</button>
      </Form>
    </div>
  );
}
