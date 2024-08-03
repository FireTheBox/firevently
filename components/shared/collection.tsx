import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";

import { H3 } from "../typography/h3";
import { P } from "../typography/p";
import { EventCard } from "./event-card";
import Pagination from "./Pagination";

type CollectionProps = {
  emptyTitle: string;
  emptyStateSubtext: string;
  query: string;
  category: string;
  page: number;
  limit: number;
};

const Collection = async ({
  emptyTitle,
  emptyStateSubtext,
  query,
  category,
  page,
  limit,
}: CollectionProps) => {
  const events = await getAllEvents({
    query,
    category,
    page,
    limit,
  });

  return (
    <>
      {events?.data ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {(events.data as IEvent[]).map((event) => {
              return (
                <li key={event._id} className="flex justify-center">
                  <EventCard event={event} canManage />
                </li>
              );
            })}
          </ul>

          {events.totalPages > 1 && (
            <Pagination
              urlParamName={query}
              page={page}
              totalPages={events.totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper bg-grey-50 min-h-[200px] w-full flex-col gap-3 rounded-[14px] py-28 text-center">
          <H3>{emptyTitle}</H3>
          <P>{emptyStateSubtext}</P>
        </div>
      )}
    </>
  );
};

export default Collection;
