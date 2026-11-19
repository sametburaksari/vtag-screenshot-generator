'use client';

import { useRef, useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';

// Device: iPhone 16 Pro Max (6.7") — matches IMG_9524–IMG_9534
const device = { width: 1290, height: 2796 };
const PREVIEW_WIDTH = 260;

type SlideType = {
  id: number;
  image: string;
  title: string[];
  subtitle: string;
  align: 'left' | 'right' | 'center';
  gradient: string;
};

const slides: SlideType[] = [
  {
    id: 1,
    image: '/IMG_9625.PNG',
    title: ['Telefon ile', 'Hızlı Giriş'],
    subtitle: 'Saniyeler İçinde',
    align: 'center',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 2,
    image: '/IMG_9626.PNG',
    title: ['Güzelliğin', 'Tek Adresi'],
    subtitle: 'Cebinde',
    align: 'left',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 3,
    image: '/IMG_9627.PNG',
    title: ['QR Kod ile', 'Hızlı'],
    subtitle: 'Check-In',
    align: 'right',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 4,
    image: '/IMG_9628.PNG',
    title: ['Özel', 'Kampanyalar'],
    subtitle: 'Seni Bekliyor',
    align: 'left',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 5,
    image: '/IMG_9629.PNG',
    title: ['Her Şey', 'Bir Arada'],
    subtitle: 'Profilinde',
    align: 'right',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 6,
    image: '/IMG_9630.PNG',
    title: ['Puan Kazan', 'Arkadaşını'],
    subtitle: 'Davet Et',
    align: 'left',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
  {
    id: 7,
    image: '/IMG_9631.PNG',
    title: ['Puanlarını', 'Ödüle'],
    subtitle: 'Dönüştür',
    align: 'right',
    gradient: 'from-[#0d0010] via-[#1a0020] to-[#0d0015]',
  },
];

export default function MelikePage() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<{ current: number; total: number } | null>(null);

  const previewHeight = Math.round((PREVIEW_WIDTH / device.width) * device.height);

  const captureSlide = async (index: number): Promise<string | null> => {
    const el = slideRefs.current[index];
    if (!el) return null;
    try {
      return await htmlToImage.toPng(el, {
        width: device.width,
        height: device.height,
        pixelRatio: 1,
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      });
    } catch {
      return null;
    }
  };

  const download = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.download = filename;
    a.href = dataUrl;
    a.click();
  };

  const exportAll = async () => {
    setExporting(true);
    const zip = new JSZip();
    const folder = zip.folder('melike-appstore');
    setExportProgress({ current: 0, total: slides.length });
    for (let i = 0; i < slides.length; i++) {
      setExportProgress({ current: i + 1, total: slides.length });
      const url = await captureSlide(i);
      if (url && folder) {
        folder.file(`slide-${String(i + 1).padStart(2, '0')}.png`, url.split(',')[1], { base64: true });
      }
      await new Promise((r) => setTimeout(r, 120));
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    download(URL.createObjectURL(blob), 'melike-appstore.zip');
    setExporting(false);
    setExportProgress(null);
  };

  const exportSingle = async (index: number) => {
    setExporting(true);
    const url = await captureSlide(index);
    if (url) download(url, `melike-slide-${index + 1}.png`);
    setExporting(false);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: index * (PREVIEW_WIDTH + 16), behavior: 'smooth' });
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / (PREVIEW_WIDTH + 16));
      if (i >= 0 && i < slides.length) setCurrentSlide(i);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Melike Adıgüzel</h1>
          <p className="text-gray-400 text-sm mt-1">App Store Screenshots · 1290 × 2796</p>
        </div>
        <button
          onClick={exportAll}
          disabled={exporting}
          className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
        >
          {exportProgress
            ? `${exportProgress.current}/${exportProgress.total}`
            : '↓ Tümünü İndir'}
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-pink-500 w-6' : 'bg-white/20 w-2'}`}
          />
        ))}
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="flex-shrink-0 snap-center flex flex-col gap-2 transition-all duration-300"
            style={{ transform: currentSlide === index ? 'scale(1)' : 'scale(0.94)', opacity: currentSlide === index ? 1 : 0.6 }}
            onClick={() => scrollToSlide(index)}
          >
            {/* Preview viewport */}
            <div
              className="relative overflow-hidden rounded-2xl border border-pink-500/30 shadow-xl cursor-pointer"
              style={{ width: PREVIEW_WIDTH, height: previewHeight }}
            >
              {/* Full-res render (scaled down for preview) */}
              <div
                ref={(el) => { slideRefs.current[index] = el; }}
                className={`absolute inset-0 bg-gradient-to-b ${slide.gradient}`}
                style={{
                  width: device.width,
                  height: device.height,
                  transform: `scale(${PREVIEW_WIDTH / device.width})`,
                  transformOrigin: 'top left',
                  overflow: 'hidden',
                }}
              >
                <SlideContent slide={slide} />
              </div>
            </div>
            {/* Label */}
            <div className="flex items-center justify-between px-1">
              <p className="text-white/40 text-xs">Slide {index + 1}</p>
              <button
                onClick={(e) => { e.stopPropagation(); exportSingle(index); }}
                className="text-white/30 hover:text-pink-400 text-xs transition-colors"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-2">
        <button onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-sm rounded-lg transition-colors">← Önceki</button>
        <button onClick={() => scrollToSlide(Math.min(slides.length - 1, currentSlide + 1))} disabled={currentSlide === slides.length - 1} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-sm rounded-lg transition-colors">Sonraki →</button>
      </div>
    </main>
  );
}

function SlideContent({ slide }: { slide: SlideType }) {
  const isLeft = slide.align === 'left';
  const isCenter = slide.align === 'center';

  // Glow orb
  const glowBg = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full"
        style={{
          width: 1400,
          height: 1400,
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );

  const alignClass = isCenter ? 'items-center text-center' : isLeft ? 'items-start text-left' : 'items-end text-right';

  return (
    <>
      {glowBg}

      {/* Text overlay */}
      <div
        className={`absolute top-[120px] z-20 px-[70px] w-full flex flex-col ${alignClass}`}
        style={{ direction: 'ltr' }}
      >
        {slide.title.map((line, i) => (
          <h2 key={i} className="text-[145px] font-bold text-white leading-none tracking-tight">{line}</h2>
        ))}
        <p className="text-[140px] font-light leading-none mt-4" style={{ color: '#f472b6' }}>
          {slide.subtitle}
        </p>
      </div>

      {/* Phone frame with screenshot */}
      <div
        className={`absolute z-10 ${isCenter ? 'left-1/2' : isLeft ? 'right-[-120px]' : 'left-[-120px]'}`}
        style={{ bottom: -600, transform: `${isCenter ? 'translateX(-50%) ' : ''}rotate(${isLeft ? '6deg' : isCenter ? '0deg' : '-6deg'})` }}
      >
        <div
          className="relative rounded-[100px] p-[18px] shadow-2xl"
          style={{ width: 1200, background: '#111' }}
        >
          {/* Dynamic island notch */}
          <div className="absolute top-[28px] left-1/2 -translate-x-1/2 rounded-full z-10" style={{ width: 340, height: 80, background: '#111' }} />
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[88px] bg-white">
            <img
              src={slide.image}
              alt=""
              className="w-full"
              style={{ display: 'block', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 320, height: 12, background: 'rgba(255,255,255,0.25)' }} />
        </div>
      </div>
    </>
  );
}
