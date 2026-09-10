import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-canvas-white font-body-md text-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">

    <header
        className="fixed top-0 left-0 right-0 z-50 bg-pure-surface/85 backdrop-blur-xl border-b border-whisper-border shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div
            className="h-20 max-w-[1400px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-lg">
            <div className="flex items-center gap-space-md shrink-0"><a className="flex items-center gap-space-sm group"
                    data-path="trang-chu" href="#"><img alt="Graph_Mind Geometric Node Logo"
                        className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
                        src="https://lh3.googleusercontent.com/aida/AEtjO1WuqlLcksyhzh1OmXUYAnD0-f1WQEYoc9Ews_U8k6a0ZUFMKQaNM9HEvaEn4yE7G2U7arUcIzlMSvIVQvIrljMlRfbMh1iUOGlTpNRUwBBS3her5qXTj1GqEmkxM9goosaepFNEIhLLKMbLAqmFH2s8yQBUc7WwW2ffo4xfTp8XnoNQMH95UXFA_H5_TBtZBysovgRtmpMrOXx_Jcd4I3TM9_aa9UJ8gUAH27zOGrqmSEJeK9ubTblEFJo" />
                    <div className="flex flex-col"><span
                            className="font-headline-sm text-headline-sm text-charcoal-ink font-bold tracking-tight">Graph_Mind</span><span
                            className="font-label-sm text-label-sm text-steel-secondary uppercase -mt-1">Cognitive
                            Substrate</span></div>
                </a></div>
            <nav className="hidden xl:flex items-center gap-space-xl" data-active-classes="text-primary font-semibold"><a
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="tinh-nang-cot-loi" href="#">Tính năng cốt lõi</a><a
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="kien-truc-graphrag" href="#">Kiến trúc GraphRAG</a><a
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="giai-phap-doanh-nghiep" href="#">Giải pháp Doanh nghiệp</a><a
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    data-path="tai-lieu-api" href="#">Tài liệu API</a></nav>
            <div className="flex items-center gap-space-md shrink-0"><a
                    className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs font-body-sm text-body-sm text-charcoal-ink border border-whisper-border rounded-full hover:bg-pure-surface hover:text-on-surface transition-all duration-150"
                    data-path="dang-nhap" href="#">Đăng nhập</a><a
                    className="inline-flex items-center justify-center px-space-lg py-space-xs font-body-sm text-body-sm text-on-primary bg-electric-blue hover:bg-electric-blue-hover rounded-full transition-transform active:scale-[0.98] shadow-sm font-medium"
                    data-path="yeu-cau-demo" href="#">Yêu cầu Demo / Đăng ký</a>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span
                        className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
        </div>
    </header>
    <main className="w-full pt-20 bg-canvas-white min-h-[1024px]">
        <div className="flex flex-col w-full">
            {/*  Top Ambient Canvas Lighting Layer  */}
            <div
                className="relative w-full max-w-[1400px] mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-2xl pb-space-4xl">
                <div
                    className="absolute top-0 right-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10">
                </div>
                <div
                    className="absolute top-48 left-10 w-80 h-80 bg-electric-blue/5 rounded-full blur-2xl pointer-events-none -z-10">
                </div>
                {/*  SECTION 1: ASYMMETRIC HERO SECTION (55% Copy / 45% Live Graph Visual)  */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center min-h-[calc(100dvh-5rem)]">
                    {/*  Left Column: Copy & Architectural Staging (7 cols = ~58%)  */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        {/*  Release Badge  */}
                        <div
                            className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-lowest shadow-sm w-fit mb-space-lg">
                            <span className="relative flex h-2 w-2"><span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-success opacity-75"></span><span
                                    className="relative inline-flex rounded-full h-2 w-2 bg-emerald-success"></span></span><span
                                className="font-label-sm text-label-sm text-charcoal-ink font-semibold tracking-wide">Nền
                                Tảng Trí Tuệ Dữ Liệu Doanh Nghiệp</span><span
                                className="font-label-sm text-label-sm text-electric-blue ml-space-xs font-medium">Đơn Giản
                                &amp; Hiệu Quả</span></div>
                        {/*  Hero Headline  */}
                        <h1
                            className="font-display-xl text-display-xl text-charcoal-ink font-extrabold tracking-tight mb-space-md max-w-2xl leading-[1.08]">
                            Biến Tài Liệu &amp; Hợp Đồng Rời Rạc Thành Trí Tuệ Doanh Nghiệp Dễ Hiểu</h1>
                        {/*  Subheading  */}
                        <p className="font-body-lg text-body-lg text-steel-secondary max-w-xl mb-space-xl leading-relaxed">
                            Hệ thống tự động đọc, kết nối và phân tích toàn bộ hợp đồng, đối tác và tài liệu nội bộ.
                            Giúp ban lãnh đạo và các phòng ban tra cứu tức thì, chính xác 100% không còn nhầm lẫn.</p>
                        {/*  CTA Action Hub  */}
                        <div className="flex flex-wrap items-center gap-space-md mb-space-3xl"><a
                                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md font-body-md text-body-md text-on-primary bg-electric-blue hover:bg-electric-blue-hover rounded-full transition-all duration-200 active:scale-[0.98] shadow-md font-semibold group"
                                data-path="kham-pha-demo" href="#"><span className="">Dùng Thử Miễn Phí</span><span
                                    className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span></a><a
                                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md font-body-md text-body-md text-charcoal-ink bg-surface-container-lowest hover:bg-surface-container-high rounded-full transition-all duration-150 shadow-sm font-medium"
                                data-path="dang-nhap" href="#"><span
                                    className="material-symbols-outlined text-steel-secondary text-[18px]">play_circle</span><span
                                    className="">Xem Giới Thiệu Tính Năng</span></a></div>
                        {/*  Proof Stats Strip (Geist Mono)  */}
                        <div className="pt-space-lg">
                            <div className="grid grid-cols-3 gap-space-md max-w-lg">
                                <div className="flex flex-col"><span
                                        className="font-label-md text-label-md text-charcoal-ink font-bold">Tiết kiệm
                                        85%</span><span
                                        className="font-label-sm text-label-sm text-steel-secondary mt-space-2xs">Thời gian
                                        tra cứu &amp; đối soát</span></div>
                                <div className="flex flex-col"><span
                                        className="font-label-md text-label-md text-emerald-success font-bold">Chính xác
                                        100%</span><span
                                        className="font-label-sm text-label-sm text-steel-secondary mt-space-2xs">Dẫn chứng
                                        điều khoản gốc</span></div>
                                <div className="flex flex-col"><span
                                        className="font-label-md text-label-md text-electric-blue font-bold">Dưới 1
                                        giây</span><span
                                        className="font-label-sm text-label-sm text-steel-secondary mt-space-2xs">Truy xuất
                                        mọi liên kết</span></div>
                            </div>
                        </div>
                    </div>
                    {/*  Right Column: Interactive Subgraph Visual Staging (5 cols = ~42%)  */}
                    <div className="lg:col-span-5 relative w-full flex items-center justify-center">
                        {/*  Floating Backdrop Canvas  */}
                        <div
                            className="w-full bg-surface-container-lowest rounded-xl p-space-xl shadow-xl relative overflow-hidden flex flex-col gap-space-lg">
                            <div className="flex items-center justify-between pb-space-sm border-b border-whisper-border">
                                <div className="flex items-center gap-space-xs"><span
                                        className="w-2.5 h-2.5 rounded-full bg-emerald-success"></span><span
                                        className="font-headline-sm text-sm text-charcoal-ink font-bold">Hồ Sơ Hợp Đồng
                                        &amp; Đối Tác Chiến Lược</span></div>
                                <div
                                    className="flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full bg-emerald-success/10 text-emerald-success">
                                    <span className="material-symbols-outlined text-[14px]">verified</span><span
                                        className="font-label-sm font-semibold">Đã xác thực pháp lý</span></div>
                            </div>
                            <div className="flex flex-col gap-space-sm">
                                <div
                                    className="bg-surface-container-low rounded-lg p-space-sm border border-whisper-border">
                                    <div className="flex items-center justify-between mb-1"><span
                                            className="font-label-sm text-steel-secondary">Bên ký kết chính</span><span
                                            className="font-label-sm text-electric-blue font-medium bg-electric-blue/10 px-2 py-0.5 rounded-full">Đang
                                            thực hiện</span></div>
                                    <p className="font-headline-sm text-sm text-charcoal-ink font-bold">Tập đoàn An Phát</p>
                                    <p className="font-body-sm text-steel-secondary text-xs mt-0.5">Gói thầu xây dựng hạ
                                        tầng số · 60 Tỷ VNĐ</p>
                                </div>
                                <div className="flex items-center justify-center py-0.5">
                                    <div
                                        className="inline-flex items-center gap-space-2xs bg-canvas-white border border-whisper-border px-space-sm py-1 rounded-full text-xs text-steel-secondary shadow-sm">
                                        <span
                                            className="material-symbols-outlined text-electric-blue text-[16px]">sync_alt</span><span
                                            className="font-medium text-charcoal-ink">Bảo lãnh tài chính 100%</span><span
                                            className="material-symbols-outlined text-[14px]">arrow_downward</span></div>
                                </div>
                                <div
                                    className="bg-surface-container-low rounded-lg p-space-sm border border-whisper-border">
                                    <div className="flex items-center justify-between mb-1"><span
                                            className="font-label-sm text-steel-secondary">Đơn vị bảo lãnh</span><span
                                            className="font-label-sm text-emerald-success font-medium bg-emerald-success/10 px-2 py-0.5 rounded-full">Cam
                                            kết hiệu lực</span></div>
                                    <p className="font-headline-sm text-sm text-charcoal-ink font-bold">Tập đoàn VietCap
                                        Holding</p>
                                    <p className="font-body-sm text-steel-secondary text-xs mt-0.5">Cam kết trách nhiệm liên
                                        đới trong 15 ngày kích hoạt</p>
                                </div>
                                <div
                                    className="bg-rose-error/10 border border-rose-error/20 rounded-lg p-space-sm flex items-start gap-space-xs">
                                    <span
                                        className="material-symbols-outlined text-rose-error text-[18px] shrink-0 mt-0.5">warning</span>
                                    <div>
                                        <p className="font-label-sm text-rose-error font-bold">Lưu ý rủi ro hợp đồng</p>
                                        <p className="font-body-sm text-xs text-charcoal-ink">Mức phạt chậm tiến độ
                                            0.5%/ngày (Tối đa 4.8 Tỷ VNĐ). Cần kiểm tra biên bản nghiệm thu trước ngày
                                            15 hàng tháng.</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="bg-canvas-white border border-whisper-border rounded-lg p-space-sm flex flex-col gap-space-xs">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-space-2xs text-electric-blue font-semibold"><span
                                            className="material-symbols-outlined text-[16px]">chat_spark</span><span
                                            className="">Câu hỏi đề xuất</span></div><span
                                        className="text-[11px] text-steel-secondary">1-click phân tích</span>
                                </div>
                                <div
                                    className="bg-surface-container-lowest p-space-xs rounded border border-whisper-border text-xs text-charcoal-ink font-medium hover:border-electric-blue cursor-pointer transition-colors">
                                    Hỏi AI: Nếu An Phát chậm tiến độ, VietCap chịu trách nhiệm thế nào?</div>
                                <div
                                    className="text-xs text-steel-secondary leading-snug bg-surface-container-low p-space-xs rounded">
                                    <strong className="text-charcoal-ink font-semibold">Tóm tắt AI:</strong> VietCap có
                                    nghĩa vụ thanh toán khoản phạt thay thế trong vòng 15 ngày làm việc theo Điều 8.4,
                                    có đính kèm văn bản ủy quyền số 12/UQ-VC.</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  SECTION 2: BENTO GRID FEATURE ARCHITECTURE (Row 1: 3 Cols / Row 2: 70/30 Split)  */}
                <section className="mt-space-5xl">
                    {/*  Section Meta Header  */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-3xl gap-space-md">
                        <div><span
                                className="font-label-sm text-label-sm text-electric-blue font-mono uppercase tracking-wider block mb-space-2xs">Tổng
                                Quan Giải Pháp</span>
                            <h2 className="font-headline-lg text-headline-lg text-charcoal-ink font-bold tracking-tight">
                                Những Gì Graph_Mind Mang Lại Cho Doanh Nghiệp</h2>
                        </div>
                        <p className="font-body-sm text-body-sm text-steel-secondary max-w-md">Dễ dàng sử dụng ngay cho mọi
                            phòng ban — từ Pháp chế, Kế toán, Kinh doanh đến Ban Điều hành mà không cần kiến thức kỹ
                            thuật.</p>
                    </div>
                    {/*  Bento Tier A: 3 Columns Grid  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl mb-space-xl">
                        <div
                            className="bg-surface-container-lowest rounded-lg p-space-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                            <div>
                                <div
                                    className="w-12 h-12 rounded-DEFAULT bg-primary-fixed flex items-center justify-center mb-space-lg text-on-primary-fixed">
                                    <span className="material-symbols-outlined text-[26px]">cloud_sync</span></div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono">Tính năng
                                    01</span>
                                <h3
                                    className="font-headline-sm text-headline-sm text-charcoal-ink font-bold mt-space-2xs mb-space-sm">
                                    Tự Động Kết Nối &amp; Đồng Bộ Dữ Liệu</h3>
                                <p className="font-body-sm text-body-sm text-steel-secondary leading-relaxed mb-space-lg">
                                    Kết nối nhanh Google Drive, Excel, Word và PDF chỉ với 1 click. Hệ thống tự động
                                    theo dõi thay đổi và cập nhật thông tin mới nhất.</p>
                            </div>
                            <div
                                className="bg-canvas-white rounded-DEFAULT p-space-sm flex flex-col gap-space-xs text-[12px]">
                                <div className="flex items-center justify-between text-steel-secondary"><span className="">Tài
                                        liệu: Hợp đồng &amp; Phụ lục</span><span
                                        className="text-emerald-success font-semibold flex items-center gap-1"><span
                                            className="w-1.5 h-1.5 rounded-full bg-emerald-success"></span>Đang kết
                                        nối</span></div>
                                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-electric-blue h-full w-[85%] rounded-full"></div>
                                </div><span className="text-steel-secondary text-[11px]">Đã đồng bộ 12,480 hồ sơ kinh doanh
                                    hoàn chỉnh</span>
                            </div>
                        </div>
                        <div
                            className="bg-surface-container-lowest rounded-lg p-space-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                            <div>
                                <div
                                    className="w-12 h-12 rounded-DEFAULT bg-secondary-fixed flex items-center justify-center mb-space-lg text-on-secondary-fixed">
                                    <span className="material-symbols-outlined text-[26px]">account_tree</span></div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono">Tính năng
                                    02</span>
                                <h3
                                    className="font-headline-sm text-headline-sm text-charcoal-ink font-bold mt-space-2xs mb-space-sm">
                                    Kiểm Soát &amp; Quản Lý Quan Hệ Doanh Nghiệp</h3>
                                <p className="font-body-sm text-body-sm text-steel-secondary leading-relaxed mb-space-lg">Hệ
                                    thống tự động liên kết hợp đồng, đối tác và phân cấp công ty mẹ - công ty con rõ
                                    ràng, không lo sót điều khoản pháp lý.</p>
                            </div>
                            <div
                                className="bg-canvas-white rounded-DEFAULT p-space-sm text-[11px] flex flex-col gap-space-2xs">
                                <div className="flex items-center gap-space-xs text-charcoal-ink font-semibold"><span
                                        className="material-symbols-outlined text-[16px] text-electric-blue">verified_user</span><span
                                        className="">Kiểm tra chéo đối tác</span></div>
                                <div
                                    className="text-steel-secondary text-[11px] py-1 bg-surface-container-low px-2 rounded">
                                    Quan hệ sở hữu: Tập đoàn mẹ &gt; 51% Cổ phần chi phối</div><span
                                    className="text-emerald-success font-medium">Chính xác · 0 xung đột nghĩa vụ</span>
                            </div>
                        </div>
                        <div
                            className="bg-surface-container-lowest rounded-lg p-space-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                            <div>
                                <div
                                    className="w-12 h-12 rounded-DEFAULT bg-surface-container-high flex items-center justify-center mb-space-lg text-charcoal-ink">
                                    <span className="material-symbols-outlined text-[26px]">quickreference</span></div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono">Tính năng
                                    03</span>
                                <h3
                                    className="font-headline-sm text-headline-sm text-charcoal-ink font-bold mt-space-2xs mb-space-sm">
                                    Trợ Lý AI Tra Cứu Thông Minh</h3>
                                <p className="font-body-sm text-body-sm text-steel-secondary leading-relaxed mb-space-lg">
                                    Hỏi đáp hợp đồng và chính sách bằng tiếng Việt tự nhiên, trả lời chính xác có dẫn
                                    chứng số trang hợp đồng và điều khoản đính kèm.</p>
                            </div>
                            <div className="bg-canvas-white rounded-DEFAULT p-space-sm flex flex-col gap-space-xs">
                                <div className="flex items-center justify-between text-[11px]"><span
                                        className="text-steel-secondary">Đường dẫn đối soát</span><span
                                        className="text-electric-blue font-bold">Minh bạch 100%</span></div>
                                <div className="flex items-center gap-1 flex-wrap"><span
                                        className="px-2 py-0.5 bg-surface-container-highest rounded-full text-[11px]">Hợp
                                        đồng</span><span className="text-steel-secondary text-xs">→</span><span
                                        className="px-2 py-0.5 bg-surface-container-highest rounded-full text-[11px]">Điều
                                        khoản</span><span className="text-steel-secondary text-xs">→</span><span
                                        className="px-2 py-0.5 bg-surface-container-highest rounded-full text-[11px]">Trang
                                        14</span><span className="text-steel-secondary text-xs">→</span><span
                                        className="px-2 py-0.5 bg-emerald-success/20 text-emerald-success font-semibold rounded-full text-[11px]">Kết
                                        luận</span></div>
                            </div>
                        </div>
                    </div>
                    {/*  Bento Tier B: 2 Columns 70/30 Architectural Split  */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                        <div
                            className="lg:col-span-8 bg-surface-container-lowest rounded-lg p-space-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-space-lg">
                                    <div className="flex items-center gap-space-sm">
                                        <div
                                            className="w-12 h-12 rounded-DEFAULT bg-primary-container flex items-center justify-center text-on-primary-container">
                                            <span className="material-symbols-outlined text-[26px]">query_stats</span></div>
                                        <div><span
                                                className="font-label-sm text-label-sm text-steel-secondary font-mono">Tính
                                                năng 04</span>
                                            <h3 className="font-headline-sm text-headline-sm text-charcoal-ink font-bold">
                                                Cảnh Báo Sớm Rủi Ro &amp; Báo Cáo Điều Hành</h3>
                                        </div>
                                    </div><span
                                        className="font-label-sm text-label-sm px-space-sm py-space-2xs rounded-full bg-amber-warning/10 text-amber-warning font-semibold hidden sm:inline-block">Hệ
                                        Thống Cảnh Báo Sớm</span>
                                </div>
                                <p
                                    className="font-body-md text-body-md text-steel-secondary leading-relaxed mb-space-xl max-w-2xl">
                                    Tự động phát hiện hợp đồng sắp đến hạn, cảnh báo đối tác chậm tiến độ trước 15-30
                                    ngày và xuất báo cáo chỉ huy 1-click cho ban điều hành.</p>
                            </div>
                            <div className="bg-canvas-white rounded-lg p-space-lg">
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm mb-space-sm border-b border-whisper-border">
                                    <div className="flex items-center gap-space-xs"><span
                                            className="material-symbols-outlined text-rose-error text-[20px]">warning</span><span
                                            className="font-headline-sm text-headline-sm text-sm text-charcoal-ink font-bold">Theo
                                            Dõi Hợp Đồng &amp; Rủi Ro Đối Tác Lớn</span></div><span
                                        className="font-label-sm text-label-sm text-steel-secondary">Cập nhật: Hôm
                                        nay</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                                    <div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT shadow-sm"><span
                                            className="font-label-sm text-label-sm text-steel-secondary">Hợp đồng Cận Hạn
                                            (15 Ngày)</span>
                                        <p className="font-headline-md text-headline-md text-charcoal-ink font-bold mt-1">18
                                            <span
                                                className="font-label-sm text-label-sm text-emerald-success font-normal">(3
                                                đã xử lý)</span></p>
                                        <div
                                            className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-rose-error h-full w-[65%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT shadow-sm"><span
                                            className="font-label-sm text-label-sm text-steel-secondary">Tổng Giá Trị Bảo
                                            Lãnh</span>
                                        <p className="font-headline-md text-headline-md text-charcoal-ink font-bold mt-1">
                                            1,420 <span
                                                className="font-label-sm text-label-sm text-steel-secondary font-normal">Tỷ
                                                VNĐ</span></p>
                                        <div
                                            className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-electric-blue h-full w-[82%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-space-sm rounded-DEFAULT shadow-sm"><span
                                            className="font-label-sm text-label-sm text-steel-secondary">Mức Độ An Toàn Pháp
                                            Lý</span>
                                        <p
                                            className="font-headline-md text-headline-md text-emerald-success font-bold mt-1">
                                            99.1% <span
                                                className="font-label-sm text-label-sm text-steel-secondary font-normal">Chuẩn
                                                mực</span></p>
                                        <div
                                            className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-success h-full w-[99%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="lg:col-span-4 bg-surface-container-lowest rounded-lg p-space-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
                            <div>
                                <div
                                    className="w-12 h-12 rounded-DEFAULT bg-surface-container-high flex items-center justify-center mb-space-lg text-charcoal-ink">
                                    <span className="material-symbols-outlined text-[26px]">shield</span></div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono">Tính năng
                                    05</span>
                                <h3
                                    className="font-headline-sm text-headline-sm text-charcoal-ink font-bold mt-space-2xs mb-space-sm">
                                    Phân Quyền Truy Cập &amp; Bảo Mật Dữ Liệu</h3>
                                <p className="font-body-sm text-body-sm text-steel-secondary leading-relaxed mb-space-lg">
                                    Bảo mật tuyệt đối, phân quyền xem tài liệu theo từng phòng ban và cấp quản lý. Đảm
                                    bảo nhân sự chỉ tiếp cận thông tin được phép.</p>
                            </div>
                            <div className="space-y-space-xs text-[12px]">
                                <div
                                    className="flex items-center justify-between p-space-xs bg-canvas-white rounded-DEFAULT">
                                    <span className="text-steel-secondary">Phân quyền phòng ban:</span><span
                                        className="text-charcoal-ink font-semibold">Pháp chế &amp; Ban Giám đốc</span></div>
                                <div
                                    className="flex items-center justify-between p-space-xs bg-canvas-white rounded-DEFAULT">
                                    <span className="text-steel-secondary">Mã hóa bảo mật:</span><span
                                        className="text-emerald-success font-semibold">Cấp ngân hàng (AES-256)</span></div>
                                <div
                                    className="flex items-center justify-between p-space-xs bg-canvas-white rounded-DEFAULT">
                                    <span className="text-steel-secondary">Nhật ký truy vết:</span><span
                                        className="text-electric-blue font-semibold">Lưu vết đầy đủ 100%</span></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  SECTION 3: ARCHITECTURE PIPELINE (4 Progressive Steps)  */}
                <section className="mt-space-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-space-3xl"><span
                            className="font-label-sm text-label-sm text-electric-blue font-mono uppercase tracking-wider block mb-space-2xs">Quy
                            Trình Vận Hành Đơn Giản</span>
                        <h2 className="font-headline-lg text-headline-lg text-charcoal-ink font-bold tracking-tight">4 Bước
                            Biến Tài Liệu Thành Hành Động</h2>
                        <p className="font-body-md text-body-md text-steel-secondary mt-space-xs">Từ các tập tin văn bản ban
                            đầu đến kết quả tra cứu tức thì, chính xác và có thể kiểm chứng trong mọi nghiệp vụ.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
                        <div
                            className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                            <div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono block mb-space-md">BƯỚC
                                    01</span>
                                <div
                                    className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-space-md">
                                    <span className="material-symbols-outlined text-[20px]">upload_file</span></div>
                                <h4
                                    className="font-headline-sm text-headline-sm text-base text-charcoal-ink font-bold mb-space-xs">
                                    Tải Lên Tài Liệu</h4>
                                <p className="font-body-sm text-body-sm text-steel-secondary">Kéo thả hợp đồng, hồ sơ pháp
                                    lý, biên bản họp và tài liệu nội bộ từ máy tính hoặc Google Drive.</p>
                            </div>
                            <div
                                className="mt-space-lg pt-space-md border-t border-whisper-border text-xs text-steel-secondary">
                                Thời gian: Chưa đến 30 giây</div>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                            <div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono block mb-space-md">BƯỚC
                                    02</span>
                                <div
                                    className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-space-md">
                                    <span className="material-symbols-outlined text-[20px]">smart_toy</span></div>
                                <h4
                                    className="font-headline-sm text-headline-sm text-base text-charcoal-ink font-bold mb-space-xs">
                                    AI Tự Động Phân Tích</h4>
                                <p className="font-body-sm text-body-sm text-steel-secondary">Nhận diện các bên liên quan,
                                    người đại diện, nghĩa vụ, thời hạn và các cam kết tài chính quan trọng.</p>
                            </div>
                            <div
                                className="mt-space-lg pt-space-md border-t border-whisper-border text-xs text-steel-secondary">
                                Độ chính xác: 99.4%</div>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                            <div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono block mb-space-md">BƯỚC
                                    03</span>
                                <div
                                    className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-charcoal-ink mb-space-md">
                                    <span className="material-symbols-outlined text-[20px]">hub</span></div>
                                <h4
                                    className="font-headline-sm text-headline-sm text-base text-charcoal-ink font-bold mb-space-xs">
                                    Liên Kết Mối Quan Hệ</h4>
                                <p className="font-body-sm text-body-sm text-steel-secondary">Tự động nối mạng lưới công ty,
                                    người đại diện pháp luật, công ty con và các điều khoản phạt liên đới.</p>
                            </div>
                            <div
                                className="mt-space-lg pt-space-md border-t border-whisper-border text-xs text-steel-secondary">
                                Tự động hóa hoàn toàn</div>
                        </div>
                        <div
                            className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-shadow">
                            <div><span
                                    className="font-label-sm text-label-sm text-steel-secondary font-mono block mb-space-md">BƯỚC
                                    04</span>
                                <div
                                    className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-on-primary mb-space-md">
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span></div>
                                <h4
                                    className="font-headline-sm text-headline-sm text-base text-charcoal-ink font-bold mb-space-xs">
                                    Tra Cứu &amp; Ra Quyết Định</h4>
                                <p className="font-body-sm text-body-sm text-steel-secondary">Nhận ngay câu trả lời chính
                                    xác, trích dẫn trang tài liệu gốc và cảnh báo rủi ro hợp đồng tức thì.</p>
                            </div>
                            <div
                                className="mt-space-lg pt-space-md border-t border-whisper-border text-xs text-emerald-success font-semibold">
                                Không ảo giác thông tin</div>
                        </div>
                    </div>
                </section>
                {/*  SECTION 4: ENTERPRISE TRUST & COMPLIANCE SECTION  */}
                <section className="mt-space-5xl bg-surface-container-lowest rounded-xl p-space-2xl shadow-sm">
                    <div className="text-center max-w-2xl mx-auto mb-space-2xl"><span
                            className="font-label-sm text-label-sm text-electric-blue font-mono uppercase tracking-wider block mb-space-2xs">Cam
                            Kết Doanh Nghiệp</span>
                        <h3 className="font-headline-md text-headline-md text-charcoal-ink font-bold">An Toàn Bảo Mật &amp;
                            Triển Khai Trong Tầm Tay</h3>
                        <p className="font-body-sm text-body-sm text-steel-secondary mt-space-xs">Thiết kế để bảo vệ dữ liệu
                            tuyệt đối và mang lại giá trị ngay trong tuần đầu tiên áp dụng.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                        <div className="p-space-lg rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                            <div
                                className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-space-xs">
                                <span className="material-symbols-outlined text-[20px]">verified_user</span></div>
                            <h4 className="font-headline-sm text-sm font-bold text-charcoal-ink">Bảo Mật Cấp Doanh Nghiệp
                            </h4>
                            <p className="font-body-sm text-xs text-steel-secondary leading-relaxed">Dữ liệu được mã hóa đa
                                lớp, chỉ phân quyền cho người có thẩm quyền. Doanh nghiệp làm chủ hoàn toàn dữ liệu của
                                mình.</p>
                        </div>
                        <div className="p-space-lg rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                            <div
                                className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-space-xs">
                                <span className="material-symbols-outlined text-[20px]">flash_on</span></div>
                            <h4 className="font-headline-sm text-sm font-bold text-charcoal-ink">Triển Khai Trong 24 Giờ
                            </h4>
                            <p className="font-body-sm text-xs text-steel-secondary leading-relaxed">Không yêu cầu cài đặt
                                phức tạp hay đội ngũ IT riêng. Kết nối kho tài liệu có sẵn và bắt đầu sử dụng ngay lập
                                tức.</p>
                        </div>
                        <div className="p-space-lg rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                            <div
                                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-charcoal-ink mb-space-xs">
                                <span className="material-symbols-outlined text-[20px]">support_agent</span></div>
                            <h4 className="font-headline-sm text-sm font-bold text-charcoal-ink">Đồng Hành Chuyên Nghiệp
                            </h4>
                            <p className="font-body-sm text-xs text-steel-secondary leading-relaxed">Đội ngũ chuyên gia hỗ
                                trợ hướng dẫn tận tình, đồng hành giải quyết mọi bài toán thực tế của doanh nghiệp bạn.
                            </p>
                        </div>
                    </div>
                </section>
                {/*  SECTION 5: FINAL CONVERSION BANNER  */}
                <section className="mt-space-5xl mb-space-3xl">
                    <div
                        className="w-full bg-surface-container-lowest rounded-xl p-space-3xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                        <div
                            className="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none">
                        </div>
                        <div
                            className="absolute -bottom-12 -left-12 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none">
                        </div><span
                            className="font-label-sm text-label-sm text-electric-blue font-mono uppercase tracking-widest block mb-space-xs">Bắt
                            Đầu Ngay Hôm Nay</span>
                        <h2
                            className="font-headline-lg text-headline-lg text-charcoal-ink font-extrabold max-w-2xl tracking-tight mb-space-md">
                            Sẵn Sàng Đơn Giản Hóa Quản Trị Dữ Liệu Doanh Nghiệp Của Bạn?</h2>
                        <p className="font-body-lg text-body-lg text-steel-secondary max-w-xl mb-space-2xl">Bắt đầu chuyển
                            hóa tài liệu, hợp đồng và quan hệ đối tác thành nguồn tri thức thông minh, phục vụ ra quyết
                            định nhanh chóng và an toàn.</p>
                        <div className="flex flex-wrap items-center justify-center gap-space-md"><a
                                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md font-body-md text-body-md text-on-primary bg-electric-blue hover:bg-electric-blue-hover rounded-full transition-all duration-200 active:scale-[0.98] shadow-md font-semibold"
                                data-path="dang-ky-doanh-nghiep" href="#"><span className="">Tạo Tài Khoản Doanh
                                    Nghiệp</span><span
                                    className="material-symbols-outlined text-[18px]">chevron_right</span></a><a
                                className="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-md font-body-md text-body-md text-charcoal-ink bg-surface-container-lowest hover:bg-surface-container-high rounded-full transition-all duration-150 shadow-sm font-medium"
                                data-path="lien-he-chuyen-gia" href="#"><span
                                    className="material-symbols-outlined text-steel-secondary text-[18px]">event_available</span><span
                                    className="">Đặt Lịch Hẹn Demo 1-1</span></a></div><span
                            className="font-label-sm text-label-sm text-steel-secondary font-mono mt-space-xl">Đăng ký nhanh
                            trong 2 phút · Không yêu cầu thẻ tín dụng · Hỗ trợ triển khai nhanh chóng</span>
                    </div>
                </section>
            </div>
        </div>
    </main>
    <footer className="w-full bg-pure-surface border-t border-whisper-border">
        <div className="max-w-[1400px] mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-4xl pb-space-2xl">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-2xl pb-space-3xl border-b border-whisper-border">
                <div className="lg:col-span-2 flex flex-col gap-space-md pr-space-lg">
                    <div className="flex items-center gap-space-sm"><img alt="Graph_Mind Brand Logo"
                            className="h-7 w-auto object-contain"
                            src="https://lh3.googleusercontent.com/aida/AEtjO1WuqlLcksyhzh1OmXUYAnD0-f1WQEYoc9Ews_U8k6a0ZUFMKQaNM9HEvaEn4yE7G2U7arUcIzlMSvIVQvIrljMlRfbMh1iUOGlTpNRUwBBS3her5qXTj1GqEmkxM9goosaepFNEIhLLKMbLAqmFH2s8yQBUc7WwW2ffo4xfTp8XnoNQMH95UXFA_H5_TBtZBysovgRtmpMrOXx_Jcd4I3TM9_aa9UJ8gUAH27zOGrqmSEJeK9ubTblEFJo" /><span
                            className="font-headline-sm text-headline-sm text-charcoal-ink font-bold tracking-tight">Graph_Mind</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-steel-secondary max-w-sm leading-relaxed">Nền Tảng Quản Trị
                        &amp; Tra Cứu Tri Thức Doanh Nghiệp Toàn Diện. Giúp doanh nghiệp biến toàn bộ hồ sơ, hợp đồng và
                        quy trình thành trợ lý thông minh, an toàn tuyệt đối.</p>
                    <div className="flex items-center gap-space-xs pt-space-xs"><span
                            className="w-2 h-2 rounded-full bg-emerald-success animate-pulse"></span><span
                            className="font-label-sm text-label-sm text-charcoal-ink font-medium">Trạng thái hệ thống: Hoạt
                            động ổn định</span><span
                            className="font-label-sm text-label-sm text-steel-secondary ml-space-xs font-mono">(99.99%)</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-headline-sm text-headline-sm text-charcoal-ink font-semibold mb-space-md text-base">
                        Sản phẩm</h4>
                    <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm">
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Khám
                            Phá Quan Hệ Đối Tác</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Trợ
                            Lý AI Hợp Đồng</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Báo
                            Cáo Điều Hành Tự Động</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Hệ
                            Thống Cảnh Báo Rủi Ro</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Phân
                            Quyền &amp; Quản Lý Hồ Sơ</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline-sm text-headline-sm text-charcoal-ink font-semibold mb-space-md text-base">
                        Giải pháp</h4>
                    <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm">
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Tài
                            chính &amp; Chống Gian Lận</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Y tế
                            &amp; Dược phẩm Sinh học</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Chuỗi
                            Cung ứng Toàn cầu</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Tình
                            báo An ninh Mạng</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Pháp
                            lý &amp; Thẩm tra Doanh nghiệp</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline-sm text-headline-sm text-charcoal-ink font-semibold mb-space-md text-base">
                        Công nghệ</h4>
                    <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm">
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Tài
                            liệu API &amp; GraphQL</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Kiến
                            trúc Phân tán</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Mã
                            nguồn mở Substrates</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Báo
                            cáo Đánh giá Benchmark</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                            Release Notes v4.2</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-headline-sm text-headline-sm text-charcoal-ink font-semibold mb-space-md text-base">
                        Pháp chế &amp; Tuân thủ</h4>
                    <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm">
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Chính
                            sách Quyền riêng tư</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Thỏa
                            thuận Dịch vụ (SLA)</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Báo
                            cáo Kiểm toán SOC2</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Xử lý
                            Dữ liệu GDPR &amp; HIPAA</li>
                        <li className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Cổng
                            Báo cáo Lỗ hổng Bảo mật</li>
                    </ul>
                </div>
            </div>
            <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
                <div className="flex flex-wrap items-center gap-space-sm"><span
                        className="inline-flex items-center px-space-sm py-space-2xs rounded-full bg-surface-container-high text-steel-secondary font-label-sm text-label-sm border border-whisper-border"><span
                            className="w-1.5 h-1.5 rounded-full bg-electric-blue mr-1.5"></span>ISO 27001
                        Certified</span><span
                        className="inline-flex items-center px-space-sm py-space-2xs rounded-full bg-surface-container-high text-steel-secondary font-label-sm text-label-sm border border-whisper-border"><span
                            className="w-1.5 h-1.5 rounded-full bg-electric-blue mr-1.5"></span>SOC2 Type II
                        Attested</span><span
                        className="inline-flex items-center px-space-sm py-space-2xs rounded-full bg-surface-container-high text-steel-secondary font-label-sm text-label-sm border border-whisper-border"><span
                            className="w-1.5 h-1.5 rounded-full bg-electric-blue mr-1.5"></span>TLS 1.3 Strict
                        Encrypted</span></div>
                <div className="font-body-sm text-body-sm text-steel-secondary text-center md:text-right">© 2025 Graph_Mind
                    Inc. Tất cả quyền được bảo lưu. Kiến trúc Tri thức Doanh nghiệp.</div>
            </div>
        </div>
    </footer>


    </div>
  );
}
