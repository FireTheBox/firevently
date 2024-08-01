import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { LucideEdit, LucideMoreVertical } from "lucide-react";
import Link from "next/link";
import { P } from "../typography/p";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-primary shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-primary-foreground bg-cover bg-center text-grey-500"
      />

      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-primary p-3 shadow-sm transition-all">
        <Link href={`/events/${event._id}/update`}>
          <LucideEdit size={20} />
        </Link>

        <DeleteConfirmation eventId={event._id} />
      </div>

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <P>{formatDateTime(event.startDateTime).dateTime}</P>

        <Link href={`/events/${event._id}`}>
          <P>{event.title}</P>
        </Link>

        <div className="flex-between w-full">
          <P>{event.organizer.username}</P>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <P>Detalhes do Pedido</P>
              <LucideMoreVertical size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
