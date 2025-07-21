/**
 * 共用工具函数库
 * 包含系统中多个页面复用的功能：提示框、确认对话框、组件加载等
 */

// 显示提示框
function showToast(message, type = 'info') {
    // 创建提示框元素（若不存在）
    let toast = document.getElementById('commonToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'commonToast';
        toast.className = 'fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 z-50 flex items-center';
        document.body.appendChild(toast);
    }

    // 设置提示类型样式
    toast.className = toast.className.replace(/bg-\w+-\d+/g, '');
    switch(type) {
        case 'success':
            toast.classList.add('bg-green-50', 'text-green-800', 'border-l-4', 'border-green-500');
            toast.innerHTML = `<i class="fa fa-check-circle mr-2 text-green-500"></i>${message}`;
            break;
        case 'error':
            toast.classList.add('bg-red-50', 'text-red-800', 'border-l-4', 'border-red-500');
            toast.innerHTML = `<i class="fa fa-exclamation-circle mr-2 text-red-500"></i>${message}`;
            break;
        case 'warning':
            toast.classList.add('bg-yellow-50', 'text-yellow-800', 'border-l-4', 'border-yellow-500');
            toast.innerHTML = `<i class="fa fa-exclamation-triangle mr-2 text-yellow-500"></i>${message}`;
            break;
        default:
            toast.classList.add('bg-blue-50', 'text-blue-800', 'border-l-4', 'border-blue-500');
            toast.innerHTML = `<i class="fa fa-info-circle mr-2 text-blue-500"></i>${message}`;
    }

    // 显示提示框
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    }, 10);

    // 3秒后自动隐藏
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// 显示确认对话框
function showConfirmDialog(title, content, confirmCallback) {
    // 创建对话框元素（若不存在）
    let dialog = document.getElementById('commonConfirmDialog');
    if (!dialog) {
        dialog = document.createElement('div');
        dialog.id = 'commonConfirmDialog';
        dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        dialog.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-semibold mb-4" id="confirmTitle"></h3>
                <p class="text-gray-600 mb-6" id="confirmContent"></p>
                <div class="flex justify-end gap-3">
                    <button id="confirmCancel" class="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">取消</button>
                    <button id="confirmOk" class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">确认</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);

        // 绑定取消按钮事件
        document.getElementById('confirmCancel').addEventListener('click', () => {
            dialog.classList.add('hidden');
        });
    }

    // 设置对话框内容
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmContent').textContent = content;

    // 绑定确认按钮事件
    document.getElementById('confirmOk').onclick = () => {
        confirmCallback && confirmCallback();
        dialog.classList.add('hidden');
    };

    // 显示对话框
    dialog.classList.remove('hidden');
}

// 加载共用组件（如侧边栏）
function loadComponent(url, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('组件加载失败');
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            // 组件加载后初始化事件（如侧边栏激活状态）
            initComponentEvents(containerId);
        })
        .catch(err => {
            console.error(err);
            showToast('组件加载失败', 'error');
        });
}

// 初始化组件事件（如侧边栏导航激活）
function initComponentEvents(containerId) {
    if (containerId === 'sidebar-container') {
        // 高亮当前页面导航
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('#sidebar-container a');
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentPath)) {
                link.classList.add('bg-primary/10', 'text-primary', 'border-l-4', 'border-primary');
                link.classList.remove('text-gray-700', 'hover:bg-primary/5');
            }
        });
    }
}

// 初始化时间显示（北京时区）
function initDateTimeDisplay() {
    function updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'
        };
        const timeEl = document.getElementById('currentTime');
        const yearEl = document.getElementById('currentYear');
        
        if (timeEl) timeEl.textContent = now.toLocaleString('zh-CN', options);
        if (yearEl) yearEl.textContent = now.getFullYear();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// 页面加载完成后初始化通用功能
document.addEventListener('DOMContentLoaded', () => {
    initDateTimeDisplay();
});