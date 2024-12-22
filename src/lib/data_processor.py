from datetime import datetime, timedelta
from typing import Dict, List, Any
import pandas as pd
import numpy as np

class SoulrDataProcessor:
    def __init__(self):
        self.behavior_weights = {
            'content_consumption': {
                'educational_content': 0.8,
                'entertainment': 0.3,
                'social_media': 0.2
            },
            'activity_patterns': {
                'creative_time': 0.9,
                'exercise_time': 0.8,
                'mindfulness_time': 0.7
            },
            'social_interaction': {
                'meaningful_conversations': 0.9,
                'surface_level_interactions': 0.3
            }
        }

    async def process_platform_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Processes raw platform data into meaningful behavioral insights.
        This runs automatically when new data comes in.
        """
        processed_data = {
            'behavior_patterns': self._analyze_behavior_patterns(raw_data),
            'content_preferences': self._analyze_content_preferences(raw_data),
            'interaction_patterns': self._analyze_interaction_patterns(raw_data),
            'wellness_indicators': self._analyze_wellness_indicators(raw_data)
        }
        
        return processed_data

    def _analyze_behavior_patterns(self, data: Dict[str, Any]) -> Dict[str, float]:
        """
        Analyzes user behavior patterns to identify potential archetype indicators.
        This helps determine if someone is showing Zombie, Robot, etc. traits.
        """
        patterns = {
            'screen_time_ratio': self._calculate_screen_time_ratio(data),
            'activity_balance': self._calculate_activity_balance(data),
            'social_engagement': self._calculate_social_engagement(data)
        }
        
        return patterns

    def _analyze_content_preferences(self, data: Dict[str, Any]) -> Dict[str, float]:
        """
        Analyzes what kind of content the user engages with most.
        This helps understand their interests and values.
        """
        # Calculate percentages of different content types
        total_content = sum(data.get('content_consumption', {}).values())
        
        if total_content == 0:
            return {}
            
        return {
            content_type: (hours / total_content) * 100
            for content_type, hours in data.get('content_consumption', {}).items()
        }

    def calculate_humanity_score(self, processed_data: Dict[str, Any]) -> float:
        """
        Calculates the humanity score based on processed behavioral data.
        This score evolves as new data comes in.
        """
        score = 50.0  # Start at neutral
        
        # Apply weighted factors
        for category, weights in self.behavior_weights.items():
            if category in processed_data:
                category_data = processed_data[category]
                for metric, weight in weights.items():
                    if metric in category_data:
                        score += category_data[metric] * weight
        
        # Ensure score stays within 0-100
        return max(0, min(100, score))

    def determine_archetype(self, processed_data: Dict[str, Any], 
                          humanity_score: float) -> str:
        """
        Determines the user's current archetype based on their behavior patterns.
        This classification can change as behavior patterns change.
        """
        # Extract key indicators
        screen_time = processed_data['behavior_patterns']['screen_time_ratio']
        social_engagement = processed_data['behavior_patterns']['social_engagement']
        activity_balance = processed_data['behavior_patterns']['activity_balance']
        
        # Determine archetype based on patterns
        if screen_time > 0.7 and social_engagement < 0.3:
            return "ZOMBIE"
        elif activity_balance > 0.8 and social_engagement < 0.4:
            return "ROBOT"
        elif social_engagement > 0.7 and activity_balance < 0.3:
            return "PLASTIC"
        elif humanity_score > 75:
            return "HUMAN"
        
        # Default to most concerning archetype if patterns are unclear
        return "ZOMBIE"