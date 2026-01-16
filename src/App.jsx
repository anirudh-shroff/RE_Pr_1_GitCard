import React, { useState } from 'react'
import './index.css'
import Button from './assets/components/button';
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import './App.css'

const App = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleClick = async () => {
        console.log(username);

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const data = await response.json();
            setUserData(data);
            setError("");
        } catch (err) {
            console.log(err.message);
            setUserData(null);
            setError(err.message);
        }
    };

    const handleImageDownload = async () => {
        const card = document.getElementById('userCard');
        if (!card) return;

        try {
            const dataUrl = await toPng(card, {
                cacheBust: true,
                useCORS: true,
            });

            const link = document.createElement('a');
            link.download = `${username}_github-profile.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Image Download Failed:', err);
        }
    };

    return (
        <>
            <div className='m-auto search'>
                <input
                    type="text"
                    placeholder='Enter Github Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=''
                />

                <Button text={'Search'} clickHandler={handleClick} fillType='glass' />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {userData && (
                <div>
                    <div id='userCard' className='gitCard'>
                        <h2>{userData.name}</h2>
                        <img src={userData.avatar_url} alt={userData.login} width="100" crossOrigin="anonymous" />
                        <p>Followers: {userData.followers}</p>
                        <p>Following: {userData.following}</p>
                        <p>{userData.bio || `Bio N/A`}</p>
                        <p>Repositories: {userData.public_repos}</p>
                        <p>Comapny: {userData.company || `N/A`}</p>
                        <p>{userData.location || `N/A`}</p>
                    </div>

                    <div className="buttons">
                        <Button text={'View on GitHub'} url={userData.html_url} fillType='glass' />
                        <Button text={'Save Profile Card'} clickHandler={handleImageDownload} fillType='glass' />
                    </div>
                </div>
            )}
        </>
    )
}

export default App;
