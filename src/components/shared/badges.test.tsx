import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppStoreBadge } from './app-store-badge';
import { GooglePlayBadge } from './google-play-badge';
import { AppGalleryBadge } from './app-gallery-badge';

describe('App Download Badges', () => {
  it('renders Apple App Store badge with accessible label', () => {
    render(<AppStoreBadge section="hero" />);
    const link = screen.getByRole('link', { name: /Download Ironix on Apple App Store/i });
    expect(link).toBeInTheDocument();
    expect(screen.getByText('App Store')).toBeInTheDocument();
  });

  it('renders Google Play badge with accessible label', () => {
    render(<GooglePlayBadge section="hero" />);
    const link = screen.getByRole('link', { name: /Get Ironix on Google Play/i });
    expect(link).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('renders Huawei AppGallery badge with accessible label', () => {
    render(<AppGalleryBadge section="hero" />);
    const link = screen.getByRole('link', { name: /Explore Ironix on Huawei AppGallery/i });
    expect(link).toBeInTheDocument();
    expect(screen.getByText('AppGallery')).toBeInTheDocument();
  });
});
