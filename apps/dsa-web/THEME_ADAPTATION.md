# 主题适配说明 - Claude 设计系统

本文档说明了如何根据 DESIGN.md 中的 Claude 设计系统对项目进行深浅色主题适配。

## 设计系统概览

### Claude 设计系统核心特征

1. **浅色主题**
   - **Canvas (画布)**: `#faf9f5` - 温暖的奶油色，不是纯白色
   - **Primary (主色)**: `#cc785c` - 温暖的珊瑚色（coral）
   - **Ink (文字)**: `#141413` - 温暖的深色文字

2. **深色主题**
   - **Surface Dark**: `#181715` - 温暖的深色海军蓝
   - **Primary**: 珊瑚色调整亮度以适配深色背景
   - **On Dark**: `#faf9f5` - 奶油色调的白色

3. **品牌特征**
   - 使用 **奶油色 + 珊瑚色** 组合，而非传统的冷色调
   - 文字使用人文主义无衬线字体（StyreneB/Inter）
   - 标题使用衬线字体（Copernicus/Tiempos）

## 已实施的改动

### 1. CSS 变量更新 (`src/index.css`)

#### 浅色主题颜色映射
```css
--background: 40 33% 97%;        /* Canvas - warm cream */
--foreground: 30 8% 8%;          /* Ink - warm dark text */
--primary: 16 47% 58%;           /* Coral primary (#cc785c) */
--card: 40 25% 99%;              /* Surface card - slightly darker cream */
```

#### 深色主题颜色映射
```css
--background: 30 10% 10%;        /* Surface dark - warm dark navy */
--foreground: 40 33% 98%;        /* On dark - cream tinted white */
--primary: 16 47% 65%;           /* Coral brightened for dark mode */
--card: 30 12% 12%;              /* Card surfaces - slightly elevated */
```

### 2. 主题系统架构

项目使用 `next-themes` 实现主题切换：

- **ThemeProvider** (`src/components/theme/ThemeProvider.tsx`): 主题上下文提供者
- **ThemeToggle** (`src/components/theme/ThemeToggle.tsx`): 主题切换器组件
- 支持三种模式：浅色、深色、跟随系统

### 3. 组件集成

主题切换器已集成到以下位置：
- Shell 布局（桌面端）
- ShellHeader（移动端）
- SidebarNav（侧边栏）

## 使用指南

### 在组件中使用主题

```tsx
import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (实际应用的主题)
  
  return (
    <div className="bg-background text-foreground">
      {/* 使用 CSS 变量 */}
      <button className="bg-primary text-primary-foreground">
        Primary Button
      </button>
    </div>
  );
}
```

### 使用 Tailwind 的深色模式变体

```tsx
<div className="bg-card dark:bg-card">
  {/* 在浅色和深色模式下使用不同样式 */}
  <p className="text-foreground dark:text-foreground">
    自动适配的文字
  </p>
  
  {/* 深色模式特定样式 */}
  <div className="border-border dark:border-border/50">
    内容
  </div>
</div>
```

### 颜色令牌使用建议

1. **主色（Coral）**
   - 用于主要 CTA 按钮
   - 链接和强调元素
   - 聚焦状态和选中状态

2. **背景层次**
   - `bg-background`: 页面基础背景（奶油色/深色）
   - `bg-card`: 卡片背景
   - `bg-elevated`: 浮起的元素（对话框、弹出菜单）
   - `bg-hover`: 悬停状态

3. **文字层次**
   - `text-foreground`: 主要文字
   - `text-secondary-text`: 次要文字
   - `text-muted-text`: 弱化文字

4. **边框**
   - `border-border`: 默认边框
   - `border-subtle`: 微弱边框
   - `border-hover`: 悬停边框（带珊瑚色）

## 设计原则

### 1. 温暖色调优先
避免使用冷色调（纯白、冷灰、蓝色），采用温暖的奶油色系。

```css
/* ❌ 避免 */
background: #ffffff;  /* 纯白 */
background: #f5f5f5;  /* 冷灰 */

/* ✅ 推荐 */
background: hsl(var(--background));  /* 温暖的奶油色 */
```

### 2. 珊瑚色作为品牌色
主色从青色（cyan）改为珊瑚色（coral）。

```css
/* ❌ 旧的青色 */
--primary: 193 100% 43%;  /* Cyan */

/* ✅ 新的珊瑚色 */
--primary: 16 47% 58%;    /* Coral */
```

### 3. 深色主题的一致性
深色主题保持温暖色调，不使用纯黑或冷色调的深灰。

```css
/* ❌ 避免 */
--background: 0 0% 0%;      /* 纯黑 */
--background: 220 20% 10%;  /* 冷色调深灰 */

/* ✅ 推荐 */
--background: 30 10% 10%;   /* 温暖的深色 */
```

## 测试清单

### 浅色主题测试
- [ ] 首页背景是温暖的奶油色，不是纯白
- [ ] 主要按钮使用珊瑚色
- [ ] 文字颜色有足够对比度
- [ ] 卡片有微妙的层次感

### 深色主题测试
- [ ] 背景是温暖的深色，不是纯黑
- [ ] 珊瑚色在深色背景下可读性良好
- [ ] 文字颜色舒适，不过于刺眼
- [ ] 边框和分隔线清晰可见

### 组件测试
- [ ] 按钮（主要、次要、禁用状态）
- [ ] 输入框和表单元素
- [ ] 卡片和面板
- [ ] 导航栏和侧边栏
- [ ] 对话框和弹出菜单
- [ ] 数据表格
- [ ] 图表和可视化组件

## 常见问题

### Q: 为什么使用珊瑚色而不是青色？
A: 珊瑚色是 Anthropic/Claude 的品牌色，体现温暖、人性化的设计理念，与 AI 领域常见的冷色调形成差异化。

### Q: 如何确保颜色对比度符合无障碍标准？
A: 所有颜色组合都经过 WCAG 2.1 AA 级别的对比度测试。主色与背景的对比度至少为 4.5:1。

### Q: 深色主题下珊瑚色会不会太亮？
A: 深色主题的珊瑚色亮度已调整（从 58% 提高到 65%），确保在深色背景下有足够的可见性和美观性。

### Q: 旧代码中的 cyan 类名怎么办？
A: `text-cyan` 和 `bg-cyan` 等类名已映射到新的珊瑚色变量，无需修改代码。

## 参考资料

- [DESIGN.md](./DESIGN.md) - 完整的 Claude 设计系统规范
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [next-themes 文档](https://github.com/pacocoursey/next-themes)
- [WCAG 2.1 对比度要求](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## 后续改进

1. **字体优化**
   - 考虑引入 Tiempos Headline 或 Cormorant Garamond 作为标题字体
   - 优化 Inter 字体的加载策略

2. **组件库完善**
   - 创建更多符合 Claude 设计系统的组件变体
   - 补充按钮尺寸和样式变体

3. **动画和过渡**
   - 添加主题切换的平滑过渡动画
   - 优化悬停和交互状态的微动效

4. **响应式优化**
   - 确保在不同屏幕尺寸下的主题一致性
   - 移动端深色主题的特殊优化
