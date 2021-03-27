import { check } from '../utils/auth';

// 仅首次加载时生效，不支持动态权限
function install(Vue, options = {}) {
    Vue.directive(options.name || 'auth', {
        inserted(el, binding) {
            if (!check(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    })
}

export default { install };
