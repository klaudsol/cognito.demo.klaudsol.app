import Head from 'next/head';
import Router from 'next/router';
import { Formik, Field, Form } from "formik";
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(JSON.stringify(values, null, 2));
    Router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cognito + Next.js Demo</title>
      </Head>

      <main className={styles.main}>
        <div className="border rounded p-3">
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <Field name="name" id="name" type="text" className="form-control" />
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
