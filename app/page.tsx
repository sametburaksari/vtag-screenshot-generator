'use client';

import { useRef, useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp, FaYoutube, FaTiktok, FaSpotify, FaFacebookF, FaPinterestP, FaSnapchatGhost, FaTelegramPlane, FaDiscord, FaTwitch, FaGithub, FaDribbble, FaBehance, FaMediumM, FaRedditAlien, FaVimeoV, FaSoundcloud, FaPatreon, FaSlack, FaCar, FaPaw } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { HiOutlinePhone, HiOutlineMail, HiOutlineGlobeAlt, HiOutlineOfficeBuilding, HiOutlineBriefcase, HiOutlineUser, HiOutlineUserGroup, HiOutlineChat, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineLink, HiOutlineQrcode, HiOutlineWifi, HiOutlineDeviceMobile, HiOutlineCreditCard, HiOutlineIdentification } from 'react-icons/hi';

// Translations
type Language = 'tr' | 'en' | 'de' | 'es' | 'it' | 'fr' | 'ar' | 'az';

const translations = {
  tr: {
    heroTitle: 'Tek Dokunuş,',
    heroSubtitle: 'Sınırsız Bağlantı',
    biolinkTitle1: 'Sosyal',
    biolinkTitle2: 'Medyanı',
    biolinkSubtitle1: 'Tek Linkte',
    biolinkSubtitle2: 'Topla',
    profilesTitle1: 'Tüm',
    profilesTitle2: 'Profillerin',
    profilesSubtitle: 'Tek Yerde',
    digitalCard: 'Dijital Kartvizit',
    biolink: 'Biolink',
    vehicleProfile: 'Araç Profili',
    petProfile: 'Pet Profil',
    shareTitle: 'Anında',
    shareSubtitle: 'Paylaş',
    nfcTouch: 'NFC ile Dokun',
    qrScan: 'QR Okut',
    linkShare: 'Link Paylaş',
    allProfilesTitle1: 'Tüm',
    allProfilesTitle2: 'Profillerin',
    allProfilesSubtitle: 'Bir Arada',
    quickAccess: 'Hızlı Erişim',
    advantagesTitle: 'Avantajlar',
    advantagesSubtitle: 've Kuponlar',
    specialDiscounts: 'Özel İndirimler',
    brandOffers: 'Marka Fırsatları',
    messagesTitle: 'Mesajları',
    messagesSubtitle: 'Takip Et',
    instantNotifications: 'Anlık Bildirimler',
    manageFromOne: 'Tek Yerden Yönet',
    appointmentsTitle: 'Randevuları',
    appointmentsSubtitle: 'Yönet',
    calendar: 'Takvim',
    customers: 'Müşteriler',
    statsTitle1: 'İstatistikler',
    statsTitle2: 've',
    statsSubtitle: 'Analizler',
    referralTitle1: 'Arkadaşını',
    referralTitle2: 'Davet Et',
    referralSubtitle: 'Kazan',
  },
  en: {
    heroTitle: 'One Touch,',
    heroSubtitle: 'Endless Connections',
    biolinkTitle1: 'Your Social',
    biolinkTitle2: 'Media',
    biolinkSubtitle1: 'All in One Link',
    biolinkSubtitle2: '',
    profilesTitle1: 'All Your',
    profilesTitle2: 'Profiles',
    profilesSubtitle: 'In One Place',
    digitalCard: 'Digital Business Card',
    biolink: 'Biolink',
    vehicleProfile: 'Vehicle Profile',
    petProfile: 'Pet Profile',
    shareTitle: 'Instantly',
    shareSubtitle: 'Share',
    nfcTouch: 'Tap with NFC',
    qrScan: 'Scan QR',
    linkShare: 'Share Link',
    allProfilesTitle1: 'All Your',
    allProfilesTitle2: 'Profiles',
    allProfilesSubtitle: 'Together',
    quickAccess: 'Quick Access',
    advantagesTitle: 'Benefits',
    advantagesSubtitle: '& Coupons',
    specialDiscounts: 'Special Discounts',
    brandOffers: 'Brand Offers',
    messagesTitle: 'Track Your',
    messagesSubtitle: 'Messages',
    instantNotifications: 'Instant Notifications',
    manageFromOne: 'Manage From One Place',
    appointmentsTitle: 'Manage',
    appointmentsSubtitle: 'Appointments',
    calendar: 'Calendar',
    customers: 'Customers',
    statsTitle1: 'Statistics',
    statsTitle2: 'and',
    statsSubtitle: 'Analytics',
    referralTitle1: 'Invite Your',
    referralTitle2: 'Friends',
    referralSubtitle: 'Earn Rewards',
  },
  de: {
    heroTitle: 'Eine Berührung,',
    heroSubtitle: 'Grenzenlose Verbindungen',
    biolinkTitle1: 'Deine Social',
    biolinkTitle2: 'Media',
    biolinkSubtitle1: 'Alles in einem Link',
    biolinkSubtitle2: '',
    profilesTitle1: 'Alle deine',
    profilesTitle2: 'Profile',
    profilesSubtitle: 'An einem Ort',
    digitalCard: 'Digitale Visitenkarte',
    biolink: 'Biolink',
    vehicleProfile: 'Fahrzeugprofil',
    petProfile: 'Haustierprofil',
    shareTitle: 'Sofort',
    shareSubtitle: 'Teilen',
    nfcTouch: 'Mit NFC antippen',
    qrScan: 'QR scannen',
    linkShare: 'Link teilen',
    allProfilesTitle1: 'Alle deine',
    allProfilesTitle2: 'Profile',
    allProfilesSubtitle: 'Zusammen',
    quickAccess: 'Schnellzugriff',
    advantagesTitle: 'Vorteile',
    advantagesSubtitle: '& Gutscheine',
    specialDiscounts: 'Sonderrabatte',
    brandOffers: 'Markenangebote',
    messagesTitle: 'Nachrichten',
    messagesSubtitle: 'Verfolgen',
    instantNotifications: 'Sofortige Benachrichtigungen',
    manageFromOne: 'Von einem Ort verwalten',
    appointmentsTitle: 'Termine',
    appointmentsSubtitle: 'Verwalten',
    calendar: 'Kalender',
    customers: 'Kunden',
    statsTitle1: 'Statistiken',
    statsTitle2: 'und',
    statsSubtitle: 'Analysen',
    referralTitle1: 'Freunde',
    referralTitle2: 'Einladen',
    referralSubtitle: 'Belohnungen verdienen',
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
    vehicleProfile: 'Perfil de Vehículo',
    petProfile: 'Perfil de Mascota',
    shareTitle: 'Comparte',
    shareSubtitle: 'al Instante',
    nfcTouch: 'Toca con NFC',
    qrScan: 'Escanea QR',
    linkShare: 'Comparte Enlace',
    allProfilesTitle1: 'Todos tus',
    allProfilesTitle2: 'Perfiles',
    allProfilesSubtitle: 'Juntos',
    quickAccess: 'Acceso Rápido',
    advantagesTitle: 'Beneficios',
    advantagesSubtitle: 'y Cupones',
    specialDiscounts: 'Descuentos Especiales',
    brandOffers: 'Ofertas de Marcas',
    messagesTitle: 'Sigue tus',
    messagesSubtitle: 'Mensajes',
    instantNotifications: 'Notificaciones Instantáneas',
    manageFromOne: 'Gestiona desde un Lugar',
    appointmentsTitle: 'Gestiona',
    appointmentsSubtitle: 'Citas',
    calendar: 'Calendario',
    customers: 'Clientes',
    statsTitle1: 'Estadísticas',
    statsTitle2: 'y',
    statsSubtitle: 'Análisis',
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
    biolinkTitle1: 'Vos Réseaux',
    biolinkTitle2: 'Sociaux',
    biolinkSubtitle1: 'Tout en un Lien',
    biolinkSubtitle2: '',
    profilesTitle1: 'Tous vos',
    profilesTitle2: 'Profils',
    profilesSubtitle: 'En un Seul Endroit',
    digitalCard: 'Carte de Visite Digitale',
    biolink: 'Biolink',
    vehicleProfile: 'Profil Véhicule',
    petProfile: 'Profil Animal',
    shareTitle: 'Partagez',
    shareSubtitle: 'Instantanément',
    nfcTouch: 'Touchez avec NFC',
    qrScan: 'Scannez QR',
    linkShare: 'Partagez le Lien',
    allProfilesTitle1: 'Tous vos',
    allProfilesTitle2: 'Profils',
    allProfilesSubtitle: 'Ensemble',
    quickAccess: 'Accès Rapide',
    advantagesTitle: 'Avantages',
    advantagesSubtitle: 'et Coupons',
    specialDiscounts: 'Réductions Spéciales',
    brandOffers: 'Offres de Marques',
    messagesTitle: 'Suivez vos',
    messagesSubtitle: 'Messages',
    instantNotifications: 'Notifications Instantanées',
    manageFromOne: 'Gérez depuis un Endroit',
    appointmentsTitle: 'Gérez vos',
    appointmentsSubtitle: 'Rendez-vous',
    calendar: 'Calendrier',
    customers: 'Clients',
    statsTitle1: 'Statistiques',
    statsTitle2: 'et',
    statsSubtitle: 'Analyses',
    referralTitle1: 'Invitez vos',
    referralTitle2: 'Amis',
    referralSubtitle: 'Gagnez des Récompenses',
  },
  ar: {
    heroTitle: 'لمسة واحدة،',
    heroSubtitle: 'اتصالات لا حدود لها',
    biolinkTitle1: 'وسائل التواصل',
    biolinkTitle2: 'الاجتماعي',
    biolinkSubtitle1: 'الكل في رابط واحد',
    biolinkSubtitle2: '',
    profilesTitle1: 'جميع',
    profilesTitle2: 'ملفاتك',
    profilesSubtitle: 'في مكان واحد',
    digitalCard: 'بطاقة عمل رقمية',
    biolink: 'بيولينك',
    vehicleProfile: 'ملف السيارة',
    petProfile: 'ملف الحيوان الأليف',
    shareTitle: 'شارك',
    shareSubtitle: 'فوراً',
    nfcTouch: 'المس بـ NFC',
    qrScan: 'امسح QR',
    linkShare: 'شارك الرابط',
    allProfilesTitle1: 'جميع',
    allProfilesTitle2: 'ملفاتك',
    allProfilesSubtitle: 'معاً',
    quickAccess: 'وصول سريع',
    advantagesTitle: 'المزايا',
    advantagesSubtitle: 'والكوبونات',
    specialDiscounts: 'خصومات خاصة',
    brandOffers: 'عروض العلامات التجارية',
    messagesTitle: 'تتبع',
    messagesSubtitle: 'رسائلك',
    instantNotifications: 'إشعارات فورية',
    manageFromOne: 'إدارة من مكان واحد',
    appointmentsTitle: 'إدارة',
    appointmentsSubtitle: 'المواعيد',
    calendar: 'التقويم',
    customers: 'العملاء',
    statsTitle1: 'الإحصائيات',
    statsTitle2: 'و',
    statsSubtitle: 'التحليلات',
    referralTitle1: 'ادعُ',
    referralTitle2: 'أصدقاءك',
    referralSubtitle: 'اكسب مكافآت',
  },
  az: {
    heroTitle: 'Bir Toxunuş,',
    heroSubtitle: 'Sonsuz Əlaqələr',
    biolinkTitle1: 'Sosial',
    biolinkTitle2: 'Medianı',
    biolinkSubtitle1: 'Bir Linkdə Topla',
    biolinkSubtitle2: '',
    profilesTitle1: 'Bütün',
    profilesTitle2: 'Profillərin',
    profilesSubtitle: 'Bir Yerdə',
    digitalCard: 'Rəqəmsal Vizit Kartı',
    biolink: 'Biolink',
    vehicleProfile: 'Avtomobil Profili',
    petProfile: 'Heyvan Profili',
    shareTitle: 'Dərhal',
    shareSubtitle: 'Paylaş',
    nfcTouch: 'NFC ilə Toxun',
    qrScan: 'QR Skan Et',
    linkShare: 'Link Paylaş',
    allProfilesTitle1: 'Bütün',
    allProfilesTitle2: 'Profillərin',
    allProfilesSubtitle: 'Bir Yerdə',
    quickAccess: 'Sürətli Giriş',
    advantagesTitle: 'Üstünlüklər',
    advantagesSubtitle: 'və Kuponlar',
    specialDiscounts: 'Xüsusi Endirimlər',
    brandOffers: 'Marka Təklifləri',
    messagesTitle: 'Mesajları',
    messagesSubtitle: 'İzlə',
    instantNotifications: 'Ani Bildirişlər',
    manageFromOne: 'Bir Yerdən İdarə Et',
    appointmentsTitle: 'Görüşləri',
    appointmentsSubtitle: 'İdarə Et',
    calendar: 'Təqvim',
    customers: 'Müştərilər',
    statsTitle1: 'Statistikalar',
    statsTitle2: 'və',
    statsSubtitle: 'Analizlər',
    referralTitle1: 'Dostlarını',
    referralTitle2: 'Dəvət Et',
    referralSubtitle: 'Mükafat Qazan',
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

// Export Modal Component
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
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'az', label: 'Azərbaycanca' },
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
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'single' ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'}`}
          >
            Tekli İndir
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'bulk' ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'}`}
          >
            Toplu İndir
          </button>
        </div>

        {activeTab === 'single' ? (
          <div className="space-y-3">
            {/* Current Slide */}
            <button
              onClick={onExportCurrent}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Slide {currentSlide + 1} İndir</p>
                  <p className="text-white/50 text-sm">
                    {currentPlatform === 'ios' ? 'iOS' : 'Android'} • {currentLanguage.toUpperCase()}
                  </p>
                </div>
                <svg className="w-5 h-5 text-white/50 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>

            <div className="border-t border-white/10 my-4" />

            {/* All iOS */}
            <button
              onClick={() => onExportPlatform('ios')}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">Tüm iOS Screenshots</p>
                    <p className="text-white/50 text-sm">10 slide • {currentLanguage.toUpperCase()}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </button>

            {/* All Android */}
            <button
              onClick={() => onExportPlatform('android')}
              className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <div>
                    <p className="text-white font-medium">Tüm Android Screenshots</p>
                    <p className="text-white/50 text-sm">10 slide • {currentLanguage.toUpperCase()}</p>
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
            {/* Platform Selection */}
            <div>
              <p className="text-white/70 text-sm mb-2">Platform Seç</p>
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

            {/* Language Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/70 text-sm">Dil Seç</p>
                <div className="flex gap-2">
                  <button onClick={selectAllLanguages} className="text-xs text-orange-400 hover:text-orange-300">Tümü</button>
                  <span className="text-white/30">|</span>
                  <button onClick={deselectAllLanguages} className="text-xs text-white/50 hover:text-white/70">Temizle</button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {allLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${selectedLanguages.includes(lang.code) ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/50 hover:text-white'}`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Export */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/50 text-sm">
                  Toplam: <span className="text-white font-medium">{10 * selectedPlatforms.length * selectedLanguages.length}</span> screenshot
                </p>
              </div>
              <button
                onClick={() => onExportBulk(selectedPlatforms, selectedLanguages)}
                disabled={selectedPlatforms.length === 0 || selectedLanguages.length === 0}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Toplu İndir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const slides: SlideType[] = [
  { id: 1, type: 'hero', image: '/hero.png', title: '', subtitle: '' },
  { id: 2, type: 'app', image: '/dk-profil.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 3, type: 'app', image: '/home.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 4, type: 'app', image: '/home.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 5, type: 'app', image: '/profiles.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 6, type: 'app', image: '/advantages.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 7, type: 'app', image: '/contact-form.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 8, type: 'app', image: '/appointment.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 9, type: 'app', image: '/stats.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
  { id: 10, type: 'app', image: '/refferal.png', title: '', subtitle: '', gradient: 'from-gray-900 via-gray-800 to-black' },
];

export default function Home() {
  const iosRefs = useRef<(HTMLDivElement | null)[]>([]);
  const androidRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<Language>('tr');
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);

  const t = translations[language];
  const isRTL = language === 'ar';

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
      downloadFile(dataUrl, `vtag-${platform}-${language}-${currentSlide + 1}.png`);
    }
    setExporting(null);
  };

  const exportPlatformAll = async (plat: 'ios' | 'android') => {
    setShowExportModal(false);
    const zip = new JSZip();
    const folder = zip.folder(`vtag-${plat}-${language}`);

    setExportProgress({ current: 0, total: slides.length });

    // Make sure we're on the right platform
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
    downloadFile(url, `vtag-${plat}-${language}.zip`);
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
        await new Promise((r) => setTimeout(r, 300)); // Wait for re-render

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
    downloadFile(url, `vtag-screenshots.zip`);
    URL.revokeObjectURL(url);

    setExportProgress(null);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = PREVIEW_WIDTH + 16;
      carouselRef.current.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
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

  // Render slide content
  const renderSlideContent = (
    slide: SlideType,
    index: number,
    exportWidth: number,
    exportHeight: number
  ) => {
    if (slide.type === 'hero') {
      return (
        <>
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 15%, rgba(255,255,255,0) 40%)' }} />
          <div className="absolute bottom-[120px]" style={{ left: isRTL ? 'auto' : '80px', right: isRTL ? '80px' : 'auto', direction: isRTL ? 'rtl' : 'ltr' }}>
            <h2 className="text-[88px] font-bold text-gray-900 leading-tight">{t.heroTitle}</h2>
            <p className="text-[88px] font-light text-gray-900 leading-tight">{t.heroSubtitle}</p>
            <img src="/vtag-logo-dark.png" alt="vTag" className="h-[100px] mt-8" />
          </div>
        </>
      );
    }

    // Common glow background
    const glowBg = (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: '1200px', height: '1200px', top: '35%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 60%)', filter: 'blur(100px)' }} />
      </div>
    );

    // Phone mockup component
    const PhoneMockup = ({ image, width = 1150, bottom = -450 }: { image: string; width?: number; bottom?: number }) => (
      <div className="absolute z-10" style={{ bottom: `${bottom}px`, left: '50%', transform: 'translateX(-50%)' }}>
        <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: `${width}px` }}>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
          <div className="relative overflow-hidden rounded-[80px] bg-white">
            <img src={image} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[300px] h-[10px] bg-white/30 rounded-full" />
        </div>
      </div>
    );

    // Slide 2: Biolink
    if (index === 1) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
              <h2 className="text-[130px] font-bold text-white leading-none">{t.biolinkTitle1}</h2>
              <h2 className="text-[130px] font-bold text-white leading-none">{t.biolinkTitle2}</h2>
              <p className="text-[130px] font-light text-orange-500 leading-none mt-2">{t.biolinkSubtitle1}</p>
              {t.biolinkSubtitle2 && <p className="text-[130px] font-light text-orange-500 leading-none">{t.biolinkSubtitle2}</p>}
            </div>
          </div>
          {/* Social circle */}
          <div className="absolute" style={{ top: '600px', left: '100px', width: '1500px', height: '1500px', transform: 'rotate(-45deg)' }}>
            <div className="absolute inset-0 rounded-full border-[4px] border-white/40" />
            <div className="absolute rounded-full border-[3px] border-white/30" style={{ top: '150px', left: '150px', right: '150px', bottom: '150px' }} />
            <div className="absolute rounded-full border-[2px] border-white/25" style={{ top: '300px', left: '300px', right: '300px', bottom: '300px' }} />
            {[
              { Icon: FaInstagram, left: -375, top: -650 },
              { Icon: FaTwitter, left: -130, top: -710 },
              { Icon: FaFacebookF, left: 130, top: -710 },
              { Icon: FaLinkedinIn, left: 375, top: -650 },
              { Icon: FaWhatsapp, left: 545, top: -490 },
              { Icon: FaYoutube, left: 640, top: -255 },
              { Icon: FaTiktok, left: 660, top: 0 },
              { Icon: FaSpotify, left: 600, top: 250 },
            ].map(({ Icon, left, top }, i) => (
              <div key={i} className="absolute flex items-center justify-center" style={{ left: `calc(50% + ${left}px - 40px)`, top: `calc(50% + ${top}px - 40px)` }}>
                <Icon className="text-white/75 drop-shadow-lg" style={{ fontSize: '80px' }} />
              </div>
            ))}
          </div>
          <div className="absolute z-10" style={{ bottom: '-200px', right: '-150px', transform: 'rotate(8deg)' }}>
            <div className="relative bg-black rounded-[80px] p-5 shadow-2xl" style={{ width: '900px' }}>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[240px] h-[60px] bg-black rounded-full z-10" />
              <div className="relative overflow-hidden rounded-[70px] bg-white">
                <img src={slide.image} alt="" className="w-full h-auto" style={{ maxHeight: '1900px', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </div>
          </div>
        </>
      );
    }

    // Slide 3: Profiles
    if (index === 2) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
              <h2 className="text-[130px] font-bold text-white leading-none">{t.profilesTitle1}</h2>
              <h2 className="text-[130px] font-bold text-white leading-none">{t.profilesTitle2}</h2>
              <p className="text-[130px] font-light text-orange-500 leading-none mt-2">{t.profilesSubtitle}</p>
              <div className="flex flex-col gap-6 mt-16">
                {[
                  { Icon: HiOutlineIdentification, text: t.digitalCard },
                  { Icon: HiOutlineLink, text: t.biolink },
                  { Icon: FaCar, text: t.vehicleProfile },
                  { Icon: FaPaw, text: t.petProfile },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="text-orange-500" style={{ fontSize: '70px' }} />
                    <span className="text-white text-[42px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute z-10" style={{ bottom: '-200px', left: '40%', transform: 'rotate(5deg)' }}>
            <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: '1150px' }}>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
              <div className="relative overflow-hidden rounded-[80px] bg-white">
                <img src={slide.image} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </div>
          </div>
        </>
      );
    }

    // Slide 4: Share
    if (index === 3) {
      return (
        <>
          {glowBg}
          <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-end'}`}>
              <h2 className="text-[130px] font-bold text-white leading-none">{t.shareTitle}</h2>
              <p className="text-[130px] font-light text-orange-500 leading-none mt-2">{t.shareSubtitle}</p>
              <div className="flex flex-col gap-6 mt-16">
                {[
                  { Icon: HiOutlineWifi, text: t.nfcTouch },
                  { Icon: HiOutlineQrcode, text: t.qrScan },
                  { Icon: HiOutlineLink, text: t.linkShare },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="text-orange-500" style={{ fontSize: '70px' }} />
                    <span className="text-white text-[42px]">{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <img src="/apple-wallet-tr.svg" alt="Apple Wallet" style={{ height: '140px' }} />
              </div>
            </div>
          </div>
          <div className="absolute z-10" style={{ bottom: '-210px', left: '-60%', transform: 'rotate(5deg)' }}>
            <div className="relative bg-black rounded-[90px] p-6 shadow-2xl" style={{ width: '1150px' }}>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[75px] bg-black rounded-full z-10" />
              <div className="relative overflow-hidden rounded-[80px] bg-white">
                <img src={slide.image} alt="" className="w-full h-auto" style={{ maxHeight: '2400px', objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </div>
          </div>
        </>
      );
    }

    // Slide 5-10: Standard layouts
    const slideConfigs: Record<number, { title: string[]; subtitle: string; align: 'left' | 'right' | 'center'; badges?: { Icon: any; text: string }[] }> = {
      4: { title: [t.allProfilesTitle1, t.allProfilesTitle2], subtitle: t.allProfilesSubtitle, align: 'left', badges: [{ Icon: HiOutlineUserGroup, text: t.quickAccess }] },
      5: { title: [t.advantagesTitle], subtitle: t.advantagesSubtitle, align: 'right', badges: [{ Icon: HiOutlineCreditCard, text: t.specialDiscounts }, { Icon: HiOutlineGlobeAlt, text: t.brandOffers }] },
      6: { title: [t.messagesTitle], subtitle: t.messagesSubtitle, align: 'left', badges: [{ Icon: HiOutlineChat, text: t.instantNotifications }, { Icon: HiOutlineMail, text: t.manageFromOne }] },
      7: { title: [t.appointmentsTitle], subtitle: t.appointmentsSubtitle, align: 'center', badges: [{ Icon: HiOutlineCalendar, text: t.calendar }, { Icon: HiOutlineUser, text: t.customers }] },
      8: { title: [t.statsTitle1, t.statsTitle2], subtitle: t.statsSubtitle, align: 'left' },
      9: { title: [t.referralTitle1, t.referralTitle2], subtitle: t.referralSubtitle, align: 'right' },
    };

    const config = slideConfigs[index];
    if (!config) return null;

    const alignClass = config.align === 'center' ? 'items-center' : isRTL ? (config.align === 'left' ? 'items-end' : 'items-start') : (config.align === 'left' ? 'items-start' : 'items-end');

    return (
      <>
        {glowBg}
        {/* Decorative circles */}
        {(() => {
          const circlePositions: Record<number, { left?: string; right?: string; transform?: string }> = {
            4: { right: '-400px' },           // Slide 5: right
            5: { left: '-400px' },            // Slide 6: left
            6: { right: '-400px' },           // Slide 7: right
            7: { left: '50%', transform: 'translateX(-50%)' }, // Slide 8: center
            8: { right: '-400px' },           // Slide 9: right
            9: { left: '-400px' },            // Slide 10: left
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
        <div className="absolute top-[100px] z-20 px-16 w-full" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          <div className={`flex flex-col ${alignClass}`}>
            {config.title.map((line, i) => (
              <h2 key={i} className="text-[130px] font-bold text-white leading-none">{line}</h2>
            ))}
            <p className="text-[130px] font-light text-orange-500 leading-none mt-2">{config.subtitle}</p>
            {config.badges && (
              <div className={`flex ${config.align === 'center' ? 'flex-row justify-center' : 'flex-col'} gap-6 mt-16`}>
                {config.badges.map(({ Icon, text }, i) => (
                  <div key={i} className={`flex items-center gap-6 bg-white/10 backdrop-blur-sm px-10 py-5 rounded-3xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon className="text-orange-500" style={{ fontSize: '70px' }} />
                    <span className="text-white text-[42px]">{text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Phone(s) */}
        {index === 7 ? (
          // Multiple phones for appointments
          <>
            <div className="absolute z-10" style={{ bottom: '-50px', left: '-5%', transform: 'rotate(-8deg)' }}>
              <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '850px' }}>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[50px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[60px] bg-white">
                  <img src="/appointment.png" alt="" className="w-full h-auto" style={{ maxHeight: '1600px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
            <div className="absolute z-20" style={{ bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
              <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '900px' }}>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[220px] h-[55px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[60px] bg-white">
                  <img src="/appointment-2.png" alt="" className="w-full h-auto" style={{ maxHeight: '1700px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
            <div className="absolute z-10" style={{ bottom: '-50px', right: '-5%', transform: 'rotate(8deg)' }}>
              <div className="relative bg-black rounded-[70px] p-5 shadow-2xl" style={{ width: '850px' }}>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[50px] bg-black rounded-full z-10" />
                <div className="relative overflow-hidden rounded-[60px] bg-white">
                  <img src="/appointment3.png" alt="" className="w-full h-auto" style={{ maxHeight: '1600px', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <PhoneMockup image={slide.image} />
        )}
      </>
    );
  };

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-full mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-4 px-4">
          <div className="flex flex-wrap gap-1 bg-white/10 rounded-xl p-1">
            {[
              { code: 'tr' as Language, label: '🇹🇷 TR' },
              { code: 'en' as Language, label: '🇺🇸 EN' },
              { code: 'de' as Language, label: '🇩🇪 DE' },
              { code: 'es' as Language, label: '🇪🇸 ES' },
              { code: 'it' as Language, label: '🇮🇹 IT' },
              { code: 'fr' as Language, label: '🇫🇷 FR' },
              { code: 'ar' as Language, label: '🇸🇦 AR' },
              { code: 'az' as Language, label: '🇦🇿 AZ' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === lang.code ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'}`}
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
        <div className="flex items-center justify-between mb-6 px-4">
          <div>
            <h1 className="text-2xl font-bold text-white">vTag Screenshots</h1>
            <p className="text-gray-400 text-sm mt-1">
              {currentDevice.name} ({currentDevice.width} x {currentDevice.height})
            </p>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            disabled={!!exporting || !!exportProgress}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
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

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-500 w-6' : 'bg-white/30 hover:bg-white/50'}`}
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
            >
              <div
                className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer border ${platform === 'ios' ? 'border-blue-500/30' : 'border-green-500/30'}`}
                style={{ width: PREVIEW_WIDTH, height: previewHeight }}
              >
                {/* iOS render (hidden when android selected) */}
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
                {/* Android render (hidden when ios selected) */}
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
              <p className="text-center text-white/50 text-xs">Slide {index + 1}</p>
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
            ← Previous
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white text-sm rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

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
