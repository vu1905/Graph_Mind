import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Building, 
  ShoppingBag, 
  UserCheck, 
  CheckCircle2, 
  ExternalLink,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EnterpriseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const [entities] = useState([
    {
      id: 'ENT-01',
      title: 'Công ty Cổ phần Bách Khoa Tech',
      type: 'Customer',
      dept: 'Kinh Doanh (Sales)',
      date: '2026-01-15',
      value: '8.4 Tỷ VNĐ',
      status: 'Active',
      snippet: 'Khách hàng quy mô vừa (SME) chuyên sản xuất và phân phối linh kiện điện tử. Tổng công nợ hiện tại 1.26 Tỷ VNĐ.',
      tags: ['VIP Gold', 'AdventureWorks', 'Graph Node #804']
    },
    {
      id: 'ENT-02',
      title: 'Hợp Đồng Cung Cấp Linh Kiện #99 (CONT-2026-99)',
      type: 'Contract',
      dept: 'Pháp Lý & Kế Toán',
      date: '2024-01-15',
      value: '4.2 Tỷ VNĐ',
      status: 'Expiring Soon',
      snippet: 'Hợp đồng khung cung cấp linh kiện thời hạn 24 tháng ký giữa GraphMind và Bách Khoa Tech. Hết hạn ngày 24/09/2026.',
      tags: ['CUAD Legal', 'High Value', '18 Days Left']
    },
    {
      id: 'ENT-03',
      title: 'Bicycle Touring Alpha v2 (PROD-102)',
      type: 'Product',
      dept: 'Sản Xuất & Xuất Khẩu',
      date: '2026-03-10',
      value: '$1,450 / Chiếc',
      status: 'Active',
      snippet: 'Dòng xe đạp thể thao Touring khung nhôm nguyên khối xuất khẩu thị trường Châu Âu. Sử dụng vật tư thép Việt Nhật.',
      tags: ['AdventureWorks Product', 'Best Seller']
    },
    {
      id: 'ENT-04',
      title: 'Quy Trình Xử Lý Thâm Hụt Hạn Mức Tín Dụng SOP',
      type: 'SOP Document',
      dept: 'Ban Giám Đốc & Kế Toán',
      date: '2026-08-01',
      value: 'Nội bộ',
      status: 'Active',
      snippet: 'Quy định hướng dẫn 3 bước xử lý tự động khi khách hàng VIP vượt hạn mức công nợ phê duyệt trên hệ thống.',
      tags: ['Internal Policy', 'SOP Guide']
    },
    {
      id: 'ENT-05',
      title: 'Tập đoàn Đầu tư EU Logistics',
      type: 'Customer',
      dept: 'Kinh Doanh (Sales)',
      date: '2025-11-20',
      value: '6.2 Tỷ VNĐ',
      status: 'Active',
      snippet: 'Đối tác chiến lược tiếp nhận đơn hàng xuất khẩu xe đạp sang thị trường EU.',
      tags: ['VIP Platinum', 'EU Partner']
    }
  ]);

  const filteredEntities = entities.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || item.type === selectedCategory;
    const matchesDept = selectedDept === 'ALL' || item.dept.includes(selectedDept);
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesDept && matchesStatus;
  });

  return (
    <div className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 5</div>
          <h2 className="module-title">Tìm Kiếm Đa Chiều Doanh Nghiệp (Enterprise Multi-facet Search)</h2>
          <p className="module-subtitle">
            Tra cứu siêu tốc duy nhất một ô tìm kiếm toàn bộ Khách hàng, Hợp đồng, Sản phẩm và Văn bản SOP.
          </p>
        </div>
      </div>

      {/* Hero Search Box */}
      <div className="enterprise-search-hero">
        <div className="search-bar-large">
          <Search size={22} className="search-icon-lg" />
          <input 
            type="text"
            placeholder="Nhập từ khóa tìm kiếm (Ví dụ: Bách Khoa Tech, Hợp đồng linh kiện, SOP tín dụng...)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
      </div>

      {/* Multi-facet Filter Matrix */}
      <div className="filter-matrix-bar mb-4">
        <div className="filter-group">
          <label><Sliders size={14} /> Loại Thực Thể:</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="ALL">Tất Cả Loại Thực Thể</option>
            <option value="Customer">Customer (Khách Hàng)</option>
            <option value="Contract">Contract (Hợp Đồng)</option>
            <option value="Product">Product (Sản Phẩm)</option>
            <option value="SOP Document">SOP Document (Chính Sách)</option>
          </select>
        </div>

        <div className="filter-group">
          <label><Building size={14} /> Bộ Phận Phụ Trách:</label>
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
            <option value="ALL">Tất Cả Bộ Phận</option>
            <option value="Kinh Doanh">Kinh Doanh (Sales)</option>
            <option value="Pháp Lý">Pháp Lý & Kế Toán</option>
            <option value="Sản Xuất">Sản Xuất & Xuất Khẩu</option>
            <option value="Ban Giám Đốc">Ban Giám Đốc</option>
          </select>
        </div>

        <div className="filter-group">
          <label><CheckCircle2 size={14} /> Trạng Thái Hợp Đồng/Hiệu Lực:</label>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            <option value="ALL">Tất Cả Trạng Thái</option>
            <option value="Active">Đang Hoạt Động (Active)</option>
            <option value="Expiring Soon">Sắp Hết Hạn (Expiring Soon)</option>
          </select>
        </div>
      </div>

      {/* Search Results Count */}
      <div className="results-header-info mb-3">
        <span>Tìm thấy <strong>{filteredEntities.length}</strong> kết quả tri thức phù hợp.</span>
      </div>

      {/* Results List */}
      <div className="search-results-grid">
        {filteredEntities.map(ent => (
          <div key={ent.id} className="search-result-card">
            <div className="result-card-header">
              <span className={`entity-chip ${ent.type.toLowerCase().replace(' ', '-')}`}>
                {ent.type}
              </span>
              <span className="dept-tag">{ent.dept}</span>
            </div>

            <h3 className="result-title">{ent.title}</h3>
            <p className="result-snippet">{ent.snippet}</p>

            <div className="result-tags-row">
              {ent.tags.map((tag, i) => (
                <span key={i} className="mini-tag">#{tag}</span>
              ))}
            </div>

            <div className="result-card-footer">
              <div className="result-meta">
                <span>Ngày tạo: {ent.date}</span>
                <span className="val-text">Giá trị: {ent.value}</span>
              </div>
              <button className="outline-btn small">
                Xem Chi Tiết Graph <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnterpriseSearch;
