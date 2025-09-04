# UI设计规范指南

## 项目概述
本文档定义了完整的UI设计规范，确保界面设计的一致性、可用性和美观性。所有设计都基于HTML+JS+TailwindCSS技术栈实现。

## 1. 设计原则

### 1.1 核心原则
- **一致性**：保持界面元素的视觉和交互一致性
- **简洁性**：界面简洁明了，避免不必要的装饰
- **易用性**：符合用户习惯，操作流程清晰
- **可访问性**：支持无障碍访问，考虑不同用户需求

### 1.2 设计目标
- 高度还原原始设计图
- 提供良好的用户体验
- 确保视觉层次清晰
- 支持响应式布局

## 2. 色彩系统

### 2.1 主色调
```css
/* 主要蓝色 */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;  /* 主色 */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
```

### 2.2 中性色
```css
/* 灰色系 */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### 2.3 状态色
```css
/* 成功 */
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-600: #16a34a;

/* 警告 */
--warning-50: #fffbeb;
--warning-500: #f59e0b;
--warning-600: #d97706;

/* 错误 */
--error-50: #fef2f2;
--error-500: #ef4444;
--error-600: #dc2626;

/* 信息 */
--info-50: #eff6ff;
--info-500: #3b82f6;
--info-600: #2563eb;
```

## 3. 字体系统

### 3.1 字体族
```css
/* 主要字体 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

/* 等宽字体 */
font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
```

### 3.2 字体大小
```css
/* 字体大小规范 */
.text-xs { font-size: 0.75rem; line-height: 1rem; }     /* 12px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-base { font-size: 1rem; line-height: 1.5rem; }   /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }  /* 20px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }    /* 24px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
```

### 3.3 字体权重
```css
.font-thin { font-weight: 100; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

## 4. 间距系统

### 4.1 间距规范
```css
/* 间距单位 */
.space-1 { margin/padding: 0.25rem; }  /* 4px */
.space-2 { margin/padding: 0.5rem; }   /* 8px */
.space-3 { margin/padding: 0.75rem; }  /* 12px */
.space-4 { margin/padding: 1rem; }     /* 16px */
.space-5 { margin/padding: 1.25rem; }  /* 20px */
.space-6 { margin/padding: 1.5rem; }   /* 24px */
.space-8 { margin/padding: 2rem; }     /* 32px */
.space-10 { margin/padding: 2.5rem; }  /* 40px */
.space-12 { margin/padding: 3rem; }    /* 48px */
```

### 4.2 布局间距
- **组件内间距**：4px, 8px, 12px
- **组件间间距**：16px, 24px, 32px
- **区块间间距**：32px, 48px, 64px
- **页面边距**：24px, 32px, 48px

## 5. 组件设计规范

### 5.1 按钮组件

#### 主要按钮
```html
<!-- 主要按钮 -->
<button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
    确认
</button>

<!-- 次要按钮 -->
<button class="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
    取消
</button>

<!-- 危险按钮 -->
<button class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200">
    删除
</button>
```

#### 按钮尺寸
```html
<!-- 小按钮 -->
<button class="px-3 py-1.5 text-xs">
<!-- 默认按钮 -->
<button class="px-4 py-2 text-sm">
<!-- 大按钮 -->
<button class="px-6 py-3 text-base">
```

### 5.2 输入框组件

```html
<!-- 基础输入框 -->
<div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
        标签名称
    </label>
    <input type="text" 
           class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
           placeholder="请输入内容">
</div>

<!-- 错误状态 -->
<div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
        标签名称
    </label>
    <input type="text" 
           class="w-full px-3 py-2 border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
           placeholder="请输入内容">
    <p class="mt-1 text-sm text-red-600">错误提示信息</p>
</div>
```

### 5.3 选择器组件

```html
<!-- 下拉选择器 -->
<div class="relative">
    <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
        <option value="">请选择</option>
        <option value="1">选项1</option>
        <option value="2">选项2</option>
    </select>
</div>
```

### 5.4 表格组件

```html
<!-- 数据表格 -->
<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    列标题
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    数据内容
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### 5.5 状态标签

```html
<!-- 状态标签 -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
    已完成
</span>

<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
    进行中
</span>

<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
    已取消
</span>

<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
    草稿
</span>
```

### 5.6 卡片组件

```html
<!-- 基础卡片 -->
<div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
        <!-- 卡片内容 -->
    </div>
</div>

<!-- 带标题的卡片 -->
<div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            卡片标题
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            卡片描述
        </p>
    </div>
    <div class="px-4 py-5 sm:p-6">
        <!-- 卡片内容 -->
    </div>
</div>
```

## 6. 布局系统

### 6.1 主布局结构

```html
<!-- 主布局容器 -->
<div class="min-h-screen bg-gray-100">
    <!-- 侧边栏 -->
    <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <!-- 侧边栏内容 -->
    </div>
    
    <!-- 主内容区 -->
    <div class="pl-64">
        <!-- 顶部导航栏 -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="px-6 py-4">
                <!-- 导航内容 -->
            </div>
        </header>
        
        <!-- 页面内容 -->
        <main class="p-6">
            <!-- 页面主要内容 -->
        </main>
    </div>
</div>
```

### 6.2 网格系统

```html
<!-- 12列网格系统 -->
<div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 md:col-span-8">
        <!-- 主要内容 -->
    </div>
    <div class="col-span-12 md:col-span-4">
        <!-- 侧边内容 -->
    </div>
</div>

<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- 网格项目 -->
</div>
```

### 6.3 Flexbox布局

```html
<!-- 水平居中 -->
<div class="flex justify-center items-center">
    <!-- 内容 -->
</div>

<!-- 两端对齐 -->
<div class="flex justify-between items-center">
    <div>左侧内容</div>
    <div>右侧内容</div>
</div>

<!-- 垂直布局 -->
<div class="flex flex-col space-y-4">
    <div>项目1</div>
    <div>项目2</div>
    <div>项目3</div>
</div>
```

## 7. 响应式设计

### 7.1 断点系统

```css
/* Tailwind CSS 断点 */
sm: 640px   /* 小屏幕 */
md: 768px   /* 中等屏幕 */
lg: 1024px  /* 大屏幕 */
xl: 1280px  /* 超大屏幕 */
2xl: 1536px /* 2K屏幕 */
```

### 7.2 响应式工具类

```html
<!-- 响应式显示/隐藏 -->
<div class="block md:hidden">移动端显示</div>
<div class="hidden md:block">桌面端显示</div>

<!-- 响应式尺寸 -->
<div class="w-full md:w-1/2 lg:w-1/3">
    <!-- 内容 -->
</div>

<!-- 响应式间距 -->
<div class="p-4 md:p-6 lg:p-8">
    <!-- 内容 -->
</div>
```

### 7.3 移动端适配

```html
<!-- 移动端导航 -->
<div class="md:hidden">
    <button class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
</div>

<!-- 移动端表格 -->
<div class="block md:hidden">
    <!-- 卡片式布局 -->
    <div class="bg-white shadow rounded-lg p-4 mb-4">
        <!-- 移动端数据展示 -->
    </div>
</div>
```

## 8. 交互设计

### 8.1 悬停效果

```html
<!-- 按钮悬停 -->
<button class="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
    按钮
</button>

<!-- 卡片悬停 -->
<div class="bg-white shadow hover:shadow-lg transition-shadow duration-200">
    <!-- 卡片内容 -->
</div>

<!-- 链接悬停 -->
<a href="#" class="text-blue-600 hover:text-blue-800 hover:underline">
    链接文本
</a>
```

### 8.2 焦点状态

```html
<!-- 输入框焦点 -->
<input class="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

<!-- 按钮焦点 -->
<button class="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    按钮
</button>
```

### 8.3 加载状态

```html
<!-- 加载按钮 -->
<button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md" disabled>
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    加载中...
</button>

<!-- 加载遮罩 -->
<div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-700">加载中...</span>
    </div>
</div>
```

## 9. 图标系统

### 9.1 图标规范
- **尺寸**：16px, 20px, 24px, 32px
- **风格**：线性图标，2px描边
- **颜色**：继承文本颜色

### 9.2 常用图标

```html
<!-- 搜索图标 -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
</svg>

<!-- 编辑图标 -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
</svg>

<!-- 删除图标 -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
</svg>
```

## 10. 无障碍访问

### 10.1 语义化标签

```html
<!-- 使用正确的语义化标签 -->
<main role="main">
    <h1>页面标题</h1>
    <nav aria-label="主导航">
        <!-- 导航内容 -->
    </nav>
    <section>
        <h2>章节标题</h2>
        <!-- 章节内容 -->
    </section>
</main>
```

### 10.2 ARIA属性

```html
<!-- 按钮状态 -->
<button aria-pressed="false" aria-label="切换菜单">
    菜单
</button>

<!-- 表单标签 -->
<label for="email">邮箱地址</label>
<input type="email" id="email" aria-describedby="email-help" required>
<div id="email-help" class="text-sm text-gray-500">
    请输入有效的邮箱地址
</div>

<!-- 模态框 -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <h2 id="modal-title">模态框标题</h2>
    <!-- 模态框内容 -->
</div>
```

### 10.3 键盘导航

```html
<!-- 可聚焦元素 -->
<div tabindex="0" role="button" onkeydown="handleKeyDown(event)">
    自定义按钮
</div>

<!-- 跳过链接 -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2">
    跳转到主要内容
</a>
```

## 11. 动画效果

### 11.1 过渡动画

```html
<!-- 基础过渡 -->
<div class="transition-all duration-200 ease-in-out">
    <!-- 内容 -->
</div>

<!-- 颜色过渡 -->
<button class="bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
    按钮
</button>

<!-- 阴影过渡 -->
<div class="shadow hover:shadow-lg transition-shadow duration-200">
    <!-- 内容 -->
</div>
```

### 11.2 加载动画

```html
<!-- 旋转动画 -->
<div class="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>

<!-- 脉冲动画 -->
<div class="animate-pulse bg-gray-300 h-4 rounded"></div>

<!-- 弹跳动画 -->
<div class="animate-bounce w-6 h-6 bg-blue-600 rounded-full"></div>
```

---

**设计检查清单**：

- [ ] 颜色对比度符合WCAG标准
- [ ] 字体大小适合阅读
- [ ] 交互元素有明确的视觉反馈
- [ ] 布局在不同屏幕尺寸下正常显示
- [ ] 所有交互元素支持键盘操作
- [ ] 图标和按钮有适当的标签
- [ ] 加载状态有明确的视觉指示
- [ ] 错误状态有清晰的提示信息