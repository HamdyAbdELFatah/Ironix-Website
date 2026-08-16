export const APP_CONFIG = {
  name: 'Ironix',
  tagline: 'Train with purpose. Progress with proof.',
  description: 'Premium fitness & workout intelligence app with offline tracking, 3D anatomy, and smart insights.',
  url: 'https://ironix.app',
  appStore: 'https://apps.apple.com/app/ironix-workout-tracker/id6740000000',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.ironix',
  appGallery: 'https://appgallery.huawei.com/app/C109700000',
  social: { twitter: 'https://x.com/ironixapp', instagram: 'https://instagram.com/ironixapp', tiktok: 'https://tiktok.com/@ironixapp' },
  support: { email: 'support@ironix.app' },
  utm: function getStoreUrl(platform: 'ios'|'android'|'huawei', section: string) {
    const baseUrl = this[platform === 'ios' ? 'appStore' : platform === 'android' ? 'googlePlay' : 'appGallery'];
    if (!baseUrl || baseUrl === '#') return '#';
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}utm_source=landing&utm_medium=${platform}&utm_campaign=download&utm_content=${section}`;
  }
};
