import React, { Fragment } from 'react';
import './chat.css';
import parolaIllustration from '../../assets/imgs/parola_illustration.svg';
import closeIcon from '../../assets/imgs/close.svg';
import landscapePicture from '../../assets/imgs/image-001.jpg';

const chat = () => {
  return (
    <Fragment>
      <header className='chat-header'>
        <div className='header__info-container'>
          <img
            src={parolaIllustration}
            alt='Illustration of the Parola robot'
            className='info-container__picture'
          />
          <p className='info-container__text'>Parola</p>
        </div>
        <a href='/' className='anchor w-inline-block'>
          <img
            src={closeIcon}
            alt='Close Icon'
            className='header__close--50-opacity'
          />
        </a>
      </header>
      <main className='chat'>
        <article className='chat__bubble--bot'>
          <p className='bubble__text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen
            disse varius enim in eros elementum tristique.
          </p>
        </article>
        <article className='chat__bubble--bot'>
          <p className='bubble__text'>Duis cursus, mi quis viverra ornare!</p>
        </article>
        <article className='chat__bubble--user'>
          <p className='bubble__text'>Lorem ipsum dolor?</p>
        </article>
        <article className='chat__bubble--user'>
          <p className='bubble__text'>
            Adipiscing elit. Suspen disse varius enim in eros elementum
            tristique…
          </p>
        </article>
        <article className='chat__bubble--bot'>
          <p className='bubble__text'>Mi quis viverra:</p>
          <img
            alt='Landscape'
            src={landscapePicture}
            className='bubble__image'
          />
        </article>

        <article className='chat__bubble--user'>
          <p className='bubble__text'>Et justo duo dolore</p>
        </article>
        <article className='chat__bubble--bot'>
          <p className='bubble__text'>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet.
          </p>
          <div
            data-animation='slide'
            data-nav-spacing='5'
            data-duration='500'
            data-infinite='1'
            className='bubble__slider w-slider'
          >
            <div className='slider__mask w-slider-mask'>
              <div className='slide__1 w-slide' />
            </div>
            <div className='slider__arrow--left w-slider-arrow-left'>
              <div className='arrow__icon w-icon-slider-left' />
            </div>
            <div className='slider__arrow--right w-slider-arrow-right'>
              <div className='arrow__icon w-icon-slider-right' />
            </div>
            <div className='slider__nav w-slider-nav w-round' />
          </div>
        </article>
        <article className='chat__bubble--user'>
          <p className='bubble__text'>Et justo duo dolore</p>
        </article>
        <article className='chat__bubble--user'>
          <p className='bubble__text'>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet
          </p>
        </article>
        <article className='chat__bubble--bot'>
          <p className='bubble__text'>Mi quis viverra:</p>
          <div className='bubble__video w-video w-embed'>
            <iframe
              className='embedly-embed'
              src='https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FLXb3EKWsInQ%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLXb3EKWsInQ&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLXb3EKWsInQ%2Fhqdefault.jpg&key=c4e54deccf4d4ec997a64902e9a30300&type=text%2Fhtml&schema=youtube'
              scrolling='no'
              title='YouTube embed'
              frameBorder='0'
              allowFullScreen={true}
            />
          </div>
        </article>
        <div className='chat__recommendations'>
          <div className='recommendations__button w-button'>
            <span role='img' aria-label='emoji-text'>
              🥳
            </span>
          </div>
          <div className='recommendations__button w-button'>
            <span role='img' aria-label='emoji-text'>
              💪🏻
            </span>
          </div>
          <div className='recommendations__button w-button'>Lorem</div>
          <div className='recommendations__button w-button'>
            <span role='img' aria-label='emoji-text'>
              👎🏻
            </span>
          </div>
        </div>
      </main>
      <div className='write-message w-form'>
        <form
          id='wf-form-chat-form'
          name='wf-form-chat-form'
          data-name='chat-form'
          className='write-message__form'
        >
          <input
            type='text'
            className='form__input w-input'
            maxLength='256'
            name='name'
            data-name='Name'
            placeholder='Chat with me'
            id='name'
          />
          <input type='submit' value='Send' className='form__button w-button' />
        </form>
      </div>
    </Fragment>
  );
};

export default chat;
