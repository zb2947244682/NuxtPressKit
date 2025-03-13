require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 导入路由
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: '用户后端API服务',
    version: '1.0.0',
    status: 'running'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`用户后端API服务运行在端口 ${PORT}`);
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});
