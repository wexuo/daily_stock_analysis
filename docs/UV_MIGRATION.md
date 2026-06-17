# UV Migration Guide

本项目已迁移至使用 [uv](https://github.com/astral-sh/uv) 作为包管理工具。

## 安装 uv

```bash
# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# 使用 pip
pip install uv

# 使用 pipx
pipx install uv
```

## 项目设置

### 1. 初始化项目并安装依赖

```bash
# 同步依赖（会自动创建虚拟环境）
uv sync

# 仅安装生产依赖（不含开发工具）
uv sync --no-dev

# 安装可选依赖组
uv sync --extra dev
```

### 2. 运行项目

```bash
# 运行主程序
uv run python main.py

# 运行 API 服务器
uv run python server.py

# 运行 Web UI
uv run python webui.py

# 使用 project.scripts 定义的命令
uv run daily-stock
uv run stock-server
uv run stock-webui
```

### 3. 管理依赖

```bash
# 添加新依赖
uv add package-name

# 添加开发依赖
uv add --dev pytest

# 添加特定版本
uv add "requests>=2.31.0"

# 添加 git 依赖
uv add "git+https://github.com/user/repo.git@branch"

# 移除依赖
uv remove package-name

# 更新依赖
uv lock --upgrade-package package-name

# 更新所有依赖
uv lock --upgrade
```

### 4. Python 版本管理

```bash
# 查看可用的 Python 版本
uv python list

# 安装特定 Python 版本
uv python install 3.11

# 为项目设置 Python 版本
uv python pin 3.11

# 使用特定 Python 版本运行
uv run --python 3.11 python main.py
```

### 5. 开发工具

```bash
# 运行测试
uv run pytest

# 代码格式化
uv run black .
uv run isort .

# 代码检查
uv run flake8
uv run mypy .

# 安全扫描
uv run bandit -r src/
```

## 迁移说明

### 变更内容

1. **依赖管理**
   - 从 `requirements.txt` 迁移到 `pyproject.toml` 的 `[project.dependencies]`
   - 开发工具依赖移至 `[tool.uv.dev-dependencies]`
   - 可选依赖组定义在 `[project.optional-dependencies]`

2. **配置整合**
   - `setup.cfg` 配置合并到 `pyproject.toml`
   - 工具配置统一在 `[tool.*]` 部分

3. **项目元数据**
   - 添加了项目名称、版本、描述等标准元数据
   - 定义了项目入口点（scripts）

### 与 pip/venv 对比

| 操作 | pip/venv | uv |
|------|----------|-----|
| 创建虚拟环境 | `python -m venv .venv` | 自动创建 |
| 激活虚拟环境 | `source .venv/bin/activate` | 不需要（uv run） |
| 安装依赖 | `pip install -r requirements.txt` | `uv sync` |
| 添加包 | `pip install package && pip freeze` | `uv add package` |
| 运行脚本 | `python script.py` | `uv run python script.py` |

### 优势

- **更快**: 比 pip 快 10-100 倍
- **统一**: 一个工具管理 Python 版本、虚拟环境和依赖
- **确定性**: 自动生成 `uv.lock` 确保可重现的构建
- **简单**: 无需手动管理虚拟环境激活/停用

## CI/CD 集成

### GitHub Actions

```yaml
- name: Set up uv
  uses: astral-sh/setup-uv@v4
  with:
    version: "latest"

- name: Install dependencies
  run: uv sync

- name: Run tests
  run: uv run pytest
```

### Docker

```dockerfile
FROM python:3.11-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy project files
COPY . /app
WORKDIR /app

# Install dependencies
RUN uv sync --frozen --no-dev

# Run application
CMD ["uv", "run", "python", "main.py"]
```

## 故障排除

### 问题：找不到模块

确保使用 `uv run` 执行命令，或手动激活虚拟环境：

```bash
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate     # Windows
```

### 问题：依赖冲突

查看详细错误信息并更新锁文件：

```bash
uv lock --verbose
```

### 问题：需要特定 Python 版本

项目要求 Python >= 3.10，确保使用正确版本：

```bash
uv python pin 3.11
uv sync
```

## 参考资料

- [uv 官方文档](https://docs.astral.sh/uv/)
- [uv GitHub](https://github.com/astral-sh/uv)
- [pyproject.toml 规范](https://packaging.python.org/en/latest/specifications/pyproject-toml/)
