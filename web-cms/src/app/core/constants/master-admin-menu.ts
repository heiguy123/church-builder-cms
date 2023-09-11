import { MenuItem } from '../models/menu.model';

export class MasterAdminMenu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: '../../../assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Workspace', route: '/dashboard/workspace' },
            { label: 'User Request', route: '/dashboard/user-request' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Profile', route: '/auth/profile' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
          ],
        },
      ],
    },
  ];
}