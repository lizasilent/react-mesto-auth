import React from 'react';
import Footer from "./Footer";
import { Link } from 'react-router-dom';


function Page404() {

    return (
        
<div className="page">
          <div className="page__content">
          <main className="content">
          <div>
          <div className="profile__name">
          <p> Oops we did it again! </p> 
          <p>Такой страницы не существует, попробуйте перейти <Link to="/sign-in"  className="profile__name"> вот сюда </Link>
         </p>
          </div>
            </div>
        </main>
        <Footer />
        </div>
        </div>
    );
}

export default Page404;
