export const BUSINESS = {
  name: 'TS SALES MART',
  tagline: 'Drive Your Dreams',
  phones: [
    { display: '077 205 6400', href: 'tel:+94772056400' },
    { display: '076 684 9867', href: 'tel:+94766849867' },
  ],
  address: 'No. 57, Ampalavanar Road, Uduvil, Chunnakam, Sri Lanka',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('57 Ampalavanar Road, Uduvil, Chunnakam, Sri Lanka'),
}

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/vehicles?type=car', label: 'Cars' },
  { to: '/vehicles?type=van', label: 'Vans' },
  { to: '/vehicles?sort=newest', label: 'New Arrivals' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
]

export const ASSETS = {
  logo: '/assets/ts-sales-mart-logo.png',
  poster1: '/assets/ts-sales-mart-poster-1.jpg',
  poster2: '/assets/ts-sales-mart-poster-2.jpg',
  hero: '/assets/ts-sales-mart-hero.jpg',
}
