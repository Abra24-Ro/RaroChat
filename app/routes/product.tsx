import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const { name } = params;

  return { name: name.toUpperCase() };
}

const product = ({ loaderData }: Route.ComponentProps) => {

    if(!loaderData) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      Product: <span>{loaderData.name}</span>
    </div>
  );
};

export default product;
