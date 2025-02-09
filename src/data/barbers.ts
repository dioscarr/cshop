export const barbers = [
  {
    id: '1',
    name: 'James Wilson',
    description: 'Master Barber with 15+ years of experience specializing in classic cuts and hot towel shaves.',
    expertise: ['Classic Cuts', 'Razor Fades', 'Hot Towel Shaves'],
    image_url: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg',
    rating: 4.9,
    reviews: 127
  },
  {
    id: '2',
    name: 'Michael Chen',
    description: 'Contemporary stylist known for modern techniques and precision fades.',
    expertise: ['Modern Styles', 'Design Cuts', 'Textured Crops'],
    image_url: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg',
    rating: 4.8,
    reviews: 98
  },
  {
    id: '3',
    name: 'David Rodriguez',
    description: 'Beard specialist and styling expert with a passion for traditional barbering.',
    expertise: ['Beard Styling', 'Scissor Work', 'Traditional Cuts'],
    image_url: 'https://images.pexels.com/photos/2076930/pexels-photo-2076930.jpeg',
    rating: 4.9,
    reviews: 156
  }
] as const;

export type Barber = typeof barbers[number];
