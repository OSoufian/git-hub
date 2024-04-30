import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string>('');

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepositories(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Error fetching repositories');
      setRepositories([]);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GitHub Repositories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonInput
            value={username}
            placeholder="Enter your GitHub username"
            onIonChange={(e) => setUsername(e.detail.value!)}
            clearInput
          />
          <IonButton onClick={fetchRepositories}>Fetch Repositories</IonButton>
          {error && <p>{error}</p>}
          {repositories.length > 0 && (
            <div>
              <h2>Your GitHub Repositories:</h2>
              <ul>
                {repositories.map(repo => (
                  <li key={repo.id}>{repo.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;