# -*- coding: utf-8 -*-
"""
Compatibility re-exports for the legacy strategy namespace.

Provides:
- :class:`StrategyAgent` — legacy alias of :class:`SkillAgent`
- :class:`StrategyRouter` — legacy alias of :class:`SkillRouter`
- :class:`StrategyAggregator` — legacy alias of :class:`SkillAggregator`
"""

from daily_stock_analysis.agent.strategies.strategy_agent import StrategyAgent
from daily_stock_analysis.agent.strategies.router import StrategyRouter
from daily_stock_analysis.agent.strategies.aggregator import StrategyAggregator

__all__ = [
    "StrategyAgent",
    "StrategyRouter",
    "StrategyAggregator",
]
