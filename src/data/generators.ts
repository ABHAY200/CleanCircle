import type {
  Category,
  Cleaner,
  Customer,
  Service,
  Review,
  Enquiry,
  Conversation,
  Message,
  Notification,
  User,
  WorkingHours,
  Location,
} from '@/types';
import { getAvatarImage, getCleanerBanner, getServiceImage } from '@/constants/images';
import { SERVICE_TYPES } from '@/constants/serviceTypes';
import { ENQUIRY_STATUS } from '@/constants/enquiryStatus';
import { generateId } from '@/utils';

const CANADIAN_CITIES = [
  { city: 'Toronto', province: 'ON', lat: 43.6532, lng: -79.3832 },
  { city: 'Vancouver', province: 'BC', lat: 49.2827, lng: -123.1207 },
  { city: 'Montreal', province: 'QC', lat: 45.5017, lng: -73.5673 },
  { city: 'Calgary', province: 'AB', lat: 51.0447, lng: -114.0719 },
  { city: 'Ottawa', province: 'ON', lat: 45.4215, lng: -75.6972 },
  { city: 'Edmonton', province: 'AB', lat: 53.5461, lng: -113.4938 },
  { city: 'Winnipeg', province: 'MB', lat: 49.8951, lng: -97.1384 },
  { city: 'Halifax', province: 'NS', lat: 44.6488, lng: -63.5752 },
  { city: 'Victoria', province: 'BC', lat: 48.4284, lng: -123.3656 },
  { city: 'Saskatoon', province: 'SK', lat: 52.1332, lng: -106.67 },
];

const FIRST_NAMES = [
  'James', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Ashley',
  'William', 'Amanda', 'John', 'Jennifer', 'Daniel', 'Lisa', 'Matthew', 'Michelle',
  'Christopher', 'Stephanie', 'Andrew', 'Nicole', 'Joshua', 'Elizabeth', 'Ryan',
  'Melissa', 'Brandon', 'Rebecca', 'Kevin', 'Laura', 'Brian', 'Angela',
  'Priya', 'Raj', 'Mei', 'Chen', 'Fatima', 'Ahmed', 'Olivia', 'Liam', 'Emma', 'Noah',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore',
  'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark', 'Lewis',
  'Patel', 'Singh', 'Chen', 'Wong', 'Kim', 'Nguyen', 'Ali',
];

const BUSINESS_PREFIXES = [
  'Sparkle', 'Fresh', 'Clean', 'Pure', 'Bright', 'Shine', 'Crystal', 'Elite',
  'Pro', 'Premier', 'Golden', 'Royal', 'Supreme', 'Perfect', 'Ultimate',
];

const BUSINESS_SUFFIXES = [
  'Cleaners', 'Cleaning Co.', 'Services', 'Solutions', 'Pros', 'Experts',
  'Care', 'Works', 'Team', 'Group', 'Partners', 'Specialists',
];

const SERVICE_TITLES = [
  'Deep Home Cleaning', 'Regular House Cleaning', 'Move-In/Move-Out Cleaning',
  'Office Cleaning', 'Commercial Space Cleaning', 'Post-Construction Cleanup',
  'Carpet & Upholstery Cleaning', 'Window Cleaning', 'Car Interior Detailing',
  'Kitchen Deep Clean', 'Bathroom Sanitization', 'Eco-Friendly Cleaning',
  'Airbnb Turnover Cleaning', 'Medical Office Cleaning', 'Restaurant Cleaning',
  'Floor Waxing & Polishing', 'Pressure Washing', 'Garage Cleaning',
  'Basement Cleaning', 'Attic Cleaning', 'Holiday Cleaning Package',
  'Spring Cleaning Special', 'Pet-Friendly Cleaning', 'Senior Home Cleaning',
];

const SERVICE_FEATURES = [
  'All cleaning supplies included',
  'Eco-friendly products available',
  'Fully insured and bonded',
  'Background-checked staff',
  'Satisfaction guarantee',
  'Flexible scheduling',
  'Same-day service available',
  'Free estimate',
  'Pet-safe products',
  'HEPA vacuum filtration',
];

const REVIEW_COMMENTS = [
  'Excellent service! Very thorough and professional.',
  'They did an amazing job. My home has never looked better.',
  'Punctual, friendly, and great attention to detail.',
  'Highly recommend! Will definitely book again.',
  'Professional team that exceeded my expectations.',
  'Great value for money. Very satisfied with the results.',
  'They were careful with my belongings and did a fantastic job.',
  'Quick response time and excellent communication.',
  'The best cleaning service I\'ve ever used in the city.',
  'Reliable and trustworthy. Five stars!',
  'Good service overall, minor areas could be improved.',
  'Very impressed with the quality of work.',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CATEGORY_DATA = [
  { name: 'Home Cleaning', slug: 'home-cleaning', icon: 'home', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Deep Cleaning', slug: 'deep-cleaning', icon: 'sparkles', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Office Cleaning', slug: 'office-cleaning', icon: 'office', type: SERVICE_TYPES.OFFICE },
  { name: 'Commercial Cleaning', slug: 'commercial-cleaning', icon: 'building', type: SERVICE_TYPES.COMMERCIAL },
  { name: 'Car Cleaning', slug: 'car-cleaning', icon: 'car', type: SERVICE_TYPES.CAR },
  { name: 'Carpet Cleaning', slug: 'carpet-cleaning', icon: 'layers', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Window Cleaning', slug: 'window-cleaning', icon: 'droplets', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Move-In/Out', slug: 'move-in-out', icon: 'home', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Post-Construction', slug: 'post-construction', icon: 'wrench', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Eco Cleaning', slug: 'eco-cleaning', icon: 'leaf', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Airbnb Cleaning', slug: 'airbnb-cleaning', icon: 'sparkles', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Kitchen Cleaning', slug: 'kitchen-cleaning', icon: 'sparkles', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Bathroom Cleaning', slug: 'bathroom-cleaning', icon: 'droplets', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Floor Care', slug: 'floor-care', icon: 'layers', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Pressure Washing', slug: 'pressure-washing', icon: 'zap', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Medical Facility', slug: 'medical-facility', icon: 'shield', type: SERVICE_TYPES.COMMERCIAL },
  { name: 'Restaurant Cleaning', slug: 'restaurant-cleaning', icon: 'building', type: SERVICE_TYPES.COMMERCIAL },
  { name: 'Garage Cleaning', slug: 'garage-cleaning', icon: 'car', type: SERVICE_TYPES.SPECIALIZED },
  { name: 'Senior Home Care', slug: 'senior-home-care', icon: 'heart', type: SERVICE_TYPES.RESIDENTIAL },
  { name: 'Pet-Friendly Cleaning', slug: 'pet-friendly', icon: 'leaf', type: SERVICE_TYPES.RESIDENTIAL },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

function generateWorkingHours(rand: () => number): WorkingHours[] {
  return DAYS.map((day) => {
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    const isClosed = isWeekend && rand() > 0.6;
    return {
      day,
      open: isClosed ? '' : '08:00',
      close: isClosed ? '' : isWeekend ? '16:00' : '18:00',
      isClosed,
    };
  });
}

function generateLocation(index: number, rand: () => number): Location {
  const loc = CANADIAN_CITIES[index % CANADIAN_CITIES.length];
  return {
    city: loc.city,
    province: loc.province,
    address: `${100 + (index % 900)} ${pick(['Main', 'King', 'Queen', 'Bay', 'Yonge', 'Bloor'], rand)} St`,
    lat: loc.lat + (rand() - 0.5) * 0.1,
    lng: loc.lng + (rand() - 0.5) * 0.1,
  };
}

export function generateCategories(): Category[] {
  return CATEGORY_DATA.map((cat, i) => ({
    id: generateId('cat', i + 1),
    name: cat.name,
    slug: cat.slug,
    description: `Professional ${cat.name.toLowerCase()} services across Canada.`,
    icon: cat.icon,
    serviceType: cat.type,
    serviceCount: 0,
    image: getServiceImage(i),
  }));
}

export function generateCleaners(count: number): Cleaner[] {
  const rand = seededRandom(42);
  return Array.from({ length: count }, (_, i) => {
    const firstName = pick(FIRST_NAMES, rand);
    const lastName = pick(LAST_NAMES, rand);
    const location = generateLocation(i, rand);
    const rating = Math.round((3.5 + rand() * 1.5) * 10) / 10;
    const reviewCount = Math.floor(rand() * 200) + 5;
    const businessName = `${pick(BUSINESS_PREFIXES, rand)} ${pick(BUSINESS_SUFFIXES, rand)}`;
    const id = generateId('cleaner', i + 1);

    return {
      id,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@cleanercircle.ca`,
      firstName,
      lastName,
      phone: `+1 (${300 + (i % 700)}) ${100 + (i % 900)}-${1000 + (i % 9000)}`,
      avatar: getAvatarImage(i),
      role: 'cleaner' as const,
      createdAt: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
      isVerified: rand() > 0.15,
      businessName,
      description: `${businessName} provides top-quality cleaning services in ${location.city}, ${location.province}. With ${3 + (i % 15)} years of experience, we deliver exceptional results for residential and commercial clients.`,
      banner: getCleanerBanner(i),
      logo: getAvatarImage(i + 10),
      gallery: [getServiceImage(i), getServiceImage(i + 1), getServiceImage(i + 2), getServiceImage(i + 3)],
      location,
      rating,
      reviewCount,
      experience: 1 + (i % 20),
      workingHours: generateWorkingHours(rand),
      certificates: pickN(['Licensed & Insured', 'WSIB Compliant', 'Green Seal Certified', 'IICRC Certified', 'COVID-19 Protocol Trained'], 2 + (i % 3), rand),
      serviceIds: [],
      isFeatured: i < 8,
      isAvailable: rand() > 0.2,
      responseTime: pick(['Within 1 hour', 'Within 2 hours', 'Within 4 hours', 'Same day'], rand),
      jobsCompleted: Math.floor(rand() * 500) + 20,
      memberSince: new Date(2022 + (i % 3), i % 12, 1).toISOString(),
    };
  });
}

export function generateCustomers(count: number): Customer[] {
  const rand = seededRandom(123);
  return Array.from({ length: count }, (_, i) => {
    const firstName = pick(FIRST_NAMES, rand);
    const lastName = pick(LAST_NAMES, rand);
    const location = generateLocation(i, rand);
    const id = generateId('customer', i + 1);

    return {
      id,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.ca`,
      firstName,
      lastName,
      phone: `+1 (${400 + (i % 600)}) ${200 + (i % 800)}-${2000 + (i % 8000)}`,
      avatar: getAvatarImage(i + 20),
      role: 'customer' as const,
      createdAt: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
      isVerified: rand() > 0.3,
      addresses: [{
        id: generateId('addr', i + 1),
        label: 'Home',
        street: location.address,
        city: location.city,
        province: location.province,
        postalCode: `${String.fromCharCode(65 + (i % 26))}${i % 10}${String.fromCharCode(65 + ((i + 5) % 26))} ${i % 10}${String.fromCharCode(65 + ((i + 10) % 26))}${(i + 3) % 10}`,
        isDefault: true,
      }],
      favoriteCleanerIds: [],
    };
  });
}

export function generateServices(cleaners: Cleaner[], categories: Category[], count: number): Service[] {
  const rand = seededRandom(456);
  const services: Service[] = [];

  for (let i = 0; i < count; i++) {
    const cleaner = cleaners[i % cleaners.length];
    const category = categories[i % categories.length];
    const price = 25 + Math.floor(rand() * 175);
    const rating = Math.round((3.5 + rand() * 1.5) * 10) / 10;
    const title = SERVICE_TITLES[i % SERVICE_TITLES.length];
    const id = generateId('service', i + 1);

    services.push({
      id,
      title: i >= SERVICE_TITLES.length ? `${title} - ${cleaner.location.city}` : title,
      description: `Professional ${title.toLowerCase()} service provided by ${cleaner.businessName}. Our experienced team uses industry-leading equipment and eco-friendly products to deliver spotless results every time.`,
      shortDescription: `Expert ${title.toLowerCase()} in ${cleaner.location.city}.`,
      price,
      priceType: rand() > 0.3 ? 'hourly' : 'fixed',
      duration: 1 + (i % 8),
      categoryId: category.id,
      cleanerId: cleaner.id,
      serviceType: category.serviceType,
      features: pickN(SERVICE_FEATURES, 4 + (i % 3), rand),
      images: [getServiceImage(i), getServiceImage(i + 2)],
      rating,
      reviewCount: Math.floor(rand() * 100) + 1,
      isActive: rand() > 0.05,
      isFeatured: i < 12,
      location: cleaner.location,
      createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
    });

    cleaner.serviceIds.push(id);
  }

  categories.forEach((cat) => {
    cat.serviceCount = services.filter((s) => s.categoryId === cat.id).length;
  });

  return services;
}

export function generateReviews(customers: Customer[], cleaners: Cleaner[], services: Service[], count: number): Review[] {
  const rand = seededRandom(789);
  return Array.from({ length: count }, (_, i) => ({
    id: generateId('review', i + 1),
    customerId: customers[i % customers.length].id,
    cleanerId: cleaners[i % cleaners.length].id,
    serviceId: services[i % services.length].id,
    rating: Math.floor(rand() * 2) + 4,
    comment: pick(REVIEW_COMMENTS, rand),
    createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
    isVerified: rand() > 0.2,
  }));
}

export function generateEnquiries(customers: Customer[], _cleaners: Cleaner[], services: Service[], count: number): Enquiry[] {
  const rand = seededRandom(321);
  const statuses = Object.values(ENQUIRY_STATUS);

  return Array.from({ length: count }, (_, i) => {
    const customer = customers[i % customers.length];
    const service = services[i % services.length];
    const created = new Date(2024, i % 12, (i % 28) + 1);

    return {
      id: generateId('enquiry', i + 1),
      customerId: customer.id,
      cleanerId: service.cleanerId,
      serviceId: service.id,
      status: pick(statuses, rand),
      message: `Hi, I'm interested in your ${service.title} service. Could you please provide availability for the coming week?`,
      preferredDate: new Date(created.getTime() + 86400000 * (3 + (i % 7))).toISOString().split('T')[0],
      preferredTime: pick(['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], rand),
      createdAt: created.toISOString(),
      updatedAt: created.toISOString(),
    };
  });
}

export function generateConversations(customers: Customer[], cleaners: Cleaner[], enquiries: Enquiry[], count: number): Conversation[] {
  const rand = seededRandom(654);
  return Array.from({ length: count }, (_, i) => {
    const enquiry = enquiries[i % enquiries.length];
    const customer = customers.find((c) => c.id === enquiry.customerId)!;
    const cleaner = cleaners.find((c) => c.id === enquiry.cleanerId)!;

    return {
      id: generateId('conv', i + 1),
      participantIds: [customer.id, cleaner.id],
      lastMessage: pick([
        'Thank you for your enquiry!',
        'What time works best for you?',
        'I can come this Thursday at 10 AM.',
        'That sounds perfect, see you then!',
        'Do you have any special requirements?',
      ], rand),
      lastMessageAt: new Date(2024, i % 12, (i % 28) + 1, 10 + (i % 12), i % 60).toISOString(),
      unreadCount: {
        [customer.id]: rand() > 0.7 ? Math.floor(rand() * 3) : 0,
        [cleaner.id]: rand() > 0.7 ? Math.floor(rand() * 3) : 0,
      },
      enquiryId: enquiry.id,
    };
  });
}

export function generateMessages(conversations: Conversation[], count: number): Message[] {
  const rand = seededRandom(987);
  const templates = [
    'Hi, I saw your service listing and I\'m interested.',
    'Thank you for reaching out! I\'d be happy to help.',
    'What dates are you available?',
    'I\'m available Monday through Friday.',
    'Great! Can you do this Thursday at 10 AM?',
    'Yes, that works perfectly for me.',
    'Do you bring your own cleaning supplies?',
    'Yes, all supplies are included in the service.',
    'Perfect, looking forward to it!',
    'Thank you! See you then.',
  ];

  const messages: Message[] = [];
  let msgIndex = 0;

  for (const conv of conversations) {
    const msgCount = Math.floor(count / conversations.length) + (msgIndex % 3);
    for (let j = 0; j < msgCount && messages.length < count; j++) {
      messages.push({
        id: generateId('msg', msgIndex + 1),
        conversationId: conv.id,
        senderId: conv.participantIds[j % 2],
        content: templates[(msgIndex + j) % templates.length],
        createdAt: new Date(2024, msgIndex % 12, (msgIndex % 28) + 1, 9 + (j % 10), j * 5).toISOString(),
        isRead: rand() > 0.3,
      });
      msgIndex++;
    }
  }

  return messages.slice(0, count);
}

export function generateNotifications(users: User[], count: number): Notification[] {
  const rand = seededRandom(111);
  const types = ['info', 'success', 'warning', 'error'] as ('info' | 'success' | 'warning' | 'error')[];
  const titles = [
    'New Enquiry Received',
    'Enquiry Accepted',
    'New Message',
    'Review Received',
    'Service Updated',
    'Profile Verified',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: generateId('notif', i + 1),
    userId: users[i % users.length].id,
    title: pick(titles, rand),
    message: 'You have a new notification. Check your dashboard for details.',
    type: pick(types, rand),
    isRead: rand() > 0.5,
    createdAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  }));
}

export function generateDemoUsers(): User[] {
  return [
    {
      id: 'demo-customer',
      email: 'customer@demo.com',
      firstName: 'Alex',
      lastName: 'Thompson',
      phone: '+1 (416) 555-0101',
      avatar: getAvatarImage(0),
      role: 'customer',
      createdAt: '2024-01-15T00:00:00.000Z',
      isVerified: true,
    },
    {
      id: 'demo-cleaner',
      email: 'cleaner@demo.com',
      firstName: 'Maria',
      lastName: 'Santos',
      phone: '+1 (416) 555-0202',
      avatar: getAvatarImage(1),
      role: 'cleaner',
      createdAt: '2023-06-01T00:00:00.000Z',
      isVerified: true,
    },
    {
      id: 'demo-admin',
      email: 'admin@demo.com',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1 (416) 555-0303',
      avatar: getAvatarImage(2),
      role: 'admin',
      createdAt: '2023-01-01T00:00:00.000Z',
      isVerified: true,
    },
  ];
}

export function generateAllMockData() {
  const categories = generateCategories();
  const cleaners = generateCleaners(100);
  const customers = generateCustomers(1000);
  const services = generateServices(cleaners, categories, 500);
  const reviews = generateReviews(customers, cleaners, services, 300);
  const enquiries = generateEnquiries(customers, cleaners, services, 150);
  const conversations = generateConversations(customers, cleaners, enquiries, 200);
  const messages = generateMessages(conversations, 800);
  const demoUsers = generateDemoUsers();
  const notifications = generateNotifications([...demoUsers, ...customers.slice(0, 50)], 50);

  customers.slice(0, 10).forEach((c, i) => {
    c.favoriteCleanerIds = cleaners.slice(i, i + 3).map((cl) => cl.id);
  });

  return {
    categories,
    cleaners,
    customers,
    services,
    reviews,
    enquiries,
    conversations,
    messages,
    demoUsers,
    notifications,
  };
}
