type NavLink = {
  label: string;
  route: string;
}

export const links: NavLink[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Explorar",
    route: "/#explorer",
  },
  {
    label: "Suporte",
    route: "https://calendly.com/contato-firethebox/30min",
  }
]

export const codaPageTypes = ["Detalhes", "Projetos", "Cronograma", "Participantes"] as const
