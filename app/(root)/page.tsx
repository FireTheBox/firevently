import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Organize, colabore ou participe de programas de inovação com nossa plataforma!</h1>
            <p className="p-regular-20 md:p-regular-16">FireTheBox é a caixa de ferramentas mais completa para conectar organizações com jovens talentos para criar soluções. Oferecemos aos inovadores uma maneira divertida e emocionante de aprender novas habilidades, construir projetos legais e ganhar recompensas.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Agora
              </Link>
            </Button>
          </div>
    
          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 
    
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Confiam em nós <br /> Os melhores programas de inovação</h2>
    
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategorySearch
        </div>
      </section>
    </>
  );
}
