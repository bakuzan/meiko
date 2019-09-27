import React, { useContext, useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { MkoContext } from 'mko-book';
import Image from '@/Image';

const offPageStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  height: '1500px'
};

function ImageStory() {
  const inp = useRef();
  const [state, setState] = useContext(MkoContext);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          minWidth: 300,
          margin: 10
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="imageUrl">Image url</label>
          <input ref={inp} id="imageUrl" type="url" />
        </div>
        <button
          type="button"
          onClick={() => setState({ value: inp.current.value })}
        >
          Update
        </button>
      </div>
      <Image src={state.value} alt="changing source" />
      <div style={offPageStyle}>
        <Image src={state.value} alt="changing source lazy" isLazy />
      </div>
    </div>
  );
}

storiesOf('Image', module)
  .addParameters({
    mko: { defaultValues: { value: '' } },
    props: {
      propTables: [Image],
      propTablesExclude: [ImageStory]
    }
  })
  .add('load image', () => (
    <Image src="https://i.imgur.com/5hLv07N.jpg" alt="loaded" />
  ))
  .add('lazy load image', () => (
    <div style={offPageStyle}>
      <Image isLazy src="https://i.imgur.com/5hLv07N.jpg" alt="lazy loaded" />
    </div>
  ))
  .add('on load error', () => (
    <Image src="https://bad-url/will-error" alt="error test" />
  ))
  .add('on new src', () => <ImageStory />);
