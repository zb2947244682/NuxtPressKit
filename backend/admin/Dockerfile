FROM node:18-alpine

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=4000

# 暴露端口
EXPOSE 4000

# 启动应用
CMD ["npm", "start"]
