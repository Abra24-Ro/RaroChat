import { useLoaderData, useNavigation, useParams } from "react-router";
import { ContactInformation } from "./ContactInformation";
import { ContactInformationSkeleton } from "./ContactInformationSkeleton";
import { NotContactSelected } from "./NotContactSelected";
import type { Client } from "~/chat/interfaces/chat.interface";



export const ContactInfoCard = () => {
  const { id } = useParams();
  const { clients = [] , client} = useLoaderData();
  const { state } = useNavigation();

  const isPending = state === "loading";

  if (client) {
    return <ContactInformation client={client} />;
  }

  if (isPending) return <ContactInformationSkeleton />;

  if (!id) return <NotContactSelected />;

  // const client = clients.find((client: Client) => client.id === id);
  if (!client) return <NotContactSelected />;

  return <ContactInformation client={client} />;
};
