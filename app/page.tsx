'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp, FaYoutube, FaTiktok, FaSpotify, FaFacebookF, FaPinterestP, FaSnapchatGhost, FaTelegramPlane, FaDiscord, FaTwitch, FaGithub, FaDribbble, FaBehance, FaMediumM, FaRedditAlien, FaVimeoV, FaSoundcloud, FaPatreon, FaSlack, FaCar, FaPaw } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { HiOutlinePhone, HiOutlineMail, HiOutlineGlobeAlt, HiOutlineOfficeBuilding, HiOutlineBriefcase, HiOutlineUser, HiOutlineUserGroup, HiOutlineChat, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineLink, HiOutlineQrcode, HiOutlineWifi, HiOutlineDeviceMobile, HiOutlineCreditCard, HiOutlineIdentification } from 'react-icons/hi';

// Translations
type Language = 'tr' | 'en' | 'de' | 'es' | 'it' | 'fr' | 'ar' | 'az';

const translations = {
  tr: {
    heroTitle: 'Elektrikli Arac',
    heroSubtitle: 'Sarj Rehberin',
    biolinkTitle1: 'Turkiye',
    biolinkTitle2: 'Genelinde',
    biolinkSubtitle1: '7900+ Sarj',
    biolinkSubtitle2: 'Noktasi',
    profilesTitle1: 'En Yakin',
    profilesTitle2: 'Istasyonlari',
    profilesSubtitle: 'Bul',
    digitalCard: 'DC Hizli Sarj',
    biolink: 'AC Sarj',
    vehicleProfile: 'Fiyat Karsilastir',
    petProfile: 'Favorilere Ekle',
    shareTitle: 'Detayli',
    shareSubtitle: 'Istasyon Bilgisi',
    nfcTouch: 'Soket Bilgisi',
    qrScan: 'Fiyat Bilgisi',
    linkShare: 'Yol Tarifi',
    allProfilesTitle1: 'Fiyat ve',
    allProfilesTitle2: 'Soket',
    allProfilesSubtitle: 'Bilgisi',
    quickAccess: 'Anlik Durum',
    advantagesTitle: 'Tum Hizmetler',
    advantagesSubtitle: 'Tek Uygulamada',
    specialDiscounts: 'Sarj Istasyonlari',
    brandOffers: 'Akilli Asistan',
    messagesTitle: 'Akilli',
    messagesSubtitle: 'Asistan',
    instantNotifications: 'Sarj Maliyeti',
    manageFromOne: 'Menzil Hesapla',
    appointmentsTitle: 'Sarj Maliyeti',
    appointmentsSubtitle: 'Hesapla',
    calendar: 'Maliyet',
    customers: 'Tasarruf',
    statsTitle1: 'Guvenlik',
    statsTitle2: '',
    statsSubtitle: 'Ayarlari',
    referralTitle1: 'Premium',
    referralTitle2: 'Ozellikler',
    referralSubtitle: 'Kesfet',
  },
  en: {
    heroTitle: 'Your EV',
    heroSubtitle: 'Charging Guide',
    biolinkTitle1: 'Across',
    biolinkTitle2: 'Turkey',
    biolinkSubtitle1: '7900+ Charging',
    biolinkSubtitle2: 'Stations',
    profilesTitle1: 'Find',
    profilesTitle2: 'Nearest',
    profilesSubtitle: 'Stations',
    digitalCard: 'DC Fast Charging',
    biolink: 'AC Charging',
    vehicleProfile: 'Compare Prices',
    petProfile: 'Add to Favorites',
    shareTitle: 'Detailed',
    shareSubtitle: 'Station Info',
    nfcTouch: 'Socket Info',
    qrScan: 'Pricing Info',
    linkShare: 'Get Directions',
    allProfilesTitle1: 'Price &',
    allProfilesTitle2: 'Socket',
    allProfilesSubtitle: 'Details',
    quickAccess: 'Live Status',
    advantagesTitle: 'All Services',
    advantagesSubtitle: 'In One App',
    specialDiscounts: 'Charging Stations',
    brandOffers: 'Smart Assistant',
    messagesTitle: 'Smart',
    messagesSubtitle: 'Assistant',
    instantNotifications: 'Charging Cost',
    manageFromOne: 'Range Calculator',
    appointmentsTitle: 'Calculate',
    appointmentsSubtitle: 'Charging Cost',
    calendar: 'Cost',
    customers: 'Savings',
    statsTitle1: 'Security',
    statsTitle2: '',
    statsSubtitle: 'Settings',
    referralTitle1: 'Premium',
    referralTitle2: 'Features',
    referralSubtitle: 'Discover',
  },
  de: {
    heroTitle: 'Dein EV',
    heroSubtitle: 'Ladefuhrer',
    biolinkTitle1: 'In der',
    biolinkTitle2: 'Turkei',
    biolinkSubtitle1: '7900+ Lade-',
    biolinkSubtitle2: 'stationen',
    profilesTitle1: 'Nachste',
    profilesTitle2: 'Stationen',
    profilesSubtitle: 'Finden',
    digitalCard: 'DC Schnellladen',
    biolink: 'AC Laden',
    vehicleProfile: 'Preise vergleichen',
    petProfile: 'Favoriten',
    shareTitle: 'Detaillierte',
    shareSubtitle: 'Stationsinfo',
    nfcTouch: 'Stecker-Info',
    qrScan: 'Preis-Info',
    linkShare: 'Navigation',
    allProfilesTitle1: 'Preis &',
    allProfilesTitle2: 'Stecker',
    allProfilesSubtitle: 'Details',
    quickAccess: 'Live-Status',
    advantagesTitle: 'Alle Dienste',
    advantagesSubtitle: 'In einer App',
    specialDiscounts: 'Ladestationen',
    brandOffers: 'Smart Assistent',
    messagesTitle: 'Smarter',
    messagesSubtitle: 'Assistent',
    instantNotifications: 'Ladekosten',
    manageFromOne: 'Reichweite berechnen',
    appointmentsTitle: 'Ladekosten',
    appointmentsSubtitle: 'Berechnen',
    calendar: 'Kosten',
    customers: 'Ersparnis',
    statsTitle1: 'Sicherheits-',
    statsTitle2: '',
    statsSubtitle: 'einstellungen',
    referralTitle1: 'Premium',
    referralTitle2: 'Funktionen',
    referralSubtitle: 'Entdecken',
  },
  es: {
    heroTitle: 'Un Toque,',
    heroSubtitle: 'Conexiones Infinitas',
    biolinkTitle1: 'Tus Redes',
    biolinkTitle2: 'Sociales',
    biolinkSubtitle1: 'Todo en un Enlace',
    biolinkSubtitle2: '',
    profilesTitle1: 'Todos tus',
    profilesTitle2: 'Perfiles',
    profilesSubtitle: 'En un Solo Lugar',
    digitalCard: 'Tarjeta Digital',
    biolink: 'Biolink',
    vehicleProfile: 'Perfil de Vehiculo',
    petProfile: 'Perfil de Mascota',
    shareTitle: 'Comparte',
    shareSubtitle: 'al Instante',
    nfcTouch: 'Toca con NFC',
    qrScan: 'Escanea QR',
    linkShare: 'Comparte Enlace',
    allProfilesTitle1: 'Todos tus',
    allProfilesTitle2: 'Perfiles',
    allProfilesSubtitle: 'Juntos',
    quickAccess: 'Acceso Rapido',
    advantagesTitle: 'Beneficios',
    advantagesSubtitle: 'y Cupones',
    specialDiscounts: 'Descuentos Especiales',
    brandOffers: 'Ofertas de Marcas',
    messagesTitle: 'Sigue tus',
    messagesSubtitle: 'Mensajes',
    instantNotifications: 'Notificaciones Instantaneas',
    manageFromOne: 'Gestiona desde un Lugar',
    appointmentsTitle: 'Gestiona',
    appointmentsSubtitle: 'Citas',
    calendar: 'Calendario',
    customers: 'Clientes',
    statsTitle1: 'Estadisticas',
    statsTitle2: 'y',
    statsSubtitle: 'Analisis',
    referralTitle1: 'Invita a tus',
    referralTitle2: 'Amigos',
    referralSubtitle: 'Gana Recompensas',
  },
  it: {
    heroTitle: 'Un Tocco,',
    heroSubtitle: 'Connessioni Infinite',
    biolinkTitle1: 'I tuoi Social',
    biolinkTitle2: 'Media',
    biolinkSubtitle1: 'Tutto in un Link',
    biolinkSubtitle2: '',
    profilesTitle1: 'Tutti i tuoi',
    profilesTitle2: 'Profili',
    profilesSubtitle: 'In un Solo Posto',
    digitalCard: 'Biglietto Digitale',
    biolink: 'Biolink',
    vehicleProfile: 'Profilo Veicolo',
    petProfile: 'Profilo Animale',
    shareTitle: 'Condividi',
    shareSubtitle: 'Istantaneamente',
    nfcTouch: 'Tocca con NFC',
    qrScan: 'Scansiona QR',
    linkShare: 'Condividi Link',
    allProfilesTitle1: 'Tutti i tuoi',
    allProfilesTitle2: 'Profili',
    allProfilesSubtitle: 'Insieme',
    quickAccess: 'Accesso Rapido',
    advantagesTitle: 'Vantaggi',
    advantagesSubtitle: 'e Coupon',
    specialDiscounts: 'Sconti Speciali',
    brandOffers: 'Offerte dei Brand',
    messagesTitle: 'Segui i tuoi',
    messagesSubtitle: 'Messaggi',
    instantNotifications: 'Notifiche Istantanee',
    manageFromOne: 'Gestisci da un Posto',
    appointmentsTitle: 'Gestisci',
    appointmentsSubtitle: 'Appuntamenti',
    calendar: 'Calendario',
    customers: 'Clienti',
    statsTitle1: 'Statistiche',
    statsTitle2: 'e',
    statsSubtitle: 'Analisi',
    referralTitle1: 'Invita i tuoi',
    referralTitle2: 'Amici',
    referralSubtitle: 'Guadagna Premi',
  },
  fr: {
    heroTitle: 'Une Touche,',
    heroSubtitle: 'Connexions Infinies',
    biolinkTitle1: 'Vos Reseaux',
    biolinkTitle2: 'Sociaux',
    biolinkSubtitle1: 'Tout en un Lien',
    biolinkSubtitle2: '',
    profilesTitle1: 'Tous vos',
    profilesTitle2: 'Profils',
    profilesSubtitle: 'En un Seul Endroit',
    digitalCard: 'Carte de Visite Digitale',
    biolink: 'Biolink',
    vehicleProfile: 'Profil Vehicule',
    petProfile: 'Profil Animal',
    shareTitle: 'Partagez',
    shareSubtitle: 'Instantanement',
    nfcTouch: 'Touchez avec NFC',
    qrScan: 'Scannez QR',
    linkShare: 'Partagez le Lien',
    allProfilesTitle1: 'Tous vos',
    allProfilesTitle2: 'Profils',
    allProfilesSubtitle: 'Ensemble',
    quickAccess: 'Acces Rapide',
    advantagesTitle: 'Avantages',
    advantagesSubtitle: 'et Coupons',
    specialDiscounts: 'Reductions Speciales',
    brandOffers: 'Offres de Marques',
    messagesTitle: 'Suivez vos',
    messagesSubtitle: 'Messages',
    instantNotifications: 'Notifications Instantanees',
    manageFromOne: 'Gerez depuis un Endroit',
    appointmentsTitle: 'Gerez vos',
    appointmentsSubtitle: 'Rendez-vous',
    calendar: 'Calendrier',
    customers: 'Clients',
    statsTitle1: 'Statistiques',
    statsTitle2: 'et',
    statsSubtitle: 'Analyses',
    referralTitle1: 'Invitez vos',
    referralTitle2: 'Amis',
    referralSubtitle: 'Gagnez des Recompenses',
  },
  ar: {
    heroTitle: '\u0644\u0645\u0633\u0629 \u0648\u0627\u062D\u062F\u0629\u060C',
    heroSubtitle: '\u0627\u062A\u0635\u0627\u0644\u0627\u062A \u0644\u0627 \u062D\u062F\u0648\u062F \u0644\u0647\u0627',
    biolinkTitle1: '\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644',
    biolinkTitle2: '\u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A',
    biolinkSubtitle1: '\u0627\u0644\u0643\u0644 \u0641\u064A \u0631\u0627\u0628\u0637 \u0648\u0627\u062D\u062F',
    biolinkSubtitle2: '',
    profilesTitle1: '\u062C\u0645\u064A\u0639',
    profilesTitle2: '\u0645\u0644\u0641\u0627\u062A\u0643',
    profilesSubtitle: '\u0641\u064A \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F',
    digitalCard: '\u0628\u0637\u0627\u0642\u0629 \u0639\u0645\u0644 \u0631\u0642\u0645\u064A\u0629',
    biolink: '\u0628\u064A\u0648\u0644\u064A\u0646\u0643',
    vehicleProfile: '\u0645\u0644\u0641 \u0627\u0644\u0633\u064A\u0627\u0631\u0629',
    petProfile: '\u0645\u0644\u0641 \u0627\u0644\u062D\u064A\u0648\u0627\u0646 \u0627\u0644\u0623\u0644\u064A\u0641',
    shareTitle: '\u0634\u0627\u0631\u0643',
    shareSubtitle: '\u0641\u0648\u0631\u0627\u064B',
    nfcTouch: '\u0627\u0644\u0645\u0633 \u0628\u0640 NFC',
    qrScan: '\u0627\u0645\u0633\u062D QR',
    linkShare: '\u0634\u0627\u0631\u0643 \u0627\u0644\u0631\u0627\u0628\u0637',
    allProfilesTitle1: '\u062C\u0645\u064A\u0639',
    allProfilesTitle2: '\u0645\u0644\u0641\u0627\u062A\u0643',
    allProfilesSubtitle: '\u0645\u0639\u0627\u064B',
    quickAccess: '\u0648\u0635\u0648\u0644 \u0633\u0631\u064A\u0639',
    advantagesTitle: '\u0627\u0644\u0645\u0632\u0627\u064A\u0627',
    advantagesSubtitle: '\u0648\u0627\u0644\u0643\u0648\u0628\u0648\u0646\u0627\u062A',
    specialDiscounts: '\u062E\u0635\u0648\u0645\u0627\u062A \u062E\u0627\u0635\u0629',
    brandOffers: '\u0639\u0631\u0648\u0636 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629',
    messagesTitle: '\u062A\u062A\u0628\u0639',
    messagesSubtitle: '\u0631\u0633\u0627\u0626\u0644\u0643',
    instantNotifications: '\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0641\u0648\u0631\u064A\u0629',
    manageFromOne: '\u0625\u062F\u0627\u0631\u0629 \u0645\u0646 \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F',
    appointmentsTitle: '\u0625\u062F\u0627\u0631\u0629',
    appointmentsSubtitle: '\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F',
    calendar: '\u0627\u0644\u062A\u0642\u0648\u064A\u0645',
    customers: '\u0627\u0644\u0639\u0645\u0644\u0627\u0621',
    statsTitle1: '\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A',
    statsTitle2: '\u0648',
    statsSubtitle: '\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A',
    referralTitle1: '\u0627\u062F\u0639\u064F',
    referralTitle2: '\u0623\u0635\u062F\u0642\u0627\u0621\u0643',
    referralSubtitle: '\u0627\u0643\u0633\u0628 \u0645\u0643\u0627\u0641\u0622\u062A',
  },
  az: {
    heroTitle: 'Bir Toxunus,',
    heroSubtitle: 'Sonsuz Elaqeler',
    biolinkTitle1: 'Sosial',
    biolinkTitle2: 'Mediani',
    biolinkSubtitle1: 'Bir Linkde Topla',
    biolinkSubtitle2: '',
    profilesTitle1: 'Butun',
    profilesTitle2: 'Profillerin',
    profilesSubtitle: 'Bir Yerde',
    digitalCard: 'Reqemsal Vizit Karti',
    biolink: 'Biolink',
    vehicleProfile: 'Avtomobil Profili',
    petProfile: 'Heyvan Profili',
    shareTitle: 'Derhal',
    shareSubtitle: 'Paylas',
    nfcTouch: 'NFC ile Toxun',
    qrScan: 'QR Skan Et',
    linkShare: 'Link Paylas',
    allProfilesTitle1: 'Butun',
    allProfilesTitle2: 'Profillerin',
    allProfilesSubtitle: 'Bir Yerde',
    quickAccess: 'Suretli Giris',
    advantagesTitle: 'Ustunlukler',
    advantagesSubtitle: 've Kuponlar',
    specialDiscounts: 'Xususi Endirimler',
    brandOffers: 'Marka Teklifleri',
    messagesTitle: 'Mesajlari',
    messagesSubtitle: 'Izle',
    instantNotifications: 'Ani Bildirisler',
    manageFromOne: 'Bir Yerden Idare Et',
    appointmentsTitle: 'Gorusleri',
    appointmentsSubtitle: 'Idare Et',
    calendar: 'Teqvim',
    customers: 'Musteriler',
    statsTitle1: 'Statistikalar',
    statsTitle2: 've',
    statsSubtitle: 'Analizler',
    referralTitle1: 'Dostlarini',
    referralTitle2: 'Devet Et',
    referralSubtitle: 'Mukafat Qazan',
  },
};

// Device configurations
const iosDevice = { name: 'iPhone 17 Pro Max', width: 1320, height: 2868 };
const androidDevice = { name: 'Galaxy S25+', width: 1440, height: 3088 };

// Preview width
const PREVIEW_WIDTH = 280;

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  gradient: string;
}

interface HeroSlide {
  id: number;
  type: 'hero';
  image: string;
  title: string;
  subtitle: string;
}

interface AppSlide {
  id: number;
  type: 'app';
  image: string;
  title: string;
  subtitle?: string;
  gradient: string;
}

type SlideType = HeroSlide | AppSlide;

// ============================================================
// Edit Overrides Types
// ============================================================
interface EditOverride {
  text?: string;
  offsetX?: number;
  offsetY?: number;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
}

type EditOverrides = Record<string, EditOverride>;

// Screenshot overrides per slide (for replacing phone mockup images)
type ScreenshotOverrides = Record<number, string>;

// ============================================================
// Layer Types
// ============================================================
interface LayerInfo {
  id: string;
  name: string;
  type: 'background' | 'effect' | 'decoration' | 'text' | 'image' | 'phone';
  visible: boolean;
  preview?: string;
}

// ============================================================
// EditableText Component - Inline text editing with drag & toolbar
// ============================================================
function EditableText({
  elementId,
  slideIndex,
  defaultText,
  editMode,
  editOverrides,
  onUpdateOverride,
  selectedElement,
  onSelectElement,
  className,
  style,
  tag: Tag = 'span',
  scale,
}: {
  elementId: string;
  slideIndex: number;
  defaultText: string;
  editMode: boolean;
  editOverrides: EditOverrides;
  onUpdateOverride: (key: string, override: Partial<EditOverride>) => void;
  selectedElement: string | null;
  onSelectElement: (key: string | null) => void;
  className?: string;
  style?: React.CSSProperties;
  tag?: 'h2' | 'p' | 'span' | 'div';
  scale: number;
}) {
  const key = `${slideIndex}_${elementId}`;
  const override = editOverrides[key];
  const textContent = override?.text ?? defaultText;
  const ref = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const isSelected = selectedElement === key;

  const offsetX = override?.offsetX ?? 0;
  const offsetY = override?.offsetY ?? 0;

  // Build override styles
  const overrideStyle: React.CSSProperties = {
    ...style,
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    position: 'relative' as const,
    cursor: editMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: editMode ? 'text' as const : 'auto' as const,
  };

  if (override?.fontSize) {
    overrideStyle.fontSize = `${override.fontSize}px`;
  }
  if (override?.fontWeight) {
    overrideStyle.fontWeight = override.fontWeight;
  }
  if (override?.color) {
    overrideStyle.color = override.color;
  }

  // Handle mouse down for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || isEditing) return;
    // Don't start drag if clicking inside contentEditable
    if ((e.target as HTMLElement).isContentEditable) return;

    e.preventDefault();
    e.stopPropagation();
    onSelectElement(key);

    const actualScale = scale;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offsetX,
      oy: offsetY,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = (e.clientX - dragStartRef.current.x) / scale;
      const dy = (e.clientY - dragStartRef.current.y) / scale;
      onUpdateOverride(key, {
        offsetX: dragStartRef.current.ox + dx,
        offsetY: dragStartRef.current.oy + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, scale, key, onUpdateOverride]);

  // Handle double-click to edit
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    onSelectElement(key);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        // Select all text
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  };

  // Handle blur - save text
  const handleBlur = () => {
    if (ref.current) {
      const newText = ref.current.innerText.trim();
      if (newText !== defaultText) {
        onUpdateOverride(key, { text: newText });
      } else {
        // If back to original, remove text override
        onUpdateOverride(key, { text: undefined });
      }
    }
    setIsEditing(false);
  };

  // Handle keydown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
    if (e.key === 'Escape') {
      if (ref.current) {
        ref.current.innerText = defaultText;
      }
      setIsEditing(false);
      onSelectElement(null);
    }
  };

  // Handle click to select
  const handleClick = (e: React.MouseEvent) => {
    if (!editMode) return;
    e.stopPropagation();
    onSelectElement(key);
  };

  if (!editMode) {
    // Normal render - no edit capabilities
    return (
      <Tag className={className} style={overrideStyle}>
        {textContent}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as any}
      className={`${className} ${isSelected ? 'outline outline-2 outline-green-400 outline-offset-2' : 'hover:outline hover:outline-1 hover:outline-dashed hover:outline-white/40 hover:outline-offset-2'}`}
      style={overrideStyle}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {textContent}
    </Tag>
  );
}

// ============================================================
// FloatingToolbar - Shows near selected element
// ============================================================
function FloatingToolbar({
  elementKey,
  editOverrides,
  onUpdateOverride,
  onDeselect,
  onReset,
  containerRef,
  scale,
}: {
  elementKey: string;
  editOverrides: EditOverrides;
  onUpdateOverride: (key: string, override: Partial<EditOverride>) => void;
  onDeselect: () => void;
  onReset: (key: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
}) {
  const override = editOverrides[elementKey] ?? {};
  const currentFontSize = override.fontSize;
  const currentBold = override.fontWeight === 'bold' || override.fontWeight === '700';
  const currentColor = override.color ?? '#ffffff';

  const colorOptions = [
    { label: 'White', value: '#ffffff' },
    { label: 'Green', value: '#16a34a' },
    { label: 'Gray', value: '#9ca3af' },
    { label: 'Black', value: '#111827' },
    { label: 'Yellow', value: '#facc15' },
  ];

  return (
    <div
      className="fixed z-[200] bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl px-3 py-2 flex items-center gap-2"
      style={{ top: '8px', left: '50%', transform: 'translateX(-50%)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Font size controls */}
      <div className="flex items-center gap-1 border-r border-white/20 pr-2">
        <button
          onClick={() => {
            const current = currentFontSize ?? 130;
            onUpdateOverride(elementKey, { fontSize: Math.max(20, current - 10) });
          }}
          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center font-bold transition-colors"
          title="Kucult"
        >
          A-
        </button>
        <span className="text-white/60 text-xs w-8 text-center font-mono">{currentFontSize ?? '--'}</span>
        <button
          onClick={() => {
            const current = currentFontSize ?? 130;
            onUpdateOverride(elementKey, { fontSize: current + 10 });
          }}
          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center font-bold transition-colors"
          title="Buyut"
        >
          A+
        </button>
      </div>

      {/* Bold toggle */}
      <button
        onClick={() => {
          onUpdateOverride(elementKey, { fontWeight: currentBold ? 'normal' : 'bold' });
        }}
        className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-bold transition-colors border-r border-white/20 mr-1 ${currentBold ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        title="Kalin"
      >
        B
      </button>

      {/* Color picker */}
      <div className="flex items-center gap-1 border-r border-white/20 pr-2">
        {colorOptions.map((c) => (
          <button
            key={c.value}
            onClick={() => onUpdateOverride(elementKey, { color: c.value })}
            className={`w-5 h-5 rounded-full border-2 transition-all ${currentColor === c.value ? 'border-green-400 scale-125' : 'border-white/30 hover:border-white/60'}`}
            style={{ backgroundColor: c.value }}
            title={c.label}
          />
        ))}
      </div>

      {/* Reset position */}
      <button
        onClick={() => onUpdateOverride(elementKey, { offsetX: 0, offsetY: 0 })}
        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        title="Pozisyonu Sifirla"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Reset all */}
      <button
        onClick={() => onReset(elementKey)}
        className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 flex items-center justify-center transition-colors"
        title="Tum Degisiklikleri Sifirla"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* Close */}
      <button
        onClick={onDeselect}
        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition-colors ml-1"
        title="Kapat"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ============================================================
// Export Modal Component
// ============================================================
function ExportModal({
  currentSlide,
  currentPlatform,
  currentLanguage,
  onClose,
  onExportCurrent,
  onExportPlatform,
  onExportBulk,
}: {
  currentSlide: number;
  currentPlatform: 'ios' | 'android';
  currentLanguage: Language;
  onClose: () => void;
  onExportCurrent: () => void;
  onExportPlatform: (platform: 'ios' | 'android') => void;
  onExportBulk: (platforms: ('ios' | 'android')[], languages: Language[]) => void;
}) {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [selectedPlatforms, setSelectedPlatforms] = useState<('ios' | 'android')[]>(['ios', 'android']);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>(['tr', 'en']);

  const allLanguages: { code: Language; label: string }[] = [
    { code: 'tr', label: 'Turkce' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Espanol' },
    { code: 'it', label: 'Italiano' },
    { code: 'fr', label: 'Francais' },
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' },
    { code: 'az', label: 'Azerbaycanca' },
  ];

  const togglePlatform = (p: 'ios' | 'android') => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleLanguage = (l: Language) => {
    setSelectedLanguages((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    );
  };

  const selectAllLanguages = () => setSelectedLanguages(allLanguages.map((l) => l.code));
  const deselectAllLanguages = () => setSelectedLanguages([]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Export Screenshots</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'single' ? 'bg-green-600 text-white' : 'text-white/70 hover:text-white'}`}
          >
            Tekli Indir
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'bulk' ? 'bg-green-600 text-white' : 'text-white/70 hover:text-white'}`}
          >
            Toplu Indir
          </button>
        </div>

        {activeTab === 'single' ? (
          <div className="space-y-3">
            <button
              onClick={onExportCurrent}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Slide {currentSlide + 1} Indir</p>
                  <p className="text-white/50 text-sm">
                    {currentPlatform === 'ios' ? 'iOS' : 'Android'} - {currentLanguage.toUpperCase()}
                  </p>
                </div>
                <svg className="w-5 h-5 text-white/50 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>

            <div className="border-t border-white/10 my-4" />

            <button
              onClick={() => onExportPlatform('ios')}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">Tum iOS Screenshots</p>
                    <p className="text-white/50 text-sm">10 slide - {currentLanguage.toUpperCase()}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>

            <button
              onClick={() => onExportPlatform('android')}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">Tum Android Screenshots</p>
                    <p className="text-white/50 text-sm">10 slide - {currentLanguage.toUpperCase()}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-white/50 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-white/70 text-sm mb-2">Platform Sec</p>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePlatform('ios')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${selectedPlatforms.includes('ios') ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                >
                  <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                  iOS
                </button>
                <button
                  onClick={() => togglePlatform('android')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${selectedPlatforms.includes('android') ? 'bg-green-500 text-white' : 'bg-white/10 text-white/50'}`}
                >
                  <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                  Android
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/70 text-sm">Dil Sec</p>
                <div className="flex gap-2">
                  <button onClick={selectAllLanguages} className="text-xs text-green-400 hover:text-green-300">Tumu</button>
                  <span className="text-white/30">|</span>
                  <button onClick={deselectAllLanguages} className="text-xs text-white/50 hover:text-white/70">Temizle</button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {allLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${selectedLanguages.includes(lang.code) ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50 hover:text-white'}`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/50 text-sm">
                  Toplam: <span className="text-white font-medium">{10 * selectedPlatforms.length * selectedLanguages.length}</span> screenshot
                </p>
              </div>
              <button
                onClick={() => onExportBulk(selectedPlatforms, selectedLanguages)}
                disabled={selectedPlatforms.length === 0 || selectedLanguages.length === 0}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Toplu Indir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const initialSlides: SlideType[] = [
  { id: 1, type: 'hero', image: '/ev-hero.jpg', title: '', subtitle: '' },
  { id: 2, type: 'app', image: '/IMG_9524.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 3, type: 'app', image: '/IMG_9526.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 4, type: 'app', image: '/IMG_9526.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 5, type: 'app', image: '/IMG_9528.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 6, type: 'app', image: '/IMG_9532.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 7, type: 'app', image: '/IMG_9531.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 8, type: 'app', image: '/IMG_9530.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 9, type: 'app', image: '/IMG_9533.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 10, type: 'app', image: '/IMG_9534.PNG', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
];

// Context menu component
function ContextMenu({ x, y, onClose, onReplace, onReset }: { x: number; y: number; onClose: () => void; onReplace: () => void; onReset: () => void }) {
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <div className="fixed z-[100] bg-gray-800 rounded-xl shadow-2xl border border-white/20 py-2 min-w-[180px]" style={{ left: x, top: y }}>
      <button onClick={onReplace} className="w-full px-4 py-2.5 text-left text-white hover:bg-white/10 flex items-center gap-3 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        Resmi Degistir
      </button>
      <button onClick={onReset} className="w-full px-4 py-2.5 text-left text-white/60 hover:bg-white/10 flex items-center gap-3 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Varsayilana Don
      </button>
    </div>
  );
}

// ============================================================
// LayersPanel Component
// ============================================================
function LayersPanel({
  slides,
  currentSlide,
  onSlideSelect,
  layers,
  selectedLayer,
  onLayerSelect,
  onToggleVisibility,
  editOverrides,
  onUpdateOverride,
  onResetOverride,
  screenshotOverrides,
  bgOverrides,
  onUpdateBg,
  onResetBg,
  onTriggerPhoneFilePicker,
  platform,
  previewWidth,
}: {
  slides: SlideType[];
  currentSlide: number;
  onSlideSelect: (index: number) => void;
  layers: LayerInfo[];
  selectedLayer: string | null;
  onLayerSelect: (id: string | null) => void;
  onToggleVisibility: (slideIndex: number, layerId: string) => void;
  editOverrides: EditOverrides;
  onUpdateOverride: (key: string, override: Partial<EditOverride>) => void;
  onResetOverride: (key: string) => void;
  screenshotOverrides: ScreenshotOverrides;
  bgOverrides: Record<number, { gradient?: string; glowColor?: string; glowOpacity?: number; showCircles?: boolean; bgImage?: string }>;
  onUpdateBg: (index: number, update: Partial<{ gradient?: string; glowColor?: string; glowOpacity?: number; showCircles?: boolean; bgImage?: string }>) => void;
  onResetBg: (index: number) => void;
  onTriggerPhoneFilePicker: (index: number) => void;
  platform: 'ios' | 'android';
  previewWidth: number;
}) {
  const currentDevice = platform === 'ios' ? iosDevice : androidDevice;
  const thumbW = 56;
  const thumbH = Math.round((thumbW / currentDevice.width) * currentDevice.height);

  // Layer type icons
  const getLayerIcon = (type: LayerInfo['type']) => {
    switch (type) {
      case 'background':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      case 'effect':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'decoration':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
          </svg>
        );
      case 'text':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        );
      case 'image':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Get selected layer's info
  const selectedLayerInfo = layers.find(l => l.id === selectedLayer);

  // Build property editor for selected layer
  const renderProperties = () => {
    if (!selectedLayerInfo) return null;

    const layerId = selectedLayerInfo.id;
    const layerType = selectedLayerInfo.type;

    if (layerType === 'text') {
      const key = `${currentSlide}_${layerId}`;
      const override = editOverrides[key] ?? {};
      const currentFontSize = override.fontSize;
      const currentBold = override.fontWeight === 'bold' || override.fontWeight === '700';
      const currentColor = override.color ?? '#ffffff';
      const offsetX = override.offsetX ?? 0;
      const offsetY = override.offsetY ?? 0;

      return (
        <div className="p-3 space-y-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Metin Ozellikleri</p>

          {/* Font size */}
          <div>
            <p className="text-white/50 text-[10px] mb-1">Yazi Boyutu</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateOverride(key, { fontSize: Math.max(20, (currentFontSize ?? 130) - 10) })}
                className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-white/60 text-[10px] w-8 text-center font-mono">{currentFontSize ?? '--'}</span>
              <button
                onClick={() => onUpdateOverride(key, { fontSize: (currentFontSize ?? 130) + 10 })}
                className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Bold */}
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-[10px]">Kalin</p>
            <button
              onClick={() => onUpdateOverride(key, { fontWeight: currentBold ? 'normal' : 'bold' })}
              className={`w-8 h-5 rounded-full transition-colors relative ${currentBold ? 'bg-green-600' : 'bg-white/20'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${currentBold ? 'left-3.5' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Color */}
          <div>
            <p className="text-white/50 text-[10px] mb-1">Renk</p>
            <div className="flex gap-1.5">
              {[
                { label: 'Beyaz', value: '#ffffff' },
                { label: 'Yesil', value: '#16a34a' },
                { label: 'Gri', value: '#9ca3af' },
                { label: 'Siyah', value: '#111827' },
                { label: 'Sari', value: '#facc15' },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => onUpdateOverride(key, { color: c.value })}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${currentColor === c.value ? 'border-green-400 scale-110' : 'border-white/20'}`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Position */}
          <div>
            <p className="text-white/50 text-[10px] mb-1">Pozisyon (x, y)</p>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[10px] font-mono">{Math.round(offsetX)}, {Math.round(offsetY)}</span>
              <button
                onClick={() => onUpdateOverride(key, { offsetX: 0, offsetY: 0 })}
                className="text-[9px] text-white/40 hover:text-white/60 underline"
              >
                Sifirla
              </button>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => onResetOverride(key)}
            className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] rounded-lg transition-colors"
          >
            Tum Degisiklikleri Sifirla
          </button>
        </div>
      );
    }

    if (layerType === 'phone' || layerType === 'image') {
      return (
        <div className="p-3 space-y-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Gorsel Ozellikleri</p>
          {selectedLayerInfo.preview && (
            <div className="w-full h-20 rounded-lg overflow-hidden bg-black/30">
              <img src={selectedLayerInfo.preview} alt="" className="w-full h-full object-cover object-top" />
            </div>
          )}
          <button
            onClick={() => onTriggerPhoneFilePicker(currentSlide)}
            className="w-full py-2 bg-white/10 hover:bg-white/15 text-white text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Gorseli Degistir
          </button>
        </div>
      );
    }

    if (layerType === 'background') {
      const bg = bgOverrides[currentSlide] ?? {};
      const glowColor = bg.glowColor ?? '22,163,74';
      const glowOpacity = bg.glowOpacity ?? 0.4;

      return (
        <div className="p-3 space-y-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Arka Plan Ozellikleri</p>

          {/* Glow Color */}
          <div>
            <p className="text-white/50 text-[10px] mb-1.5">Isik Rengi</p>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: 'Yesil', value: '22,163,74' },
                { label: 'Mavi', value: '37,99,235' },
                { label: 'Mor', value: '147,51,234' },
                { label: 'Turuncu', value: '249,115,22' },
                { label: 'Kirmizi', value: '220,38,38' },
                { label: 'Cyan', value: '6,182,212' },
                { label: 'Pembe', value: '236,72,153' },
                { label: 'Beyaz', value: '255,255,255' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onUpdateBg(currentSlide, { glowColor: value })}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${glowColor === value ? 'border-white scale-110' : 'border-white/20'}`}
                  style={{ background: `rgb(${value})` }}
                  title={label}
                />
              ))}
            </div>
          </div>

          {/* Glow Opacity */}
          <div>
            <p className="text-white/50 text-[10px] mb-1">Isik Yogunlugu: {Math.round(glowOpacity * 100)}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(glowOpacity * 100)}
              onChange={(e) => onUpdateBg(currentSlide, { glowOpacity: parseInt(e.target.value) / 100 })}
              className="w-full accent-green-500 h-1"
            />
          </div>

          {/* Background Image */}
          <div>
            <p className="text-white/50 text-[10px] mb-1.5">Arka Plan Resmi</p>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) onUpdateBg(currentSlide, { bgImage: URL.createObjectURL(file) });
                  };
                  input.click();
                }}
                className="flex-1 py-1.5 bg-white/10 hover:bg-white/15 text-white text-[10px] rounded-lg transition-colors"
              >
                Resim Yukle
              </button>
              {bg.bgImage && (
                <button
                  onClick={() => onUpdateBg(currentSlide, { bgImage: undefined })}
                  className="px-2 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-[10px] rounded-lg transition-colors"
                >
                  Kaldir
                </button>
              )}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => onResetBg(currentSlide)}
            className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-white/40 text-[10px] rounded-lg transition-colors"
          >
            Varsayilana Don
          </button>
        </div>
      );
    }

    if (layerType === 'effect') {
      const bg = bgOverrides[currentSlide] ?? {};
      const glowColor = bg.glowColor ?? '22,163,74';
      const glowOpacity = bg.glowOpacity ?? 0.4;

      return (
        <div className="p-3 space-y-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Isik Efekti Ozellikleri</p>

          <div>
            <p className="text-white/50 text-[10px] mb-1.5">Renk</p>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { label: 'Yesil', value: '22,163,74' },
                { label: 'Mavi', value: '37,99,235' },
                { label: 'Mor', value: '147,51,234' },
                { label: 'Turuncu', value: '249,115,22' },
                { label: 'Kirmizi', value: '220,38,38' },
                { label: 'Cyan', value: '6,182,212' },
                { label: 'Pembe', value: '236,72,153' },
                { label: 'Beyaz', value: '255,255,255' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onUpdateBg(currentSlide, { glowColor: value })}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${glowColor === value ? 'border-white scale-110' : 'border-white/20'}`}
                  style={{ background: `rgb(${value})` }}
                  title={label}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/50 text-[10px] mb-1">Yogunluk: {Math.round(glowOpacity * 100)}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(glowOpacity * 100)}
              onChange={(e) => onUpdateBg(currentSlide, { glowOpacity: parseInt(e.target.value) / 100 })}
              className="w-full accent-green-500 h-1"
            />
          </div>
        </div>
      );
    }

    if (layerType === 'decoration') {
      const bg = bgOverrides[currentSlide] ?? {};
      return (
        <div className="p-3 space-y-3">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Dekoratif Daireler</p>
          <div className="flex items-center justify-between">
            <p className="text-white/50 text-[10px]">Gorunurluk</p>
            <button
              onClick={() => onUpdateBg(currentSlide, { showCircles: bg.showCircles === false ? true : false })}
              className={`w-8 h-5 rounded-full transition-colors relative ${bg.showCircles !== false ? 'bg-green-600' : 'bg-white/20'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${bg.showCircles !== false ? 'left-3.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed top-0 right-0 w-[320px] h-screen bg-gray-950 border-l border-white/10 z-[60] flex flex-col overflow-hidden">
      {/* Panel Header */}
      <div className="px-4 py-3 border-b border-white/10 flex-shrink-0">
        <h3 className="text-white text-sm font-semibold">Slide & Katmanlar</h3>
      </div>

      {/* Slide Thumbnails */}
      <div className="px-3 py-2 border-b border-white/10 flex-shrink-0">
        <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium mb-2">Slide'lar</p>
        <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideSelect(index)}
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all ${
                currentSlide === index
                  ? 'bg-green-600/20 border border-green-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`relative rounded overflow-hidden flex-shrink-0 ${
                  currentSlide === index ? 'ring-1 ring-green-400' : ''
                }`}
                style={{ width: thumbW, height: thumbH, background: '#111' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-[8px] font-mono">{index + 1}</span>
                </div>
              </div>
              {/* Slide info */}
              <div className="flex-1 text-left min-w-0">
                <p className={`text-[11px] font-medium truncate ${currentSlide === index ? 'text-green-400' : 'text-white/70'}`}>
                  Slide {index + 1}
                </p>
                <p className="text-[9px] text-white/30 truncate">
                  {slide.type === 'hero' ? 'Hero' : 'App'}
                </p>
              </div>
              {/* Active indicator */}
              {currentSlide === index && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Layers Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-3 py-2 flex-shrink-0">
          <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">
            Katmanlar - Slide {currentSlide + 1}
          </p>
        </div>

        {/* Layer list */}
        <div className="flex-1 overflow-y-auto px-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => onLayerSelect(selectedLayer === layer.id ? null : layer.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all mb-0.5 ${
                selectedLayer === layer.id
                  ? 'bg-green-600/20 border border-green-500/40'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              {/* Visibility toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility(currentSlide, layer.id);
                }}
                className={`w-5 h-5 rounded flex items-center justify-center transition-colors flex-shrink-0 ${
                  layer.visible ? 'text-white/60 hover:text-white' : 'text-white/20 hover:text-white/40'
                }`}
                title={layer.visible ? 'Gizle' : 'Goster'}
              >
                {layer.visible ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>

              {/* Layer type icon */}
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                selectedLayer === layer.id ? 'text-green-400' : 'text-white/40'
              }`}>
                {getLayerIcon(layer.type)}
              </div>

              {/* Layer name */}
              <span className={`text-[11px] truncate flex-1 ${
                selectedLayer === layer.id ? 'text-green-400 font-medium' : layer.visible ? 'text-white/70' : 'text-white/30 line-through'
              }`}>
                {layer.name}
              </span>

              {/* Preview thumbnail for image/phone */}
              {layer.preview && (
                <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0 bg-black/30">
                  <img src={layer.preview} alt="" className="w-full h-full object-cover object-top" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Properties section (when layer selected) */}
        {selectedLayerInfo && (
          <div className="flex-shrink-0 border-t border-white/10 max-h-[300px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {renderProperties()}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const iosRefs = useRef<(HTMLDivElement | null)[]>([]);
  const androidRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<Language>('tr');
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);
  const [slides, setSlides] = useState<SlideType[]>(initialSlides);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; slideIndex: number } | null>(null);
  const [replacingSlide, setReplacingSlide] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [showEditPanel, setShowEditPanel] = useState(false);

  // Inline editor state
  const [editOverrides, setEditOverrides] = useState<EditOverrides>({});
  const [screenshotOverrides, setScreenshotOverrides] = useState<ScreenshotOverrides>({});
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [phoneDragOver, setPhoneDragOver] = useState<number | null>(null);
  const phoneFileInputRef = useRef<HTMLInputElement>(null);

  // Phone horizontal position per slide
  const [phoneOffsets, setPhoneOffsets] = useState<Record<number, number>>({});
  const [draggingPhone, setDraggingPhone] = useState(false);
  const phoneDragStart = useRef<{ x: number; startOffset: number } | null>(null);
  const [phoneReplacingSlide, setPhoneReplacingSlide] = useState<number | null>(null);

  // Layer panel state
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({});

  // Background overrides per slide
  const [bgOverrides, setBgOverrides] = useState<Record<number, {
    gradient?: string;
    glowColor?: string;
    glowOpacity?: number;
    showCircles?: boolean;
    bgImage?: string;
  }>>({});

  const getBg = (index: number) => bgOverrides[index] ?? {};

  const updateBg = (index: number, update: Partial<typeof bgOverrides[number]>) => {
    setBgOverrides(prev => ({ ...prev, [index]: { ...prev[index], ...update } }));
  };

  const resetBg = (index: number) => {
    setBgOverrides(prev => {
      const n = { ...prev };
      delete n[index];
      return n;
    });
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  // Layer visibility helper
  const isLayerVisible = (slideIndex: number, layerId: string): boolean => {
    const key = `${slideIndex}_${layerId}`;
    return layerVisibility[key] !== false; // visible by default
  };

  const toggleLayerVisibility = (slideIndex: number, layerId: string) => {
    const key = `${slideIndex}_${layerId}`;
    setLayerVisibility(prev => ({
      ...prev,
      [key]: prev[key] === false ? true : false,
    }));
  };

  // Get layers info for a slide
  const getSlideLayersInfo = useCallback((index: number): LayerInfo[] => {
    const slide = slides[index];
    if (!slide) return [];

    const slideImage = screenshotOverrides[index] ?? slide.image;

    if (slide.type === 'hero') {
      return [
        { id: 'logo', name: 'Logo', type: 'image', visible: isLayerVisible(index, 'logo'), preview: '/vmob-logo-colored.png' },
        { id: 'heroTitle', name: 'Baslik', type: 'text', visible: isLayerVisible(index, 'heroTitle') },
        { id: 'heroSubtitle', name: 'Alt Baslik', type: 'text', visible: isLayerVisible(index, 'heroSubtitle') },
        { id: 'bg', name: 'Arka Plan Resmi', type: 'image', visible: isLayerVisible(index, 'bg'), preview: slideImage },
      ];
    }

    // App slides
    const layers: LayerInfo[] = [];

    // Phone mockup
    layers.push({
      id: 'phone',
      name: 'Telefon Mockup',
      type: 'phone',
      visible: isLayerVisible(index, 'phone'),
      preview: slideImage,
    });

    // Title(s)
    layers.push({
      id: 'title',
      name: 'Baslik',
      type: 'text',
      visible: isLayerVisible(index, 'title'),
    });

    // Subtitle
    layers.push({
      id: 'subtitle',
      name: 'Alt Baslik',
      type: 'text',
      visible: isLayerVisible(index, 'subtitle'),
    });

    // Badges based on slide
    const badgeMap: Record<number, string[]> = {
      2: ['badge_digitalCard', 'badge_biolink', 'badge_vehicleProfile', 'badge_petProfile'],
      3: ['badge_nfcTouch', 'badge_qrScan', 'badge_linkShare'],
      4: ['badge_quickAccess'],
      5: ['badge_specialDiscounts', 'badge_brandOffers'],
      6: ['badge_instantNotifications', 'badge_manageFromOne'],
      7: ['badge_calendar', 'badge_customers'],
    };

    const badges = badgeMap[index];
    if (badges) {
      badges.forEach((badgeId, i) => {
        layers.push({
          id: badgeId,
          name: `Badge ${i + 1}`,
          type: 'text',
          visible: isLayerVisible(index, badgeId),
        });
      });
    }

    // Decorative circles (slides 4-9)
    if (index >= 4 && index <= 9) {
      layers.push({
        id: 'circles',
        name: 'Dekoratif Daireler',
        type: 'decoration',
        visible: isLayerVisible(index, 'circles'),
      });
    }

    // Glow effect
    layers.push({
      id: 'glow',
      name: 'Isik Efekti',
      type: 'effect',
      visible: isLayerVisible(index, 'glow'),
    });

    // Background
    layers.push({
      id: 'bg',
      name: 'Arka Plan',
      type: 'background',
      visible: isLayerVisible(index, 'bg'),
    });

    return layers;
  }, [slides, screenshotOverrides, layerVisibility]);

  // Update override for an element
  const handleUpdateOverride = useCallback((key: string, override: Partial<EditOverride>) => {
    setEditOverrides((prev) => {
      const existing = prev[key] ?? {};
      const updated = { ...existing, ...override };
      // Clean up undefined values
      Object.keys(updated).forEach((k) => {
        if (updated[k as keyof EditOverride] === undefined) {
          delete updated[k as keyof EditOverride];
        }
      });
      // If empty, remove the key
      if (Object.keys(updated).length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: updated };
    });
  }, []);

  // Reset a single element override
  const handleResetOverride = useCallback((key: string) => {
    setEditOverrides((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
    setSelectedElement(null);
  }, []);

  // Reset all overrides for current slide
  const handleResetAllSlideOverrides = useCallback((slideIndex: number) => {
    setEditOverrides((prev) => {
      const next: EditOverrides = {};
      for (const [key, val] of Object.entries(prev)) {
        if (!key.startsWith(`${slideIndex}_`)) {
          next[key] = val;
        }
      }
      return next;
    });
    setScreenshotOverrides((prev) => {
      const { [slideIndex]: _, ...rest } = prev;
      return rest;
    });
    setSelectedElement(null);
  }, []);

  // Handle screenshot replacement for phone mockup
  const handlePhoneScreenshotUpload = useCallback((slideIndex: number, file: File) => {
    const url = URL.createObjectURL(file);
    setScreenshotOverrides((prev) => ({ ...prev, [slideIndex]: url }));
  }, []);

  const handlePhoneFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && phoneReplacingSlide !== null) {
      handlePhoneScreenshotUpload(phoneReplacingSlide, file);
      setPhoneReplacingSlide(null);
    }
    e.target.value = '';
  };

  const triggerPhoneFilePicker = (index: number) => {
    setPhoneReplacingSlide(index);
    setTimeout(() => phoneFileInputRef.current?.click(), 50);
  };

  // Get the effective image for a slide (considering screenshot overrides)
  const getSlideImage = (slide: SlideType, index: number) => {
    return screenshotOverrides[index] ?? slide.image;
  };

  // Update slide image
  const updateSlideImage = (index: number, newImage: string) => {
    setSlides(prev => prev.map((s, i) => i === index ? { ...s, image: newImage } : s));
  };

  // Handle file upload for slide image
  const handleImageUpload = (index: number, file: File) => {
    const url = URL.createObjectURL(file);
    updateSlideImage(index, url);
  };

  // Handle drag & drop on slide
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(index, file);
    }
  };

  // Handle right click on slide
  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, slideIndex: index });
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replacingSlide !== null) {
      handleImageUpload(replacingSlide, file);
      setReplacingSlide(null);
    }
    e.target.value = '';
  };

  // Trigger file picker for a slide
  const triggerFilePicker = (index: number) => {
    setReplacingSlide(index);
    setContextMenu(null);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  // Reset slide to original
  const resetSlide = (index: number) => {
    setSlides(prev => prev.map((s, i) => i === index ? initialSlides[i] : s));
    setContextMenu(null);
  };

  // Current device based on platform
  const currentDevice = platform === 'ios' ? iosDevice : androidDevice;
  const previewHeight = Math.round((PREVIEW_WIDTH / currentDevice.width) * currentDevice.height);
  const scale = PREVIEW_WIDTH / currentDevice.width;

  const captureSlide = async (index: number, plat: 'ios' | 'android'): Promise<string | null> => {
    const refs = plat === 'ios' ? iosRefs : androidRefs;
    const device = plat === 'ios' ? iosDevice : androidDevice;
    const element = refs.current[index];
    if (!element) return null;

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        width: device.width,
        height: device.height,
        pixelRatio: 1,
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      });
      return dataUrl;
    } catch (error) {
      console.error('Capture failed:', error);
      return null;
    }
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const exportCurrentSlide = async () => {
    setShowExportModal(false);
    setExporting(`${platform}-${currentSlide}`);
    const dataUrl = await captureSlide(currentSlide, platform);
    if (dataUrl) {
      downloadFile(dataUrl, `vmob-${platform}-${language}-${currentSlide + 1}.png`);
    }
    setExporting(null);
  };

  const exportPlatformAll = async (plat: 'ios' | 'android') => {
    setShowExportModal(false);
    const zip = new JSZip();
    const folder = zip.folder(`vmob-${plat}-${language}`);

    setExportProgress({ current: 0, total: slides.length });

    setPlatform(plat);
    await new Promise((r) => setTimeout(r, 200));

    for (let i = 0; i < slides.length; i++) {
      setExportProgress({ current: i + 1, total: slides.length });
      const dataUrl = await captureSlide(i, plat);
      if (dataUrl && folder) {
        const base64Data = dataUrl.split(',')[1];
        folder.file(`slide-${i + 1}.png`, base64Data, { base64: true });
      }
      await new Promise((r) => setTimeout(r, 100));
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    downloadFile(url, `vmob-${plat}-${language}.zip`);
    URL.revokeObjectURL(url);

    setExportProgress(null);
  };

  const exportBulk = async (platforms: ('ios' | 'android')[], languages: Language[]) => {
    setShowExportModal(false);
    const zip = new JSZip();
    const total = slides.length * platforms.length * languages.length;
    let current = 0;

    setExportProgress({ current: 0, total });

    for (const plat of platforms) {
      const platformFolder = zip.folder(plat === 'ios' ? 'ios' : 'android');
      setPlatform(plat);
      await new Promise((r) => setTimeout(r, 200));

      for (const lang of languages) {
        const langFolder = platformFolder?.folder(lang);
        setLanguage(lang);
        await new Promise((r) => setTimeout(r, 300));

        for (let i = 0; i < slides.length; i++) {
          current++;
          setExportProgress({ current, total });
          const dataUrl = await captureSlide(i, plat);
          if (dataUrl && langFolder) {
            const base64Data = dataUrl.split(',')[1];
            langFolder.file(`slide-${i + 1}.png`, base64Data, { base64: true });
          }
          await new Promise((r) => setTimeout(r, 100));
        }
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    downloadFile(url, `vmob-screenshots.zip`);
    URL.revokeObjectURL(url);

    setExportProgress(null);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = PREVIEW_WIDTH + 16;
      const containerWidth = carouselRef.current.clientWidth;
      const targetScroll = index * slideWidth - (containerWidth / 2) + (PREVIEW_WIDTH / 2);
      carouselRef.current.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const slideWidth = PREVIEW_WIDTH + 16;
        const scrollLeft = carouselRef.current.scrollLeft;
        const newSlide = Math.round(scrollLeft / slideWidth);
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < slides.length) {
          setCurrentSlide(newSlide);
        }
      }
    };
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide]);

  // Click outside to deselect
  useEffect(() => {
    if (!showEditPanel || !selectedElement) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't deselect if clicking toolbar or editable element
      if (target.closest('[data-toolbar]') || target.closest('[data-editable]')) return;
      setSelectedElement(null);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [showEditPanel, selectedElement]);

  // Copy-paste between slides
  const [clipboard, setClipboard] = useState<{ type: 'element'; data: EditOverride; elementId: string } | { type: 'phone'; image: string } | null>(null);

  useEffect(() => {
    if (!showEditPanel) return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl+C / Cmd+C - copy selected element
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedElement) {
        e.preventDefault();
        const override = editOverrides[selectedElement];
        const elementId = selectedElement.split('_').slice(1).join('_');
        if (override) {
          setClipboard({ type: 'element', data: { ...override }, elementId });
        }
      }
      // Ctrl+V / Cmd+V - paste to current slide
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboard) {
        e.preventDefault();
        if (clipboard.type === 'element') {
          const key = `${currentSlide}_${clipboard.elementId}`;
          handleUpdateOverride(key, clipboard.data);
        } else if (clipboard.type === 'phone') {
          setScreenshotOverrides(prev => ({ ...prev, [currentSlide]: clipboard.image }));
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showEditPanel, selectedElement, clipboard, currentSlide, editOverrides]);

  // Shared props for EditableText
  const editableProps = (slideIndex: number, elementId: string, defaultText: string) => ({
    elementId,
    slideIndex,
    defaultText,
    editMode: showEditPanel,
    editOverrides,
    onUpdateOverride: handleUpdateOverride,
    selectedElement,
    onSelectElement: setSelectedElement,
    scale,
  });

  // Phone mockup click handler for edit mode - uses display:contents to avoid layout changes
  const renderPhoneClickZone = (slideIndex: number, children: React.ReactNode) => {
    if (!showEditPanel) return children;

    return (
      <>
        {children}
      </>
    );
  };

  // Render slide content
  const renderSlideContent = (
    slide: SlideType,
    index: number,
    exportWidth: number,
    exportHeight: number
  ) => {
    const slideImage = getSlideImage(slide, index);

    if (slide.type === 'hero') {
      return (
        <>
          {isLayerVisible(index, 'bg') && (
            <img src={slideImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 15%, rgba(255,255,255,0) 40%)' }} />
          <div className="absolute bottom-[120px]" style={{ left: isRTL ? 'auto' : '80px', right: isRTL ? '80px' : 'auto', direction: isRTL ? 'rtl' : 'ltr' }} data-editable>
            {isLayerVisible(index, 'heroTitle') && (
              <EditableText
                {...editableProps(index, 'heroTitle', t.heroTitle)}
                tag="h2"
                className="text-[88px] font-bold text-gray-900 leading-tight"
              />
            )}
            {isLayerVisible(index, 'heroSubtitle') && (
              <EditableText
                {...editableProps(index, 'heroSubtitle', t.heroSubtitle)}
                tag="p"
                className="text-[88px] font-light text-gray-900 leading-tight"
              />
            )}
            {isLayerVisible(index, 'logo') && (
              <img src="/vmob-logo-colored.png" alt="vMob" className="h-[100px] mt-8" />
            )}
          </div>
          {/* Clickable zone for hero background replacement */}
          {showEditPanel && (
            <div
              className="absolute inset-0 z-0 cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                triggerPhoneFilePicker(index);
              }}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setPhoneDragOver(index); }}
              onDragLeave={(e) => { e.stopPropagation(); setPhoneDragOver(null); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPhoneDragOver(null);
                const file = e.dataTransfer.files[0];
                if (file?.type.startsWith('image/')) handlePhoneScreenshotUpload(index, file);
              }}
            >
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl px-4 py-2 text-white text-[28px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                Arkaplan Degistir
              </div>
            </div>
          )}
        </>
      );
    }

    // Common glow background (with overrides)
    const bg = getBg(index);
    const glowColor = bg.glowColor ?? '22,163,74';
    const glowOp = bg.glowOpacity ?? 0.4;
    const glowBg = (
      <>
        {bg.bgImage && isLayerVisible(index, 'bg') && <img src={bg.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        {isLayerVisible(index, 'glow') && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full" style={{ width: '1200px', height: '1200px', top: '35%', left: '50%', transform: 'translateX(-50%)', background: `radial-gradient(circle, rgba(${glowColor},${glowOp}) 0%, rgba(${glowColor},0) 60%)`, filter: 'blur(100px)' }} />
          </div>
        )}
      </>
    );

    // Phone mockup component
    const PhoneMockup = ({ image, width = 1150, bottom = -450 }: { image: string; width?: number; bottom?: number }) => {
      if (!isLayerVisible(index, 'phone')) return null;
      const offsetX = phoneOffsets[index] ?? 0;
      return (
        <div
          className="absolute z-10"
          style={{
            bottom: `${bottom}px`,
            left: `calc(50% + ${offsetX}px)`,
            transform: 'translateX(-50%)',
            cursor: showEditPanel ? (draggingPhone ? 'grabbing' : 'grab') : 'default',
          }}
          onMouseDown={showEditPanel ? (e) => {
            e.stopPropagation();
            e.preventDefault();
            setDraggingPhone(true);
            phoneDragStart.current = { x: e.clientX, startOffset: offsetX };
            const onMove = (ev: MouseEvent) => {
              if (!phoneDragStart.current) return;
              const dx = (ev.clientX - phoneDragStart.current.x) / scale;
              setPhoneOffsets(prev => ({ ...prev, [index]: phoneDragStart.current!.startOffset + dx }));
            };
            const onUp = () => {
              setDraggingPhone(false);
              phoneDragStart.current = null;
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          } : undefined}
        >
          <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: `${width}px` }}>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
            <div className="relative overflow-hidden rounded-[80px] bg-white">
              <img src={image} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} draggable={false} />
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[300px] h-[10px] bg-white/30 rounded-full" />
          </div>
        </div>
      );
    };

    // Slide 2: Biolink
    if (index === 1) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }} data-editable>
            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
              {isLayerVisible(index, 'title') && (
                <>
                  <EditableText
                    {...editableProps(index, 'biolinkTitle1', t.biolinkTitle1)}
                    tag="h2"
                    className="text-[130px] font-bold text-white leading-none"
                  />
                  <EditableText
                    {...editableProps(index, 'biolinkTitle2', t.biolinkTitle2)}
                    tag="h2"
                    className="text-[130px] font-bold text-white leading-none"
                  />
                </>
              )}
              {isLayerVisible(index, 'subtitle') && (
                <>
                  <EditableText
                    {...editableProps(index, 'biolinkSubtitle1', t.biolinkSubtitle1)}
                    tag="p"
                    className="text-[130px] font-light text-green-600 leading-none mt-2"
                  />
                  {t.biolinkSubtitle2 && (
                    <EditableText
                      {...editableProps(index, 'biolinkSubtitle2', t.biolinkSubtitle2)}
                      tag="p"
                      className="text-[130px] font-light text-green-600 leading-none"
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {/* Charging brand logos circle */}
          <div className="absolute" style={{ top: '600px', left: '100px', width: '1500px', height: '1500px', transform: 'rotate(-45deg)', overflow: 'visible' }}>
            <div className="absolute inset-0 rounded-full border-[4px] border-white/40" />
            <div className="absolute rounded-full border-[3px] border-white/30" style={{ top: '150px', left: '150px', right: '150px', bottom: '150px' }} />
            <div className="absolute rounded-full border-[2px] border-white/25" style={{ top: '300px', left: '300px', right: '300px', bottom: '300px' }} />
            {/* Outer ring - 8 logos */}
            {[
              { src: '/logos/shell.png', x: 0, y: -750 },
              { src: '/logos/tesla.png', x: 530, y: -530 },
              { src: '/logos/zes.png', x: 750, y: 0 },
              { src: '/logos/trugo.png', x: 530, y: 530 },
              { src: '/logos/esarj.png', x: 0, y: 750 },
              { src: '/logos/aksa.png', x: -530, y: 530 },
              { src: '/logos/sharz.png', x: -750, y: 0 },
              { src: '/logos/dcharge.png', x: -530, y: -530 },
            ].map(({ src, x, y }, i) => (
              <div key={`o${i}`} className="absolute flex items-center justify-center" style={{ left: `calc(50% + ${x}px - 50px)`, top: `calc(50% + ${y}px - 50px)`, transform: 'rotate(45deg)' }}>
                <div className="w-[100px] h-[100px] rounded-full bg-white/90 flex items-center justify-center shadow-lg p-3">
                  <img src={src} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
            {/* Middle ring - 6 logos */}
            {[
              { src: '/logos/wat.png', x: 300, y: -520 },
              { src: '/logos/ovolt.png', x: 600, y: 0 },
              { src: '/logos/voltrun.png', x: 300, y: 520 },
              { src: '/logos/beefull.png', x: -300, y: 520 },
              { src: '/logos/oncharge.png', x: -600, y: 0 },
              { src: '/logos/electrise.png', x: -300, y: -520 },
            ].map(({ src, x, y }, i) => (
              <div key={`m${i}`} className="absolute flex items-center justify-center" style={{ left: `calc(50% + ${x}px - 40px)`, top: `calc(50% + ${y}px - 40px)`, transform: 'rotate(45deg)' }}>
                <div className="w-[80px] h-[80px] rounded-full bg-white/80 flex items-center justify-center shadow-md p-2.5">
                  <img src={src} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
            {/* Inner ring - 4 logos */}
            {[
              { src: '/logos/otojet.png', x: 318, y: -318 },
              { src: '/logos/fortis.png', x: 318, y: 318 },
              { src: '/logos/e-power.png', x: -318, y: 318 },
              { src: '/logos/5_sarj.png', x: -318, y: -318 },
            ].map(({ src, x, y }, i) => (
              <div key={`i${i}`} className="absolute flex items-center justify-center" style={{ left: `calc(50% + ${x}px - 30px)`, top: `calc(50% + ${y}px - 30px)`, transform: 'rotate(45deg)' }}>
                <div className="w-[65px] h-[65px] rounded-full bg-white/70 flex items-center justify-center shadow p-2">
                  <img src={src} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
          {isLayerVisible(index, 'phone') && renderPhoneClickZone(index, (
            <div className="absolute z-10" style={{ bottom: '-200px', right: '-150px', transform: 'rotate(8deg)' }}>
              <div className="relative bg-black rounded-[80px] p-5 shadow-2xl" style={{ width: '900px' }}>
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[240px] h-[60px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[70px] bg-white">
                  <img src={slideImage} alt="" className="w-full h-auto" style={{ maxHeight: '1900px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }

    // Slide 3: Profiles
    if (index === 2) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }} data-editable>
            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
              {isLayerVisible(index, 'title') && (
                <>
                  <EditableText
                    {...editableProps(index, 'profilesTitle1', t.profilesTitle1)}
                    tag="h2"
                    className="text-[130px] font-bold text-white leading-none"
                  />
                  <EditableText
                    {...editableProps(index, 'profilesTitle2', t.profilesTitle2)}
                    tag="h2"
                    className="text-[130px] font-bold text-white leading-none"
                  />
                </>
              )}
              {isLayerVisible(index, 'subtitle') && (
                <EditableText
                  {...editableProps(index, 'profilesSubtitle', t.profilesSubtitle)}
                  tag="p"
                  className="text-[130px] font-light text-green-600 leading-none mt-2"
                />
              )}
              <div className="flex flex-col gap-6 mt-16">
                {[
                  { Icon: HiOutlineIdentification, text: t.digitalCard, id: 'badge_digitalCard' },
                  { Icon: HiOutlineLink, text: t.biolink, id: 'badge_biolink' },
                  { Icon: FaCar, text: t.vehicleProfile, id: 'badge_vehicleProfile' },
                  { Icon: FaPaw, text: t.petProfile, id: 'badge_petProfile' },
                ].map(({ Icon, text, id }, i) => (
                  isLayerVisible(index, id) && (
                    <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Icon className="text-green-600" style={{ fontSize: '70px' }} />
                      <EditableText
                        {...editableProps(index, id, text)}
                        tag="span"
                        className="text-white text-[42px]"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
          {isLayerVisible(index, 'phone') && renderPhoneClickZone(index, (
            <div className="absolute z-10" style={{ bottom: '-200px', left: '40%', transform: 'rotate(5deg)' }}>
              <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: '1150px' }}>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[80px] bg-white">
                  <img src={slideImage} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }

    // Slide 4: Share
    if (index === 3) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }} data-editable>
            <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-end'}`}>
              {isLayerVisible(index, 'title') && (
                <EditableText
                  {...editableProps(index, 'shareTitle', t.shareTitle)}
                  tag="h2"
                  className="text-[130px] font-bold text-white leading-none"
                />
              )}
              {isLayerVisible(index, 'subtitle') && (
                <EditableText
                  {...editableProps(index, 'shareSubtitle', t.shareSubtitle)}
                  tag="p"
                  className="text-[130px] font-light text-green-600 leading-none mt-2"
                />
              )}
              <div className="flex flex-col gap-6 mt-16">
                {[
                  { Icon: HiOutlineWifi, text: t.nfcTouch, id: 'badge_nfcTouch' },
                  { Icon: HiOutlineQrcode, text: t.qrScan, id: 'badge_qrScan' },
                  { Icon: HiOutlineLink, text: t.linkShare, id: 'badge_linkShare' },
                ].map(({ Icon, text, id }, i) => (
                  isLayerVisible(index, id) && (
                    <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Icon className="text-green-600" style={{ fontSize: '70px' }} />
                      <EditableText
                        {...editableProps(index, id, text)}
                        tag="span"
                        className="text-white text-[42px]"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
          {isLayerVisible(index, 'phone') && renderPhoneClickZone(index, (
            <div className="absolute z-10" style={{ bottom: '-210px', left: '-60%', transform: 'rotate(5deg)' }}>
              <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: '1150px' }}>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[80px] bg-white">
                  <img src={slideImage} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }

    // Slide 5-10: Standard layouts
    const slideConfigs: Record<number, { title: string[]; titleIds: string[]; subtitle: string; subtitleId: string; align: 'left' | 'right' | 'center'; badges?: { Icon: any; text: string; id: string }[] }> = {
      4: { title: [t.allProfilesTitle1, t.allProfilesTitle2], titleIds: ['allProfilesTitle1', 'allProfilesTitle2'], subtitle: t.allProfilesSubtitle, subtitleId: 'allProfilesSubtitle', align: 'left', badges: [{ Icon: HiOutlineUserGroup, text: t.quickAccess, id: 'badge_quickAccess' }] },
      5: { title: [t.advantagesTitle], titleIds: ['advantagesTitle'], subtitle: t.advantagesSubtitle, subtitleId: 'advantagesSubtitle', align: 'right', badges: [{ Icon: HiOutlineCreditCard, text: t.specialDiscounts, id: 'badge_specialDiscounts' }, { Icon: HiOutlineGlobeAlt, text: t.brandOffers, id: 'badge_brandOffers' }] },
      6: { title: [t.messagesTitle], titleIds: ['messagesTitle'], subtitle: t.messagesSubtitle, subtitleId: 'messagesSubtitle', align: 'left', badges: [{ Icon: HiOutlineChat, text: t.instantNotifications, id: 'badge_instantNotifications' }, { Icon: HiOutlineMail, text: t.manageFromOne, id: 'badge_manageFromOne' }] },
      7: { title: [t.appointmentsTitle], titleIds: ['appointmentsTitle'], subtitle: t.appointmentsSubtitle, subtitleId: 'appointmentsSubtitle', align: 'center', badges: [{ Icon: HiOutlineCalendar, text: t.calendar, id: 'badge_calendar' }, { Icon: HiOutlineUser, text: t.customers, id: 'badge_customers' }] },
      8: { title: [t.statsTitle1, t.statsTitle2], titleIds: ['statsTitle1', 'statsTitle2'], subtitle: t.statsSubtitle, subtitleId: 'statsSubtitle', align: 'left' },
      9: { title: [t.referralTitle1, t.referralTitle2], titleIds: ['referralTitle1', 'referralTitle2'], subtitle: t.referralSubtitle, subtitleId: 'referralSubtitle', align: 'right' },
    };

    const config = slideConfigs[index];
    if (!config) return null;

    const alignClass = config.align === 'center' ? 'items-center' : isRTL ? (config.align === 'left' ? 'items-end' : 'items-start') : (config.align === 'left' ? 'items-start' : 'items-end');

    return (
      <>
        {glowBg}
        {/* Decorative circles */}
        {isLayerVisible(index, 'circles') && (bg.showCircles !== false) && (() => {
          const circlePositions: Record<number, { left?: string; right?: string; transform?: string }> = {
            4: { right: '-400px' },
            5: { left: '-400px' },
            6: { right: '-400px' },
            7: { left: '50%', transform: 'translateX(-50%)' },
            8: { right: '-400px' },
            9: { left: '-400px' },
          };
          const pos = circlePositions[index];
          if (!pos) return null;
          return (
            <div className="absolute" style={{ top: '400px', width: '1200px', height: '1200px', ...pos }}>
              <div className="absolute inset-0 rounded-full border-[3px] border-white/20" />
              <div className="absolute rounded-full border-[2px] border-white/15" style={{ top: '150px', left: '150px', right: '150px', bottom: '150px' }} />
              <div className="absolute rounded-full border-[2px] border-white/10" style={{ top: '300px', left: '300px', right: '300px', bottom: '300px' }} />
            </div>
          );
        })()}
        <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }} data-editable>
          <div className={`flex flex-col ${alignClass}`}>
            {isLayerVisible(index, 'title') && config.title.map((line, i) => (
              <EditableText
                key={i}
                {...editableProps(index, config.titleIds[i], line)}
                tag="h2"
                className="text-[130px] font-bold text-white leading-none"
              />
            ))}
            {isLayerVisible(index, 'subtitle') && (
              <EditableText
                {...editableProps(index, config.subtitleId, config.subtitle)}
                tag="p"
                className="text-[130px] font-light text-green-600 leading-none mt-2"
              />
            )}
            {config.badges && (
              <div className={`flex ${config.align === 'center' ? 'flex-row justify-center' : 'flex-col'} gap-6 mt-16`}>
                {config.badges.map(({ Icon, text, id }, i) => (
                  isLayerVisible(index, id) && (
                    <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Icon className="text-green-600" style={{ fontSize: '70px' }} />
                      <EditableText
                        {...editableProps(index, id, text)}
                        tag="span"
                        className="text-white text-[42px]"
                      />
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Phone(s) */}
        {index === 7 ? (
          <>
            {isLayerVisible(index, 'phone') && (
              <>
                <div className="absolute z-10" style={{ bottom: '-50px', left: '-5%', transform: 'rotate(-8deg)' }}>
                  <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '850px' }}>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[50px] bg-black rounded-full z-10" />
                    <div className="relative overflow-hidden rounded-[60px] bg-white">
                      <img src="/IMG_9526.PNG" alt="" className="w-full h-auto" style={{ maxHeight: '1600px', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  </div>
                </div>
                {renderPhoneClickZone(index, (
                  <div className="absolute z-20" style={{ bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '900px' }}>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[220px] h-[55px] bg-black rounded-full z-10" />
                      <div className="relative overflow-hidden rounded-[60px] bg-white">
                        <img src={slideImage} alt="" className="w-full h-auto" style={{ maxHeight: '1700px', objectFit: 'cover', objectPosition: 'top' }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute z-10" style={{ bottom: '-50px', right: '-5%', transform: 'rotate(8deg)' }}>
                  <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '850px' }}>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[50px] bg-black rounded-full z-10" />
                    <div className="relative overflow-hidden rounded-[60px] bg-white">
                      <img src="/IMG_9529.PNG" alt="" className="w-full h-auto" style={{ maxHeight: '1600px', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <PhoneMockup image={slideImage} />
        )}
      </>
    );
  };

  // Count edits for current slide
  const currentSlideEditCount = Object.keys(editOverrides).filter(k => k.startsWith(`${currentSlide}_`)).length + (screenshotOverrides[currentSlide] ? 1 : 0);

  // Get current slide layers
  const currentLayers = getSlideLayersInfo(currentSlide);

  return (
    <main className="min-h-screen bg-gray-900 p-6" onClick={() => { if (showEditPanel) setSelectedElement(null); }}>
      <div className="max-w-full mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-4 px-4">
          <div className="flex flex-wrap gap-1 bg-white/10 rounded-xl p-1">
            {[
              { code: 'tr' as Language, label: 'TR' },
              { code: 'en' as Language, label: 'EN' },
              { code: 'de' as Language, label: 'DE' },
              { code: 'es' as Language, label: 'ES' },
              { code: 'it' as Language, label: 'IT' },
              { code: 'fr' as Language, label: 'FR' },
              { code: 'ar' as Language, label: 'AR' },
              { code: 'az' as Language, label: 'AZ' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === lang.code ? 'bg-green-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selector */}
        <div className="flex justify-center mb-4">
          <div className="flex bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setPlatform('ios')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${platform === 'ios' ? 'bg-blue-500 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              iOS
            </button>
            <button
              onClick={() => setPlatform('android')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${platform === 'android' ? 'bg-green-500 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Android
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4" style={{ minHeight: '52px' }}>
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">vMob Screenshots</h1>
            <p className="text-gray-400 text-sm mt-1">
              {currentDevice.name} ({currentDevice.width} x {currentDevice.height})
            </p>
          </div>
          <div className="flex gap-2 items-center flex-shrink-0">
            {/* Edit mode indicator */}
            {showEditPanel && currentSlideEditCount > 0 && (
              <button
                onClick={() => handleResetAllSlideOverrides(currentSlide)}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg transition-colors flex-shrink-0"
                title="Bu slide icin tum degisiklikleri sifirla"
              >
                Sifirla ({currentSlideEditCount})
              </button>
            )}
            <button
              onClick={() => {
                setShowEditPanel(!showEditPanel);
                if (showEditPanel) {
                  setSelectedElement(null);
                  setSelectedLayer(null);
                }
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm ${showEditPanel ? 'bg-green-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Duzenle
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              disabled={!!exporting || !!exportProgress}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              {exportProgress ? (
                <>Exporting {exportProgress.current}/{exportProgress.total}...</>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </>
              )}
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-green-600 w-6' : 'bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-shrink-0 snap-center transition-all duration-300 flex flex-col gap-3"
              style={{ transform: currentSlide === index ? 'scale(1)' : 'scale(0.95)', opacity: currentSlide === index ? 1 : 0.7 }}
              onClick={() => scrollToSlide(index)}
              onContextMenu={(e) => handleContextMenu(e, index)}
              onDragOver={(e) => { e.preventDefault(); setDragOver(index); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div
                ref={slideContainerRef}
                className={`relative ${showEditPanel ? 'overflow-visible' : 'overflow-hidden'} rounded-2xl shadow-xl cursor-pointer border-2 transition-colors ${dragOver === index ? 'border-green-400 bg-green-400/10' : showEditPanel && currentSlide === index ? 'border-green-500/50 shadow-green-500/20 shadow-lg' : platform === 'ios' ? 'border-blue-500/30' : 'border-green-500/30'}`}
                style={{ width: PREVIEW_WIDTH, height: previewHeight }}
              >
                {/* Drop overlay */}
                {dragOver === index && (
                  <div className="absolute inset-0 z-50 bg-green-600/20 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <div className="text-white text-center">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p className="text-xs font-medium">Birak</p>
                    </div>
                  </div>
                )}
                {/* iOS render */}
                <div
                  ref={(el) => { iosRefs.current[index] = el; }}
                  className={`absolute inset-0 ${slide.type === 'app' ? `bg-gradient-to-b ${slide.gradient}` : ''}`}
                  style={{
                    width: iosDevice.width,
                    height: iosDevice.height,
                    transform: `scale(${PREVIEW_WIDTH / iosDevice.width})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                    display: platform === 'ios' ? 'block' : 'none',
                  }}
                >
                  {renderSlideContent(slide, index, iosDevice.width, iosDevice.height)}
                </div>
                {/* Android render */}
                <div
                  ref={(el) => { androidRefs.current[index] = el; }}
                  className={`absolute inset-0 ${slide.type === 'app' ? `bg-gradient-to-b ${slide.gradient}` : ''}`}
                  style={{
                    width: androidDevice.width,
                    height: androidDevice.height,
                    transform: `scale(${PREVIEW_WIDTH / androidDevice.width})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                    display: platform === 'android' ? 'block' : 'none',
                  }}
                >
                  {renderSlideContent(slide, index, androidDevice.width, androidDevice.height)}
                </div>
              </div>
              {/* Slide label */}
              <div className="flex items-center justify-center gap-2">
                <p className="text-center text-white/50 text-xs">Slide {index + 1}</p>
                {/* Show edit indicator dot */}
                {(Object.keys(editOverrides).some(k => k.startsWith(`${index}_`)) || screenshotOverrides[index]) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" title="Duzenlenmis" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white text-sm rounded-lg transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white text-sm rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Side Layers Panel */}
      {showEditPanel && (
        <LayersPanel
          slides={slides}
          currentSlide={currentSlide}
          onSlideSelect={scrollToSlide}
          layers={currentLayers}
          selectedLayer={selectedLayer}
          onLayerSelect={setSelectedLayer}
          onToggleVisibility={toggleLayerVisibility}
          editOverrides={editOverrides}
          onUpdateOverride={handleUpdateOverride}
          onResetOverride={handleResetOverride}
          screenshotOverrides={screenshotOverrides}
          bgOverrides={bgOverrides}
          onUpdateBg={updateBg}
          onResetBg={resetBg}
          onTriggerPhoneFilePicker={triggerPhoneFilePicker}
          platform={platform}
          previewWidth={PREVIEW_WIDTH}
        />
      )}

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} />
      <input ref={phoneFileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoneFileInputChange} />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onReplace={() => triggerFilePicker(contextMenu.slideIndex)}
          onReset={() => resetSlide(contextMenu.slideIndex)}
        />
      )}

      {/* Floating Toolbar (shows when an element is selected in edit mode) */}
      {showEditPanel && selectedElement && (
        <div data-toolbar>
          <FloatingToolbar
            elementKey={selectedElement}
            editOverrides={editOverrides}
            onUpdateOverride={handleUpdateOverride}
            onDeselect={() => setSelectedElement(null)}
            onReset={handleResetOverride}
            containerRef={slideContainerRef}
            scale={scale}
          />
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          currentSlide={currentSlide}
          currentPlatform={platform}
          currentLanguage={language}
          onClose={() => setShowExportModal(false)}
          onExportCurrent={exportCurrentSlide}
          onExportPlatform={exportPlatformAll}
          onExportBulk={exportBulk}
        />
      )}
    </main>
  );
}
