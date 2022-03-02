import { useEffect, useRef, useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styled from 'styled-components';
import './fonts.css';

function App() {
  const chef = '🧑‍🍳';
  const utensils = ' 🍽️ ';
  const burger = '🍔';
  const link = '\nhttps://wordle.cooking'
  // const par = '4';

  const textareaRef = useRef(null);

  const [ chefle, setChefle ] = useState('');
  const [ copied, setCopied ] = useState(false);
  const [ error, setError ] = useState('');
  const [ linkBack, setLinkBack ] = useState(true)

  useEffect(() => {
    handleChange();

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [linkBack]);

  function handleCreditChange() {
    setLinkBack(!linkBack);
  }

  function handleChange() {
    setCopied(false);

    const wordle = textareaRef.current.value;
    const wordleSplit = wordle.split('\n');
    const wordleLineLength = wordleSplit.length;
    wordleSplit.splice(0, 2);
    const wordleShort = wordleSplit.join('\n');
    let wordleNumber = '';
    const hardMode = wordle.includes('*');
    let cookScore = '';
    let plates = 0;

    if (wordle.includes('1/6')) { 
      cookScore = 'MICHELIN 5 STAR! 🏆';
      plates = 1;
    } else if (wordle.includes('2/6')) {
      cookScore = 'Chef Curry with the pot 🏀';
      plates = 2;
    } else if (wordle.includes('3/6')) {
      cookScore = 'Now bismillah 🌟';
      plates = 3;
    } else if (wordle.includes('4/6')) {
      cookScore = 'TikTok recipes 💁‍♂️';
      plates = 4;
    } else if (wordle.includes('5/6')) {
      cookScore = 'wow grape 🍇';
      plates = 5;
    } else if (wordle.includes('6/6')) {
      cookScore = 'takeout? 🤬';
      plates = 6;
    } else {
      cookScore = 'Food poisoning 🤢🤮';
    }

    const platesScore = utensils.repeat(plates);

    const cookedWordle = wordleShort
      .replace(/⬜/g, '💩')
      .replace(/⬛/g, '💩')
      .replace(/🟨/g, '🍋')
      .replace(/🟩/g, '🍏');

    if (wordleLineLength >= 3 && wordle.includes('Wordle ')) {
      wordleNumber = wordle.match(/Wordle (\d+)/)[1];

      setChefle(
`${ hardMode ? '🌟 ' : '' }Chefle ${wordleNumber}: ${cookScore}

${chef} ${platesScore} ${burger}

${ cookedWordle }
${ linkBack ? link : ''}`
      );

      setError(``);
    } else if (wordle.length === 0) {
      setError(``);
    } else {
      setChefle('');
      setError(
        `Looks like you're not copying your Wordle score properly/completely.`
      );
      setCopied(false);
    }
  }

  function copy() {
    setCopied(!error && chefle);
  }

  return (
    <Container>
      <Banner>
        <h1>👩‍🍳 Chefle 👨‍🍳</h1>
        <h2>Wordle score to cooking score</h2>
        <p>A good meal is always 4</p>
      </Banner>
      
      <WordleChefle>
        <Wordle>
          <p><span>1.</span> Copy your Wordle score into here:</p>
          <textarea
            ref={textareaRef}
            name="text-wordle"
            onChange={handleChange}
            rows="14"
          />
        </Wordle>
        
        <Chefle>
          <p><span>2.</span> Your new cooking score will be converted here:</p>
          <textarea
            name="text-chefle"
            value={chefle}
            readOnly
            rows="14"
          />
        </Chefle>
      </WordleChefle>

      {copied && 
        <CopyState>Copied results to clipboard</CopyState>
      }

      <Credit>
        <input
          id="credit-check"
          name="credit-check"
          type="checkbox"
          checked={linkBack}
          onChange={handleCreditChange}
        />

        <label htmlFor="credit-check">Include link back to this page.</label>
      </Credit>
      
      <CopyToClipboard
        text={chefle}
        onCopy={copy}
      >
        <button disabled={error}>3. SHARE</button>
      </CopyToClipboard>

      <Error>
        {error}
      </Error>

      <Adam>
        Remixed by Mazin based off of 
        {` `}
        <a
          href="https://wordle.golf/"
          target="_blank"
          rel="noreferrer"
        >
          Adam Sawicki's amazing Wordle project
        </a>
      </Adam>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
  text-align: center;

  button {
    padding: 10px 40px;
    background: #6aa964;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1.3em;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`

const Banner = styled.div`
  h1 {
    margin: 0 0 0.3em;
  }

  h2 {
    margin: 0 0 0.3em;
  }

  p {
    margin: 0;
    font-size: 1.1em;
  }
`

const WordleChefle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 15px;
  padding: 0 30px;
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 30px;
  }

  p {
    margin: 0 0 5px;
    font-size: 14px;
    font-weight: 500;
    color: #333;

    span {
      font-size: 1.5em;
    }
  }

  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Clear Sans';
    font-size: 18px;
  }
`

const wordleChefleStyles = `
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    width: 50%;
  }
`

const Wordle = styled.div`
  ${wordleChefleStyles}

  textarea {
    margin: 0 0 20px;
    background: #f5f5f5;

    @media (min-width: 600px) {
      margin: 0;
    }
  }
`

const Chefle = styled.div`
  ${wordleChefleStyles}

  textarea {
    background: #e0ecdf;
  }
`

const CopyState = styled.div`
  width: 200px;
  margin: 0 auto;
  padding: 10px 40px;
  background: #000;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  color: #fff;
`

const Credit = styled.div`
  padding: 10px;
  font-size: 0.9em;
`

const Error = styled.div`
  padding: 15px;
  color: #c9b458;
  font-weight: 700;
`

const Adam = styled.div`
  margin: 60px 0 0;
  font-size: 0.8em;

  @media (min-width: 600px) {
    position: fixed;
    bottom: 5px;
    right: 10px;
    margin: 0;
  }
  
  a {
    color: #1d9bf0;
    text-decoration: none;

    img {
      width: 14px;
    }
  }
`

export default App;
