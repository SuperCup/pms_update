# 开发工作流程指南

## 1. 开发流程概述

### 1.1 开发阶段
1. **需求分析**：理解产品需求和设计图
2. **技术设计**：确定技术实现方案
3. **环境搭建**：配置开发环境
4. **编码实现**：按模块逐步开发
5. **测试验证**：功能测试和兼容性测试
6. **代码审查**：检查代码质量
7. **部署上线**：发布到生产环境

### 1.2 质量保证
- 代码规范检查
- 功能完整性验证
- 浏览器兼容性测试
- 响应式布局测试
- 无障碍访问测试

## 2. 项目初始化

### 2.1 目录结构创建
```bash
# 创建项目基础目录
mkdir -p src/{components,pages,styles,utils,assets}
mkdir -p public/{images,icons}
mkdir -p docs
```

### 2.2 基础文件创建
```bash
# 创建基础HTML文件
touch index.html

# 创建样式文件
touch src/styles/main.css
touch src/styles/components.css
touch src/styles/utilities.css

# 创建JavaScript文件
touch src/utils/common.js
touch src/utils/api.js
touch src/utils/validation.js
```

### 2.3 配置文件设置
```json
// package.json 示例
{
  "name": "pms-invoice-management",
  "version": "1.0.0",
  "description": "开票管理系统前端展示",
  "main": "index.html",
  "scripts": {
    "dev": "live-server --port=3000",
    "build": "npm run build:css",
    "build:css": "tailwindcss -i ./src/styles/main.css -o ./dist/styles.css --watch",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.{html,css,js}"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "live-server": "^1.2.2",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0"
  }
}
```

## 3. 编码规范

### 3.1 HTML编码规范

#### 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 开票管理系统</title>
    <link href="./dist/styles.css" rel="stylesheet">
</head>
<body>
    <!-- 页面内容 -->
    <script src="./src/utils/common.js"></script>
</body>
</html>
```

#### 语义化标签使用
```html
<!-- 正确的语义化结构 -->
<header class="bg-white shadow-sm">
    <nav aria-label="主导航">
        <!-- 导航内容 -->
    </nav>
</header>

<main role="main">
    <section class="invoice-list">
        <h1>开票管理</h1>
        <!-- 主要内容 -->
    </section>
</main>

<footer class="bg-gray-50">
    <!-- 页脚内容 -->
</footer>
```

#### 表单结构
```html
<!-- 标准表单结构 -->
<form class="space-y-6" onsubmit="handleSubmit(event)">
    <div class="form-group">
        <label for="invoice-number" class="block text-sm font-medium text-gray-700">
            发票号码 <span class="text-red-500">*</span>
        </label>
        <input type="text" 
               id="invoice-number" 
               name="invoiceNumber"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               placeholder="请输入发票号码"
               required>
        <div class="error-message hidden text-sm text-red-600 mt-1"></div>
    </div>
    
    <div class="form-actions">
        <button type="submit" 
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            提交
        </button>
    </div>
</form>
```

### 3.2 CSS编码规范

#### TailwindCSS使用
```css
/* main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义基础样式 */
@layer base {
    html {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    body {
        @apply bg-gray-50 text-gray-900;
    }
}

/* 自定义组件样式 */
@layer components {
    .btn-primary {
        @apply px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200;
    }
    
    .form-input {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200;
    }
    
    .card {
        @apply bg-white overflow-hidden shadow rounded-lg;
    }
    
    .table-responsive {
        @apply overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg;
    }
}

/* 自定义工具类 */
@layer utilities {
    .text-balance {
        text-wrap: balance;
    }
    
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
}
```

#### 响应式设计
```css
/* 响应式工具类 */
.responsive-grid {
    @apply grid grid-cols-1 gap-6;
    @apply md:grid-cols-2;
    @apply lg:grid-cols-3;
    @apply xl:grid-cols-4;
}

.responsive-padding {
    @apply p-4;
    @apply md:p-6;
    @apply lg:p-8;
}

.responsive-text {
    @apply text-sm;
    @apply md:text-base;
    @apply lg:text-lg;
}
```

### 3.3 JavaScript编码规范

#### 代码组织结构
```javascript
// common.js - 通用工具函数

/**
 * 通用工具类
 */
class Utils {
    /**
     * 格式化日期
     * @param {Date|string} date - 日期对象或字符串
     * @param {string} format - 格式化模式
     * @returns {string} 格式化后的日期字符串
     */
    static formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }
    
    /**
     * 格式化金额
     * @param {number} amount - 金额数值
     * @param {number} decimals - 小数位数
     * @returns {string} 格式化后的金额字符串
     */
    static formatCurrency(amount, decimals = 2) {
        if (isNaN(amount)) return '0.00';
        return Number(amount).toLocaleString('zh-CN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }
    
    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 限制时间（毫秒）
     * @returns {Function} 节流后的函数
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

/**
 * DOM操作工具类
 */
class DOMUtils {
    /**
     * 查找元素
     * @param {string} selector - CSS选择器
     * @param {Element} parent - 父元素（可选）
     * @returns {Element|null} 找到的元素
     */
    static $(selector, parent = document) {
        return parent.querySelector(selector);
    }
    
    /**
     * 查找所有匹配元素
     * @param {string} selector - CSS选择器
     * @param {Element} parent - 父元素（可选）
     * @returns {NodeList} 找到的元素列表
     */
    static $$(selector, parent = document) {
        return parent.querySelectorAll(selector);
    }
    
    /**
     * 添加事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件类型
     * @param {Function} handler - 事件处理函数
     * @param {boolean|object} options - 事件选项
     */
    static on(element, event, handler, options = false) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.addEventListener(event, handler, options);
        }
    }
    
    /**
     * 移除事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件类型
     * @param {Function} handler - 事件处理函数
     */
    static off(element, event, handler) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.removeEventListener(event, handler);
        }
    }
    
    /**
     * 显示元素
     * @param {Element|string} element - 元素或选择器
     */
    static show(element) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.remove('hidden');
        }
    }
    
    /**
     * 隐藏元素
     * @param {Element|string} element - 元素或选择器
     */
    static hide(element) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.add('hidden');
        }
    }
    
    /**
     * 切换元素显示状态
     * @param {Element|string} element - 元素或选择器
     */
    static toggle(element) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.classList.toggle('hidden');
        }
    }
}

// 导出到全局
window.Utils = Utils;
window.DOMUtils = DOMUtils;
window.$ = DOMUtils.$;
window.$$ = DOMUtils.$$;
```

#### API请求处理
```javascript
// api.js - API请求工具

/**
 * API请求工具类
 */
class APIClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    
    /**
     * 发送HTTP请求
     * @param {string} url - 请求URL
     * @param {object} options - 请求选项
     * @returns {Promise} 请求Promise
     */
    async request(url, options = {}) {
        const config = {
            method: 'GET',
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };
        
        // 处理请求体
        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }
        
        try {
            const response = await fetch(this.baseURL + url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }
    
    /**
     * GET请求
     * @param {string} url - 请求URL
     * @param {object} params - 查询参数
     * @returns {Promise} 请求Promise
     */
    async get(url, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return this.request(fullUrl);
    }
    
    /**
     * POST请求
     * @param {string} url - 请求URL
     * @param {object} data - 请求数据
     * @returns {Promise} 请求Promise
     */
    async post(url, data = {}) {
        return this.request(url, {
            method: 'POST',
            body: data
        });
    }
    
    /**
     * PUT请求
     * @param {string} url - 请求URL
     * @param {object} data - 请求数据
     * @returns {Promise} 请求Promise
     */
    async put(url, data = {}) {
        return this.request(url, {
            method: 'PUT',
            body: data
        });
    }
    
    /**
     * DELETE请求
     * @param {string} url - 请求URL
     * @returns {Promise} 请求Promise
     */
    async delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
}

// 创建API客户端实例
const api = new APIClient('/api');

// 开票管理API
const InvoiceAPI = {
    /**
     * 获取开票列表
     * @param {object} params - 查询参数
     * @returns {Promise} 开票列表数据
     */
    async getInvoiceList(params = {}) {
        return api.get('/invoices', params);
    },
    
    /**
     * 获取开票详情
     * @param {string} id - 开票ID
     * @returns {Promise} 开票详情数据
     */
    async getInvoiceDetail(id) {
        return api.get(`/invoices/${id}`);
    },
    
    /**
     * 创建开票
     * @param {object} data - 开票数据
     * @returns {Promise} 创建结果
     */
    async createInvoice(data) {
        return api.post('/invoices', data);
    },
    
    /**
     * 更新开票
     * @param {string} id - 开票ID
     * @param {object} data - 更新数据
     * @returns {Promise} 更新结果
     */
    async updateInvoice(id, data) {
        return api.put(`/invoices/${id}`, data);
    },
    
    /**
     * 删除开票
     * @param {string} id - 开票ID
     * @returns {Promise} 删除结果
     */
    async deleteInvoice(id) {
        return api.delete(`/invoices/${id}`);
    }
};

// 导出到全局
window.APIClient = APIClient;
window.api = api;
window.InvoiceAPI = InvoiceAPI;
```

#### 表单验证
```javascript
// validation.js - 表单验证工具

/**
 * 表单验证工具类
 */
class Validator {
    constructor() {
        this.rules = {};
        this.messages = {};
    }
    
    /**
     * 添加验证规则
     * @param {string} field - 字段名
     * @param {Array} rules - 验证规则数组
     * @param {object} messages - 错误消息
     */
    addRule(field, rules, messages = {}) {
        this.rules[field] = rules;
        this.messages[field] = messages;
    }
    
    /**
     * 验证单个字段
     * @param {string} field - 字段名
     * @param {any} value - 字段值
     * @returns {object} 验证结果
     */
    validateField(field, value) {
        const rules = this.rules[field] || [];
        const messages = this.messages[field] || {};
        
        for (const rule of rules) {
            const result = this.applyRule(rule, value);
            if (!result.valid) {
                return {
                    valid: false,
                    message: messages[rule.type] || result.message
                };
            }
        }
        
        return { valid: true };
    }
    
    /**
     * 验证整个表单
     * @param {object} data - 表单数据
     * @returns {object} 验证结果
     */
    validate(data) {
        const errors = {};
        let isValid = true;
        
        for (const field in this.rules) {
            const result = this.validateField(field, data[field]);
            if (!result.valid) {
                errors[field] = result.message;
                isValid = false;
            }
        }
        
        return { valid: isValid, errors };
    }
    
    /**
     * 应用验证规则
     * @param {object} rule - 验证规则
     * @param {any} value - 字段值
     * @returns {object} 验证结果
     */
    applyRule(rule, value) {
        switch (rule.type) {
            case 'required':
                return {
                    valid: value !== null && value !== undefined && value !== '',
                    message: '此字段为必填项'
                };
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return {
                    valid: !value || emailRegex.test(value),
                    message: '请输入有效的邮箱地址'
                };
                
            case 'phone':
                const phoneRegex = /^1[3-9]\d{9}$/;
                return {
                    valid: !value || phoneRegex.test(value),
                    message: '请输入有效的手机号码'
                };
                
            case 'minLength':
                return {
                    valid: !value || value.length >= rule.value,
                    message: `最少需要${rule.value}个字符`
                };
                
            case 'maxLength':
                return {
                    valid: !value || value.length <= rule.value,
                    message: `最多允许${rule.value}个字符`
                };
                
            case 'pattern':
                return {
                    valid: !value || rule.value.test(value),
                    message: '格式不正确'
                };
                
            default:
                return { valid: true };
        }
    }
}

/**
 * 表单处理工具类
 */
class FormHandler {
    constructor(formSelector, validator) {
        this.form = document.querySelector(formSelector);
        this.validator = validator;
        this.init();
    }
    
    /**
     * 初始化表单处理
     */
    init() {
        if (!this.form) return;
        
        // 绑定提交事件
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // 绑定实时验证
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', Utils.debounce(() => {
                this.clearFieldError(input);
            }, 300));
        });
    }
    
    /**
     * 处理表单提交
     */
    async handleSubmit() {
        const formData = this.getFormData();
        const validation = this.validator.validate(formData);
        
        if (!validation.valid) {
            this.showErrors(validation.errors);
            return;
        }
        
        this.clearAllErrors();
        
        try {
            await this.onSubmit(formData);
        } catch (error) {
            this.showSubmitError(error.message);
        }
    }
    
    /**
     * 获取表单数据
     * @returns {object} 表单数据对象
     */
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    /**
     * 验证单个字段
     * @param {Element} input - 输入元素
     */
    validateField(input) {
        const result = this.validator.validateField(input.name, input.value);
        
        if (!result.valid) {
            this.showFieldError(input, result.message);
        } else {
            this.clearFieldError(input);
        }
    }
    
    /**
     * 显示字段错误
     * @param {Element} input - 输入元素
     * @param {string} message - 错误消息
     */
    showFieldError(input, message) {
        input.classList.add('border-red-300', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');
        
        let errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }
    
    /**
     * 清除字段错误
     * @param {Element} input - 输入元素
     */
    clearFieldError(input) {
        input.classList.remove('border-red-300', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500');
        
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }
    
    /**
     * 显示所有错误
     * @param {object} errors - 错误对象
     */
    showErrors(errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = this.form.querySelector(`[name="${field}"]`);
            if (input) {
                this.showFieldError(input, message);
            }
        }
    }
    
    /**
     * 清除所有错误
     */
    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => this.clearFieldError(input));
    }
    
    /**
     * 显示提交错误
     * @param {string} message - 错误消息
     */
    showSubmitError(message) {
        // 可以在这里显示全局错误消息
        console.error('Form submission error:', message);
    }
    
    /**
     * 表单提交处理函数（需要子类实现）
     * @param {object} data - 表单数据
     */
    async onSubmit(data) {
        throw new Error('onSubmit method must be implemented');
    }
}

// 导出到全局
window.Validator = Validator;
window.FormHandler = FormHandler;
```

## 4. 组件开发规范

### 4.1 模态框组件
```javascript
// modal.js - 模态框组件

/**
 * 模态框组件类
 */
class Modal {
    constructor(options = {}) {
        this.options = {
            backdrop: true,
            keyboard: true,
            focus: true,
            ...options
        };
        
        this.isOpen = false;
        this.element = null;
        this.backdrop = null;
        
        this.init();
    }
    
    /**
     * 初始化模态框
     */
    init() {
        this.createElement();
        this.bindEvents();
    }
    
    /**
     * 创建模态框元素
     */
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'fixed inset-0 z-50 overflow-y-auto';
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.style.display = 'none';
        
        this.element.innerHTML = `
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="modal-backdrop fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="modal-content inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="modal-header bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="modal-title text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    ${this.options.title || '标题'}
                                </h3>
                                <button type="button" class="modal-close absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body px-4 pb-4 sm:px-6">
                        ${this.options.content || ''}
                    </div>
                    <div class="modal-footer bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        ${this.options.footer || this.getDefaultFooter()}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.element);
        
        this.backdrop = this.element.querySelector('.modal-backdrop');
    }
    
    /**
     * 获取默认页脚
     * @returns {string} 页脚HTML
     */
    getDefaultFooter() {
        return `
            <button type="button" class="modal-confirm w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                确认
            </button>
            <button type="button" class="modal-cancel mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                取消
            </button>
        `;
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 关闭按钮事件
        const closeBtn = this.element.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }
        
        // 取消按钮事件
        const cancelBtn = this.element.querySelector('.modal-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hide());
        }
        
        // 确认按钮事件
        const confirmBtn = this.element.querySelector('.modal-confirm');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (this.options.onConfirm) {
                    this.options.onConfirm();
                }
                this.hide();
            });
        }
        
        // 背景点击事件
        if (this.options.backdrop && this.backdrop) {
            this.backdrop.addEventListener('click', () => this.hide());
        }
        
        // 键盘事件
        if (this.options.keyboard) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.hide();
                }
            });
        }
    }
    
    /**
     * 显示模态框
     */
    show() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        this.element.style.display = 'block';
        document.body.classList.add('overflow-hidden');
        
        // 焦点管理
        if (this.options.focus) {
            const focusableElement = this.element.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElement) {
                focusableElement.focus();
            }
        }
        
        // 触发显示事件
        if (this.options.onShow) {
            this.options.onShow();
        }
    }
    
    /**
     * 隐藏模态框
     */
    hide() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.element.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        
        // 触发隐藏事件
        if (this.options.onHide) {
            this.options.onHide();
        }
    }
    
    /**
     * 销毁模态框
     */
    destroy() {
        if (this.element) {
            this.element.remove();
        }
        this.isOpen = false;
    }
    
    /**
     * 更新内容
     * @param {object} options - 更新选项
     */
    update(options) {
        if (options.title) {
            const titleElement = this.element.querySelector('.modal-title');
            if (titleElement) {
                titleElement.textContent = options.title;
            }
        }
        
        if (options.content) {
            const bodyElement = this.element.querySelector('.modal-body');
            if (bodyElement) {
                bodyElement.innerHTML = options.content;
            }
        }
    }
}

// 导出到全局
window.Modal = Modal;
```

### 4.2 分页组件
```javascript
// pagination.js - 分页组件

/**
 * 分页组件类
 */
class Pagination {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            total: 0,
            pageSize: 10,
            current: 1,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: true,
            pageSizeOptions: [10, 20, 50, 100],
            onChange: null,
            onShowSizeChange: null,
            ...options
        };
        
        this.totalPages = Math.ceil(this.options.total / this.options.pageSize);
        this.render();
    }
    
    /**
     * 渲染分页组件
     */
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = this.getHTML();
        this.bindEvents();
    }
    
    /**
     * 获取分页HTML
     * @returns {string} 分页HTML字符串
     */
    getHTML() {
        const { current, total, pageSize } = this.options;
        const totalPages = this.totalPages;
        const startItem = (current - 1) * pageSize + 1;
        const endItem = Math.min(current * pageSize, total);
        
        return `
            <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                ${this.options.showTotal ? `
                    <div class="flex flex-1 justify-between sm:hidden">
                        <span class="text-sm text-gray-700">
                            显示 <span class="font-medium">${startItem}</span> 到 <span class="font-medium">${endItem}</span> 条，共 <span class="font-medium">${total}</span> 条
                        </span>
                    </div>
                ` : ''}
                
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    ${this.options.showTotal ? `
                        <div class="flex items-center space-x-4">
                            <p class="text-sm text-gray-700">
                                显示 <span class="font-medium">${startItem}</span> 到 <span class="font-medium">${endItem}</span> 条，共 <span class="font-medium">${total}</span> 条
                            </p>
                            ${this.options.showSizeChanger ? this.getSizeChangerHTML() : ''}
                        </div>
                    ` : ''}
                    
                    <div class="flex items-center space-x-2">
                        ${this.getPaginationHTML()}
                        ${this.options.showQuickJumper ? this.getQuickJumperHTML() : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * 获取页码HTML
     * @returns {string} 页码HTML字符串
     */
    getPaginationHTML() {
        const { current } = this.options;
        const totalPages = this.totalPages;
        
        if (totalPages <= 1) return '';
        
        let html = '<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">';
        
        // 上一页按钮
        html += `
            <button type="button" class="pagination-prev relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${current <= 1 ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-500'}" ${current <= 1 ? 'disabled' : ''}>
                <span class="sr-only">上一页</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        
        // 页码按钮
        const pages = this.getPageNumbers();
        pages.forEach(page => {
            if (page === '...') {
                html += `
                    <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                `;
            } else {
                const isActive = page === current;
                html += `
                    <button type="button" class="pagination-page relative inline-flex items-center px-4 py-2 text-sm font-semibold ${isActive ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}" data-page="${page}">
                        ${page}
                    </button>
                `;
            }
        });
        
        // 下一页按钮
        html += `
            <button type="button" class="pagination-next relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${current >= totalPages ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-500'}" ${current >= totalPages ? 'disabled' : ''}>
                <span class="sr-only">下一页</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        
        html += '</nav>';
        return html;
    }
    
    /**
     * 获取页码数组
     * @returns {Array} 页码数组
     */
    getPageNumbers() {
        const { current } = this.options;
        const totalPages = this.totalPages;
        const pages = [];
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (current >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    }
    
    /**
     * 获取页面大小选择器HTML
     * @returns {string} 页面大小选择器HTML字符串
     */
    getSizeChangerHTML() {
        const { pageSize, pageSizeOptions } = this.options;
        
        let html = `
            <div class="flex items-center space-x-2">
                <label class="text-sm text-gray-700">每页显示</label>
                <select class="pagination-size-select rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
        `;
        
        pageSizeOptions.forEach(size => {
            html += `<option value="${size}" ${size === pageSize ? 'selected' : ''}>${size} 条</option>`;
        });
        
        html += `
                </select>
            </div>
        `;
        
        return html;
    }
    
    /**
     * 获取快速跳转HTML
     * @returns {string} 快速跳转HTML字符串
     */
    getQuickJumperHTML() {
        return `
            <div class="flex items-center space-x-2">
                <label class="text-sm text-gray-700">跳至</label>
                <input type="number" class="pagination-jumper w-16 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500" min="1" max="${this.totalPages}">
                <span class="text-sm text-gray-700">页</span>
            </div>
        `;
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 页码点击事件
        const pageButtons = this.container.querySelectorAll('.pagination-page');
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const page = parseInt(button.dataset.page);
                this.changePage(page);
            });
        });
        
        // 上一页/下一页事件
        const prevButton = this.container.querySelector('.pagination-prev');
        const nextButton = this.container.querySelector('.pagination-next');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (this.options.current > 1) {
                    this.changePage(this.options.current - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (this.options.current < this.totalPages) {
                    this.changePage(this.options.current + 1);
                }
            });
        }
        
        // 页面大小改变事件
        const sizeSelect = this.container.querySelector('.pagination-size-select');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', () => {
                const newSize = parseInt(sizeSelect.value);
                this.changePageSize(newSize);
            });
        }
        
        // 快速跳转事件
        const jumper = this.container.querySelector('.pagination-jumper');
        if (jumper) {
            jumper.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const page = parseInt(jumper.value);
                    if (page >= 1 && page <= this.totalPages) {
                        this.changePage(page);
                        jumper.value = '';
                    }
                }
            });
        }
    }
    
    /**
     * 改变页码
     * @param {number} page - 目标页码
     */
    changePage(page) {
        if (page === this.options.current || page < 1 || page > this.totalPages) {
            return;
        }
        
        this.options.current = page;
        this.render();
        
        if (this.options.onChange) {
            this.options.onChange(page, this.options.pageSize);
        }
    }
    
    /**
     * 改变页面大小
     * @param {number} size - 新的页面大小
     */
    changePageSize(size) {
        if (size === this.options.pageSize) return;
        
        this.options.pageSize = size;
        this.options.current = 1;
        this.totalPages = Math.ceil(this.options.total / size);
        this.render();
        
        if (this.options.onShowSizeChange) {
            this.options.onShowSizeChange(1, size);
        }
    }
    
    /**
     * 更新分页数据
     * @param {object} options - 更新选项
     */
    update(options) {
        Object.assign(this.options, options);
        this.totalPages = Math.ceil(this.options.total / this.options.pageSize);
        this.render();
    }
}

// 导出到全局
window.Pagination = Pagination;
```

## 5. 测试和调试

### 5.1 浏览器兼容性测试
```javascript
// compatibility.js - 浏览器兼容性检测

/**
 * 浏览器兼容性检测工具
 */
class BrowserCompatibility {
    /**
     * 检测浏览器信息
     * @returns {object} 浏览器信息
     */
    static getBrowserInfo() {
        const ua = navigator.userAgent;
        const browsers = {
            chrome: /Chrome\/(\d+)/.exec(ua),
            firefox: /Firefox\/(\d+)/.exec(ua),
            safari: /Safari\/(\d+)/.exec(ua),
            edge: /Edge\/(\d+)/.exec(ua),
            ie: /MSIE (\d+)/.exec(ua) || /Trident.*rv:(\d+)/.exec(ua)
        };
        
        for (const [name, match] of Object.entries(browsers)) {
            if (match) {
                return {
                    name,
                    version: parseInt(match[1])
                };
            }
        }
        
        return { name: 'unknown', version: 0 };
    }
    
    /**
     * 检测功能支持
     * @returns {object} 功能支持情况
     */
    static checkFeatureSupport() {
        return {
            flexbox: CSS.supports('display', 'flex'),
            grid: CSS.supports('display', 'grid'),
            customProperties: CSS.supports('--custom', 'property'),
            fetch: typeof fetch !== 'undefined',
            promise: typeof Promise !== 'undefined',
            arrow: (() => {
                try {
                    eval('() => {}');
                    return true;
                } catch (e) {
                    return false;
                }
            })(),
            classList: 'classList' in document.createElement('div'),
            addEventListener: 'addEventListener' in window
        };
    }
    
    /**
     * 显示兼容性警告
     */
    static showCompatibilityWarning() {
        const browser = this.getBrowserInfo();
        const features = this.checkFeatureSupport();
        
        const unsupportedFeatures = Object.entries(features)
            .filter(([, supported]) => !supported)
            .map(([feature]) => feature);
        
        if (unsupportedFeatures.length > 0) {
            console.warn('浏览器兼容性警告:', {
                browser,
                unsupportedFeatures
            });
            
            // 显示用户友好的警告信息
            const warningDiv = document.createElement('div');
            warningDiv.className = 'fixed top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 p-4 z-50';
            warningDiv.innerHTML = `
                <div class="flex items-center justify-between max-w-7xl mx-auto">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-sm text-yellow-800">
                            您的浏览器版本较旧，可能影响页面显示效果。建议升级到最新版本。
                        </span>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-yellow-800 hover:text-yellow-900">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            `;
            
            document.body.insertBefore(warningDiv, document.body.firstChild);
        }
    }
}

// 页面加载时检测兼容性
document.addEventListener('DOMContentLoaded', () => {
    BrowserCompatibility.showCompatibilityWarning();
});

// 导出到全局
window.BrowserCompatibility = BrowserCompatibility;
```

### 5.2 错误处理和日志
```javascript
// logger.js - 日志和错误处理工具

/**
 * 日志工具类
 */
class Logger {
    constructor(options = {}) {
        this.options = {
            level: 'info', // debug, info, warn, error
            prefix: '[PMS]',
            timestamp: true,
            ...options
        };
        
        this.levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        };
    }
    
    /**
     * 格式化日志消息
     * @param {string} level - 日志级别
     * @param {Array} args - 日志参数
     * @returns {Array} 格式化后的参数
     */
    formatMessage(level, args) {
        const timestamp = this.options.timestamp ? new Date().toISOString() : '';
        const prefix = this.options.prefix;
        const levelText = level.toUpperCase();
        
        const formattedPrefix = [prefix, timestamp, `[${levelText}]`]
            .filter(Boolean)
            .join(' ');
        
        return [formattedPrefix, ...args];
    }
    
    /**
     * 检查是否应该输出日志
     * @param {string} level - 日志级别
     * @returns {boolean} 是否应该输出
     */
    shouldLog(level) {
        return this.levels[level] >= this.levels[this.options.level];
    }
    
    /**
     * 调试日志
     * @param {...any} args - 日志参数
     */
    debug(...args) {
        if (this.shouldLog('debug')) {
            console.debug(...this.formatMessage('debug', args));
        }
    }
    
    /**
     * 信息日志
     * @param {...any} args - 日志参数
     */
    info(...args) {
        if (this.shouldLog('info')) {
            console.info(...this.formatMessage('info', args));
        }
    }
    
    /**
     * 警告日志
     * @param {...any} args - 日志参数
     */
    warn(...args) {
        if (this.shouldLog('warn')) {
            console.warn(...this.formatMessage('warn', args));
        }
    }
    
    /**
     * 错误日志
     * @param {...any} args - 日志参数
     */
    error(...args) {
        if (this.shouldLog('error')) {
            console.error(...this.formatMessage('error', args));
        }
    }
}

/**
 * 错误处理工具类
 */
class ErrorHandler {
    constructor(logger) {
        this.logger = logger || new Logger();
        this.init();
    }
    
    /**
     * 初始化错误处理
     */
    init() {
        // 全局错误处理
        window.addEventListener('error', (event) => {
            this.handleError(event.error, {
                type: 'javascript',
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
        
        // Promise错误处理
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, {
                type: 'promise'
            });
        });
    }
    
    /**
     * 处理错误
     * @param {Error} error - 错误对象
     * @param {object} context - 错误上下文
     */
    handleError(error, context = {}) {
        const errorInfo = {
            message: error.message || '未知错误',
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...context
        };
        
        this.logger.error('发生错误:', errorInfo);
        
        // 显示用户友好的错误提示
        this.showErrorNotification(error.message || '系统发生错误，请稍后重试');
    }
    
    /**
     * 显示错误通知
     * @param {string} message - 错误消息
     */
    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-50 border border-red-200 rounded-md p-4 shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-start">
                <svg class="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <div class="flex-1">
                    <p class="text-sm text-red-800">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-red-400 hover:text-red-600">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 5秒后自动移除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// 创建全局实例
const logger = new Logger();
const errorHandler = new ErrorHandler(logger);

// 导出到全局
window.Logger = Logger;
window.ErrorHandler = ErrorHandler;
window.logger = logger;
window.errorHandler = errorHandler;
```

## 6. 性能优化

### 6.1 图片优化
```javascript
// image-optimization.js - 图片优化工具

/**
 * 图片优化工具类
 */
class ImageOptimizer {
    /**
     * 懒加载图片
     * @param {string} selector - 图片选择器
     * @param {object} options - 配置选项
     */
    static lazyLoad(selector = 'img[data-src]', options = {}) {
        const config = {
            rootMargin: '50px 0px',
            threshold: 0.01,
            ...options
        };
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, config);
            
            document.querySelectorAll(selector).forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // 降级处理
            document.querySelectorAll(selector).forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    /**
     * 预加载关键图片
     * @param {Array} urls - 图片URL数组
     */
    static preload(urls) {
        urls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    /**
     * 响应式图片处理
     * @param {Element} img - 图片元素
     * @param {object} sources - 不同尺寸的图片源
     */
    static responsive(img, sources) {
        const picture = document.createElement('picture');
        
        Object.entries(sources).forEach(([breakpoint, src]) => {
            const source = document.createElement('source');
            source.media = `(min-width: ${breakpoint})`;
            source.srcset = src;
            picture.appendChild(source);
        });
        
        picture.appendChild(img);
        img.parentNode.replaceChild(picture, img);
    }
}

// 页面加载完成后初始化懒加载
document.addEventListener('DOMContentLoaded', () => {
    ImageOptimizer.lazyLoad();
});

// 导出到全局
window.ImageOptimizer = ImageOptimizer;
```

### 6.2 代码分割和缓存
```javascript
// cache-manager.js - 缓存管理工具

/**
 * 缓存管理工具类
 */
class CacheManager {
    constructor() {
        this.storage = window.localStorage;
        this.prefix = 'pms_cache_';
        this.defaultTTL = 3600000; // 1小时
    }
    
    /**
     * 设置缓存
     * @param {string} key - 缓存键
     * @param {any} value - 缓存值
     * @param {number} ttl - 过期时间（毫秒）
     */
    set(key, value, ttl = this.defaultTTL) {
        const item = {
            value,
            timestamp: Date.now(),
            ttl
        };
        
        try {
            this.storage.setItem(this.prefix + key, JSON.stringify(item));
        } catch (error) {
            console.warn('缓存设置失败:', error);
        }
    }
    
    /**
     * 获取缓存
     * @param {string} key - 缓存键
     * @returns {any} 缓存值
     */
    get(key) {
        try {
            const item = this.storage.getItem(this.prefix + key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            const now = Date.now();
            
            if (now - parsed.timestamp > parsed.ttl) {
                this.remove(key);
                return null;
            }
            
            return parsed.value;
        } catch (error) {
            console.warn('缓存获取失败:', error);
            return null;
        }
    }
    
    /**
     * 移除缓存
     * @param {string} key - 缓存键
     */
    remove(key) {
        try {
            this.storage.removeItem(this.prefix + key);
        } catch (error) {
            console.warn('缓存移除失败:', error);
        }
    }
    
    /**
     * 清空所有缓存
     */
    clear() {
        try {
            const keys = Object.keys(this.storage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    this.storage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('缓存清空失败:', error);
        }
    }
    
    /**
     * 获取缓存大小
     * @returns {number} 缓存大小（字节）
     */
    getSize() {
        let size = 0;
        try {
            const keys = Object.keys(this.storage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    size += this.storage.getItem(key).length;
                }
            });
        } catch (error) {
            console.warn('缓存大小计算失败:', error);
        }
        return size;
    }
}

// 创建全局缓存管理器实例
const cacheManager = new CacheManager();

// 导出到全局
window.CacheManager = CacheManager;
window.cacheManager = cacheManager;
```

## 7. 部署和发布

### 7.1 构建脚本
```json
// build.json - 构建配置
{
  "scripts": {
    "dev": "live-server --port=3000 --open=/index.html",
    "build": "npm run build:css && npm run build:js && npm run build:html",
    "build:css": "tailwindcss -i ./src/styles/main.css -o ./dist/styles.css --minify",
    "build:js": "terser src/utils/*.js -o dist/scripts.min.js --compress --mangle",
    "build:html": "html-minifier --input-dir ./ --output-dir ./dist --file-ext html --remove-comments --collapse-whitespace",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write src/**/*.{html,css,js}",
    "test": "echo \"No tests specified\" && exit 0",
    "serve": "http-server dist -p 8080"
  }
}
```

### 7.2 部署检查清单
```markdown
## 部署前检查清单

### 代码质量
- [ ] 所有JavaScript代码通过ESLint检查
- [ ] 所有代码格式化完成
- [ ] 移除所有console.log和调试代码
- [ ] 确保没有硬编码的API地址

### 功能测试
- [ ] 所有页面正常加载
- [ ] 所有表单功能正常
- [ ] 所有按钮和链接可点击
- [ ] 数据展示正确
- [ ] 错误处理正常

### 性能优化
- [ ] CSS和JavaScript文件已压缩
- [ ] 图片已优化
- [ ] 启用了懒加载
- [ ] 设置了适当的缓存策略

### 兼容性测试
- [ ] Chrome浏览器测试通过
- [ ] Firefox浏览器测试通过
- [ ] Safari浏览器测试通过
- [ ] Edge浏览器测试通过
- [ ] 移动端浏览器测试通过

### 响应式设计
- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 手机端显示正常
- [ ] 各种屏幕尺寸适配良好

### 无障碍访问
- [ ] 所有图片有alt属性
- [ ] 表单元素有正确的标签
- [ ] 颜色对比度符合标准
- [ ] 支持键盘导航

### 安全检查
- [ ] 没有暴露敏感信息
- [ ] 输入验证完整
- [ ] XSS防护到位
- [ ] HTTPS配置正确
```

## 8. 维护和更新

### 8.1 版本管理
```javascript
// version.js - 版本管理

const VERSION_INFO = {
    version: '1.0.0',
    buildDate: '2024-01-20',
    features: [
        '开票管理',
        '数据展示',
        '表单处理',
        '响应式设计'
    ],
    changelog: {
        '1.0.0': [
            '初始版本发布',
            '实现基础开票管理功能',
            '添加响应式设计支持'
        ]
    }
};

// 在控制台显示版本信息
console.info(`%c开票管理系统 v${VERSION_INFO.version}`, 'color: #3b82f6; font-weight: bold; font-size: 14px;');
console.info('构建日期:', VERSION_INFO.buildDate);
console.info('功能特性:', VERSION_INFO.features);

// 导出版本信息
window.VERSION_INFO = VERSION_INFO;
```

### 8.2 监控和分析
```javascript
// analytics.js - 简单的使用统计

/**
 * 使用统计工具类
 */
class Analytics {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
    }
    
    /**
     * 记录事件
     * @param {string} action - 动作名称
     * @param {object} data - 事件数据
     */
    track(action, data = {}) {
        const event = {
            action,
            data,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        this.events.push(event);
        
        // 简单的本地存储（实际项目中应该发送到服务器）
        this.saveToLocal();
        
        console.debug('Analytics Event:', event);
    }
    
    /**
     * 保存到本地存储
     */
    saveToLocal() {
        try {
            const stored = localStorage.getItem('pms_analytics') || '[]';
            const events = JSON.parse(stored);
            events.push(...this.events);
            
            // 只保留最近1000条记录
            if (events.length > 1000) {
                events.splice(0, events.length - 1000);
            }
            
            localStorage.setItem('pms_analytics', JSON.stringify(events));
            this.events = [];
        } catch (error) {
            console.warn('Analytics save failed:', error);
        }
    }
    
    /**
     * 获取统计数据
     * @returns {object} 统计数据
     */
    getStats() {
        try {
            const stored = localStorage.getItem('pms_analytics') || '[]';
            const events = JSON.parse(stored);
            
            const stats = {
                totalEvents: events.length,
                uniquePages: [...new Set(events.map(e => e.url))].length,
                topActions: this.getTopActions(events),
                sessionDuration: Date.now() - this.sessionStart
            };
            
            return stats;
        } catch (error) {
            console.warn('Analytics stats failed:', error);
            return {};
        }
    }
    
    /**
     * 获取热门动作
     * @param {Array} events - 事件数组
     * @returns {Array} 热门动作列表
     */
    getTopActions(events) {
        const actionCounts = {};
        events.forEach(event => {
            actionCounts[event.action] = (actionCounts[event.action] || 0) + 1;
        });
        
        return Object.entries(actionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([action, count]) => ({ action, count }));
    }
}

// 创建全局分析实例
const analytics = new Analytics();

// 自动记录页面访问
analytics.track('page_view', {
    title: document.title,
    referrer: document.referrer
});

// 记录页面离开
window.addEventListener('beforeunload', () => {
    analytics.track('page_leave', {
        duration: Date.now() - analytics.sessionStart
    });
});

// 导出到全局
window.Analytics = Analytics;
window.analytics = analytics;
```

---

**开发流程总结**：

1. **项目初始化**：创建目录结构，配置开发环境
2. **编码实现**：按照规范编写HTML、CSS、JavaScript代码
3. **组件开发**：创建可复用的UI组件
4. **功能测试**：确保所有功能正常工作
5. **性能优化**：优化加载速度和用户体验
6. **兼容性测试**：确保跨浏览器兼容
7. **部署发布**：构建生产版本并部署
8. **维护更新**：持续改进和功能迭代

**质量保证**：
- 代码规范检查
- 功能完整性验证
- 性能指标监控
- 用户体验测试
- 安全性审查