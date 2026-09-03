import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById, ALL_EVENTS } from "@/lib/events-data";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  PhoneCall, 
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Award,
  Video,
  AlertCircle,
  Building2,
  QrCode,
  Sparkles,
  Mail,
  CheckCircle2,
  ChevronRight,
  Compass
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_EVENTS.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: event.description,
      url: `https://www.shreepratishthan.org/events/${event.id}`,
      images: [{ url: event.mainImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Shree Pratishtan (श्री प्रतिष्ठान)`,
      description: event.description,
      images: [event.mainImage],
    },
  };
}

import EventDetailContent from "@/components/events/event-detail-content";

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}
