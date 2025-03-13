FROM node:18-alpine

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用（开发模式）
CMD ["npm", "run", "dev"]
