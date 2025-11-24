import { Dish } from '../types';

export const MASTER_MENU: Dish[] = [
  // --- 早餐/小吃 (Breakfast/Snacks) ---
  { id: 'cn_1', name: '煎饼果子', emoji: '🌯', description: '加上薄脆和火腿，绝了！', calories: '400 kcal' },
  { id: 'cn_2', name: '肉夹馍', emoji: '🥙', description: '肥瘦相间，满口留香', calories: '500 kcal' },
  { id: 'cn_3', name: '小笼包', emoji: '🥟', description: '皮薄馅大，汤汁鲜美', calories: '350 kcal' },
  { id: 'cn_4', name: '生煎包', emoji: '🥟', description: '底脆皮软，芝麻葱香', calories: '450 kcal' },
  { id: 'cn_5', name: '油条豆浆', emoji: '🥛', description: '经典搭配，唤醒早晨', calories: '400 kcal' },
  { id: 'cn_6', name: '兰州拉面', emoji: '🍜', description: '一清二白三红四绿', calories: '550 kcal' },
  { id: 'cn_7', name: '热干面', emoji: '🍜', description: '芝麻酱香浓郁扑鼻', calories: '600 kcal' },
  { id: 'cn_8', name: '酸辣粉', emoji: '🍜', description: '酸酸辣辣，嗦粉快乐', calories: '450 kcal' },
  { id: 'cn_9', name: '螺蛳粉', emoji: '🍜', description: '闻着臭，吃着香！', calories: '500 kcal' },
  { id: 'cn_10', name: '凉皮', emoji: '🥗', description: '红油蒜水，清爽开胃', calories: '350 kcal' },
  { id: 'cn_11', name: '臭豆腐', emoji: '⬛', description: '外焦里嫩，鲜辣多汁', calories: '300 kcal' },
  { id: 'cn_12', name: '烤冷面', emoji: '🌭', description: '街头霸主，酸甜可口', calories: '450 kcal' },
  { id: 'cn_13', name: '章鱼小丸子', emoji: '🍡', description: '木鱼花飞舞，外脆里糯', calories: '400 kcal' },
  { id: 'cn_14', name: '鸡蛋灌饼', emoji: '🌯', description: '刷上甜面酱，香！', calories: '450 kcal' },
  { id: 'cn_15', name: '炒凉粉', emoji: '🥘', description: '软糯咸香，入口即化', calories: '350 kcal' },
  { id: 'cn_16', name: '锅盔', emoji: '🫓', description: '又酥又脆，越嚼越香', calories: '300 kcal' },
  { id: 'cn_17', name: '肠粉', emoji: '🌯', description: '晶莹剔透，豉油提鲜', calories: '300 kcal' },
  { id: 'cn_18', name: '云吞面', emoji: '🍜', description: '弹牙竹升面，鲜虾云吞', calories: '450 kcal' },
  { id: 'cn_19', name: '鸭血粉丝汤', emoji: '🍲', description: '汤鲜味美，料足过瘾', calories: '350 kcal' },
  { id: 'cn_20', name: '葱油拌面', emoji: '🍜', description: '葱香浓郁，简单美味', calories: '450 kcal' },

  // --- 正餐/硬菜 (Main Dishes) ---
  { id: 'cn_21', name: '麻婆豆腐', emoji: '🥘', description: '麻辣鲜香，下饭神器', calories: '400 kcal' },
  { id: 'cn_22', name: '宫保鸡丁', emoji: '🍗', description: '酸甜微辣，经典川菜', calories: '500 kcal' },
  { id: 'cn_23', name: '鱼香肉丝', emoji: '🥘', description: '没有鱼，但有鱼香', calories: '550 kcal' },
  { id: 'cn_24', name: '回锅肉', emoji: '🥓', description: '灯盏窝，蒜苗香', calories: '700 kcal' },
  { id: 'cn_25', name: '糖醋排骨', emoji: '🍖', description: '酸酸甜甜，色泽红亮', calories: '650 kcal' },
  { id: 'cn_26', name: '红烧肉', emoji: '🍖', description: '肥而不腻，入口即化', calories: '800 kcal' },
  { id: 'cn_27', name: '水煮鱼', emoji: '🐟', description: '热油激香，滑嫩鲜辣', calories: '700 kcal' },
  { id: 'cn_28', name: '酸菜鱼', emoji: '🐟', description: '酸爽开胃，鱼片嫩滑', calories: '600 kcal' },
  { id: 'cn_29', name: '辣子鸡', emoji: '🌶️', description: '辣椒里找鸡肉，香脆', calories: '700 kcal' },
  { id: 'cn_30', name: '北京烤鸭', emoji: '🦆', description: '皮脆肉嫩，荷叶饼卷', calories: '600 kcal' },
  { id: 'cn_31', name: '口水鸡', emoji: '🍗', description: '集麻辣鲜香嫩爽于一身', calories: '500 kcal' },
  { id: 'cn_32', name: '东坡肉', emoji: '🍖', description: '慢火少水，功夫硬菜', calories: '850 kcal' },
  { id: 'cn_33', name: '番茄炒蛋', emoji: '🍅', description: '国民第一菜，拌饭绝配', calories: '300 kcal' },
  { id: 'cn_34', name: '地三鲜', emoji: '🥔', description: '土豆茄子青椒，素菜之王', calories: '500 kcal' },
  { id: 'cn_35', name: '锅包肉', emoji: '🍖', description: '酸甜酥脆，东北之光', calories: '750 kcal' },
  { id: 'cn_36', name: '西红柿炖牛腩', emoji: '🥘', description: '汤浓肉烂，营养丰富', calories: '600 kcal' },
  { id: 'cn_37', name: '黄焖鸡米饭', emoji: '🍛', description: '街头霸主，汤汁浓郁', calories: '700 kcal' },
  { id: 'cn_38', name: '烤鱼', emoji: '🐟', description: '外焦里嫩，配菜丰富', calories: '800 kcal' },
  { id: 'cn_39', name: '麻辣香锅', emoji: '🍲', description: '万物皆可锅，想吃啥加啥', calories: '900 kcal' },
  { id: 'cn_40', name: '新疆大盘鸡', emoji: '🍗', description: '鸡肉软烂，裤带面劲道', calories: '850 kcal' },
  { id: 'cn_41', name: '剁椒鱼头', emoji: '🐟', description: '火辣鲜香，面条拌汤', calories: '600 kcal' },
  { id: 'cn_42', name: '小炒黄牛肉', emoji: '🥩', description: '香菜芹菜小米辣，够劲', calories: '600 kcal' },
  { id: 'cn_43', name: '白切鸡', emoji: '🐔', description: '皮黄肉白，原汁原味', calories: '450 kcal' },
  { id: 'cn_44', name: '红烧狮子头', emoji: '🧆', description: '肉香四溢，口感松软', calories: '700 kcal' },
  { id: 'cn_45', name: '毛血旺', emoji: '🥘', description: '麻辣诱惑，食材丰富', calories: '800 kcal' },

  // --- 特色/宵夜 (Special/Night Snack) ---
  { id: 'cn_46', name: '羊肉串', emoji: '🍢', description: '孜然辣椒，炭火焦香', calories: '500 kcal' },
  { id: 'cn_47', name: '小龙虾', emoji: '🦞', description: '麻辣/十三香/蒜蓉', calories: '400 kcal' },
  { id: 'cn_48', name: '冒菜', emoji: '🍲', description: '一个人的火锅', calories: '600 kcal' },
  { id: 'cn_49', name: '串串香', emoji: '🍢', description: '数签签的快乐', calories: '700 kcal' },
  { id: 'cn_50', name: '潮汕牛肉火锅', emoji: '🥩', description: '鲜切牛肉，沙茶酱', calories: '600 kcal' },
  { id: 'cn_51', name: '猪脚饭', emoji: '🍚', description: '软糯Q弹，胶原蛋白', calories: '750 kcal' },
  { id: 'cn_52', name: '卤肉饭', emoji: '🍛', description: '肉燥香浓，卤蛋入味', calories: '650 kcal' },
  { id: 'cn_53', name: '扬州炒饭', emoji: '🍚', description: '粒粒分明，色彩丰富', calories: '550 kcal' },
  { id: 'cn_54', name: '海南鸡饭', emoji: '🍗', description: '鸡油饭香，蘸料灵魂', calories: '600 kcal' },
  { id: 'cn_55', name: '煲仔饭', emoji: '🥘', description: '锅巴酥脆，腊味飘香', calories: '700 kcal' },
  { id: 'cn_56', name: '驴肉火烧', emoji: '🥙', description: '天上龙肉，地下驴肉', calories: '550 kcal' },
  { id: 'cn_57', name: 'BiangBiang面', emoji: '🍜', description: '面宽像裤带，油泼辣子', calories: '650 kcal' },
  { id: 'cn_58', name: '酸汤肥牛', emoji: '🍲', description: '金汤酸爽，肥牛嫩滑', calories: '700 kcal' },
  { id: 'cn_59', name: '炸酱面', emoji: '🍜', description: '菜码丰富，酱香浓郁', calories: '550 kcal' },
  { id: 'cn_60', name: '沙县小吃', emoji: '🥟', description: '扁肉拌面，国民套餐', calories: '450 kcal' },
];

export const getRandomMenu = (count: number = 8): Dish[] => {
  const shuffled = [...MASTER_MENU].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};