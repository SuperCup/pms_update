# HTML+JS+TailwindCSS 技术实现标准

## 项目概述
本文档定义了产品示意图展示系统的技术实现标准，专门针对使用HTML+JS+TailwindCSS技术栈的产品示意图开发。

# 技术实现标准

## 1. HTML 编码标准

### 1.1 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PMS - 项目管理系统</title>
    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 自定义样式 -->
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>
    <!-- 页面内容 -->
    
    <!-- JavaScript文件 -->
    <script src="js/main.js"></script>
</body>
</html>
```

### 1.2 语义化标签使用
- `<header>` - 页面头部
- `<nav>` - 导航菜单
- `<main>` - 主要内容
- `<section>` - 内容区块
- `<article>` - 独立内容
- `<aside>` - 侧边栏
- `<footer>` - 页面底部

### 1.3 表格结构标准
```html
<!-- 数据列表表格示例 -->
<div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    编号
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                </th>
                <!-- 更多列... -->
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <!-- 数据行通过JavaScript动态生成 -->
        </tbody>
    </table>
</div>
```

## 2. TailwindCSS 使用规范

### 2.1 颜色系统
```css
/* 主要颜色 */
.primary-color { @apply text-blue-600; }
.primary-bg { @apply bg-blue-600; }

/* 状态颜色 */
.success-color { @apply text-green-600; }
.warning-color { @apply text-yellow-600; }
.error-color { @apply text-red-600; }
.info-color { @apply text-blue-600; }

/* 文本颜色 */
.text-primary { @apply text-gray-900; }
.text-secondary { @apply text-gray-600; }
.text-muted { @apply text-gray-400; }
```

### 2.2 布局类使用
```html
<!-- 主布局容器 -->
<div class="min-h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <!-- 导航内容 -->
    </aside>
    
    <!-- 主内容区 -->
    <main class="ml-64 p-6">
        <!-- 页面内容 -->
    </main>
</div>
```

### 2.3 响应式设计
```html
<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- 网格项目 -->
</div>

<!-- 响应式隐藏/显示 -->
<div class="hidden md:block">桌面端显示</div>
<div class="block md:hidden">移动端显示</div>
```

### 2.4 组件样式标准
```html
<!-- 按钮样式 -->
<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    确认
</button>

<!-- 输入框样式 -->
<input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

<!-- 卡片样式 -->
<div class="bg-white rounded-lg shadow-md p-6">
    <!-- 卡片内容 -->
</div>
```

## 3. JavaScript 编码标准

### 3.1 代码组织结构
```javascript
// main.js 主文件结构
(function() {
    'use strict';
    
    // 全局配置
    const CONFIG = {
        API_BASE_URL: '/api',
        PAGE_SIZE: 10,
        DEBOUNCE_DELAY: 300
    };
    
    // 工具函数
    const Utils = {
        // 防抖函数
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // 格式化日期
        formatDate: function(date) {
            return new Date(date).toLocaleDateString('zh-CN');
        }
    };
    
    // 主应用对象
    const App = {
        init: function() {
            this.bindEvents();
            this.loadInitialData();
        },
        
        bindEvents: function() {
            // 绑定事件监听器
        },
        
        loadInitialData: function() {
            // 加载初始数据
        }
    };
    
    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        App.init();
    });
    
})();
```

### 3.2 事件处理标准
```javascript
// 事件委托示例
function bindTableEvents() {
    const tableContainer = document.getElementById('data-table');
    
    // 使用事件委托处理表格操作
    tableContainer.addEventListener('click', function(e) {
        const target = e.target;
        
        // 编辑按钮点击
        if (target.classList.contains('btn-edit')) {
            const itemId = target.dataset.id;
            handleEdit(itemId);
        }
        
        // 删除按钮点击
        if (target.classList.contains('btn-delete')) {
            const itemId = target.dataset.id;
            handleDelete(itemId);
        }
    });
}

// 处理编辑操作
function handleEdit(itemId) {
    // 获取数据项
    const itemData = getDataItemById(itemId);
    
    // 填充表单
    fillEditForm(itemData);
    
    // 显示编辑模态框
    showModal('edit-modal');
}
```

### 3.3 数据处理标准
```javascript
// 模拟数据管理
const DataManager = {
    // 数据列表
    dataList: [],
    
    // 获取数据列表
    getDataList: function(params = {}) {
        // 模拟API调用
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredData = this.dataList;
                
                // 应用筛选条件
                if (params.status) {
                    filteredData = filteredData.filter(item => item.status === params.status);
                }
                
                if (params.keyword) {
                    filteredData = filteredData.filter(item => 
                        item.number.includes(params.keyword) ||
                        item.name.includes(params.keyword)
                    );
                }
                
                // 分页处理
                const page = params.page || 1;
                const pageSize = params.pageSize || CONFIG.PAGE_SIZE;
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                
                resolve({
                    data: filteredData.slice(start, end),
                    total: filteredData.length,
                    page: page,
                    pageSize: pageSize
                });
            }, 300); // 模拟网络延迟
        });
    },
    
    // 创建数据项
    createDataItem: function(itemData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newItem = {
                    id: Date.now(),
                    number: 'DATA' + Date.now(),
                    createTime: new Date().toISOString(),
                    status: 'draft',
                    ...itemData
                };
                
                this.dataList.unshift(newItem);
                resolve(newItem);
            }, 300);
        });
    }
};
```

### 3.4 DOM 操作标准
```javascript
// DOM操作工具函数
const DOMUtils = {
    // 创建元素
    createElement: function(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    },
    
    // 显示/隐藏元素
    show: function(element) {
        element.classList.remove('hidden');
    },
    
    hide: function(element) {
        element.classList.add('hidden');
    },
    
    // 切换类名
    toggleClass: function(element, className) {
        element.classList.toggle(className);
    }
};

// 表格渲染函数
function renderDataTable(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // 清空现有内容
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${item.number}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${item.name}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    getStatusClass(item.status)
                }">
                    ${getStatusText(item.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${Utils.formatDate(item.createTime)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="btn-edit text-blue-600 hover:text-blue-900 mr-2" data-id="${item.id}">
                    编辑
                </button>
                <button class="btn-delete text-red-600 hover:text-red-900" data-id="${item.id}">
                    删除
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}
```

## 4. 组件开发标准

### 4.1 模态框组件
```html
<!-- 模态框HTML结构 -->
<div id="modal-overlay" class="fixed inset-0 bg-gray-600 bg-opacity-50 hidden z-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900" id="modal-title">
                    标题
                </h3>
            </div>
            <div class="px-6 py-4" id="modal-content">
                <!-- 模态框内容 -->
            </div>
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                <button id="modal-cancel" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    取消
                </button>
                <button id="modal-confirm" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    确认
                </button>
            </div>
        </div>
    </div>
</div>
```

```javascript
// 模态框JavaScript控制
const Modal = {
    show: function(title, content, onConfirm) {
        const overlay = document.getElementById('modal-overlay');
        const titleEl = document.getElementById('modal-title');
        const contentEl = document.getElementById('modal-content');
        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');
        
        titleEl.textContent = title;
        contentEl.innerHTML = content;
        
        // 显示模态框
        overlay.classList.remove('hidden');
        
        // 绑定确认事件
        confirmBtn.onclick = function() {
            if (onConfirm) onConfirm();
            Modal.hide();
        };
        
        // 绑定取消事件
        cancelBtn.onclick = Modal.hide;
        
        // 点击遮罩关闭
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                Modal.hide();
            }
        };
    },
    
    hide: function() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.add('hidden');
    }
};
```

### 4.2 分页组件
```javascript
// 分页组件
const Pagination = {
    render: function(container, currentPage, totalPages, onPageChange) {
        let html = '<div class="flex items-center justify-between">';
        
        // 页面信息
        html += `<div class="text-sm text-gray-700">
            显示第 ${(currentPage - 1) * CONFIG.PAGE_SIZE + 1} 到 ${Math.min(currentPage * CONFIG.PAGE_SIZE, totalPages * CONFIG.PAGE_SIZE)} 条记录
        </div>`;
        
        // 分页按钮
        html += '<div class="flex space-x-1">';
        
        // 上一页
        if (currentPage > 1) {
            html += `<button class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50" onclick="${onPageChange}(${currentPage - 1})">
                上一页
            </button>`;
        }
        
        // 页码按钮
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            const isActive = i === currentPage;
            html += `<button class="px-3 py-2 text-sm ${
                isActive 
                    ? 'bg-blue-600 text-white border border-blue-600' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            } rounded-md" onclick="${onPageChange}(${i})">
                ${i}
            </button>`;
        }
        
        // 下一页
        if (currentPage < totalPages) {
            html += `<button class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50" onclick="${onPageChange}(${currentPage + 1})">
                下一页
            </button>`;
        }
        
        html += '</div></div>';
        
        container.innerHTML = html;
    }
};
```

## 5. 性能优化建议

### 5.1 图片优化
- 使用适当的图片格式（WebP优先）
- 实现图片懒加载
- 提供不同尺寸的图片

### 5.2 代码优化
- 使用事件委托减少事件监听器
- 实现防抖和节流
- 避免频繁的DOM操作

### 5.3 缓存策略
```javascript
// 简单的内存缓存
const Cache = {
    data: new Map(),
    
    set: function(key, value, ttl = 300000) { // 默认5分钟过期
        this.data.set(key, {
            value: value,
            expires: Date.now() + ttl
        });
    },
    
    get: function(key) {
        const item = this.data.get(key);
        if (!item) return null;
        
        if (Date.now() > item.expires) {
            this.data.delete(key);
            return null;
        }
        
        return item.value;
    }
};
```

## 6. 调试和测试

### 6.1 调试工具
```javascript
// 调试工具
const Debug = {
    log: function(message, data) {
        if (CONFIG.DEBUG) {
            console.log(`[DEBUG] ${message}`, data);
        }
    },
    
    error: function(message, error) {
        console.error(`[ERROR] ${message}`, error);
    },
    
    time: function(label) {
        console.time(label);
    },
    
    timeEnd: function(label) {
        console.timeEnd(label);
    }
};
```

### 6.2 错误处理
```javascript
// 全局错误处理
window.addEventListener('error', function(e) {
    Debug.error('JavaScript Error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

// Promise错误处理
window.addEventListener('unhandledrejection', function(e) {
    Debug.error('Unhandled Promise Rejection', e.reason);
});
```

---

**注意事项**：
1. 所有代码必须经过测试验证
2. 保持代码简洁和可读性
3. 遵循无障碍访问标准
4. 确保跨浏览器兼容性