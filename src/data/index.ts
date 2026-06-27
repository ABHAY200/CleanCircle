import { generateAllMockData } from './generators';

const data = generateAllMockData();

export const categories = data.categories;
export const cleaners = data.cleaners;
export const customers = data.customers;
export const services = data.services;
export const reviews = data.reviews;
export const enquiries = data.enquiries;
export const conversations = data.conversations;
export const messages = data.messages;
export const demoUsers = data.demoUsers;
export const notifications = data.notifications;

export const users = [...demoUsers, ...customers.slice(0, 100), ...cleaners.slice(0, 20)];
