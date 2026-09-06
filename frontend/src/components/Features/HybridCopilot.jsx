import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Network, 
  FileText, 
  Pin, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Bot, 
  User, 
  ExternalLink, 
  Maximize2, 
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Share2
} from 'lucide-react';

export const HybridCopilot = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState('SESS-104');

  const [sessions, setSessions] = useState([
    { id: 'SESS-104', title: 'Phân tích công nợ & Hợp đồng Bách Khoa Tech', time: '10 phút trước', messagesCount: 4, pinned: true },
    { id: 'SESS-103', title: 'Tra cứu quy định thanh toán hợp đồng xuất khẩu EU', time: '2 giờ trước', messagesCount: 6, pinned: false },
    { id: 'SESS-102', title: 'Top 5 Khách hàng doanh thu cao nhất Q3 2026', time: 'Hôm qua', messagesCount: 2, pinned: false }
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 'MSG-01',
      sender: 'user',
      text: 'Cho tôi biết tình hình hợp đồng và nghĩa vụ thanh toán của Công ty Cổ phần Bách Khoa Tech trong Q3/2026?'
    },
    {
      id: 'MSG-02',
      sender: 'copilot',
      text: `Dựa trên kết quả hợp nhất truy vấn ngữ cảnh **GraphRAG** (Graph Traversal + Vector Hybrid Indexing):

1. **Thông Tin Hợp Đồng Chính:**
   - Công ty Cổ phần Bách Khoa Tech hiện đang có **Hợp đồng Cung cấp Linh kiện #99** (Mã: \`CONT-2026-99\`) ký kết ngày 15/01/2024 với tổng giá trị **4.2 Tỷ VNĐ**.
   - Phụ trách kinh doanh: **Nguyễn Văn Minh** (Lead Sales).

2. **Tình Hình Thanh Toán & Công Nợ:**
   - Tổng giá trị đơn hàng phát sinh Q3/2026: **340,000 USD** (Đơn hàng xuất khẩu \`ORD-9912\`).
   - Hạn mức tín dụng phê duyệt: **5 Tỷ VNĐ**.
   - Trạng thái công nợ: Hiện đã thanh toán 70% đợt 1. Đợt 2 (30% còn lại tương đương **1.26 Tỷ VNĐ**) sắp đến hạn vào ngày **25/09/2026**.

3. **Đánh Giá Rủi Ro & Khuyến Nghị:**
   - Hợp đồng không có điều khoản phạt chậm trả bổ sung, tuy nhiên theo **Quy trình SOP Tín dụng**, cần gửi thông báo nhắc nợ trước 15 ngày.`,
      graphNodes: [
        { id: 'CUST-804', label: 'Bách Khoa Tech', type: 'Customer', x: 200, y: 150 },
        { id: 'CONT-2026-99', label: 'Hợp Đồng #99', type: 'Contract', x: 350, y: 80 },
        { id: 'ORD-9912', label: 'Đơn Hàng EU', type: 'Order', x: 350, y: 220 },
        { id: 'EMP-104', label: 'Nguyễn Văn Minh', type: 'Employee', x: 500, y: 150 }
      ],
      graphEdges: [
        { source: 'CUST-804', target: 'CONT-2026-99', label: 'SIGNED_CONTRACT' },
        { source: 'CUST-804', target: 'ORD-9912', label: 'PURCHASED' },
        { source: 'EMP-104', target: 'ORD-9912', label: 'MANAGED_ORDER' }
      ],
      citations: [
        {
          id: 'CIT-01',
          title: 'Hop_Dong_Cung_Cap_Linh_Kien_2026.pdf',
          passage: 'Điều 4.1: Bên B (Bách Khoa Tech) có nghĩa vụ thanh toán 30% giá trị hợp đồng còn lại trong vòng 10 ngày làm việc kể từ khi nhận đủ chứng từ giao hàng đợt 2.',
          sourceType: 'Contract PDF Passage (Trang 6)'
        },
        {
          id: 'CIT-02',
          title: 'Danh_Sach_Khach_Hang_VIP_Q3.xlsx',
          passage: 'Row 48: CustomerID=CUST-804 | CreditLimit=5,000,000,000 | CurrentDebt=1,260,000,000 | Status=Active',
          sourceType: 'PyMySQL / Sheets Record'
        }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || isProcessing) return;

    const userMsg = {
      id: `MSG-${Date.now()}`,
      sender: 'user',
      text: inputQuery
    };

    setChatMessages(prev => [...prev, userMsg]);
    const currentQ = inputQuery;
    setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      const copilotResponse = {
        id: `MSG-${Date.now() + 1}`,
        sender: 'copilot',
        text: `Đã hoàn tất truy vấn GraphRAG cho câu hỏi: "${currentQ}".\n\nHệ thống đã trích xuất 12 nút thực thể liên quan từ Cơ sở tri thức AdventureWorks & Hợp đồng CUAD. Các dữ liệu được kiểm tra chéo độ chính xác qua 2 nguồn trích dẫn pháp lý và bảng tính kế toán.`,
        graphNodes: [
          { id: 'PROD-102', label: 'Bicycle Touring Alpha', type: 'Product', x: 220, y: 140 },
          { id: 'VEND-55', label: 'Thép Việt Nhật', type: 'Vendor', x: 400, y: 140 },
          { id: 'CUST-804', label: 'Bách Khoa Tech', type: 'Customer', x: 310, y: 240 }
        ],
        graphEdges: [
          { source: 'VEND-55', target: 'PROD-102', label: 'SUPPLIES_MATERIAL' },
          { source: 'CUST-804', target: 'PROD-102', label: 'PURCHASED' }
        ],
        citations: [
          {
            id: 'CIT-03',
            title: 'Quy_Trinh_Phe_Duyet_Tin_Dung_SOP.docx',
            passage: 'Mục 3: Khách hàng thuộc nhóm sản xuất xe đạp được ưu tiên thời gian bảo hành và gia hạn tín dụng 30 ngày khi có cam kết khối lượng mua hàng năm.',
            sourceType: 'Internal SOP Guide'
          }
        ]
      };
      setChatMessages(prev => [...prev, copilotResponse]);
      setIsProcessing(false);
    }, 1800);
  };

  const togglePinSession = (sessionId) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, pinned: !s.pinned } : s));
  };

  return (
    <div className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 3</div>
          <h2 className="module-title">Trợ Lý AI Hybrid Copilot & GraphRAG Search</h2>
          <p className="module-subtitle">
            Hỏi đáp dữ liệu doanh nghiệp đa lượt kết hợp Graph Traversal + Vector Search (Qwen2.5-7B-Instruct LLM).
          </p>
        </div>
      </div>

      <div className="copilot-main-layout">
        {/* Left Sidebar: Sessions & Workspace */}
        <div className="panel-box copilot-sidebar">
          <div className="panel-title-bar flex-between">
            <h3>Phiên Làm Việc</h3>
            <button className="outline-btn xsmall">
              + Phiên Mới
            </button>
          </div>

          <div className="sessions-list">
            {sessions.map(s => (
              <div 
                key={s.id} 
                className={`session-item ${activeSessionId === s.id ? 'active' : ''}`}
                onClick={() => setActiveSessionId(s.id)}
              >
                <div className="session-header">
                  <span className="session-title">{s.title}</span>
                  <button 
                    className={`pin-btn ${s.pinned ? 'pinned' : ''}`}
                    onClick={(e) => { e.stopPropagation(); togglePinSession(s.id); }}
                    title={s.pinned ? 'Đã ghim vào Workspace' : 'Ghim phiên này'}
                  >
                    <Pin size={14} />
                  </button>
                </div>
                <div className="session-footer">
                  <span className="session-time">{s.time}</span>
                  <span className="session-count">{s.messagesCount} tin nhắn</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Multi-turn Chat Conversation */}
        <div className="panel-box copilot-chat-area">
          <div className="chat-messages-container">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className="message-content">
                  <div className="message-sender-name">
                    {msg.sender === 'user' ? 'Bạn (Executive)' : 'GraphMind Hybrid Copilot'}
                  </div>
                  <div className="message-text-markdown">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>

                  {/* Inline Knowledge Graph Visualizer inside Copilot Answer */}
                  {msg.graphNodes && (
                    <div className="inline-graph-box">
                      <div className="inline-graph-title">
                        <Network size={16} /> Mạng Lưới Tri Thức Liên Quan Trích Xuất (Graph Context)
                      </div>
                      <div className="canvas-placeholder-graph">
                        <svg width="100%" height="220" viewBox="0 0 600 280">
                          {/* Render Edges */}
                          {msg.graphEdges.map((edge, i) => {
                            const srcNode = msg.graphNodes.find(n => n.id === edge.source);
                            const tgtNode = msg.graphNodes.find(n => n.id === edge.target);
                            if (!srcNode || !tgtNode) return null;
                            return (
                              <g key={i}>
                                <line 
                                  x1={srcNode.x} y1={srcNode.y} 
                                  x2={tgtNode.x} y2={tgtNode.y} 
                                  stroke="#94A3B8" 
                                  strokeWidth="2"
                                  strokeDasharray="4"
                                />
                                <text 
                                  x={(srcNode.x + tgtNode.x) / 2} 
                                  y={(srcNode.y + tgtNode.y) / 2 - 6} 
                                  fill="#0A6E78" 
                                  fontSize="11" 
                                  textAnchor="middle"
                                  fontWeight="600"
                                >
                                  {edge.label}
                                </text>
                              </g>
                            );
                          })}

                          {/* Render Nodes */}
                          {msg.graphNodes.map((n) => (
                            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                              <circle r="24" fill="#0A3C46" stroke="#00E5FF" strokeWidth="2.5" />
                              <text y="4" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                                {n.type.substring(0, 3)}
                              </text>
                              <text y="40" fill="#18181B" fontSize="12" textAnchor="middle" fontWeight="600">
                                {n.label}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Citations & Sources */}
                  {msg.citations && (
                    <div className="citations-box">
                      <div className="box-header-sm">Nguồn Trích Dẫn Dữ Liệu Khảo Sát:</div>
                      <div className="citations-grid">
                        {msg.citations.map(cit => (
                          <div 
                            key={cit.id} 
                            className="citation-card"
                            onClick={() => setSelectedCitation(cit)}
                          >
                            <div className="citation-title">
                              <FileText size={14} /> {cit.title}
                            </div>
                            <div className="citation-type">{cit.sourceType}</div>
                            <div className="citation-snippet">"{cit.passage.substring(0, 85)}..."</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="chat-message-row copilot loading">
                <div className="message-avatar"><Bot size={18} /></div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Sparkles className="spin" size={16} /> GraphRAG đang thực thi Graph Traversal & Hybrid Context Fusion...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form className="chat-input-bar" onSubmit={handleSendMessage}>
            <input 
              type="text"
              placeholder="Nhập câu hỏi tra cứu tri thức (Ví dụ: Tra cứu hạn mức nợ hợp đồng Bách Khoa Tech...)"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
            />
            <button type="submit" className="primary-btn" disabled={!inputQuery.trim() || isProcessing}>
              <Send size={16} /> Gửi Truy Vấn
            </button>
          </form>
        </div>

        {/* Right Drawer: Citation Inspector */}
        {selectedCitation && (
          <div className="panel-box citation-drawer">
            <div className="panel-title-bar flex-between">
              <h3>Trích Dẫn Gốc (Source Passages)</h3>
              <button className="icon-btn-close" onClick={() => setSelectedCitation(null)}>✕</button>
            </div>

            <div className="drawer-content">
              <div className="citation-meta-card mb-3">
                <h4>{selectedCitation.title}</h4>
                <span className="source-type-pill">{selectedCitation.sourceType}</span>
              </div>

              <div className="full-passage-box">
                <div className="box-header-sm">Văn Bản / Dữ Liệu Gốc Trích Xuất:</div>
                <p className="passage-full-text">"{selectedCitation.passage}"</p>
              </div>

              <div className="verification-status mt-4">
                <CheckCircle2 size={16} color="#10B981" /> Xác thực độ tin cậy tri thức: <strong>99.4% Match Rate</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HybridCopilot;
