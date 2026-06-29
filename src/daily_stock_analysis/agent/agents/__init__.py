# -*- coding: utf-8 -*-
"""
Specialised agents for the multi-agent pipeline.

Each agent class inherits from :class:`BaseAgent` and implements
a focused analysis scope (technical, intelligence, decision, risk).
"""

from daily_stock_analysis.agent.agents.base_agent import BaseAgent
from daily_stock_analysis.agent.agents.technical_agent import TechnicalAgent
from daily_stock_analysis.agent.agents.intel_agent import IntelAgent
from daily_stock_analysis.agent.agents.decision_agent import DecisionAgent
from daily_stock_analysis.agent.agents.risk_agent import RiskAgent
from daily_stock_analysis.agent.agents.portfolio_agent import PortfolioAgent

__all__ = [
    "BaseAgent",
    "TechnicalAgent",
    "IntelAgent",
    "DecisionAgent",
    "RiskAgent",
    "PortfolioAgent",
]
