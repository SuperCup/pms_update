/**
 * 开票管理系统主要JavaScript文件
 * 负责页面初始化和核心功能实现
 */

// 全局变量
const InvoiceManager = {
    // 当前页面数据
    currentData: [],
    // 分页信息
    pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        totalPages: 0
    },
    // 搜索条件
    searchParams: {
        invoiceCode: '',
        customerName: '',
        applyDate: '',
        status: '',
        poNumber: '',
        documentType: '',
        applicant: '',
        currentHandler: ''
    },
    // 选中的行
    selectedRows: new Set()
};

/**
 * 页面初始化函数
 */
function initPage() {
    console.log('开票管理系统初始化中...');
    
    // 初始化事件监听
    initEventListeners();
    
    // 加载初始数据
    loadInvoiceData();
    
    console.log('页面初始化完成');
}

/**
 * 初始化事件监听器
 */
function initEventListeners() {
    // 搜索按钮事件
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // 重置按钮事件
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }
    
    // 导出按钮事件
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }
    
    // 分页相关事件
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageSizeSelect = document.getElementById('pageSize');
    
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => changePage(InvoiceManager.pagination.currentPage - 1));
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => changePage(InvoiceManager.pagination.currentPage + 1));
    }
    
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', (e) => {
            InvoiceManager.pagination.pageSize = parseInt(e.target.value);
            InvoiceManager.pagination.currentPage = 1;
            loadInvoiceData();
        });
    }
    
    // 全选复选框事件
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAll);
    }
    
    // 开票申请按钮事件
    const invoiceApplyBtn = document.getElementById('invoiceApplyBtn');
    if (invoiceApplyBtn) {
        invoiceApplyBtn.addEventListener('click', () => {
            window.location.href = 'invoice-apply.html';
        });
    }
    
    // 批量开票按钮事件
    const batchInvoiceBtn = document.getElementById('batchInvoiceBtn');
    if (batchInvoiceBtn) {
        batchInvoiceBtn.addEventListener('click', () => {
            window.location.href = 'batch-invoice.html';
        });
    }
    
    // 作废按钮事件
    const voidInvoiceBtn = document.getElementById('voidInvoiceBtn');
    if (voidInvoiceBtn) {
        voidInvoiceBtn.addEventListener('click', handleVoidInvoice);
    }
}

/**
 * 处理搜索功能
 */
function handleSearch() {
    console.log('执行搜索操作');
    
    // 获取搜索条件
    InvoiceManager.searchParams = {
        invoiceCode: document.getElementById('invoiceCode').value.trim(),
        customerName: document.getElementById('customerName').value.trim(),
        applyDate: document.getElementById('applyDate').value,
        status: document.getElementById('status').value,
        poNumber: document.getElementById('poNumber').value.trim(),
        documentType: document.getElementById('documentType').value,
        applicant: document.getElementById('applicant').value.trim(),
        currentHandler: document.getElementById('currentHandler').value.trim()
    };
    
    // 重置到第一页
    InvoiceManager.pagination.currentPage = 1;
    
    // 重新加载数据
    loadInvoiceData();
}

/**
 * 处理重置功能
 */
function handleReset() {
    console.log('执行重置操作');
    
    // 清空表单
    document.getElementById('invoiceCode').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('applyDate').value = '';
    document.getElementById('status').value = '';
    document.getElementById('poNumber').value = '';
    document.getElementById('documentType').value = '';
    document.getElementById('applicant').value = '';
    document.getElementById('currentHandler').value = '';
    
    // 清空搜索条件
    InvoiceManager.searchParams = {
        invoiceCode: '',
        customerName: '',
        applyDate: '',
        status: '',
        poNumber: '',
        documentType: '',
        applicant: '',
        currentHandler: ''
    };
    
    // 重置到第一页
    InvoiceManager.pagination.currentPage = 1;
    
    // 重新加载数据
    loadInvoiceData();
}

/**
 * 处理导出功能
 */
function handleExport() {
    console.log('执行导出操作');
    
    // 显示加载状态
    showLoading();
    
    // 模拟导出过程
    setTimeout(() => {
        hideLoading();
        alert('导出功能开发中，敬请期待！');
    }, 1000);
}

/**
 * 加载开票数据
 */
function loadInvoiceData() {
    console.log('加载开票数据中...');
    
    // 显示加载状态
    showLoading();
    
    // 模拟API调用延迟
    setTimeout(() => {
        try {
            // 获取数据
            const result = window.MockData.getInvoiceData(
                InvoiceManager.searchParams,
                InvoiceManager.pagination.currentPage,
                InvoiceManager.pagination.pageSize
            );
            
            // 更新数据和分页信息
            InvoiceManager.currentData = result.data;
            InvoiceManager.pagination = { ...InvoiceManager.pagination, ...result.pagination };
            
            // 渲染表格
            renderTable();
            
            // 渲染分页
            renderPagination();
            
            console.log('数据加载完成:', result);
        } catch (error) {
            console.error('数据加载失败:', error);
            showError('数据加载失败，请稍后重试');
        } finally {
            // 隐藏加载状态
            hideLoading();
        }
    }, 500);
}

/**
 * 渲染数据表格
 */
function renderTable() {
    const tableBody = document.getElementById('invoiceTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (!tableBody) return;
    
    // 清空现有内容
    tableBody.innerHTML = '';
    
    // 如果没有数据，显示空状态
    if (InvoiceManager.currentData.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    // 隐藏空状态
    emptyState.classList.add('hidden');
    
    // 渲染数据行
    InvoiceManager.currentData.forEach((item, index) => {
        const row = createTableRow(item, index);
        tableBody.appendChild(row);
    });
}

/**
 * 创建表格行
 * @param {Object} item - 数据项
 * @param {number} index - 索引
 * @returns {HTMLElement} 表格行元素
 */
function createTableRow(item, index) {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 fade-in';
    row.dataset.id = item.id;
    
    // 状态样式映射
    const statusStyles = {
        '草稿': 'bg-gray-100 text-gray-800',
        '审核中': 'bg-yellow-100 text-yellow-800',
        '已关联': 'bg-green-100 text-green-800',
        '未关联': 'bg-red-100 text-red-800'
    };
    
    // 关联状态样式映射
    const linkStatusStyles = {
        '已关联': 'bg-green-100 text-green-800',
        '未关联': 'bg-gray-100 text-gray-800'
    };
    
    row.innerHTML = `
        <td class="px-4 py-3">
            <input type="checkbox" class="rounded row-checkbox" data-id="${item.id}">
        </td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.invoiceCode}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.applyDate || '-'}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.documentType || '结算开票'}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.poNumber || '无'}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.customerName}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.invoiceName || item.customerName}</td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.applicant}</td>
        <td class="px-4 py-3 text-sm text-gray-900">¥${item.applyAmount.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm text-gray-900">¥${item.invoicedAmount.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm text-gray-900">¥${item.remainingAmount.toLocaleString()}</td>
        <td class="px-4 py-3 text-sm text-gray-900">¥${item.receivedAmount.toLocaleString()}</td>
        <td class="px-4 py-3">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[item.status] || 'bg-gray-100 text-gray-800'}">
                ${item.status}
            </span>
        </td>
        <td class="px-4 py-3">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${linkStatusStyles[item.linkStatus] || 'bg-gray-100 text-gray-800'}">
                ${item.linkStatus}
            </span>
        </td>
        <td class="px-4 py-3 text-sm text-gray-900">${item.currentHandler || '-'}</td>
        <td class="px-4 py-3 text-sm">
            <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800 text-xs" onclick="viewInvoice(${item.id})">
                    详情
                </button>
                ${item.status === '草稿' || item.status === '审核中' ? `
                    <button class="text-green-600 hover:text-green-800 text-xs" onclick="editInvoice(${item.id})">
                        编辑
                    </button>
                ` : ''}
            </div>
        </td>
    `;
    
    // 添加行选择事件
    const checkbox = row.querySelector('.row-checkbox');
    if (checkbox) {
        checkbox.addEventListener('change', handleRowSelect);
    }
    
    return row;
}

/**
 * 渲染分页组件
 */
function renderPagination() {
    const totalCountSpan = document.getElementById('totalCount');
    const pageNumbersDiv = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    if (!totalCountSpan || !pageNumbersDiv) return;
    
    // 更新总数
    totalCountSpan.textContent = InvoiceManager.pagination.total;
    
    // 更新分页按钮状态
    if (prevPageBtn) {
        prevPageBtn.disabled = InvoiceManager.pagination.currentPage <= 1;
    }
    
    if (nextPageBtn) {
        nextPageBtn.disabled = InvoiceManager.pagination.currentPage >= InvoiceManager.pagination.totalPages;
    }
    
    // 生成页码按钮
    pageNumbersDiv.innerHTML = '';
    
    const { currentPage, totalPages } = InvoiceManager.pagination;
    
    // 计算显示的页码范围
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // 如果总页数较少，显示所有页码
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    }
    
    // 生成页码按钮
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `px-3 py-1 border border-gray-300 rounded text-sm ${
            i === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
        }`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => changePage(i));
        pageNumbersDiv.appendChild(pageBtn);
    }
}

/**
 * 切换页面
 * @param {number} page - 目标页码
 */
function changePage(page) {
    if (page < 1 || page > InvoiceManager.pagination.totalPages) return;
    
    InvoiceManager.pagination.currentPage = page;
    loadInvoiceData();
}

/**
 * 处理全选功能
 * @param {Event} e - 事件对象
 */
function handleSelectAll(e) {
    const isChecked = e.target.checked;
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        const id = parseInt(checkbox.dataset.id);
        
        if (isChecked) {
            InvoiceManager.selectedRows.add(id);
        } else {
            InvoiceManager.selectedRows.delete(id);
        }
    });
    
    console.log('选中的行:', Array.from(InvoiceManager.selectedRows));
}

/**
 * 处理行选择
 * @param {Event} e - 事件对象
 */
function handleRowSelect(e) {
    const id = parseInt(e.target.dataset.id);
    const isChecked = e.target.checked;
    
    if (isChecked) {
        InvoiceManager.selectedRows.add(id);
    } else {
        InvoiceManager.selectedRows.delete(id);
    }
    
    // 更新全选复选框状态
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const checkedCount = document.querySelectorAll('.row-checkbox:checked').length;
    
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = checkedCount === rowCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
    }
    
    console.log('选中的行:', Array.from(InvoiceManager.selectedRows));
}

/**
 * 显示加载状态
 */
function showLoading() {
    const loadingMask = document.getElementById('loadingMask');
    if (loadingMask) {
        loadingMask.classList.remove('hidden');
    }
}

/**
 * 隐藏加载状态
 */
function hideLoading() {
    const loadingMask = document.getElementById('loadingMask');
    if (loadingMask) {
        loadingMask.classList.add('hidden');
    }
}

/**
 * 显示错误信息
 * @param {string} message - 错误信息
 */
function showError(message) {
    alert(message); // 简单的错误提示，实际项目中可以使用更好的UI组件
}

/**
 * 查看开票详情
 * @param {number} id - 开票ID
 */
function viewInvoice(id) {
    console.log('查看开票:', id);
    // 跳转到开票详情页面
    window.location.href = `invoice-detail.html?id=${id}`;
}

/**
 * 处理作废开票
 */
function handleVoidInvoice() {
    const selectedRows = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    if (selectedRows.length === 0) {
        alert('请选择要作废的开票记录');
        return;
    }
    
    if (confirm(`确认作废选中的 ${selectedRows.length} 条开票记录？`)) {
        // 这里应该调用API作废开票
        alert('开票作废功能开发中');
    }
}

/**
 * 编辑开票
 * @param {number} id - 开票ID
 */
function editInvoice(id) {
    console.log('编辑开票:', id);
    alert(`编辑开票功能开发中，开票ID: ${id}`);
}

/**
 * 删除开票
 * @param {number} id - 开票ID
 */
function deleteInvoice(id) {
    console.log('删除开票:', id);
    
    if (confirm('确定要删除这条开票记录吗？')) {
        // 模拟删除操作
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            alert('删除成功！');
            loadInvoiceData(); // 重新加载数据
        }, 500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);

// 导出全局对象供其他模块使用
window.InvoiceManager = InvoiceManager;
window.viewInvoice = viewInvoice;
window.editInvoice = editInvoice;
window.deleteInvoice = deleteInvoice;