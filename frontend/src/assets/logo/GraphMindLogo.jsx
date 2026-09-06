import React from 'react';

/**
 * GraphMindLogo Component
 * Renders the authentic GRAPH Mind 8-node glowing geometric network logo.
 * 
 * Props:
 * - variant: 'full' | 'icon' | 'horizontal'
 * - size: number (height in px, default 40)
 * - showText: boolean
 * - theme: 'light' | 'dark'
 */
export const GraphMindIcon = ({ size = 36, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`graph-mind-icon-svg ${className}`}
    >
      <defs>
        <radialGradient id="gmCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.95"/>
          <stop offset="45%" stopColor="#008B8B" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#0A3C46" stopOpacity="1"/>
        </radialGradient>

        <linearGradient id="gmStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006670"/>
          <stop offset="100%" stopColor="#0A3641"/>
        </linearGradient>

        <radialGradient id="gmNodeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#14808C"/>
          <stop offset="100%" stopColor="#083038"/>
        </radialGradient>
      </defs>

      {/* 8 Connecting Stems */}
      <g stroke="url(#gmStemGrad)" strokeWidth="12" strokeLinecap="round">
        <line x1="100" y1="100" x2="100" y2="34"/>
        <line x1="100" y1="100" x2="146.67" y2="53.33"/>
        <line x1="100" y1="100" x2="166" y2="100"/>
        <line x1="100" y1="100" x2="146.67" y2="146.67"/>
        <line x1="100" y1="100" x2="100" y2="166"/>
        <line x1="100" y1="100" x2="53.33" y2="146.67"/>
        <line x1="100" y1="100" x2="34" y2="100"/>
        <line x1="100" y1="100" x2="53.33" y2="53.33"/>
      </g>

      {/* Outer Central Body Ring */}
      <circle cx="100" cy="100" r="48" fill="#082A32" stroke="#005F6B" strokeWidth="3"/>

      {/* Inner Glowing Core */}
      <circle cx="100" cy="100" r="40" fill="url(#gmCenterGlow)"/>

      {/* Geometric Star Mesh lines */}
      <g stroke="#66E0E0" strokeWidth="1.2" opacity="0.9" fill="none">
        <polygon points="100,68 122.6,77.4 132,100 122.6,122.6 100,132 77.4,122.6 68,100 77.4,77.4"/>
        <polygon points="100,75 125,100 100,125 75,100"/>
        <polygon points="117.7,82.3 117.7,117.7 82.3,117.7 82.3,82.3"/>
        <line x1="100" y1="68" x2="100" y2="132"/>
        <line x1="68" y1="100" x2="132" y2="100"/>
        <line x1="77.4" y1="77.4" x2="122.6" y2="122.6"/>
        <line x1="122.6" y1="77.4" x2="77.4" y2="122.6"/>
      </g>
      
      {/* Core Center Bright Spark */}
      <circle cx="100" cy="100" r="4" fill="#E0FFFF"/>

      {/* 8 Outer Nodes */}
      <circle cx="100" cy="30" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="149.5" cy="50.5" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="170" cy="100" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="149.5" cy="149.5" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="100" cy="170" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="50.5" cy="149.5" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="30" cy="100" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
      <circle cx="50.5" cy="50.5" r="14" fill="url(#gmNodeGrad)" stroke="#004D56" strokeWidth="2.5"/>
    </svg>
  );
};

export const GraphMindLogo = ({ 
  variant = 'horizontal', 
  size = 40, 
  theme = 'light',
  className = '' 
}) => {
  const isDark = theme === 'dark';
  const graphTextColor = isDark ? '#FFFFFF' : '#0A1E38';
  const mindTextColor = '#0A6E78';

  if (variant === 'icon') {
    return <GraphMindIcon size={size} className={className} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`graph-mind-logo-vertical ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GraphMindIcon size={size * 1.8} />
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <div style={{ 
            fontFamily: "'Outfit', 'Montserrat', sans-serif", 
            fontSize: `${size * 0.9}px`, 
            fontWeight: 800, 
            letterSpacing: '0.12em',
            color: graphTextColor,
            lineHeight: 1
          }}>
            GRAPH
          </div>
          <div style={{ 
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", 
            fontSize: `${size * 0.75}px`, 
            fontWeight: 500, 
            letterSpacing: '0.04em',
            color: mindTextColor,
            lineHeight: 1.1,
            marginTop: '2px'
          }}>
            Mind
          </div>
        </div>
      </div>
    );
  }

  // Default: horizontal layout (Icon + Text)
  return (
    <div className={`graph-mind-logo-horizontal ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <GraphMindIcon size={size} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <span style={{ 
          fontFamily: "'Outfit', 'Montserrat', sans-serif", 
          fontSize: `${size * 0.48}px`, 
          fontWeight: 800, 
          letterSpacing: '0.1em',
          color: graphTextColor
        }}>
          GRAPH
        </span>
        <span style={{ 
          fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", 
          fontSize: `${size * 0.4}px`, 
          fontWeight: 600, 
          letterSpacing: '0.02em',
          color: mindTextColor,
          marginTop: '2px'
        }}>
          Mind
        </span>
      </div>
    </div>
  );
};

export default GraphMindLogo;
