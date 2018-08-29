import tinymce from './tinymce'

// 组件集合
const commonComponents = {
  // tinymce
}

// 插件安装方法
const install = function (Vue) {
  for (let index in commonComponents) {
    commonComponents[index].install && commonComponents[index].install(Vue)
  }
}

// 挂载插件安装方法
commonComponents.install = install

/* 导出组件 */

// 默认整体抛出
export default commonComponents

// 分组件抛出
export {
  tinymce
}

// 将整体作为一项抛出
export const components = {
  install
}
