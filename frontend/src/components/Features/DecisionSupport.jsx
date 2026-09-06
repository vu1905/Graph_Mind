import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Download, 
  Sparkles, 
  Users, 
  Calendar, 
  PieChart as PieIcon, 
  BarChart2, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const DecisionSupport = () => {
  const [activeTab, setActiveTab] = useState('executive_dashboard');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const [riskAlerts, setRiskAlerts] = useState([
    {
      id: 'ALT-101',
      severity: 'CRITICAL',
      title: 'Hợp Đồng Cung Cấp Linh Kiện #99 Sắp Hết Hạn',
      entity: 'Công ty Cổ phần Bách Khoa Tech',
      daysLeft: 18,
      expiryDate: '2026-09-24',
      value: '4.2 Tỷ VNĐ',
      description: 'Hợp đồng hết hạn trong 18 ngày tới. Chưa phát hiện phụ lục gia hạn trên hệ thống.',
      actionText: 'Tạo Phụ Lục Gia Hạn'
    },
    {
      id: 'ALT-102',
      severity: 'WARNING',
      title: 'Khách Hàng VIP Giảm Tần Suất Đặt Hàng Q3',
      entity: 'Tập đoàn Đầu tư EU Logistics',
      daysLeft: null,
      expiryDate: null,
      value: '$340,000 / Quý',
      description: 'Tần suất đơn hàng xuất khẩu giảm 35% so với quý trước. Cần kích hoạt quy trình CSKH.',
      actionText: 'Gửi Mail Chăm Sóc'
    },
    {
      id: 'ALT-103',
      severity: 'INFO',
      title: 'Cảnh Báo Tuân Thủ Điều Khoản Bảo Hành',
      entity: 'Xe Đạp Xuất Khẩu Touring Alpha v2',
      daysLeft: null,
      expiryDate: null,
      value: '1,280 Sản Phẩm',
      description: 'Tỷ lệ yêu cầu bảo hành tăng 4.2% tại thị trường Châu Âu. Cần rà soát nhà cung cấp Thép Việt Nhật.',
      actionText: 'Tra Cứu Nguồn Vật Tư'
    }
  ]);

  const topCustomers = [
    { name: 'Công ty Cổ phần Bách Khoa Tech', revenue: '8.4 Tỷ VNĐ', orders: 14, status: 'VIP Gold' },
    { name: 'Tập đoàn Đầu tư EU Logistics', revenue: '6.2 Tỷ VNĐ', orders: 8, status: 'VIP Platinum' },
    { name: 'Công ty TNHH Thương Mại Sài Gòn', revenue: '4.8 Tỷ VNĐ', orders: 19, status: 'Standard' },
    { name: 'Đại Lý Xe Đạp Miền Trung', revenue: '3.1 Tỷ VNĐ', orders: 22, status: 'Standard' }
  ];

  const handleGenerateBriefing = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setGeneratedReport({
        title: 'Báo Cáo Tóm Tắt Quản Trị & Rủi Ro Hợp Đồng (Executive Briefing Q3/2026)',
        generatedAt: new Date().toLocaleString('vi-VN'),
        summary: `Hệ thống GraphMind AI đã tự động tổng hợp toàn bộ tri thức doanh nghiệp trong tháng 09/2026:

1. TỔNG QUAN DOANH THU & HỢP ĐỒNG:
- Tổng số hợp đồng đang có hiệu lực: 48 Hợp đồng (Tổng giá trị 42.8 Tỷ VNĐ).
- Doanh thu thực tế đã ghi nhận trên AdventureWorks ERP: 28.4 Tỷ VNĐ (Đạt 88% mục tiêu quý 3).

2. CẢNH BÁO RỦI RO CẦN XỬ LÝ NGAY:
- 01 Hợp đồng VIP (Bách Khoa Tech - 4.2 Tỷ VNĐ) sắp hết hạn sau 18 ngày.
- 02 Điều khoản công nợ cần đôn đốc thu hồi với tổng giá trị 1.86 Tỷ VNĐ.

3. KHUYẾN NGHỊ BAN GIÁM ĐỐC:
- Phê duyệt gia hạn Hợp đồng #99 với Bách Khoa Tech trước ngày 15/09/2026.
- Chỉ đạo phòng Kinh doanh làm việc trực tiếp với EU Logistics để mở rộng quy mô đơn hàng quý 4.`,
        downloadUrl: '#'
      });
    }, 2200);
  };

  return (
    <div className="module-container">
      {/* Header */}
      <div className="module-header">
        <div>
          <div className="module-badge">Module 4</div>
          <h2 className="module-title">Hỗ Trợ Quyết Định Executive & Cảnh Báo Rủi Ro (Decision Support)</h2>
          <p className="module-subtitle">
            Bảng điều khiển kinh doanh tổng hợp, trung tâm phát hiện rủi ro hợp đồng tự động và trình tạo báo cáo Executive Briefing 1-Click.
          </p>
        </div>

        <div className="module-actions">
          <button 
            className={`primary-btn ${isGeneratingReport ? 'loading' : ''}`}
            onClick={handleGenerateBriefing}
            disabled={isGeneratingReport}
          >
            <Sparkles className={`icon ${isGeneratingReport ? 'spin' : ''}`} size={16} />
            {isGeneratingReport ? 'AI Đang Tạo Báo Cáo...' : 'Tạo Báo Cáo Executive Briefing'}
          </button>
        </div>
      </div>

      {/* Subtabs */}
      <div className="subtabs-bar">
        <button 
          className={`subtab-btn ${activeTab === 'executive_dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('executive_dashboard')}
        >
          <BarChart2 size={16} /> Bảng Điều Khiển Kinh Doanh Executive
        </button>

        <button 
          className={`subtab-btn ${activeTab === 'risk_alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk_alerts')}
        >
          <AlertTriangle size={16} /> Trung Tâm Cảnh Báo Rủi Ro ({riskAlerts.length})
        </button>
      </div>

      {/* TAB 1: EXECUTIVE DASHBOARD */}
      {activeTab === 'executive_dashboard' && (
        <div className="executive-dashboard-grid">
          {/* Key Metric Tiles */}
          <div className="telemetry-grid mb-4">
            <div className="telemetry-card">
              <div className="telemetry-label"><TrendingUp size={16} color="#10B981" /> Tổng Giá Trị Hợp Đồng</div>
              <div className="telemetry-value">42.8 Tỷ VNĐ</div>
              <div className="telemetry-sub text-emerald">+14.2% so với cùng kỳ năm trước</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label"><Users size={16} color="#3B82F6" /> Khách Hàng VIP Tích Cực</div>
              <div className="telemetry-value">28 Doanh Nghiệp</div>
              <div className="telemetry-sub">Chiếm 78% tổng doanh thu</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label"><AlertTriangle size={16} color="#F59E0B" /> Hợp Đồng Sắp Hết Hạn</div>
              <div className="telemetry-value text-amber">03 Hợp Đồng</div>
              <div className="telemetry-sub">Trong cửa sổ 15–30 ngày tới</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-label"><CheckCircle2 size={16} color="#8B5CF6" /> Tỷ Lệ Tuân Thủ Điều Khoản</div>
              <div className="telemetry-value">98.2%</div>
              <div className="telemetry-sub">Đạt chuẩn CUAD Benchmark</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid-cards-2col mb-4">
            {/* Chart 1: Revenue & Contract Distribution */}
            <div className="panel-box">
              <div className="panel-title-bar flex-between">
                <h3>Phân Bổ Loại Hợp Đồng & Doanh Thu</h3>
                <span className="sub-text">Cập nhật realtime từ GraphRAG</span>
              </div>
              
              <div className="custom-chart-bar-visual">
                <div className="chart-bar-row">
                  <span className="chart-label">Hợp đồng Cung ứng Linh kiện</span>
                  <div className="chart-bar-outer">
                    <div className="chart-bar-inner" style={{ width: '75%', background: '#0A6E78' }}></div>
                  </div>
                  <span className="chart-val">18.5 Tỷ</span>
                </div>

                <div className="chart-bar-row">
                  <span className="chart-label">Hợp đồng Xuất khẩu Sản phẩm</span>
                  <div className="chart-bar-outer">
                    <div className="chart-bar-inner" style={{ width: '60%', background: '#3B82F6' }}></div>
                  </div>
                  <span className="chart-val">14.2 Tỷ</span>
                </div>

                <div className="chart-bar-row">
                  <span className="chart-label">Hợp đồng Đại lý & Phân phối</span>
                  <div className="chart-bar-outer">
                    <div className="chart-bar-inner" style={{ width: '40%', background: '#10B981' }}></div>
                  </div>
                  <span className="chart-val">10.1 Tỷ</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Top High-value Customers */}
            <div className="panel-box">
              <div className="panel-title-bar">
                <h3>Top Khách Hàng Doanh Thu Cao Nhất</h3>
                <span className="sub-text">Xếp hạng theo tổng giá trị đơn hàng thực hiện</span>
              </div>

              <table className="custom-table compact">
                <thead>
                  <tr>
                    <th>Tên Doanh Nghiệp</th>
                    <th>Doanh Thu</th>
                    <th>Số Đơn</th>
                    <th>Phân Cấp</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((cust, idx) => (
                    <tr key={idx}>
                      <td><strong>{cust.name}</strong></td>
                      <td><span className="highlight-tag">{cust.revenue}</span></td>
                      <td>{cust.orders} Đơn</td>
                      <td><span className="status-badge success">{cust.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMART RISK ALERTS */}
      {activeTab === 'risk_alerts' && (
        <div className="panel-box">
          <div className="panel-title-bar">
            <h3>Danh Sách Cảnh Báo Rủi Ro Tự Động (Smart Risk & Alert Center)</h3>
            <span className="sub-text">GraphMind liên tục quét mạng lưới tri thức để phát hiện rủi ro quá hạn hợp đồng và biến động khách hàng.</span>
          </div>

          <div className="alerts-vertical-list">
            {riskAlerts.map(alert => (
              <div key={alert.id} className={`risk-alert-card ${alert.severity.toLowerCase()}`}>
                <div className="risk-header">
                  <div className="flex-align-gap">
                    <ShieldAlert size={20} className="risk-icon" />
                    <div>
                      <h4 className="risk-title">{alert.title}</h4>
                      <span className="risk-entity">{alert.entity}</span>
                    </div>
                  </div>
                  <span className={`severity-tag ${alert.severity.toLowerCase()}`}>
                    {alert.severity}
                  </span>
                </div>

                <p className="risk-desc">{alert.description}</p>

                <div className="risk-footer">
                  <div className="risk-meta">
                    {alert.daysLeft && <span className="days-left-badge"><Clock size={12} /> Còn {alert.daysLeft} ngày</span>}
                    <span className="value-badge">Giá trị: {alert.value}</span>
                  </div>
                  <button className="secondary-btn small">
                    {alert.actionText} <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal / Panel display for AI Generated Executive Briefing */}
      {generatedReport && (
        <div className="panel-box report-modal-box mt-4">
          <div className="panel-title-bar flex-between">
            <div className="flex-align-gap">
              <Sparkles size={20} color="#0A6E78" />
              <div>
                <h3>{generatedReport.title}</h3>
                <span className="sub-text">Tạo tự động lúc {generatedReport.generatedAt}</span>
              </div>
            </div>
            <button className="outline-btn small" onClick={() => setGeneratedReport(null)}>
              Đóng Tóm Tắt
            </button>
          </div>

          <div className="report-content-box">
            <pre className="report-text">{generatedReport.summary}</pre>
          </div>

          <div className="report-footer flex-between mt-3">
            <span className="info-text">Đã sẵn sàng xuất bản ra file văn bản cho Hội Đồng Quản Trị</span>
            <div className="flex-align-gap">
              <button className="secondary-btn small">
                <Download size={14} /> Xuất File PDF
              </button>
              <button className="primary-btn small">
                <Download size={14} /> Xuất File Word (.docx)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionSupport;
