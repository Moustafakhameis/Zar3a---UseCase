// src/data/umlData.js
import { ShieldAlert, Truck, Sprout, ShoppingCart, Stethoscope } from 'lucide-react';

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
    dark: 'الوضع الداكن',
    light: 'الوضع الفاتح',
    architecture: 'المعماري',
  },
  en: {
    title: 'Zar3a System',
    subtitle: 'Interactive Use Case Diagram',
    instruction: 'Hover to preview, or click any element to lock it 📌',
    systemBoundary: 'Zar3a System Boundary',
    clearSelection: 'Clear',
    legend: 'Legend',
    admin: 'System Admin',
    supplier: 'Supplier',
    farmer: 'Farmer',
    buyer: 'Buyer',
    specialist: 'Agri Specialist',
    dark: 'Dark',
    light: 'Light',
    architecture: 'Architecture',
  },
};

// ─── Actors ──────────────────────────────────────────────────
export const ACTORS = [
  { id: 'admin',      role: 'Admin',      side: 'left',  icon: ShieldAlert },
  { id: 'supplier',   role: 'Supplier',   side: 'left',  icon: Truck },
  { id: 'farmer',     role: 'Farmer',     side: 'right', icon: Sprout },
  { id: 'buyer',      role: 'Buyer',      side: 'right', icon: ShoppingCart },
  { id: 'specialist', role: 'Specialist', side: 'right', icon: Stethoscope },
];

export const ACTORS_BY_ID = Object.fromEntries(ACTORS.map(a => [a.id, a]));

// ─── Use Cases ───────────────────────────────────────────────
export const USE_CASES = [
  { id: 'uc_register', label: { ar: 'إنشاء حساب',          en: 'Register Account' },  group: 'center', actors: ['admin','supplier','farmer','buyer','specialist'] },
  { id: 'uc_login',    label: { ar: 'تسجيل الدخول',        en: 'Login' },             group: 'center', actors: ['admin','supplier','farmer','buyer','specialist'] },
  { id: 'uc_profile',  label: { ar: 'إدارة الملف الشخصي',  en: 'Manage Profile' },    group: 'center', actors: ['admin','supplier','farmer','buyer','specialist'] },
  { id: 'uc_order',    label: { ar: 'إتمام الطلب',          en: 'Place Order' },       group: 'center', actors: ['admin','supplier','farmer','buyer','specialist'] },
  { id: 'uc_payment',  label: { ar: 'الدفع',                en: 'Make Payment' },      group: 'center', actors: ['admin','supplier','farmer','buyer','specialist'] },

  { id: 'uc_admin1', label: { ar: 'إدارة الحسابات',       en: 'Manage Accounts' },     group: 'left', actors: ['admin'] },
  { id: 'uc_admin2', label: { ar: 'توثيق الموردين',       en: 'Verify Suppliers' },    group: 'left', actors: ['admin'] },
  { id: 'uc_admin3', label: { ar: 'مراقبة المالية',       en: 'Monitor Finances' },    group: 'left', actors: ['admin'] },
  { id: 'uc_admin4', label: { ar: 'تحديث قاعدة المحاصيل', en: 'Update Crop DB' },      group: 'left', actors: ['admin'] },
  { id: 'uc_admin5', label: { ar: 'إضافة إشعارات',        en: 'System Notifications' },group: 'left', actors: ['admin'] },
  { id: 'uc_admin6', label: { ar: 'تذاكر الدعم',          en: 'Support Tickets' },     group: 'left', actors: ['admin'] },
  { id: 'uc_sup1',   label: { ar: 'نشر منتجات جديدة',     en: 'Post Products' },       group: 'left', actors: ['supplier'] },
  { id: 'uc_sup2',   label: { ar: 'إدارة المخزون',        en: 'Manage Inventory' },    group: 'left', actors: ['supplier'] },
  { id: 'uc_sup3',   label: { ar: 'الطلبات المستلمة',     en: 'View Orders' },         group: 'left', actors: ['supplier'] },
  { id: 'uc_sup4',   label: { ar: 'تأكيد الشحن',          en: 'Confirm Shipment' },    group: 'left', actors: ['supplier'] },

  { id: 'uc_farm1', label: { ar: 'إدارة الحقول',     en: 'Manage Fields' },      group: 'right', actors: ['farmer'] },
  { id: 'uc_farm2', label: { ar: 'إضافة محصول',       en: 'Add Crop' },           group: 'right', actors: ['farmer'] },
  { id: 'uc_farm3', label: { ar: 'قراءات الحقل',      en: 'Field Readings' },     group: 'right', actors: ['farmer'] },
  { id: 'uc_farm4', label: { ar: 'استقبال التنبيهات',  en: 'Receive Alerts' },     group: 'right', actors: ['farmer'] },
  { id: 'uc_farm5', label: { ar: 'البحث عن منتجات',   en: 'Search Products' },    group: 'right', actors: ['farmer'] },
  { id: 'uc_farm6', label: { ar: 'استشارة البوت',     en: 'Consult AI' },         group: 'right', actors: ['farmer'] },
  { id: 'uc_farm7', label: { ar: 'محادثة الخبير',     en: 'Chat Specialist' },    group: 'right', actors: ['farmer'] },
  { id: 'uc_buy1',  label: { ar: 'البحث عن محاصيل',   en: 'Search Crops' },       group: 'right', actors: ['buyer'] },
  { id: 'uc_buy2',  label: { ar: 'تصفح المحاصيل',     en: 'Browse Crops' },       group: 'right', actors: ['buyer'] },
  { id: 'uc_buy3',  label: { ar: 'تفاصيل المحصول',    en: 'Crop Details' },       group: 'right', actors: ['buyer'] },
  { id: 'uc_buy4',  label: { ar: 'عنوان الشحن',       en: 'Shipping Address' },   group: 'right', actors: ['buyer'] },
  { id: 'uc_buy5',  label: { ar: 'تتبع الطلب',        en: 'Track Order' },        group: 'right', actors: ['buyer'] },
  { id: 'uc_buy6',  label: { ar: 'تقييم المحصول',     en: 'Rate Crop' },          group: 'right', actors: ['buyer'] },
  { id: 'uc_spec1', label: { ar: 'محادثة الاستشارة',   en: 'Consultation Chat' },  group: 'right', actors: ['specialist'] },
  { id: 'uc_spec2', label: { ar: 'مراجعة القراءات',   en: 'Review Readings' },    group: 'right', actors: ['specialist'] },
  { id: 'uc_spec3', label: { ar: 'تحديث الخبرات',     en: 'Update Expertise' },   group: 'right', actors: ['specialist'] },
];

export const USE_CASES_BY_ID = Object.fromEntries(USE_CASES.map(uc => [uc.id, uc]));

// ─── UML Relationships ──────────────────────────────────────
export const RELATIONSHIPS = [
  { type: 'include', from: 'uc_order', to: 'uc_payment', label: '<<include>>' },
  { type: 'include', from: 'uc_order', to: 'uc_buy4',    label: '<<include>>' },
  { type: 'extend',  from: 'uc_farm4', to: 'uc_farm3',   label: '<<extend>>' },
  { type: 'extend',  from: 'uc_buy3',  to: 'uc_buy2',    label: '<<extend>>' },
  { type: 'extend',  from: 'uc_spec3', to: 'uc_spec1',   label: '<<extend>>' },
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
