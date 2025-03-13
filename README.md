# 企业级应用架构

这是一个基于现代技术栈的企业级应用架构，包含前端、后端、数据库和各种中间件服务。

## 项目结构

```
.
├── nginx/                  # Nginx反向代理配置
│   └── conf.d/             # Nginx配置文件
├── frontend/               # 前端应用
│   ├── user/               # 用户前端 (Nuxt 3)
│   └── admin/              # 管理员前端 (Nuxt 3)
├── backend/                # 后端服务
│   ├── user/               # 用户后端 (Express)
│   └── admin/              # 管理员后端 (Express)
├── database/               # PostgreSQL数据库配置
│   └── init/               # 数据库初始化脚本
├── cache/                  # Redis缓存配置
├── message-queue/          # RabbitMQ消息队列配置
├── search/                 # Elasticsearch全文搜索配置
├── api-gateway/            # Kong/Tyk API网关配置
├── ci-cd/                  # Jenkins/GitLab CI/CD配置
├── cron-jobs/              # 定时任务配置
├── config-management/      # 配置管理
├── logging/                # 日志服务配置
└── docker-compose.yml      # Docker Compose配置文件
```

## 技术栈

- **前端**：Nuxt 3 (Vue 3 + TypeScript)
- **后端**：Express (Node.js)
- **数据库**：PostgreSQL
- **缓存**：Redis
- **消息队列**：RabbitMQ
- **搜索引擎**：Elasticsearch
- **API网关**：Kong/Tyk
- **容器化**：Docker + Docker Compose

## 快速开始

### 前提条件

- Docker 和 Docker Compose
- Node.js 18+
- npm 或 yarn

### 安装和运行

1. 克隆仓库：

```bash
git clone <repository-url>
cd <repository-directory>
```

2. 启动所有服务：

```bash
docker-compose up -d
```

3. 访问应用：

- 用户前端：http://localhost:80
- 管理员前端：http://localhost:80/admin
- 用户API：http://localhost:80/api/user
- 管理员API：http://localhost:80/api/admin

### 开发模式

如果你想在开发模式下运行前端应用：

```bash
# 用户前端
cd frontend/user
npm install
npm run dev

# 管理员前端
cd frontend/admin
npm install
npm run dev
```

如果你想在开发模式下运行后端服务：

```bash
# 用户后端
cd backend/user
npm install
npm run dev

# 管理员后端
cd backend/admin
npm install
npm run dev
```

## 部署

项目使用Docker Compose进行部署，可以轻松部署到任何支持Docker的环境中。

```bash
# 构建并启动所有服务
docker-compose up -d --build

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

## 扩展

该架构设计为可扩展的，你可以根据需要添加更多的服务或中间件。

## 许可证

[MIT](LICENSE)
