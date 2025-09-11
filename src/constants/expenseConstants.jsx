import React from 'react';

import {
  Apple,
  Bus,
  Dumbbell,
  Utensils,
  ShoppingBag,
  Wallet,
  Coffee,
  Gamepad2,
} from 'lucide-react';

export const EXPENSE_ICONS = {
  Utensils: <Utensils size={30} />,
  Bus: <Bus size={30} />,
  Apple: <Apple size={30} />,
  Dumbbell: <Dumbbell size={30} />,
  ShoppingBag: <ShoppingBag size={30} />,
  Wallet: <Wallet size={30} />,
  Coffee: <Coffee size={30} />,
  Gamepad: <Gamepad2 size={30} />,
};

export const COLORS = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  teal: '#14b8a6',
  pink: '#ec4899',
};

export const CATEGORIES = [
  { name: 'Food', icon: 'Utensils', color: COLORS.red },
  { name: 'Transport', icon: 'Bus', color: COLORS.blue },
  { name: 'Groceries', icon: 'Apple', color: COLORS.green },
  { name: 'Sport', icon: 'Dumbbell', color: COLORS.orange },
  { name: 'Shopping', icon: 'ShoppingBag', color: COLORS.purple },
  { name: 'Bills', icon: 'Wallet', color: COLORS.yellow },
  { name: 'Cafe', icon: 'Coffee', color: COLORS.teal },
  { name: 'Entertainment', icon: 'Gamepad', color: COLORS.pink },
];
