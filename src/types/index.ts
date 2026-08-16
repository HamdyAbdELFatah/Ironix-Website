export interface Feature {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface Testimonial {
  nameKey: string;
  roleKey: string;
  contentKey: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface HowItWorksStep {
  number: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}
