from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
import aiohttp
import jwt
from datetime import datetime, timedelta
import os
from typing import Dict, Optional

class SoulrOAuth:
    def __init__(self):
        # Store these securely in environment variables in production
        self.config = {
            'spotify': {
                'client_id': 'your_spotify_client_id',
                'client_secret': 'your_spotify_client_secret',
                'auth_url': 'https://accounts.spotify.com/authorize',
                'token_url': 'https://accounts.spotify.com/api/token',
                'scopes': [
                    'user-read-recently-played',
                    'user-top-read',
                    'user-read-playback-state'
                ]
            },
            'instagram': {
                'client_id': 'your_instagram_client_id',
                'client_secret': 'your_instagram_client_secret',
                'auth_url': 'https://api.instagram.com/oauth/authorize',
                'token_url': 'https://api.instagram.com/oauth/access_token',
                'scopes': ['basic', 'public_content']
            }
        }
        
        self.tokens = {}  # Stores active tokens
        
    async def start_oauth_flow(self, platform: str, user_id: str) -> str:
        """
        Starts the OAuth flow by creating the authorization URL.
        This is what creates the "Connect with X" button's destination.
        """
        if platform not in self.config:
            raise ValueError(f"Unsupported platform: {platform}")
            
        platform_config = self.config[platform]
        
        # Create a state token to prevent CSRF attacks
        state = self._generate_state_token(user_id)
        
        # Build the authorization URL with all necessary parameters
        auth_params = {
            'client_id': platform_config['client_id'],
            'response_type': 'code',
            'redirect_uri': f'https://soulr.ai/auth/{platform}/callback',
            'scope': ' '.join(platform_config['scopes']),
            'state': state
        }
        
        # Convert params to URL query string
        query_string = '&'.join(f'{k}={v}' for k, v in auth_params.items())
        
        return f"{platform_config['auth_url']}?{query_string}"

    async def handle_oauth_callback(self, platform: str, code: str, state: str) -> Dict:
        """
        Handles the callback after user approves access.
        This exchanges the temporary code for long-lasting access tokens.
        """
        # Verify the state token to prevent CSRF attacks
        user_id = self._verify_state_token(state)
        if not user_id:
            raise HTTPException(status_code=400, message="Invalid state token")
            
        platform_config = self.config[platform]
        
        # Exchange the code for access tokens
        async with aiohttp.ClientSession() as session:
            token_data = {
                'client_id': platform_config['client_id'],
                'client_secret': platform_config['client_secret'],
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': f'https://soulr.ai/auth/{platform}/callback'
            }
            
            async with session.post(platform_config['token_url'], data=token_data) as response:
                tokens = await response.json()
                
                if 'error' in tokens:
                    raise HTTPException(status_code=400, message=tokens['error'])
                
                # Store tokens securely
                await self._store_tokens(user_id, platform, tokens)
                
                return tokens

    async def refresh_token(self, user_id: str, platform: str) -> Optional[str]:
        """
        Refreshes an expired access token using the refresh token.
        This happens automatically in the background.
        """
        stored_tokens = await self._get_stored_tokens(user_id, platform)
        if not stored_tokens or 'refresh_token' not in stored_tokens:
            return None
            
        platform_config = self.config[platform]
        
        refresh_data = {
            'client_id': platform_config['client_id'],
            'client_secret': platform_config['client_secret'],
            'grant_type': 'refresh_token',
            'refresh_token': stored_tokens['refresh_token']
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(platform_config['token_url'], data=refresh_data) as response:
                new_tokens = await response.json()
                
                if 'error' not in new_tokens:
                    await self._store_tokens(user_id, platform, new_tokens)
                    return new_tokens['access_token']
                
        return None

    def _generate_state_token(self, user_id: str) -> str:
        """
        Creates a secure state token to prevent CSRF attacks.
        Think of this like a temporary receipt for the OAuth process.
        """
        return jwt.encode(
            {
                'user_id': user_id,
                'exp': datetime.utcnow() + timedelta(minutes=10)
            },
            os.getenv('JWT_SECRET'),
            algorithm='HS256'
        )

# Example of how to use this in your FastAPI app
app = FastAPI()

oauth_manager = SoulrOAuth()

@app.get("/connect/{platform}")
async def connect_platform(platform: str, user_id: str):
    """
    Endpoint that handles the "Connect with X" button clicks
    """
    auth_url = await oauth_manager.start_oauth_flow(platform, user_id)
    return RedirectResponse(auth_url)

@app.get("/auth/{platform}/callback")
async def oauth_callback(platform: str, code: str, state: str):
    """
    Endpoint that handles the OAuth callback after user approval
    """
    tokens = await oauth_manager.handle_oauth_callback(platform, code, state)
    # Start data collection process here
    return {"message": f"Successfully connected {platform}!"}