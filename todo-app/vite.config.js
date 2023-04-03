import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from "vite-plugin-html"
import vue from '@vitejs/plugin-vue';
import path from "path";
// 为了在html中使用env变量
 // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
const getViteEnv = (mode,target) =>{
  return loadEnv(mode,process.cwd())[target];
}
//const env = loadEnv(mode, process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig( ({ command, mode}) => {
  return  {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: getViteEnv(mode,"VITE_APP_TITLE"), //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
          }
        }
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname,"./src"),
      }
    }
  
  }  
})
