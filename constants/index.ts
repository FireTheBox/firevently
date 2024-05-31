export const headerLinks = [
  {
    label: 'Inicial',
    route: '/',
  },
  {
    label: 'Criar Evento',
    route: '/events/create',
  },
  {
    label: 'Meu Perfil',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
