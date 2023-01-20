import Head from 'next/head';
import Router from 'next/router';
import { Formik, Field, Form } from "formik";
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {

  const [errorMessage, setErrorMessage] = useState();
  const [isVerified, setVerified] = useState(false);

  const handleSubmit = async (values) => {
    const { username, password } = values;
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    });

    const responseBody = await response.json();
    if (response.status >= 200 && response.status <= 299) {
      Router.push('/dashboard');
    } else {
      setErrorMessage(responseBody.message);  
    }
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Cognito + Next.js Demo</title>
      </Head>

      <main className={styles.main}>
        <div className="border rounded p-3">
          {errorMessage && (
            <div class="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {isVerified && (
            <div class="alert alert-success" role="alert">
              Welcome back! Please wait...
            </div>
          )}
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field name="username" id="username" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field name="password" id="password" type="password" className="form-control" />        
              </div>
              <div className="d-flex flex-row-reverse">
                <button type="submit" className='btn btn-secondary'>Log In</button>
              </div>
            </Form>
          </Formik>
        </div>
      </main>

    </div>
  )
}
