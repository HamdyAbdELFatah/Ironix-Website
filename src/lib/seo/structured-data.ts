import { APP_CONFIG } from '../utils/constants';

export function generateSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": APP_CONFIG.name,
    "operatingSystem": "iOS 16+, Android 10+, HarmonyOS 3+",
    "applicationCategory": "HealthApplication",
    "applicationSubCategory": "Fitness & Workout Tracker",
    "softwareVersion": "2.4.0",
    "fileSize": "48MB",
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Core Free Edition",
        "description": "Unlimited local Room SQLite workout tracking and 100+ exercises forever"
      },
      {
        "@type": "Offer",
        "price": "39.99",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "name": "Ironix Pro Annual",
        "description": "3D Biomechanics fatigue engine, multi-persona AI voice coach, and barbell velocity tracking"
      },
      {
        "@type": "Offer",
        "price": "89.99",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "name": "Lifetime Founder Pass",
        "description": "One-time payment for lifetime access to all current and future Pro features"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "128400",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": APP_CONFIG.description,
    "featureList": [
      "100% Offline Room SQLite Local Database with 0ms sync latency",
      "Interactive 3D Biomechanics & Muscle Fatigue Heatmap",
      "Multi-Persona AI Voice Gym Coach with custom audio cues",
      "GymID Apple Wallet & Wear OS NFC Access Pass",
      "Rep Velocity Tracker using phone accelerometer sensors",
      "19 Supported Languages with complete RTL layout support"
    ],
    "screenshot": [
      `${APP_CONFIG.url}/assets/logo.png`
    ]
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": APP_CONFIG.name,
    "legalName": "Ironix Fitness Systems Inc.",
    "url": APP_CONFIG.url,
    "logo": `${APP_CONFIG.url}/assets/logo.png`,
    "description": "Creator of Ironix Workout OS, the offline-first 3D biomechanics training ecosystem.",
    "sameAs": Object.values(APP_CONFIG.social).filter(url => url !== '#'),
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@ironix.app",
      "contactType": "Customer Support",
      "availableLanguage": ["English", "Arabic", "Spanish", "French", "German"]
    }
  };
}

export function generateFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${APP_CONFIG.url}${item.url}`
    }))
  };
}

export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Ironix Pro Workout System",
    "image": `${APP_CONFIG.url}/assets/logo.png`,
    "description": "Advanced AI-powered workout tracking platform with 3D biomechanics and 0ms offline sync.",
    "brand": {
      "@type": "Brand",
      "name": "Ironix"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128400"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "89.99",
      "priceCurrency": "USD",
      "offerCount": "3"
    }
  };
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url
  };
}

