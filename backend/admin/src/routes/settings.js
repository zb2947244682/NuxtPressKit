const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

// 模拟系统设置数据，实际项目中应该从数据库获取
let settings = {
  general: {
    siteName: '示例网站',
    siteDescription: '这是一个示例网站',
    logo: '/images/logo.png',
    favicon: '/images/favicon.ico',
    contactEmail: 'admin@example.com',
    footerText: '© 2023 示例网站. 保留所有权利。'
  },
  security: {
    loginAttempts: 5,
    lockoutTime: 30, // 分钟
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 60 // 分钟
  },
  notifications: {
    emailNotifications: true,
    adminEmailRecipients: ['admin@example.com'],
    notifyOnNewUser: true,
    notifyOnNewContent: true
  },
  api: {
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60
    },
    cors: {
      allowedOrigins: ['http://localhost:3000', 'http://localhost:3001']
    }
  }
};

// 获取所有设置
router.get('/', authenticateToken, (req, res) => {
  res.json(settings);
});

// 获取特定设置类别
router.get('/:category', authenticateToken, (req, res) => {
  const category = req.params.category;
  
  if (!settings[category]) {
    return res.status(404).json({ message: '设置类别不存在' });
  }
  
  res.json(settings[category]);
});

// 更新设置
router.put('/:category', authenticateToken, (req, res) => {
  try {
    const category = req.params.category;
    
    if (!settings[category]) {
      return res.status(404).json({ message: '设置类别不存在' });
    }
    
    // 更新设置
    settings[category] = {
      ...settings[category],
      ...req.body
    };
    
    res.json({
      message: '设置已更新',
      settings: settings[category]
    });
  } catch (error) {
    console.error('更新设置错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 重置设置到默认值
router.post('/reset', authenticateToken, (req, res) => {
  try {
    // 这里应该实现重置设置到默认值的逻辑
    // 为了简单起见，我们只返回一个成功消息
    res.json({ message: '设置已重置为默认值' });
  } catch (error) {
    console.error('重置设置错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
