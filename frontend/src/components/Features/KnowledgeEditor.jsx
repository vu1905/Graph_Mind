import React, { useState } from 'react';
import { 
  FileText, 
  Edit3, 
  Plus, 
  Trash2, 
  Eye, 
  Check, 
  Share2, 
  BookOpen, 
  Search, 
  Save, 
  CornerDownRight, 
  Layers, 
  UserCheck, 
  Briefcase, 
  ShoppingBag,
  FileCheck,
  Building,
  Sparkles,
  Terminal,
  Database,
  Play
} from 'lucide-react';

export const KnowledgeEditor = () => {
  const [activeSubTab, setActiveSubTab] = useState('hitl_editor');
  const [searchQuery, setSearchQuery] = useState('');

  // Neo4j Cypher State
  const [cypherInput, setCypherInput] = useState('MATCH (c:Customer)-[r:SIGNED_CONTRACT]->(k:Contract)\nRETURN c.name, r.duration, k.title LIMIT 10;');
  const [cypherResults, setCypherResults] = useState([
    { 'c.name': 'Công ty Cổ phần Bách Khoa Tech', 'r.duration': '24 Tháng', 'k.title': 'Hợp Đồng Cung Cấp Linh Kiện #99' },
    { 'c.name': 'Tập đoàn Thép Việt Nhật', 'r.duration': '36 Tháng', 'k.title': 'Hợp Đồng Nguyên Vật Liệu Đầu Vào' },
    { 'c.name': 'Công ty Thương Mại Á Châu', 'r.duration': '12 Tháng', 'k.title': 'Hợp Đồng Mua Bán Xe Đạp Touring' }
  ]);
  const [isCypherRunning, setIsCypherRunning] = useState(false);

  // Qdrant Vector State
  const [qdrantCollection, setQdrantCollection] = useState('enterprise_knowledge');
  const [qdrantPayloads] = useState([
    { id: 'vec-901', collection: 'enterprise_knowledge', vector_dim: 1536, metric: 'Cosine', payload: { title: 'Quy Trình Xử Lý Thâm Hụt Hạn Mức Tín Dụng', source: 'SOP_Credit_Risk.docx', score: 0.942 } },
    { id: 'vec-902', collection: 'cuad_contracts', vector_dim: 1536, metric: 'Cosine', payload: { title: 'Điều Khoản Phụ Lục Hợp Đồng #99', source: 'CUAD_Contract_99.pdf', score: 0.885 } },
    { id: 'vec-903', collection: 'sales_embeddings', vector_dim: 1536, metric: 'Cosine', payload: { title: 'Lịch Sử Thanh Toán Bách Khoa Tech', source: 'ERP_Customer_Ledger', score: 0.814 } }
  ]);
  
  // State for HITL Graph Nodes
  const [nodes, setNodes] = useState([
    { id: 'CUST-804', name: 'Công ty Cổ phần Bách Khoa Tech', type: 'Customer', territory: 'Hà Nội', revenue: '8.4 Tỷ', status: 'Verified', linksCount: 6 },
    { id: 'PROD-102', name: 'Bicycle Touring Alpha v2', type: 'Product', category: 'Xe Đạp Xuất Khẩu', price: '$1,450', status: 'Verified', linksCount: 12 },
    { id: 'CONT-2026-99', name: 'Hợp Đồng Cung Cấp Linh Kiện #99', type: 'Contract', duration: '24 Tháng', value: '4.2 Tỷ', status: 'AI Extracted', linksCount: 4 },
    { id: 'ORD-9912', name: 'Đơn Hàng Xuất Khẩu EU-2026', type: 'Order', date: '2026-08-28', amount: '$340,000', status: 'Verified', linksCount: 3 },
    { id: 'EMP-104', name: 'Nguyễn Văn Minh (Sales Manager)', type: 'Employee', department: 'Kinh Doanh', role: 'Lead Sales', status: 'Verified', linksCount: 18 },
    { id: 'VEND-55', name: 'Tập đoàn Thép Việt Nhật (Supplier)', type: 'Vendor', territory: 'Hải Phòng', status: 'Verified', linksCount: 8 }
  ]);

  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [nodeForm, setNodeForm] = useState({ ...nodes[0] });

  // State for Relationships (Edges)
  const [relationships, setRelationships] = useState([
    { id: 'REL-01', source: 'CUST-804 (Bách Khoa Tech)', relation: 'PURCHASED', target: 'PROD-102 (Bicycle Touring Alpha)', confidence: '98%' },
    { id: 'REL-02', source: 'CUST-804 (Bách Khoa Tech)', relation: 'SIGNED_CONTRACT', target: 'CONT-2026-99 (Hợp Đồng Linh Kiện)', confidence: '94%' },
    { id: 'REL-03', source: 'EMP-104 (Nguyễn Văn Minh)', relation: 'MANAGED_ORDER', target: 'ORD-9912 (Đơn Hàng EU)', confidence: '99%' },
    { id: 'REL-04', source: 'VEND-55 (Thép Việt Nhật)', relation: 'SUPPLIES_MATERIAL', target: 'PROD-102 (Bicycle Touring Alpha)', confidence: '91%' }
  ]);

  const [newRelForm, setNewRelForm] = useState({ source: '', relation: 'PURCHASED', target: '' });

  // Documents State
  const [documents, setDocuments] = useState([
    { id: 'DOC-01', title: 'Hop_Dong_Cung_Cap_Linh_Kien_2026.pdf', category: 'Hợp Đồng Pháp Lý', size: '2.4 MB', pages: 18, parsedEntities: 42, status: 'Synced' },
    { id: 'DOC-02', title: 'Danh_Sach_Khach_Hang_VIP_Q3.xlsx', category: 'Dữ Liệu Khách Hàng', size: '1.1 MB', rows: 1240, parsedEntities: 180, status: 'Synced' },
    { id: 'DOC-03', title: 'Quy_Trinh_Phe_Duyet_Tin_Dung_SOP.docx', category: 'Quy Trình Nội Bộ', size: '850 KB', pages: 8, parsedEntities: 14, status: 'Synced' }
  ]);

  // SOP State
  const [sopTitle, setSopTitle] = useState('Quy Trình Xử Lý Thâm Hụt Hạn Mức Tín Dụng Khách Hàng VIP');
  const [sopContent, setSopContent] = useState(
`1. MỤC ĐÍCH & PHẠM VI
Văn bản này quy định quy trình xử lý tự động và thủ công khi Đối tác/Khách hàng thuộc nhóm VIP vượt hạn mức công nợ hoặc có dấu hiệu quá hạn hợp đồng từ 15 ngày trở lên.

2. CÁC NÚT THỰC THỂ LIÊN QUAN TRONG KNOWLEDGE GRAPH:
- Nút Thực Thể: [Customer], [Contract], [Sales_Manager], [Credit_Limit].
- Mối quan hệ chính: (Customer)-[HAS_CONTRACT]->(Contract), (Contract)-[EXPIRING_IN]->(Days).

3. HƯỚNG DẪN XỬ LÝ:
Bước 1: Khi hệ thống AI phát hiện Cảnh báo Rủi ro (Module 4), thông báo tự động gửi đến Sales Manager phụ trách trực tiếp.
Bước 2: Bộ phận Kế toán phối hợp kiểm tra lại số liệu nợ tồn đọng trên hệ thống ERP (AdventureWorks DB).
Bước 3: Nếu thông tin chính xác, Sales Manager kích hoạt phụ lục gia hạn hoặc tạm dừng giao dịch theo Điều 4.2 của Hợp đồng.`
  );
  const [sopSaved, setSopSaved] = useState(false);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
    setNodeForm({ ...node });
    setIsEditingNode(false);
  };

  const handleSaveNode = () => {
    setNodes(prev => prev.map(n => n.id === nodeForm.id ? { ...nodeForm, status: 'Verified (HITL Curated)' } : n));
    setSelectedNode({ ...nodeForm, status: 'Verified (HITL Curated)' });
    setIsEditingNode(false);
  };

  const handleAddRelationship = (e) => {
    e.preventDefault();
    if (!newRelForm.source || !newRelForm.target) return;

    const newRel = {
      id: `REL-0${relationships.length + 1}`,
      source: newRelForm.source,
      relation: newRelForm.relation,
      target: newRelForm.target,
      confidence: '100% (Human Curated)'
    };
    setRelationships([newRel, ...relationships]);
    setNewRelForm({ source: '', relation: 'PURCHASED', target: '' });
  };

  const handleSaveSOP = () => {
    setSopSaved(true);
    setTimeout(() => setSopSaved(false), 2500);
  };

  const handleRunCypher = () => {
    setIsCypherRunning(true);
    fetch('http://localhost:5000/api/cypher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cypher: cypherInput })
    })
      .then(res => res.json())
      .then(data => {
        setIsCypherRunning(false);
        if (data.data) {
          setCypherResults(data.data);
        }
      })
      .catch(() => {
        setIsCypherRunning(false);
      });
  };

  const filteredNodes = nodes.filter(n => 
    n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 2</div>
          <h2 className="module-title">Quản Lý & Chỉnh Sửa Tri Thức (Knowledge Management & HITL Editor)</h2>
          <p className="module-subtitle">
            Duyệt thực thể AI, chạy Cypher Query trên Neo4j DB (Port 7474/7687) và khám phá Qdrant Vector Collections (Port 6333).
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeSubTab === 'hitl_editor' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('hitl_editor')}
        >
          <Edit3 size={16} /> Human-In-The-Loop Graph Editor ({nodes.length} Nút)
        </button>

        <button 
          className={`subtab-btn ${activeSubTab === 'cypher_terminal' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('cypher_terminal')}
        >
          <Terminal size={16} /> Neo4j Cypher / GQL Terminal
        </button>

        <button 
          className={`subtab-btn ${activeSubTab === 'qdrant_vectors' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('qdrant_vectors')}
        >
          <Layers size={16} /> Qdrant Vector Collections
        </button>

        <button 
          className={`subtab-btn ${activeSubTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('documents')}
        >
          <FileText size={16} /> Document Explorer ({documents.length} File)
        </button>

        <button 
          className={`subtab-btn ${activeSubTab === 'sop' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('sop')}
        >
          <BookOpen size={16} /> SOP & Quy Trình Nội Bộ
        </button>
      </div>

      {/* TAB 1: HITL GRAPH EDITOR */}
      {activeSubTab === 'hitl_editor' && (
        <div className="hitl-layout">
          {/* Left List of Nodes */}
          <div className="panel-box hitl-sidebar">
            <div className="panel-title-bar">
              <h3>Thực Thể AI Extracted</h3>
              <span className="sub-text">Chọn nút để chỉnh sửa hoặc xác minh độ chính xác.</span>
            </div>

            <div className="search-box-input mb-3">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Tìm tên nút, mã ID, loại thực thể..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="nodes-list-scroll">
              {filteredNodes.map(node => (
                <div 
                  key={node.id} 
                  className={`node-item-card ${selectedNode.id === node.id ? 'active' : ''}`}
                  onClick={() => handleSelectNode(node)}
                >
                  <div className="node-item-header">
                    <span className={`entity-chip ${node.type.toLowerCase()}`}>
                      {node.type}
                    </span>
                    <span className="node-id">{node.id}</span>
                  </div>
                  <div className="node-item-name">{node.name}</div>
                  <div className="node-item-footer">
                    <span className="links-badge">{node.linksCount} liên kết</span>
                    <span className="status-dot">{node.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Editor Area */}
          <div className="panel-box hitl-main-editor">
            <div className="panel-title-bar flex-between">
              <div>
                <h3>Chi Tiết & Chỉnh Sửa Nút Thực Thể</h3>
                <span className="sub-text">Mã ID: <code>{selectedNode.id}</code></span>
              </div>
              <div>
                {!isEditingNode ? (
                  <button className="outline-btn small" onClick={() => setIsEditingNode(true)}>
                    <Edit3 size={14} /> Chỉnh Sửa Thuộc Tính
                  </button>
                ) : (
                  <button className="primary-btn small" onClick={handleSaveNode}>
                    <Save size={14} /> Lưu Thay Đổi HITL
                  </button>
                )}
              </div>
            </div>

            <div className="node-editor-form">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Mã Thực Thể (Node ID)</label>
                  <input type="text" value={nodeForm.id} disabled />
                </div>

                <div className="form-group">
                  <label>Loại Thực Thể (Entity Type)</label>
                  <select 
                    value={nodeForm.type} 
                    disabled={!isEditingNode}
                    onChange={e => setNodeForm({ ...nodeForm, type: e.target.value })}
                  >
                    <option value="Customer">Customer (Khách Hàng)</option>
                    <option value="Product">Product (Sản Phẩm)</option>
                    <option value="Contract">Contract (Hợp Đồng)</option>
                    <option value="Order">Order (Đơn Hàng)</option>
                    <option value="Employee">Employee (Nhân Viên)</option>
                    <option value="Vendor">Vendor (Nhà Cung Cấp)</option>
                  </select>
                </div>

                <div className="form-group col-span-2">
                  <label>Tên / Tiêu Đề Nút (Entity Name)</label>
                  <input 
                    type="text" 
                    value={nodeForm.name} 
                    disabled={!isEditingNode}
                    onChange={e => setNodeForm({ ...nodeForm, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Dynamic Property Preview */}
              <div className="properties-preview-box mt-3">
                <div className="box-header-sm">Thuộc Tính Bổ Sung Trích Xuất:</div>
                <div className="props-chip-group">
                  {Object.entries(selectedNode).map(([k, v]) => {
                    if (['id', 'name', 'type', 'linksCount'].includes(k)) return null;
                    return (
                      <div key={k} className="prop-chip">
                        <span className="prop-key">{k}:</span>
                        <span className="prop-val">{v}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Edge/Relationship Manager */}
              <div className="relationships-section mt-4">
                <div className="section-subtitle">
                  <Layers size={16} /> Quản Lý Liên Kết & Quan Hệ (Edges)
                </div>

                {/* Add New Edge Form */}
                <form className="add-edge-bar mb-3" onSubmit={handleAddRelationship}>
                  <input 
                    type="text" 
                    placeholder="Mã Nguồn (Nút gốc)" 
                    value={newRelForm.source || selectedNode.name}
                    onChange={e => setNewRelForm({ ...newRelForm, source: e.target.value })}
                  />
                  <select 
                    value={newRelForm.relation}
                    onChange={e => setNewRelForm({ ...newRelForm, relation: e.target.value })}
                  >
                    <option value="PURCHASED">PURCHASED (Đã Mua)</option>
                    <option value="SIGNED_CONTRACT">SIGNED_CONTRACT (Ký Hợp Đồng)</option>
                    <option value="MANAGED_ORDER">MANAGED_ORDER (Xử Lý Đơn Hàng)</option>
                    <option value="SUPPLIES_MATERIAL">SUPPLIES_MATERIAL (Cung Cấp Vật Tư)</option>
                    <option value="BELONGS_TO_DEPT">BELONGS_TO_DEPT (Thuộc Bộ Phận)</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Mã Đích (Nút ngọn)" 
                    value={newRelForm.target}
                    onChange={e => setNewRelForm({ ...newRelForm, target: e.target.value })}
                  />
                  <button type="submit" className="secondary-btn small">
                    <Plus size={14} /> Thêm Liên Kết
                  </button>
                </form>

                {/* Relationships Table */}
                <table className="custom-table compact">
                  <thead>
                    <tr>
                      <th>Thực Thể Nguồn</th>
                      <th>Quan Hệ (Edge)</th>
                      <th>Thực Thể Đích</th>
                      <th>Độ Tin Cậy</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.map(rel => (
                      <tr key={rel.id}>
                        <td><code>{rel.source}</code></td>
                        <td><span className="edge-relation-pill">{rel.relation}</span></td>
                        <td><code>{rel.target}</code></td>
                        <td><span className="confidence-tag">{rel.confidence}</span></td>
                        <td>
                          <button 
                            className="icon-btn-danger"
                            onClick={() => setRelationships(relationships.filter(r => r.id !== rel.id))}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEO4J CYPHER TERMINAL */}
      {activeSubTab === 'cypher_terminal' && (
        <div className="panel-box">
          <div className="panel-title-bar flex-between">
            <div>
              <h3>Neo4j Cypher GQL Console (bolt://localhost:7687)</h3>
              <span className="sub-text">Thực thi truy vấn Cypher trực tiếp trên container neo4j_db với APOC plugins.</span>
            </div>
            <button className="primary-btn small" onClick={handleRunCypher} disabled={isCypherRunning}>
              <Play size={14} /> {isCypherRunning ? 'Đang Thực Thi...' : 'Chạy Cypher Query'}
            </button>
          </div>

          <div className="cypher-editor-wrapper mb-4">
            <textarea 
              rows={5}
              className="sop-textarea"
              style={{ fontFamily: 'monospace', background: '#18181B', color: '#38BDF8', fontSize: '0.95rem' }}
              value={cypherInput}
              onChange={e => setCypherInput(e.target.value)}
            />
          </div>

          <div className="panel-title-bar">
            <h4>Kết Quả Trả Về từ Neo4j Database:</h4>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                {cypherResults.length > 0 && Object.keys(cypherResults[0]).map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cypherResults.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}><code>{val}</code></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: QDRANT VECTOR COLLECTIONS */}
      {activeSubTab === 'qdrant_vectors' && (
        <div className="panel-box">
          <div className="panel-title-bar flex-between">
            <div>
              <h3>Qdrant Vector Database Explorer (http://localhost:6333)</h3>
              <span className="sub-text">Quản lý các Collection Vector 1536-dim và độ đo Cosine Similarity.</span>
            </div>
            <div className="flex-align-gap">
              <select 
                value={qdrantCollection} 
                onChange={e => setQdrantCollection(e.target.value)}
                style={{ padding: '0.4rem 0.8rem', borderRadius: '0.5rem', background: '#F4F4F5' }}
              >
                <option value="enterprise_knowledge">Collection: enterprise_knowledge</option>
                <option value="cuad_contracts">Collection: cuad_contracts</option>
                <option value="sales_embeddings">Collection: sales_embeddings</option>
              </select>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Vector ID</th>
                <th>Collection Name</th>
                <th>Dimensions</th>
                <th>Distance Metric</th>
                <th>Similarity Score</th>
                <th>Payload Metadata</th>
              </tr>
            </thead>
            <tbody>
              {qdrantPayloads.map(vec => (
                <tr key={vec.id}>
                  <td><code>{vec.id}</code></td>
                  <td><span className="edge-relation-pill">{vec.collection}</span></td>
                  <td>{vec.vector_dim}-dim</td>
                  <td>{vec.metric}</td>
                  <td><strong className="text-emerald">{(vec.payload.score * 100).toFixed(1)}% Match</strong></td>
                  <td>
                    <code>{JSON.stringify(vec.payload)}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: DOCUMENTS */}
      {activeSubTab === 'documents' && (
        <div className="panel-box">
          <div className="panel-title-bar">
            <h3>Danh Sách Tài Liệu Gốc Đã Trích Xuất Tri Thức</h3>
            <span className="sub-text">Xem trước nội dung văn bản hợp đồng PDF, bảng tính Excel và kiểm tra số thực thể đã bóc tách.</span>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Mã Tài Liệu</th>
                <th>Tên File</th>
                <th>Phân Loại</th>
                <th>Kích Thước</th>
                <th>Quy Mô Trích Xuất</th>
                <th>Số Thực Thể Node</th>
                <th>Trạng Thái Sync</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td><code>{doc.id}</code></td>
                  <td><strong>{doc.title}</strong></td>
                  <td>{doc.category}</td>
                  <td>{doc.size}</td>
                  <td>{doc.pages ? `${doc.pages} Trang` : `${doc.rows} Dòng`}</td>
                  <td><span className="highlight-tag">{doc.parsedEntities} Nodes</span></td>
                  <td><span className="status-badge success">{doc.status}</span></td>
                  <td>
                    <button className="outline-btn small">
                      <Eye size={14} /> Xem Trước PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: SOP AUTHORING */}
      {activeSubTab === 'sop' && (
        <div className="panel-box">
          <div className="panel-title-bar flex-between">
            <div>
              <h3>Soạn Thảo Quy Trình Nội Bộ & SOP (Knowledge Base Authoring)</h3>
              <span className="sub-text">Nội dung SOP soạn thảo tại đây sẽ tự động hóa thành các nút & liên kết tri thức trong GraphMind.</span>
            </div>
            <button className="primary-btn small" onClick={handleSaveSOP}>
              <Save size={14} /> {sopSaved ? 'Đã Lưu Vào Knowledge Graph!' : 'Lưu & Đưa Vào GraphRAG'}
            </button>
          </div>

          <div className="sop-editor-container">
            <div className="form-group mb-3">
              <label>Tiêu Đề Quy Trình Nội Bộ / SOP Policy</label>
              <input 
                type="text" 
                value={sopTitle}
                onChange={e => setSopTitle(e.target.value)}
                className="sop-title-input"
              />
            </div>

            <div className="form-group">
              <label>Nội Dung Chi Tiết SOP (Hệ thống AI sẽ tự động bóc tách Thực Thể)</label>
              <textarea 
                rows={14}
                value={sopContent}
                onChange={e => setSopContent(e.target.value)}
                className="sop-textarea"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeEditor;

