// src/data/umlData.js
import { ShieldAlert, Truck, Sprout, ShoppingCart, Stethoscope, Users } from 'lucide-react';

// ─── Translations ────────────────────────────────────────────
export const TRANSLATIONS = {
  ar: {
    title: 'نظام زرعة',
    subtitle: 'مخطط تفاعلي لحالات الاستخدام',
    instruction: 'مرر الماوس للمعاينة، أو اضغط على أي عنصر لتثبيته 📌',
    systemBoundary: 'حدود نظام زرعة',
    clearSelection: 'إلغاء التثبيت',
    legend: 'دليل الألوان',
    admin: 'مدير النظام',
    supplier: 'المورد',
    farmer: 'المزارع',
    buyer: 'المشتري',
    specialist: 'الخبير الزراعي',
    base_user: 'المستخدم الأساسي',
    dark: 'الوضع الداكن',
    light: 'الوضع الفاتح',
    architecture: 'المعماري',
    selectAll: 'تحديد كل المستخدمين',
  },
  en: {
    title: 'Zar3a System',
    subtitle: 'Unified Use Case Diagram',
    instruction: 'Hover to preview, or click any element to lock it 📌',
    systemBoundary: 'Zar3a System',
    clearSelection: 'Clear',
    legend: 'Legend',
    admin: 'Admin',
    supplier: 'Supplier',
    farmer: 'Farmer',
    buyer: 'Buyer',
    specialist: 'Specialist',
    base_user: 'Base User',
    dark: 'Dark',
    light: 'Light',
    architecture: 'Architecture',
    selectAll: 'Select All Users',
  },
};

// ─── Actors ──────────────────────────────────────────────────
export const ACTORS = [
  { id: 'admin',      role: 'Admin',      side: 'left',  icon: ShieldAlert,  inherits: ['base_user'] },
  { id: 'supplier',   role: 'Supplier',   side: 'left',  icon: Truck,        inherits: ['base_user'] },
  { id: 'base_user',  role: 'Base User',  side: 'left',  icon: Users,        inherits: [] },
  { id: 'farmer',     role: 'Farmer',     side: 'right', icon: Sprout,       inherits: ['base_user'] },
  { id: 'buyer',      role: 'Buyer',      side: 'right', icon: ShoppingCart, inherits: ['base_user'] },
  { id: 'specialist', role: 'Specialist', side: 'right', icon: Stethoscope,  inherits: ['base_user'] },
];

export const ACTORS_BY_ID = Object.fromEntries(ACTORS.map(a => [a.id, a]));

// Helper to resolve inherited actors (if an actor has a use case, all actors that inherit from it also have access)
// In this specific diagram, Admin, Supplier, Farmer, Buyer, Specialist all inherit from Base User.
// So if a usecase belongs to base_user, it technically belongs to all of them.
// We will explicitly map this below.

const ALL_USERS = ['admin', 'supplier', 'farmer', 'buyer', 'specialist', 'base_user'];

// ─── Use Cases ───────────────────────────────────────────────
export const USE_CASES = [
  // Base User Use Cases (Center group)
  { id: 'uc_profile',  label: { ar: 'إدارة الملف الشخصي',  en: 'Manage Profile' },     group: 'center', actors: ['base_user'] },
  { id: 'uc_chat_ai',  label: { ar: 'محادثة مع الذكاء',    en: 'Chat with AI' },       group: 'center', actors: ['base_user'] },
  { id: 'uc_register', label: { ar: 'إنشاء حساب',          en: 'Register' },           group: 'center', actors: ['base_user'] },
  { id: 'uc_login',    label: { ar: 'تسجيل الدخول',        en: 'Login' },              group: 'center', actors: ['base_user'] },
  { id: 'uc_search_crops', label: { ar: 'البحث عن محاصيل', en: 'Search Crops' },       group: 'center', actors: ['base_user'] },

  // Admin Use Cases (Left group)
  { id: 'uc_admin1', label: { ar: 'إدارة الحسابات',       en: 'Manage All User Accounts' },   group: 'left', actors: ['admin'] },
  { id: 'uc_admin2', label: { ar: 'توثيق الموردين',       en: 'Verify Products & Suppliers' },group: 'left', actors: ['admin'] },
  { id: 'uc_admin3', label: { ar: 'مراقبة المالية',       en: 'Monitor Order Transactions' }, group: 'left', actors: ['admin'] },
  { id: 'uc_admin4', label: { ar: 'إضافة إشعارات',        en: 'Add System Notifications' },   group: 'left', actors: ['admin'] },

  // Supplier Use Cases (Left group)
  { id: 'uc_sup1',   label: { ar: 'نشر منتجات جديدة',     en: 'Post New Products' },     group: 'left', actors: ['supplier'] },
  { id: 'uc_sup2',   label: { ar: 'الطلبات المستلمة',     en: 'View Received Orders' },  group: 'left', actors: ['supplier'] },
  { id: 'uc_sup3',   label: { ar: 'تأكيد الشحن',          en: 'Confirm Shipment' },      group: 'left', actors: ['supplier'] },

  // Farmer Use Cases (Right group)
  { id: 'uc_farm_track', label: { ar: 'تتبع الطلب',       en: 'Track Order' },                 group: 'right', actors: ['farmer'] },
  { id: 'uc_farm_chat',  label: { ar: 'محادثة الخبير',    en: 'Start Chat with Specialist' },  group: 'right', actors: ['farmer'] },
  { id: 'uc_farm1',      label: { ar: 'إدارة الحقول',     en: 'Manage Fields' },               group: 'right', actors: ['farmer'] },
  { id: 'uc_farm2',      label: { ar: 'إضافة محصول',       en: 'Add Crop to Field' },          group: 'right', actors: ['farmer'] },
  { id: 'uc_farm3',      label: { ar: 'قراءات الحقل',      en: 'Log Field Readings' },         group: 'right', actors: ['farmer'] },
  { id: 'uc_farm4',      label: { ar: 'استقبال التنبيهات', en: 'Receive Alerts' },             group: 'right', actors: ['farmer'] },
  { id: 'uc_farm5',      label: { ar: 'البحث عن منتجات',   en: 'Search Products' },            group: 'right', actors: ['farmer'] },
  { id: 'uc_order_farm', label: { ar: 'إتمام الطلب',       en: 'Place Order' },                group: 'right', actors: ['farmer'] },
  { id: 'uc_address',    label: { ar: 'إدخال العنوان',     en: 'Enter Address' },              group: 'right', actors: ['farmer'] },
  { id: 'uc_payment1',   label: { ar: 'الدفع',             en: 'Make Payment' },               group: 'right', actors: ['farmer'] },

  // Buyer Use Cases (Right group - but shifted slightly for visual separation)
  { id: 'uc_buy1',       label: { ar: 'تصفح المحاصيل',     en: 'Browse Crops' },               group: 'right', actors: ['buyer'] },
  { id: 'uc_buy2',       label: { ar: 'تفاصيل المحصول',    en: 'View Crop Details' },          group: 'right', actors: ['buyer'] },
  { id: 'uc_order_buy',  label: { ar: 'إتمام الطلب',       en: 'Place Order' },                group: 'right', actors: ['buyer'] },
  { id: 'uc_ship_addr',  label: { ar: 'عنوان الشحن',       en: 'Select Shipping Address' },    group: 'right', actors: ['buyer'] },
  { id: 'uc_payment2',   label: { ar: 'الدفع',             en: 'Make Payment' },               group: 'right', actors: ['buyer'] },
  { id: 'uc_buy_track',  label: { ar: 'تتبع حالة الطلب',   en: 'Track Order Status' },         group: 'right', actors: ['buyer'] },

  // Specialist Use Cases (Left group, placed at bottom usually)
  { id: 'uc_spec1', label: { ar: 'الملف المهني',         en: 'Manage Professional Profile' }, group: 'left', actors: ['specialist'] },
  { id: 'uc_spec2', label: { ar: 'تحديث الخبرات',        en: 'Update Expertise' },            group: 'left', actors: ['specialist'] },
  { id: 'uc_spec3', label: { ar: 'محادثة الاستشارة',      en: 'Join Consultation Chat' },      group: 'left', actors: ['specialist'] },
];

export const USE_CASES_BY_ID = Object.fromEntries(USE_CASES.map(uc => [uc.id, uc]));

// ─── UML Relationships ──────────────────────────────────────
export const RELATIONSHIPS = [
  // Farmer Relationships
  { type: 'extend',  from: 'uc_farm4',      to: 'uc_farm3',      label: '<<extend>>' },
  { type: 'include', from: 'uc_order_farm', to: 'uc_address',    label: '<<include>>' },
  { type: 'include', from: 'uc_order_farm', to: 'uc_payment1',   label: '<<include>>' },

  // Buyer Relationships
  { type: 'extend',  from: 'uc_buy2',       to: 'uc_buy1',       label: '<<extend>>' },
  { type: 'include', from: 'uc_order_buy',  to: 'uc_ship_addr',  label: '<<include>>' },
  { type: 'include', from: 'uc_order_buy',  to: 'uc_payment2',   label: '<<include>>' },

  // Specialist Relationships
  { type: 'extend',  from: 'uc_spec2',      to: 'uc_spec1',      label: '<<extend>>' },
];

export const CHILD_UC_IDS = new Set(
  RELATIONSHIPS.map(r => r.type === 'include' ? r.to : r.from)
);

export function getUseCaseRelationship(ucId) {
  const rel = RELATIONSHIPS.find(
    r => (r.type === 'include' && r.to === ucId) ||
         (r.type === 'extend' && r.from === ucId)
  );
  if (!rel) return null;
  return {
    type: rel.type,
    tag: rel.label,
    parentId: rel.type === 'include' ? rel.from : rel.to,
  };
}
