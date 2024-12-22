# This file handles interaction with GPT-4 for generating insights
import anthropic
from typing import Dict, List
from .user_behavior import UserBehavior

class OnyxAssistant:
    def __init__(self, api_key: str):
        """Initialize Onyx with Claude API key"""
        self.client = anthropic.Anthropic(api_key=api_key)

    async def generate_insights(self, behavior: UserBehavior, score: float) -> Dict[str, List[str]]:
        """
        Generate personalized insights using Claude
        Returns dictionary with insights and recommendations
        """
        prompt = f"""
        Based on the following user data:
        - Daily screen time: {behavior.daily_screen_time} hours
        - Social interactions: {behavior.social_interactions}
        - Exercise time: {behavior.exercise_time} hours
        - Current humanity score: {score}

        Provide:
        1. Three specific insights about their current lifestyle
        2. Three actionable recommendations to improve their humanity score
        Keep responses concise and practical.
        """

        try:
            response = await self.client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=1000,
                system="You are Onyx, an AI assistant focused on authentic human development.",
                content=prompt
            )
            
            # Parse response
            message = response.content[0].text
            insights = [line.strip() for line in message.split("\n") if line.strip()]
            return {
                "insights": insights[:3],
                "recommendations": insights[3:6]
            }
            
        except Exception as e:
            print(f"Error generating insights: {str(e)}")
            return {
                "insights": ["Error generating insights"],
                "recommendations": ["Please try again later"]
            }