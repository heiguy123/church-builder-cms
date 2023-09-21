import { MenuItem } from '../models/menu.model';

export class AdminMenu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: '../../../assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/admin/dashboard',
          children: [
            { label: 'Workspace', route: '/admin/dashboard/app-workspace' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/chat-bubble-left.svg',
          label: 'Post',
          route: '/admin/post',
          children: [
            { label: 'View Posts', route: '/admin/post/app-view-post' },
            { label: 'Create Post', route: '/admin/post/app-create-post' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/photo.svg',
          label: 'Media Library',
          route: '/admin/media',
          children: [
            { label: 'View Media', route: '/admin/media/app-view-media' },
            { label: 'Upload Media', route: '/admin/media/app-upload-media' },
          ],
        },
        {
          icon: '../../../assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/admin/auth',
          children: [
            { label: 'Profile', route: '/admin/auth/app-profile' },
            { label: 'New Password', route: '/admin/auth/app-new-password' },
          ],
        },
      ],
    },
  ];
}