import React, { useState } from 'react';
import { MenuItem } from '../types';
import { SafeImage } from './SafeImage';
import { Button } from './Button';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  User,
  Phone,
  FileText,
  RefreshCw,
  Check,
  MessageSquare,
  Search,
} from 'lucide-react';
import { appendOrderToGoogleSheet, fetchOrdersFromGoogleSheet, fetchOrderFromWebApp, LiveSheetOrder } from '../services/googleSheets';
import {
  saveOrderToFirestore,
  searchOrdersInFirestore,
  updateOrderStatusInFirestore,
  isStrictExactOrderMatch,
} from '../services/orderFirestore';
import { DeliveryLocationPicker, DeliveryLocationData } from './DeliveryLocationPicker';

import cbeLogo from '../assets/CBE.jpg';
import telebirrLogo from '../assets/telebirr.jpg';
import boaLogo from '../assets/BOA.jpg';
import awashLogo from '../assets/Awash.jpg';

export interface OrderRecord {
  orderNo: string;
  customerName: string;
  phone: string;
  orderDate: string;
  deliveryDate: string;
  deliveryOption?: string;
  deliveryAddress?: string;
  deliveryLocationUrl?: string;
  deliveryFee?: number;
  distanceKm?: number;
  totalAmountBirr: number;
  itemsSummary: string;
  bank: string;
  status: string;
  step: number;
  createdAt: number;
}

export interface OrderItemEntry {
  item: MenuItem;
  quantity: number;
  totalBirr: number;
}

export interface BankOption {
  id: string;
  name: string;
  shortName: string;
  accountNumber: string;
  accountName: string;
  logo: string;
}

export const BANK_OPTIONS: BankOption[] = [
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    shortName: 'Commercial Bank',
    accountNumber: '1000262980627',
    accountName: 'Abenezer Assefa',
    logo: cbeLogo,
  },
  {
    id: 'telebirr',
    name: 'Telebirr',
    shortName: 'Telebirr',
    accountNumber: '0931605750',
    accountName: 'Abenezer Assefa',
    logo: telebirrLogo,
  },
  {
    id: 'abyssinia',
    name: 'Bank of Abyssinia',
    shortName: 'Abyssinia Bank',
    accountNumber: '90378317',
    accountName: 'Abenezer Assefa',
    logo: boaLogo,
  },
  {
    id: 'awash',
    name: 'Awash Bank',
    shortName: 'Awash Bank',
    accountNumber: '000196257896',
    accountName: 'Abenezer Assefa',
    logo: awashLogo,
  },
];

interface MyOrderSectionProps {
  orderItems: OrderItemEntry[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearOrder: () => void;
  onOrderSubmittedStateChange?: (submitted: boolean) => void;
  onConfirmOrderSubmit?: (orderDetails: {
    items: OrderItemEntry[];
    totalBirr: number;
    customerName: string;
    phone: string;
    date: string;
    remark: string;
    selectedBank: BankOption | null;
    paymentSms: string;
  }) => void;
}

export const MyOrderSection: React.FC<MyOrderSectionProps> = ({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onOrderSubmittedStateChange,
  onConfirmOrderSubmit,
}) => {
  // Always start with blank input boxes if no order is placed or on page reload,
  // and sync any existing local orders to Firestore so they are globally searchable by name & phone
  React.useEffect(() => {
    try {
      localStorage.removeItem('perry_order_form_state');
      const historyStr = localStorage.getItem('perry_orders_history');
      if (historyStr) {
        const history: OrderRecord[] = JSON.parse(historyStr);
        history.forEach((loc) => {
          saveOrderToFirestore({
            orderNo: loc.orderNo,
            customerName: loc.customerName,
            phoneNumber: loc.phone,
            deliveryLocation: loc.deliveryAddress || 'Shop Pickup (Arbegnoch St, Addis Ababa)',
            deliveryOption: (loc.deliveryOption as any) || 'pickup',
            deliveryAddress: loc.deliveryAddress || '',
            deliveryFee: loc.deliveryFee || 0,
            orderDate: loc.orderDate,
            eventDeliveryDate: loc.deliveryDate,
            totalAmountBirr: loc.totalAmountBirr,
            bankName: loc.bank,
            accountNumber: '',
            paymentSms: '',
            itemsSummary: loc.itemsSummary,
            orderVerified: (loc as any).orderVerified || 'Pending',
            orderDelivered: (loc as any).orderDelivered || 'Pending',
          }).catch(() => {});
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryLocationData>({
    option: 'pickup',
    address: '',
    lat: undefined,
    lng: undefined,
    mapsUrl: undefined,
    distanceKm: 0,
    deliveryFee: 0,
    streetName: 'Arbegnoch St',
    cityName: 'Addis Ababa',
  });
  const [remark, setRemark] = useState('');
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [paymentSms, setPaymentSms] = useState('');
  const [submittedPaymentSms, setSubmittedPaymentSms] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderReference, setOrderReference] = useState('');
  const [submittedItems, setSubmittedItems] = useState<OrderItemEntry[]>([]);
  const [submittedTotalBirr, setSubmittedTotalBirr] = useState(0);
  const [submittedSubtotalBirr, setSubmittedSubtotalBirr] = useState(0);
  const [submittedDeliveryFeeBirr, setSubmittedDeliveryFeeBirr] = useState(0);
  const [submittedDeliveryInfo, setSubmittedDeliveryInfo] = useState<DeliveryLocationData | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Order status lookup state - initialized empty, only searches when Track is explicitly clicked
  const [statusSearchQuery, setStatusSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [searchStatusInputError, setSearchStatusInputError] = useState<string | null>(null);
  const [hasSearchedStatus, setHasSearchedStatus] = useState(false);
  const [isSearchingStatus, setIsSearchingStatus] = useState(false);
  const [trackedOrders, setTrackedOrders] = useState<LiveSheetOrder[]>([]);

  // Normalize string for comparison by removing all non-alphanumeric characters
  const normalizeAlphanumeric = (str: string | undefined | null): string => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  // Normalize phone number to standard digits (stripping country code +251 or non-digits)
  const normalizePhoneDigits = (phone: string | undefined | null): string => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('251') && digits.length === 12) {
      return '0' + digits.slice(3);
    }
    return digits;
  };

  // Matching helper: strict exact match only (neglects special characters and 0s added before/after)
  const isExactOrderMatch = (
    query: string,
    target: { orderNo?: string; customerName?: string; phone?: string; phoneNumber?: string }
  ): boolean => {
    return isStrictExactOrderMatch(query, target);
  };

  const handleSearchOrderStatus = async () => {
    const q = statusSearchQuery.trim();
    if (!q) {
      setSearchStatusInputError('Please enter your Order ID (e.g. PF-...), phone number, or customer name.');
      return;
    }

    setSearchStatusInputError(null);
    setHasSearchedStatus(true);
    setLastSearchedQuery(q);
    setIsSearchingStatus(true);

    const qPhone = normalizePhoneDigits(q);
    const isCompletePhone = qPhone.length >= 7;

    try {
      const matches: LiveSheetOrder[] = [];
      const seenOrderNos = new Set<string>();

      // 1. Search persistent Firestore (by Name, Phone number, or Order ID across all sessions)
      try {
        const firestoreMatches = await searchOrdersInFirestore(q);
        firestoreMatches.forEach((m) => {
          const norm = normalizeAlphanumeric(m.orderNo);
          if (!seenOrderNos.has(norm)) {
            seenOrderNos.add(norm);
            matches.push(m);
          }
        });
      } catch (fErr) {
        console.warn('Firestore order search fallback:', fErr);
      }

      // Collect candidate Order IDs to check directly against the Apps Script doGet endpoint
      const candidateOrderNos = new Set<string>();
      candidateOrderNos.add(q);
      if (!q.toUpperCase().startsWith('PF-')) {
        candidateOrderNos.add(`PF-${q}`);
      } else {
        candidateOrderNos.add(q.replace(/^PF-?/i, ''));
      }
      matches.forEach((m) => {
        if (m.orderNo) candidateOrderNos.add(m.orderNo);
      });

      // Check local history for complete phone number, customer name, or order number
      const localMatchingOrderNos = new Set<string>();
      let localHistory: OrderRecord[] = [];
      try {
        const historyStr = localStorage.getItem('perry_orders_history');
        if (historyStr) {
          localHistory = JSON.parse(historyStr);
          localHistory.forEach((o) => {
            if (isExactOrderMatch(q, { orderNo: o.orderNo, customerName: o.customerName, phone: o.phone })) {
              const normNo = normalizeAlphanumeric(o.orderNo);
              if (normNo) localMatchingOrderNos.add(normNo);
              if (o.orderNo) candidateOrderNos.add(o.orderNo);
            }
          });
        }
      } catch {
        // ignore
      }

      // 2. Check Apps Script doGet endpoint for each candidate order number to sync real-time sheet verification status
      for (const orderNoCandidate of candidateOrderNos) {
        if (!orderNoCandidate) continue;
        try {
          const webAppResult = await fetchOrderFromWebApp(orderNoCandidate);
          if (webAppResult && webAppResult.orderNo && isStrictExactOrderMatch(q, webAppResult)) {
            const norm = normalizeAlphanumeric(webAppResult.orderNo);
            const existingIdx = matches.findIndex(
              (m) => normalizeAlphanumeric(m.orderNo) === norm
            );
            if (existingIdx >= 0) {
              matches[existingIdx] = {
                ...matches[existingIdx],
                orderVerified: webAppResult.orderVerified || matches[existingIdx].orderVerified,
                orderDelivered: webAppResult.orderDelivered || matches[existingIdx].orderDelivered,
              };
              updateOrderStatusInFirestore(webAppResult.orderNo, {
                orderVerified: webAppResult.orderVerified,
                orderDelivered: webAppResult.orderDelivered,
              }).catch(() => {});
            } else {
              seenOrderNos.add(norm);
              matches.push(webAppResult);
            }
          }
        } catch {
          // ignore single candidate failure
        }
      }

      // 3. Sync and merge local history orders with any newly discovered status
      let historyUpdated = false;
      localHistory.forEach((localOrder) => {
        const localNorm = normalizeAlphanumeric(localOrder.orderNo);
        const liveMatch = matches.find(
          (m) => normalizeAlphanumeric(m.orderNo) === localNorm
        );

        if (liveMatch) {
          if (liveMatch.orderVerified && (localOrder as any).orderVerified !== liveMatch.orderVerified) {
            (localOrder as any).orderVerified = liveMatch.orderVerified;
            historyUpdated = true;
          }
          if (liveMatch.orderDelivered && (localOrder as any).orderDelivered !== liveMatch.orderDelivered) {
            (localOrder as any).orderDelivered = liveMatch.orderDelivered;
            historyUpdated = true;
          }
        } else {
          // If no remote record was found, fall back to locally saved order
          if (
            isExactOrderMatch(q, {
              orderNo: localOrder.orderNo,
              customerName: localOrder.customerName,
              phone: localOrder.phone,
            })
          ) {
            if (!seenOrderNos.has(localNorm)) {
              seenOrderNos.add(localNorm);
              matches.push({
                orderNo: localOrder.orderNo,
                customerName: localOrder.customerName,
                itemsSummary: localOrder.itemsSummary,
                deliveryDate: localOrder.deliveryDate,
                totalAmount: `${localOrder.totalAmountBirr.toLocaleString()} Birr`,
                bank: localOrder.bank,
                account: '',
                sms: '',
                orderVerified: (localOrder as any).orderVerified || 'Pending',
                orderDelivered: (localOrder as any).orderDelivered || 'Pending',
              });
            }
          }
        }
      });

      if (historyUpdated) {
        try {
          localStorage.setItem('perry_orders_history', JSON.stringify(localHistory));
        } catch {
          // ignore
        }
      }

      setTrackedOrders(matches);
    } catch (err: any) {
      console.warn('Could not complete order lookup:', err);
      // Fallback cleanly to local history matching without displaying error notice
      try {
        const historyStr = localStorage.getItem('perry_orders_history');
        if (historyStr) {
          const history: OrderRecord[] = JSON.parse(historyStr);
          const localFallback = history
            .filter((o) =>
              isExactOrderMatch(q, {
                orderNo: o.orderNo,
                customerName: o.customerName,
                phone: o.phone,
              })
            )
            .map((o) => ({
              orderNo: o.orderNo,
              customerName: o.customerName,
              itemsSummary: o.itemsSummary,
              deliveryDate: o.deliveryDate,
              totalAmount: `${o.totalAmountBirr.toLocaleString()} Birr`,
              bank: o.bank,
              account: '',
              sms: '',
              orderVerified: (o as any).orderVerified || 'Pending',
              orderDelivered: (o as any).orderDelivered || 'Pending',
            }));
          setTrackedOrders(localFallback);
        } else {
          setTrackedOrders([]);
        }
      } catch {
        setTrackedOrders([]);
      }
    } finally {
      setIsSearchingStatus(false);
    }
  };

  // Calculations
  const totalItemsCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotalBirr = orderItems.reduce((acc, curr) => acc + curr.totalBirr, 0);
  const deliveryFeeBirr =
    orderItems.length > 0 && deliveryInfo.option === 'delivery'
      ? (deliveryInfo.deliveryFee || 100)
      : 0;
  const totalBirr = subtotalBirr + deliveryFeeBirr;

  const selectedBank = BANK_OPTIONS.find((b) => b.id === selectedBankId) || null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setSubmissionError(null);

    if (orderItems.length === 0) {
      setSubmissionError('Please select at least one item from the menu above to place an order.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (deliveryDate && deliveryDate < todayStr) {
      setSubmissionError('Event / Delivery Date cannot be prior to today. Please select today or a future date.');
      return;
    }

    if (!selectedBank) {
      setSubmissionError('Please select a payment bank by clicking one of the bank boxes below.');
      return;
    }

    if (!paymentSms.trim()) {
      setSubmissionError('Please attach or paste your payment SMS message confirmation.');
      return;
    }

    const ref = `PF-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentSms = paymentSms.trim();
    const capturedPhone = phone.trim();
    const capturedName = customerName.trim() || 'Valued Client';

    setOrderReference(ref);
    setSubmittedItems([...orderItems]);
    setSubmittedPaymentSms(currentSms);
    setSubmittedTotalBirr(totalBirr);
    setSubmittedSubtotalBirr(subtotalBirr);
    setSubmittedDeliveryFeeBirr(deliveryFeeBirr);
    setSubmittedDeliveryInfo({ ...deliveryInfo });

    // Clear active payment SMS input so the field is blank when returning or putting up a new request
    setPaymentSms('');
    setOrderSubmitted(true);
    if (onOrderSubmittedStateChange) {
      onOrderSubmittedStateChange(true);
    }
    // Remove active cart popup once success screen is displayed
    onClearOrder();

    // Ensure the viewport stays directly on the success screen without snapping back to top of menu
    setTimeout(() => {
      const el = document.getElementById('my-order');
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 70 : 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }, 60);

    const itemsSummary = orderItems
      .map((entry) => {
        const isBuffet = entry.item.category === 'buffet';
        const minG = isBuffet ? (entry.item.minGuests || 30) : 1;
        return isBuffet
          ? `${entry.quantity}x ${entry.item.name} (${minG} guests pkg)`
          : `${entry.quantity}x ${entry.item.name}`;
      })
      .join(', ');

    if (onConfirmOrderSubmit) {
      onConfirmOrderSubmit({
        items: orderItems,
        totalBirr,
        customerName: capturedName,
        phone: capturedPhone || 'Not provided',
        date: deliveryDate || new Date().toISOString().split('T')[0],
        remark,
        selectedBank,
        paymentSms: currentSms,
      });
    }

    // Save order record locally for real-time status tracking
    const newOrder: OrderRecord = {
      orderNo: ref,
      customerName: capturedName,
      phone: capturedPhone || 'Not provided',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: deliveryDate || 'TBD',
      deliveryOption: deliveryInfo.option,
      deliveryAddress: deliveryInfo.address,
      deliveryLocationUrl: deliveryInfo.mapsUrl,
      deliveryFee: deliveryFeeBirr,
      distanceKm: deliveryInfo.distanceKm,
      totalAmountBirr: totalBirr,
      itemsSummary,
      bank: selectedBank.shortName,
      status: 'Order Placed',
      step: 1,
      createdAt: Date.now(),
    };

    try {
      const historyStr = localStorage.getItem('perry_orders_history');
      const history: OrderRecord[] = historyStr ? JSON.parse(historyStr) : [];
      history.push(newOrder);
      localStorage.setItem('perry_orders_history', JSON.stringify(history));
    } catch {
      // ignore
    }

    // Clear saved draft form so the section is completely blank for any new requests
    try {
      localStorage.removeItem('perry_order_form_state');
    } catch {
      // ignore
    }

    // Format Google Maps delivery location / pin info
    const deliveryLocationStr =
      deliveryInfo.option === 'delivery'
        ? `${deliveryInfo.address || `${deliveryInfo.streetName || 'Arbegnoch St'}, ${deliveryInfo.cityName || 'Addis Ababa'}`}${
            deliveryInfo.lat && deliveryInfo.lng
              ? ` (${deliveryInfo.lat.toFixed(6)}, ${deliveryInfo.lng.toFixed(6)})`
              : ''
          }${deliveryInfo.mapsUrl ? ` [Map Pin: ${deliveryInfo.mapsUrl}]` : ''}`
        : 'Shop Pickup (Arbegnoch St, Addis Ababa)';

    // Automatically send order, location info, and Google Maps pin to Firestore and Google Sheet
    const orderPayload = {
      orderNo: ref,
      customerName: capturedName,
      phoneNumber: capturedPhone,
      deliveryLocation: deliveryLocationStr,
      deliveryOption: deliveryInfo.option,
      deliveryAddress: deliveryInfo.address,
      deliveryLocationUrl: deliveryInfo.mapsUrl,
      deliveryFee: deliveryFeeBirr,
      deliveryCoordinates:
        deliveryInfo.lat && deliveryInfo.lng
          ? { lat: deliveryInfo.lat, lng: deliveryInfo.lng }
          : undefined,
      orderDate: new Date().toISOString().split('T')[0],
      eventDeliveryDate: deliveryDate || 'TBD',
      totalAmountBirr: totalBirr,
      bankName: selectedBank.shortName,
      accountNumber: selectedBank.accountNumber,
      paymentSms: currentSms,
      remark: remark.trim(),
      itemsSummary,
      orderVerified: 'Pending',
      orderDelivered: 'Pending',
    };

    saveOrderToFirestore(orderPayload).catch((err) => {
      console.warn('Firestore direct write warning:', err);
    });
    appendOrderToGoogleSheet(orderPayload);
  };

  const handleResetForNewOrder = () => {
    setOrderSubmitted(false);
    if (onOrderSubmittedStateChange) {
      onOrderSubmittedStateChange(false);
    }
    onClearOrder();
    setCustomerName('');
    setPhone('');
    setDeliveryDate('');
    setDeliveryInfo({
      option: 'pickup',
      address: '',
      lat: undefined,
      lng: undefined,
      mapsUrl: undefined,
      distanceKm: 0,
      deliveryFee: 0,
      streetName: 'Arbegnoch St',
      cityName: 'Addis Ababa',
    });
    setRemark('');
    setSelectedBankId(null);
    setPaymentSms('');
    setSubmittedPaymentSms('');
    setOrderReference('');
    setHasAttemptedSubmit(false);
    setSubmissionError(null);
    setSubmittedItems([]);
    setSubmittedTotalBirr(0);
    setSubmittedSubtotalBirr(0);
    setSubmittedDeliveryFeeBirr(0);
    setSubmittedDeliveryInfo(null);
    setTrackedOrders([]);
    setStatusSearchQuery('');
    setLastSearchedQuery('');
    setHasSearchedStatus(false);
    setSearchStatusInputError(null);
    try {
      localStorage.removeItem('perry_order_form_state');
      localStorage.removeItem('perry_order_items');
    } catch {
      // ignore
    }
  };

  const isSmsEmpty = !paymentSms.trim();
  const showSmsError = hasAttemptedSubmit && isSmsEmpty;

  return (
    <div
      id="my-order"
      className="mt-16 sm:mt-20 scroll-mt-24 rounded-3xl bg-white dark:bg-[#1E1B18] border border-[#EDE5D9] dark:border-[#38332E] shadow-xl overflow-hidden transition-colors"
    >
      {/* Header bar */}
      <div className="p-4 sm:p-6 lg:p-8 bg-[#FFFCF8] dark:bg-[#25211D] border-b border-[#EDE5D9] dark:border-[#38332E] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F28A08]/15 dark:bg-[#F28A08]/25 flex items-center justify-center text-[#F28A08]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF]">
                My Order
              </h3>
              {totalItemsCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F28A08] text-white">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] mt-0.5">
              Review your catering selection, adjust portions, and place your order.
            </p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      {orderSubmitted ? (
        /* Order Submitted Confirmation Screen - Clean receipt without 'Google Sheet Order Details' banner */
        <div className="p-8 sm:p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#F28A08] font-['Lexend']">
            Order Received
          </span>
          <h4 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF] mt-1">
            Thank You for Your Order!
          </h4>
          <p className="text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] mt-2 font-['Poppins']">
            Order Reference: <strong className="text-[#24211E] dark:text-white font-bold font-['Lexend']">{orderReference}</strong>
          </p>

          {/* Clean Order Details Receipt Card */}
          <div className="mt-6 w-full p-5 sm:p-6 rounded-2xl bg-[#FFFCF8] dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] text-left shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">No:</span>
                <span className="font-bold text-[#24211E] dark:text-white font-['Lexend']">{orderReference}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Name:</span>
                <span className="font-medium text-[#24211E] dark:text-white font-['Poppins']">{customerName || 'Valued Client'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Date:</span>
                <span className="font-medium text-[#24211E] dark:text-white font-['Poppins']">{new Date().toISOString().split('T')[0]}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Event / Delivery Date:</span>
                <span className="font-medium text-[#24211E] dark:text-white font-['Poppins']">{deliveryDate || 'TBD'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Total Amount:</span>
                <span className="font-bold text-[#F28A08] text-sm font-['Lexend']">
                  {(submittedTotalBirr || totalBirr).toLocaleString()} Birr
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Bank:</span>
                <span className="font-medium text-[#24211E] dark:text-white font-['Poppins']">{selectedBank?.shortName}</span>
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-between py-1.5 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">
                  {selectedBank?.id === 'telebirr' ? 'Phone:' : 'Account:'}
                </span>
                <span className="font-semibold text-[#24211E] dark:text-white font-['Lexend']">{selectedBank?.accountNumber}</span>
              </div>

              {/* Delivery / Location displayed side by side */}
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50 gap-2">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend'] shrink-0">
                  Location:
                </span>
                <div className="font-medium text-[#24211E] dark:text-white font-['Poppins']">
                  {(submittedDeliveryInfo || deliveryInfo).option === 'delivery' ? (
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:justify-end">
                      <span className="font-bold font-['Lexend'] text-[#F28A08] inline-flex items-center gap-1">
                        🚚 Delivery
                      </span>
                      <span className="text-[#EDE5D9] dark:text-[#38332E] hidden sm:inline">•</span>
                      <span className="font-bold text-[#24211E] dark:text-white">
                        {(submittedDeliveryInfo || deliveryInfo).streetName || 'Arbegnoch St'}, {(submittedDeliveryInfo || deliveryInfo).cityName || 'Addis Ababa'}
                      </span>
                      <span className="text-[#EDE5D9] dark:text-[#38332E] hidden sm:inline">•</span>
                      <span className="font-semibold text-[#F28A08] font-['Lexend']">
                        Delivery Fee: {submittedDeliveryFeeBirr ?? deliveryFeeBirr} Birr
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:justify-end">
                      <span className="font-bold font-['Lexend'] text-emerald-600 dark:text-emerald-400">
                        🛍️ Shop Pickup
                      </span>
                      <span className="text-[#EDE5D9] dark:text-[#38332E] hidden sm:inline">•</span>
                      <span className="font-bold text-[#24211E] dark:text-white">
                        Perry Foods Kitchen &amp; Store
                      </span>
                      <span className="text-[#EDE5D9] dark:text-[#38332E] hidden sm:inline">•</span>
                      <span className="text-[11px] text-[#706A63] dark:text-[#A8A199]">
                        Arbegnoch St, Addis Ababa
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Registered Ordered Food in the same row */}
              <div className="col-span-1 sm:col-span-2 py-2 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend'] block mb-1.5">
                  Ordered Food (Registered to Sheet):
                </span>
                <div className="flex flex-wrap gap-1.5 font-['Poppins']">
                  {submittedItems.map((entry) => (
                    <span
                      key={entry.item.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-[#EDE5D9] dark:border-[#38332E] font-medium text-[11px] text-[#24211E] dark:text-white"
                    >
                      <strong className="text-[#F28A08] font-['Lexend']">{entry.quantity}x</strong> {entry.item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Status Details without checklists */}
              <div className="flex items-center justify-between py-2 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Order Verified:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Lexend'] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#EDE5D9]/50 dark:border-[#38332E]/50">
                <span className="text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">Order Delivered:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-['Lexend'] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Pending
                </span>
              </div>

              {/* SMS Details */}
              <div className="col-span-1 sm:col-span-2 pt-1.5">
                <span className="text-[#706A63] dark:text-[#A8A199] block mb-1 font-semibold font-['Lexend']">SMS Confirmation:</span>
                <p className="font-['Poppins'] text-[11px] p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[#24211E] dark:text-white break-words">
                  {submittedPaymentSms || paymentSms}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button variant="primary" size="md" onClick={handleResetForNewOrder} className="gap-2 font-['Lexend'] font-bold">
              <RefreshCw className="w-4 h-4" />
              <span>Place Another Order</span>
            </Button>
          </div>
        </div>
      ) : (
        /* Order Content Grid */
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Order Items List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#FFFCF8] dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] shadow-xs flex flex-col gap-3.5 sm:gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D9] dark:border-[#38332E]">
                <h4 className="font-['Lexend'] text-base sm:text-lg font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF]">
                  Selected Items ({totalItemsCount})
                </h4>
              </div>

              {orderItems.length === 0 ? (
                /* Clean Empty Order State */
                <div className="py-12 px-6 rounded-2xl bg-white dark:bg-[#1E1B18] border border-dashed border-[#EDE5D9] dark:border-[#38332E] text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#F28A08]/10 text-[#F28A08] flex items-center justify-center mb-3">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-['Lexend'] text-lg font-bold uppercase text-[#24211E] dark:text-[#F7F4EF]">
                    Your Order is Currently Empty
                  </h4>
                  <p className="text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] max-w-md mt-1">
                    Choose items from our menu above and click &quot;Place Order&quot; to add them to your order tray.
                  </p>
                </div>
              ) : (
                /* Active Ordered Items List */
                <div className="flex flex-col gap-3">
                  {orderItems.map(({ item, quantity, totalBirr: itemTotal }) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#EDE5D9] dark:border-[#38332E] flex items-center gap-3 sm:gap-4 shadow-xs hover:border-[#F28A08]/40 transition-colors"
                    >
                      {/* Item Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#EDE5D9]/40 dark:bg-[#342F2A]">
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-['Lexend'] text-sm sm:text-base font-bold uppercase truncate text-[#24211E] dark:text-[#F7F4EF]">
                            {item.name}
                          </h4>
                          <span className="text-sm sm:text-base font-extrabold text-[#F28A08] shrink-0 tabular-nums">
                            {itemTotal.toLocaleString()} Birr
                          </span>
                        </div>
                        <p className="text-[11px] text-[#706A63] dark:text-[#A8A199] truncate mt-0.5">
                          {item.categoryLabel}{' '}
                          {item.minGuests
                            ? `· ${item.priceBirr} Birr/guest × ${item.minGuests} min guests`
                            : item.unit
                            ? `· ${item.priceBirr} Birr per ${item.unit}`
                            : ''}
                        </p>

                        {/* Interactive Quantity Stepper */}
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-[#FFFCF8] dark:bg-[#25211D] p-1 rounded-xl border border-[#EDE5D9] dark:border-[#38332E]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-lg bg-white dark:bg-[#1E1B18] text-[#24211E] dark:text-white hover:bg-[#F28A08] hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#24211E] dark:text-white tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-lg bg-white dark:bg-[#1E1B18] text-[#24211E] dark:text-white hover:bg-[#F28A08] hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove item button */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 text-[#706A63] hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Check Order Status Box (Replacing Remark Box as requested) */}
            <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-[#FFFCF8] dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] shadow-xs flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F28A08]/15 text-[#F28A08] flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-['Lexend'] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#24211E] dark:text-[#F7F4EF]">
                      Check Order Status
                    </h4>
                    <p className="text-[11px] text-[#706A63] dark:text-[#A8A199]">
                      Track order by Order ID, phone number, or name
                    </p>
                  </div>
                </div>
              </div>

              {/* Small input box to check order */}
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#706A63] dark:text-[#A8A199]" />
                    <input
                      type="text"
                      value={statusSearchQuery}
                      onChange={(e) => {
                        setStatusSearchQuery(e.target.value);
                        if (searchStatusInputError) setSearchStatusInputError(null);
                        if (!e.target.value.trim()) {
                          setHasSearchedStatus(false);
                          setTrackedOrders([]);
                          setLastSearchedQuery('');
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchOrderStatus();
                        }
                      }}
                      placeholder="Order ID (e.g. PF-...), phone, or name..."
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#1E1B18] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white placeholder-[#706A63]/60 focus:outline-none focus:border-[#F28A08] transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSearchOrderStatus()}
                    className="px-4 py-2 rounded-xl text-xs font-bold font-['Lexend'] bg-[#F28A08] text-white hover:bg-[#DB7A04] transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    Track
                  </button>
                </div>
                {searchStatusInputError && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium font-['Poppins'] px-1">
                    {searchStatusInputError}
                  </p>
                )}
              </div>

              {/* Display order status in the remaining space under on the box */}
              <div className="pt-2 border-t border-[#EDE5D9]/60 dark:border-[#38332E]/60 min-h-[90px] flex flex-col justify-center">
                {isSearchingStatus ? (
                  <div className="flex items-center justify-center py-6 gap-2 text-[#F28A08]">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-semibold font-['Lexend'] text-[#706A63] dark:text-[#A8A199]">
                      Checking order table...
                    </span>
                  </div>
                ) : trackedOrders.length > 0 ? (
                  <div className="flex flex-col gap-3.5">
                    {trackedOrders.length > 1 && (
                      <div className="flex items-center justify-between px-1">
                        <span className="font-['Lexend'] text-xs font-bold uppercase tracking-wider text-[#24211E] dark:text-white">
                          Total Orders Found: <strong className="text-[#F28A08]">{trackedOrders.length}</strong>
                        </span>
                        <span className="text-[11px] text-[#706A63] dark:text-[#A8A199] font-['Poppins']">
                          Matching &quot;{lastSearchedQuery}&quot;
                        </span>
                      </div>
                    )}

                    {trackedOrders.map((order, orderIdx) => {
                      const verifiedRaw = (order.orderVerified || '').trim();
                      const deliveredRaw = (order.orderDelivered || '').trim();

                      // Strict case-insensitive check for pending, empty, or N/A
                      const isPending = (val: string) => {
                        const s = (val || '').trim().toLowerCase();
                        return !s || s === 'pending' || s === 'n/a';
                      };

                      // STRICT USER REQUIREMENTS:
                      // Confirmed & Preparing Steps:
                      // Strictly check the Google Sheet Order Verified column:
                      // If Order Verified is "Pending" (case-insensitive, empty, or "N/A"), the radio buttons remain unmarked empty circles (aria-checked="false" without an inner dot) and the status label reads Pending.
                      // When Order Verified contains any non-pending value (e.g. "Verified", "Confirmed", "In Kitchen", "Cooking"), the status updates immediately and the radio buttons are marked.
                      const isVerifiedDone = !isPending(verifiedRaw);
                      const isConfirmedDone = isVerifiedDone;
                      const isPreparingDone = isVerifiedDone;

                      // Delivered Step:
                      // Strictly checks the Google Sheet Order Delivered column:
                      // If Order Delivered is "Pending", the radio button remains an unmarked empty circle and the status label reads Pending without any active styling.
                      // When Order Delivered contains a non-pending value (e.g. "Delivered", "Done"), the radio button is marked, the status label changes, and the entire step is highlighted in bold emerald green with an active ring indicator.
                      const isDeliveredDone = !isPending(deliveredRaw);

                      const steps = [
                        {
                          num: '01',
                          name: 'Placed',
                          isDone: true,
                          statusLabel: 'Registered',
                        },
                        {
                          num: '02',
                          name: 'Confirmed',
                          isDone: isConfirmedDone,
                          statusLabel: isConfirmedDone ? 'Verified' : 'Pending',
                        },
                        {
                          num: '03',
                          name: 'Preparing',
                          isDone: isPreparingDone,
                          statusLabel: isPreparingDone ? 'Done' : 'Pending',
                        },
                        {
                          num: '04',
                          name: 'Delivered',
                          isDone: isDeliveredDone,
                          statusLabel: isDeliveredDone ? 'Delivered' : 'Pending',
                        },
                      ];

                      return (
                        <div
                          key={`${order.orderNo}-${orderIdx}`}
                          className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#1E1B18] border border-[#F28A08]/30 flex flex-col gap-3 animate-in fade-in duration-200 shadow-xs"
                        >
                          {/* Header: Prominent Order Number Display */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#EDE5D9]/60 dark:border-[#38332E]/60">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#706A63] dark:text-[#A8A199] font-['Lexend']">
                                Order Number:
                              </span>
                              <span className="font-['Lexend'] font-extrabold text-sm sm:text-base text-[#24211E] dark:text-white px-2.5 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-[#EDE5D9] dark:border-[#38332E]">
                                {order.orderNo}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-medium text-[#706A63] dark:text-[#A8A199] font-['Poppins']">
                                Client: <strong className="text-[#24211E] dark:text-white font-['Lexend']">{order.customerName}</strong>
                              </span>
                            </div>
                          </div>

                          {/* Formal Radio Button Stepper */}
                          <div className="py-2.5 px-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-[#EDE5D9]/60 dark:border-[#38332E]/60">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {steps.map((step) => {
                                return (
                                  <div
                                    key={step.name}
                                    className="flex items-start gap-2.5 p-2 rounded-xl transition-all bg-transparent border border-transparent"
                                  >
                                    {/* Formal Radio Button */}
                                    <div
                                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                        step.isDone
                                          ? 'border-[#F28A08] bg-transparent'
                                          : 'border-[#C8BFB3] dark:border-[#524B43] bg-transparent'
                                      }`}
                                      role="radio"
                                      aria-checked={step.isDone}
                                    >
                                      {step.isDone && (
                                        <div className="w-2 h-2 rounded-full bg-[#F28A08]" />
                                      )}
                                    </div>

                                    {/* Step Info */}
                                    <div className="flex flex-col min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold font-['Lexend'] text-[#706A63] dark:text-[#A8A199]">
                                          {step.num}
                                        </span>
                                        <span
                                          className={`text-xs font-['Lexend'] ${
                                            step.isDone
                                              ? 'text-[#24211E] dark:text-[#F7F4EF] font-bold'
                                              : 'text-[#706A63] dark:text-[#A8A199] font-bold'
                                          }`}
                                        >
                                          {step.name}
                                        </span>
                                      </div>
                                      <span
                                        className={`text-[10px] font-['Poppins'] ${
                                          step.isDone
                                            ? 'text-[#F28A08] font-semibold'
                                            : 'text-[#706A63]/70 dark:text-[#A8A199]/70 font-semibold'
                                        }`}
                                      >
                                        {step.statusLabel}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Items Ordered Listed Top and Bottom */}
                          {(() => {
                            const rawItems = order.itemsSummary || '';
                            const itemsList = rawItems
                              .split(/,\s*|\n+/)
                              .map((s) => s.trim())
                              .filter(Boolean);

                            return (
                              <div className="pt-2.5 border-t border-[#EDE5D9]/60 dark:border-[#38332E]/60 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] font-['Lexend']">
                                    Items Ordered ({itemsList.length || 1}):
                                  </span>
                                  <span className="text-xs font-medium text-[#706A63] dark:text-[#A8A199] font-['Poppins']">
                                    Total:{' '}
                                    <strong className="text-[#F28A08] font-bold font-['Lexend'] text-sm ml-1">
                                      {order.totalAmount}
                                    </strong>
                                  </span>
                                </div>

                                <div className="flex flex-col gap-1.5 pl-0.5">
                                  {itemsList.length > 0 ? (
                                    itemsList.map((itemStr, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-2 text-xs text-[#24211E] dark:text-[#EDE5D9] font-['Poppins'] leading-snug"
                                      >
                                        <span className="text-[#F28A08] font-bold select-none">•</span>
                                        <span className="font-medium">{itemStr}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <span className="text-xs text-[#706A63] dark:text-[#A8A199] italic font-['Poppins']">
                                      {rawItems || 'Standard order items'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                ) : hasSearchedStatus && lastSearchedQuery.length > 0 ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center font-['Poppins']">
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      No order found matching &quot;{lastSearchedQuery}&quot;. Please verify the Order ID (e.g. PF-...), phone number, or customer name.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-3 px-3 text-xs text-[#706A63] dark:text-[#A8A199] font-['Poppins']">
                    <span>Enter your Order ID (e.g. PF-XXXXXX), phone number, or customer name and click Track to check status live from our table.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Details, Total Order, Bank Boxes & SMS message attachment */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#FFFCF8] dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] shadow-xs flex flex-col gap-3.5 sm:gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE5D9] dark:border-[#38332E]">
                <h4 className="font-['Lexend'] text-base sm:text-lg font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF]">
                  Order Details
                </h4>
              </div>

              {/* Delivery / Contact Form */}
              <form onSubmit={handleSubmitOrder} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#706A63] dark:text-[#A8A199]" />
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      required
                      autoComplete="off"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Dawit Haile"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-transparent border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white focus:outline-none focus:border-[#F28A08] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#706A63] dark:text-[#A8A199]" />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+251 91 123 4567"
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-transparent border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white focus:outline-none focus:border-[#F28A08] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1">
                      Event / Delivery Date
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      name="deliveryDate"
                      autoComplete="off"
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      onChange={(e) => {
                        const today = new Date().toISOString().split('T')[0];
                        if (e.target.value && e.target.value < today) {
                          setDeliveryDate(today);
                        } else {
                          setDeliveryDate(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-transparent border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white focus:outline-none focus:border-[#F28A08] cursor-pointer transition-colors"
                    />
                  </div>
                </div>

                {/* Delivery Option & Google Maps Integrated Location Picker */}
                <DeliveryLocationPicker
                  value={deliveryInfo}
                  onChange={setDeliveryInfo}
                  orderItems={orderItems}
                />

                {/* Price Breakdown Card */}
                <div className="mt-2.5 pt-3 border-t border-[#EDE5D9] dark:border-[#38332E] flex flex-col gap-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-[#706A63] dark:text-[#A8A199]">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-[#24211E] dark:text-white tabular-nums">
                      {subtotalBirr.toLocaleString()} Birr
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#706A63] dark:text-[#A8A199]">
                    <span>Catering Setup &amp; Trays:</span>
                    <span className="font-semibold text-[#F28A08]">
                      Provided
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#706A63] dark:text-[#A8A199]">
                    <span className="text-[#706A63] dark:text-[#A8A199]">Delivery Charge:</span>
                    <span className="font-bold tabular-nums font-['Lexend'] text-[#F28A08]">
                      {deliveryInfo.option === 'delivery' && orderItems.length > 0
                        ? `+${deliveryFeeBirr.toLocaleString()} Birr`
                        : '0 Birr'}
                    </span>
                  </div>

                  {/* Total Order */}
                  <div className="pt-2 border-t border-[#EDE5D9] dark:border-[#38332E] flex justify-between items-baseline font-bold">
                    <span className="text-xs sm:text-sm font-['Lexend'] uppercase text-[#24211E] dark:text-[#F7F4EF]">
                      Total Order:
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-[#F28A08] tabular-nums">
                        {totalBirr.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-[#F28A08]">Birr</span>
                    </div>
                  </div>
                </div>

                {/* Under the Total Order: Bank Boxes & SMS message attachment */}
                <div className="mt-2 pt-3 border-t border-[#EDE5D9] dark:border-[#38332E] flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#24211E] dark:text-[#F7F4EF]">
                    Select Payment Bank
                  </span>

                  {/* 4 Bank Boxes: Placeholder is the exact same aspect-ratio and size as the square logo image, with identical hover effects */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {BANK_OPTIONS.map((bank) => {
                      const isSelected = selectedBankId === bank.id;
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {
                            setSelectedBankId(bank.id);
                            if (submissionError) setSubmissionError(null);
                          }}
                          aria-label={bank.name}
                          className={`group flex items-center justify-center aspect-square w-full p-2 rounded-2xl border transition-all duration-300 cursor-pointer relative bg-white dark:bg-[#25211D] overflow-hidden ${
                            isSelected
                              ? 'border-[#F28A08] shadow-md ring-2 ring-[#F28A08] bg-[#F28A08]/5 dark:bg-[#F28A08]/15'
                              : 'border-[#EDE5D9] dark:border-[#38332E] hover:border-[#F28A08] hover:shadow-lg hover:shadow-[#F28A08]/15 hover:-translate-y-0.5'
                          }`}
                        >
                          {/* Centered logo holder filling the placeholder box edge-to-edge */}
                          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-white">
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-out group-hover:scale-108"
                            />
                          </div>
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#F28A08] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* When one is selected: cleanly display account number without holder card and without copy button */}
                  {selectedBank && (
                    <div className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#1A1816] border border-[#F28A08]/40 flex flex-col gap-2.5 animate-in fade-in duration-200">
                      {/* Display account directly in standard typography */}
                      <div className="p-2.5 sm:p-3 rounded-lg bg-[#FFFCF8] dark:bg-[#24211D] border border-[#EDE5D9] dark:border-[#38332E] flex flex-wrap items-center justify-between gap-2 shadow-2xs">
                        <span className="text-[#706A63] dark:text-[#A8A199] text-xs font-semibold">
                          {selectedBank.id === 'telebirr'
                            ? `${selectedBank.shortName} Phone:`
                            : `${selectedBank.shortName} Account:`}
                        </span>
                        <strong className="text-sm sm:text-base font-bold text-[#24211E] dark:text-white select-all">
                          {selectedBank.accountNumber}
                        </strong>
                      </div>

                      {/* Option to attach payment SMS message with red alert styling if empty on submit */}
                      <div>
                        <label
                          htmlFor="payment-sms"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#24211E] dark:text-[#F7F4EF] mb-1"
                        >
                          Attach Payment SMS Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MessageSquare
                            className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${
                              showSmsError ? 'text-red-500' : 'text-[#706A63] dark:text-[#A8A199]'
                            }`}
                          />
                          <textarea
                            id="payment-sms"
                            name="payment-sms"
                            required
                            rows={2}
                            autoComplete="off"
                            value={paymentSms}
                            onChange={(e) => {
                              setPaymentSms(e.target.value);
                              if (submissionError) setSubmissionError(null);
                            }}
                            placeholder="Paste your bank or Telebirr confirmation SMS here (e.g. Transaction code, sender name, transferred ETB...)"
                            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-transparent border text-[#24211E] dark:text-white placeholder-[#706A63]/60 focus:outline-none transition-all ${
                              showSmsError
                                ? 'border-red-500 ring-2 ring-red-500/20 bg-red-500/5 focus:border-red-500'
                                : 'border-[#EDE5D9] dark:border-[#38332E] focus:border-[#F28A08]'
                            }`}
                          />
                        </div>
                        {showSmsError && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">
                            * Payment SMS message is required. Please paste your transfer confirmation SMS.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Validation error display if any */}
                {submissionError && (
                  <p className="text-xs text-red-500 font-medium bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                    {submissionError}
                  </p>
                )}

                {/* Submit Action */}
                <div className="mt-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={orderItems.length === 0}
                    className="w-full justify-center"
                  >
                    <span>Place Order</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
