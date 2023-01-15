import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { useState, useEffect, useMemo } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const attributesHash = useMemo(() => (
    users.reduce((collector, user) => { 
      collector[user.Username] = user.Attributes.reduce((attributesCollector, attribute) => {
        attributesCollector[attribute.Name] = attribute.Value;
        return attributesCollector;
      }, {});
      return collector;
    }, {})
  ), [users]);

  useEffect(() => {
    (async () => {
      const responseRaw = await fetch('/api/users');
      const response = await responseRaw.json();
      setUsers(response);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cognito + Next.js Demo</title>
      </Head>

      <main className={styles.main}>
        <div className='border rounded p-3'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>ID/sub</th>
                <th>Username</th>
                <th>Date Created</th>
                <th>Enabled?</th>
              </tr>

            </thead>
            <tbody>
              {(users ?? []).map(user => (
                <tr key={user.Username}>
                  <td>{attributesHash[user.Username]['sub']}</td>
                  <td>{user.Username}</td>
                  <td>{user.UserCreateDate}</td>
                  <td>{user.Enabled ? '✅' : ' ❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     </main>

    </div>
  )

}