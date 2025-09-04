class InvoiceDetail {
    constructor() {
        this.invoiceData = null;
        this.init();
    }

    init() {
        this.loadInvoiceData();
        this.bindEvents();
    }

    bindEvents() {
        // 编辑按钮
        document.getElementById('editBtn').addEventListener('click', () => {
            this.editInvoice();
        });

        // 打印按钮
        document.getElementById('printBtn').addEventListener('click', () => {
            this.printInvoice();
        });

        // 附件下载
        document.addEventListener('click', (e) => {
            if (e.target.closest('.download-attachment')) {
                const filename = e.target.closest('.download-attachment').dataset.filename;
                this.downloadAttachment(filename);
            }
        });
    }

    loadInvoiceData() {
        // 从URL参数获取申请ID
        const urlParams = new URLSearchParams(window.location.search);
        const applyId = urlParams.get('id') || urlParams.get('applyId');
        
        if (applyId) {
            // 模拟从服务器加载数据
            this.invoiceData = this.getMockInvoiceData(applyId);
        } else {
            // 使用默认数据
            this.invoiceData = this.getDefaultInvoiceData();
        }
        
        this.renderInvoiceData();
    }

    getMockInvoiceData(applyId) {
        // 模拟数据，实际应该从服务器获取
        return {
            applyCode: `INV-2024-${applyId.padStart(3, '0')}`,
            status: 'pending',
            statusText: '待审核',
            applyTime: '2024-01-15 10:30:00',
            applicantName: '张三',
            department: '财务部',
            phone: '13800138000',
            email: 'zhangsan@company.com',
            invoiceType: '增值税专用发票',
            invoiceAmount: 100000.00,
            invoiceContent: '技术服务费',
            invoiceRemark: '项目技术开发服务费用',
            projectName: '企业管理系统开发项目',
            projectCode: 'PRJ-2024-001',
            projectManager: '李四',
            customerName: '北京科技有限公司',
            taxNumber: '91110000123456789X',
            customerAddress: '北京市朝阳区xxx路xxx号 010-12345678',
            bankInfo: '中国银行北京分行 1234567890123456789',
            attachments: [
                {
                    name: '合同文件.pdf',
                    size: '2.5 MB',
                    type: 'pdf',
                    url: '/attachments/contract.pdf'
                },
                {
                    name: '项目清单.xlsx',
                    size: '1.2 MB',
                    type: 'excel',
                    url: '/attachments/project-list.xlsx'
                }
            ],
            approvalHistory: [
                {
                    action: '提交申请',
                    operator: '张三',
                    time: '2024-01-15 10:30',
                    remark: '提交开票申请，等待审核',
                    status: 'submitted'
                },
                {
                    action: '待财务审核',
                    operator: '系统',
                    time: '当前状态',
                    remark: '申请已提交，等待财务部门审核',
                    status: 'pending'
                }
            ]
        };
    }

    getDefaultInvoiceData() {
        return {
            applyCode: 'INV-2024-001',
            status: 'pending',
            statusText: '待审核',
            applyTime: '2024-01-15 10:30:00',
            applicantName: '张三',
            department: '财务部',
            phone: '13800138000',
            email: 'zhangsan@company.com',
            invoiceType: '增值税专用发票',
            invoiceAmount: 100000.00,
            invoiceContent: '技术服务费',
            invoiceRemark: '项目技术开发服务费用',
            projectName: '企业管理系统开发项目',
            projectCode: 'PRJ-2024-001',
            projectManager: '李四',
            customerName: '北京科技有限公司',
            taxNumber: '91110000123456789X',
            customerAddress: '北京市朝阳区xxx路xxx号 010-12345678',
            bankInfo: '中国银行北京分行 1234567890123456789',
            attachments: [
                {
                    name: '合同文件.pdf',
                    size: '2.5 MB',
                    type: 'pdf',
                    url: '/attachments/contract.pdf'
                },
                {
                    name: '项目清单.xlsx',
                    size: '1.2 MB',
                    type: 'excel',
                    url: '/attachments/project-list.xlsx'
                }
            ],
            approvalHistory: [
                {
                    action: '提交申请',
                    operator: '张三',
                    time: '2024-01-15 10:30',
                    remark: '提交开票申请，等待审核',
                    status: 'submitted'
                },
                {
                    action: '待财务审核',
                    operator: '系统',
                    time: '当前状态',
                    remark: '申请已提交，等待财务部门审核',
                    status: 'pending'
                }
            ]
        };
    }

    renderInvoiceData() {
        if (!this.invoiceData) return;

        const data = this.invoiceData;

        // 基本信息
        document.getElementById('applyCode').textContent = data.applyCode;
        document.getElementById('applyTime').textContent = data.applyTime;
        
        // 状态
        const statusBadge = document.getElementById('statusBadge');
        statusBadge.textContent = data.statusText;
        statusBadge.className = `ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${this.getStatusClass(data.status)}`;

        // 申请人信息
        document.getElementById('applicantName').textContent = data.applicantName;
        document.getElementById('department').textContent = data.department;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('email').textContent = data.email;

        // 开票信息
        document.getElementById('invoiceType').textContent = data.invoiceType;
        document.getElementById('invoiceAmount').textContent = `¥${data.invoiceAmount.toLocaleString('zh-CN', {minimumFractionDigits: 2})}`;
        document.getElementById('invoiceContent').textContent = data.invoiceContent;
        document.getElementById('invoiceRemark').textContent = data.invoiceRemark;

        // 项目信息
        document.getElementById('projectName').textContent = data.projectName;
        document.getElementById('projectCode').textContent = data.projectCode;
        document.getElementById('projectManager').textContent = data.projectManager;

        // 客户信息
        document.getElementById('customerName').textContent = data.customerName;
        document.getElementById('taxNumber').textContent = data.taxNumber;
        document.getElementById('customerAddress').textContent = data.customerAddress;
        document.getElementById('bankInfo').textContent = data.bankInfo;

        // 附件列表
        this.renderAttachments(data.attachments);

        // 审批记录
        this.renderApprovalHistory(data.approvalHistory);
    }

    getStatusClass(status) {
        const statusClasses = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'processing': 'bg-blue-100 text-blue-800',
            'completed': 'bg-gray-100 text-gray-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
    }

    renderAttachments(attachments) {
        const container = document.getElementById('attachmentList');
        if (!attachments || attachments.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500">暂无附件</p>';
            return;
        }

        container.innerHTML = attachments.map(attachment => {
            const iconClass = this.getFileIcon(attachment.type);
            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center">
                        <i class="${iconClass} mr-3"></i>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${attachment.name}</p>
                            <p class="text-xs text-gray-500">${attachment.size}</p>
                        </div>
                    </div>
                    <button class="download-attachment text-blue-600 hover:text-blue-800 text-sm" data-filename="${attachment.name}" data-url="${attachment.url}">
                        <i class="fas fa-download mr-1"></i>下载
                    </button>
                </div>
            `;
        }).join('');
    }

    getFileIcon(type) {
        const iconMap = {
            'pdf': 'fas fa-file-pdf text-red-500',
            'excel': 'fas fa-file-excel text-green-500',
            'word': 'fas fa-file-word text-blue-500',
            'image': 'fas fa-file-image text-purple-500',
            'default': 'fas fa-file text-gray-500'
        };
        return iconMap[type] || iconMap.default;
    }

    renderApprovalHistory(history) {
        const container = document.getElementById('approvalHistory');
        if (!history || history.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500">暂无审批记录</p>';
            return;
        }

        container.innerHTML = history.map(record => {
            const iconClass = this.getStatusIcon(record.status);
            return `
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <div class="w-8 h-8 ${iconClass.bg} rounded-full flex items-center justify-center">
                            <i class="${iconClass.icon} text-white text-xs"></i>
                        </div>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900">${record.operator} ${record.action}</p>
                            <p class="text-xs text-gray-500">${record.time}</p>
                        </div>
                        <p class="text-sm text-gray-600">${record.remark}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    getStatusIcon(status) {
        const iconMap = {
            'submitted': { bg: 'bg-blue-500', icon: 'fas fa-user' },
            'pending': { bg: 'bg-yellow-500', icon: 'fas fa-clock' },
            'approved': { bg: 'bg-green-500', icon: 'fas fa-check' },
            'rejected': { bg: 'bg-red-500', icon: 'fas fa-times' },
            'processing': { bg: 'bg-purple-500', icon: 'fas fa-cog' }
        };
        return iconMap[status] || iconMap.pending;
    }

    editInvoice() {
        // 跳转到编辑页面
        const applyId = this.invoiceData.applyCode.split('-').pop();
        window.location.href = `invoice-apply.html?id=${applyId}&mode=edit`;
    }

    printInvoice() {
        // 打印页面
        window.print();
    }

    downloadAttachment(filename) {
        // 模拟下载附件
        const attachment = this.invoiceData.attachments.find(att => att.name === filename);
        if (attachment) {
            // 实际应该从服务器下载文件
            alert(`下载文件: ${filename}`);
            // window.open(attachment.url, '_blank');
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.invoiceDetail = new InvoiceDetail();
});

// 导出到全局作用域，供HTML中的onclick使用
window.invoiceDetail = null;