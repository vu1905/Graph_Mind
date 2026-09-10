import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  LayoutGrid,
  Activity,
  Bot,
  Database,
  Globe,
  User,
  Zap,
  Layers,
  Sparkles,
  Play,
  Pause,
  Info,
  Maximize2
} from 'lucide-react';

// Initial dataset — aligned to docker-compose.yml services: neo4j_db + qdrant_db
const INITIAL_NODES = [
  {
    id: 'core',
    label: 'GraphMind Engine',
    type: 'Orchestration Core',
    iconType: 'Zap',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.6)',
    latency: '0.8 ms',
    sparql: 'MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 25',
    connectionsCount: 5,
    status: 'ONLINE',
    dbHint: 'GraphRAG Fusion Layer',
    x: 450,
    y: 260,
    hx: 450,
    hy: 250
  },
  {
    id: 'neo4j_db',
    label: 'Neo4j Graph DB',
    type: 'neo4j:5.18.0 (APOC)',
    iconType: 'Database',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.65)',
    latency: '2.1 ms',
    sparql: 'MATCH (c:Customer)-[:SIGNED_CONTRACT]->(k:Contract)\nRETURN c.name, k.title LIMIT 10',
    connectionsCount: 6,
    status: 'ONLINE',
    dbHint: 'Port 7474 / 7687 (Bolt)',
    x: 210,
    y: 145,
    hx: 210,
    hy: 130
  },
  {
    id: 'neo4j_node_customer',
    label: 'Customer Entities',
    type: 'Neo4j Node Label',
    iconType: 'User',
    color: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.5)',
    latency: '1.2 ms',
    sparql: 'MATCH (c:Customer) RETURN c.name, c.territory LIMIT 20',
    connectionsCount: 3,
    status: 'INDEXED',
    dbHint: 'Neo4j Label: :Customer',
    x: 90,
    y: 270,
    hx: 90,
    hy: 270
  },
  {
    id: 'neo4j_node_contract',
    label: 'Contract Triples',
    type: 'Neo4j Relationship',
    iconType: 'Globe',
    color: '#818CF8',
    glow: 'rgba(129, 140, 248, 0.5)',
    latency: '1.8 ms',
    sparql: 'MATCH (c)-[:SIGNED_CONTRACT]->(k)\nRETURN c.name, k.title, k.value',
    connectionsCount: 4,
    status: 'ONLINE',
    dbHint: 'Relationship Type: [:SIGNED_CONTRACT]',
    x: 90,
    y: 120,
    hx: 90,
    hy: 120
  },
  {
    id: 'qdrant_db',
    label: 'Qdrant Vector DB',
    type: 'qdrant/qdrant:v1.8.2',
    iconType: 'Layers',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.65)',
    latency: '3.4 ms',
    sparql: 'POST /collections/enterprise_knowledge/points/search\n{ "vector": [...1536-dim...], "limit": 5, "with_payload": true }',
    connectionsCount: 4,
    status: 'SYNCHRONIZED',
    dbHint: 'Port 6333 (REST) / 6334 (gRPC)',
    x: 690,
    y: 145,
    hx: 690,
    hy: 130
  },
  {
    id: 'qdrant_col_knowledge',
    label: 'enterprise_knowledge',
    type: 'Qdrant Collection',
    iconType: 'Activity',
    color: '#34D399',
    glow: 'rgba(52, 211, 153, 0.5)',
    latency: '4.5 ms',
    sparql: 'GET /collections/enterprise_knowledge\n{ "result": { "vectors_count": 128400, "distance": "Cosine" } }',
    connectionsCount: 2,
    status: 'HNSW READY',
    dbHint: 'Cosine / 1536-dim HNSW Index',
    x: 810,
    y: 270,
    hx: 810,
    hy: 270
  },
  {
    id: 'ai_agent',
    label: 'LLMOps Microservice',
    type: 'Qwen/Unsloth + Flask',
    iconType: 'Bot',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.6)',
    latency: '184 ms',
    sparql: 'POST /api/cypher { "cypher": "..." }\nPOST /api/vector-search { "query": "..." }',
    connectionsCount: 4,
    status: 'PROCESSING',
    dbHint: 'Port 5000 (Flask API)',
    x: 450,
    y: 430,
    hx: 450,
    hy: 440
  }
];

const INITIAL_EDGES = [
  { id: 'e1', source: 'core', target: 'neo4j_db', label: 'Cypher GQL Query (Bolt 7687)', speed: 2.5 },
  { id: 'e2', source: 'core', target: 'qdrant_db', label: 'Vector Search (REST 6333)', speed: 2.2 },
  { id: 'e3', source: 'neo4j_db', target: 'neo4j_node_customer', label: 'Entity Nodes (:Customer)', speed: 1.8 },
  { id: 'e4', source: 'neo4j_db', target: 'neo4j_node_contract', label: 'Relationship Triples', speed: 1.5 },
  { id: 'e5', source: 'qdrant_db', target: 'qdrant_col_knowledge', label: 'HNSW Collection Access', speed: 2 },
  { id: 'e6', source: 'neo4j_node_customer', target: 'core', label: 'Graph Context Fusion', speed: 1.6 },
  { id: 'e7', source: 'qdrant_col_knowledge', target: 'core', label: 'Semantic Score Merge', speed: 1.8 },
  { id: 'e8', source: 'core', target: 'ai_agent', label: 'GraphRAG Prompt Dispatch', speed: 2 },
  { id: 'e9', source: 'ai_agent', target: 'neo4j_db', label: 'APOC Import Sync', speed: 1.4 }
];


export default function InteractiveGraphCanvas() {
  // --- States ---
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges] = useState(INITIAL_EDGES);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('core');
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Viewport & Settings Controls
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [layoutMode, setLayoutMode] = useState('force'); // 'force' | 'hierarchical'
  const [isAnimationActive, setIsAnimationActive] = useState(true);

  const containerRef = useRef(null);

  // Helper for rendering icons dynamically
  const renderNodeIcon = (iconType, color) => {
    const props = { className: "w-6 h-6 stroke-[2.2]", style: { color } };
    switch (iconType) {
      case 'Zap': return <Zap {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'User': return <User {...props} />;
      case 'Activity': return <Activity {...props} />;
      default: return <Sparkles {...props} />;
    }
  };


  // Switch layout mode (Force-directed vs Hierarchical)
  const handleSwitchLayout = (mode) => {
    setLayoutMode(mode);
    setNodes(prevNodes =>
      prevNodes.map(node => ({
        ...node,
        x: mode === 'hierarchical' ? node.hx : (INITIAL_NODES.find(n => n.id === node.id)?.x || node.x),
        y: mode === 'hierarchical' ? node.hy : (INITIAL_NODES.find(n => n.id === node.id)?.y || node.y)
      }))
    );
  };

  // Zoom handling
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.6));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    handleSwitchLayout('force');
  };

  // Drag & Drop handlers
  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation();
    setDraggedNodeId(nodeId);
    setSelectedNodeId(nodeId);
    setIsDragging(true);

    const node = nodes.find(n => n.id === nodeId);
    if (node && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;
      setDragOffset({
        x: mouseX - node.x,
        y: mouseY - node.y
      });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !draggedNodeId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    setNodes(prevNodes =>
      prevNodes.map(n => {
        if (n.id === draggedNodeId) {
          return {
            ...n,
            x: Math.max(40, Math.min(860, mouseX - dragOffset.x)),
            y: Math.max(40, Math.min(500, mouseY - dragOffset.y))
          };
        }
        return n;
      })
    );
  }, [isDragging, draggedNodeId, pan, zoom, dragOffset]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  // Determine active highlights on hover
  const activeNode = nodes.find(n => n.id === (hoveredNodeId || selectedNodeId || 'core'));

  const isConnected = (sourceId, targetId) => {
    if (!hoveredNodeId) return true;
    if (sourceId === hoveredNodeId || targetId === hoveredNodeId) return true;
    return edges.some(e =>
      (e.source === hoveredNodeId && (e.target === sourceId || e.target === targetId)) ||
      (e.target === hoveredNodeId && (e.source === sourceId || e.source === targetId))
    );
  };

  const isNodeHighlighted = (nodeId) => {
    if (!hoveredNodeId) return true;
    if (nodeId === hoveredNodeId) return true;
    return edges.some(e =>
      (e.source === hoveredNodeId && e.target === nodeId) ||
      (e.target === hoveredNodeId && e.source === nodeId)
    );
  };

  return (
    <div className="w-full my-6 max-w-6xl mx-auto px-4">
      {/* Outer Wrapper with High-Tech Glow Border */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800/80 shadow-[0_0_50px_rgba(6,182,212,0.12)] backdrop-blur-xl">

        {/* Top Header Bar inside Canvas */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-slate-900/60 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-cyan-400 tracking-wide uppercase">
              <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
              Graph_Mind Visual Knowledge Mesh
            </span>
            <span className="h-3 w-px bg-slate-800"></span>
            <span className="text-slate-400 hidden sm:inline">
              Real-time Node Topology • Drag nodes to inspect
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[11px] font-mono text-emerald-400">6 Active Nodes</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800">
              <span className="text-[11px] font-mono text-cyan-300">7 Connected Triples</span>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div
          ref={containerRef}
          className="relative w-full h-[520px] select-none cursor-grab active:cursor-grabbing overflow-hidden bg-[#070A12]"
        >
          {/* Cyberpunk Grid Background */}
          {showGrid && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
              }}
            />
          )}

          {/* Central Radial Ambient Light Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Rendering Edges & Animations */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 900 540"
            preserveAspectRatio="xMidYMid meet"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            <defs>
              {/* Gradient Filters */}
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Render Edges */}
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);

              if (!sourceNode || !targetNode) return null;

              const highlighted = isConnected(edge.source, edge.target);
              const isHoveredEdge = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);

              // Calculate control point for organic curves
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2 - 15;
              const pathD = `M ${sourceNode.x} ${sourceNode.y} Q ${midX} ${midY} ${targetNode.x} ${targetNode.y}`;

              return (
                <g key={edge.id} className="transition-opacity duration-300" style={{ opacity: highlighted ? 1 : 0.15 }}>
                  {/* Background Base Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHoveredEdge ? '#06B6D4' : 'rgba(51, 65, 85, 0.6)'}
                    strokeWidth={isHoveredEdge ? 2.5 : 1.5}
                    strokeDasharray={isHoveredEdge ? 'none' : '4 4'}
                  />

                  {/* Moving Circuit Light Pulse */}
                  {isAnimationActive && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#edge-gradient)"
                      strokeWidth={isHoveredEdge ? 3 : 2}
                      strokeDasharray="8 16"
                      className="animate-[dash_3s_linear_infinite]"
                      style={{
                        animationDuration: `${3 / edge.speed}s`,
                        filter: isHoveredEdge ? 'drop-shadow(0 0 6px #06B6D4)' : 'none'
                      }}
                    />
                  )}

                  {/* Edge Label on Hover */}
                  {isHoveredEdge && (
                    <text
                      x={midX}
                      y={midY - 8}
                      fill="#38BDF8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-slate-900 px-1 py-0.5 rounded text-[10px]"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Render Nodes (HTML Divs for smooth CSS Hover & Drag) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            {nodes.map(node => {
              const highlighted = isNodeHighlighted(node.id);
              const isSelected = selectedNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-transform duration-150 ${
                    highlighted ? 'opacity-100 scale-100 z-20' : 'opacity-30 scale-95 z-10'
                  }`}
                  style={{
                    left: `${(node.x / 900) * 100}%`,
                    top: `${(node.y / 540) * 100}%`
                  }}
                >
                  {/* Glowing Node Circle */}
                  <div
                    className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-300 bg-slate-900/90 backdrop-blur-md ${
                      isSelected || isHovered
                        ? 'border-cyan-400 scale-110 shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                        : 'border-slate-700 hover:border-slate-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]'
                    }`}
                    style={{
                      boxShadow: isSelected || isHovered ? `0 0 25px ${node.glow}` : undefined
                    }}
                  >
                    {/* Glowing Pulse Ring for Central Node */}
                    {node.id === 'core' && (
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-ping pointer-events-none" />
                    )}

                    {/* Icon */}
                    {renderNodeIcon(node.iconType, node.color)}

                    {/* Latency Tag */}
                    <span className="absolute -bottom-2 bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded-full">
                      {node.latency}
                    </span>
                  </div>

                  {/* Node Label Below */}
                  <div className="mt-2 text-center pointer-events-none">
                    <div className="text-xs font-semibold text-slate-100 whitespace-nowrap tracking-wide drop-shadow">
                      {node.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {node.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Floating Technical Tooltip / Inspector HUD (Bottom-Left) */}
          {activeNode && (
            <div className="absolute bottom-4 left-4 max-w-sm w-full bg-slate-900/95 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl z-30 pointer-events-auto transition-all duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activeNode.color, boxShadow: `0 0 10px ${activeNode.color}` }}
                  />
                  <h4 className="text-sm font-bold text-slate-100">{activeNode.label}</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {activeNode.status}
                </span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">LATENCY</div>
                  <div className="text-xs font-mono font-semibold text-emerald-400">{activeNode.latency}</div>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">EDGES</div>
                  <div className="text-xs font-mono font-semibold text-cyan-400">{activeNode.connectionsCount} links</div>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">ENGINE</div>
                  <div className="text-[11px] font-mono font-semibold text-purple-300 truncate">{activeNode.dbHint || activeNode.type}</div>
                </div>
              </div>

              {/* Query Snippet (Cypher / REST) */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>{activeNode.id && activeNode.id.startsWith('neo4j') ? 'CYPHER / GQL QUERY' : activeNode.id && activeNode.id.startsWith('qdrant') ? 'QDRANT REST PAYLOAD' : 'DB QUERY'}</span>
                  <span className="text-slate-500">{activeNode.id && activeNode.id.startsWith('neo4j') ? 'bolt://7687' : activeNode.id && activeNode.id.startsWith('qdrant') ? ':6333' : 'docker-compose'}</span>
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-950 text-[11px] font-mono text-cyan-300/90 overflow-x-auto border border-slate-800/90 whitespace-pre-wrap leading-relaxed">
                  {activeNode.sparql}
                </pre>
              </div>
            </div>
          )}

          {/* Floating Control Toolbar (Top-Right Canvas Overlay) */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl shadow-xl backdrop-blur-md z-30">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              title="Reset View"
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <hr className="border-slate-800 my-0.5" />

            <button
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid"
              className={`p-2 rounded-lg transition-colors ${
                showGrid ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-800/50' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleSwitchLayout(layoutMode === 'force' ? 'hierarchical' : 'force')}
              title={`Switch to ${layoutMode === 'force' ? 'Hierarchical' : 'Force-Directed'} Layout`}
              className={`p-2 rounded-lg transition-colors ${
                layoutMode === 'hierarchical' ? 'text-purple-400 bg-purple-950/50 border border-purple-800/50' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAnimationActive(!isAnimationActive)}
              title={isAnimationActive ? "Pause Flow Pulse" : "Resume Flow Pulse"}
              className={`p-2 rounded-lg transition-colors ${
                isAnimationActive ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-800/50' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {isAnimationActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Bottom Right Layout Indicator Badge */}
          <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-400 backdrop-blur-md">
            <span>Layout:</span>
            <span className="text-cyan-400 capitalize font-semibold">{layoutMode}</span>
            <span className="text-slate-600">|</span>
            <span>Zoom:</span>
            <span className="text-slate-200">{Math.round(zoom * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
