import React, { useState, useEffect } from 'react';

// Self-contained inline SVG fallback URIs to guarantee 100% offline reliability
const LOGO_SVG_FALLBACK = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2B231F"/>
      <stop offset="100%" stop-color="#14100E"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3C06B"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8B5E3C"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="96" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="4"/>
  <circle cx="100" cy="100" r="82" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
  <text x="100" y="118" font-family="'Playfair Display', Georgia, serif" font-size="72" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">Y</text>
  <circle cx="140" cy="65" r="4" fill="#F3C06B"/>
  <circle cx="152" cy="78" r="2.5" fill="#D4AF37"/>
  <path d="M60,135 Q80,120 100,135 T140,135" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.8"/>
  <text x="100" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="bold" letter-spacing="3" fill="#E8D8CD" text-anchor="middle">YASHOWORLD</text>
</svg>
`)}`;

const ARTWORK_SVG_FALLBACK = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <radialGradient id="artBg" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#221B18"/>
      <stop offset="50%" stop-color="#181311"/>
      <stop offset="100%" stop-color="#0E0B0A"/>
    </radialGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8E8EE"/>
      <stop offset="40%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8B4513"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#artBg)"/>
  <circle cx="300" cy="270" r="160" fill="none" stroke="url(#goldLine)" stroke-width="2" stroke-dasharray="8 6" opacity="0.4"/>
  <circle cx="300" cy="270" r="120" fill="none" stroke="url(#goldLine)" stroke-width="1.5" opacity="0.3"/>
  <g transform="translate(300,270) scale(1.2)">
    <path d="M-30,-40 C-10,-70 10,-70 30,-40 C50,-10 30,30 0,60 C-30,30 -50,-10 -30,-40 Z" fill="none" stroke="url(#goldLine)" stroke-width="2" opacity="0.8"/>
    <circle cx="0" cy="-10" r="12" fill="#D4AF37" opacity="0.8"/>
  </g>
  <text x="300" y="460" font-family="'Playfair Display', serif" font-size="22" font-weight="600" fill="#E8D8CD" text-anchor="middle" letter-spacing="2">YASHOWORLD RESIN ART</text>
  <text x="300" y="490" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#D4AF37" text-anchor="middle" letter-spacing="4">HANDCRAFTED KEEPSAKE</text>
</svg>
`)}`;

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  isLogo?: boolean;
  priority?: boolean;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc,
  isLogo = false,
  priority = false,
  className = '',
  containerClassName = '',
  onError: customOnError,
  onLoad: customOnLoad,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setCurrentSrc(isLogo ? LOGO_SVG_FALLBACK : ARTWORK_SVG_FALLBACK);
      }
    } else if (currentSrc !== (isLogo ? LOGO_SVG_FALLBACK : ARTWORK_SVG_FALLBACK)) {
      setCurrentSrc(isLogo ? LOGO_SVG_FALLBACK : ARTWORK_SVG_FALLBACK);
    }

    if (customOnError) {
      customOnError(e);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (customOnLoad) {
      customOnLoad(e);
    }
  };

  const finalFallback = isLogo ? LOGO_SVG_FALLBACK : ARTWORK_SVG_FALLBACK;

  return (
    <div className={`relative overflow-hidden ${containerClassName || 'inline-block'}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#221B18]/40 animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
        </div>
      )}
      <img
        {...props}
        src={currentSrc || finalFallback}
        alt={alt}
        loading={priority ? 'eager' : (props.loading || 'lazy')}
        decoding={priority ? 'sync' : (props.decoding || 'async')}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
