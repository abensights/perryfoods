/// <reference types="@types/google.maps" />

// Source: Google Maps Platform Code Assist
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

// Central Addis Ababa default camera reference for delivery pinning
export const ADDIS_ABABA_CITY_CENTER = {
  lat: 9.025,
  lng: 38.755,
  name: 'Addis Ababa',
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
 * - Cookies: 1-3 = 100, 4 = 200, >= 5 = 300 Birr/km
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

  // 5. Cookies
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
        defaultCenter={position || ADDIS_ABABA_CITY_CENTER}
        defaultZoom={13}
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

export const reverseGeocodeNominatim = async (
  lat: number,
  lng: number
): Promise<{ street: string; city: string }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const street =
        addr.road ||
        addr.suburb ||
        addr.neighbourhood ||
        addr.quarter ||
        addr.commercial ||
        'Addis Ababa Location';
      const city = addr.city || addr.town || addr.municipality || 'Addis Ababa';
      return { street, city };
    }
  } catch (err) {
    console.warn('Reverse geocoding error:', err);
  }
  return { street: 'Pinned Location', city: 'Addis Ababa' };
};

const createKitchenIcon = () => {
  return L.divIcon({
    className: 'custom-kitchen-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);pointer-events:none;">
        <span style="background:#24211E;color:#FFFFFF;border:1px solid #F28A08;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:700;font-family:Lexend,sans-serif;white-space:nowrap;margin-bottom:2px;box-shadow:0 2px 6px rgba(0,0,0,0.35);">Perry Kitchen</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#24211E" stroke="#F28A08" stroke-width="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5" fill="#F28A08"/>
        </svg>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createDestinationIcon = () => {
  return L.divIcon({
    className: 'custom-destination-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);cursor:grab;">
        <span style="background:#F28A08;color:#FFFFFF;border:1px solid #FFFFFF;padding:2px 6px;border-radius:6px;font-size:10px;font-weight:700;font-family:Lexend,sans-serif;white-space:nowrap;margin-bottom:2px;box-shadow:0 2px 6px rgba(242,138,8,0.4);">Pinned Destination</span>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#F28A08" stroke="#FFFFFF" stroke-width="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="#FFFFFF"/>
        </svg>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const LeafletMap: React.FC<{
  position: { lat: number; lng: number } | null;
  onPositionSelect: (pos: { lat: number; lng: number }, street?: string, city?: string) => void;
  isDark: boolean;
}> = ({ position, onPositionSelect, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initialCenter = position || STORE_ORIGIN;
    const map = L.map(containerRef.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
    });

    // Use 100% free OpenStreetMap standard tiles with zero API keys required
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([STORE_ORIGIN.lat, STORE_ORIGIN.lng], {
      icon: createKitchenIcon(),
      interactive: true,
    }).addTo(map);

    map.on('click', async (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const { street, city } = await reverseGeocodeNominatim(lat, lng);
      onPositionSelect({ lat, lng }, street, city);
    });

    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Ensure map tiles and dimensions are updated
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    if (position) {
      map.panTo([position.lat, position.lng]);

      if (destMarkerRef.current) {
        destMarkerRef.current.setLatLng([position.lat, position.lng]);
      } else {
        const marker = L.marker([position.lat, position.lng], {
          icon: createDestinationIcon(),
          draggable: true,
        }).addTo(map);

        marker.on('dragend', async () => {
          const latLng = marker.getLatLng();
          const { street, city } = await reverseGeocodeNominatim(latLng.lat, latLng.lng);
          onPositionSelect({ lat: latLng.lat, lng: latLng.lng }, street, city);
        });

        destMarkerRef.current = marker;
      }

      if (lineRef.current) {
        lineRef.current.setLatLngs([
          [STORE_ORIGIN.lat, STORE_ORIGIN.lng],
          [position.lat, position.lng],
        ]);
      } else {
        lineRef.current = L.polyline(
          [
            [STORE_ORIGIN.lat, STORE_ORIGIN.lng],
            [position.lat, position.lng],
          ],
          {
            color: '#F28A08',
            weight: 3,
            dashArray: '6, 6',
            opacity: 0.8,
          }
        ).addTo(map);
      }
    }
  }, [position, onPositionSelect, isDark]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full rounded-xl overflow-hidden z-0 transition-all ${
        isDark
          ? '[&_.leaflet-tile]:invert [&_.leaflet-tile]:hue-rotate-180 [&_.leaflet-tile]:brightness-[0.75] [&_.leaflet-tile]:contrast-[1.2]'
          : ''
      }`}
    />
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

  const [googleMapsError, setGoogleMapsError] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showMap, setShowMap] = useState(true);

  // Fallback cleanly to OpenStreetMap if Google Maps throws an authentication failure on unconfigured domains
  useEffect(() => {
    const handleAuthFailure = () => {
      console.warn('Google Maps authentication failed, falling back to OpenStreetMap.');
      setGoogleMapsError(true);
    };
    const handleQuotaExceeded = () => {
      setGoogleMapsError(true);
    };

    (window as any).gm_authFailure = handleAuthFailure;
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);

    return () => {
      if ((window as any).gm_authFailure === handleAuthFailure) {
        delete (window as any).gm_authFailure;
      }
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const canUseGoogleMaps = Boolean(apiKey && !googleMapsError);

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
    const rawDist = calculateDistanceKm(
      STORE_ORIGIN.lat,
      STORE_ORIGIN.lng,
      pos.lat,
      pos.lng
    );

    let effectivePos = pos;
    let effectiveDist = rawDist;
    let resolvedStreet = street || value.streetName || 'Arbegnoch St';
    let resolvedCity = city || value.cityName || 'Addis Ababa';

    // If coordinates are outside Addis Ababa (e.g. testing from overseas, cloud runner or VPN),
    // adjust to central Addis Ababa (Bole area) to avoid astronomical thousands of km charges
    if (rawDist > 35) {
      effectivePos = { lat: 9.0054, lng: 38.7845 };
      effectiveDist = calculateDistanceKm(
        STORE_ORIGIN.lat,
        STORE_ORIGIN.lng,
        effectivePos.lat,
        effectivePos.lng
      );
      resolvedStreet = 'Bole';
      resolvedCity = 'Addis Ababa';
      setGpsNotice('Device GPS is outside Addis Ababa. Pinned to central Addis Ababa.');
      setTimeout(() => setGpsNotice(null), 5000);
    }

    const fee = calculateDeliveryFee(effectiveDist, orderItems);
    const mapsUrl = `https://www.google.com/maps?q=${effectivePos.lat.toFixed(6)},${effectivePos.lng.toFixed(6)}`;
    const formattedAddress = `${resolvedStreet}, ${resolvedCity}`;

    onChange({
      ...value,
      lat: effectivePos.lat,
      lng: effectivePos.lng,
      distanceKm: effectiveDist,
      deliveryFee: fee,
      mapsUrl,
      streetName: resolvedStreet,
      cityName: resolvedCity,
      address: formattedAddress,
    });
  };

  const [gpsNotice, setGpsNotice] = useState<string | null>(null);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGpsNotice('GPS is not supported by your browser.');
      setTimeout(() => setGpsNotice(null), 4000);
      return;
    }
    setIsLocating(true);
    setGpsNotice(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        const { street, city } = await reverseGeocodeNominatim(userPos.lat, userPos.lng);
        handlePositionSelect(userPos, street, city);
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
        setGpsNotice('Location access not permitted. Tap directly on the map to pin.');
        setTimeout(() => setGpsNotice(null), 4000);
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
          <a
            href="https://www.google.com/maps/search/?api=1&query=Arbegnoch+St,+Addis+Ababa"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
            className="text-[#706A63] dark:text-[#A8A199] font-['Poppins'] hover:text-[#F28A08] dark:hover:text-[#F28A08] transition-colors underline"
          >
            Arbegnoch St, Addis Ababa
          </a>
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

          {/* GPS Notice Banner if permission is denied or pending */}
          {gpsNotice && (
            <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-[#F28A08] font-['Poppins']">
              {gpsNotice}
            </div>
          )}

          {/* Interactive Map (Google Maps if API key is provided, or full Leaflet OpenStreetMap fallback for GitHub deployment) */}
          {showMap && (
            <div className="relative h-44 sm:h-48 min-h-[176px] sm:min-h-[192px] w-full rounded-xl overflow-hidden border border-[#EDE5D9] dark:border-[#38332E] shadow-sm">
              {canUseGoogleMaps ? (
                <MapController
                  position={currentCoords}
                  onPositionSelect={handlePositionSelect}
                  isDark={isDark}
                />
              ) : (
                <LeafletMap
                  position={value.lat && value.lng ? { lat: value.lat, lng: value.lng } : null}
                  onPositionSelect={handlePositionSelect}
                  isDark={isDark}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return canUseGoogleMaps ? <APIProvider apiKey={apiKey}>{content}</APIProvider> : content;
};
