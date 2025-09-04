/**
 * 开票管理系统模拟数据
 * 用于演示和测试功能
 */

// 开票状态枚举
const INVOICE_STATUS = {
    DRAFT: '草稿',
    REVIEWING: '审核中',
    LINKED: '已关联',
    UNLINKED: '未关联'
};

// 关联状态枚举
const LINK_STATUS = {
    LINKED: '已关联',
    UNLINKED: '未关联'
};

// 单据类型枚举
const DOCUMENT_TYPE = {
    SETTLEMENT: '结算开票',
    ADVANCE: '预开票'
};

// 模拟开票数据
const mockInvoiceData = [
    {
        id: 1,
        invoiceCode: 'IN-2500014',
        applyDate: '2025-08-28',
        documentType: '结算开票',
        poNumber: '无',
        customerName: 'HORMEL',
        invoiceName: '营销服务费',
        applicant: '赵雷明',
        applyAmount: 100.00,
        invoicedAmount: 0.00,
        remainingAmount: 0.00,
        receivedAmount: 0.00,
        status: '草稿',
        linkStatus: '未关联',
        currentHandler: '',
        remark: '广东省市场'
    },
    {
        id: 2,
        invoiceCode: 'IN-2500012',
        applyDate: '2025-08-26',
        documentType: '结算开票',
        poNumber: '无',
        customerName: '维达',
        invoiceName: '测试3444',
        applicant: '赵雷明',
        applyAmount: 100.00,
        invoicedAmount: 100.00,
        remainingAmount: 0.00,
        receivedAmount: 0.00,
        status: '审核中',
        linkStatus: '已关联',
        currentHandler: '直点春',
        remark: '云南白药集团'
    },
    {
        id: 3,
        invoiceCode: 'IN-2500008',
        applyDate: '2025-04-11',
        documentType: '结算开票',
        poNumber: '无',
        customerName: '云南白药',
        invoiceName: '健康产品销售',
        applicant: '赵雷明',
        applyAmount: 100600.00,
        invoicedAmount: 0.00,
        remainingAmount: 0.00,
        receivedAmount: 0.00,
        status: '草稿',
        linkStatus: '未关联',
        currentHandler: '',
        remark: '健康产品销售公司'
    }
];

// 模拟客户数据
const mockCustomerData = [
    { id: 1, name: 'HORMEL', taxNumber: '91110000123456789A' },
    { id: 2, name: '维达', taxNumber: '91310000987654321B' },
    { id: 3, name: '云南白药', taxNumber: '91440000456789123C' }
];

/**
 * 获取开票数据（模拟API调用）
 * @param {Object} params - 查询参数
 * @param {number} page - 页码
 * @param {number} pageSize - 每页数量
 * @returns {Object} 分页数据
 */
function getInvoiceData(params = {}, page = 1, pageSize = 15) {
    let filteredData = [...mockInvoiceData];
    
    // 根据参数过滤数据
    if (params.invoiceCode) {
        filteredData = filteredData.filter(item => 
            item.invoiceCode.toLowerCase().includes(params.invoiceCode.toLowerCase())
        );
    }
    
    if (params.customerName) {
        filteredData = filteredData.filter(item => 
            item.customerName.includes(params.customerName)
        );
    }
    
    if (params.documentType) {
        filteredData = filteredData.filter(item => 
            item.documentType === params.documentType
        );
    }
    
    if (params.applicant) {
        filteredData = filteredData.filter(item => 
            item.applicant.includes(params.applicant)
        );
    }
    
    if (params.currentHandler) {
        filteredData = filteredData.filter(item => 
            item.currentHandler.includes(params.currentHandler)
        );
    }
    
    if (params.poNumber) {
        filteredData = filteredData.filter(item => 
            item.poNumber.includes(params.poNumber)
        );
    }
    
    if (params.applyDate) {
        filteredData = filteredData.filter(item => 
            item.applyDate === params.applyDate
        );
    }
    
    if (params.status) {
        filteredData = filteredData.filter(item => 
            item.status === params.status
        );
    }
    
    // 分页处理
    const total = filteredData.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    return {
        data: pageData,
        pagination: {
            currentPage: page,
            pageSize: pageSize,
            total: total,
            totalPages: Math.ceil(total / pageSize)
        }
    };
}

/**
 * 获取客户数据
 * @returns {Array} 客户列表
 */
function getCustomerData() {
    return mockCustomerData;
}

// 导出模拟数据
window.MockData = {
    INVOICE_STATUS,
    LINK_STATUS,
    DOCUMENT_TYPE,
    mockInvoiceData,
    mockCustomerData,
    getInvoiceData,
    getCustomerData
};