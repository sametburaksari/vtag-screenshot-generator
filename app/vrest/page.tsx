'use client';

import { useRef, useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import JSZip from 'jszip';

// Device: iPhone 6.7" App Store — 1290 × 2796
const device = { width: 1290, height: 2796 };
const PREVIEW_WIDTH = 260;

const GRADIENT = 'from-[#1a0308] via-[#2e060c] to-[#12040a]';

type SlideType = {
  id: number;
  image: string;
  title: string[];
  subtitle: string;
  align: 'left' | 'right' | 'center';
};

const slides: SlideType[] = [
  { id: 1, image: '/vrest-login.png', title: ['Restoranını', 'Cebinden'], subtitle: 'Yönet', align: 'center' },
  { id: 2, image: '/vrest-salon.png', title: ['Salonunu', 'Anlık'], subtitle: 'Takip Et', align: 'left' },
  { id: 3, image: '/vrest-ordertaking.png', title: ['Sipariş Al', 'Saniyeler'], subtitle: 'İçinde', align: 'right' },
  { id: 4, image: '/vrest-kitchen.png', title: ['Mutfak', 'Ekranı'], subtitle: 'Tam Uyum', align: 'left' },
  { id: 5, image: '/vrest-manager.png', title: ['Ciro &', 'Performans'], subtitle: 'Anlık', align: 'right' },
  { id: 6, image: '/vrest-menu.png', title: ['Menünü', 'Kolayca'], subtitle: 'Yönet', align: 'left' },
  { id: 7, image: '/vrest-reports.png', title: ['Z Raporu', 'Gün Sonu'], subtitle: 'Tek Tuşla', align: 'right' },
  { id: 8, image: '/vrest-delivery.png', title: ['Paket', 'Servisi'], subtitle: 'Kontrol Altında', align: 'left' },
  { id: 9, image: '/vrest-reservations.png', title: ['Rezervasyon', 'Yönetimi'], subtitle: 'Tek Yerden', align: 'right' },
  { id: 10, image: '/vrest-orders.png', title: ['Siparişleri', 'Anlık'], subtitle: 'İzle', align: 'left' },
];

export default function VRestPage() {
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
    const folder = zip.folder('vrest-appstore');
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
    download(URL.createObjectURL(blob), 'vrest-appstore.zip');
    setExporting(false);
    setExportProgress(null);
  };

  const exportSingle = async (index: number) => {
    setExporting(true);
    const url = await captureSlide(index);
    if (url) download(url, `vrest-slide-${index + 1}.png`);
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
      <div className="flex items-center justify-between mb-6 px-4">
        <div>
          <h1 className="text-2xl font-bold text-white">vRest POS</h1>
          <p className="text-gray-400 text-sm mt-1">App Store Screenshots · 1290 × 2796</p>
        </div>
        <button
          onClick={exportAll}
          disabled={exporting}
          className="px-5 py-2.5 bg-[#E63946] hover:bg-[#c1121f] disabled:bg-gray-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm"
        >
          {exportProgress ? `${exportProgress.current}/${exportProgress.total}` : '↓ Tümünü İndir'}
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-[#E63946] w-6' : 'bg-white/20 w-2'}`}
          />
        ))}
      </div>

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
            <div
              className="relative overflow-hidden rounded-2xl border border-[#E63946]/30 shadow-xl cursor-pointer"
              style={{ width: PREVIEW_WIDTH, height: previewHeight }}
            >
              <div
                ref={(el) => { slideRefs.current[index] = el; }}
                className={`absolute inset-0 bg-gradient-to-b ${GRADIENT}`}
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
            <div className="flex items-center justify-between px-1">
              <p className="text-white/40 text-xs">Slide {index + 1}</p>
              <button
                onClick={(e) => { e.stopPropagation(); exportSingle(index); }}
                className="text-white/30 hover:text-[#FF5A67] text-xs transition-colors"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

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

  const glowBg = (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full"
        style={{
          width: 1400,
          height: 1400,
          top: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(230,57,70,0.42) 0%, rgba(255,90,103,0.2) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );

  const alignClass = isCenter ? 'items-center text-center' : isLeft ? 'items-start text-left' : 'items-end text-right';

  return (
    <>
      {glowBg}

      <div className={`absolute top-[120px] z-20 px-[70px] w-full flex flex-col ${alignClass}`} style={{ direction: 'ltr' }}>
        {slide.title.map((line, i) => (
          <h2 key={i} className="text-[145px] font-bold text-white leading-none tracking-tight">{line}</h2>
        ))}
        <p className="text-[140px] font-light leading-none mt-4" style={{ color: '#FF5A67' }}>{slide.subtitle}</p>
      </div>

      <div
        className={`absolute z-10 ${isCenter ? 'left-1/2' : isLeft ? 'right-[-120px]' : 'left-[-120px]'}`}
        style={{ bottom: -600, transform: `${isCenter ? 'translateX(-50%) ' : ''}rotate(${isLeft ? '6deg' : isCenter ? '0deg' : '-6deg'})` }}
      >
        <div className="relative rounded-[100px] p-[18px] shadow-2xl" style={{ width: 1200, background: '#111' }}>
          <div className="absolute top-[28px] left-1/2 -translate-x-1/2 rounded-full z-10" style={{ width: 340, height: 80, background: '#111' }} />
          <div className="relative overflow-hidden rounded-[88px] bg-white">
            <img src={slide.image} alt="" className="w-full" style={{ display: 'block', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full" style={{ width: 320, height: 12, background: 'rgba(255,255,255,0.25)' }} />
        </div>
      </div>
    </>
  );
}
