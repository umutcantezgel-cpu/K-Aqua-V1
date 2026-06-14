'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'motion/react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { GlobeRef, GlobeMarker } from '@/components/globe/Globe';

// Load Globe dynamically with ssr: false to prevent server rendering of canvas
const Globe = dynamic(
  () => import('@/components/globe/Globe').then((mod) => mod.Globe),
  { ssr: false }
);

interface LogEntry {
  id: number;
  time: string;
  message: string;
}

const LABELS = {
  title: 'Globus Engine Verification',
  subtitle: 'Verify canvas-based orthographic globe rendering, smooth easing flyTo transitions, and accessibility.',
  themeSettings: 'Theme Settings',
  themeDescription: 'Switch the theme and verify the canvas background consistency.',
  dragInstruction: 'Drag to rotate • Hover markers to view labels • Click markers to trigger callbacks',
  animationTitle: 'Animation & Easing',
  transitionsTitle: 'Transitions (flyTo)',
  transitionsDescription: 'Trigger 900ms easeInOutCubic transitions centering the shortest-path longitude and latitude.',
  flyLondon: 'Fly to London',
  flySydney: 'Fly to Sydney',
  flyNewYork: 'Fly to New York',
  flyBerlin: 'Fly to Berlin',
  autoRotationTitle: 'Auto-Rotation Control',
  stopBtn: 'Stop',
  slowBtn: 'Slow (0.01)',
  defaultBtn: 'Default (0.028)',
  fastBtn: 'Fast (0.06)',
  accessibilityTitle: 'Accessibility Status',
  reducedMotionEnabled: 'Reduced Motion Enabled (Auto-rotation & Momentum disabled)',
  reducedMotionDisabled: 'Reduced Motion Disabled (Normal physics & auto-rotation)',
  callbackLogsTitle: 'Callback Logs',
  clearBtn: 'Clear',
  noEventsMsg: 'No events captured yet.',
  bracketLeft: '[',
  bracketRight: ']',
};

export default function GlobeDevPage() {
  const globeRef = useRef<GlobeRef | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [autoSpeed, setAutoSpeed] = useState(0.028);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [{ id: Date.now() + Math.random(), time, message }, ...prev.slice(0, 19)]);
  };

  const testMarkers: GlobeMarker[] = [
    { lon: -0.1278, lat: 51.5074, title: 'London', label: 'London, UK' },
    { lon: 151.2093, lat: -33.8688, title: 'Sydney', label: 'Sydney, AU' },
    { lon: 13.4050, lat: 52.5200, title: 'Berlin', label: 'Berlin, DE' },
    { lon: -74.0060, lat: 40.7128, title: 'New York', label: 'New York, US' },
    { lon: 35.2137, lat: 31.7683, title: 'Jerusalem', label: 'Jerusalem' },
  ];

  const handleMarkerClick = (marker: GlobeMarker) => {
    addLog(`Clicked marker: ${marker.title} (${marker.lon}, ${marker.lat})`);
  };

  const handleDrag = () => {
    addLog('Globe dragged');
  };

  const flyToLocation = (lon: number, lat: number, name: string) => {
    addLog(`Initiating flyTo: ${name} (${lon}, ${lat})`);
    if (globeRef.current) {
      globeRef.current.flyTo(lon, lat);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-normal p-container">
      {/* Header */}
      <header className="mb-12 border-b border-card-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-h1 font-heading font-extrabold tracking-tight mb-2">
            {LABELS.title}
          </h1>
          <p className="text-lead text-muted-foreground font-body">
            {LABELS.subtitle}
          </p>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-4 shadow-diffuse max-w-sm">
          <ThemeToggle />
          <div>
            <h4 className="text-small font-heading font-bold">{LABELS.themeSettings}</h4>
            <p className="text-tiny text-muted-foreground leading-normal">
              {LABELS.themeDescription}
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Globe */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-card border border-card-border rounded-xl p-8 shadow-diffuse min-h-[600px]">
          <div className="relative border border-card-border/50 rounded-full p-4 bg-background-subtle">
            <Globe
              ref={globeRef}
              size={520}
              markers={testMarkers}
              interactive={true}
              speed={autoSpeed}
              onMarkerClick={handleMarkerClick}
              onDrag={handleDrag}
            />
          </div>
          <div className="mt-4 text-tiny text-muted-foreground font-body text-center">
            {LABELS.dragInstruction}
          </div>
        </div>

        {/* Right Column: Controls and Event Logs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Controls Card */}
          <Card className="p-6 space-y-4">
            <Eyebrow>{LABELS.animationTitle}</Eyebrow>
            <h3 className="text-h3 font-heading font-bold">{LABELS.transitionsTitle}</h3>
            <p className="text-body text-muted-foreground text-small">
              {LABELS.transitionsDescription}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="primary"
                onClick={() => flyToLocation(-0.1278, 51.5074, 'London')}
              >
                {LABELS.flyLondon}
              </Button>
              <Button
                variant="primary"
                onClick={() => flyToLocation(151.2093, -33.8688, 'Sydney')}
              >
                {LABELS.flySydney}
              </Button>
              <Button
                variant="primary"
                onClick={() => flyToLocation(-74.0060, 40.7128, 'New York')}
              >
                {LABELS.flyNewYork}
              </Button>
              <Button
                variant="primary"
                onClick={() => flyToLocation(13.4050, 52.5200, 'Berlin')}
              >
                {LABELS.flyBerlin}
              </Button>
            </div>

            <div className="border-t border-card-border pt-4 space-y-4">
              <h4 className="text-small font-bold">{LABELS.autoRotationTitle}</h4>
              <div className="flex gap-2">
                <Button
                  variant={autoSpeed === 0 ? 'primary' : 'ghost'}
                  onClick={() => setAutoSpeed(0)}
                  size="sm"
                >
                  {LABELS.stopBtn}
                </Button>
                <Button
                  variant={autoSpeed === 0.01 ? 'primary' : 'ghost'}
                  onClick={() => setAutoSpeed(0.01)}
                  size="sm"
                >
                  {LABELS.slowBtn}
                </Button>
                <Button
                  variant={autoSpeed === 0.028 ? 'primary' : 'ghost'}
                  onClick={() => setAutoSpeed(0.028)}
                  size="sm"
                >
                  {LABELS.defaultBtn}
                </Button>
                <Button
                  variant={autoSpeed === 0.06 ? 'primary' : 'ghost'}
                  onClick={() => setAutoSpeed(0.06)}
                  size="sm"
                >
                  {LABELS.fastBtn}
                </Button>
              </div>
            </div>

            <div className="border-t border-card-border pt-4 space-y-2">
              <h4 className="text-small font-bold">{LABELS.accessibilityTitle}</h4>
              <div className="flex items-center gap-3 text-small">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    shouldReduceMotion ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                />
                <span>
                  {shouldReduceMotion
                    ? LABELS.reducedMotionEnabled
                    : LABELS.reducedMotionDisabled}
                </span>
              </div>
            </div>
          </Card>

          {/* Logs Card */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-card-border pb-3">
              <h3 className="text-small font-bold uppercase tracking-wider text-muted-foreground">
                {LABELS.callbackLogsTitle}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setLogs([])}>
                {LABELS.clearBtn}
              </Button>
            </div>
            <div className="h-64 overflow-y-auto font-mono text-tiny space-y-1 bg-background-subtle p-3 rounded-lg border border-card-border/50">
              {logs.length === 0 ? (
                <div className="text-muted-foreground text-center py-12">
                  {LABELS.noEventsMsg}
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="leading-relaxed border-b border-card-border/20 py-0.5">
                    <span className="text-primary font-bold">{LABELS.bracketLeft}{log.time}{LABELS.bracketRight}</span> {log.message}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
