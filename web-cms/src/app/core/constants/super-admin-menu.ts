import { MenuItem } from '../models/menu.model';

export class SuperAdminMenu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: '../../../assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: 'super-admin/dashboard',
          children: [
            { label: 'Workspace', route: '' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/chat-bubble-left.svg',
          label: 'Post',
          route: 'super-admin/post',
          children: [
            { label: 'View Posts', route: '' },
            { label: 'Create Post', route: '' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/photo.svg',
          label: 'Media Library',
          route: 'super-admin/media',
          children: [
            { label: 'View Media', route: '/super-admin/media/app-view-media' },
            { label: 'Upload Media', route: '/super-admin/media/app-upload-media' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/user-circle.svg',
          label: 'Account',
          route: 'super-admin/account',
          children: [
            { label: 'View Accounts', route: '/super-admin/account/app-view-account' },
            { label: 'Create Account', route: '/super-admin/account/app-create-account' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/app-builder.svg',
          label: 'App Builder',
          route: 'super-admin/app-builder',
          children: [
            { label: 'App Layout', route: '' },
            { label: 'Deploy App', route: '' },
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