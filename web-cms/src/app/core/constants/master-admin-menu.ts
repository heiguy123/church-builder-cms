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
          route: '/master-admin/dashboard',
          children: [
            { label: 'Workspace', route: 'app-workspace' },
            { label: 'User Request', route: 'app-user-request' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/master-admin/auth',
          children: [
            { label: 'Profile', route: '/master-admin/auth/app-profile' },
            { label: 'New Password', route: '/master-admin/auth/app-new-password' },
          ],
        },
      ],
    },
  ];
}