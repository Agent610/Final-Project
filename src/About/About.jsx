import React from "react";
import "./About.css";
//mport sistersBrotherPic from "../../images/Two beautiful sister + smart brother.png";
import sistersBrotherPic from "../../images/sisters-brother-pic.png";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <h1 className="about__title">About the author</h1>
        <p className="about__text">
          Hello! My name is Parth Sonanitwala and I'm a passionate inspiring
          Software Engineer I also plan on becoming a tutor for TripleTen where
          I will assist students in this amazing journey of becoming Software
          Engineers. Going back to me and Software Engineering what I can bring
          to customers is well designed applications and websites for customers.
          With an expertise and speciality in the backend development and a good
          amount of experience in frontend. I Parth, from wanting to become a
          Connecticut State-Trooper to now a Software Engineer I'm ready to do
          any project and assignment for my company.
        </p>
        <div className="about__image-container">
          <img
            src={sistersBrotherPic}
            alt="Me with my two sisters"
            className="about__image"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
