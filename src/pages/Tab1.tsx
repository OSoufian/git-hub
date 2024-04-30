import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/OSoufian/repos');
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h2>Your GitHub Repositories:</h2>
          <ul>
            {repositories.map(repo => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
