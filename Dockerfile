# 使用 Node.js 作为基础镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余的应用代码
COPY . .

# 构建 React 应用
RUN npm run build

# 使用 Nginx 作为生产环境服务器
FROM nginx:alpine

# 将构建好的文件复制到 Nginx 的默认目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80
