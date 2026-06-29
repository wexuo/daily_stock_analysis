# -*- coding: utf-8 -*-
"""
===================================
命令处理器模块
===================================

包含所有机器人命令的实现。
"""

from daily_stock_analysis.bot.commands.base import BotCommand
from daily_stock_analysis.bot.commands.help import HelpCommand
from daily_stock_analysis.bot.commands.status import StatusCommand
from daily_stock_analysis.bot.commands.analyze import AnalyzeCommand
from daily_stock_analysis.bot.commands.market import MarketCommand
from daily_stock_analysis.bot.commands.batch import BatchCommand
from daily_stock_analysis.bot.commands.ask import AskCommand
from daily_stock_analysis.bot.commands.chat import ChatCommand
from daily_stock_analysis.bot.commands.research import ResearchCommand
from daily_stock_analysis.bot.commands.strategies import StrategiesCommand
from daily_stock_analysis.bot.commands.history import HistoryCommand

# All available commands (for auto-registration)
ALL_COMMANDS = [
    HelpCommand,
    StatusCommand,
    AnalyzeCommand,
    MarketCommand,
    BatchCommand,
    AskCommand,
    ChatCommand,
    ResearchCommand,
    StrategiesCommand,
    HistoryCommand,
]

__all__ = [
    'BotCommand',
    'HelpCommand',
    'StatusCommand',
    'AnalyzeCommand',
    'MarketCommand',
    'BatchCommand',
    'AskCommand',
    'ChatCommand',
    'ResearchCommand',
    'StrategiesCommand',
    'HistoryCommand',
    'ALL_COMMANDS',
]
