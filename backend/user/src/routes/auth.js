const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 模拟用户数据，实际项目中应该从数据库获取
const users = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$eCc9QVpCF8YyFXFzp.HP1.0aSwKXCXF.nUGZGRIUWW7ZQGCsRyJTi', // 'password1'
    email: 'user1@example.com'
  }
];

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: '用户名或密码不正确' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用户名或密码不正确' });
    }

    // 生成JWT令牌
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // 返回令牌
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 检查用户名是否已存在
    if (users.some(u => u.username === username)) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 检查邮箱是否已存在
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: '邮箱已存在' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      email
    };

    // 添加到用户列表（实际项目中应该保存到数据库）
    users.push(newUser);

    // 生成JWT令牌
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // 返回令牌和用户信息
    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
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

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: '令牌无效或已过期' });
    }
    req.user = user;
    next();
  });
};

// 获取当前用户信息
router.get('/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email
  });
});

module.exports = router;
