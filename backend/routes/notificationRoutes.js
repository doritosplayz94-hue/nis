const router = require('express').Router();
const { getNotifications, markRead } = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getNotifications);
router.put('/mark-read', auth, markRead);

module.exports = router;
