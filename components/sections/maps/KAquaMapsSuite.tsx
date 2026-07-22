'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Globe, Compass, Shield, ChevronRight, Search, Download, Check, Layers, ExternalLink } from 'lucide-react';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { Button } from '@/components/ui/Button';

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'AIzaSyDGmJeJsMRAh3Z9PZWNJRTomvM3URcm5B8';

// HQ & Data Definitions
const HQ_SITE = {
  position: { lat: 50.487, lng: 8.485 },
  address: ['KWT GmbH', 'Auweg 3', '35647 Waldsolms Brandoberndorf'],
  phone: '+49 6085 9869-0',
  registry: { court: 'Amtsgericht Wetzlar', number: 'HRB 5421' },
  dirUrl: 'https://maps.google.com/?q=50.487,8.485'
};

const REFERENCE_SITES = [
  { id: 'dubai', sector: 'hotel', sys: 'PP-RCT / K-Aqua SDR 7.4', dims: 'd20 – d355 mm', pn: 'PN 20 / PN 25', weld: 'muffen_stumpf', kessel: true, hot: 48, year: 2014, position: { lat: 25.197, lng: 55.274 } },
  { id: 'warschau', sector: 'wohnen', sys: 'K-Aqua SDR 11 / Fibre-Composite', dims: 'd20 – d160 mm', pn: 'PN 16', weld: 'muffen', kessel: false, hot: 0, year: 2017, position: { lat: 52.229, lng: 21.012 } },
  { id: 'istanbul', sector: 'infra', sys: 'PP-R High-Temp / K-Aqua UV-Protect', dims: 'd32 – d250 mm', pn: 'PN 20', weld: 'stumpf_heizwendel', kessel: true, hot: 42, year: 2016, position: { lat: 41.008, lng: 28.978 } },
  { id: 'singapur', sector: 'klinik', sys: 'PP-RCT Clean-Hygiene / K-Aqua', dims: 'd20 – d200 mm', pn: 'PN 20', weld: 'muffen_stumpf', kessel: true, hot: 38, year: 2019, position: { lat: 1.352, lng: 103.82 } },
  { id: 'kapstadt', sector: 'buero', sys: 'K-Aqua SDR 7.4 Standard', dims: 'd20 – d110 mm', pn: 'PN 20', weld: 'muffen', kessel: false, hot: 0, year: 2018, position: { lat: -33.924, lng: 18.424 } },
  { id: 'london', sector: 'wohnen', sys: 'K-Aqua SDR 11 Riser System', dims: 'd32 – d160 mm', pn: 'PN 16', weld: 'muffen', kessel: false, hot: 0, year: 2021, position: { lat: 51.507, lng: -0.127 } }
];

const MARKET_PROFILES = [
  { slug: 'de', name: 'Deutschland & Mitteleuropa', reg: 'DIN 8077/8078 · DVGW W544', tempC: 22, lat: 50.5, lng: 8.5 },
  { slug: 'ksa-west', name: 'Saudi-Arabien (Dschidda / West)', reg: 'SASO ISO 15874 · SASO 2663', tempC: 46, lat: 21.5, lng: 39.2 },
  { slug: 'ksa-neom', name: 'NEOM / Tabuk (Projektzone)', reg: 'NEOM Spec v4 · SASO ISO 15874', tempC: 44, lat: 28.3, lng: 35.1 },
  { slug: 'uae', name: 'Vereinigte Arabische Emirate', reg: 'ESMA / Abu Dhabi QCC / Dubai Municipality', tempC: 48, lat: 25.2, lng: 55.3 },
  { slug: 'oman', name: 'Sultanat Oman', reg: 'OS ISO 15874 · DGW', tempC: 45, lat: 23.6, lng: 58.5 },
  { slug: 'egypt', name: 'Ägypten & Nordafrika', reg: 'EOS 1901 · Kairo Spec', tempC: 41, lat: 30.0, lng: 31.2 },
  { slug: 'sg', name: 'Singapur & Südostasien', reg: 'SS 375 · PUB Singapore Approved', tempC: 38, lat: 1.35, lng: 103.8 },
  { slug: 'india', name: 'Indien (West / Süd)', reg: 'BIS IS 15801', tempC: 42, lat: 19.1, lng: 72.8 },
  { slug: 'za', name: 'Südafrika & SADC', reg: 'SANS 15874', tempC: 32, lat: -26.2, lng: 28.0 }
];

export function KAquaMapsSuite() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const [activeTab, setActiveTab] = useState<'hq' | 'refs' | 'spec'>('hq');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const hqMapRef = useRef<HTMLDivElement>(null);
  const refsMapRef = useRef<HTMLDivElement>(null);
  const specMapRef = useRef<HTMLDivElement>(null);

  const hqInstanceRef = useRef<google.maps.Map | null>(null);
  const refsInstanceRef = useRef<google.maps.Map | null>(null);
  const specInstanceRef = useRef<google.maps.Map | null>(null);

  // Specifier State
  const [specQuery, setSpecQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const specInputRef = useRef<HTMLInputElement>(null);
  const specPolylineRef = useRef<google.maps.Polyline | null>(null);
  const specMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(null);

  // Refs State
  const [activeSector, setActiveSector] = useState<string>('all');
  const refsPolylinesRef = useRef<google.maps.Polyline[]>([]);

  // Load Google Maps JS API script centrally
  useEffect(() => {
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = 'google-maps-js-api';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,marker,geometry&v=weekly`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          setScriptLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Initialize HQ Map (Karte 1)
  useEffect(() => {
    if (!scriptLoaded || activeTab !== 'hq' || !hqMapRef.current) return;

    if (!hqInstanceRef.current) {
      const map = new google.maps.Map(hqMapRef.current, {
        center: HQ_SITE.position,
        zoom: 11,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        zoomControl: true,
      });

      hqInstanceRef.current = map;

      // Distance Rings
      [10000, 25000, 50000].forEach((r) => {
        new google.maps.Circle({
          strokeColor: '#005b94',
          strokeOpacity: 0.4,
          strokeWeight: 1.5,
          fillColor: '#005b94',
          fillOpacity: 0.05,
          map,
          center: HQ_SITE.position,
          radius: r,
        });
      });

      // HQ Marker
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        const pin = document.createElement('div');
        pin.className = 'flex items-center gap-2 bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full shadow-lg text-sm';
        pin.innerHTML = `<span>K</span><span class="text-xs font-normal">Hauptsitz Waldsolms</span>`;
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: HQ_SITE.position,
          content: pin,
          title: 'K-Aqua Hauptsitz Waldsolms',
        });
      } else {
        new google.maps.Marker({
          map,
          position: HQ_SITE.position,
          title: 'K-Aqua Hauptsitz Waldsolms',
        });
      }
    }
  }, [scriptLoaded, activeTab]);

  // Initialize References Map (Karte 2)
  useEffect(() => {
    if (!scriptLoaded || activeTab !== 'refs' || !refsMapRef.current) return;

    if (!refsInstanceRef.current) {
      const map = new google.maps.Map(refsMapRef.current, {
        center: { lat: 24, lng: 30 },
        zoom: 3,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        zoomControl: true,
      });

      refsInstanceRef.current = map;
    }

    const map = refsInstanceRef.current;
    if (!map) return;

    // Clear old polylines
    refsPolylinesRef.current.forEach((p) => p.setMap(null));
    refsPolylinesRef.current = [];

    const visibleSites = activeSector === 'all'
      ? REFERENCE_SITES
      : REFERENCE_SITES.filter((s) => s.sector === activeSector);

    // Draw geodesic supply lines from HQ to sites
    const polylines = visibleSites.map((site) => {
      return new google.maps.Polyline({
        path: [HQ_SITE.position, site.position],
        geodesic: true,
        strokeColor: '#702cb4',
        strokeOpacity: 0.6,
        strokeWeight: 2,
        map,
      });
    });

    refsPolylinesRef.current = polylines;
  }, [scriptLoaded, activeTab, activeSector]);

  // Initialize Specifier Map (Karte 3) & Places Autocomplete
  useEffect(() => {
    if (!scriptLoaded || activeTab !== 'spec' || !specMapRef.current) return;

    if (!specInstanceRef.current) {
      const map = new google.maps.Map(specMapRef.current, {
        center: { lat: 42, lng: 22 },
        zoom: 3.5,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        zoomControl: true,
      });

      specInstanceRef.current = map;

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          const label = `${Math.abs(lat).toFixed(1)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng).toFixed(1)}° ${lng >= 0 ? 'E' : 'W'}`;
          setSelectedSite({ lat, lng, label });
          setSpecQuery(label);
        }
      });
    }

    // Attach Autocomplete
    if (specInputRef.current && window.google.maps.places) {
      const autocomplete = new google.maps.places.Autocomplete(specInputRef.current, {
        types: ['(cities)'],
        fields: ['geometry', 'name', 'formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const label = place.name || place.formatted_address || `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
          setSelectedSite({ lat, lng, label });
          setSpecQuery(label);

          if (specInstanceRef.current) {
            specInstanceRef.current.panTo({ lat, lng });
            specInstanceRef.current.setZoom(8);
          }
        }
      });
    }
  }, [scriptLoaded, activeTab]);

  // Render Specifier Supply Axis & Marker when selectedSite changes
  useEffect(() => {
    if (!scriptLoaded || !specInstanceRef.current) return;
    const map = specInstanceRef.current;

    if (specPolylineRef.current) specPolylineRef.current.setMap(null);
    if (specMarkerRef.current) specMarkerRef.current.map = null;

    if (selectedSite) {
      const line = new google.maps.Polyline({
        path: [HQ_SITE.position, { lat: selectedSite.lat, lng: selectedSite.lng }],
        geodesic: true,
        strokeColor: '#005b94',
        strokeOpacity: 0.85,
        strokeWeight: 3,
        map,
      });
      specPolylineRef.current = line;

      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        const pin = document.createElement('div');
        pin.className = 'bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded shadow-md border border-white';
        pin.innerText = selectedSite.label;

        specMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: selectedSite.lat, lng: selectedSite.lng },
          content: pin,
        });
      }
    }
  }, [selectedSite, scriptLoaded]);

  // Market & Distance calculations
  const calculatedData = useMemo(() => {
    if (!selectedSite) return null;

    // Find closest market profile
    let best = MARKET_PROFILES[0];
    let minDistance = 1e9;

    MARKET_PROFILES.forEach((mp) => {
      const d = Math.hypot(selectedSite.lat - mp.lat, selectedSite.lng - mp.lng);
      if (d < minDistance) {
        minDistance = d;
        best = mp;
      }
    });

    // Haversine distance
    const R = 6371;
    const dLat = ((selectedSite.lat - HQ_SITE.position.lat) * Math.PI) / 180;
    const dLng = ((selectedSite.lng - HQ_SITE.position.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((HQ_SITE.position.lat * Math.PI) / 180) *
        Math.cos((selectedSite.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const airKm = Math.round(R * c);
    const roadKm = Math.round(airKm * 1.24);

    return { market: best, airKm, roadKm };
  }, [selectedSite]);

  return (
    <section className="w-full py-16 lg:py-24 bg-background text-foreground border-b border-card-border">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-primary font-bold text-xs tracking-widest uppercase mb-2 block flex items-center gap-2">
              <Globe className="w-4 h-4" /> K-Aqua Geografischer Hub & Telemetrie
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight">
              Interaktive <span className="text-primary">Karten-Suite</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-card border border-card-border p-1.5 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveTab('hq')}
              className={`px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-fast flex items-center gap-2 ${
                activeTab === 'hq'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background-subtle'
              }`}
            >
              <MapPin className="w-4 h-4" /> Hauptsitz Waldsolms
            </button>
            <button
              onClick={() => setActiveTab('refs')}
              className={`px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-fast flex items-center gap-2 ${
                activeTab === 'refs'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background-subtle'
              }`}
            >
              <Globe className="w-4 h-4" /> Dichtheitskarte
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-4 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-fast flex items-center gap-2 ${
                activeTab === 'spec'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background-subtle'
              }`}
            >
              <Compass className="w-4 h-4" /> Spezifikator
            </button>
          </div>
        </div>

        {/* Tab 1: Hauptsitz Waldsolms */}
        {activeTab === 'hq' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 rounded-2xl border border-card-border overflow-hidden h-[540px] relative shadow-diffuse">
              <div ref={hqMapRef} className="w-full h-full" />
            </div>
            <div className="bg-card border border-card-border rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
              <div>
                <h3 className="font-heading font-bold text-xl mb-1 text-foreground">
                  Zentrale Produktion & Entwicklungszentrum
                </h3>
                <p className="text-sm text-muted-foreground">
                  Waldsolms Brandoberndorf, Hessen, Deutschland.
                </p>
              </div>

              <div className="space-y-3 text-sm border-t border-b border-card-border py-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registergericht:</span>
                  <span className="font-medium text-foreground">{HQ_SITE.registry.court} {HQ_SITE.registry.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefon:</span>
                  <span className="font-medium text-foreground">{HQ_SITE.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zertifizierung:</span>
                  <span className="font-medium text-primary">ISO 9001 · ISO 14001 · DAkkS</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ButtonPrimary href={HQ_SITE.dirUrl} className="w-full justify-center">
                  Routenplaner Öffnen <ExternalLink className="w-4 h-4 ms-2" />
                </ButtonPrimary>
                <Button variant="ghost" href="/unternehmen" className="w-full justify-center">
                  Über das Werk Waldsolms
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Referenzen Dichtheitskarte */}
        {activeTab === 'refs' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-bold uppercase text-muted-foreground me-2">Sektor Filter:</span>
              {['all', 'hotel', 'wohnen', 'infra', 'klinik', 'buero'].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeSector === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-card-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s === 'all' ? 'Alle Sektoren' : s}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-card-border overflow-hidden h-[560px] relative shadow-diffuse">
              <div ref={refsMapRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Tab 3: Spezifikator */}
        {activeTab === 'spec' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  ref={specInputRef}
                  type="text"
                  value={specQuery}
                  onChange={(e) => setSpecQuery(e.target.value)}
                  placeholder="Ort oder Stadt weltweit eingeben (z.B. Riyadh, Dubai, Berlin)..."
                  className="w-full ps-12 pe-4 py-3.5 bg-card border border-card-border rounded-xl font-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                />
              </div>

              <div className="rounded-2xl border border-card-border overflow-hidden h-[540px] relative shadow-diffuse">
                <div ref={specMapRef} className="w-full h-full" />
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
              <h3 className="font-heading font-bold text-xl text-foreground flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" /> Markt- & Logistik-Profil
              </h3>

              {!calculatedData ? (
                <p className="text-sm text-muted-foreground">
                  Klicken Sie auf die Karte oder suchen Sie eine Stadt, um die automatische System-Spezifikation und Lieferachsen-Berechnung auszulösen.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
                    <div className="text-xs font-bold uppercase text-primary tracking-wider">Marktzuordnung</div>
                    <div className="font-heading font-bold text-lg text-foreground">{calculatedData.market.name}</div>
                    <div className="text-xs text-muted-foreground">Norm: {calculatedData.market.reg}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-background border border-card-border rounded-xl">
                      <div className="text-xs text-muted-foreground">Luftlinie (HQ)</div>
                      <div className="font-heading font-bold text-base text-foreground mt-1">{calculatedData.airKm} km</div>
                    </div>
                    <div className="p-3 bg-background border border-card-border rounded-xl">
                      <div className="text-xs text-muted-foreground">Straße (Geschätzt)</div>
                      <div className="font-heading font-bold text-base text-foreground mt-1">{calculatedData.roadKm} km</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Empfohlenes Rohrsystem:</div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <Check className="w-4 h-4 text-primary shrink-0" /> K-Aqua PP-RCT SDR 7.4 High-Pressure
                      </li>
                      <li className="flex items-center gap-2 text-foreground font-medium">
                        <Check className="w-4 h-4 text-primary shrink-0" /> UV-Protect Außenmantel
                      </li>
                    </ul>
                  </div>

                  <ButtonPrimary href="/projektanfrage" className="w-full justify-center mt-2">
                    BIM & Spezifikationspaket anfordern
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default KAquaMapsSuite;
