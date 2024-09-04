export interface HeaderLinksModel {
  route: string;
  routeName: string;
}

export const HeaderPrivateLinks: HeaderLinksModel[] = [
  {
    route: '/diary-posts',
    routeName: 'Щоденник',
  },
  {
    route: '/success-diary',
    routeName: 'Успіх',
  },
  {
    route: '/diary/create-post',
    routeName: 'Додати',
  },
  {
    route: '/profile',
    routeName: 'Профіль',
  },
];
export const HeaderPublicLinks: HeaderLinksModel[] = [
  { route: 'sign-in', routeName: 'Увійти' },
  { route: 'sign-up', routeName: 'Реєстрація' },
];
