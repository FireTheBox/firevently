import CategoryFilter from "@/components/shared/category-filter";
import Collection from "@/components/shared/collection";
import Search from "@/components/shared/Search";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { Lead } from "@/components/typography/lead";
import { P } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { HighlightEvent } from "./highlight-event";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="container py-5 md:py-10">
        <div className=" grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="col-span-2 space-y-8">
            <H1>
              Organize, colabore ou participe de programas de inovação com nossa
              plataforma!
            </H1>
            <P>
              FireTheBox é a caixa de ferramentas mais completa para conectar
              organizações com jovens talentos para criar soluções.
            </P>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="#events">Criar projeto</Link>
              </Button>
              <Button size="lg" variant={"outline"} asChild>
                <Link href="#events">Explore</Link>
              </Button>
            </div>
          </div>

          <HighlightEvent />
        </div>
      </section>

      <section
        id="events"
        className="container mt-20 md:mt-40 mb-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex justify-between">
          <div className="space-y-2">
            <H2>Descubra mais programas</H2>
            <Lead>Explore as melhores oportunidades</Lead>
          </div>

          <div className="w-fit flex gap-5">
            <CategoryFilter />
            <Search />
          </div>
        </div>

        <Collection
          data={events?.data}
          emptyTitle="Não foram encontrados eventos"
          emptyStateSubtext="Volte mais tarde"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
