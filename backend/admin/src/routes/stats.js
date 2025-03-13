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

// 模拟统计数据，实际项目中应该从数据库获取
const generateMockData = () => {
  // 生成过去30天的日期
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });
  
  // 生成随机访问量数据
  const visits = dates.map(() => Math.floor(Math.random() * 1000) + 100);
  
  // 生成随机注册用户数据
  const registrations = dates.map(() => Math.floor(Math.random() * 20));
  
  // 生成随机内容创建数据
  const contentCreated = dates.map(() => Math.floor(Math.random() * 10));
  
  return {
    dates,
    visits,
    registrations,
    contentCreated
  };
};

// 获取仪表盘概览数据
router.get('/dashboard', authenticateToken, (req, res) => {
  try {
    // 模拟数据
    const totalUsers = 1250;
    const activeUsers = 850;
    const totalContent = 320;
    const publishedContent = 280;
    
    // 获取今日数据
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const todayVisits = Math.floor(Math.random() * 500) + 100;
    const todayRegistrations = Math.floor(Math.random() * 10);
    const todayContentCreated = Math.floor(Math.random() * 5);
    
    res.json({
      summary: {
        totalUsers,
        activeUsers,
        totalContent,
        publishedContent,
        userGrowthRate: ((totalUsers / 1000) - 1) * 100, // 假设上个月有1000个用户
        contentGrowthRate: ((totalContent / 250) - 1) * 100 // 假设上个月有250个内容
      },
      today: {
        date: todayFormatted,
        visits: todayVisits,
        registrations: todayRegistrations,
        contentCreated: todayContentCreated
      },
      trends: generateMockData()
    });
  } catch (error) {
    console.error('获取仪表盘数据错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取用户统计数据
router.get('/users', authenticateToken, (req, res) => {
  try {
    // 模拟数据
    const userStats = {
      total: 1250,
      active: 850,
      inactive: 400,
      newThisMonth: 120,
      byRole: {
        admin: 5,
        editor: 15,
        user: 1230
      },
      byStatus: {
        active: 850,
        inactive: 350,
        suspended: 50
      },
      registrationTrend: generateMockData().registrations
    };
    
    res.json(userStats);
  } catch (error) {
    console.error('获取用户统计数据错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取内容统计数据
router.get('/content', authenticateToken, (req, res) => {
  try {
    // 模拟数据
    const contentStats = {
      total: 320,
      published: 280,
      draft: 40,
      newThisMonth: 45,
      byCategory: {
        '新闻': 120,
        '公告': 80,
        '教程': 70,
        '其他': 50
      },
      byStatus: {
        published: 280,
        draft: 40
      },
      creationTrend: generateMockData().contentCreated
    };
    
    res.json(contentStats);
  } catch (error) {
    console.error('获取内容统计数据错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取访问统计数据
router.get('/visits', authenticateToken, (req, res) => {
  try {
    const mockData = generateMockData();
    
    // 模拟数据
    const visitStats = {
      total: mockData.visits.reduce((sum, visits) => sum + visits, 0),
      average: Math.floor(mockData.visits.reduce((sum, visits) => sum + visits, 0) / mockData.visits.length),
      peak: Math.max(...mockData.visits),
      byDate: {
        dates: mockData.dates,
        visits: mockData.visits
      },
      byPage: {
        '/': 35,
        '/login': 20,
        '/register': 15,
        '/profile': 10,
        '/content': 20
      }
    };
    
    res.json(visitStats);
  } catch (error) {
    console.error('获取访问统计数据错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
