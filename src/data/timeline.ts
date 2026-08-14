import { TimelineStep } from '../types';

export const ORDER_PROCESS_STEPS: TimelineStep[] = [
  {
    step: 1,
    title: 'Choose Design',
    subtitle: 'Select Frame & Customization',
    description: 'Browse our collection or use our 3D customizer to select shape, size, wood base, and gold foil accents.',
    iconName: 'LayoutGrid',
    duration: 'Day 1',
  },
  {
    step: 2,
    title: 'Share Memories',
    subtitle: 'Ship Flowers or Sentimental Tokens',
    description: 'Send your fresh flowers or sentimental items to our studio using our easy step-by-step courier packaging guide.',
    iconName: 'PackageCheck',
    duration: 'Days 2-3',
  },
  {
    step: 3,
    title: 'Handcrafted',
    subtitle: 'Dehydration & Multi-Layer Casting',
    description: 'Flowers are moisture- dehydrated in organic silica gel, arranged artistically, and poured in bubble-free optical resin.',
    iconName: 'Sparkles',
    duration: 'Days 4-10',
  },
  {
    step: 4,
    title: 'Quality Check',
    subtitle: 'Hand Buffing & Diamond Polish',
    description: 'Each piece undergoes high-grit hand sanding, mirror edge polishing, and rigorous UV clarity inspection.',
    iconName: 'CheckCircle2',
    duration: 'Day 11',
  },
  {
    step: 5,
    title: 'Delivered',
    subtitle: 'Luxury Gift Box to Your Doorstep',
    description: 'Packed safely in luxury velvet foam & solid wooden gift casing, delivered worldwide with full transit insurance.',
    iconName: 'Gift',
    duration: 'Days 12-14',
  },
];
