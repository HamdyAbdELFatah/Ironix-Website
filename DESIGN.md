---
version: alpha
name: Ironix website
description: A precise training companion presented through real app screens and a restrained gold identity.
colors:
  primary: "#B98719"
  background: "#F7F6F2"
  foreground: "#17191D"
  card: "#FFFFFF"
  dark-primary: "#F2C24C"
  dark-background: "#101216"
  dark-foreground: "#F3F1EA"
  dark-card: "#171A20"
typography:
  sans:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Arabic", "Geeza Pro", sans-serif'
  mono:
    fontFamily: "ui-monospace, monospace"
rounded:
  DEFAULT: "0.75rem"
spacing:
  page-max: "80rem"
components:
  button: {}
  card: {}
  dialog: {}
---

# Ironix website design

Ironix is a workout companion for people who lift. The landing page should explain the value of logging, recovery and progress quickly, then make the store choices easy to find. The existing Arabic and English copy, real app screens and gold identity are the foundation.

## Visual direction

Use an athletic, precise visual language inspired by the concentric rings of weight plates. Pair generous spacing and confident type with restrained gold accents. Real, localized app screenshots are the hero; do not imply that illustrative values are actual user results. Keep headings compact and supporting text readable, especially in Arabic.

The opening composition pairs two real screens with subtle plate rings. The first two feature surfaces have more visual weight; the other capabilities remain easy to scan. The screenshot gallery is a deliberately dark showcase in both themes. Motion should support orientation, remain understated and respect reduced-motion settings.

## Tokens and ownership

`src/app/globals.css` is the runtime source of truth. Light surfaces use `--background` `#F7F6F2`, `--card` `#FFFFFF`, `--foreground` `#17191D`, and gold `--primary` `#B98719`. Dark surfaces use `#101216`, `#171A20`, `#F3F1EA`, and `#F2C24C` respectively. Semantic tokens, rather than duplicated palette values, control shared surfaces and text. The showcase and download panel intentionally use fixed charcoal surfaces with light text.

## Interaction and accessibility

Keep store links prominent and intact. Preserve keyboard focus, accessible labels, RTL layout and translations. Decorative graphics must be hidden from assistive technology. Motion must reduce when the visitor requests it; all core content remains visible without hover. Preserve the existing legal, pricing and language behavior.
