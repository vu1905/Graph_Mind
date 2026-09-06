import React, { useState } from 'react';

const HeroIsometric = ({ activeNode, onSelectNode, nodesData }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeClick = (nodeId) => {
    if (onSelectNode) {
      onSelectNode(nodeId);
    }
  };

  const getNodeInfo = (id) => {
    const found = nodesData?.find(n => n.id === id || n.type === id);
    if (found) return found;
    
    switch(id) {
      case 'database':
        return { name: 'Database Node', category: 'Data Storage', connections: 42, engine: 'PyMySQL + Vector Index', description: 'Lưu trữ dữ liệu cấu trúc thực thể, thuộc tính và liên kết tri thức.' };
      case 'graph':
        return { name: 'Knowledge Graph Node', category: 'Triple Store', connections: 88, engine: 'Stitch RDF/GQL', description: 'Quản lý mạng lưới liên kết ngữ cảnh và suy luận quan hệ phức hợp.' };
      case 'analytics':
        return { name: 'Analytics Node', category: 'Realtime Engine', connections: 35, engine: 'Graph Metrics Collector', description: 'Giám sát hiệu năng truy vấn, đo lường độ trễ và lưu lượng mạng lưới.' };
      case 'identity':
        return { name: 'Identity & AI Node', category: 'AI Context Layer', connections: 64, engine: 'Flask Microservice + LLM', description: 'Xử lý ngữ cảnh tự nhiên, phân tích thực thể AI và định danh truy cập.' };
      default:
        return { name: 'Graph_Mind Core', category: 'Hardware Engine', connections: 128, engine: 'Intelligence Layer', description: 'Lõi xử lý tri thức phần cứng trung tâm của hệ thống.' };
    }
  };

  const activeInfo = getNodeInfo(hoveredNode || activeNode || 'graph');

  return (
    <div className="isometric-container">
      {/* Background Grid Accent */}
      <div className="isometric-grid-bg"></div>

      {/* Floating Info Tooltip Banner */}
      <div className="isometric-floating-card">
        <div className="floating-card-header">
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            <span className="node-type-tag">{activeInfo.category || 'Active Entity'}</span>
          </div>
          <span className="node-engine-badge">{activeInfo.engine || 'Engine Active'}</span>
        </div>
        <div className="floating-card-body">
          <h4 className="floating-card-title">{activeInfo.name}</h4>
          <p className="floating-card-desc">
            {activeInfo.description || 'Nút mạng dữ liệu tri thức đang hoạt động trực tiếp trong hệ thống Graph_Mind.'}
          </p>
          <div className="floating-card-stats">
            <div>
              <span className="stat-lbl">LIÊN KẾT</span>
              <span className="stat-val">{activeInfo.connections || 42} edges</span>
            </div>
            <div>
              <span className="stat-lbl">TRẠNG THÁI</span>
              <span className="stat-val status-green">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Isometric Graph Canvas */}
      <svg 
        className="isometric-svg" 
        viewBox="0 0 900 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="centerTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          <linearGradient id="blueNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#DBEAFE" />
          </linearGradient>

          <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
          </linearGradient>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="15" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
          
          <filter id="bluePulseShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#3B82F6" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- CIRCUIT PATH LINES CONNECTING NODES TO CENTER --- */}
        {/* Line 1: Top-Left (Database) -> Center */}
        <path 
          d="M 230 220 L 330 270 L 400 305" 
          stroke="#93C5FD" 
          strokeWidth="2.5" 
          strokeDasharray="6 6"
        />
        <circle cx="330" cy="270" r="3.5" fill="#3B82F6" />

        {/* Line 2: Top-Right (Analytics) -> Center */}
        <path 
          d="M 670 220 L 570 270 L 500 305" 
          stroke="#93C5FD" 
          strokeWidth="2.5" 
          strokeDasharray="6 6"
        />
        <circle cx="570" cy="270" r="3.5" fill="#3B82F6" />

        {/* Line 3: Bottom-Left (Graph Node) -> Center */}
        <path 
          d="M 230 440 L 330 390 L 400 355" 
          stroke="#93C5FD" 
          strokeWidth="2.5" 
          strokeDasharray="6 6"
        />
        <circle cx="330" cy="390" r="3.5" fill="#3B82F6" />

        {/* Line 4: Bottom-Right (Identity Node) -> Center */}
        <path 
          d="M 670 440 L 570 390 L 500 355" 
          stroke="#93C5FD" 
          strokeWidth="2.5" 
          strokeDasharray="6 6"
        />
        <circle cx="570" cy="390" r="3.5" fill="#3B82F6" />

        {/* Circuit Intersection Glowing Dots */}
        <circle cx="400" cy="305" r="4" fill="#2563EB" className="pulse-glow" />
        <circle cx="500" cy="305" r="4" fill="#2563EB" className="pulse-glow" />
        <circle cx="400" cy="355" r="4" fill="#2563EB" className="pulse-glow" />
        <circle cx="500" cy="355" r="4" fill="#2563EB" className="pulse-glow" />

        {/* --- CENTRAL HARDWARE / INTELLIGENCE PLATFORM (STACKED 3D ISOMETRIC CHIP) --- */}
        <g transform="translate(0, 0)">
          {/* Base Drop Shadow Polygon */}
          <polygon 
            points="450,230 630,320 450,410 270,320" 
            fill="url(#blueGlow)" 
            filter="url(#softShadow)"
          />

          {/* Bottom Layer Side Left */}
          <polygon points="270,320 450,410 450,430 270,340" fill="#CBD5E1" />
          {/* Bottom Layer Side Right */}
          <polygon points="450,410 630,320 630,340 450,430" fill="#94A3B8" />
          {/* Bottom Layer Top Surface */}
          <polygon points="450,230 630,320 450,410 270,320" fill="#E2E8F0" />

          {/* Middle Blue Layer */}
          <g transform="translate(0, -16)">
            <polygon points="290,320 450,400 450,415 290,335" fill="#3B82F6" opacity="0.85" />
            <polygon points="450,400 610,320 610,335 450,415" fill="#1D4ED8" opacity="0.95" />
            <polygon points="450,240 610,320 450,400 290,320" fill="#EFF6FF" />
          </g>

          {/* Main Top Isometric Chip Surface */}
          <g transform="translate(0, -32)" className="float-slow">
            {/* Side Left */}
            <polygon points="310,320 450,390 450,405 310,335" fill="#BFDBFE" />
            {/* Side Right */}
            <polygon points="450,390 590,320 590,335 450,405" fill="#93C5FD" />
            {/* Top Surface */}
            <polygon 
              points="450,250 590,320 450,390 310,320" 
              fill="#FFFFFF" 
              stroke="#3B82F6" 
              strokeWidth="2" 
              filter="url(#bluePulseShadow)"
            />

            {/* Dotted Matrix Pattern on Central Chip Surface */}
            <g opacity="0.75">
              {[
                {cx: 410, cy: 300}, {cx: 430, cy: 290}, {cx: 450, cy: 280}, {cx: 470, cy: 270}, {cx: 490, cy: 260},
                {cx: 410, cy: 320}, {cx: 430, cy: 310}, {cx: 450, cy: 300}, {cx: 470, cy: 290}, {cx: 490, cy: 280},
                {cx: 410, cy: 340}, {cx: 430, cy: 330}, {cx: 450, cy: 320}, {cx: 470, cy: 310}, {cx: 490, cy: 300},
                {cx: 410, cy: 360}, {cx: 430, cy: 350}, {cx: 450, cy: 340}, {cx: 470, cy: 330}, {cx: 490, cy: 320}
              ].map((dot, idx) => (
                <circle key={idx} cx={dot.cx} cy={dot.cy} r="2.2" fill="#3B82F6" />
              ))}
            </g>
          </g>
        </g>

        {/* --- NODE 1: TOP-LEFT (DATABASE NODE) --- */}
        <g 
          className={`isometric-node-btn ${activeNode === 'database' || hoveredNode === 'database' ? 'active-node' : ''}`}
          onClick={() => handleNodeClick('database')}
          onMouseEnter={() => setHoveredNode('database')}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer' }}
        >
          <g transform="translate(140, 130)" className="float-slow">
            {/* Shadow */}
            <ellipse cx="90" cy="110" rx="60" ry="25" fill="rgba(15, 23, 42, 0.07)" />
            {/* Pedestal Base */}
            <polygon points="90,40 150,70 90,100 30,70" fill="url(#blueNodeGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            <polygon points="30,70 90,100 90,112 30,82" fill="#93C5FD" />
            <polygon points="90,100 150,70 150,82 90,112" fill="#60A5FA" />
            
            {/* Isometric Cylinders (Database Icon) */}
            <g transform="translate(65, 35)">
              <path d="M 5 15 C 5 8, 45 8, 45 15 C 45 22, 5 22, 5 15 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
              <path d="M 5 15 L 5 25 C 5 32, 45 32, 45 25 L 45 15" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
              <path d="M 5 27 L 5 37 C 5 44, 45 44, 45 37 L 45 27" fill="#BFDBFE" stroke="#2563EB" strokeWidth="1.5" />
            </g>
          </g>
        </g>

        {/* --- NODE 2: TOP-RIGHT (ANALYTICS BAR CHART NODE) --- */}
        <g 
          className={`isometric-node-btn ${activeNode === 'analytics' || hoveredNode === 'analytics' ? 'active-node' : ''}`}
          onClick={() => handleNodeClick('analytics')}
          onMouseEnter={() => setHoveredNode('analytics')}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer' }}
        >
          <g transform="translate(580, 130)" className="float-reverse">
            {/* Shadow */}
            <ellipse cx="90" cy="110" rx="60" ry="25" fill="rgba(15, 23, 42, 0.07)" />
            {/* Pedestal Base */}
            <polygon points="90,40 150,70 90,100 30,70" fill="url(#blueNodeGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            <polygon points="30,70 90,100 90,112 30,82" fill="#93C5FD" />
            <polygon points="90,100 150,70 150,82 90,112" fill="#60A5FA" />

            {/* 3D Isometric Bar Chart Columns */}
            <g transform="translate(55, 25)">
              <polygon points="15,45 23,49 23,25 15,21" fill="#60A5FA" />
              <polygon points="23,49 31,45 31,21 23,25" fill="#2563EB" />
              <polygon points="15,21 23,17 31,21 23,25" fill="#BFDBFE" />

              <polygon points="33,45 41,49 41,12 33,8" fill="#3B82F6" />
              <polygon points="41,49 49,45 49,8 41,12" fill="#1D4ED8" />
              <polygon points="33,8 41,4 49,8 41,12" fill="#EFF6FF" />

              <polygon points="51,45 59,49 59,30 51,26" fill="#93C5FD" />
              <polygon points="59,49 67,45 67,26 59,30" fill="#3B82F6" />
              <polygon points="51,26 59,22 67,26 59,30" fill="#DBEAFE" />
            </g>
          </g>
        </g>

        {/* --- NODE 3: BOTTOM-LEFT (TRIPLE GRAPH NODE) --- */}
        <g 
          className={`isometric-node-btn ${activeNode === 'graph' || hoveredNode === 'graph' ? 'active-node' : ''}`}
          onClick={() => handleNodeClick('graph')}
          onMouseEnter={() => setHoveredNode('graph')}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer' }}
        >
          <g transform="translate(140, 350)" className="float-reverse">
            {/* Shadow */}
            <ellipse cx="90" cy="110" rx="60" ry="25" fill="rgba(15, 23, 42, 0.07)" />
            {/* Pedestal Base */}
            <polygon points="90,40 150,70 90,100 30,70" fill="url(#blueNodeGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            <polygon points="30,70 90,100 90,112 30,82" fill="#93C5FD" />
            <polygon points="90,100 150,70 150,82 90,112" fill="#60A5FA" />

            {/* Graph Network Node Icon */}
            <g transform="translate(60, 35)">
              <line x1="20" y1="20" x2="40" y2="40" stroke="#2563EB" strokeWidth="2.5" />
              <line x1="40" y1="40" x2="58" y2="22" stroke="#2563EB" strokeWidth="2.5" />
              <circle cx="20" cy="20" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="40" cy="40" r="9" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="58" cy="22" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          </g>
        </g>

        {/* --- NODE 4: BOTTOM-RIGHT (IDENTITY & AI NODE) --- */}
        <g 
          className={`isometric-node-btn ${activeNode === 'identity' || hoveredNode === 'identity' ? 'active-node' : ''}`}
          onClick={() => handleNodeClick('identity')}
          onMouseEnter={() => setHoveredNode('identity')}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: 'pointer' }}
        >
          <g transform="translate(580, 350)" className="float-slow">
            {/* Shadow */}
            <ellipse cx="90" cy="110" rx="60" ry="25" fill="rgba(15, 23, 42, 0.07)" />
            {/* Pedestal Base */}
            <polygon points="90,40 150,70 90,100 30,70" fill="url(#blueNodeGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            <polygon points="30,70 90,100 90,112 30,82" fill="#93C5FD" />
            <polygon points="90,100 150,70 150,82 90,112" fill="#60A5FA" />

            {/* User Avatar / Identity Icon */}
            <g transform="translate(70, 35)">
              <circle cx="20" cy="15" r="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M 5 35 C 5 24, 35 24, 35 35 Z" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroIsometric;
