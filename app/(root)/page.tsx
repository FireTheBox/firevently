import CategoryFilter from "@/components/shared/category-filter";
import Collection from "@/components/shared/collection";
import Search from "@/components/shared/Search";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { Lead } from "@/components/typography/lead";
import { P } from "@/components/typography/p";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { Suspense } from "react";
import { HighlightEvent } from "./highlight-event";
import { SkeletonHighlightEvent } from "./skeleton-highlight-event";
import { LucideLoader2 } from "lucide-react";

export default function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  return (
    <>
      <section className="container py-5 lg:py-10">
        <div className=" grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
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

          <Suspense fallback={<SkeletonHighlightEvent />}>
            <HighlightEvent
              page={page}
              category={category}
              query={searchText}
              limit={6}
            />
          </Suspense>
        </div>
      </section>

      <section
        id="events"
        className="container my-10 md:my-20 mb-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="space-y-2">
            <H2>Descubra mais programas</H2>
            <Lead>Explore as melhores oportunidades</Lead>
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <CategoryFilter />
            <Search />
          </div>
        </div>

        <Suspense
          fallback={<LucideLoader2 className="mx-auto size-12 animate-spin" />}
        >
          <Collection
            emptyTitle="Não foram encontrados eventos"
            emptyStateSubtext="Volte mais tarde"
            query={searchText}
            category={category}
            limit={6}
            page={page}
          />
        </Suspense>
      </section>
    </>
  );
}
