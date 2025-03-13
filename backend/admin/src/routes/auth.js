const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 模拟管理员数据，实际项目中应该从数据库获取
const admins = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$eCc9QVpCF8YyFXFzp.HP1.0aSwKXCXF.nUGZGRIUWW7ZQGCsRyJTi', // 'password1'
    email: 'admin@example.com',
    role: 'admin'
  }
];

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找管理员
    const admin = admins.find(a => a.username === username);
    if (!admin) {
      return res.status(401).json({ message: '用户名或密码不正确' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用户名或密码不正确' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // 返回令牌
    res.json({
      message: '登录成功',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 验证令牌中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, admin) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    
    // 检查是否是管理员
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: '没有管理员权限' });
    }
    
    req.admin = admin;
    next();
  });
};

// 获取当前管理员信息
router.get('/me', authenticateToken, (req, res) => {
  const admin = admins.find(a => a.id === req.admin.id);
  if (!admin) {
    return res.status(404).json({ message: '管理员不存在' });
  }

  res.json({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role
  });
});

module.exports = router;
