/// <reference types="@types/google.maps" />

// Source: Google Maps Platform Code Assist
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapMouseEvent,
  useMapsLibrary,
  useMap,
  ColorScheme,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  Map as MapIcon,
  Store,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface DeliveryLocationData {
  option: 'pickup' | 'delivery';
  address: string;
  lat?: number;
  lng?: number;
  mapsUrl?: string;
  distanceKm?: number;
  deliveryFee: number;
  streetName?: string;
  cityName?: string;
}

interface DeliveryLocationPickerProps {
  value: DeliveryLocationData;
  onChange: (data: DeliveryLocationData) => void;
  orderItems?: Array<{ item: { category: string }; quantity: number }>;
}

// Perry Foods Kitchen / Store starting origin
export const STORE_ORIGIN = {
  lat: 9.04885,
  lng: 38.7377,
  name: 'Perry Foods Kitchen & Store',
  street: 'Arbegnoch St',
  city: 'Addis Ababa',
};

/**
 * Computes direct distance between two coordinate pairs in kilometers using the Haversine formula
 */
export const calculateDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

/**
 * Calculates delivery rate per kilometer based on product category & order quantity quotas:
 * - lunchbox: 1-2 = 100, 3-4 = 200, >= 5 = 300 Birr/km
 * - Buffet Package: 1-2 = 300, >= 3 = 400 Birr/km
 * - Agelgel: 1-2 = 200, 3-4 = 300, >= 5 = 400 Birr/km
 * - Cakes and pastries: 1-2 = 100, 3-4 = 200, >= 5 = 300 Birr/km
 * - Cookies and muffins: 1-3 = 100, 4 = 200, >= 5 = 300 Birr/km
 * - Traditional bread: 1-3 = 100, 4 = 200, >= 5 = 300 Birr/km
 */
export const calculateDeliveryRatePerKm = (
  orderItems?: Array<{ item: { category: string }; quantity: number }>
): number => {
  if (!orderItems || orderItems.length === 0) return 100;

  let maxRate = 100;

  // 1. Buffet Package
  const buffetCount = orderItems
    .filter((e) => e.item.category === 'buffet')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (buffetCount > 0) {
    if (buffetCount <= 2) maxRate = Math.max(maxRate, 300);
    else maxRate = Math.max(maxRate, 400);
  }

  // 2. Agelgel
  const agelgelCount = orderItems
    .filter((e) => e.item.category === 'agelgel')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (agelgelCount > 0) {
    if (agelgelCount <= 2) maxRate = Math.max(maxRate, 200);
    else if (agelgelCount <= 4) maxRate = Math.max(maxRate, 300);
    else maxRate = Math.max(maxRate, 400);
  }

  // 3. Lunchbox
  const lunchboxCount = orderItems
    .filter((e) => e.item.category === 'lunch-box')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (lunchboxCount > 0) {
    if (lunchboxCount <= 2) maxRate = Math.max(maxRate, 100);
    else if (lunchboxCount <= 4) maxRate = Math.max(maxRate, 200);
    else maxRate = Math.max(maxRate, 300);
  }

  // 4. Cakes and pastries
  const cakesCount = orderItems
    .filter((e) => e.item.category === 'cakes-pastries')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (cakesCount > 0) {
    if (cakesCount <= 2) maxRate = Math.max(maxRate, 100);
    else if (cakesCount <= 4) maxRate = Math.max(maxRate, 200);
    else maxRate = Math.max(maxRate, 300);
  }

  // 5. Cookies and muffins
  const cookiesCount = orderItems
    .filter((e) => e.item.category === 'cookies-muffins')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (cookiesCount > 0) {
    if (cookiesCount <= 3) maxRate = Math.max(maxRate, 100);
    else if (cookiesCount <= 4) maxRate = Math.max(maxRate, 200);
    else maxRate = Math.max(maxRate, 300);
  }

  // 6. Traditional bread
  const breadCount = orderItems
    .filter((e) => e.item.category === 'traditional-bread')
    .reduce((acc, curr) => acc + curr.quantity, 0);
  if (breadCount > 0) {
    if (breadCount <= 3) maxRate = Math.max(maxRate, 100);
    else if (breadCount <= 4) maxRate = Math.max(maxRate, 200);
    else maxRate = Math.max(maxRate, 300);
  }

  return maxRate;
};

export const calculateDeliveryFee = (
  distanceKm?: number | null,
  orderItems?: Array<{ item: { category: string }; quantity: number }>
): number => {
  const ratePerKm = calculateDeliveryRatePerKm(orderItems);
  const effectiveKm = Math.max(1, Math.ceil(distanceKm || 0));
  return ratePerKm * effectiveKm;
};

// Google Maps custom dark theme styles to match app's charcoal/warm palette
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1d1916' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#171513' }, { weight: 2 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#d6c8b8' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f28a08' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#a89d91' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#22291d' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2f2924' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#231e1a' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#574636' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2e231a' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#29241f' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#151e28' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5c6d85' }],
  },
];

const LIGHT_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#fbf8f3' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#524b43' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }, { weight: 2 }] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ebdcd0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f7dfca' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#d8e7f5' }],
  },
];

/**
 * Inner Map Handler component for geocoding, markers, and camera control
 */
const MapController: React.FC<{
  position: { lat: number; lng: number } | null;
  onPositionSelect: (pos: { lat: number; lng: number }, street?: string, city?: string) => void;
  isDark: boolean;
}> = ({ position, onPositionSelect, isDark }) => {
  const map = useMap();
  const geocodingLib = useMapsLibrary('geocoding');
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (geocodingLib) {
      setGeocoder(new geocodingLib.Geocoder());
    }
  }, [geocodingLib]);

  // Center camera when position changes
  useEffect(() => {
    if (map && position) {
      map.panTo(position);
    }
  }, [map, position]);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (!e.detail.latLng) return;
      const { lat, lng } = e.detail.latLng;
      const newPos = { lat, lng };

      if (geocoder) {
        geocoder.geocode(
          { location: newPos },
          (results: any, status: string) => {
            if (status === 'OVER_QUERY_LIMIT') {
              window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
              onPositionSelect(newPos);
            } else if (status === 'OK' && Array.isArray(results) && results[0]) {
              const res = results[0];
              // Extract street/route and city
              let street = '';
              let city = 'Addis Ababa';

              if (Array.isArray(res.address_components)) {
                for (const comp of res.address_components) {
                  if (comp.types.includes('route')) {
                    street = comp.long_name;
                  } else if (!street && comp.types.includes('sublocality_level_1')) {
                    street = comp.long_name;
                  } else if (!street && comp.types.includes('neighborhood')) {
                    street = comp.long_name;
                  }

                  if (comp.types.includes('locality')) {
                    city = comp.long_name;
                  } else if (city === 'Addis Ababa' && comp.types.includes('administrative_area_level_2')) {
                    city = comp.long_name;
                  }
                }
              }

              // Fallback if specific route wasn't tagged
              if (!street && res.formatted_address) {
                const parts = res.formatted_address.split(',');
                street = parts[0]?.trim() || 'Arbegnoch St';
              }

              onPositionSelect(newPos, street || 'Arbegnoch St', city || 'Addis Ababa');
            } else {
              onPositionSelect(newPos);
            }
          }
        );
      } else {
        onPositionSelect(newPos);
      }
    },
    [geocoder, onPositionSelect]
  );

  return (
    <>
      <Map
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        defaultCenter={position || STORE_ORIGIN}
        defaultZoom={14}
        reuseMaps={true}
        gestureHandling="greedy"
        disableDefaultUI={false}
        colorScheme={isDark ? ColorScheme.DARK : ColorScheme.LIGHT}
        styles={isDark ? DARK_MAP_STYLES : LIGHT_MAP_STYLES}
        onClick={handleMapClick}
        className="w-full h-full rounded-2xl overflow-hidden"
      >
        {/* Pinned Delivery Location Marker - Shop location is NOT pinned */}
        {position && (
          <AdvancedMarker
            position={position}
            title="Your Pinned Delivery Location"
          >
            <div className="flex flex-col items-center">
              <span className="px-2.5 py-1 mb-1 rounded-md bg-[#F28A08] text-white text-[11px] font-extrabold font-['Lexend'] shadow-lg border border-white/30 whitespace-nowrap">
                Pinned Destination
              </span>
              <Pin
                background="#F28A08"
                glyphColor="#FFFFFF"
                borderColor="#24211E"
                scale={1.25}
              />
            </div>
          </AdvancedMarker>
        )}
      </Map>
    </>
  );
};

export const DeliveryLocationPicker: React.FC<DeliveryLocationPickerProps> = ({
  value,
  onChange,
  orderItems,
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isLocating, setIsLocating] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // Initial distance calculation if lat/lng are set
  const currentCoords = useMemo(() => {
    if (value.lat && value.lng) {
      return { lat: value.lat, lng: value.lng };
    }
    // Default to starting coordinates for camera centering
    return STORE_ORIGIN;
  }, [value.lat, value.lng]);

  // Recalculate delivery fee if order items change while delivery is selected
  useEffect(() => {
    if (value.option === 'delivery') {
      const dist = value.distanceKm ?? 0;
      const expectedFee = calculateDeliveryFee(dist, orderItems);
      if (expectedFee !== value.deliveryFee) {
        onChange({
          ...value,
          deliveryFee: expectedFee,
        });
      }
    }
  }, [orderItems, value.option, value.distanceKm, value.deliveryFee, onChange]);

  const handleOptionChange = (option: 'pickup' | 'delivery') => {
    if (option === 'pickup') {
      onChange({
        ...value,
        option: 'pickup',
        lat: undefined,
        lng: undefined,
        mapsUrl: undefined,
        distanceKm: 0,
        deliveryFee: 0,
        streetName: STORE_ORIGIN.street,
        cityName: STORE_ORIGIN.city,
        address: `${STORE_ORIGIN.street}, ${STORE_ORIGIN.city}`,
      });
    } else {
      // Default to delivery with base rate
      const targetLat = value.lat ?? STORE_ORIGIN.lat;
      const targetLng = value.lng ?? STORE_ORIGIN.lng;
      const dist = calculateDistanceKm(
        STORE_ORIGIN.lat,
        STORE_ORIGIN.lng,
        targetLat,
        targetLng
      );
      const fee = calculateDeliveryFee(dist, orderItems);
      const mapsUrl = `https://www.google.com/maps?q=${targetLat.toFixed(6)},${targetLng.toFixed(6)}`;

      onChange({
        ...value,
        option: 'delivery',
        lat: targetLat,
        lng: targetLng,
        distanceKm: dist,
        deliveryFee: fee,
        mapsUrl,
        streetName: value.streetName || STORE_ORIGIN.street,
        cityName: value.cityName || STORE_ORIGIN.city,
        address:
          value.address ||
          `${value.streetName || STORE_ORIGIN.street}, ${value.cityName || STORE_ORIGIN.city}`,
      });
    }
  };

  const handlePositionSelect = (
    pos: { lat: number; lng: number },
    street?: string,
    city?: string
  ) => {
    const dist = calculateDistanceKm(
      STORE_ORIGIN.lat,
      STORE_ORIGIN.lng,
      pos.lat,
      pos.lng
    );
    const fee = calculateDeliveryFee(dist, orderItems);
    const mapsUrl = `https://www.google.com/maps?q=${pos.lat.toFixed(6)},${pos.lng.toFixed(6)}`;

    const resolvedStreet = street || value.streetName || 'Arbegnoch St';
    const resolvedCity = city || value.cityName || 'Addis Ababa';
    const formattedAddress = `${resolvedStreet}, ${resolvedCity}`;

    onChange({
      ...value,
      lat: pos.lat,
      lng: pos.lng,
      distanceKm: dist,
      deliveryFee: fee,
      mapsUrl,
      streetName: resolvedStreet,
      cityName: resolvedCity,
      address: formattedAddress,
    });
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        handlePositionSelect(userPos);
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const displayStreet = value.streetName || 'Arbegnoch St';
  const displayCity = value.cityName || 'Addis Ababa';

  const content = (
    <div className="flex flex-col gap-2.5 p-3 rounded-2xl bg-[#FFFCF8] dark:bg-[#1E1B18] border border-[#EDE5D9] dark:border-[#38332E] transition-colors shadow-xs">
      {/* Sleek, compact segmented toggle with smaller size */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] font-['Lexend']">
            Location
          </label>
        </div>

        <div className="p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-[#EDE5D9] dark:border-[#38332E] grid grid-cols-2 gap-1">
          {/* Shop Pickup Tab (Default) */}
          <button
            type="button"
            onClick={() => handleOptionChange('pickup')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold font-['Lexend'] transition-all cursor-pointer ${
              value.option === 'pickup'
                ? 'bg-[#F28A08] text-white shadow-xs'
                : 'text-[#706A63] dark:text-[#A8A199] hover:text-[#24211E] dark:hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5 shrink-0" />
            <span>Shop Pickup</span>
          </button>

          {/* Delivery Tab */}
          <button
            type="button"
            onClick={() => handleOptionChange('delivery')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold font-['Lexend'] transition-all cursor-pointer ${
              value.option === 'delivery'
                ? 'bg-[#F28A08] text-white shadow-xs'
                : 'text-[#706A63] dark:text-[#A8A199] hover:text-[#24211E] dark:hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>Delivery</span>
          </button>
        </div>
      </div>

      {/* Shop Pickup Details: Clean one line without coordinates, without badge, without paragraph */}
      {value.option === 'pickup' && (
        <div className="p-2.5 rounded-xl bg-white dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] text-xs flex items-center gap-2 transition-colors">
          <Store className="w-3.5 h-3.5 text-[#F28A08] shrink-0" />
          <span className="font-semibold text-[#24211E] dark:text-white font-['Lexend']">
            Shop Pickup:
          </span>
          <span className="text-[#706A63] dark:text-[#A8A199] font-['Poppins']">
            Arbegnoch St, Addis Ababa
          </span>
        </div>
      )}

      {/* Delivery: Compact Map with Show/Hide toggle and GPS Locate Me */}
      {value.option === 'delivery' && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
          {/* Map Controls: Pin indicator, Locate Me, and Show/Hide Map */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#24211E] dark:text-white font-['Lexend']">
              <MapIcon className="w-3.5 h-3.5 text-[#F28A08]" />
              <span>Pin Delivery Location</span>
              {value.lat && value.lng && (
                <span className="text-[10px] font-bold text-[#F28A08] dark:text-[#F28A08] flex items-center gap-0.5 ml-1 font-['Poppins']">
                  <CheckCircle2 className="w-3 h-3 text-[#F28A08]" /> Pinned ({displayStreet})
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleLocateMe}
                disabled={isLocating}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] hover:border-[#F28A08] text-[#24211E] dark:text-white transition-all cursor-pointer shadow-2xs font-['Lexend']"
                title="Use device GPS location"
              >
                <Navigation className={`w-3 h-3 text-[#F28A08] ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#25211D] border border-[#EDE5D9] dark:border-[#38332E] hover:border-[#F28A08] text-[#F28A08] transition-all cursor-pointer shadow-2xs font-['Lexend']"
              >
                <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Google Map - Smaller compact box with stable rendering */}
          {showMap && (
            <div className="relative h-44 sm:h-48 min-h-[176px] sm:min-h-[192px] w-full rounded-xl overflow-hidden border border-[#EDE5D9] dark:border-[#38332E] shadow-sm">
              {apiKey ? (
                <MapController
                  position={currentCoords}
                  onPositionSelect={handlePositionSelect}
                  isDark={isDark}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#EDE5D9]/20 dark:bg-[#1E1B18] text-center">
                  <MapPin className="w-6 h-6 text-[#F28A08] mb-1" />
                  <span className="text-xs font-semibold text-[#24211E] dark:text-white">
                    Google Maps Active
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return apiKey ? <APIProvider apiKey={apiKey}>{content}</APIProvider> : content;
};
