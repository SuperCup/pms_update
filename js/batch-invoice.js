/**
 * 批量开票管理类
 * 支持Excel导入、数据验证、批量提交等功能
 */
class BatchInvoice {
    constructor() {
        this.importedData = [];
        this.attachments = {};
        this.currentApplyId = null;
        this.selectedApplyIds = [];
        this.filteredData = [];
        this.init();
    }

    init() {
        this.bindEvents();
        // 批量开票页面不需要缓存，每次进来默认清空之前的开票申请记录
        this.clearAllData();
    }

    bindEvents() {
        // 模板下载
        document.getElementById('downloadTemplateBtn').addEventListener('click', () => {
            this.downloadTemplate();
        });

        // 清空数据
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAllData();
        });

        // Excel上传
        document.getElementById('uploadExcelBtn').addEventListener('click', () => {
            document.getElementById('excelUpload').click();
        });

        document.getElementById('excelUpload').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleExcelUpload(e.target.files[0]);
            }
        });

        // 拖拽上传
        const uploadArea = document.querySelector('.border-dashed');
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('border-blue-400');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-blue-400');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-blue-400');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleExcelUpload(files[0]);
            }
        });

        // 继续处理有效数据
        document.getElementById('proceedBtn').addEventListener('click', () => {
            this.proceedWithValidData();
        });

        // 批量上传附件
        document.getElementById('batchUploadBtn').addEventListener('click', () => {
            this.batchUploadAttachment();
        });

        // 清空数据
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAllData(true);
        });



        // 全选
        document.getElementById('selectAll').addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.invoice-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
        });

        // 筛选和搜索
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('invoiceTypeFilter').addEventListener('change', () => {
            this.applyFilters();
        });

        document.getElementById('searchInput').addEventListener('input', () => {
            this.applyFilters();
        });

        // 附件模态框
        document.getElementById('selectAttachmentBtn').addEventListener('click', () => {
            document.getElementById('attachmentUpload').click();
        });

        document.getElementById('attachmentUpload').addEventListener('change', (e) => {
            this.handleAttachmentUpload(e.target.files);
        });

        document.getElementById('cancelAttachmentBtn').addEventListener('click', () => {
            this.closeAttachmentModal();
        });

        document.getElementById('saveAttachmentBtn').addEventListener('click', () => {
            this.saveAttachments();
        });

        // 详情模态框
        document.getElementById('closeDetailBtn').addEventListener('click', () => {
            this.closeDetailModal();
        });
    }

    /**
     * 下载Excel模板
     */
    downloadTemplate() {
        const templateData = [
            {
                '单据类型': '结算开票',
                '发票类型': '纸质专票',
                '开票方': '上海某某科技有限公司',
                'PO编号': 'PO202401001',
                '申请金额（含税）': 11300,
                '发票内容': '技术服务费',
                '发票备注栏打印内容': '项目开发服务',
                '客户名称': '某某集团有限公司',
                '客户开票档案': '某某集团有限公司_91310000123456789X',
                '邮寄地址': '上海市浦东新区张江高科技园区某某路123号',
                '收件人': '张三',
                '收件人电话': '13800138000',
                '接收邮箱': 'zhangsan@example.com',
                '交付格式': 'PDF',
                '关联结算单': 'BS-21000001:10800.00;BS-21000002:500.00',
                '关联项目': 'PRJ-2024001:8000.00;PRJ-2024002:3300.00'
            },
            {
                '单据类型': '预开票',
                '发票类型': '电子普票',
                '开票方': '上海某某科技有限公司',
                'PO编号': '无',
                '申请金额（含税）': 5000,
                '发票内容': '软件开发费',
                '发票备注栏打印内容': '软件定制开发',
                '客户名称': '某某有限公司',
                '客户开票档案': '某某有限公司_91310000987654321A',
                '邮寄地址': '',
                '收件人': '',
                '收件人电话': '',
                '接收邮箱': 'lisi@example.com',
                '交付格式': 'OFD',
                '关联结算单': '',
                '关联项目': 'PRJ-2024003:5000.00'
            }
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(templateData);
        
        // 添加说明行
        const instructions = [
            ['批量开票模板说明'],
            [''],
            ['必填字段：'],
            ['• 单据类型：结算开票 或 预开票'],
            ['• 发票类型：纸质专票、电子普票、电子专票'],
            ['• 开票方：开票公司名称'],
            ['• PO编号：采购订单号，无则填写"无"'],
            ['• 申请金额（含税）：数字格式'],
            ['• 发票内容：开票项目内容'],
            ['• 发票备注栏打印内容：发票备注信息'],
            ['• 客户名称：客户公司名称'],
            ['• 客户开票档案：客户名称_纳税人识别号'],
            [''],
            ['条件必填字段：'],
            ['纸质发票必填：邮寄地址、收件人、收件人电话'],
            ['电子发票必填：接收邮箱、交付格式（PDF或OFD）'],
            [''],
            ['可选字段：'],
            ['• 关联结算单：多笔结算单格式为 编号:金额;编号:金额'],
            ['  示例：BS-21000001:10800.00;BS-21000002:500.00'],
            ['• 关联项目：多个项目格式为 编号:金额;编号:金额'],
            ['  示例：PRJ-2024001:8000.00;PRJ-2024002:3300.00'],
            [''],
            ['注意事项：'],
            ['1. 请严格按照模板格式填写数据'],
            ['2. 金额字段请使用数字格式'],
            ['3. 发票类型必须从指定选项中选择'],
            ['4. 客户开票档案格式：客户名称_纳税人识别号'],
            ['5. 关联结算单和关联项目格式：编号:金额，多个用分号分隔']
            [''],
            ['数据从第26行开始：']
        ];
        
        // 在工作表开头插入说明
        XLSX.utils.sheet_add_aoa(ws, instructions, { origin: 'A1' });
        
        // 在第26行添加数据
        XLSX.utils.sheet_add_json(ws, templateData, { origin: 'A26' });
        
        XLSX.utils.book_append_sheet(wb, ws, '批量开票模板');
        
        // 设置列宽
        const colWidths = [
            { wch: 12 }, // 单据类型
            { wch: 12 }, // 发票类型
            { wch: 25 }, // 开票方
            { wch: 15 }, // PO编号
            { wch: 15 }, // 申请金额
            { wch: 20 }, // 发票内容
            { wch: 25 }, // 发票备注栏
            { wch: 25 }, // 客户名称
            { wch: 35 }, // 客户开票档案
            { wch: 35 }, // 邮寄地址
            { wch: 10 }, // 收件人
            { wch: 15 }, // 收件人电话
            { wch: 25 }, // 接收邮箱
            { wch: 10 }, // 交付格式
            { wch: 40 }, // 关联结算单
            { wch: 40 }  // 关联项目
        ];
        ws['!cols'] = colWidths;
        
        XLSX.writeFile(wb, '批量开票模板.xlsx');
    }

    /**
     * 处理Excel文件上传
     */
    handleExcelUpload(file) {
        if (!file) return;
        
        if (!file.name.match(/\.(xlsx|xls)$/)) {
            alert('请选择Excel文件（.xlsx或.xls格式）');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            alert('文件大小不能超过10MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // 从第26行开始读取数据（跳过说明部分）
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                const dataRange = {
                    s: { c: range.s.c, r: 25 }, // 从第26行开始（0索引）
                    e: range.e
                };
                
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: dataRange });
                
                this.processImportedData(jsonData);
            } catch (error) {
                alert('Excel文件解析失败，请检查文件格式');
                console.error('Excel解析错误：', error);
            }
        };
        
        reader.readAsArrayBuffer(file);
    }

    /**
     * 处理导入的数据
     */
    processImportedData(jsonData) {
        this.importedData = [];
        let validCount = 0;
        let errorCount = 0;
        
        jsonData.forEach((row, index) => {
            const processedRow = {
                index: index + 1,
                documentType: row['单据类型'] || '',
                invoiceType: row['发票类型'] || '',
                invoiceCompany: row['开票方'] || '',
                poNumber: row['PO编号'] || '',
                amount: parseFloat(row['申请金额（含税）']) || 0,
                invoiceContent: row['发票内容'] || '',
                remarkContent: row['发票备注栏打印内容'] || '',
                customerName: row['客户名称'] || '',
                customerProfile: row['客户开票档案'] || '',
                mailingAddress: row['邮寄地址'] || '',
                recipient: row['收件人'] || '',
                recipientPhone: row['收件人电话'] || '',
                email: row['接收邮箱'] || '',
                deliveryFormat: row['交付格式'] || '',
                relatedSettlements: row['关联结算单'] || '',
                relatedProjects: row['关联项目'] || '',
                isValid: true,
                errors: []
            };
            
            // 验证必填字段
            this.validateRequiredFields(processedRow);
            
            // 验证条件必填字段
            this.validateConditionalFields(processedRow);
            
            // 验证可选字段格式
            this.validateOptionalFields(processedRow);
            
            if (processedRow.isValid) {
                validCount++;
            } else {
                errorCount++;
            }
            
            this.importedData.push(processedRow);
        });
        
        // 隐藏导入结果区域，直接显示开票申请列表
        document.getElementById('importResult').classList.add('hidden');
        
        // 直接处理所有数据（包括有错误的记录）
        this.proceedWithValidData();
    }

    /**
     * 验证必填字段
     */
    validateRequiredFields(row) {
        const requiredFields = [
            { field: 'documentType', name: '单据类型', values: ['结算开票', '预开票'] },
            { field: 'invoiceType', name: '发票类型', values: ['纸质专票', '电子普票', '电子专票'] },
            { field: 'invoiceCompany', name: '开票方' },
            { field: 'poNumber', name: 'PO编号' },
            { field: 'amount', name: '申请金额（含税）' },
            { field: 'invoiceContent', name: '发票内容' },
            { field: 'remarkContent', name: '发票备注栏打印内容' },
            { field: 'customerName', name: '客户名称' },
            { field: 'customerProfile', name: '客户开票档案' }
        ];
        
        requiredFields.forEach(({ field, name, values }) => {
            if (!row[field] || (typeof row[field] === 'string' && row[field].trim() === '')) {
                row.errors.push(`${name}不能为空`);
                row.isValid = false;
            } else if (values && !values.includes(row[field])) {
                row.errors.push(`${name}必须是：${values.join('、')}`);
                row.isValid = false;
            }
        });
        
        // 验证金额
        if (row.amount <= 0) {
            row.errors.push('申请金额必须大于0');
            row.isValid = false;
        }
    }

    /**
     * 验证条件必填字段
     */
    validateConditionalFields(row) {
        // 纸质发票必填字段
        if (row.invoiceType === '纸质专票') {
            const paperRequiredFields = [
                { field: 'mailingAddress', name: '邮寄地址' },
                { field: 'recipient', name: '收件人' },
                { field: 'recipientPhone', name: '收件人电话' }
            ];
            
            paperRequiredFields.forEach(({ field, name }) => {
                if (!row[field] || row[field].trim() === '') {
                    row.errors.push(`纸质发票${name}不能为空`);
                    row.isValid = false;
                }
            });
        }
        
        // 电子发票必填字段
        if (row.invoiceType === '电子普票' || row.invoiceType === '电子专票') {
            const electronicRequiredFields = [
                { field: 'email', name: '接收邮箱' },
                { field: 'deliveryFormat', name: '交付格式', values: ['PDF', 'OFD'] }
            ];
            
            electronicRequiredFields.forEach(({ field, name, values }) => {
                if (!row[field] || row[field].trim() === '') {
                    row.errors.push(`电子发票${name}不能为空`);
                    row.isValid = false;
                } else if (values && !values.includes(row[field])) {
                    row.errors.push(`${name}必须是：${values.join('或')}`);
                    row.isValid = false;
                }
            });
            
            // 验证邮箱格式
            if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
                row.errors.push('接收邮箱格式不正确');
                row.isValid = false;
            }
        }
    }

    /**
     * 验证可选字段格式
     */
    validateOptionalFields(row) {
        // 验证关联结算单格式
        if (row.relatedSettlements && row.relatedSettlements.trim() !== '') {
            if (!this.validateRelationFormat(row.relatedSettlements, 'BS-')) {
                row.errors.push('关联结算单格式错误，应为：编号:金额;编号:金额（如：BS-21000001:108.88;BS-21000002:999.99）');
                row.isValid = false;
            }
        }
        
        // 验证关联项目格式
        if (row.relatedProjects && row.relatedProjects.trim() !== '') {
            if (!this.validateRelationFormat(row.relatedProjects, 'PRJ-')) {
                row.errors.push('关联项目格式错误，应为：编号:金额;编号:金额（如：PRJ-2024001:8000.00;PRJ-2024002:3300.00）');
                row.isValid = false;
            }
        }
    }
    
    /**
     * 验证关联字段格式
     */
    validateRelationFormat(value, prefix) {
        if (!value || value.trim() === '') {
            return true; // 空值是允许的
        }
        
        // 分号分隔的多个项目
        const items = value.split(';');
        
        for (const item of items) {
            const trimmedItem = item.trim();
            if (trimmedItem === '') {
                continue; // 跳过空项
            }
            
            // 检查格式：编号:金额
            const parts = trimmedItem.split(':');
            if (parts.length !== 2) {
                return false;
            }
            
            const [code, amount] = parts;
            
            // 验证编号格式（可选择是否严格验证前缀）
            if (!code.trim()) {
                return false;
            }
            
            // 验证金额格式
            const amountValue = parseFloat(amount.trim());
            if (isNaN(amountValue) || amountValue <= 0) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * 渲染导入结果表格
     */
    renderImportTable() {
        const tbody = document.getElementById('importDataTable');
        tbody.innerHTML = '';
        
        this.importedData.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = row.isValid ? '' : 'bg-red-50';
            
            tr.innerHTML = `
                <td class="px-4 py-3 text-sm text-gray-900">${row.index}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${row.documentType}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${row.invoiceType}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${row.customerName}</td>
                <td class="px-4 py-3 text-sm text-gray-900">¥${row.amount.toFixed(2)}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${row.poNumber}</td>
                <td class="px-4 py-3 text-sm">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                        ${row.isValid ? '有效' : '错误'}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm">
                    ${row.isValid ? '-' : `
                        <button onclick="batchInvoice.viewErrorDetail(${row.index})" 
                                class="text-red-600 hover:text-red-800 underline text-xs">
                            查看错误详情
                        </button>
                    `}
                </td>
            `;
            
            tbody.appendChild(tr);
        });
    }

    /**
     * 继续处理有效数据
     */
    proceedWithValidData() {
        // 处理所有数据（包括错误记录）
        this.importedData.forEach((item, index) => {
            const applyId = `BATCH_${Date.now()}_${index}`;
            item.applyId = applyId;
            // 根据数据有效性设置状态
            item.status = item.isValid ? 'pending' : 'error';
        });
        
        this.filteredData = this.importedData;
        this.renderInvoiceTable();
        this.updateStatistics();
        
        // 显示开票申请列表
        document.getElementById('invoiceListSection').classList.remove('hidden');
        
        // 滚动到列表区域
        document.getElementById('invoiceListSection').scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * 渲染开票申请表格
     */
    renderInvoiceTable() {
        const tbody = document.getElementById('invoiceTable');
        tbody.innerHTML = '';
        
        this.filteredData.forEach((item, index) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-3 py-2 whitespace-nowrap">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 invoice-checkbox" data-apply-id="${item.applyId}">
                </td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${index + 1}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.documentType}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.invoiceType}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis" title="${item.customerName}">${item.customerName}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">¥${item.amount.toFixed(2)}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.poNumber}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.relatedSettlement || '-'}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.relatedProject || '-'}</td>
                <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">${item.invoiceCompany}</td>
                <td class="px-3 py-2 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        this.getStatusClass(item.status)
                    }">
                        ${this.getStatusText(item.status)}
                    </span>
                </td>
                <td class="px-3 py-2 text-sm space-x-2 whitespace-nowrap sticky right-0 bg-white border-l border-gray-200">
                    ${item.status === 'error' ? `
                        <button onclick="batchInvoice.viewErrorDetail(${item.index - 1})" 
                                class="text-red-600 hover:text-red-800 text-xs">
                            查看错误
                        </button>
                    ` : `
                        <button onclick="batchInvoice.viewDetail('${item.applyId}')" 
                                class="text-blue-600 hover:text-blue-800 text-xs">
                            查看
                        </button>
                        <button onclick="batchInvoice.openAttachmentModal('${item.applyId}')" 
                                class="text-green-600 hover:text-green-800 text-xs">
                            ${this.attachments[item.applyId] ? `附件(${this.attachments[item.applyId].length})` : '附件'}
                        </button>
                        ${item.status === 'pending' ? `
                            <button onclick="batchInvoice.submitSingle('${item.applyId}')" 
                                    class="text-orange-600 hover:text-orange-800 text-xs">
                                提交
                            </button>
                        ` : ''}
                    `}
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * 获取状态样式类
     */
    getStatusClass(status) {
        const statusClasses = {
            'pending': 'bg-orange-100 text-orange-800',
            'submitted': 'bg-green-100 text-green-800',
            'error': 'bg-red-100 text-red-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
    }

    /**
     * 获取状态文本
     */
    getStatusText(status) {
        const statusTexts = {
            'pending': '待提交',
            'submitted': '已提交',
            'error': '提交失败'
        };
        return statusTexts[status] || '未知';
    }

    /**
     * 应用筛选条件
     */
    applyFilters() {
        const statusFilter = document.getElementById('statusFilter').value;
        const invoiceTypeFilter = document.getElementById('invoiceTypeFilter').value;
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        
        const validData = this.importedData.filter(item => item.isValid);
        
        this.filteredData = validData.filter(item => {
            // 状态筛选
            if (statusFilter !== 'all' && item.status !== statusFilter) {
                return false;
            }
            
            // 发票类型筛选
            if (invoiceTypeFilter !== 'all' && item.invoiceType !== invoiceTypeFilter) {
                return false;
            }
            
            // 搜索筛选
            if (searchText && 
                !item.customerName.toLowerCase().includes(searchText) &&
                !item.poNumber.toLowerCase().includes(searchText)) {
                return false;
            }
            
            return true;
        });
        
        this.renderInvoiceTable();
        this.updateStatistics();
    }

    /**
     * 更新统计信息
     */
    updateStatistics() {
        const validData = this.importedData.filter(item => item.isValid);
        const submittedCount = validData.filter(item => item.status === 'submitted').length;
        const pendingCount = validData.filter(item => item.status === 'pending').length;
        const errorCount = validData.filter(item => item.status === 'error').length;
        
        document.getElementById('totalCount').textContent = validData.length;
        document.getElementById('submittedCount').textContent = submittedCount;
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('errorCount').textContent = errorCount;
    }

    /**
     * 查看详情
     */
    viewDetail(applyId) {
        const item = this.importedData.find(item => item.applyId === applyId);
        if (!item) return;
        
        const detailContent = document.getElementById('detailContent');
        detailContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h4 class="font-medium text-gray-900 border-b pb-2">基本信息</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-600">单据类型：</span>
                            <span class="font-medium">${item.documentType}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">发票类型：</span>
                            <span class="font-medium">${item.invoiceType}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">开票方：</span>
                            <span class="font-medium">${item.invoiceCompany}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">PO编号：</span>
                            <span class="font-medium">${item.poNumber}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">申请金额：</span>
                            <span class="font-medium text-green-600">¥${item.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h4 class="font-medium text-gray-900 border-b pb-2">客户信息</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-600">客户名称：</span>
                            <span class="font-medium">${item.customerName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">客户档案：</span>
                            <span class="font-medium text-sm">${item.customerProfile}</span>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h4 class="font-medium text-gray-900 border-b pb-2">发票信息</h4>
                    <div class="space-y-2">
                        <div>
                            <span class="text-gray-600">发票内容：</span>
                            <p class="font-medium mt-1">${item.invoiceContent}</p>
                        </div>
                        <div>
                            <span class="text-gray-600">备注内容：</span>
                            <p class="font-medium mt-1">${item.remarkContent}</p>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h4 class="font-medium text-gray-900 border-b pb-2">关联信息</h4>
                    <div class="space-y-2">
                        ${item.relatedSettlement ? `
                            <div>
                                <span class="text-gray-600">关联结算单：</span>
                                <p class="font-medium mt-1 text-sm">${item.relatedSettlement}</p>
                            </div>
                        ` : ''}
                        ${item.relatedProject ? `
                            <div>
                                <span class="text-gray-600">关联项目：</span>
                                <p class="font-medium mt-1 text-sm">${item.relatedProject}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h4 class="font-medium text-gray-900 border-b pb-2">交付信息</h4>
                    <div class="space-y-2">
                        ${item.invoiceType === '纸质专票' ? `
                            <div class="flex justify-between">
                                <span class="text-gray-600">邮寄地址：</span>
                                <span class="font-medium text-sm">${item.mailingAddress}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">收件人：</span>
                                <span class="font-medium">${item.recipient}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">收件电话：</span>
                                <span class="font-medium">${item.recipientPhone}</span>
                            </div>
                        ` : `
                            <div class="flex justify-between">
                                <span class="text-gray-600">接收邮箱：</span>
                                <span class="font-medium">${item.email}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">交付格式：</span>
                                <span class="font-medium">${item.deliveryFormat}</span>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('detailModal').classList.remove('hidden');
    }

    /**
     * 关闭详情模态框
     */
    closeDetailModal() {
        document.getElementById('detailModal').classList.add('hidden');
    }

    /**
     * 查看错误记录详情
     */
    viewErrorDetail(rowIndex) {
        const errorItem = this.importedData.find(item => item.index === rowIndex);
        if (!errorItem || errorItem.isValid) return;
        
        const detailContent = document.getElementById('detailContent');
        detailContent.innerHTML = `
            <div class="space-y-6">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 class="font-medium text-red-800 mb-2">错误信息</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm text-red-700">
                        ${errorItem.errors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <h4 class="font-medium text-gray-900 border-b pb-2">基本信息</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">行号：</span>
                                <span class="font-medium">${errorItem.index}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">单据类型：</span>
                                <span class="font-medium">${errorItem.documentType || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">发票类型：</span>
                                <span class="font-medium">${errorItem.invoiceType || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">开票方：</span>
                                <span class="font-medium">${errorItem.invoiceCompany || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">申请金额：</span>
                                <span class="font-medium">${errorItem.amount ? '¥' + errorItem.amount.toFixed(2) : '-'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="font-medium text-gray-900 border-b pb-2">客户信息</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">客户名称：</span>
                                <span class="font-medium">${errorItem.customerName || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">客户档案：</span>
                                <span class="font-medium text-sm">${errorItem.customerProfile || '-'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">PO编号：</span>
                                <span class="font-medium">${errorItem.poNumber || '-'}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${errorItem.relatedSettlement || errorItem.relatedProject ? `
                        <div class="space-y-4">
                            <h4 class="font-medium text-gray-900 border-b pb-2">关联信息</h4>
                            <div class="space-y-2">
                                ${errorItem.relatedSettlement ? `
                                    <div>
                                        <span class="text-gray-600">关联结算单：</span>
                                        <p class="font-medium mt-1 text-sm">${errorItem.relatedSettlement}</p>
                                    </div>
                                ` : ''}
                                ${errorItem.relatedProject ? `
                                    <div>
                                        <span class="text-gray-600">关联项目：</span>
                                        <p class="font-medium mt-1 text-sm">${errorItem.relatedProject}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.getElementById('detailModal').classList.remove('hidden');
    }

    /**
     * 打开附件上传模态框
     */
    openAttachmentModal(applyId) {
        this.currentApplyId = applyId;
        this.selectedApplyIds = [applyId]; // 单个申请
        const item = this.importedData.find(item => item.applyId === applyId);
        document.getElementById('currentApplyCode').textContent = item ? item.applyId : applyId;
        this.renderAttachmentList();
        document.getElementById('attachmentModal').classList.remove('hidden');
    }

    /**
     * 打开批量附件上传模态框
     */
    openBatchAttachmentModal(selectedApplyIds) {
        this.selectedApplyIds = selectedApplyIds;
        this.currentApplyId = null; // 批量模式下设为null
        
        // 显示选中的申请数量
        const applyCodesText = selectedApplyIds.length > 3 
            ? `${selectedApplyIds.slice(0, 3).join(', ')} 等${selectedApplyIds.length}个申请`
            : selectedApplyIds.join(', ');
        
        document.getElementById('currentApplyCode').textContent = applyCodesText;
        this.renderAttachmentList();
        document.getElementById('attachmentModal').classList.remove('hidden');
    }

    /**
     * 关闭附件模态框
     */
    closeAttachmentModal() {
        document.getElementById('attachmentModal').classList.add('hidden');
        this.currentApplyId = null;
    }

    /**
     * 处理附件上传
     */
    handleAttachmentUpload(files) {
        // 确定存储附件的键值
        const storageKey = this.currentApplyId || 'batch';
        
        if (!this.attachments[storageKey]) {
            this.attachments[storageKey] = [];
        }
        
        Array.from(files).forEach(file => {
            if (this.validateAttachmentFile(file)) {
                const fileInfo = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                };
                this.attachments[storageKey].push(fileInfo);
            }
        });
        
        this.renderAttachmentList();
    }

    /**
     * 验证附件文件
     */
    validateAttachmentFile(file) {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            alert(`不支持的文件类型：${file.name}`);
            return false;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            alert(`文件过大：${file.name}（最大10MB）`);
            return false;
        }
        
        return true;
    }

    /**
     * 渲染附件列表
     */
    renderAttachmentList() {
        const container = document.getElementById('attachmentList');
        container.innerHTML = '';
        
        const storageKey = this.currentApplyId || 'batch';
        if (!this.attachments[storageKey]) {
            return;
        }
        
        this.attachments[storageKey].forEach(file => {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            fileDiv.innerHTML = `
                <div class="flex items-center space-x-3">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                    </svg>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${this.formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button onclick="batchInvoice.removeAttachment('${file.id}')" 
                        class="text-red-600 hover:text-red-800">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;
            container.appendChild(fileDiv);
        });
    }

    /**
     * 移除附件
     */
    removeAttachment(fileId) {
        const storageKey = this.currentApplyId || 'batch';
        if (!this.attachments[storageKey]) return;
        
        this.attachments[storageKey] = this.attachments[storageKey].filter(
            file => file.id != fileId
        );
        
        this.renderAttachmentList();
    }

    /**
     * 保存附件
     */
    saveAttachments() {
        if (this.selectedApplyIds && this.selectedApplyIds.length > 0) {
            // 获取当前上传的附件
            const currentAttachments = this.currentApplyId 
                ? this.attachments[this.currentApplyId] || []
                : this.attachments['batch'] || [];
            
            if (currentAttachments.length === 0) {
                alert('请先上传附件！');
                return;
            }
            
            // 将附件应用到所有选中的申请
            this.selectedApplyIds.forEach(applyId => {
                if (!this.attachments[applyId]) {
                    this.attachments[applyId] = [];
                }
                // 复制附件到每个申请（避免引用同一个对象）
                this.attachments[applyId] = [...currentAttachments.map(att => ({...att}))];
            });
            
            // 清理批量上传的临时附件
            if (this.attachments['batch']) {
                delete this.attachments['batch'];
            }
            
            const message = this.selectedApplyIds.length === 1 
                ? '附件保存成功！'
                : `附件已成功应用到 ${this.selectedApplyIds.length} 个申请！`;
            
            alert(message);
            this.closeAttachmentModal();
            this.renderInvoiceTable(); // 重新渲染表格以更新附件显示
        }
    }

    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 单个提交
     */
    submitSingle(applyId) {
        const item = this.importedData.find(item => item.applyId === applyId);
        if (!item) return;
        
        // 模拟提交过程
        if (confirm(`确认提交开票申请：${item.customerName}？`)) {
            item.status = 'submitted';
            this.renderInvoiceTable();
            this.updateStatistics();
            alert('提交成功！');
        }
    }

    /**
     * 批量上传附件
     */
    batchUploadAttachment() {
        const selectedCheckboxes = document.querySelectorAll('.invoice-checkbox:checked');
        
        if (selectedCheckboxes.length === 0) {
            alert('请选择要上传附件的申请');
            return;
        }
        
        // 获取选中的申请ID列表
        const selectedApplyIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.applyId);
        
        // 打开批量附件上传模态框
        this.openBatchAttachmentModal(selectedApplyIds);
    }

    /**
     * 导出结果
     */
    exportResults() {
        if (this.importedData.length === 0) {
            alert('没有数据可导出');
            return;
        }
        
        const exportData = this.importedData.map(item => ({
            '序号': item.index,
            '单据类型': item.documentType,
            '发票类型': item.invoiceType,
            '开票方': item.invoiceCompany,
            'PO编号': item.poNumber,
            '申请金额（含税）': item.amount,
            '发票内容': item.invoiceContent,
            '发票备注栏打印内容': item.remarkContent,
            '客户名称': item.customerName,
            '客户开票档案': item.customerProfile,
            '邮寄地址': item.mailingAddress,
            '收件人': item.recipient,
            '收件人电话': item.recipientPhone,
            '接收邮箱': item.email,
            '交付格式': item.deliveryFormat,
            '提交状态': this.getStatusText(item.status),
            '验证状态': item.isValid ? '有效' : '无效',
            '错误信息': item.errors.join('; ')
        }));
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, '批量开票结果');
        
        const fileName = `批量开票结果_${new Date().toISOString().slice(0, 10)}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    /**
     * 清空所有数据
     */
    clearAllData() {
        // 检查是否是用户主动点击清空按钮
        const isUserAction = arguments.length > 0 && arguments[0] === true;
        
        if (isUserAction && !confirm('确认清空所有数据？此操作不可恢复。')) {
            return;
        }
        
        this.importedData = [];
        this.filteredData = [];
        this.attachments = {};
        
        // 重置界面
        document.getElementById('importResult').classList.add('hidden');
        document.getElementById('invoiceListSection').classList.add('hidden');
        document.getElementById('proceedBtn').classList.add('hidden');
        
        // 重置文件输入
        document.getElementById('excelUpload').value = '';
        
        if (isUserAction) {
            alert('数据已清空');
        }
    }

    /**
     * 保存数据到本地存储
     */
    saveData() {
        const data = {
            importedData: this.importedData,
            attachments: this.attachments
        };
        localStorage.setItem('batchInvoiceData', JSON.stringify(data));
    }

    /**
     * 从本地存储加载数据
     */
    loadSavedData() {
        const savedData = localStorage.getItem('batchInvoiceData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.importedData = data.importedData || [];
                this.attachments = data.attachments || {};
                
                if (this.importedData.length > 0) {
                    const validData = this.importedData.filter(item => item.isValid);
                    if (validData.length > 0) {
                        this.filteredData = validData;
                        this.renderInvoiceTable();
                        this.updateStatistics();
                        document.getElementById('invoiceListSection').classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error('加载保存的数据失败：', error);
            }
        }
    }
}

// 创建全局实例
const batchInvoice = new BatchInvoice();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 自动保存数据
    setInterval(() => {
        batchInvoice.saveData();
    }, 30000); // 每30秒保存一次
});

// 导出到全局作用域
window.batchInvoice = batchInvoice;