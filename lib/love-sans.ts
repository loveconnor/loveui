import localFont from 'next/font/local';

export const loveSans = localFont({
  src: [
    {
      path: '../public/fonts/LoveSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/LoveSans-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-love-sans',
  display: 'optional',
  preload: false,
});
