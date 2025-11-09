import { Link } from "react-router";
import type { Route } from "./+types/testing-args-page";

export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export function headers() {
 
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

// export function links() {
//   return [
//     {
//       rel: "icon",
//       href: "/favicon.png",
//       type: "image/png",
//     },
//     {
//       rel: "stylesheet",
//       href: "https://example.com/some/styles.css",
//     },
//     {
//       rel: "preload",
//       href: "/images/banner.jpg",
//       as: "image",
//     },
//   ];
// }



export default function  TestingArgsPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const { id } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">Testing Args Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
      <p>Id: {id}</p>
      <Link to="/auth/testing" className="text-blue-500 hover:text-blue-600 transition-colors duration-200 ease-in-out cursor-pointer ">Go to Testing Page</Link>
    </div>
  );
}
