# Perry Foods — Homepage Evolution (Soprano's Catering Inspired)

A comprehensive redesign and feature expansion of the **Perry Foods** homepage inspired by the functional architecture of **Soprano's Catering** (`sopranoscatering.com`), tailored to Perry Foods' brand identity (`#F28A08`, `#FFFCF8`, `#24211E`), featuring prominent catering service styles, menu showcases, and an interactive **"Build Your Buffet"** package estimator.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following high-level choices during Phase 1 interactive clarification:
> - **Homepage Layout**: Full-width cinematic hero banner with instant service styles and menu highlights.
> - **Catering Service Styles**: Three primary service models prominently featured:
>   1. **Full-Service Catering** (uniformed staff, full setup/breakdown, linens, tableware, cake cutting)
>   2. **Drop-Off & Pick-Up Trays** (hot & ready party trays, insulated packaging, corporate drop-offs)
>   3. **Build-Your-Own Buffet** (customizable entrees, sides, pastas, salads, and artisan breads)
> - **Interactive Feature**: An interactive **Build Your Buffet & Package Estimator** that calculates estimated price per guest, allows choosing guest tiers, entrees, sides, and signature bakery enhancements, and feeds directly into the quote inquiry form.

---

## 1. Overview & Core Concept

- **What It Delivers**: Transforms Perry Foods' homepage into a high-converting, professional catering portal modeled after industry-leading catering platforms like Soprano's Catering. Visitors can instantly understand service styles, explore categorized menus (By The Tray, Buffet Packages, Weddings, Bakery), interactively build and customize their buffet menu with live cost estimation, and submit catering inquiries with all selections pre-populated.
- **Target Audience**: Corporate event organizers, wedding planners, couples planning celebrations, milestone birthday hosts, and workplace managers looking for turnkey catering and fresh bakery options.
- **Key Value**: Streamlines the catering booking journey from abstract menu browsing to concrete, customized buffet creation with transparent guest-count estimation.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **First Impression (Hero & Quick Action Strip)**:
   - Full-width editorial hero featuring a banquet feast, bold typography (*"Exceptional Food. Seamless Service. Every Celebration."*), dual CTAs (*"Build Your Buffet"* & *"View Menus"*), and an announcement / quick-stats strip (Full Service · Drop-Off Trays · Custom Buffets · Bakery & Pastries).
2. **Service Styles Showcase (Soprano's 3-Tier Model)**:
   - **Full-Service Catering**: Formal banquet setups, uniformed servers, table arrangement, chafing dishes, and post-event cleanup.
   - **Drop-Off Party Trays**: Convenient hot half/full pans for family gatherings, office lunches, and sports viewings.
   - **Build-Your-Own Buffet**: Dynamic interactive station package with hot entrees, savory sides, and fresh salads.
3. **Interactive "Build Your Buffet" Package Estimator**:
   - Step 1: Select Guest Count (slider or steppers: 25 to 300+ guests).
   - Step 2: Choose Buffet Tier (Classic 2-Entree Buffet, Deluxe 3-Entree Buffet, or Executive Celebration Spread).
   - Step 3: Select Entrees, Pastas & Sides (e.g., Rosemary Roasted Chicken, Braised Beef, Penne Pomodoro, Garlic Mashed Potatoes, Seasonal Greens).
   - Step 4: Add Bakery & Dessert Enhancements (Signature Celebration Cake, Assorted Pastry Platter, Muffin Basket).
   - Real-time summary card updating estimated price per person, total estimated range, and a single-click button: *"Request Quote With This Menu"* (which scrolls down and auto-fills the inquiry form).
4. **Curated Menus by Category ("By The Tray" & Plated)**:
   - Visual tabbed filter: *All Selections*, *By The Tray (Bulk Platters)*, *Buffet Packages*, *Bakery & Desserts*, *Fast Bites & Sliders*.
5. **Brand Story & "The Old-World Way" Quality Commitment**:
   - Dark charcoal `#24211E` section highlighting fresh morning baking, handmade dressings, locally sourced ingredients, and attentive event management.
6. **Inquiry & Quote Submission**:
   - Seamlessly receives the configuration from the Buffet Builder, allows specifying event date and venue, validates all fields, and provides clear staging demo feedback.

### Visual Identity & Theme Tokens

- **Dominant Canvas (60%)**: Warm off-white `#FFFCF8` and crisp white `#FFFFFF` card surfaces.
- **Structural Surfaces (30%)**: Hairline borders `#EDE5D9`, soft warm cream card fills `#FFF9F2`, and dark contrast storytelling `#24211E`.
- **Accent Budget (10%)**: Perry Foods signature orange `#F28A08` and hover tone `#DB7A04` strictly for primary action buttons, active tab indicators, and key metric highlights.
- **Typography**: Editorial header face **Oswald** (`font-['Oswald']`) paired with high-legibility **DM Sans** body prose.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Interactive Buffet Estimator vs. Static Text Menus**
  - *Chosen Approach*: Build a rich, client-side interactive Buffet Estimator with instant tier selection, entree/side pickers, guest-count slider, and transparent per-person price modeling ($18–$38/person baseline estimates).
  - *Why*: Soprano's Catering excels because clients can visualize exactly what a buffet package entails. Providing interactive customization drastically improves engagement and qualified inquiry conversions.
- **Decision 2: Seamless Form Syncing**
  - *Chosen Approach*: When a user creates a buffet menu in the calculator and clicks *"Request Quote With This Menu"*, the app smoothly scrolls to the inquiry form, locks in the calculated guest count, sets the service type to "Build Your Own Buffet", and injects the itemized selection list into the notes field.
  - *Why*: Eliminates friction for the client, avoiding double-entry of information.
- **Decision 3: Preserving Official Perry Foods Brand & Logo**
  - *Chosen Approach*: Keep the official orange "P" logo with the cutout fork silhouette and official color palette (`#F28A08`), integrating Soprano's catering structure into Perry Foods' existing visual assets.

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  State: activeSection, selectedService, buffetConfig, inquiryPayload   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
┌───▼──────────────┐    ┌───────────▼──────────────┐    ┌───────────▼──────────────┐
│    Header.tsx    │    │      HeroSection.tsx     │    │   ServiceStyles.tsx      │
│  Logo + Nav +    │    │  Banner + Headline +     │    │  Full-Service, Trays &   │
│  Quick Quote CTA │    │  Action Strip            │    │  Buffet 3-Tier Cards     │
└───┬──────────────┘    └──────────────────────────┘    └──────────────────────────┘
    │
    ├───────────────────────────────┬───────────────────────────────┐
    │                               │                               │
┌───▼──────────────────────┐    ┌───▼──────────────────────┐    ┌───▼──────────────────────┐
│   BuffetBuilder.tsx      │    │     MenuSection.tsx      │    │     AboutSection.tsx     │
│  Interactive Package &   │    │  By The Tray, Buffet,    │    │  Artisanal Quality,      │
│  Guest Cost Estimator    │    │  Cakes & Quick Bites     │    │  Fresh Baking Story      │
└───┬──────────────────────┘    └──────────────────────────┘    └──────────────────────────┘
    │
    ├───────────────────────────────┬───────────────────────────────┐
    │                               │                               │
┌───▼──────────────────────┐    ┌───▼──────────────────────┐    ┌───▼──────────────────────┐
│   GallerySection.tsx     │    │   InquirySection.tsx     │    │    FooterSection.tsx     │
│  Lightbox photo grid     │    │  QuoteForm with auto-    │    │  Brand links, hours,     │
│  with full-screen modal  │    │  filled buffet summary   │    │  contact placeholders    │
└──────────────────────────┘    └──────────────────────────┘    └──────────────────────────┘
```

### Component & Data Strategy

1. **`src/data/buffetPackages.ts`**:
   - Package tiers (Standard Buffet, Classic Italian & American Spread, Executive Gala Package).
   - Entree options (Grilled Herb Chicken, Slow-Roasted Beef, Baked Lasagna, Glazed Salmon, Vegetarian Melanzane).
   - Sides & Pastas (Penne Pomodoro, Garlic Rosemary Potatoes, Tossed Caesar, Seasonal Veg Medley).
   - Bakery upgrades (Perry Foods Celebration Cake, Pastry Platters, Muffin Baskets).
2. **`src/components/BuffetBuilder.tsx`**:
   - Interactive state container managing guest count, active tier, selected items, and computed estimates.
   - Emits payload to the inquiry form on CTA click.
3. **`src/sections/ServiceStylesSection.tsx`**:
   - Highlights the 3 service modes (Full-Service with staff, Convenient Drop-Off party trays, and Build-Your-Own Buffet) with actionable buttons.
