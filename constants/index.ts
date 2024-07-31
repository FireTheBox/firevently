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
    label: "FAQ",
    route: "/faq",
  },
  {
    label: "Ajuda",
    route: "/help",
  }
]

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
}
