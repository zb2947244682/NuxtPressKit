const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

// 模拟用户数据，实际项目中应该从数据库获取
let users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    lastLogin: '2023-10-15T10:30:00Z'
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    status: 'inactive',
    createdAt: '2023-02-15T00:00:00Z',
    lastLogin: '2023-09-20T14:45:00Z'
  }
];

// 获取所有用户
router.get('/', authenticateToken, (req, res) => {
  // 实际项目中应该支持分页、排序和过滤
  res.json(users);
});

// 获取特定用户
router.get('/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  res.json(user);
});

// 创建用户
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 验证必填字段
    if (!username || !email || !password) {
      return res.status(400).json({ message: '用户名、邮箱和密码为必填项' });
    }
    
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
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username,
      email,
      password: hashedPassword, // 实际项目中，可能不会在响应中返回密码
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    
    // 添加到用户列表
    users.push(newUser);
    
    // 返回新用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('创建用户错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { username, email, password, status } = req.body;
    
    // 查找用户
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 检查用户名是否已被其他用户使用
    if (username && username !== users[userIndex].username && 
        users.some(u => u.username === username)) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    
    // 检查邮箱是否已被其他用户使用
    if (email && email !== users[userIndex].email && 
        users.some(u => u.email === email)) {
      return res.status(400).json({ message: '邮箱已存在' });
    }
    
    // 更新用户信息
    const updatedUser = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      email: email || users[userIndex].email,
      status: status || users[userIndex].status
    };
    
    // 如果提供了新密码，则更新密码
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }
    
    // 更新用户列表
    users[userIndex] = updatedUser;
    
    // 返回更新后的用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('更新用户错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除用户
router.delete('/:id', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.id);
  
  // 查找用户
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 删除用户
  users.splice(userIndex, 1);
  
  res.json({ message: '用户已删除' });
});

module.exports = router;
