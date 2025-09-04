// 开票申请页面逻辑
class InvoiceApply {
    constructor() {
        this.currentInvoiceId = null;
        this.uploadedFiles = [];
        this.settlementList = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.initForm();
        this.checkEditMode();
    }

    bindEvents() {
        // 按钮事件
        const saveBtn = document.getElementById('saveBtn');
        const submitBtn = document.getElementById('submitBtn');
        const backBtn = document.getElementById('backBtn');
        
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveForm());
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitForm());
        if (backBtn) backBtn.addEventListener('click', () => this.goBack());
        
        // 发票类型切换事件
        const invoiceType = document.getElementById('invoiceType');
        if (invoiceType) {
            invoiceType.addEventListener('change', (e) => {
                this.toggleInvoiceTypeFields(e.target.value);
            });
        }
        
        // 客户档案选择事件
        const customerArchive = document.getElementById('customerArchive');
        if (customerArchive) {
            customerArchive.addEventListener('change', (e) => {
                this.loadCustomerInfo(e.target.value);
            });
        }
        
        // 文件上传事件
        const uploadBtn = document.getElementById('uploadBtn');
        const fileUpload = document.getElementById('fileUpload');
        
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                if (fileUpload) {
                    fileUpload.click();
                }
            });
        }
        
        if (fileUpload) {
            fileUpload.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
        
        // 拖拽上传
        const uploadArea = document.querySelector('.border-dashed');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('border-blue-500', 'bg-blue-50');
            });
            
            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
                this.handleFileUpload(e.dataTransfer.files);
            });
        }
        
        // 结算单管理事件
        const addSettlement = document.getElementById('addSettlement');
        if (addSettlement) {
            addSettlement.addEventListener('click', () => {
                this.addSettlement();
            });
        }
        
        // 交付方式切换事件
        const deliveryMethod = document.getElementById('deliveryMethod');
        if (deliveryMethod) {
            deliveryMethod.addEventListener('change', (e) => {
                this.toggleDeliveryFields(e.target.value);
            });
        }
    }

    initForm() {
        // 设置默认值
        document.getElementById('documentType').value = '结算开票';
        document.getElementById('invoiceType').value = '纸质专票';
        document.getElementById('issuer').value = '上海智士网络科技有限公司';
        document.getElementById('invoiceContent').value = '*信息技术服务*技术服务费';
        
        // 初始化发票类型相关显示
        this.toggleInvoiceTypeFields('纸质专票');
        
        // 初始化交付方式显示
        this.toggleDeliveryFields('邮箱交付');
    }

    checkEditMode() {
        // 检查是否为编辑模式
        const urlParams = new URLSearchParams(window.location.search);
        const invoiceId = urlParams.get('id');
        
        if (invoiceId) {
            this.currentInvoiceId = invoiceId;
            this.loadInvoiceData(invoiceId);
        }
    }

    toggleInvoiceTypeFields(invoiceType) {
        const physicalMailSection = document.getElementById('physicalMailSection');
        const electronicDeliverySection = document.getElementById('electronicDeliverySection');
        
        if (invoiceType === '纸质专票') {
            physicalMailSection.style.display = 'block';
            electronicDeliverySection.style.display = 'none';
            this.setFieldsRequired(['mailingAddress'], true);
            this.setFieldsRequired(['deliveryMethod'], false);
        } else if (invoiceType === '电子普票' || invoiceType === '电子专票') {
            physicalMailSection.style.display = 'none';
            electronicDeliverySection.style.display = 'block';
            this.setFieldsRequired(['mailingAddress'], false);
            this.setFieldsRequired(['deliveryMethod'], true);
        }
    }

    toggleDeliveryFields(deliveryMethod) {
        const emailField = document.getElementById('receivingEmail').parentElement;
        const formatField = document.getElementById('deliveryFormat').parentElement;
        
        if (deliveryMethod === '邮箱交付') {
            emailField.style.display = 'block';
            formatField.style.display = 'block';
            this.setFieldsRequired(['receivingEmail', 'deliveryFormat'], true);
        } else if (deliveryMethod === '上传客户供应发票平台') {
            emailField.style.display = 'none';
            formatField.style.display = 'block';
            this.setFieldsRequired(['receivingEmail'], false);
            this.setFieldsRequired(['deliveryFormat'], true);
        }
    }

    setFieldsRequired(fieldIds, required) {
        fieldIds.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                if (required) {
                    field.setAttribute('required', 'required');
                } else {
                    field.removeAttribute('required');
                }
            }
        });
    }

    loadCustomerInfo(archiveId) {
        // 模拟从系统加载客户开票档案信息
        const mockCustomerData = {
            'archive1': {
                name: '示例客户有限公司',
                taxNumber: '91310000123456789X',
                phone: '021-12345678',
                address: '上海市浦东新区示例路123号',
                bank: '中国银行上海分行',
                bankAccount: '1234567890123456789'
            }
        };
        
        const customerData = mockCustomerData[archiveId];
        if (customerData) {
            document.getElementById('customerName').value = customerData.name;
            document.getElementById('taxNumber').value = customerData.taxNumber;
            document.getElementById('customerPhone').value = customerData.phone;
            document.getElementById('customerAddress').value = customerData.address;
            document.getElementById('customerBank').value = customerData.bank;
            document.getElementById('bankAccount').value = customerData.bankAccount;
        }
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.uploadedFiles.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                });
            }
        });
        
        this.renderFileList();
    }

    validateFile(file) {
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
            alert('不支持的文件格式：' + file.name);
            return false;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB
            alert('文件大小不能超过10MB：' + file.name);
            return false;
        }
        
        return true;
    }

    renderFileList() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        
        this.uploadedFiles.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded border';
            fileItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <div>
                        <div class="text-sm font-medium text-gray-900">${file.name}</div>
                        <div class="text-xs text-gray-500">${this.formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button type="button" onclick="invoiceApply.removeFile('${file.id}')" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            `;
            fileList.appendChild(fileItem);
        });
    }

    removeFile(fileId) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== fileId);
        this.renderFileList();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    addSettlement() {
        const settlementOrder = document.getElementById('settlementOrder').value.trim();
        if (!settlementOrder) {
            alert('请选择结算单');
            return;
        }
        
        // 模拟从系统获取结算单信息
        const mockSettlementData = {
            'ST001': {
                name: '2024年1月技术服务结算',
                project: 'PRJ001',
                projectName: '智能管理系统开发项目'
            }
        };
        
        const settlementData = mockSettlementData[settlementOrder] || {
            name: '结算单名称',
            project: '项目编号',
            projectName: '项目名称'
        };
        
        const settlement = {
            id: Date.now(),
            order: settlementOrder,
            name: settlementData.name,
            project: settlementData.project,
            projectName: settlementData.projectName,
            amount: 0
        };
        
        this.settlementList.push(settlement);
        this.renderSettlementList();
        
        // 清空输入框
        document.getElementById('settlementOrder').value = '';
    }

    renderSettlementList() {
        const settlementListContainer = document.getElementById('settlementList');
        const template = document.getElementById('settlementTemplate');
        
        settlementListContainer.innerHTML = '';
        
        this.settlementList.forEach(settlement => {
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.settlement-order').value = settlement.order;
            clone.querySelector('.settlement-name').value = settlement.name;
            clone.querySelector('.related-project').value = settlement.project;
            clone.querySelector('.project-name').value = settlement.projectName;
            clone.querySelector('.related-amount').value = settlement.amount;
            
            // 绑定删除事件
            clone.querySelector('.remove-settlement').addEventListener('click', () => {
                this.removeSettlement(settlement.id);
            });
            
            // 绑定金额变化事件
            clone.querySelector('.related-amount').addEventListener('input', (e) => {
                settlement.amount = parseFloat(e.target.value) || 0;
            });
            
            settlementListContainer.appendChild(clone);
        });
    }

    removeSettlement(settlementId) {
        this.settlementList = this.settlementList.filter(item => item.id !== settlementId);
        this.renderSettlementList();
    }

    validateForm() {
        const requiredFields = [
            { id: 'documentType', name: '单据类型' },
            { id: 'invoiceType', name: '发票类型' },
            { id: 'issuer', name: '开票方' },
            { id: 'poNumber', name: 'PO编号' },
            { id: 'applyAmount', name: '申请金额' },
            { id: 'invoiceContent', name: '发票内容' },
            { id: 'remarkContent', name: '发票备注栏打印内容' },
            { id: 'customer', name: '客户' },
            { id: 'customerArchive', name: '客户开票档案' }
        ];
        
        // 检查基本必填字段
        for (let field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element || !element.value.trim()) {
                alert(`请填写${field.name}`);
                element?.focus();
                return false;
            }
        }
        
        // 检查条件必填字段
        const invoiceType = document.getElementById('invoiceType').value;
        
        if (invoiceType === '纸质专票') {
            const mailingAddress = document.getElementById('mailingAddress').value.trim();
            if (!mailingAddress) {
                alert('纸质发票类型需要填写邮寄地址');
                document.getElementById('mailingAddress').focus();
                return false;
            }
        } else if (invoiceType === '电子普票' || invoiceType === '电子专票') {
            const deliveryMethod = document.getElementById('deliveryMethod').value;
            if (!deliveryMethod) {
                alert('电子发票类型需要选择交付方式');
                document.getElementById('deliveryMethod').focus();
                return false;
            }
            
            if (deliveryMethod === '邮箱交付') {
                const receivingEmail = document.getElementById('receivingEmail').value.trim();
                if (!receivingEmail) {
                    alert('邮箱交付方式需要填写接收邮箱');
                    document.getElementById('receivingEmail').focus();
                    return false;
                }
            }
            
            const deliveryFormat = document.getElementById('deliveryFormat').value;
            if (!deliveryFormat) {
                alert('电子发票需要选择交付格式');
                document.getElementById('deliveryFormat').focus();
                return false;
            }
        }
        
        return true;
    }

    getFormData() {
        return {
            // 公司开票信息
            documentType: document.getElementById('documentType').value,
            invoiceType: document.getElementById('invoiceType').value,
            issuer: document.getElementById('issuer').value,
            poNumber: document.getElementById('poNumber').value,
            applyAmountExTax: document.getElementById('applyAmountExTax').value,
            applyAmount: document.getElementById('applyAmount').value,
            invoiceContent: document.getElementById('invoiceContent').value,
            remarkContent: document.getElementById('remarkContent').value,
            
            // 客户开票信息
            customer: document.getElementById('customer').value,
            customerArchive: document.getElementById('customerArchive').value,
            customerName: document.getElementById('customerName').value,
            taxNumber: document.getElementById('taxNumber').value,
            customerPhone: document.getElementById('customerPhone').value,
            customerAddress: document.getElementById('customerAddress').value,
            customerBank: document.getElementById('customerBank').value,
            bankAccount: document.getElementById('bankAccount').value,
            
            // 纸质发票邮寄信息
            mailingAddress: document.getElementById('mailingAddress').value,
            recipient: document.getElementById('recipient').value,
            recipientPhone: document.getElementById('recipientPhone').value,
            needStamp: document.getElementById('needStamp').checked,
            
            // 电子发票发送信息
            deliveryMethod: document.getElementById('deliveryMethod').value,
            receivingEmail: document.getElementById('receivingEmail').value,
            deliveryFormat: document.getElementById('deliveryFormat').value,
            
            // 其他信息
            otherRemark: document.getElementById('otherRemark').value,
            uploadedFiles: this.uploadedFiles,
            settlementList: this.settlementList
        };
    }

    saveForm() {
        if (!this.validateForm()) {
            return;
        }
        
        const formData = this.getFormData();
        
        // 模拟保存到服务器
        console.log('保存表单数据:', formData);
        
        alert('保存成功！');
    }

    submitForm() {
        if (!this.validateForm()) {
            return;
        }
        
        const formData = this.getFormData();
        
        // 模拟提交到服务器
        console.log('提交表单数据:', formData);
        
        if (confirm('确认提交开票申请？')) {
            alert('提交成功！');
            // 可以跳转到列表页面
            // window.location.href = 'invoice-list.html';
        }
    }

    goBack() {
        if (confirm('确认返回？未保存的数据将丢失。')) {
            window.history.back();
        }
    }

    loadInvoiceData(invoiceId) {
        // 模拟从服务器加载数据
        console.log('加载开票数据:', invoiceId);
    }
}

// 初始化
const invoiceApply = new InvoiceApply();

// 导出到全局作用域
window.invoiceApply = invoiceApply;