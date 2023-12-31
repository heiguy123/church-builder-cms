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
          route: '/super-admin/dashboard',
          children: [
            { label: 'Workspace', route: '/super-admin/dashboard/app-workspace' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/chat-bubble-left.svg',
          label: 'Post',
          route: '/super-admin/post',
          children: [
            { label: 'View Posts', route: '/super-admin/post/app-view-post' },
            { label: 'Create Post', route: '/super-admin/post/app-create-post' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/photo.svg',
          label: 'Media Library',
          route: '/super-admin/media',
          children: [
            { label: 'View Media', route: '/super-admin/media/app-view-media' },
            { label: 'Upload Media', route: '/super-admin/media/app-upload-media' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/user-circle.svg',
          label: 'Account',
          route: '/super-admin/account',
          children: [
            { label: 'View Accounts', route: '/super-admin/account/app-view-account' },
            { label: 'Create Account', route: '/super-admin/account/app-create-account' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/super-admin/auth',
          children: [
            { label: 'Profile', route: '/super-admin/auth/app-profile' },
            { label: 'New Password', route: '/super-admin/auth/app-new-password' },
          ],
        },
      ],
    },
  ];
}